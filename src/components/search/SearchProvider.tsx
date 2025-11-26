'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchContextValue {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

type ResultType = 'contact' | 'property' | 'transaction' | 'document';

type SearchResult = {
  id: string;
  type: ResultType;
  title: string;
  subtitle: string;
  href: string;
  score: number;
};

const TYPE_LABEL: Record<ResultType, string> = {
  contact: 'Contact',
  property: 'Property',
  transaction: 'Transaction',
  document: 'Document',
};

const MIN_QUERY_LENGTH = 2;

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        toggle();
      }

      if (event.key === 'Escape' && isOpen) {
        event.preventDefault();
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggle, close, isOpen]);

  return (
    <SearchContext.Provider value={{ open, close, toggle }}>
      {children}
      <CommandPalette isOpen={isOpen} onClose={close} />
    </SearchContext.Provider>
  );
}

export function useSearchPalette() {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error('useSearchPalette must be used within a SearchProvider');
  }
  return ctx;
}

function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    const node = inputRef.current;
    const focusTimer = setTimeout(() => node?.focus(), 25);
    return () => clearTimeout(focusTimer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || query.trim().length < MIN_QUERY_LENGTH) {
      abortRef.current?.abort();
      setIsLoading(false);
      setResults([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const controller = new AbortController();
    abortRef.current = controller;

    const timer = setTimeout(async () => {
      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, limit: 20 }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Search failed');
        }

        const data = await response.json();
        setResults(data.results ?? []);
        setHighlightedIndex(0);
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setError('Unable to search right now.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query, isOpen]);

  const handleNavigate = useCallback(
    (result: SearchResult) => {
      onClose();
      router.push(result.href);
    },
    [onClose, router]
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, results.length - 1));
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    }

    if (event.key === 'Enter' && results[highlightedIndex]) {
      event.preventDefault();
      handleNavigate(results[highlightedIndex]);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[1200] flex items-start justify-center bg-black/30 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mt-24 w-full max-w-2xl rounded-2xl border border-zinc-800/50 bg-zinc-900/90 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/5 px-5 py-4">
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search properties, transactions, contacts, contracts…"
            className="w-full bg-transparent text-base text-white placeholder:text-zinc-500 focus:outline-none"
          />
          <div className="text-xs uppercase tracking-widest text-zinc-500">⌘K</div>
        </div>

        <div className="max-h-[420px] overflow-y-auto px-2 py-2">
          {error && <p className="px-4 py-6 text-sm text-red-400">{error}</p>}
          {!error && query.trim().length < MIN_QUERY_LENGTH && (
            <p className="px-4 py-6 text-sm text-zinc-500">Start typing to search across your workspace.</p>
          )}
          {!error && query.trim().length >= MIN_QUERY_LENGTH && isLoading && (
            <p className="px-4 py-6 text-sm text-zinc-400">Searching…</p>
          )}
          {!error && !isLoading && query.trim().length >= MIN_QUERY_LENGTH && results.length === 0 && (
            <p className="px-4 py-6 text-sm text-zinc-500">No results found. Try another phrase.</p>
          )}

          {!error && results.length > 0 && (
            <ul className="space-y-1">
              {results.map((result, index) => (
                <li key={`${result.type}-${result.id}`}>
                  <button
                    type="button"
                    onClick={() => handleNavigate(result)}
                    className={`flex w-full flex-col gap-1 rounded-lg px-4 py-3 text-left transition-colors ${
                      highlightedIndex === index ? 'bg-white/10' : 'bg-transparent hover:bg-white/5'
                    }`}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white">{result.title}</span>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-zinc-300">
                        {TYPE_LABEL[result.type]}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">{result.subtitle}</p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

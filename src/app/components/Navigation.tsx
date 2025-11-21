'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { logout } from '../actions/auth';
import type { User } from '@supabase/supabase-js';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await logout();
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 pt-6 transition-all duration-300">
      <div className={`mx-auto transition-all duration-300 ${
        isScrolled 
          ? 'max-w-3xl bg-white/90 backdrop-blur-md border border-black/10 rounded-full shadow-lg px-6 py-3' 
          : 'max-w-6xl bg-transparent px-0 py-0'
      }`}>
        <div className="flex items-center justify-between">
          <Link href="/" className="text-base font-semibold text-black">
            RLTR
          </Link>
          <div className="flex items-center gap-6">
            {loading ? (
              <div className="text-sm text-black/40">Loading...</div>
            ) : user ? (
              <>
                <span className="text-sm text-black/60">
                  {user.email}
                </span>
                <button 
                  onClick={handleLogout}
                  className={`inline-flex items-center px-4 py-2 bg-black text-white text-sm 
                  font-medium hover:bg-black/90 transition-all ${
                    isScrolled ? 'rounded-full shadow-md' : 'shadow-sm'
                  }`}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-sm text-black/60 hover:text-black transition-colors"
                >
                  Sign in
                </Link>
                <Link 
                  href="/signup"
                  className={`inline-flex items-center px-4 py-2 bg-black text-white text-sm 
                  font-medium hover:bg-black/90 transition-all ${
                    isScrolled ? 'rounded-full shadow-md' : 'shadow-sm'
                  }`}
                >
                  Join pilot
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}


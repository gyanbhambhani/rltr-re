import Link from 'next/link';

export default function Navigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-black/5">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-base font-medium text-black">
          RLTR
        </Link>
        <div className="flex items-center gap-8">
          <Link 
            href="/login" 
            className="text-sm text-black/60 hover:text-black transition-colors"
          >
            Sign in
          </Link>
          <Link 
            href="/signup"
            className="text-sm text-black hover:text-black/60 transition-colors"
          >
            Get started →
          </Link>
        </div>
      </div>
    </header>
  );
}


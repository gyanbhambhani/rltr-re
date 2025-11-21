import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white antialiased">
      {/* Header */}
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

      {/* Hero */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-6 text-black">
            Real estate software that works like you think
          </h1>
          <p className="text-lg text-black/60 mb-10 leading-relaxed">
            One platform for search, contracts, clients, and deals. 
            No training required.
          </p>
          <Link 
            href="/signup"
            className="inline-flex items-center text-sm text-black hover:text-black/60 transition-colors"
          >
            Start free trial
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-black/5" />
      </div>

      {/* Problem */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-2xl md:text-3xl font-medium leading-snug text-black/90 mb-6">
            Most agents use 8-10 different tools. Each one requires learning, logging in, 
            and manually keeping data in sync.
          </p>
          <p className="text-lg text-black/60 leading-relaxed">
            RLTR is different. It's a single workspace built specifically for real estate. 
            Everything talks to everything else. No integrations, no exports, no busy work.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-black/5" />
      </div>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-20">
            <div>
              <div className="text-xs font-medium text-black/40 mb-4 tracking-wider uppercase">
                Search
              </div>
              <h3 className="text-2xl font-medium mb-3 text-black">
                Ask in plain English
              </h3>
              <p className="text-base text-black/60 leading-relaxed">
                "Show me 3-bed homes under $600k near Palo Alto with good schools." 
                Natural language search that understands context and intent. 
                Results from MLS in under a second.
              </p>
            </div>

            <div>
              <div className="text-xs font-medium text-black/40 mb-4 tracking-wider uppercase">
                Contracts
              </div>
              <h3 className="text-2xl font-medium mb-3 text-black">
                Generate documents instantly
              </h3>
              <p className="text-base text-black/60 leading-relaxed">
                Purchase agreements, disclosures, amendments—all pre-filled with your client 
                and property data. Compliant with local regulations. Ready to sign.
              </p>
            </div>

            <div>
              <div className="text-xs font-medium text-black/40 mb-4 tracking-wider uppercase">
                Clients
              </div>
              <h3 className="text-2xl font-medium mb-3 text-black">
                Relationships, not records
              </h3>
              <p className="text-base text-black/60 leading-relaxed">
                Every email, showing, and conversation automatically logged. 
                AI suggests the right time to follow up. See the full history 
                of every client relationship in one place.
              </p>
            </div>

            <div>
              <div className="text-xs font-medium text-black/40 mb-4 tracking-wider uppercase">
                Workflow
              </div>
              <h3 className="text-2xl font-medium mb-3 text-black">
                From offer to close, automated
              </h3>
              <p className="text-base text-black/60 leading-relaxed">
                RLTR handles the paperwork, deadlines, and coordination. 
                You get notified when something needs your attention. 
                Everything else happens automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-black/5" />
      </div>

      {/* Stats */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-12">
            <div>
              <div className="text-3xl font-medium text-black mb-1">10hrs</div>
              <div className="text-sm text-black/50">saved weekly</div>
            </div>
            <div>
              <div className="text-3xl font-medium text-black mb-1">3x</div>
              <div className="text-sm text-black/50">faster deals</div>
            </div>
            <div>
              <div className="text-3xl font-medium text-black mb-1">$0</div>
              <div className="text-sm text-black/50">to start</div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-black/5" />
      </div>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium mb-4 text-black">
            Start today
          </h2>
          <p className="text-base text-black/60 mb-8">
            14-day trial. No credit card required. Cancel anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/signup"
              className="inline-flex items-center justify-center px-5 py-3 text-sm bg-black text-white hover:bg-black/80 transition-colors"
            >
              Get started
            </Link>
            <Link 
              href="mailto:hello@rltr.com"
              className="inline-flex items-center justify-center px-5 py-3 text-sm border border-black/10 text-black hover:border-black/20 transition-colors"
            >
              Talk to sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 py-12 px-6">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="text-sm text-black/40">
            © 2025 RLTR
          </div>
          <div className="flex gap-8 text-sm text-black/40">
            <a href="mailto:hello@rltr.com" className="hover:text-black transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

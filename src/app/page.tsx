export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight">RLTR</div>
          <a 
            href="mailto:hello@rltr.com" 
            className="text-sm hover:text-neutral-600 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </header>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        {/* Title Section */}
        <header className="mb-20">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.1] mb-6">
            A Letter to<br />Real Estate
          </h1>
          <time className="text-sm text-neutral-500 tracking-wide">November 2025</time>
        </header>

        {/* Body */}
        <div className="space-y-8 text-xl md:text-2xl font-light leading-relaxed text-neutral-700">
          <p className="text-neutral-900">
            Real estate agents spend more time managing software than serving clients.
          </p>

          <p>
            Six different tools. Six logins. Six workflows that don't talk to each other.
            MLS for searching. DocuSign for contracts. Email for communication. 
            Spreadsheets for tracking. Calendar for scheduling. CRM for follow-ups.
          </p>

          <p className="text-neutral-900 font-normal">
            This isn't innovation. This is fragmentation dressed up as progress.
          </p>

          <div className="h-16" />

          <p>
            We built RLTR because we believe real estate deserves better. 
            Not another tool to add to the stack. Not another dashboard to check. 
            Not another login to remember.
          </p>

          <p className="text-neutral-900">
            One intelligent operating system. Everything you need, nothing you don't. 
            AI that understands context, not just commands. Workflows that adapt to you, 
            not the other way around.
          </p>

          <p>
            Search the MLS in plain language. Draft contracts automatically. 
            Coordinate transactions seamlessly. Build custom automations without code. 
            All in one place.
          </p>

          <div className="h-16" />

          <p className="text-neutral-900 font-normal">
            This is what modern real estate infrastructure should look like. 
            Unified. Intelligent. Effortless.
          </p>

          <p className="text-2xl md:text-3xl">
            The future of real estate isn't about more tools. 
            It's about better systems.
          </p>

          <div className="h-24" />

          <div className="flex items-center justify-between border-t border-neutral-200 pt-12">
            <p className="text-2xl font-normal text-neutral-900">
              RLTR
            </p>
            <a 
              href="mailto:hello@rltr.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white text-base font-medium hover:bg-neutral-800 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="text-sm text-neutral-500">
              © 2025 RLTR. AI-Native Infrastructure for Real Estate.
            </div>
            <div className="flex gap-8 text-sm">
              <a href="mailto:hello@rltr.com" className="hover:text-neutral-900 transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-neutral-900 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-neutral-900 transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}


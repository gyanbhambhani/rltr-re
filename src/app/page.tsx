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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.1] mb-6">
            The Future of Real Estate<br />Isn't About More Tools.<br />It's About Better Systems.
          </h1>
          <p className="text-xl md:text-2xl font-light text-neutral-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            One intelligent operating system. Everything you need, nothing you don't. 
            AI that understands context, not just commands.
          </p>
          <a 
            href="mailto:hello@rltr.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white text-base font-medium hover:bg-neutral-800 transition-colors"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">
            Real estate agents spend more time managing software than serving clients.
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="text-4xl font-light text-neutral-400">6</div>
              <p className="text-lg text-neutral-600">Different tools</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-light text-neutral-400">6</div>
              <p className="text-lg text-neutral-600">Separate logins</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-light text-neutral-400">6</div>
              <p className="text-lg text-neutral-600">Disconnected workflows</p>
            </div>
          </div>
          <div className="mt-12 pt-12 border-t border-neutral-200">
            <p className="text-xl md:text-2xl font-light text-neutral-700 text-center leading-relaxed">
            MLS for searching. DocuSign for contracts. Email for communication. 
            Spreadsheets for tracking. Calendar for scheduling. CRM for follow-ups.
          </p>
            <p className="text-xl md:text-2xl font-normal text-neutral-900 text-center mt-8">
            This isn't innovation. This is fragmentation dressed up as progress.
          </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-light mb-12 text-center">
            One Platform.<br />Infinite Possibilities.
          </h2>
          <p className="text-xl md:text-2xl font-light text-neutral-700 text-center leading-relaxed mb-16">
            We built RLTR because we believe real estate deserves better. 
            Not another tool to add to the stack. Not another dashboard to check. 
            Not another login to remember.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-16 text-center">
            Everything You Need, All in One Place
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-normal">Intelligent MLS Search</h3>
              <p className="text-lg font-light text-neutral-600 leading-relaxed">
                Search the MLS in plain language. No complex filters or confusing interfaces. 
                Just ask what you're looking for.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-normal">Automated Contracts</h3>
              <p className="text-lg font-light text-neutral-600 leading-relaxed">
                Draft contracts automatically. AI understands context and generates 
                accurate documents in seconds.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-normal">Seamless Coordination</h3>
              <p className="text-lg font-light text-neutral-600 leading-relaxed">
                Coordinate transactions seamlessly. All parties, all updates, 
                all in one unified workflow.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-normal">Custom Automations</h3>
              <p className="text-lg font-light text-neutral-600 leading-relaxed">
                Build custom automations without code. Workflows that adapt to you, 
            not the other way around.
          </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-light text-neutral-700 mb-8 leading-relaxed">
            This is what modern real estate infrastructure should look like.
          </p>
          <p className="text-3xl md:text-4xl font-normal text-neutral-900">
            Unified. Intelligent. Effortless.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8">
            Ready to Transform Your Real Estate Workflow?
          </h2>
          <p className="text-xl md:text-2xl font-light text-neutral-300 mb-12 leading-relaxed">
            Join the future of real estate infrastructure. One platform. 
            One login. Infinite possibilities.
            </p>
            <a 
              href="mailto:hello@rltr.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 text-base font-medium hover:bg-neutral-100 transition-colors"
            >
              Get Started
            </a>
          </div>
      </section>

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


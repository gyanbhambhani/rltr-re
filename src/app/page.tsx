import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            RLTR
          </Link>
          <div className="flex items-center gap-6">
            <Link 
              href="/login" 
              className="text-sm hover:text-neutral-600 transition-colors"
            >
              Log In
            </Link>
            <Link 
              href="/signup"
              className="text-sm px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.1] mb-8">
            The Future of Real Estate<br />Isn't About More Tools.<br />It's About Better Systems.
          </h1>
          <p className="text-xl md:text-2xl font-light text-neutral-600 mb-12 leading-relaxed">
            One intelligent operating system. Everything you need, nothing you don't.
          </p>
          <Link 
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white text-base font-medium hover:bg-neutral-800 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-8 text-center">
            Real estate agents spend more time managing software than serving clients.
          </h2>
          <p className="text-xl md:text-2xl font-light text-neutral-700 text-center leading-relaxed">
            Six different tools. Six logins. Six workflows that don't talk to each other. 
            MLS for searching. DocuSign for contracts. Email for communication. 
            Spreadsheets for tracking. Calendar for scheduling. CRM for follow-ups.
          </p>
          <p className="text-xl md:text-2xl font-normal text-neutral-900 text-center mt-8">
            This isn't innovation. This is fragmentation dressed up as progress.
          </p>
        </div>
      </section>

      {/* What is RLTR */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-light mb-8 text-center">
            What is RLTR?
          </h2>
          <p className="text-xl md:text-2xl font-light text-neutral-700 leading-relaxed mb-6">
            RLTR is an AI-native operating system built specifically for real estate professionals. 
            We've unified everything you need into one intelligent platform that understands context, 
            adapts to your workflow, and eliminates the need for multiple disconnected tools.
          </p>
          <p className="text-xl md:text-2xl font-light text-neutral-700 leading-relaxed">
            Instead of juggling six different applications, you get one seamless experience where 
            every feature works together, powered by AI that understands real estate, not just 
            generic business processes.
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
                Search the MLS using natural language. No complex filters or confusing interfaces. 
                Just describe what you're looking for—"3 bedroom homes under $500k with a 
                backyard near good schools"—and RLTR finds the perfect matches instantly.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-normal">Automated Contract Generation</h3>
              <p className="text-lg font-light text-neutral-600 leading-relaxed">
                Draft contracts automatically with AI that understands real estate context. 
                Generate purchase agreements, addendums, and disclosures in seconds. The system 
                knows local requirements, standard clauses, and can adapt to your specific needs.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-normal">Unified Transaction Management</h3>
              <p className="text-lg font-light text-neutral-600 leading-relaxed">
                Coordinate entire transactions in one place. Track all parties, deadlines, 
                documents, and communications. Get automatic updates when milestones are reached 
                or when action is needed. No more switching between email, calendar, and 
                spreadsheets.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-normal">AI-Powered Communication</h3>
              <p className="text-lg font-light text-neutral-600 leading-relaxed">
                Smart email and messaging that understands context. Draft professional responses, 
                schedule follow-ups automatically, and never miss an important client interaction. 
                The AI learns your communication style and preferences.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-normal">Custom Workflow Automation</h3>
              <p className="text-lg font-light text-neutral-600 leading-relaxed">
                Build custom automations without writing code. Create workflows that adapt to your 
                process—from lead capture to closing. Set up triggers, actions, and notifications 
                that work exactly how you need them to.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-normal">Integrated Client Relationship Management</h3>
              <p className="text-lg font-light text-neutral-600 leading-relaxed">
                Built-in CRM that tracks every interaction automatically. Know exactly where each 
                client is in their journey, what they're looking for, and when to follow up. 
                All without manual data entry or separate tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">
            How RLTR Works
          </h2>
          <div className="space-y-8 text-lg md:text-xl font-light text-neutral-700 leading-relaxed">
            <p>
              <strong className="font-normal text-neutral-900">One Login, One Platform:</strong> 
              {' '}Access everything through a single, secure account. No more password managers 
              or browser tabs filled with different tools.
            </p>
            <p>
              <strong className="font-normal text-neutral-900">AI That Understands Context:</strong> 
              {' '}Our AI doesn't just follow commands—it understands real estate. It knows what 
              a "CMA" is, understands market conditions, recognizes transaction stages, and 
              anticipates what you need next.
            </p>
            <p>
              <strong className="font-normal text-neutral-900">Everything Connected:</strong> 
              {' '}When you search for a property, it's automatically saved to your client's file. 
              When you draft a contract, it's linked to the transaction timeline. When you send 
              an email, it's logged in the CRM. Everything works together seamlessly.
            </p>
            <p>
              <strong className="font-normal text-neutral-900">Adapts to You:</strong> 
              {' '}RLTR learns your preferences, your workflow, and your style. The more you use 
              it, the better it gets at anticipating your needs and automating routine tasks.
            </p>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-light text-neutral-700 mb-8 leading-relaxed">
            This is what modern real estate infrastructure should look like.
          </p>
          <p className="text-3xl md:text-4xl font-normal text-neutral-900 mb-12">
            Unified. Intelligent. Effortless.
          </p>
          <Link 
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white text-base font-medium hover:bg-neutral-800 transition-colors"
          >
            Get Started
          </Link>
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


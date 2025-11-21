import Link from 'next/link';
import Navigation from '../components/Navigation';

export default function SignUp() {
  return (
    <main className="min-h-screen bg-white antialiased">
      <Navigation />

      {/* Sign Up Form */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="w-full max-w-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
          bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-medium text-emerald-700">Pilot Q1 2026</span>
          </div>
          <h1 className="text-3xl font-medium tracking-tight mb-2 text-black">Join the pilot</h1>
          <p className="text-black/60 mb-8">Apply for early access</p>
          
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-black/80">
                Full name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2.5 border border-black/10 bg-white text-black 
                focus:outline-none focus:border-black/30 transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-black/80">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2.5 border border-black/10 bg-white text-black 
                focus:outline-none focus:border-black/30 transition-colors"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-black/80">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2.5 border border-black/10 bg-white text-black 
                focus:outline-none focus:border-black/30 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-5 py-2.5 bg-black text-white text-sm font-medium 
              hover:bg-black/80 transition-colors"
            >
              Apply for pilot
            </button>
          </form>

          <p className="mt-6 text-sm text-black/60 text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-black hover:text-black/60 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}


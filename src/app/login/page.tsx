import Link from 'next/link';
import Navigation from '../components/Navigation';

export default function Login() {
  return (
    <main className="min-h-screen bg-white antialiased">
      <Navigation />

      {/* Login Form */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-medium tracking-tight mb-2 text-black">Sign in</h1>
          <p className="text-black/60 mb-8">Welcome back</p>
          
          <form className="space-y-5">
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
              Sign in
            </button>
          </form>

          <p className="mt-6 text-sm text-black/60 text-center">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-black hover:text-black/60 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}


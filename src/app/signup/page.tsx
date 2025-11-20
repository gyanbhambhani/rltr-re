import Link from 'next/link';

export default function SignUp() {
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

      {/* Sign Up Form */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-light tracking-tight mb-2">Sign Up</h1>
          <p className="text-neutral-600 mb-8">Create your account to get started.</p>
          
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-neutral-300 bg-white focus:outline-none focus:border-neutral-900 transition-colors"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-3 border border-neutral-300 bg-white focus:outline-none focus:border-neutral-900 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-sm text-neutral-600 text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-neutral-900 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}


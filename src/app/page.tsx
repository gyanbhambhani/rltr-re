'use client';

import Link from 'next/link';
import Navigation from './components/Navigation';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export default function Home() {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

  const features = [
    {
      icon: (
        <svg className="w-5 h-5 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: 'Natural language search',
      description: 'Ask for what you want in plain English. "3-bed homes under $600k near good schools with a yard." Our AI understands context and searches MLS instantly.',
      details: [
        'Connect to any MLS system',
        'Advanced natural language processing',
        'Results in under 1 second',
        'Save and share custom searches',
        'Smart filters that learn your preferences'
      ]
    },
    {
      icon: (
        <svg className="w-5 h-5 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'AI contract assistant',
      description: 'Generate purchase agreements, disclosures, and amendments in seconds. Pre-filled with client data, compliant with local regulations, ready to send.',
      details: [
        'Auto-fill from client and property data',
        'State-specific compliance built-in',
        'E-signature integration',
        'Version history and tracking',
        'Template library for all document types'
      ]
    },
    {
      icon: (
        <svg className="w-5 h-5 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Intelligent CRM',
      description: 'Automatically track every client interaction, property showing, and follow-up. Get AI-powered reminders for the right time to reach out.',
      details: [
        'Automatic activity logging',
        'AI-powered follow-up suggestions',
        'Client timeline and history',
        'Email and calendar sync',
        'Pipeline management and forecasting'
      ]
    },
    {
      icon: (
        <svg className="w-5 h-5 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Smart workflows',
      description: 'Automate your busywork. From offer to close, RLTR handles the paperwork, reminders, and coordination so you can focus on relationships.',
      details: [
        'Customizable automation rules',
        'Deadline tracking and alerts',
        'Task assignment and delegation',
        'Transaction milestone tracking',
        'Integrates with title and escrow'
      ]
    }
  ];

    return (
    <main className="min-h-screen bg-neutral-50 antialiased">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
            bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-medium text-emerald-700">Pilot launching Q1 2026</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] mb-6 text-black">
              Real estate software that works like you think
            </h1>
            <p className="text-xl text-black/60 mb-10 leading-relaxed max-w-2xl">
              Join our exclusive pilot program. Limited spots available for forward-thinking 
              agents ready to transform their workflow.
            </p>
            <div className="flex flex-wrap gap-3">
              {!loading && user ? (
                <Link 
                  href="/dashboard"
                  className="inline-flex items-center px-5 py-3 bg-black text-white text-sm 
                  font-medium hover:bg-black/90 transition-all shadow-sm"
                >
                  Go to Dashboard
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <>
                  <Link 
                    href="/signup"
                    className="inline-flex items-center px-5 py-3 bg-black text-white text-sm 
                    font-medium hover:bg-black/90 transition-all shadow-sm"
                  >
                    Join pilot program
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link 
                    href="mailto:hello@rltr.com"
                    className="inline-flex items-center px-5 py-3 bg-white text-black text-sm 
                    font-medium border border-black/10 hover:border-black/20 transition-all shadow-sm"
                  >
                    Request demo
                  </Link>
                </>
              )}
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-black/50">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Early access pricing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Limited spots</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 px-6 border-y border-black/5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-semibold text-black mb-1">10+ hours</div>
              <div className="text-sm text-black/50">saved per week</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-black mb-1">3x faster</div>
              <div className="text-sm text-black/50">transaction time</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-black mb-1">100%</div>
              <div className="text-sm text-black/50">compliance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-6 text-black">
              Stop juggling 10 different tools
            </h2>
            <p className="text-xl text-black/60 leading-relaxed">
              Most agents waste hours every day switching between MLS, CRM, contract software, 
              email, and spreadsheets. RLTR brings everything into one AI-powered workspace 
              that actually understands real estate.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative h-[320px] cursor-pointer perspective-1000"
                onClick={() => setFlippedCard(flippedCard === index ? null : index)}
              >
                <div className={`relative w-full h-full transition-all duration-500 
                transform-style-3d ${flippedCard === index ? 'rotate-y-180' : ''}`}>
                  {/* Front of card */}
                  <div className="absolute inset-0 backface-hidden p-8 border border-black/10 
                  bg-neutral-50 hover:border-black/20 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-black/5 flex items-center 
                    justify-center mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 text-black">
                      {feature.title}
                    </h3>
                    <p className="text-base text-black/60 leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <div className="inline-flex items-center text-sm font-medium text-black/70">
                      Click for details
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 p-8 
                  border border-black/20 bg-black text-white">
                    <h3 className="text-xl font-semibold mb-6">
                      {feature.title}
                    </h3>
                    <ul className="space-y-3 mb-6">
                      {feature.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-white/90">{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="inline-flex items-center text-sm font-medium text-white/70">
                      Click to close
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Be part of the future
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Join our pilot program launching Q1 2026. Limited spots for agents ready to 
            transform their practice.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {!loading && user ? (
              <Link 
                href="/dashboard"
                className="inline-flex items-center px-6 py-3.5 bg-white text-black text-sm 
                font-medium hover:bg-white/90 transition-all shadow-lg"
              >
                Go to Dashboard
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <>
                <Link 
                  href="/signup"
                  className="inline-flex items-center px-6 py-3.5 bg-white text-black text-sm 
                  font-medium hover:bg-white/90 transition-all shadow-lg"
                >
                  Apply for pilot
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link 
                  href="mailto:hello@rltr.com"
                  className="inline-flex items-center px-6 py-3.5 border border-white/20 
                  text-white text-sm font-medium hover:border-white/40 transition-all"
                >
                  Contact us
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between 
        items-center gap-6">
          <div className="text-sm text-black/40">
            © 2025 RLTR. All rights reserved.
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

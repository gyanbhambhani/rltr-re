'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// Word-by-word animation component
const AnimatedWords = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const words = text.split(' ');
  
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.08,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
        >
          {word}
          {i < words.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </>
  );
};

// Abstract cartoonish icon components
const AbstractIcon = ({ 
  type, 
  size = 60, 
  className = "" 
}: { 
  type: string; 
  size?: number; 
  className?: string;
}) => {
  const icons: Record<string, JSX.Element> = {
    search: (
      <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
        <circle cx="45" cy="45" r="25" fill="currentColor" opacity="0.9" />
        <line x1="65" y1="65" x2="85" y2="85" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      </svg>
    ),
    document: (
      <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
        <rect x="25" y="20" width="50" height="70" rx="8" fill="currentColor" opacity="0.9" />
        <line x1="35" y1="35" x2="65" y2="35" stroke="currentColor" strokeWidth="4" />
        <line x1="35" y1="45" x2="60" y2="45" stroke="currentColor" strokeWidth="4" />
        <line x1="35" y1="55" x2="55" y2="55" stroke="currentColor" strokeWidth="4" />
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
        <rect x="20" y="60" width="15" height="30" rx="4" fill="currentColor" opacity="0.9" />
        <rect x="42" y="40" width="15" height="50" rx="4" fill="currentColor" opacity="0.9" />
        <rect x="65" y="30" width="15" height="60" rx="4" fill="currentColor" opacity="0.9" />
      </svg>
    ),
    chat: (
      <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
        <path d="M 20 30 Q 20 20 30 20 L 70 20 Q 80 20 80 30 L 80 60 Q 80 70 70 70 L 40 70 L 20 85 Z" 
              fill="currentColor" opacity="0.9" />
        <circle cx="35" cy="45" r="5" fill="currentColor" />
        <circle cx="50" cy="45" r="5" fill="currentColor" />
        <circle cx="65" cy="45" r="5" fill="currentColor" />
      </svg>
    ),
    bolt: (
      <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
        <path d="M 50 15 L 35 50 L 50 50 L 50 85 L 65 50 L 50 50 Z" 
              fill="currentColor" opacity="0.9" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
        <circle cx="35" cy="30" r="12" fill="currentColor" opacity="0.9" />
        <path d="M 20 60 Q 20 50 30 50 L 40 50 Q 50 50 50 60 L 50 70 L 20 70 Z" 
              fill="currentColor" opacity="0.9" />
        <circle cx="65" cy="30" r="12" fill="currentColor" opacity="0.9" />
        <path d="M 50 60 Q 50 50 60 50 L 70 50 Q 80 50 80 60 L 80 70 L 50 70 Z" 
              fill="currentColor" opacity="0.9" />
      </svg>
    ),
    lock: (
      <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
        <rect x="30" y="45" width="40" height="35" rx="5" fill="currentColor" opacity="0.9" />
        <path d="M 35 45 L 35 35 Q 35 25 50 25 Q 65 25 65 35 L 65 45" 
              stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
      </svg>
    ),
    connection: (
      <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
        <circle cx="30" cy="30" r="12" fill="currentColor" opacity="0.9" />
        <circle cx="70" cy="30" r="12" fill="currentColor" opacity="0.9" />
        <circle cx="30" cy="70" r="12" fill="currentColor" opacity="0.9" />
        <circle cx="70" cy="70" r="12" fill="currentColor" opacity="0.9" />
        <line x1="42" y1="30" x2="58" y2="30" stroke="currentColor" strokeWidth="4" />
        <line x1="30" y1="42" x2="30" y2="58" stroke="currentColor" strokeWidth="4" />
        <line x1="70" y1="42" x2="70" y2="58" stroke="currentColor" strokeWidth="4" />
      </svg>
    ),
    brain: (
      <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
        <path d="M 50 20 Q 30 25 25 40 Q 20 55 30 65 Q 35 75 50 80 Q 65 75 70 65 Q 80 55 75 40 Q 70 25 50 20 Z" 
              fill="currentColor" opacity="0.9" />
        <circle cx="40" cy="45" r="4" fill="currentColor" />
        <circle cx="60" cy="45" r="4" fill="currentColor" />
        <path d="M 35 60 Q 50 65 65 60" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    ),
    target: (
      <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.9" />
        <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.9" />
        <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.9" />
      </svg>
    ),
  };

  return icons[type] || icons.search;
};

// Premium floating gradient shapes - refined titanium to silver
const PremiumGradientShape = ({ delay = 0, size = 400, position = 'top' }: { delay?: number; size?: number; position?: string }) => {
  const positions = {
    top: { top: '-5%', left: '-5%' },
    topRight: { top: '-5%', right: '-5%' },
    middle: { top: '45%', left: '5%' },
    middleRight: { top: '45%', right: '5%' },
    bottom: { bottom: '-5%', left: '15%' },
    bottomRight: { bottom: '-5%', right: '15%' },
    center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  };

  return (
    <motion.div
      className="absolute rounded-full blur-[180px]"
      style={{
        width: size,
        height: size,
        background: 'radial-gradient(circle, rgba(115,115,115,0.12) 0%, rgba(163,163,163,0.10) 30%, rgba(212,212,212,0.07) 60%, rgba(229,229,229,0.04) 85%, transparent 100%)',
        ...positions[position as keyof typeof positions] || positions.top,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.25, 0.45, 0.25],
        x: [0, 30, -30, 0],
        y: [0, -30, 30, 0],
      }}
      transition={{
        duration: 25 + delay,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    />
  );
};

// Premium gradient stream - refined flowing through white
const PremiumGradientStream = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-full h-full"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(115,115,115,0.08) 25%, rgba(163,163,163,0.10) 50%, rgba(212,212,212,0.08) 75%, transparent 100%)',
          backgroundSize: '300% 300%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute w-full h-full"
        style={{
          background: 'linear-gradient(45deg, transparent 0%, rgba(163,163,163,0.06) 30%, rgba(212,212,212,0.08) 50%, rgba(229,229,229,0.06) 70%, transparent 100%)',
          backgroundSize: '300% 300%',
        }}
        animate={{
          backgroundPosition: ['100% 0%', '0% 100%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// RLTR Logo Animation - Simple, clean, centered
const RLTRLogoAnimation = ({ isVisible, isTransitioning }: { isVisible: boolean; isTransitioning: boolean }) => {
  // Simple stroke segments - minimal components per letter
  const letterStrokes = {
    'R': [
      { x: 0, y: 0, width: 14, height: 90, rx: 7, delay: 0 }, // Left vertical
      { x: 0, y: 0, width: 50, height: 14, rx: 7, delay: 0.1 }, // Top horizontal
      { x: 14, y: 38, width: 36, height: 14, rx: 7, delay: 0.2 }, // Middle horizontal
      { x: 46, y: 42, width: 14, height: 24, rx: 7, delay: 0.3, rotate: -30 }, // Diagonal leg
      { x: 0, y: 76, width: 50, height: 14, rx: 7, delay: 0.4 }, // Bottom horizontal
      { x: 50, y: 76, width: 14, height: 24, rx: 7, delay: 0.5 }, // Bottom leg
    ],
    'L': [
      { x: 0, y: 0, width: 14, height: 90, rx: 7, delay: 0.6 }, // Vertical
      { x: 0, y: 76, width: 40, height: 14, rx: 7, delay: 0.7 }, // Bottom horizontal
    ],
    'T': [
      { x: 20, y: 0, width: 14, height: 90, rx: 7, delay: 0.8 }, // Vertical (centered)
      { x: 0, y: 0, width: 54, height: 14, rx: 7, delay: 0.9 }, // Top horizontal
    ],
    'R2': [
      { x: 0, y: 0, width: 14, height: 90, rx: 7, delay: 1.0 }, // Left vertical
      { x: 0, y: 0, width: 50, height: 14, rx: 7, delay: 1.1 }, // Top horizontal
      { x: 14, y: 38, width: 36, height: 14, rx: 7, delay: 1.2 }, // Middle horizontal
      { x: 46, y: 42, width: 14, height: 24, rx: 7, delay: 1.3, rotate: -30 }, // Diagonal leg
      { x: 0, y: 76, width: 50, height: 14, rx: 7, delay: 1.4 }, // Bottom horizontal
      { x: 50, y: 76, width: 14, height: 24, rx: 7, delay: 1.5 }, // Bottom leg
    ],
  };

  // Letter positions with spacing
  const letterOffsets = {
    'R': 0,
    'L': 70,
    'T': 140,
    'R2': 210,
  };

  const allStrokes = [
    ...letterStrokes.R.map((s, i) => ({ ...s, letter: 'R', offsetX: letterOffsets.R, index: i })),
    ...letterStrokes.L.map((s, i) => ({ ...s, letter: 'L', offsetX: letterOffsets.L, index: i })),
    ...letterStrokes.T.map((s, i) => ({ ...s, letter: 'T', offsetX: letterOffsets.T, index: i })),
    ...letterStrokes.R2.map((s, i) => ({ ...s, letter: 'R2', offsetX: letterOffsets.R2, index: i })),
  ];

  // Calculate center offset for perfect centering
  const totalWidth = letterOffsets.R2 + 64; // Last letter offset + letter width
  const svgWidth = 400;
  const centerOffset = (svgWidth - totalWidth) / 2;

  return (
    <div className="relative flex items-center justify-center" style={{ width: '100%', height: '100%' }}>
      <svg viewBox="0 0 400 120" width={500} height={150} className="text-gradient-dark" style={{ overflow: 'visible' }}>
        {allStrokes.map((stroke) => {
          const finalX = centerOffset + stroke.offsetX + stroke.x;
          const finalY = stroke.y + 15; // Center vertically
          
          // Slide in from different directions
          const slideDirection = stroke.index % 4;
          let initialX = finalX;
          let initialY = finalY;
          
          if (slideDirection === 0) initialX = -200;
          else if (slideDirection === 1) initialX = 600;
          else if (slideDirection === 2) initialY = -150;
          else initialY = 300;

          return (
            <motion.rect
              key={`stroke-${stroke.letter}-${stroke.index}`}
              x={finalX}
              y={finalY}
              width={stroke.width}
              height={stroke.height}
              rx={stroke.rx}
              ry={stroke.rx}
              fill="currentColor"
              initial={{ 
                x: initialX,
                y: initialY,
                opacity: 0,
                scale: 0.5,
                rotate: (stroke as any).rotate || 0,
              }}
              animate={{
                x: isVisible ? finalX : initialX,
                y: isVisible ? finalY : initialY,
                opacity: isTransitioning ? 0 : (isVisible ? 0.95 : 0),
                scale: isTransitioning ? 0.6 : (isVisible ? 1 : 0.5),
                rotate: isVisible ? ((stroke as any).rotate || 0) : ((stroke as any).rotate ? (stroke as any).rotate + 45 : 0),
              }}
              transition={{
                x: {
                  duration: 0.8,
                  delay: stroke.delay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
                y: {
                  duration: 0.8,
                  delay: stroke.delay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
                opacity: {
                  duration: 0.5,
                  delay: stroke.delay,
                  ease: "easeOut",
                },
                scale: {
                  duration: 0.6,
                  delay: stroke.delay,
                  ease: "easeOut",
                },
                rotate: {
                  duration: 0.7,
                  delay: stroke.delay,
                  ease: "easeOut",
                },
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};


export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [logoVisible, setLogoVisible] = useState(false);
  const [logoTransitioning, setLogoTransitioning] = useState(false);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Animation sequence:
    // 1. Rectangles slide in to form RLTR (starts immediately, takes ~2.5s)
    // 2. Logo visible and stable (at 2.5s)
    // 3. Logo transitions out (at 3.5s)
    // 4. Site content fades in with motion (starts at 3.5s)
    // 5. Hide loading overlay (at 4.2s)
    
    const timer1 = setTimeout(() => {
      setLogoVisible(true);
    }, 100);

    const timer2 = setTimeout(() => {
      setLogoTransitioning(true);
    }, 3500);

    const timer3 = setTimeout(() => {
      setIsLoading(false);
      // Ensure we're at the top after animation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 100);
    }, 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden bg-white text-neutral-900 antialiased">
      {/* Loading/Logo Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* RLTR Logo Animation - Squid Game style */}
              <RLTRLogoAnimation isVisible={logoVisible} isTransitioning={logoTransitioning} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content - fades in with upward motion seamlessly after logo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ 
          opacity: isLoading ? 0 : 1,
          y: isLoading ? 30 : 0,
        }}
        transition={{
          duration: 1.0,
          delay: 3.5,
          ease: "easeOut",
        }}
        className="relative w-full"
      >
      {/* Premium animated gradient background - refined titanium to silver penetrating white */}
      <div className="fixed inset-0 gradient-mesh opacity-15" />
      <div className="fixed inset-0 gradient-mesh-2 opacity-12" />
      
      {/* Premium gradient streams flowing through white */}
      <PremiumGradientStream />
      
      {/* Premium floating gradient orbs - refined and subtle */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <PremiumGradientShape size={600} delay={0} position="top" />
        <PremiumGradientShape size={550} delay={8} position="topRight" />
        <PremiumGradientShape size={500} delay={15} position="middle" />
        <PremiumGradientShape size={450} delay={12} position="middleRight" />
        <PremiumGradientShape size={550} delay={5} position="bottom" />
        <PremiumGradientShape size={500} delay={18} position="bottomRight" />
      </div>

      {/* Mouse follower glow effect - refined premium silver */}
      <motion.div
        className="fixed w-96 h-96 rounded-full blur-[140px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(163,163,163,0.10) 0%, rgba(212,212,212,0.07) 50%, transparent 70%)',
        }}
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 35 }}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-neutral-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="text-2xl font-bold tracking-tight text-gradient-dark">
            RLTR
          </Link>
          </motion.div>
          <div className="flex items-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              href="/login" 
                className="text-sm hover:text-neutral-600 transition-colors relative group font-medium text-neutral-700"
            >
              Log In
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neutral-400 to-neutral-600 group-hover:w-full transition-all duration-300" />
            </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              href="/signup"
                className="text-sm px-6 py-2.5 rounded-full bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-500 hover:from-neutral-600 hover:via-neutral-500 hover:to-neutral-400 transition-all duration-300 shadow-lg shadow-neutral-500/20 font-medium text-white"
            >
              Sign Up
            </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-48 pb-40 px-6 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-sm text-sm font-medium text-neutral-600 border border-neutral-200/60 shadow-sm">
              AI-Native Real Estate Platform
            </span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[1.1] mb-8">
            <div className="mb-4">
              <span className="text-gradient-dark">
                <AnimatedWords text="The Future" delay={0.4} />
              </span>
            </div>
            <div className="mb-4">
              <span className="text-neutral-900">
                <AnimatedWords text="of Real Estate" delay={0.8} />
              </span>
            </div>
            <div className="mb-4">
              <span className="text-gradient-dark">
                <AnimatedWords text="Isn't About More Tools." delay={1.2} />
              </span>
            </div>
            <div>
              <span className="text-neutral-900">
                <AnimatedWords text="It's About Better Systems." delay={1.6} />
              </span>
            </div>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="text-xl md:text-2xl font-light text-neutral-600 mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            One intelligent operating system. Everything you need, nothing you don't.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(82, 82, 82, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
          <Link 
            href="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-500 text-white text-base font-semibold hover:from-neutral-600 hover:via-neutral-500 hover:to-neutral-400 transition-all duration-300 shadow-xl shadow-neutral-500/20 relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/80 backdrop-blur-sm text-neutral-700 text-base font-medium border border-neutral-300 hover:border-neutral-400 transition-all shadow-sm">
                Watch Demo
              </button>
            </motion.div>
          </motion.div>

          {/* Animated stats or features preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
            className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { label: 'AI-Powered', value: '100%', subtext: 'Intelligent Automation' },
              { label: 'Unified Platform', value: '6-in-1', subtext: 'All Tools Integrated' },
              { label: 'Time Saved', value: '10+ hrs', subtext: 'Per Week' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.8 + i * 0.1 }}
                whileHover={{ scale: 1.02, y: -3 }}
                className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl font-bold text-gradient-dark mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-neutral-900 mb-1">{stat.label}</div>
                <div className="text-sm text-neutral-600">{stat.subtext}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative py-40 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gradient-dark">
              The Problem
            </h2>
            <p className="text-2xl md:text-3xl font-light text-neutral-700 leading-relaxed max-w-4xl mx-auto">
            Real estate agents spend more time managing software than serving clients.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {[
              'Six different tools',
              'Six logins',
              'Six workflows',
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.02, y: -3 }}
                className="bg-white rounded-xl p-8 border border-neutral-100 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-3">
                  <AbstractIcon type="target" size={40} className="text-red-500" />
                </div>
                <div className="text-lg font-medium text-neutral-900">{item}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-center text-neutral-900"
          >
            This isn't innovation. This is fragmentation dressed up as progress.
          </motion.p>
        </div>
      </section>

      {/* What is RLTR */}
      <section className="relative py-40 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center text-gradient-dark">
            What is RLTR?
          </h2>
            <div className="bg-white rounded-3xl p-16 border border-neutral-100 shadow-md">
          <p className="text-xl md:text-2xl font-light text-neutral-700 leading-relaxed mb-6">
                RLTR is an <span className="text-gradient-dark font-semibold">AI-native operating system</span> built specifically for real estate professionals. 
            We've unified everything you need into one intelligent platform that understands context, 
            adapts to your workflow, and eliminates the need for multiple disconnected tools.
          </p>
          <p className="text-xl md:text-2xl font-light text-neutral-700 leading-relaxed">
                Instead of juggling six different applications, you get <span className="text-gradient-dark font-semibold">one seamless experience</span> where 
            every feature works together, powered by AI that understands real estate, not just 
            generic business processes.
          </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-40 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient-dark">
              Everything You Need
          </h2>
            <p className="text-2xl text-neutral-600">All in One Place</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Intelligent MLS Search',
                description: 'Search the MLS using natural language. No complex filters or confusing interfaces. Just describe what you\'re looking for—"3 bedroom homes under $500k with a backyard near good schools"—and RLTR finds the perfect matches instantly.',
                icon: 'search',
                gradient: 'from-neutral-600 to-neutral-400',
              },
              {
                title: 'Automated Contract Generation',
                description: 'Draft contracts automatically with AI that understands real estate context. Generate purchase agreements, addendums, and disclosures in seconds.',
                icon: 'document',
                gradient: 'from-neutral-500 to-neutral-300',
              },
              {
                title: 'Unified Transaction Management',
                description: 'Coordinate entire transactions in one place. Track all parties, deadlines, documents, and communications. Get automatic updates when milestones are reached.',
                icon: 'chart',
                gradient: 'from-neutral-600 to-neutral-400',
              },
              {
                title: 'AI-Powered Communication',
                description: 'Smart email and messaging that understands context. Draft professional responses, schedule follow-ups automatically, and never miss an important client interaction.',
                icon: 'chat',
                gradient: 'from-neutral-500 to-neutral-300',
              },
              {
                title: 'Custom Workflow Automation',
                description: 'Build custom automations without writing code. Create workflows that adapt to your process—from lead capture to closing.',
                icon: 'bolt',
                gradient: 'from-neutral-600 to-neutral-400',
              },
              {
                title: 'Integrated CRM',
                description: 'Built-in CRM that tracks every interaction automatically. Know exactly where each client is in their journey, what they\'re looking for, and when to follow up.',
                icon: 'users',
                gradient: 'from-neutral-500 to-neutral-300',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-2xl p-10 border border-neutral-100 hover:border-neutral-200 transition-all group shadow-md hover:shadow-lg"
              >
                <div className={`mb-6 inline-block p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-90 group-hover:opacity-100 transition-opacity text-white shadow-md`}>
                  <AbstractIcon type={feature.icon} size={50} className="text-white" />
            </div>
                <h3 className="text-2xl font-bold mb-4 text-neutral-900">{feature.title}</h3>
                <p className="text-lg font-light text-neutral-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-40 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient-dark">
            How RLTR Works
          </h2>
          </motion.div>
          
          <div className="space-y-8">
            {[
              {
                title: 'One Login, One Platform',
                description: 'Access everything through a single, secure account. No more password managers or browser tabs filled with different tools.',
                icon: 'lock',
              },
              {
                title: 'AI That Understands Context',
                description: 'Our AI doesn\'t just follow commands—it understands real estate. It knows what a "CMA" is, understands market conditions, recognizes transaction stages, and anticipates what you need next.',
                icon: 'brain',
              },
              {
                title: 'Everything Connected',
                description: 'When you search for a property, it\'s automatically saved to your client\'s file. When you draft a contract, it\'s linked to the transaction timeline. When you send an email, it\'s logged in the CRM.',
                icon: 'connection',
              },
              {
                title: 'Adapts to You',
                description: 'RLTR learns your preferences, your workflow, and your style. The more you use it, the better it gets at anticipating your needs and automating routine tasks.',
                icon: 'target',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ x: 5 }}
                className="bg-white rounded-2xl p-10 border border-neutral-100 flex items-start gap-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-neutral-700 flex-shrink-0">
                  <AbstractIcon type={item.icon} size={60} className="text-neutral-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-neutral-900">{item.title}</h3>
                  <p className="text-lg font-light text-neutral-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="relative py-40 px-6">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-20 border border-neutral-100 shadow-md"
          >
            <p className="text-3xl md:text-4xl font-light text-neutral-700 mb-8 leading-relaxed">
            This is what modern real estate infrastructure should look like.
          </p>
            <p className="text-4xl md:text-5xl font-bold mb-12 text-gradient-dark">
            Unified. Intelligent. Effortless.
          </p>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(82, 82, 82, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
          <Link 
            href="/signup"
                className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-500 text-white text-lg font-semibold hover:from-neutral-600 hover:via-neutral-500 hover:to-neutral-400 transition-all duration-300 shadow-xl shadow-neutral-500/20 relative overflow-hidden group"
          >
                <span className="relative z-10">Get Started Now</span>
                <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative border-t border-neutral-100 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="text-sm text-neutral-500">
              © 2025 RLTR. AI-Native Infrastructure for Real Estate.
            </div>
            <div className="flex gap-8 text-sm">
              <a href="mailto:hello@rltr.com" className="hover:text-neutral-700 transition-colors text-neutral-600">
                Contact
              </a>
              <a href="#" className="hover:text-neutral-700 transition-colors text-neutral-600">
                Privacy
              </a>
              <a href="#" className="hover:text-neutral-700 transition-colors text-neutral-600">
                Terms
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
      </motion.div>
    </main>
  );
}

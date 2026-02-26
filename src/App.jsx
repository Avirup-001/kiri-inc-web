import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight, Activity, Terminal, Crosshair, Cpu, CheckCircle2, Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Global Noise Overlay
const GlobalNoise = () => (
  <div className="pointer-events-none fixed z-[9999] opacity-5">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 h-full w-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

// Magnetic Button Utility Component
const MagneticBtn = ({ children, className = '', onClick }) => {
  const btnRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(btnRef.current, { scale: 1.03, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
  };

  return (
    <button
      ref={btnRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-full font-heading font-bold transition-transform will-change-transform ${className}`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      <span className="absolute inset-0 z-0 translate-y-[100%] bg-dark transition-transform duration-300 group-hover:translate-y-0" />
    </button>
  );
};

// Navbar: The Floating Island
const Navbar = () => {
  const navRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: {
          targets: navRef.current,
          className: 'scrolled'
        }
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed left-0 right-0 top-6 z-50 flex justify-center px-4 pointer-events-none isolation-isolate">
        <nav
          ref={navRef}
          className="group relative flex w-full max-w-5xl items-center justify-between rounded-full px-6 py-4 pointer-events-auto"
          aria-label="Primary"
        >
          {/* frosted background (transparent initially, frosted on scroll) */}
          <div
            className="absolute inset-0 -z-10 rounded-full bg-white border border-transparent transition-all duration-500 group-[.scrolled]:bg-white/90 group-[.scrolled]:backdrop-blur-md group-[.scrolled]:backdrop-saturate-150 group-[.scrolled]:border-dark/10"
          />

          {/* content (text uses mix-blend-mode so color adapts to page behind) */}
          <div className="text-xl font-bold uppercase tracking-tight">
            <a href="#" className="text-accent leading-none">KIRI</a>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="mix-blend-difference text-white">Systems</a>
            <a href="#philosophy" className="mix-blend-difference text-white">Signal</a>
            <a href="#protocol" className="mix-blend-difference text-white">Protocol</a>
            <a href="#pricing" className="mix-blend-difference text-white">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <MagneticBtn className="hidden md:block relative bg-accent px-6 py-2 text-white pointer-events-auto">
              <span className="mix-blend-difference inline-flex items-center gap-2">Deploy <ArrowUpRight className="h-4 w-4" /></span>
            </MagneticBtn>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden flex items-center justify-center p-2 rounded-full pointer-events-auto bg-dark border border-dark/20 text-paper transition-transform active:scale-95"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Cinematic Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-dark text-paper transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-auto flex flex-col justify-center items-center ${isMenuOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-105'
          }`}
      >
        <div className="absolute top-6 left-0 right-0 px-6 sm:px-10 flex justify-between items-center text-xl font-bold uppercase tracking-tight h-[72px]">
          <a href="#" className="text-accent leading-none" onClick={() => setIsMenuOpen(false)}>KIRI</a>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-3 bg-paper/10 border border-paper/10 rounded-full hover:bg-paper/20 transition-all active:scale-95"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col gap-8 text-center text-5xl sm:text-6xl font-heading uppercase font-bold tracking-tighter w-full px-6">
          <a href="#features" onClick={() => setIsMenuOpen(false)} className="hover:text-accent transition-colors">Systems</a>
          <a href="#philosophy" onClick={() => setIsMenuOpen(false)} className="hover:text-accent transition-colors">Signal</a>
          <a href="#protocol" onClick={() => setIsMenuOpen(false)} className="hover:text-accent transition-colors">Protocol</a>
          <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="hover:text-accent transition-colors">Pricing</a>
        </div>

        <div className="absolute bottom-12 w-full px-6 flex flex-col items-center">
          <div className="w-full h-px bg-paper/10 mb-8 max-w-sm"></div>
          <MagneticBtn onClick={() => setIsMenuOpen(false)} className="w-full max-w-sm bg-accent text-white py-5 text-lg shadow-[0_0_30px] shadow-accent/20 [&>span.absolute]:bg-paper [&:hover>span.relative]:text-dark">
            Initialize Protocol <ArrowUpRight className="w-5 h-5 ml-2" />
          </MagneticBtn>
        </div>
      </div>
    </>
  );
};

// Hero: The Opening Shot
const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-elem', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative flex min-h-[100dvh] items-end pb-24 pt-32 lg:pb-32">
      {/* Background Image & Gradient */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1504625709867-b4e45e3bb9dd?q=80&w=2352&auto=format&fit=crop")' }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-dark via-dark/95 to-dark/40" />

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="max-w-4xl text-white">
          <h1 className="flex flex-col gap-2">
            <span className="hero-elem font-heading text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tighter text-paper">
              Deploy the
            </span>
            <span className="hero-elem font-drama text-6xl md:text-8xl lg:text-[9rem] leading-[0.85] italic pr-10">
              Growth Engine.
            </span>
          </h1>
          <p className="hero-elem mt-8 max-w-xl font-data text-sm md:text-base leading-relaxed uppercase tracking-widest">
            High-revenue systems for B2B agencies. We start sending on Day 1.
          </p>
          <div className="hero-elem mt-12 flex items-center gap-6">
            <MagneticBtn className="bg-accent px-8 py-4 text-paper text-lg [&>span.absolute]:bg-paper [&:hover>span.relative]:text-dark">
              Initialize Protocol <ArrowRight className="h-5 w-5" />
            </MagneticBtn>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- FEATURES SECTION COMPONENTS ---

const DiagnosticShuffler = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'SYS_ONBOARD', desc: 'Agent Initialization', icon: Cpu },
    { id: 2, title: 'REV_WARP', desc: 'Campaign Velocity', icon: Activity },
    { id: 3, title: 'TIME_TO_REV', desc: 'Send on Day 1', icon: CheckCircle2 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 w-full group">
      <style>{`
        @keyframes load-progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .load-bar {
          animation: load-progress 3s linear forwards;
        }
      `}</style>
      {cards.map((card, i) => {
        const isTop = i === 0;
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`absolute inset-0 flex w-full h-full flex-col justify-between p-6 rounded-[2rem] shadow-xl transition-all duration-[800ms] font-data overflow-hidden border
              ${isTop
                ? 'bg-paper border-accent/40 text-dark shadow-accent/10'
                : 'bg-paper border-dark/10 text-dark'}`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: `translateY(${i * 16}px) scale(${1 - i * 0.05})`,
              zIndex: 3 - i,
              opacity: 1 - i * 0.3,
            }}
          >
            {/* Header Status */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 opacity-80">
                <div className={`relative flex items-center justify-center w-3 h-3 rounded-full ${isTop ? 'bg-accent/20' : 'bg-dark/10'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isTop ? 'bg-accent' : 'bg-dark/30'}`} />
                  {isTop && <span className="absolute inset-0 rounded-full border border-accent animate-ping opacity-75"></span>}
                </div>
                <span className="font-bold tracking-widest">SEQ_{i + 1}</span>
              </div>
              <span className="opacity-40">{isTop ? '[ RUNNING ]' : '[ WAIT ]'}</span>
            </div>

            {/* Content */}
            <div className={`transform transition-all duration-[800ms] delay-100 ${isTop ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-50'}`}>
              <div className={`flex items-center gap-3 mb-1 ${isTop ? 'text-accent' : 'text-dark/40'}`}>
                <Icon className="w-6 h-6" />
                <div className="text-xl font-bold tracking-tight">{card.title}</div>
              </div>
              <div className={`${isTop ? 'opacity-80' : 'opacity-60'} text-sm pl-9 transition-colors duration-700`}>{card.desc}</div>
            </div>

            {/* Progress Bar */}
            <div className={`h-[2px] w-full rounded-full overflow-hidden mt-4 transition-colors duration-700 ${isTop ? 'bg-paper/10' : 'bg-dark/5'}`}>
              <div
                key={isTop ? `active-${card.id}` : `inactive-${card.id}`}
                className={`h-full relative ${isTop ? 'bg-accent load-bar' : 'bg-dark/10 w-0'}`}
              >
                {isTop && (
                  <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/60"></div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div >
  );
};

const TelemetryTypewriter = () => {
  const text = "AI_MODEL: Custom trained.\nACQUISITION: Personalized.\nCOST: Optimized.\nSTATUS: Active.";
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < text.length) {
        setDisplayed(text.slice(0, current + 1));
        current++;
      } else {
        setTimeout(() => { current = 0; setDisplayed(''); }, 2000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-64 w-full p-6 border border-dark/10 rounded-[2rem] bg-dark text-paper">
      <div className="flex items-center gap-2 mb-4 font-data text-xs opacity-70">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Live Feed
      </div>
      <pre className="font-data text-sm whitespace-pre-wrap leading-relaxed text-balance">
        {displayed}<span className="inline-block w-2 bg-accent ml-1 animate-pulse">&nbsp;</span>
      </pre>
    </div>
  );
};

const CursorProtocolScheduler = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const gridRef = useRef(null);
  const cursorRef = useRef(null);
  const [activeDay, setActiveDay] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const getPos = (selector, offsetX = 0, offsetY = 0) => {
        const el = gridRef.current.querySelector(selector);
        if (!el) return { x: 0, y: 0 };
        const gridRect = gridRef.current.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        return {
          x: elRect.left - gridRect.left + (elRect.width / 2) + offsetX - 8,
          y: elRect.top - gridRect.top + (elRect.height / 2) + offsetY - 8
        };
      };

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, repeatRefresh: true });

      tl.to(cursorRef.current, { duration: 1, ease: 'power2.inOut', x: () => getPos('.day-target-3').x, y: () => getPos('.day-target-3').y })
        .to(cursorRef.current, { scale: 0.9, duration: 0.1, ease: 'power2.in' }) // Click down
        .add(() => setActiveDay(3)) // Wednesday
        .to(cursorRef.current, { scale: 1, duration: 0.1, ease: 'power2.out' }) // Click up
        .to(cursorRef.current, { duration: 0.8, ease: 'power2.inOut', delay: 0.5, x: () => getPos('.save-route-btn').x, y: () => getPos('.save-route-btn').y })
        .to(cursorRef.current, { scale: 0.9, duration: 0.1, ease: 'power2.in' }) // Click down on save
        .to(cursorRef.current, { scale: 1, duration: 0.1, ease: 'power2.out' }) // Click up on save
        .to(cursorRef.current, { opacity: 0, duration: 0.2 })
        .add(() => setActiveDay(null))
        .set(cursorRef.current, { x: -20, y: -20, opacity: 1, delay: 0.5 });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={gridRef} className="relative h-64 w-full p-6 border border-dark/10 rounded-[2rem] bg-paper overflow-hidden flex flex-col justify-between">
      <div className="font-heading font-bold text-dark text-sm uppercase">Proven Vendor Routing</div>
      <div>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {days.map((d, i) => (
            <div key={i} className={`day-target-${i} aspect-square rounded flex items-center justify-center font-data text-xs border ${activeDay === i ? 'bg-accent text-white border-accent' : 'border-dark/10 text-dark/50'}`}>
              {d}
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button className="save-route-btn px-4 py-1 text-xs font-bold bg-dark text-paper rounded border border-dark">Save Route</button>
        </div>
      </div>
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 z-10 pointer-events-none drop-shadow-md origin-top-left"
        style={{ transform: 'translate(-20px, -20px)' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark bg-paper/50 rounded-full backdrop-blur-[2px]">
          <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="currentColor" />
          <path d="m13 13 6 6" />
        </svg>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 md:px-12 lg:px-24 bg-background z-10 relative rounded-t-[3rem] -mt-8 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="flex flex-col gap-6">
            <DiagnosticShuffler />
            <div>
              <h3 className="font-heading text-xl font-bold uppercase">Rapid Velocity</h3>
              <p className="mt-2 font-data text-sm opacity-70">Short time-to-revenue. We initiate sequences and send on Day 1.</p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col gap-6">
            <TelemetryTypewriter />
            <div>
              <h3 className="font-heading text-xl font-bold uppercase">AI Acquisition</h3>
              <p className="mt-2 font-data text-sm opacity-70">Lowest acquisition costs via AI-driven personalization and preferred pricing.</p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col gap-6">
            <CursorProtocolScheduler />
            <div>
              <h3 className="font-heading text-xl font-bold uppercase">Proven Reliability</h3>
              <p className="mt-2 font-data text-sm opacity-70">Battle-tested vendor supporting multibillion-dollar portfolio entities.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- PHILOSOPHY SECTION ---
const Philosophy = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-line', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="philosophy" className="relative py-48 bg-dark text-paper overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-30"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1541888043681-370c9ebbe559?q=80&w=2938&auto=format&fit=crop")' }}
      />
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="phil-line font-heading text-lg md:text-xl text-paper/60 uppercase tracking-widest mb-12">
          Most agencies focus on: <span className="text-paper">Activity metrics and retainers.</span>
        </div>
        <div className="font-drama text-4xl md:text-6xl lg:text-7xl leading-[1.1]">
          <div className="phil-line">We focus on:</div>
          <div className="phil-line italic text-accent mt-2">Precision revenue architecture.</div>
        </div>
      </div>
    </section>
  );
};

// --- PROTOCOL SECTION ---
const SignalExtractionSVG = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-accent p-8 animate-[spin_10s_linear_infinite]">
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
    <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" className="opacity-70" />
    <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="3" />
    <path d="M50 2 v8 M50 90 v8 M2 50 h8 M90 50 h8" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const HyperTargetingSVG = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full relative">
    <defs>
      <pattern id="dotGrid" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="1" className="fill-dark/20" />
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#dotGrid)" />
    <g className="animate-[scan_3s_ease-in-out_infinite_alternate] origin-left">
      <line x1="0" y1="0" x2="0" y2="100" className="stroke-accent" strokeWidth="2" />
      <rect x="-20" y="0" width="20" height="100" fill="currentColor" className="text-accent opacity-20" />
    </g>
    <style>{`
      @keyframes scan {
        0% { transform: translateX(0px); }
        100% { transform: translateX(100px); }
      }
    `}</style>
  </svg>
);

const ConversionProtocolSVG = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full p-6 text-dark relative">
    <path
      d="M0 50 H 20 L 30 20 L 45 80 L 60 10 L 75 80 L 85 50 H 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-20"
    />
    <path
      d="M0 50 H 20 L 30 20 L 45 80 L 60 10 L 75 80 L 85 50 H 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent ekg-path"
      strokeDasharray="300"
      strokeDashoffset="300"
    />
    <style>{`
      .ekg-path {
        animation: dash 3s ease-in-out infinite;
      }
      @keyframes dash {
        0% { stroke-dashoffset: 300; }
        50% { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -300; }
      }
    `}</style>
  </svg>
);
const ProtocolCard = ({ step, title, desc, SVGComponent }) => {
  return (
    <div className="panel min-h-[100dvh] md:h-[100dvh] w-full flex items-center justify-center border-t border-dark/10 py-24 md:py-0 relative z-10 bg-background">
      <div className="w-full max-w-7xl px-6 md:px-12 lg:px-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="font-data text-accent mb-4">STEP {step}</div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mb-6">{title}</h2>
          <p className="font-data text-lg opacity-70 leading-relaxed max-w-md">{desc}</p>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="w-64 h-64 border border-dark rounded-full flex items-center justify-center bg-paper/50 relative overflow-hidden">
            <SVGComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Use matchMedia to only apply heavy scroll-jacking/pinning on tablets+
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const panels = gsap.utils.toArray('.panel');
        panels.forEach((panel, i) => {
          if (i !== panels.length - 1) {
            ScrollTrigger.create({
              trigger: panel,
              start: 'top top',
              endTrigger: panels[i + 1],
              end: 'top top',
              pin: true,
              pinSpacing: false,
              animation: gsap.to(panel, {
                scale: 0.9,
                opacity: 0.5,
                filter: 'blur(20px)',
                duration: 1,
                ease: 'none'
              }),
              scrub: true,
            });
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={containerRef} className="relative z-20 bg-background">
      <ProtocolCard
        step="01"
        title="Signal Extraction"
        desc="We map your high-value targets using proprietary intelligence networks."
        SVGComponent={SignalExtractionSVG}
      />
      <ProtocolCard
        step="02"
        title="Hyper-Targeting"
        desc="AI-driven personalization segments deploy thousands of unique matrices."
        SVGComponent={HyperTargetingSVG}
      />
      <ProtocolCard
        step="03"
        title="Conversion Protocol"
        desc="Meetings land in your calendar. Friction is systematically eradicated."
        SVGComponent={ConversionProtocolSVG}
      />
    </section>
  );
};

// --- PRICING SECTION ---
const Pricing = () => {
  return (
    <section id="pricing" className="py-32 px-6 md:px-12 lg:px-24 bg-background z-20 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-4">Membership Tiers</h2>
          <p className="font-data text-sm opacity-70">Select the deployment capacity that matches your growth velocity.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Card 1 */}
          <div className="p-8 border border-dark/10 rounded-[2rem] bg-paper relative z-10 transition-transform hover:-translate-y-1 duration-300">
            <h3 className="font-heading text-lg font-bold uppercase mb-2">Essential</h3>
            <div className="font-drama text-4xl mb-6">$1,500<span className="text-lg font-data opacity-50">/mo</span></div>
            <ul className="font-data text-sm space-y-4 mb-8 opacity-80">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Up to 5 AI Agents</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> 10,000 Outreach/mo</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Basic Reporting</li>
            </ul>
            <button className="w-full py-4 rounded-full border border-dark font-heading font-bold text-sm uppercase transition-colors hover:bg-dark hover:text-paper">Deploy Essential</button>
          </div>
          {/* Card 2 - Middle Pop */}
          <div className="p-10 border border-accent rounded-[2rem] bg-dark text-paper relative transform md:-translate-y-8 md:scale-105 shadow-[0_0_60px_-15px] shadow-accent/40 z-20 transition-transform duration-500 hover:scale-[1.07]">
            {/* Background Glow Overlay */}
            <div className="absolute inset-0 rounded-[2rem] border-2 border-accent/50 overflow-hidden pointer-events-none">
              <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-accent/20 to-transparent"></div>
            </div>

            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-dark border border-accent text-paper px-5 py-1.5 rounded-full font-data text-xs font-bold uppercase tracking-wider shadow-[0_0_20px] shadow-accent/30 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Recommended
            </div>

            <div className="relative z-10">
              <h3 className="font-heading text-xl font-bold uppercase mb-2 text-accent">Performance</h3>
              <div className="font-drama text-6xl mb-6 drop-shadow-lg">$3,500<span className="text-xl font-data opacity-50">/mo</span></div>
              <ul className="font-data text-sm space-y-4 mb-8 opacity-90">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Up to 20 AI Agents</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> 50,000 Outreach/mo</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Hyper-Personalization</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Priority Support</li>
              </ul>
              <MagneticBtn className="w-full bg-accent text-white py-4 mt-4 shadow-[0_0_20px] shadow-accent/30 [&>span.absolute]:bg-paper [&:hover>span.relative]:text-dark">
                Deploy Performance <ArrowRight className="w-4 h-4 ml-1" />
              </MagneticBtn>
            </div>
          </div>
          {/* Card 3 */}
          <div className="p-8 border border-dark/10 rounded-[2rem] bg-paper relative z-10 transition-transform hover:-translate-y-1 duration-300">
            <h3 className="font-heading text-lg font-bold uppercase mb-2">Enterprise</h3>
            <div className="font-drama text-4xl mb-6">Custom</div>
            <ul className="font-data text-sm space-y-4 mb-8 opacity-80">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Unlimited AI Agents</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Custom Infrastructure</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Dedicated Engineer</li>
            </ul>
            <button className="w-full py-4 rounded-full border border-dark font-heading font-bold text-sm uppercase transition-colors hover:bg-dark hover:text-paper">Contact Sales</button>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- GET STARTED & FOOTER ---
const CallToAction = () => {
  return (
    <section className="py-32 bg-dark text-paper text-center px-6 relative z-30 rounded-t-[3rem] -mt-8 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-8">Initiate Growth Sequence</h2>
        <MagneticBtn className="bg-accent px-10 py-5 text-paper text-xl [&>span.absolute]:bg-paper [&:hover>span.relative]:text-dark">
          Book a Growth Mapping Call <ArrowRight className="h-6 w-6 ml-2" />
        </MagneticBtn>
      </div>
    </section>
  );
};

const Footer = ({ onOpenLegal }) => {
  return (
    <footer className="bg-dark text-paper/50 px-6 md:px-12 py-8 relative z-30 font-data text-xs border-t border-paper/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          ALL SYSTEMS OPERATIONAL
        </div>
        <div>
          &copy; {new Date().getFullYear()} Kiri Inc.
        </div>
        <div className="flex gap-6">
          <button onClick={() => onOpenLegal('terms')} className="hover:text-paper transition-colors uppercase">TERMS</button>
          <button onClick={() => onOpenLegal('privacy')} className="hover:text-paper transition-colors uppercase">PRIVACY</button>
        </div>
      </div>
    </footer>
  );
};

const LegalModal = ({ title, lastUpdated, children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-background text-dark overflow-y-auto">
      <div className="min-h-[100dvh] pt-32 pb-24 px-6 md:px-12 lg:px-24 relative">
        <button
          onClick={onClose}
          className="fixed top-8 left-6 md:left-12 flex items-center gap-2 font-data text-xs uppercase opacity-50 hover:opacity-100 transition-opacity bg-background/80 px-4 py-2 rounded-full backdrop-blur z-50 border border-dark/10"
        >
          <X className="w-4 h-4" /> Close
        </button>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-4">{title}</h1>
          <div className="font-data text-sm opacity-50 mb-12">LAST UPDATED: {lastUpdated}</div>
          <div className="font-data text-sm md:text-base opacity-80 space-y-6 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const TermsContent = () => (
  <>
    <p>1. ACCEPTANCE OF TERMS</p>
    <p>By accessing or using the Kiri Inc. ("Company," "we," "us," or "our") website, platform, and services (collectively, the "Services"), you agree to abide by these Terms of Service. If you do not agree with any part of these terms, you may not access the Services.</p>

    <p>2. DESCRIPTION OF SERVICE</p>
    <p>Kiri Inc. provides a precision revenue architecture and AI-driven outreach platform. We reserve the right to modify, suspend, or discontinue the Services at any time, with or without notice.</p>

    <p>3. USER OBLIGATIONS</p>
    <p>You agree to use the Services only for lawful purposes. You are strictly prohibited from using the platform to deploy malicious sequences, engage in unauthorized data scraping, or violate any applicable spam and electronic communications regulations (e.g., CAN-SPAM, GDPR).</p>

    <p>4. INTELLECTUAL PROPERTY</p>
    <p>All content, algorithms, methodologies, and visual interfaces associated with the Services are the exclusive property of Kiri Inc. You are granted no licenses or rights to our intellectual property by using our Services.</p>

    <p>5. LIMITATION OF LIABILITY</p>
    <p>Kiri Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Services. Our total liability shall not exceed the amount you paid us in the past twelve (12) months.</p>
  </>
);

const PrivacyContent = () => (
  <>
    <p>1. INFORMATION WE COLLECT</p>
    <p>We collect information you provide directly to us (e.g., when you register, book a call, or contact support). We also automatically collect telemetry data, logs, and device information when you interact with our Services.</p>

    <p>2. HOW WE USE YOUR INFORMATION</p>
    <p>We use the collected information to provision, maintain, and improve our Services, to process your transactions, to communicate with you, and to personalize your experience. Your data directly fuels the AI acquisition matrices we deploy on your behalf.</p>

    <p>3. DATA SHARING AND DISCLOSURE</p>
    <p>We do not sell your personal data. We may share information with trusted third-party vendors and routing partners who assist us in operating our platform, provided they agree to maintain confidentiality.</p>

    <p>4. DATA SECURITY</p>
    <p>We implement enterprise-grade technical and organizational measures to protect your data against unauthorized access, alteration, or destruction. However, no internet-based service is 100% secure.</p>

    <p>5. YOUR RIGHTS</p>
    <p>Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict the processing of your personal data. Contact us directly to execute any data subject requests.</p>
  </>
);

export default function App() {
  const [legalDoc, setLegalDoc] = useState(null); // 'terms' | 'privacy' | null

  return (
    <main className="relative bg-background text-dark overflow-x-hidden">
      <GlobalNoise />
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Pricing />
      <CallToAction />
      <Footer onOpenLegal={setLegalDoc} />

      {legalDoc === 'terms' && (
        <LegalModal title="Terms of Service" lastUpdated="January 1, 2026" onClose={() => setLegalDoc(null)}>
          <TermsContent />
        </LegalModal>
      )}

      {legalDoc === 'privacy' && (
        <LegalModal title="Privacy Policy" lastUpdated="January 1, 2026" onClose={() => setLegalDoc(null)}>
          <PrivacyContent />
        </LegalModal>
      )}
    </main>
  );
}

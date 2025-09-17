import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// @component: HeroSection
export const HeroSection = () => {
  // background slideshow
  const slides = useMemo(() => [{
    id: 's1',
    src: 'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?q=80&w=2400&auto=format&fit=crop',
    alt: 'Joyful couple celebrating outdoors at sunset'
  }, {
    id: 's2',
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2400&auto=format&fit=crop',
    alt: 'Editorial bridal portrait bathed in warm light'
  }, {
    id: 's3',
    src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2400&auto=format&fit=crop',
    alt: 'Lifestyle session along the coast at sunrise'
  }] as {
    id: string;
    src: string;
    alt: string;
  }[], []);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setActive(p => (p + 1) % slides.length);
    }, 4500);
    return () => clearInterval(id);
  }, [slides.length]);
  const scrollToGallery = () => {
    const element = document.querySelector('#gallery');
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  // @return
  return <section className="relative min-h-screen flex items-end md:items-center justify-center overflow-hidden">
      {/* Background slideshow with cross-fade */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
          <AnimatePresence initial={false}>
            {slides.map((s, i) => i === active && <motion.picture key={s.id} className="absolute inset-0 block" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }} transition={{
            duration: 1.1
          }}>
                <img src={s.src} alt={s.alt} className="w-full h-full object-cover scale-105" />
              </motion.picture>)}
          </AnimatePresence>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60"></div>
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.12] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(1200px 400px at 50% 120%, rgba(0,0,0,0.5), rgba(0,0,0,0) 60%)'
      }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-0">
        <div className="max-w-4xl">
          {/* Headline + subheadline fade-in + slide-up after small delay */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: 'easeOut',
            }}
            className="mb-4 flex flex-wrap items-center gap-3 text-white/90"
          >
            <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              Johannesburg & Gauteng
            </span>
            <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              Weddings · Lifestyle · Brands
            </span>
            <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              Preview gallery in 48 hours
            </span>
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.3,
            }}
            className="text-white text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95] drop-shadow-[0_6px_30px_rgba(0,0,0,0.5)]"
          >
            <span>Timeless photographs that feel like your story</span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.45,
            }}
            className="mt-6 max-w-3xl text-white/90 text-lg md:text-2xl leading-relaxed"
          >
            <span>
              Laxportraits blends editorial direction with honest emotion so every frame feels personal, modern, and
              ready for print—whether you are celebrating a wedding, a family milestone, or a brand launch.
            </span>
          </motion.p>

          {/* CTA Buttons and stats */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {
                opacity: 0,
              },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.6,
                },
              },
            }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <motion.button
              variants={{
                hidden: {
                  opacity: 0,
                  y: 16,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
              onClick={scrollToGallery}
              className="px-6 py-3 rounded-full bg-white text-gray-900 font-semibold shadow-xl hover:shadow-2xl transition-shadow"
            >
              <span>View highlights</span>
            </motion.button>
            <motion.button
              variants={{
                hidden: {
                  opacity: 0,
                  y: 16,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
              onClick={scrollToContact}
              className="px-6 py-3 rounded-full border border-white/30 text-white backdrop-blur-md hover:border-white/50 transition-colors"
            >
              <span>Check availability</span>
            </motion.button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-white"
          >
            <div>
              <dt className="text-3xl font-semibold">9+</dt>
              <dd className="text-white/70">years behind the lens</dd>
            </div>
            <div>
              <dt className="text-3xl font-semibold">320</dt>
              <dd className="text-white/70">sessions captured</dd>
            </div>
            <div>
              <dt className="text-3xl font-semibold">48 hr</dt>
              <dd className="text-white/70">preview delivery</dd>
            </div>
          </motion.dl>
        </div>
      </div>
    </section>;
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Menu, X, MessageCircle } from 'lucide-react';
import { HeroSection } from './HeroSection';
import { PhotoGallery } from './PhotoGallery';
import { ServicesSection } from './ServicesSection';
import { ExperienceSection } from './ExperienceSection';
import { FaqSection } from './FaqSection';
import { ContactForm } from './ContactForm';
import { getAvailabilityForService } from '../../content/availability';

// @component: PhotographyLandingPage
export const PhotographyLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const weddingsAvailability = getAvailabilityForService('weddings-and-elopements');
  const navigationItems = [{
    label: 'Home',
    href: '#home'
  }, {
    label: 'Portfolio',
    href: '#gallery'
  }, {
    label: 'Services',
    href: '#services'
  }, {
    label: 'Experience',
    href: '#experience'
  }, {
    label: 'FAQ',
    href: '#faq'
  }, {
    label: 'Contact',
    href: '#lead-form'
  }] as any[];
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({
      behavior: 'smooth'
    });
    setIsMenuOpen(false);
  };

  // @return
  return <div className="min-h-screen bg-white">
      <header className="fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-4 mb-3 flex items-center justify-between">
            <div className="flex items-center space-x-3 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-black/5 shadow-sm">
              <Camera className="h-5 w-5 text-gray-900" />
              <span className="text-sm font-semibold text-gray-900">Laxportraits</span>
              <span className="text-sm text-gray-500">Gauteng</span>
            </div>

            <div className="hidden md:flex items-center space-x-2 rounded-full bg-white/70 backdrop-blur-md border border-black/5 shadow-sm p-1">
              {navigationItems.map(item => <button key={item.href} onClick={() => scrollToSection(item.href)} className="relative px-4 py-2 text-sm font-medium text-gray-800 rounded-full hover:bg-black/5 transition-colors after:absolute after:left-4 after:bottom-1 after:h-0.5 after:w-0 after:bg-gray-900 after:transition-[width] after:duration-300 hover:after:w-[calc(100%-2rem)]">
                  {item.label}
                </button>)}
              <button onClick={() => scrollToSection('#lead-form')} className="ml-2 px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-black">
                <span>Check availability</span>
              </button>
            </div>
            
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-full bg-white/70 backdrop-blur-md border border-black/5">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {isMenuOpen && <motion.div initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} className="md:hidden bg-white/80 backdrop-blur-md border-t">
            <nav className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-1 gap-1">
              {navigationItems.map(item => <button key={item.href} onClick={() => scrollToSection(item.href)} className="px-3 py-2 text-left rounded-md hover:bg-black/5">
                  {item.label}
                </button>)}
            </nav>
          </motion.div>}
      </header>

      {/* Main Content */}
    <main id="main">
        <section id="home">
          <HeroSection />
        </section>
        
        {/* Cinematic marquee strip */}
        <section aria-label="cinematic marquee" className="bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-white/80 text-sm md:text-base tracking-wide">
              <span>Fine light. Honest moments. Quiet luxury. — Shot on location across the Western Cape and Gauteng. — Available worldwide.</span>
            </p>
          </div>
        </section>
        
        {/* Bento strip below header */}
        <section aria-labelledby="bento-intro" className="-mt-6 md:-mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="bento-intro" className="sr-only"><span>Highlights</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
              <article className="md:col-span-4 rounded-3xl overflow-hidden border border-black/5 bg-white shadow-[0_2px_0_0_rgba(0,0,0,0.04)]">
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-3"><span>Editorial calm</span></h3>
                  <p className="text-gray-600 md:text-lg leading-relaxed mb-5"><span>Soft light, natural movement, intentional negative space. Work that breathes.</span></p>
                  <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-100">
                    <img src="https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=1600&auto=format&fit=crop" alt="Editorial portrait with soft light and negative space" className="w-full h-full object-cover" />
                  </div>
                </div>
              </article>

              <aside className="md:col-span-2 rounded-3xl overflow-hidden border border-black/5 bg-neutral-50 shadow-[0_2px_0_0_rgba(0,0,0,0.04)]">
                <div className="p-6 md:p-8 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2"><span>Availability</span></h3>
                    <p className="text-gray-600"><span>{weddingsAvailability ? weddingsAvailability.message : 'Booking limited 2025 dates for weddings and brand work.'}</span></p>
                    {weddingsAvailability?.seasonalNote ? (
                      <p className="mt-2 text-sm text-gray-500"><span>{weddingsAvailability.seasonalNote}</span></p>
                    ) : null}
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-2" aria-hidden="true">
                    <div className="h-2 rounded-full bg-gray-900/80"></div>
                    <div className="h-2 rounded-full bg-gray-900/40"></div>
                    <div className="h-2 rounded-full bg-gray-900/20"></div>
                  </div>
                </div>
              </aside>

              <article className="md:col-span-2 rounded-3xl overflow-hidden border border-black/5 bg-white shadow-[0_2px_0_0_rgba(0,0,0,0.04)]">
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3"><span>Approach</span></h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center space-x-2"><span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-900"></span><span>Light-first composition</span></li>
                    <li className="flex items-center space-x-2"><span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-900"></span><span>Unforced posing</span></li>
                    <li className="flex items-center space-x-2"><span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-900"></span><span>Subtle direction</span></li>
                  </ul>
                </div>
              </article>

              <article className="md:col-span-4 rounded-3xl overflow-hidden border border-black/5 bg-neutral-50 shadow-[0_2px_0_0_rgba(0,0,0,0.04)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <figure className="aspect-[4/3] md:aspect-auto md:h-full">
                    <img src="https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1600&auto=format&fit=crop" alt="Lifestyle couple portrait by the sea" className="w-full h-full object-cover" />
                    <figcaption className="sr-only"><span>Lifestyle couple portrait by the sea</span></figcaption>
                  </figure>
                  <div className="p-6 md:p-8 flex items-center">
                    <div>
                      <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-2"><span>Lifestyle, refined</span></h3>
                      <p className="text-gray-600 md:text-lg leading-relaxed"><span>Human, warm, and quietly premium. Crafted for brands and people who value restraint.</span></p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
        
        <section id="gallery">
          <PhotoGallery />
        </section>
        
        <section id="services">
          <ServicesSection />
        </section>

        <section id="experience">
          <ExperienceSection />
        </section>

        <section id="faq">
          <FaqSection />
        </section>

        <ContactForm id="lead-form" tone="dark" />
      </main>

      {/* WhatsApp float */}
      <a aria-label="WhatsApp" href="#lead-form" className="fixed bottom-6 right-4 md:right-6 z-40 rounded-full bg-green-500 text-white p-4 shadow-xl hover:bg-green-600 transition-colors animate-bounce-slow">
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Camera className="h-6 w-6" />
            <span className="text-lg font-semibold">Laxportraits</span>
          </div>
          <p className="text-gray-400">© {new Date().getFullYear()} Laxportraits. Documenting weddings, lifestyle stories, and brand campaigns across Gauteng.</p>
        </div>
      </footer>
    </div>;
};

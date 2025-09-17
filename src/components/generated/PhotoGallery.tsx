import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
const galleryImages = [{
  id: 'img1',
  src: '/assets/images/gallery-weddings.png',
  alt: 'Editorial wedding portrait with natural light in Gauteng'
}, {
  id: 'img2',
  src: '/assets/images/gallery-families.png',
  alt: 'Family session laughing together in a botanical garden'
}, {
  id: 'img3',
  src: '/assets/images/gallery-brands.png',
  alt: 'Lifestyle brand campaign featuring product details'
}, {
  id: 'img4',
  src: '/assets/images/gallery-weddings@0.5x.png',
  alt: 'Couple sharing a quiet moment during sunset vows'
}, {
  id: 'img5',
  src: '/assets/images/gallery-families@0.5x.png',
  alt: 'Parents embracing their newborn in soft window light'
}, {
  id: 'img6',
  src: '/assets/images/gallery-brands@0.5x.png',
  alt: 'Product flatlay styled for a Gauteng campaign reveal'
}] as any[];

// @component: PhotoGallery
export const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  const nextImage = () => setSelectedImage(prev => prev !== null ? (prev + 1) % galleryImages.length : null);
  const prevImage = () => setSelectedImage(prev => prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null);

  // Inline lead banner reveal after 8–10 images
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const idleTimer = useRef<number | null>(null);
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShowBanner(true);
        }
      });
    }, {
      root: null,
      threshold: 0.4
    });
    const bannerTarget = el.querySelector('[data-banner-target="true"]');
    if (bannerTarget) io.observe(bannerTarget);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const onScroll = () => {
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => {
        const banner = document.getElementById('inline-lead-banner');
        if (banner) banner.classList.add('animate-pulse-soft');
        window.setTimeout(() => banner?.classList.remove('animate-pulse-soft'), 1200);
      }, 5000);
    };
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // @return
  return <section className="py-24 bg-white" aria-labelledby="portfolio-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header initial={{
        opacity: 0,
        y: 24
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }} className="mb-10">
          <h2 id="portfolio-heading" className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
            <span>Curated highlights</span>
          </h2>
          <p className="text-gray-600 md:text-lg max-w-2xl"><span>Every gallery ships with colour and black-and-white edits, web-ready files, and print-perfect exports.</span></p>
        </motion.header>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {galleryImages.map((image, index) => <motion.figure key={image.id} initial={{
          opacity: 0,
          scale: 0.98
        }} whileInView={{
          opacity: 1,
          scale: 1.02
        }} transition={{
          duration: 0.5,
          delay: index * 0.05
        }} viewport={{
          once: true
        }} className="group cursor-pointer overflow-hidden rounded-3xl border border-black/5 bg-neutral-50 shadow-[0_2px_0_0_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)]" onClick={() => openLightbox(index)}>
              <div className="relative aspect-[4/3]">
                <img src={image.src} alt={image.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500"></div>
                <div aria-hidden="true" className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="rounded-2xl bg-white/85 backdrop-blur-md px-4 py-3 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900"><span>{image.alt}</span></p>
                    <button className="text-sm font-semibold text-white bg-gray-900 rounded-full px-3 py-1.5 hover:bg-black"><span>Enquire</span></button>
                  </div>
                </div>
              </div>
              <figcaption className="sr-only"><span>{image.alt}</span></figcaption>
            </motion.figure>)}

          {/* Invisible target after ~9th image to trigger banner */}
          <div data-banner-target="true" className="h-1 w-full md:col-span-2 lg:col-span-3"></div>

          {showBanner && <motion.aside id="inline-lead-banner" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="md:col-span-2 lg:col-span-3 rounded-3xl border border-black/5 bg-gray-900 text-white p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-1"><span>Love this aesthetic?</span></h3>
                <p className="text-white/80"><span>Tell me about your day and I’ll tailor a package to fit.</span></p>
              </div>
              <div className="flex items-center gap-3">
                <a href="#contact" className="px-5 py-3 rounded-full bg-white text-gray-900 font-semibold hover:bg-gray-200 transition-colors"><span>Start enquiry</span></a>
                <a href="#services" className="px-5 py-3 rounded-full border border-white/30 text-white hover:border-white/60 transition-colors"><span>View packages</span></a>
              </div>
            </motion.aside>}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && <motion.div role="dialog" aria-modal="true" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={closeLightbox}>
            <button onClick={closeLightbox} aria-label="Close" className="absolute top-5 right-5 z-10 p-2 text-white/90 hover:text-white rounded-full">
              <X className="h-7 w-7" />
            </button>
            <button onClick={e => {
          e.stopPropagation();
          prevImage();
        }} aria-label="Previous" className="absolute left-5 top-1/2 -translate-y-1/2 z-10 p-2 text-white/90 hover:text-white">
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button onClick={e => {
          e.stopPropagation();
          nextImage();
        }} aria-label="Next" className="absolute right-5 top-1/2 -translate-y-1/2 z-10 p-2 text-white/90 hover:text-white">
              <ChevronRight className="h-8 w-8" />
            </button>
            <motion.img key={selectedImage} initial={{
          scale: 0.98,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.98,
          opacity: 0
        }} src={galleryImages[selectedImage].src} alt={galleryImages[selectedImage].alt} className="max-w-[92vw] max-h-[82vh] object-contain" onClick={e => e.stopPropagation()} />
          </motion.div>}
      </AnimatePresence>
    </section>;
};

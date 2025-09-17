import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Users, Briefcase, Baby, Star } from 'lucide-react';
const services = [{
  id: 'weddings',
  icon: Heart,
  title: 'Weddings & elopements',
  description: 'Full-day and intimate coverage with timeline support, detail-focused storytelling, and heirloom-ready edits.',
  price: 'From R19 500'
}, {
  id: 'portraits',
  icon: Camera,
  title: 'Lifestyle portraits',
  description: 'Editorial maternity and family sessions with relaxed direction and colour-rich post-production.',
  price: 'From R3 800'
}, {
  id: 'events',
  icon: Users,
  title: 'Corporate & events',
  description: 'Executive coverage, panel discussions, and celebrations documented with polished, consistent lighting.',
  price: 'From R6 500'
}, {
  id: 'commercial',
  icon: Briefcase,
  title: 'Brand campaigns',
  description: 'Art-directed imagery for product launches, influencers, and agencies across Gauteng.',
  price: 'Custom quotes'
}, {
  id: 'family',
  icon: Baby,
  title: 'Family milestones',
  description: 'Birthday gatherings, anniversaries, and multi-generational portraits captured with warmth.',
  price: 'From R4 200'
}, {
  id: 'fine-art',
  icon: Star,
  title: 'Fine art prints',
  description: 'Gallery-grade print collections and albums designed for gifting and display.',
  price: 'From R2 200'
}] as any[];

// @component: ServicesSection
export const ServicesSection = () => {
  // @return
  return <section className="py-24 bg-white" aria-labelledby="services-heading">
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
      }} className="mb-12">
          <h2 id="services-heading" className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-3"><span>Signature photography services</span></h2>
          <p className="text-gray-600 md:text-lg max-w-2xl"><span>Designed for couples, families, and brands who value polished storytelling with fast delivery timelines.</span></p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
          const IconComponent = service.icon;
          return <motion.article key={service.id} initial={{
            opacity: 0,
            y: 24
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.15
          }} viewport={{
            once: true
          }} className="p-8 rounded-3xl bg-neutral-50 border border-black/5 shadow-[0_2px_0_0_rgba(0,0,0,0.04)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.06)] transition-shadow">
                <div className="flex items-center space-x-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-black/5 flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900"><span>{service.title}</span></h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed"><span>{service.description}</span></p>
                <p className="text-gray-900 font-semibold"><span>{service.price}</span></p>
              </motion.article>;
        })}
        </div>
      </div>
    </section>;
};

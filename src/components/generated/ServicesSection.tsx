import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Users, Briefcase, Baby, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services as servicesData, ServiceSlug } from '../../content/services';

const iconMap: Record<ServiceSlug, React.ComponentType<{ className?: string }>> = {
  'weddings-and-elopements': Heart,
  'lifestyle-portraits': Camera,
  'corporate-and-events': Users,
  'brand-campaigns': Briefcase,
  'family-milestones': Baby,
  'fine-art-prints': Star,
};

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
          {servicesData.map((service, index) => {
          const IconComponent = iconMap[service.slug];
          const primaryPackage = service.packages[0];
          return <motion.article key={service.slug} initial={{
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
          }} className="flex h-full flex-col rounded-3xl border border-black/5 bg-neutral-50 p-8 shadow-[0_2px_0_0_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_6px_30px_rgba(0,0,0,0.06)]">
                <div className="flex items-center space-x-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-black/5 flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900"><span>{service.name}</span></h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed"><span>{service.subheadline}</span></p>
                {primaryPackage ? <p className="text-gray-900 font-semibold">{primaryPackage.price}</p> : null}
                <Link
                  to={`/services/${service.slug}`}
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-gray-800 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
                >
                  Explore service
                </Link>
              </motion.article>;
        })}
        </div>
      </div>
    </section>;
};

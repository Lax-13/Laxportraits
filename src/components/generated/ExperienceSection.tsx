import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Compass, Camera, Package } from 'lucide-react';

const steps = [
  {
    id: 'discovery',
    title: 'Discovery call',
    description: 'We confirm availability, explore locations, and clarify the atmosphere you want to create.',
    icon: CalendarCheck,
  },
  {
    id: 'planning',
    title: 'Planning toolkit',
    description: 'Timeline support, shot lists, and styling notes ensure every detail feels intentional.',
    icon: Compass,
  },
  {
    id: 'session',
    title: 'Session day',
    description: 'Gentle direction keeps movement natural while every key moment and detail is carefully captured.',
    icon: Camera,
  },
  {
    id: 'delivery',
    title: 'Delivery & keepsakes',
    description: 'Preview gallery within 48 hours, followed by full delivery, print shop access, and album options.',
    icon: Package,
  },
];

export const ExperienceSection = () => {
  return (
    <section className="py-24 bg-neutral-950 text-white" aria-labelledby="experience-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 id="experience-heading" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            <span>An end-to-end experience built on clarity</span>
          </h2>
          <p className="text-white/70 md:text-lg max-w-2xl">
            <span>
              From first call to final delivery, the studio keeps you informed and relaxed so you can stay present in the
              moment.
            </span>
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex items-start space-x-4"
              >
                <div className="shrink-0 rounded-2xl bg-white/10 border border-white/20 p-3">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    <span>{step.title}</span>
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    <span>{step.description}</span>
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};


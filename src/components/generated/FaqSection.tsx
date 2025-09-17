import React from 'react';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'How far in advance should we book?',
    answer:
      'Weddings are typically reserved 6–12 months ahead. Lifestyle and branding sessions are usually available within 2–4 weeks.',
  },
  {
    question: 'Do you travel outside Gauteng?',
    answer: 'Yes. Travel across South Africa and neighbouring countries is available with bespoke packages.',
  },
  {
    question: 'How many photos do we receive?',
    answer:
      'Wedding galleries include 450–650 images. Lifestyle and branding sessions average 60–120 polished photographs.',
  },
];

export const FaqSection = () => {
  return (
    <section className="py-24 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
            <span>Frequently asked questions</span>
          </h2>
          <p className="text-gray-600 md:text-lg max-w-2xl">
            <span>Answers to the logistics couples, families, and creative directors ask most before booking.</span>
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {faqs.map((faq, index) => (
            <motion.article
              key={faq.question}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-black/5 bg-neutral-50 p-6 shadow-[0_2px_0_0_rgba(0,0,0,0.04)]"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                <span>{faq.question}</span>
              </h3>
              <p className="text-gray-600 leading-relaxed">
                <span>{faq.answer}</span>
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};


import React from 'react';
import { Calendar } from 'lucide-react';

interface DiscoveryCallBannerProps {
  heading?: string;
  description?: string;
  ctaLabel?: string;
  calendlyUrl?: string;
}

export const DiscoveryCallBanner: React.FC<DiscoveryCallBannerProps> = ({
  heading = 'Want to chat through your ideas first?',
  description = 'Book a complimentary 20-minute discovery call to walk through locations, timelines, and investment options.',
  ctaLabel = 'Schedule a discovery call',
  calendlyUrl = 'https://calendly.com/laxportraits/discovery-call',
}) => (
  <section className="bg-white py-14 sm:py-16">
    <div className="max-w-5xl mx-auto rounded-3xl border border-gray-200 bg-neutral-50 px-6 py-10 sm:px-10 shadow-lg shadow-gray-900/5">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-gray-500">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
            Live calendar
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">{heading}</h2>
          <p className="text-sm text-gray-600 sm:text-base">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:min-w-[240px]">
          <a
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition hover:bg-black"
            href={calendlyUrl}
            rel="noopener"
            target="_blank"
          >
            <Calendar className="h-4 w-4" /> {ctaLabel}
          </a>
          <p className="text-xs text-gray-500">Calls are hosted on Google Meet • No obligation • 20 minutes</p>
        </div>
      </div>
    </div>
  </section>
);

export default DiscoveryCallBanner;

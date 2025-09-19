import type { ServiceSlug } from '../services';

type Media = {
  src: string;
  alt: string;
  aspectRatio?: string;
};

type CaseStudy = {
  slug: string;
  service: ServiceSlug;
  locationSlug: string;
  title: string;
  excerpt: string;
  heroImage: Media;
  gallery: Media[];
  story: {
    heading: string;
    body: string;
  }[];
  vendorCredits: {
    label: string;
    value: string;
    url?: string;
  }[];
  seo: {
    title: string;
    description: string;
    canonical: string;
  };
};

export const johannesburgMelvilleRooftop: CaseStudy = {
  slug: 'johannesburg-melville-rooftop-wedding',
  service: 'weddings-and-elopements',
  locationSlug: 'johannesburg',
  title: 'Sunset rooftop wedding in Melville',
  excerpt:
    'Naledi & Thabo celebrated with a golden-hour ceremony above Johannesburg’s skyline, followed by candlelit portraits amongst heritage lofts.',
  heroImage: {
    src: '/assets/images/case-studies/jhb-melville-hero.jpg',
    alt: 'Couple embracing during sunset on a rooftop in Melville',
    aspectRatio: '3 / 2',
  },
  gallery: [
    {
      src: '/assets/images/case-studies/jhb-melville-vows.jpg',
      alt: 'Intimate rooftop vows at sunset',
    },
    {
      src: '/assets/images/case-studies/jhb-melville-details.jpg',
      alt: 'Table styling with Johannesburg skyline backdrop',
    },
    {
      src: '/assets/images/case-studies/jhb-melville-dance.jpg',
      alt: 'First dance under fairy lights',
    },
  ],
  story: [
    {
      heading: 'Cinematic vows above the city',
      body: `
        Guests were greeted with skyline views and a string quartet. The ceremony aligned with the 17:38 sunset to cast
        the warm, editorial light Naledi envisioned. Minimalist florals echoed Johannesburg’s texture while keeping the
        focus on emotion and architecture.
      `,
    },
    {
      heading: 'Editorial portraits in heritage lofts',
      body: `
        After vows we moved into the heritage loft space—the couple chose a palette of neutral tones and reflective
        surfaces. Using diffused flash and window light we captured magazine-ready portraits without interrupting the flow.
      `,
    },
    {
      heading: 'Candlelit reception storytelling',
      body: `
        The intimate dinner featured locally sourced decor. We used longer lenses to preserve candid speeches and blended
        ambient lighting with subtle fill to maintain the cinematic feel through the evening.
      `,
    },
  ],
  vendorCredits: [
    {
      label: 'Planner',
      value: 'Urban Bloom Events',
      url: 'https://urbanbloomevents.co.za/',
    },
    {
      label: 'Catering',
      value: 'Thirteen Venue',
    },
    {
      label: 'Music',
      value: 'JHB String Quartet',
    },
  ],
  seo: {
    title: 'Case Study: Melville Rooftop Wedding Photography | Laxportraits',
    description:
      'Editorial rooftop wedding photography in Johannesburg. Explore Naledi & Thabo’s sunset celebration captured by Laxportraits, including vendor credits and lighting notes.',
    canonical: 'https://www.laxportraits.com/case-studies/johannesburg-melville-rooftop-wedding',
  },
};

export default johannesburgMelvilleRooftop;

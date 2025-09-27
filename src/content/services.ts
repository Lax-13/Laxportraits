export type ServiceSlug =
  | 'weddings-and-elopements'
  | 'lifestyle-portraits'
  | 'maternity-portraits'
  | 'corporate-and-events'
  | 'brand-campaigns'
  | 'family-milestones'
  | 'fine-art-prints';

export interface ServiceDetail {
  slug: ServiceSlug;
  name: string;
  headline: string;
  subheadline: string;
  description: string;
  heroImage: {
    src: string;
    alt: string;
  };
  highlights: string[];
  packages: {
    title: string;
    price: string;
    inclusions: string[];
  }[];
  process: {
    title: string;
    detail: string;
  }[];
  testimonials: {
    quote: string;
    author: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  canonical: string;
  metaDescription: string;
}

export const services: ServiceDetail[] = [
  {
    slug: 'weddings-and-elopements',
    name: 'Weddings & elopements',
    headline: 'Wedding photography that feels like your story',
    subheadline: 'Editorial coverage for full-day celebrations and intimate vows across Gauteng and beyond.',
    description:
      'From timeline planning to album design, Laxportraits guides you through every wedding detail so you can stay present. Expect relaxed direction, crisp colour grading, and galleries that feel like a cinematic retelling of the day.',
    heroImage: {
      src: '/assets/images/gallery-weddings.png',
      alt: 'Bride and groom laughing together at sunset',
    },
    highlights: [
      'Tailored coverage from six hours to multi-day events',
      'Timeline co-creation with venue and planner coordination',
      '48-hour preview gallery plus full delivery within six weeks',
      'Heirloom album and wall-art design support',
    ],
    packages: [
      {
        title: 'Signature collection',
        price: 'From R24 500',
        inclusions: [
          '10 hours of coverage with lead photographer and assistant',
          'Pre-wedding location and wardrobe consultation',
          'Next-day preview of 40 highlight images',
          'Fine-art album credit and private print store',
        ],
      },
      {
        title: 'Elopement collection',
        price: 'From R12 500',
        inclusions: [
          'Up to 4 hours of coverage for intimate celebrations',
          'Flexible scheduling for sunrise or sunset vows',
          'Cinematic highlight slideshow ready for sharing',
          'Custom travel plans across Gauteng and neighbouring provinces',
        ],
      },
    ],
    process: [
      {
        title: 'Intentional planning',
        detail: 'We storyboard your day, build family shot lists, and scout light-forward locations so portraits feel effortless.',
      },
      {
        title: 'Presence on the day',
        detail: 'Gentle direction keeps portraits relaxed while documentary coverage captures candid emotion in-between moments.',
      },
      {
        title: 'Delivery & keepsakes',
        detail: 'Preview within 48 hours, final gallery in six weeks, and bespoke albums or frames designed to match your space.',
      },
    ],
    testimonials: [
      {
        quote: 'Every photograph feels intentional yet natural. We relive the day each time we open our gallery.',
        author: 'Naledi & Thabo',
      },
      {
        quote: 'The coordination with our planner was seamless and the album design took our breath away.',
        author: 'Adele & Kabelo',
      },
    ],
    faq: [
      {
        question: 'How soon should we book?',
        answer: 'Popular dates fill 9–12 months in advance. Smaller celebrations and elopements can be secured 3–6 months out.',
      },
      {
        question: 'Do you travel?',
        answer: 'Yes—travel across South Africa and neighbouring countries is available, with custom itineraries for destination vows.',
      },
      {
        question: 'Can we add video?',
        answer: 'Absolutely. We collaborate with a trusted filmmaking partner and can co-manage booking to keep planning simple.',
      },
    ],
    canonical: 'https://www.laxportraits.com/services/weddings-and-elopements',
    metaDescription:
      'Editorial wedding photography for celebrations across Gauteng. Tailored coverage, timeline support, and bespoke albums by Laxportraits.',
  },
  {
    slug: 'lifestyle-portraits',
    name: 'Lifestyle portraits',
    headline: 'Lifestyle portraits with editorial polish',
    subheadline: 'Warm, movement-focused sessions crafted for maternity, couples, and personal branding.',
    description:
      'Laxportraits sessions balance gentle prompts with natural movement so every portrait feels relaxed and editorial. Choose studio, home, or on-location settings that reflect your story.',
    heroImage: {
      src: '/assets/images/gallery-families.png',
      alt: 'Family portrait hugging in a botanical garden',
    },
    highlights: [
      'Location and wardrobe guidance tailored to your vision',
      'Professional posing cues that still feel like you',
      'Colour and black-and-white edits in every gallery',
      'Option to add hair, makeup, and styling support',
    ],
    packages: [
      {
        title: 'Signature lifestyle session',
        price: 'From R4 200',
        inclusions: [
          '90-minute session at one location',
          'Pre-session moodboard and wardrobe styling guide',
          '60+ edited images delivered within two weeks',
          'Print store access and curated frame recommendations',
        ],
      },
      {
        title: 'Brand portrait intensive',
        price: 'From R6 800',
        inclusions: [
          'Up to 3 locations or looks for founders and creatives',
          'Lighting and posing designed for publications and press',
          'Social-ready crops plus layered PSDs on request',
          'Optional add-ons: behind-the-scenes video and retainer packages',
        ],
      },
    ],
    process: [
      {
        title: 'Creative direction',
        detail: 'We define tone, locations, and wardrobe styling so the session feels cohesive and authentically you.',
      },
      {
        title: 'Relaxed session flow',
        detail: 'Expect movement prompts, storytelling vignettes, and space to reset as we capture candid and posed frames.',
      },
      {
        title: 'Curated delivery',
        detail: 'Receive a polished online gallery with print-ready downloads, plus optional album or wall-art design.',
      },
    ],
    testimonials: [
      {
        quote: 'These portraits finally feel like us—full of joy, colour, and movement. The whole process was easy.',
        author: 'The Mokoena Family',
      },
      {
        quote: 'My brand shoot translated perfectly into press features and investor decks. Incredible attention to detail.',
        author: 'Nthabiseng M.',
      },
    ],
    faq: [
      {
        question: 'Do you offer studio sessions?',
        answer: 'Yes—choose between our preferred natural-light studio in Johannesburg or an on-location space that matches your brand.',
      },
      {
        question: 'Can we include multiple outfits?',
        answer: 'Absolutely. We recommend 2–3 looks. We build a schedule that allows quick changes without losing momentum.',
      },
      {
        question: 'Is hair and makeup available?',
        answer: 'We have a vetted creative network and can coordinate HMU services as an add-on to any portrait session.',
      },
    ],
    canonical: 'https://www.laxportraits.com/services/lifestyle-portraits',
    metaDescription:
      'Lifestyle portrait photography in Gauteng with editorial styling. Studio, home, and on-location sessions by Laxportraits.',
  },
  {
    slug: 'maternity-portraits',
    name: 'Maternity portraits',
    headline: 'Maternity portraits that feel intimate and elevated',
    subheadline: 'Soft, light-first sessions celebrating motherhood with gentle pacing and luxe styling touches.',
    description:
      'Expectant parents receive calm, editorial direction with wardrobe support and considered posing that honours every stage. Choose studio, home, or outdoor settings to create luminous keepsakes before baby arrives.',
    heroImage: {
      src: '/assets/images/maternity/maternity-hero-7528.jpeg',
      alt: 'Expectant mother in a flowing gown holding her bump at sunset',
    },
    highlights: [
      'Studio, in-home, or outdoor sessions crafted around your comfort',
      'Wardrobe guide plus access to the Laxportraits gown and draping collection',
      'Gentle posing direction with room for partners and siblings',
      'Complimentary retouching on featured wall art and album selections',
    ],
    packages: [
      {
        title: 'Signature maternity session',
        price: 'From R4 800',
        inclusions: [
          '90-minute session with location and wardrobe styling consult',
          'Access to curated gowns, draping, and accessory styling',
          '60+ polished images delivered within two weeks',
          'Online gallery with print store and frame recommendations',
        ],
      },
      {
        title: 'Bump-to-baby collection',
        price: 'From R9 200',
        inclusions: [
          'Maternity and newborn sessions with cohesive creative direction',
          'Professional hair and makeup coordination for your maternity date',
          'Announcement-ready preview within 48 hours of each session',
          'Heirloom album credit redeemable once baby photos are ready',
        ],
      },
    ],
    process: [
      {
        title: 'Design consultation',
        detail: 'We align on mood, location, wardrobe, and any special keepsakes you want captured before the session.',
      },
      {
        title: 'Calm, guided session',
        detail: 'Breath-led pacing and gentle prompts ensure you feel supported while we create flattering, emotive portraits.',
      },
      {
        title: 'Heirloom delivery',
        detail: 'Receive your gallery within two weeks alongside print and album design suggestions curated for your space.',
      },
    ],
    testimonials: [
      {
        quote: 'I felt completely seen and cared for—every frame feels like fine art while still being so tender.',
        author: 'Lerato M.',
      },
      {
        quote: 'They handled styling, HMU, and even album design. All we had to do was show up and breathe.',
        author: 'Sihle & Thando',
      },
    ],
    faq: [
      {
        question: 'When should we schedule maternity portraits?',
        answer: 'We recommend booking between 28–34 weeks for comfortable movement, with flexible accommodations for high-risk pregnancies.',
      },
      {
        question: 'Can partners or siblings join the session?',
        answer: 'Absolutely—partners and up to two children are included. We can extend coverage for grandparents or larger families on request.',
      },
      {
        question: 'Do you provide wardrobe options?',
        answer: 'Yes. Our client closet features gowns, draping fabrics, and accessories. We also share a styling guide and can arrange boutique rentals.',
      },
    ],
    canonical: 'https://www.laxportraits.com/services/maternity-portraits',
    metaDescription:
      'Maternity photography in Gauteng with calm direction, wardrobe styling, and heirloom print options by Laxportraits.',
  },
  {
    slug: 'corporate-and-events',
    name: 'Corporate & events',
    headline: 'Corporate and event photography with polish',
    subheadline: 'Professional coverage for conferences, leadership gatherings, launches, and awards evenings.',
    description:
      'From executive headshots to multi-day summits, Laxportraits ensures your corporate imagery reflects the calibre of the occasion. Expect discreet coverage, consistent lighting, and rapid delivery for PR teams.',
    heroImage: {
      src: '/assets/images/gallery-brands.png',
      alt: 'Professional posing during a corporate event',
    },
    highlights: [
      'Detailed shot lists aligned with stakeholder priorities',
      'On-site tethered previews when required for press releases',
      'Consistent edits optimised for web, social, and print',
      'Flexible hours, travel, and same-day turnaround options',
    ],
    packages: [
      {
        title: 'Executive function coverage',
        price: 'From R6 500',
        inclusions: [
          'Up to 4 hours of coverage with lead photographer',
          'Key moments, branding details, and candid interactions',
          '24-hour delivery for press and internal teams',
          'Optional step-and-repeat or backdrop setup',
        ],
      },
      {
        title: 'Conference & summit package',
        price: 'Custom quotations',
        inclusions: [
          'Multi-day coverage with additional photographers as needed',
          'Breakout, panel, expo floor, and sponsor deliverables',
          'Real-time selects for media distribution',
          'Comprehensive post-event gallery with licensing guidance',
        ],
      },
    ],
    process: [
      {
        title: 'Pre-event alignment',
        detail: 'We sync with your comms team to confirm priorities, build timing matrices, and secure venue access details.',
      },
      {
        title: 'Discreet coverage',
        detail: 'Our team blends into the event flow while capturing every essential moment, VIP, and brand touchpoint.',
      },
      {
        title: 'Fast delivery',
        detail: 'Receive hero images on the day where needed, with the full gallery delivered within three business days.',
      },
    ],
    testimonials: [
      {
        quote: 'The photos were ready for press releases within hours and elevated our entire launch campaign.',
        author: 'Lerato D., Corporate Communications',
      },
      {
        quote: 'Professional, organised, and seamless across a three-day summit. Highly recommended.',
        author: 'Sipho M., Events Producer',
      },
    ],
    faq: [
      {
        question: 'Do you provide certificates of insurance?',
        answer: 'Yes, full public liability documentation is supplied for venues that require it.',
      },
      {
        question: 'Can you handle simultaneous breakouts?',
        answer: 'We scale the team according to programme complexity and ensure consistent coverage across rooms.',
      },
      {
        question: 'Is same-day delivery available?',
        answer: 'Yes—select packages include a content editor on-site for real-time selects and social-ready assets.',
      },
    ],
    canonical: 'https://www.laxportraits.com/services/corporate-and-events',
    metaDescription:
      'Corporate and event photography in Gauteng with on-brand coverage and fast delivery timelines by Laxportraits.',
  },
  {
    slug: 'brand-campaigns',
    name: 'Brand campaigns',
    headline: 'Campaign imagery designed to convert',
    subheadline: 'Editorial visuals for products, hospitality, and lifestyle brands needing cohesive storytelling.',
    description:
      'Whether you are launching a product line or refreshing website imagery, Laxportraits crafts campaign visuals that blend art direction, prop styling, and commercial edge.',
    heroImage: {
      src: '/assets/images/gallery-brands.png',
      alt: 'Product photography setup for lifestyle brand',
    },
    highlights: [
      'Creative direction, shot lists, and prop sourcing support',
      'Studio or on-location production with lighting crew',
      'Colour-managed workflow for consistent brand palettes',
      'Usage guidance for e-commerce, outdoor, and social placements',
    ],
    packages: [
      {
        title: 'Lookbook campaign',
        price: 'From R15 500',
        inclusions: [
          'Pre-production deck and moodboard development',
          'Half-day production with up to 3 styled sets',
          'Retouching optimised for web, print, and paid media',
          'Behind-the-scenes social content add-on',
        ],
      },
      {
        title: 'Content retainer',
        price: 'Quarterly retainers from R9 800',
        inclusions: [
          'Monthly or quarterly shoots aligned to marketing calendars',
          'Consistent lighting, colour grading, and file delivery specs',
          'Asset management with versioning for paid and organic channels',
          'Priority scheduling and shared production tracker',
        ],
      },
    ],
    process: [
      {
        title: 'Pre-production',
        detail: 'We workshop concepts, create shot lists, and align with your brand team on props, models, and messaging.',
      },
      {
        title: 'Production day',
        detail: 'A nimble crew executes on-location or studio shoots with tethered previews for instant approvals.',
      },
      {
        title: 'Post-production',
        detail: 'Colour-managed retouching and delivery in multiple crops, with optional PSDs for your design team.',
      },
    ],
    testimonials: [
      {
        quote: 'The campaign visuals increased our launch conversion rate by 32%. The planning toolkit is gold.',
        author: 'Melissa K., Marketing Lead',
      },
      {
        quote: 'Every asset matched our brand palette perfectly—no extra editing needed on our side.',
        author: 'Tumi R., Creative Director',
      },
    ],
    faq: [
      {
        question: 'Do you manage casting?',
        answer: 'Yes, we can source models, HMU artists, and stylists through our production partners.',
      },
      {
        question: 'Can you shoot video simultaneously?',
        answer: 'We collaborate with cinematographers and can integrate stills + motion production into one schedule.',
      },
      {
        question: 'What about usage rights?',
        answer: 'Packages include standard commercial usage for 24 months, with extended licensing available on request.',
      },
    ],
    canonical: 'https://www.laxportraits.com/services/brand-campaigns',
    metaDescription:
      'Brand and product campaign photography with creative direction, production, and retouching by Laxportraits.',
  },
  {
    slug: 'family-milestones',
    name: 'Family milestones',
    headline: 'Celebrate every family milestone with heart',
    subheadline: 'Joyful, movement-rich sessions for birthdays, anniversaries, graduations, and reunions.',
    description:
      'Family stories are told through the small gestures—shared laughter, tight hugs, surprise dances. Laxportraits documents those moments with sensitivity and colour-rich edits you will want to print immediately.',
    heroImage: {
      src: '/assets/images/gallery-families@0.5x.png',
      alt: 'Family celebrating outdoors during golden hour',
    },
    highlights: [
      'Flexible scheduling for multi-generational groups',
      'Gentle direction that keeps kids and elders comfortable',
      'On-location or in-home sessions with candid storytelling',
      'Print and album design service for gifting',
    ],
    packages: [
      {
        title: 'Milestone session',
        price: 'From R4 200',
        inclusions: [
          '90-minute coverage at a location that matters to your family',
          '60+ edited images with colour and black-and-white variations',
          'Private online gallery for sharing and print ordering',
          'Styled group portraits plus candid storytelling',
        ],
      },
      {
        title: 'Celebration documentary',
        price: 'From R8 200',
        inclusions: [
          'Up to 3 hours of coverage for birthdays, baptisms, or graduations',
          'Detail, decor, and guest storytelling coverage',
          '48-hour sneak peek for announcements',
          'Highlight slideshow and print credit included',
        ],
      },
    ],
    process: [
      {
        title: 'Planning call',
        detail: 'We understand family dynamics, accessibility needs, and what matters most to capture during the celebration.',
      },
      {
        title: 'Celebration coverage',
        detail: 'Expect a relaxed presence that preserves authentic emotion while guiding group portraits efficiently.',
      },
      {
        title: 'Keepsake delivery',
        detail: 'Receive a shareable gallery and optional heirloom prints designed for gifting across the family.',
      },
    ],
    testimonials: [
      {
        quote: 'Our anniversary images made every guest tear up all over again. The candid shots are priceless.',
        author: 'The Khumalo Family',
      },
      {
        quote: 'Coordinating grandparents and toddlers felt easy—thank you for the patience and stunning photos.',
        author: 'Ndlovu Family',
      },
    ],
    faq: [
      {
        question: 'How many people can we include?',
        answer: 'Sessions are designed for up to 20 people. Larger celebrations transition into event coverage with additional crew.',
      },
      {
        question: 'Can you help choose a location?',
        answer: 'Yes—share the mood you want and we will recommend parks, studios, or in-home setups with ideal light and accessibility.',
      },
      {
        question: 'Do you travel for family reunions?',
        answer: 'We cover Gauteng and travel nationwide. Travel fees are tailored to your location and schedule.',
      },
    ],
    canonical: 'https://www.laxportraits.com/services/family-milestones',
    metaDescription:
      'Family milestone photography for birthdays, anniversaries, and reunions in Gauteng. Relaxed sessions by Laxportraits.',
  },
  {
    slug: 'fine-art-prints',
    name: 'Fine art prints',
    headline: 'Fine art prints and albums for your favourite moments',
    subheadline: 'Gallery-grade printing, framing, and album design tailored to your space and gifting needs.',
    description:
      'Transform your galleries into tactile keepsakes. Laxportraits curates print collections, frames, and albums that match your home or studio, using archival materials sourced locally.',
    heroImage: {
      src: '/assets/images/hero-joyful-couple.png',
      alt: 'Photography prints and albums styled on a table',
    },
    highlights: [
      'Archival papers and pigment inks rated for 100-year longevity',
      'Custom framing with anti-glare glass and bespoke mouldings',
      'Album cover options in linen, leather, and vegan suede',
      'Design proofs with unlimited revisions before production',
    ],
    packages: [
      {
        title: 'Album suite',
        price: 'From R6 500',
        inclusions: [
          '30x30cm heirloom album with lay-flat spreads',
          'Design consultation and digital proofs',
          'Parent album add-ons at preferred rates',
          'Courier delivery nationwide',
        ],
      },
      {
        title: 'Wall art collection',
        price: 'From R4 200',
        inclusions: [
          'Curated triptych or gallery wall layout',
          'Framing in oak, walnut, or matte black',
          'In-home measuring guide and hanging hardware',
          'Optional installation within Gauteng',
        ],
      },
    ],
    process: [
      {
        title: 'Curate your favourites',
        detail: 'We review your gallery together and shortlist images that tell a cohesive story on the wall or in an album.',
      },
      {
        title: 'Design & proof',
        detail: 'Receive digital proofs for approval, with adjustments until the layout and finishes feel perfect.',
      },
      {
        title: 'Production & delivery',
        detail: 'Artisans craft your pieces within 2–4 weeks, followed by quality checks and courier delivery.',
      },
    ],
    testimonials: [
      {
        quote: 'The album is a work of art—everyone comments on the texture and layout. Worth every cent.',
        author: 'Ayesha & Lethabo',
      },
      {
        quote: 'Our framed prints transformed the lounge. The guidance on sizing and placement was invaluable.',
        author: 'Kgosi & Mpho',
      },
    ],
    faq: [
      {
        question: 'Can you print photos you did not capture?',
        answer: 'Yes, provided the original photographer grants print rights. We review files to ensure they meet print specs.',
      },
      {
        question: 'Do you offer gift certificates?',
        answer: 'Absolutely—album and print gift certificates are available for weddings, anniversaries, and corporate gifting.',
      },
      {
        question: 'What are the lead times?',
        answer: 'Albums average 4–6 weeks including design approvals; framed prints are ready within 2–3 weeks.',
      },
    ],
    canonical: 'https://www.laxportraits.com/services/fine-art-prints',
    metaDescription:
      'Fine art prints, frames, and albums crafted by Laxportraits. Archival materials and custom design for Gauteng clients.',
  },
];

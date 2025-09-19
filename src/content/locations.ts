import type { ServiceSlug } from './services';

export interface LocationDetail {
  slug: string;
  name: string;
  summary: string;
  neighbourhoods: string[];
  venueIdeas: {
    name: string;
    note: string;
  }[];
  availabilityNote: string;
  serviceHighlights: Partial<Record<ServiceSlug, string>>;
}

export const locations: LocationDetail[] = [
  {
    slug: 'johannesburg',
    name: 'Johannesburg',
    summary:
      'From rooftop celebrations in Maboneng to intimate home sessions in Parkhurst, Johannesburg offers architectural variety and golden-hour light that is perfect for editorial storytelling.',
    neighbourhoods: ['Parkhurst', 'Maboneng', 'Rosebank', 'Melville', 'Bryanston'],
    venueIdeas: [
      { name: 'Four Seasons The Westcliff', note: 'Tiered gardens and skyline views for luxury weddings and campaigns.' },
      { name: 'Victoria Yards', note: 'Industrial texture ideal for brand shoots and lifestyle portraits.' },
      { name: 'Emmarentia Dam', note: 'Lush greenery with easy access for families and elopements.' },
    ],
    availabilityNote:
      'Weekend availability books up 8–10 weeks ahead; weekday sunrise sessions remain flexible for portraits and campaigns.',
    serviceHighlights: {
      'weddings-and-elopements':
        'Timeline planning includes traffic-aware buffers and sunset scouting to make the most of city skylines and hidden garden venues.',
      'lifestyle-portraits':
        'We recommend sunrise sessions in Melville Koppies or editorial studio setups in Sandton for a paired urban + natural feel.',
      'corporate-and-events':
        'On-site lighting kits keep corporate coverage consistent in conference centres across Sandton and the CBD.',
      'brand-campaigns':
        'Prop sourcing taps into the city’s design markets for bespoke sets that elevate product stories.',
      'family-milestones':
        'Home sessions in leafy suburbs combined with nearby park portraits give families a relaxed, multi-look story.',
      'fine-art-prints':
        'Johannesburg clients often opt for monochrome wall collections that complement modern interiors—framing consultations available in-person.',
    },
  },
  {
    slug: 'pretoria',
    name: 'Pretoria',
    summary:
      'Pretoria’s jacaranda-lined streets, stately architecture, and botanical gardens create timeless backdrops for celebrations and portraits.',
    neighbourhoods: ['Brooklyn', 'Waterkloof', 'Hatfield', 'Lynnwood Manor'],
    venueIdeas: [
      { name: 'Pretoria National Botanical Garden', note: 'Expansive floral settings ideal for weddings and maternity sessions.' },
      { name: 'Hazelwood Precinct', note: 'Trendy urban textures and café culture perfect for lifestyle branding.' },
      { name: 'Fort Klapperkop', note: 'Panoramic views for golden-hour engagements and family milestones.' },
    ],
    availabilityNote:
      'Jacaranda season (October) books up a year in advance; secure dates early if you want the signature purple canopy in portraits.',
    serviceHighlights: {
      'weddings-and-elopements':
        'Ceremonies in historic churches pair beautifully with sunset portraits along the Union Buildings terraces.',
      'lifestyle-portraits':
        'Soft morning light in Austin Roberts Bird Sanctuary creates gentle, movement-rich imagery for families.',
      'corporate-and-events':
        'Government and embassy functions receive discreet coverage with expedited next-day delivery for press usage.',
      'brand-campaigns':
        'We coordinate location permits for heritage buildings to anchor hospitality and property campaigns.',
      'family-milestones':
        'Generational portraits under jacarandas remain a signature—plan for late afternoon to capture the glow.',
      'fine-art-prints':
        'Album spreads often highlight Pretoria’s seasonal colour palette—lavender hues translate beautifully to archival paper.',
    },
  },
  {
    slug: 'sandton',
    name: 'Sandton',
    summary:
      'Sandton’s sleek venues and luxury hotels set the tone for modern weddings, corporate events, and high-end personal branding.',
    neighbourhoods: ['Sandhurst', 'Hyde Park', 'Inanda', 'Morningside'],
    venueIdeas: [
      { name: 'The Leonardo', note: 'Contemporary architecture with rooftop vistas for statement imagery.' },
      { name: 'Inanda Country Base', note: 'Equestrian fields and elegant lounges for lifestyle and event coverage.' },
      { name: 'Nelson Mandela Square', note: 'Iconic urban backdrop ideal for branded portraits and proposals.' },
    ],
    availabilityNote:
      'Corporate calendars drive weekday demand; secure evening sessions at least six weeks ahead to navigate traffic and load-shedding.',
    serviceHighlights: {
      'weddings-and-elopements':
        'We maximise glass-façade reflections and ambient lighting for editorial reception imagery.',
      'lifestyle-portraits':
        'Combine luxury hotel suites with nearby greenbelts for a yin-and-yang portrait narrative.',
      'corporate-and-events':
        'Tethered shooting keeps executive headshots consistent when capturing entire leadership teams in one day.',
      'brand-campaigns':
        'We build modular sets in Sandton studios to maintain rapid product turnaround for retailers.',
      'family-milestones':
        'Private estates become relaxed host locations; we bring mobile lighting to adapt to any interior.',
      'fine-art-prints':
        'Clients favour museum glass and statement frames that complement Sandton penthouse interiors.',
    },
  },
  {
    slug: 'midrand',
    name: 'Midrand',
    summary:
      'Midrand offers equestrian estates, modern conference centres, and rolling veld that bridge Johannesburg and Pretoria aesthetics.',
    neighbourhoods: ['Waterfall', 'Kyalami', 'Beaulieu', 'Carlswald'],
    venueIdeas: [
      { name: 'Waterfall Country Estate', note: 'Lakeside views and manicured lawns ideal for weddings and family sessions.' },
      { name: 'Kyalami Grand Prix Circuit', note: 'Dynamic environments for automotive and corporate brand shoots.' },
      { name: 'Lory Park Zoo', note: 'Whimsical backdrop for children’s milestones and lifestyle imagery.' },
    ],
    availabilityNote:
      'Sunset sessions fill quickly thanks to unobstructed horizons; weekday bookings recommended for relaxed timelines.',
    serviceHighlights: {
      'weddings-and-elopements':
        'Open landscapes allow for dramatic sunset portraits—bringing lighting assistants ensures cinematic results.',
      'lifestyle-portraits':
        'Horse trails and farm-style venues lend themselves to movement-forward maternity or engagement sessions.',
      'corporate-and-events':
        'Conference hubs in Waterfall receive multi-room coverage with rapid asset delivery for nationwide teams.',
      'brand-campaigns':
        'We stage indoor-outdoor concepts to highlight residential developments and lifestyle brands.',
      'family-milestones':
        'Estate clubhouses double as celebration venues—flexible coverage keeps speeches, details, and candid moments balanced.',
      'fine-art-prints':
        'Rustic textures and open skies translate into large-format prints perfect for spacious Midrand homes.',
    },
  },
  {
    slug: 'centurion',
    name: 'Centurion',
    summary:
      'Centurion’s lakes, golf estates, and modern chapels provide calm, light-filled environments for families and weddings.',
    neighbourhoods: ['Irene', 'Eldoraigne', 'Die Hoewes', 'Copperleaf'],
    venueIdeas: [
      { name: 'Irene Dairy Farm', note: 'Pastoral charm for families, maternity, and intimate weddings.' },
      { name: 'Royal Elephant Hotel', note: 'North-African inspired interiors perfect for opulent receptions.' },
      { name: 'Rietvlei Nature Reserve', note: 'Wildlife-filled scenery for engagements and sunrise elopements.' },
    ],
    availabilityNote:
      'Golden-hour slots book 6–8 weeks ahead; sunrise sessions remain a serene option for young families.',
    serviceHighlights: {
      'weddings-and-elopements':
        'Estate chapels deliver soft window light—perfect for editorial ceremony coverage and elegant detail imagery.',
      'lifestyle-portraits':
        'Fields around Irene dairy provide natural movement prompts for toddlers and pets alike.',
      'corporate-and-events':
        'Golf estate clubhouses host leadership retreats—we capture keynote tone, networking, and sponsor deliverables.',
      'brand-campaigns':
        'Hospitality brands lean on Centurion’s resort-style venues; we coordinate poolside and spa storytelling.',
      'family-milestones':
        'Multi-generational sessions often combine in-home storytelling with reserve backdrops for variety.',
      'fine-art-prints':
        'Creamy, neutral palettes from Centurion sessions pair beautifully with linen-bound album collections.',
    },
  },
  {
    slug: 'soweto',
    name: 'Soweto',
    summary:
      'Soweto’s vibrant streets, heritage landmarks, and community energy produce storytelling-rich imagery for couples, families, and brands.',
    neighbourhoods: ['Orlando West', 'Vilakazi Street', 'Kliptown', 'Diepkloof'],
    venueIdeas: [
      { name: 'Vilakazi Street', note: 'Historic avenues alive with colour for lifestyle and couple sessions.' },
      { name: 'Credo Mutwa Cultural Village', note: 'Textured art installations perfect for editorial campaigns.' },
      { name: 'Ubuntu Kraal Brewery', note: 'A relaxed venue for celebrations and community events.' },
    ],
    availabilityNote:
      'Sunrise shoots keep streets quieter and cooler; weekend celebrations require permits secured at least one month in advance.',
    serviceHighlights: {
      'weddings-and-elopements':
        'Storytelling angles honour cultural elements—expect documentary coverage that layers emotion and heritage.',
      'lifestyle-portraits':
        'We integrate murals and street musicians for portraits that pulse with Soweto’s energy.',
      'corporate-and-events':
        'Community activations and NGO events receive respectful, narrative-driven coverage for donor reports.',
      'brand-campaigns':
        'Brands leverage Soweto’s authenticity—we source local talent and secure permits to keep production smooth.',
      'family-milestones':
        'Legacy portraits with grandparents and extended family benefit from documentary-style storytelling in iconic streets.',
      'fine-art-prints':
        'Bold colours translate into statement wall art—metallic and acrylic finishes are popular with Soweto clients.',
    },
  },
];

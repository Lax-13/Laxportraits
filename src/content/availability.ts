export type AvailabilityRecord = {
  serviceSlug: string;
  message: string;
  nextOpening: string;
  seasonalNote?: string;
};

export const availability: AvailabilityRecord[] = [
  {
    serviceSlug: 'weddings-and-elopements',
    message: 'Next wedding date available: May 2025',
    nextOpening: '2025-05-10',
    seasonalNote: 'Two winter weekend slots remain for intimate celebrations.',
  },
  {
    serviceSlug: 'brand-campaigns',
    message: 'Campaign production slots open from March 2025',
    nextOpening: '2025-03-01',
    seasonalNote: 'Priority scheduling for retainer partners through Q2.',
  },
  {
    serviceSlug: 'family-milestones',
    message: 'Golden hour sessions available every Thursday',
    nextOpening: '2025-02-20',
  },
];

export const getAvailabilityForService = (serviceSlug?: string) =>
  availability.find((record) => record.serviceSlug === serviceSlug);

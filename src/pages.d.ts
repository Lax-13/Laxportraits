declare module 'virtual:case-studies' {
  export const caseStudies: Array<{
    slug: string;
    service: string;
    locationSlug: string;
    title: string;
    excerpt: string;
  }>;
}

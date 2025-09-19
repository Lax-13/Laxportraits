import { Helmet } from 'react-helmet-async';
import { Navigate, useParams, Link } from 'react-router-dom';
import { services } from '../../content/services';
import { locations } from '../../content/locations';
import johannesburgMelvilleRooftop from '../../content/case-studies/johannesburg-weddings';
import { ContactForm } from '../generated/ContactForm';

type CaseStudyModule = {
  slug: string;
  service: string;
  locationSlug: string;
  title: string;
  excerpt: string;
  heroImage: {
    src: string;
    alt: string;
    aspectRatio?: string;
  };
  gallery: {
    src: string;
    alt: string;
    aspectRatio?: string;
  }[];
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

const CASE_STUDIES: CaseStudyModule[] = [johannesburgMelvilleRooftop];

const findCaseStudy = (slug?: string) => CASE_STUDIES.find((cs) => cs.slug === slug);

export const CaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = findCaseStudy(slug);
  if (!caseStudy) {
    return <Navigate to="/case-studies" replace />;
  }

  const service = services.find((svc) => svc.slug === caseStudy.service);
  const location = locations.find((loc) => loc.slug === caseStudy.locationSlug);

  return (
    <>
      <Helmet>
        <title>{caseStudy.seo.title}</title>
        <meta name="description" content={caseStudy.seo.description} />
        <link rel="canonical" href={caseStudy.seo.canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: caseStudy.title,
              description: caseStudy.seo.description,
              image: caseStudy.heroImage.src,
              author: {
                '@type': 'Organization',
                name: 'Laxportraits',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Laxportraits',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://www.laxportraits.com/favicon.png',
                },
              },
              mainEntityOfPage: caseStudy.seo.canonical,
              datePublished: '2025-09-19',
              articleSection: service?.name,
            }),
          }}
        />
      </Helmet>
      <main id="main" className="bg-white text-gray-900">
        <article>
          <header className="relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(9,9,9,0.7) 0%, rgba(9,9,9,0.2) 60%, rgba(9,9,9,0.9) 100%), url(${caseStudy.heroImage.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-white">
              <p className="uppercase tracking-[0.3em] text-xs text-white/70">Case study</p>
              <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight">{caseStudy.title}</h1>
              <p className="mt-4 text-lg text-white/85 max-w-2xl">{caseStudy.excerpt}</p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/70">
                {service ? <span>{service.name}</span> : null}
                {location ? <span>{location.name}</span> : null}
              </div>
            </div>
          </header>

          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid gap-6 sm:grid-cols-2">
              {caseStudy.gallery.map((image) => (
                <figure key={image.src} className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                </figure>
              ))}
            </div>

            <div className="mt-16 space-y-12">
              {caseStudy.story.map((section) => (
                <section key={section.heading} className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900">{section.heading}</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">{section.body.trim()}</p>
                </section>
              ))}
            </div>

            <aside className="mt-16 rounded-3xl border border-gray-200 bg-neutral-50 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Vendor credits</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                {caseStudy.vendorCredits.map((credit) => (
                  <li key={credit.label} className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-gray-900">{credit.label}</span>
                    {credit.url ? (
                      <a
                        href={credit.url}
                        rel="noopener"
                        className="underline-offset-4 hover:underline"
                        target="_blank"
                      >
                        {credit.value}
                      </a>
                    ) : (
                      <span>{credit.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </aside>
          </section>
        </article>

        <section className="bg-neutral-950 py-20 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold">Plan your {service?.name.toLowerCase() ?? 'session'} in {location?.name ?? 'Gauteng'}</h2>
            <p className="mt-3 text-white/70 text-lg max-w-2xl">
              Inspired by this gallery? Share your plans below and the studio will respond within one business day with
              availability and a tailored proposal.
            </p>
            <div className="mt-10">
              <ContactForm
                id="case-study-lead"
                tone="dark"
                prefillService={service?.slug}
                prefillLocation={location?.name}
                title="Let’s tell your story next"
                subtitle="Answer a few quick questions and we’ll handle the timeline, lighting plan, and direction."
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-gray-900">More inspiration</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {CASE_STUDIES.filter((cs) => cs.slug !== caseStudy.slug).map((related) => (
                <Link
                  key={related.slug}
                  to={`/case-studies/${related.slug}`}
                  className="rounded-3xl border border-gray-200 p-5 transition hover:border-gray-900 hover:shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{related.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{related.excerpt}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-gray-900">
                    View case study →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CaseStudyPage;

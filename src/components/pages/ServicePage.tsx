import { Navigate, useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { services, ServiceSlug } from '../../content/services';
import { locations, LocationDetail } from '../../content/locations';

const findService = (slug: string | undefined) =>
  services.find((service) => service.slug === (slug as ServiceSlug));

const findLocation = (slug: string | undefined): LocationDetail | undefined =>
  locations.find((location) => location.slug === slug);

const formatPrice = (price: string): { amount?: number; currency: string } => {
  const match = price.match(/R\s?([\d\s]+)/i);
  if (!match) {
    return { currency: 'ZAR' };
  }
  const numeric = Number(match[1].replace(/\s/g, ''));
  if (Number.isNaN(numeric)) {
    return { currency: 'ZAR' };
  }
  return { amount: numeric, currency: 'ZAR' };
};

const defaultAreaServed = locations.map((location) => ({ '@type': 'City', name: location.name }));

export const ServicePage = () => {
  const { slug, location: locationSlug } = useParams<{ slug: string; location?: string }>();
  const service = findService(slug);
  const location = findLocation(locationSlug);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const canonical = location ? `${service.canonical}/${location.slug}` : service.canonical;
  const locationHighlight = location?.serviceHighlights[service.slug];
  const metaDescription = location
    ? `${service.name} photography in ${location.name}. ${locationHighlight ?? location.summary}`.slice(0, 158)
    : service.metaDescription;

  const offers = service.packages
    .map((pkg) => {
      const { amount, currency } = formatPrice(pkg.price);
      if (typeof amount === 'undefined') {
        return undefined;
      }
      return {
        '@type': 'Offer',
        name: pkg.title,
        priceCurrency: currency,
        price: amount,
        availability: 'https://schema.org/InStock',
        url: canonical,
      };
    })
    .filter(Boolean);

  const serviceStructuredData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} by Laxportraits`,
    serviceType: service.name,
    provider: {
      '@id': 'https://www.laxportraits.com/#business',
    },
    description: location ? `${service.name} services in ${location.name}. ${location.summary}` : service.description,
    url: canonical,
    areaServed: location ? { '@type': 'City', name: location.name } : defaultAreaServed,
  };

  if (offers.length) {
    serviceStructuredData.offers = offers;
  }

  const locationLinks = locations.filter((loc) => loc.slug !== location?.slug);
  const locationCaseStudies = location?.caseStudies?.[service.slug] ?? [];

  return (
    <>
      <Helmet>
        <title>{`${service.name}${location ? ` in ${location.name}` : ''} | Laxportraits`}</title>
        <link rel="canonical" href={canonical} />
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={`${service.name}${location ? ` in ${location.name}` : ''} | Laxportraits`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(serviceStructuredData)}</script>
      </Helmet>
      <main id="main" className="bg-white text-gray-900">
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(9,9,9,0.65) 0%, rgba(9,9,9,0.1) 40%, rgba(9,9,9,0.8) 100%), url(${service.heroImage.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" aria-hidden />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-40 text-white">
            <p className="uppercase tracking-[0.3em] text-xs sm:text-sm text-white/70">Laxportraits</p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-[0_8px_26px_rgba(0,0,0,0.45)]">
              {service.headline}
            </h1>
            <p className="mt-6 max-w-3xl text-lg sm:text-xl text-white/85 leading-relaxed">
              {location ? locationHighlight ?? location.summary : service.subheadline}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {location ? (
                <span className="inline-flex items-center rounded-full border border-white/40 px-4 py-2 text-sm uppercase tracking-[0.25em] text-white/80 backdrop-blur-md">
                  Serving {location.name}
                </span>
              ) : null}
              <a
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-gray-900 font-semibold shadow-[0_20px_40px_rgba(255,122,63,0.25)] transition hover:shadow-[0_12px_30px_rgba(255,122,63,0.3)]"
                href="#contact"
              >
                Check availability
              </a>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-white backdrop-blur-md transition hover:border-white/70"
                to="/"
              >
                Back to overview
              </Link>
            </div>
          </div>
        </section>

        {location ? (
          <section className="bg-neutral-50 py-16 sm:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
              <div className="space-y-5 text-base sm:text-lg text-gray-700 leading-relaxed">
                <h2 className="text-3xl font-extrabold text-gray-900">
                  {service.name} in {location.name}
                </h2>
                <p>{location.summary}</p>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">Neighbourhood focus</h3>
                  <ul className="mt-3 flex flex-wrap gap-2 text-sm text-gray-700">
                    {location.neighbourhoods.map((neighbourhood) => (
                      <li
                        key={neighbourhood}
                        className="rounded-full border border-gray-300 bg-white px-3 py-1"
                      >
                        {neighbourhood}
                      </li>
                    ))}
                  </ul>
                </div>
                {locationCaseStudies.length ? (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">Featured stories</h3>
                    <ul className="mt-3 space-y-3 text-sm text-gray-700">
                      {locationCaseStudies.map((story) => (
                        <li key={`${story.title}-${story.link}`} className="rounded-2xl border border-gray-200 bg-white p-4">
                          <p className="font-semibold text-gray-900">{story.title}</p>
                          <p className="mt-1 text-gray-600">{story.summary}</p>
                          <a
                            href={story.link}
                            className="mt-2 inline-flex items-center text-xs font-semibold uppercase tracking-[0.3em] text-gray-900"
                          >
                            View highlights →
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
              <aside className="space-y-5">
                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.05)]">
                  <h3 className="text-lg font-semibold text-gray-900">Venue inspiration</h3>
                  <ul className="mt-4 space-y-3 text-sm text-gray-700">
                    {location.venueIdeas.map((idea) => (
                      <li key={idea.name}>
                        <p className="font-semibold text-gray-900">{idea.name}</p>
                        <p className="text-gray-600">{idea.note}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.05)]">
                  <h3 className="text-lg font-semibold text-gray-900">Availability note</h3>
                  <p className="mt-3 text-sm text-gray-700 leading-relaxed">{location.availabilityNote}</p>
                </div>
              </aside>
            </div>
          </section>
        ) : null}

        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-start">
            <div className="space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed">
              <p>{service.description}</p>
              <ul className="space-y-3">
                {service.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-gray-800">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-gray-900" aria-hidden />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="rounded-3xl border border-gray-200 bg-neutral-50 p-6 sm:p-8 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
              <h2 className="text-2xl font-semibold text-gray-900">Packages</h2>
              <div className="mt-6 space-y-6">
                {service.packages.map((pkg) => (
                  <div key={pkg.title} className="rounded-2xl border border-gray-200 bg-white p-5">
                    <h3 className="text-lg font-semibold text-gray-900">{pkg.title}</h3>
                    <p className="mt-1 text-sm uppercase tracking-[0.2em] text-gray-500">{pkg.price}</p>
                    <ul className="mt-4 space-y-2 text-sm text-gray-700">
                      {pkg.inclusions.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 inline-block h-2 w-2 rounded-full bg-gray-900" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-neutral-950 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight">How the experience unfolds</h2>
            <div className="mt-10 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {service.process.map((step) => (
                <article
                  key={step.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-[0_18px_40px_rgba(0,0,0,0.3)]"
                >
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-white/80 leading-relaxed text-sm sm:text-base">{step.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Client reflections</h2>
              <div className="mt-8 space-y-6">
                {service.testimonials.map((testimonial) => (
                  <blockquote
                    key={testimonial.author}
                    className="rounded-3xl border border-gray-200 bg-neutral-50 p-6 shadow-[0_12px_30px_rgba(0,0,0,0.05)]"
                  >
                    <p className="text-lg text-gray-800 leading-relaxed">“{testimonial.quote}”</p>
                    <footer className="mt-4 text-sm font-semibold text-gray-600">— {testimonial.author}</footer>
                  </blockquote>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-neutral-50 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900">Frequently asked questions</h2>
              <dl className="mt-6 space-y-5">
                {service.faq.map((item) => (
                  <div key={item.question}>
                    <dt className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">{item.question}</dt>
                    <dd className="mt-2 text-gray-700 leading-relaxed text-sm sm:text-base">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="bg-neutral-950 py-16 sm:py-20 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to plan your {service.name.toLowerCase()}?</h2>
            <p className="mt-4 text-white/80 text-lg max-w-2xl mx-auto">
              Book a consultation to confirm availability, shape the creative direction, and tailor a package that suits your
              timeline.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-gray-900 font-semibold shadow-[0_20px_40px_rgba(255,122,63,0.25)] transition hover:shadow-[0_12px_30px_rgba(255,122,63,0.3)]"
                href="mailto:hello@laxportraits.com"
              >
                Email the studio
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-white backdrop-blur-md transition hover:border-white/70"
                href="https://wa.me/27720000000"
                rel="noopener"
              >
                WhatsApp the studio
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-white backdrop-blur-md transition hover:border-white/70"
                href="tel:+27720000000"
              >
                Call +27 72 000 0000
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-gray-900">Popular areas we cover</h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Explore location-specific guides to see how the studio tailors {service.name.toLowerCase()} across Gauteng.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(location ? [location, ...locationLinks] : locations).map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/services/${service.slug}/${loc.slug}`}
                  className={`rounded-3xl border p-5 transition hover:border-gray-900 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] ${
                    location?.slug === loc.slug ? 'border-gray-900 bg-neutral-50' : 'border-gray-200 bg-white'
                  }`}
                >
                  <h3 className="text-lg font-semibold text-gray-900">{loc.name}</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {loc.serviceHighlights[service.slug] ?? loc.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-gray-900">
                    View details →
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

export default ServicePage;

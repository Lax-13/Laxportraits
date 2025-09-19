import { Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { services, ServiceSlug } from '../../content/services';

const findService = (slug: string | undefined) =>
  services.find((service) => service.slug === (slug as ServiceSlug));

export const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = findService(slug);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{`${service.name} | Laxportraits`}</title>
        <link rel="canonical" href={service.canonical} />
        <meta name="description" content={service.metaDescription} />
        <meta property="og:title" content={`${service.name} | Laxportraits`} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:url" content={service.canonical} />
        <meta property="og:type" content="website" />
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
            <p className="mt-6 max-w-3xl text-lg sm:text-xl text-white/85 leading-relaxed">{service.subheadline}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-gray-900 font-semibold shadow-[0_20px_40px_rgba(255,122,63,0.25)] transition hover:shadow-[0_12px_30px_rgba(255,122,63,0.3)]"
                href="#contact"
              >
                Check availability
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-white backdrop-blur-md transition hover:border-white/70"
                href="/"
              >
                Back to overview
              </a>
            </div>
          </div>
        </section>

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

        <section id="contact" className="bg-neutral-950 py-16 sm:py-20 text-white">
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
      </main>
    </>
  );
};

export default ServicePage;

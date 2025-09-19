import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { services, ServiceSlug } from '../../content/services';
import { locations } from '../../content/locations';

interface ContactFormProps {
  id?: string;
  tone?: 'light' | 'dark';
  title?: string;
  subtitle?: string;
  prefillService?: ServiceSlug;
  prefillLocation?: string;
}

type ContactPreference = 'email' | 'phone' | 'whatsapp';

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: ServiceSlug | '';
  location: string;
  eventDate: string;
  budget: string;
  hearAbout: string;
  contactPreference: ContactPreference;
  message: string;
  newsletter: boolean;
};

const defaultFormState: FormState = {
  name: '',
  email: '',
  phone: '',
  service: '',
  location: '',
  eventDate: '',
  budget: '',
  hearAbout: '',
  contactPreference: 'email',
  message: '',
  newsletter: false,
};

const budgetOptions = ['Under R5 000', 'R5 000 – R10 000', 'R10 000 – R20 000', 'R20 000+', 'Still exploring'];
const hearAboutOptions = ['Instagram', 'Google search', 'Friend or planner referral', 'Vendor partner', 'Other'];

const contactPrefText: Record<ContactPreference, string> = {
  email: 'Email me back',
  phone: 'Give me a call',
  whatsapp: 'Reply on WhatsApp',
};

const stepOrder = ['intro', 'project', 'details', 'review'] as const;
type StepId = (typeof stepOrder)[number];

const stepTitles: Record<StepId, string> = {
  intro: 'Let’s get acquainted',
  project: 'Project vision',
  details: 'Timeline & logistics',
  review: 'Review & send',
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const findLocationSlug = (value?: string) => {
  if (!value) return '';
  const normalised = value.trim().toLowerCase();
  const location = locations.find(
    (loc) => loc.slug.toLowerCase() === normalised || loc.name.toLowerCase() === normalised,
  );
  return location ? location.slug : '';
};

export const ContactForm: React.FC<ContactFormProps> = ({
  id = 'lead-form',
  tone = 'light',
  title = 'Let’s plan your session',
  subtitle = 'Share a few details and we’ll respond within one business day with availability and next steps.',
  prefillService,
  prefillLocation,
}) => {
  const [searchParams] = useSearchParams();
  const queryService = searchParams.get('service') as ServiceSlug | null;
  const queryLocation = searchParams.get('location');

  const initialService = useMemo(() => {
    if (prefillService) return prefillService;
    if (queryService && services.some((svc) => svc.slug === queryService)) return queryService;
    return '';
  }, [prefillService, queryService]);

  const initialLocation = useMemo(() => {
    if (prefillLocation) return findLocationSlug(prefillLocation);
    if (queryLocation) return findLocationSlug(queryLocation);
    return '';
  }, [prefillLocation, queryLocation]);

  const [formState, setFormState] = useState<FormState>({
    ...defaultFormState,
    service: initialService,
    location: initialLocation,
  });
  const [currentStep, setCurrentStep] = useState<StepId>('intro');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      service: initialService || prev.service,
      location: initialLocation || prev.location,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialService, initialLocation]);

  const stepIndex = stepOrder.indexOf(currentStep);
  const progress = ((stepIndex + 1) / stepOrder.length) * 100;

  const updateField = (field: keyof FormState, value: string | boolean) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateStep = (step: StepId) => {
    const nextErrors: Record<string, string> = {};
    if (step === 'intro') {
      if (formState.name.trim().length < 2) nextErrors.name = 'Please share your full name.';
      if (!isEmail(formState.email)) nextErrors.email = 'Enter a valid email address.';
    }
    if (step === 'project') {
      if (!formState.service) nextErrors.service = 'Select the service you are interested in.';
      if (!formState.location) nextErrors.location = 'Choose the primary location.';
    }
    if (step === 'details') {
      if (!formState.message || formState.message.trim().length < 20)
        nextErrors.message = 'Tell us a little more so we can prep a tailored response (min 20 characters).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goToStep = (step: StepId) => {
    setErrors({});
    setCurrentStep(step);
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    const nextIndex = Math.min(stepOrder.length - 1, stepIndex + 1);
    setCurrentStep(stepOrder[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = Math.max(0, stepIndex - 1);
    setCurrentStep(stepOrder[prevIndex]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (honeypot) {
      return;
    }
    if (!validateStep('details')) {
      setCurrentStep('details');
      return;
    }
    setStatus('submitting');
    try {
      const response = await fetch('/api/create-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formState,
          serviceName: currentService?.name,
          locationName: currentLocation?.name,
          source: 'website',
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setStatus('success');
      if (typeof window !== 'undefined') {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: 'lead_submit',
          lead_context: formState.service || 'general',
          lead_location: formState.location || 'unspecified',
        });
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const resetForm = () => {
    setFormState({
      ...defaultFormState,
      service: initialService,
      location: initialLocation,
    });
    setCurrentStep('intro');
    setErrors({});
    setStatus('idle');
  };

  const toneClasses = tone === 'dark'
    ? {
        section: 'bg-neutral-950 text-white',
        card: 'bg-neutral-900 border-neutral-800',
        input: 'bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-400 focus:ring-neutral-200',
        subText: 'text-neutral-300',
        accent: 'bg-white text-neutral-900',
      }
    : {
        section: 'bg-gray-50 text-gray-900',
        card: 'bg-white border-gray-200',
        input: 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:ring-gray-900',
        subText: 'text-gray-600',
        accent: 'bg-gray-900 text-white',
      };

  const currentService = formState.service
    ? services.find((svc) => svc.slug === formState.service)
    : undefined;
  const currentLocation = formState.location
    ? locations.find((loc) => loc.slug === formState.location)
    : undefined;
  const locationCaseStudies = currentLocation?.caseStudies?.[formState.service || ''] ?? [];

  return (
    <section id={id} className={`py-20 ${toneClasses.section}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.36em] text-current/60">
                <Sparkles className="h-3 w-3" /> Start the conversation
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-current">{title}</h2>
              <p className={`max-w-2xl text-base md:text-lg ${toneClasses.subText}`}>{subtitle}</p>
            </div>

            {currentService ? (
              <div className={`rounded-3xl border p-6 ${toneClasses.card}`}>
                <h3 className="text-lg font-semibold">You’re enquiring about</h3>
                <p className={`mt-2 text-sm ${toneClasses.subText}`}>
                  {currentService.name}
                  {currentLocation ? ` · ${currentLocation.name}` : ''}
                </p>
                <p className={`mt-3 text-sm ${toneClasses.subText}`}>
                  Need to change? You can edit the service or location on the next step.
                </p>
              </div>
            ) : null}

            {locationCaseStudies.length ? (
              <div className={`rounded-3xl border p-6 ${toneClasses.card}`}>
                <h3 className="text-lg font-semibold">Recent highlights nearby</h3>
                <ul className={`mt-4 space-y-3 text-sm ${toneClasses.subText}`}>
                  {locationCaseStudies.map((story) => (
                    <li key={`${story.title}-${story.link}`}>
                      <p className="font-semibold text-current">{story.title}</p>
                      <p className="mt-1">{story.summary}</p>
                      <a
                        href={story.link}
                        className="mt-2 inline-flex items-center text-xs font-semibold uppercase tracking-[0.3em] underline-offset-4 hover:underline"
                      >
                        View highlights →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="space-y-6">
              <div className={`rounded-3xl border p-6 ${toneClasses.card}`}>
                <h3 className="text-lg font-semibold">Studio hours</h3>
                <p className={`mt-2 text-sm ${toneClasses.subText}`}>
                  Monday to Friday · 09:00 – 17:00<br />
                  Weekend shoots by appointment
                </p>
              </div>
              <div className={`rounded-3xl border p-6 ${toneClasses.card}`}>
                <h3 className="text-lg font-semibold">Connect directly</h3>
                <ul className={`mt-3 space-y-2 text-sm ${toneClasses.subText}`}>
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href="mailto:hello@laxportraits.com" className="underline-offset-4 hover:underline">
                      hello@laxportraits.com
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a href="tel:+27720000000" className="underline-offset-4 hover:underline">
                      +27 72 000 0000
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    <a href="https://wa.me/27720000000" rel="noopener" className="underline-offset-4 hover:underline">
                      WhatsApp the studio
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <div className={`rounded-3xl border p-6 sm:p-8 ${toneClasses.card}`}>
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em]">
                <span>Step {stepIndex + 1} of {stepOrder.length}</span>
                <span>{stepTitles[currentStep]}</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-black/10 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-gray-900 dark:bg-white transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <AnimatePresence mode="wait">
                {currentStep === 'intro' && (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="text-sm font-semibold">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={(event) => updateField('name', event.target.value)}
                        placeholder="Your full name"
                        className={`mt-2 w-full rounded-xl px-4 py-3 transition focus:ring-2 ${toneClasses.input} ${
                          errors.name ? 'border-red-400 focus:ring-red-300' : ''
                        }`}
                        required
                      />
                      {errors.name ? <p className="mt-1 text-xs text-red-500">{errors.name}</p> : null}
                    </div>
                    <div>
                      <label className="text-sm font-semibold">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={(event) => updateField('email', event.target.value)}
                        placeholder="name@example.com"
                        className={`mt-2 w-full rounded-xl px-4 py-3 transition focus:ring-2 ${toneClasses.input} ${
                          errors.email ? 'border-red-400 focus:ring-red-300' : ''
                        }`}
                        required
                      />
                      {errors.email ? <p className="mt-1 text-xs text-red-500">{errors.email}</p> : null}
                    </div>
                    <div>
                      <label className="text-sm font-semibold">Phone (optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formState.phone}
                        onChange={(event) => updateField('phone', event.target.value)}
                        placeholder="+27 …"
                        className={`mt-2 w-full rounded-xl px-4 py-3 transition focus:ring-2 ${toneClasses.input}`}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold">Preferred contact channel</label>
                      <div className="mt-3 grid gap-2 sm:grid-cols-3">
                        {(Object.keys(contactPrefText) as ContactPreference[]).map((option) => (
                          <button
                            type="button"
                            key={option}
                            onClick={() => updateField('contactPreference', option)}
                            className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                              formState.contactPreference === option
                                ? 'border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white/10 dark:text-white'
                                : 'border-black/10 bg-transparent dark:border-white/20'
                            }`}
                          >
                            {contactPrefText[option]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 'project' && (
                  <motion.div
                    key="project"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="text-sm font-semibold">Which service are you interested in?</label>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {services.map((svc) => (
                          <button
                            type="button"
                            key={svc.slug}
                            onClick={() => updateField('service', svc.slug)}
                            className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                              formState.service === svc.slug
                                ? 'border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white/10 dark:text-white'
                                : 'border-black/10 bg-transparent dark:border-white/20'
                            }`}
                          >
                            {svc.name}
                          </button>
                        ))}
                      </div>
                      {errors.service ? <p className="mt-1 text-xs text-red-500">{errors.service}</p> : null}
                    </div>
                    <div>
                      <label className="text-sm font-semibold">Primary location</label>
                      <div className="mt-3 grid gap-2 sm:grid-cols-3">
                        {locations.map((loc) => (
                          <button
                            type="button"
                            key={loc.slug}
                            onClick={() => updateField('location', loc.slug)}
                            className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                              formState.location === loc.slug
                                ? 'border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white/10 dark:text-white'
                                : 'border-black/10 bg-transparent dark:border-white/20'
                            }`}
                          >
                            {loc.name}
                          </button>
                        ))}
                      </div>
                      {errors.location ? <p className="mt-1 text-xs text-red-500">{errors.location}</p> : null}
                    </div>
                    <div>
                      <label className="text-sm font-semibold">How did you hear about the studio?</label>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {hearAboutOptions.map((option) => (
                          <button
                            type="button"
                            key={option}
                            onClick={() => updateField('hearAbout', option)}
                            className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                              formState.hearAbout === option
                                ? 'border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white/10 dark:text-white'
                                : 'border-black/10 bg-transparent dark:border-white/20'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 'details' && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="text-sm font-semibold">Target date</label>
                      <div className="mt-2 flex items-center gap-3">
                        <Calendar className="h-5 w-5 opacity-60" />
                        <input
                          type="date"
                          name="eventDate"
                          value={formState.eventDate}
                          onChange={(event) => updateField('eventDate', event.target.value)}
                          className={`w-full rounded-xl px-4 py-3 transition focus:ring-2 ${toneClasses.input}`}
                        />
                      </div>
                      <p className={`mt-2 text-xs ${toneClasses.subText}`}>
                        Not sure yet? Leave blank and we’ll discuss timing during the consult.
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold">Budget guidance</label>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {budgetOptions.map((budget) => (
                          <button
                            type="button"
                            key={budget}
                            onClick={() => updateField('budget', budget)}
                            className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                              formState.budget === budget
                                ? 'border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white/10 dark:text-white'
                                : 'border-black/10 bg-transparent dark:border-white/20'
                            }`}
                          >
                            {budget}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold">Tell us about your vision</label>
                      <textarea
                        name="message"
                        rows={6}
                        value={formState.message}
                        onChange={(event) => updateField('message', event.target.value)}
                        placeholder="Share locations, inspiration, guest count, or themes you have in mind."
                        className={`mt-2 w-full rounded-xl px-4 py-3 transition focus:ring-2 resize-none ${toneClasses.input} ${
                          errors.message ? 'border-red-400 focus:ring-red-300' : ''
                        }`}
                        required
                      />
                      {errors.message ? <p className="mt-1 text-xs text-red-500">{errors.message}</p> : null}
                    </div>
                    <label className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em]">
                      <input
                        type="checkbox"
                        checked={formState.newsletter}
                        onChange={(event) => updateField('newsletter', event.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                      />
                      Keep me updated about seasonal offers and availability
                    </label>
                  </motion.div>
                )}

                {currentStep === 'review' && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-5"
                  >
                    <div className={`rounded-2xl border p-5 ${toneClasses.card}`}>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-emerald-500" /> Review your details
                      </h3>
                      <dl className={`mt-4 space-y-3 text-sm ${toneClasses.subText}`}>
                        <div className="flex justify-between gap-4">
                          <dt className="font-semibold text-current">Name</dt>
                          <dd>{formState.name}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="font-semibold text-current">Email</dt>
                          <dd>{formState.email}</dd>
                        </div>
                        {formState.phone ? (
                          <div className="flex justify-between gap-4">
                            <dt className="font-semibold text-current">Phone</dt>
                            <dd>{formState.phone}</dd>
                          </div>
                        ) : null}
                        <div className="flex justify-between gap-4">
                          <dt className="font-semibold text-current">Service</dt>
                          <dd>{currentService?.name ?? '—'}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="font-semibold text-current">Location</dt>
                          <dd>{currentLocation?.name ?? '—'}</dd>
                        </div>
                        {formState.eventDate ? (
                          <div className="flex justify-between gap-4">
                            <dt className="font-semibold text-current">Target date</dt>
                            <dd>{formState.eventDate}</dd>
                          </div>
                        ) : null}
                        {formState.budget ? (
                          <div className="flex justify-between gap-4">
                            <dt className="font-semibold text-current">Budget</dt>
                            <dd>{formState.budget}</dd>
                          </div>
                        ) : null}
                        <div className="flex justify-between gap-4">
                          <dt className="font-semibold text-current">Preferred contact</dt>
                          <dd>{contactPrefText[formState.contactPreference]}</dd>
                        </div>
                      </dl>
                      <button
                        type="button"
                        onClick={() => goToStep('intro')}
                        className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] underline-offset-4 hover:underline"
                      >
                        Edit information
                      </button>
                    </div>
                    <div>
                      <label className="text-sm font-semibold">Final notes</label>
                      <textarea
                        rows={4}
                        value={formState.message}
                        onChange={(event) => updateField('message', event.target.value)}
                        className={`mt-2 w-full rounded-xl px-4 py-3 transition focus:ring-2 resize-none ${toneClasses.input}`}
                      />
                      <p className={`mt-2 text-xs ${toneClasses.subText}`}>
                        Share anything else we should know—timelines, collaborators, mood boards, or questions.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
                className="hidden"
                aria-hidden="true"
              />

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 rounded-3xl border p-6 ${toneClasses.card}`}
                >
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-amber-400" /> Thank you!
                  </h3>
                  <p className={`mt-3 text-sm ${toneClasses.subText}`}>
                    Your enquiry is with the studio. We will reply within one business day with availability and a tailored
                    next step. If you need to chat sooner, feel free to reach out directly below.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href="https://wa.me/27720000000"
                      rel="noopener"
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
                    >
                      <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
                    </a>
                    <a
                      href="tel:+27720000000"
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${toneClasses.accent}`}
                    >
                      <Phone className="h-4 w-4" /> Call the studio
                    </a>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-3 text-sm font-semibold text-current transition hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      Send another enquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className={`text-xs uppercase tracking-[0.28em] ${toneClasses.subText}`}>
                    <span>Secure lead form · data encrypted in transit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {currentStep !== 'intro' && currentStep !== 'review' && (
                      <button
                        type="button"
                        onClick={handlePrev}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-current transition hover:bg-black/5 dark:hover:bg-white/10"
                      >
                        <ChevronLeft className="h-4 w-4" /> Back
                      </button>
                    )}
                    {currentStep !== 'review' ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition hover:bg-black dark:bg-white dark:text-neutral-900"
                      >
                        Next step <ChevronRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-neutral-900"
                      >
                        {status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        {status === 'submitting' ? 'Sending…' : 'Submit enquiry'}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {status === 'error' ? (
                <p className="mt-3 text-sm text-red-500">
                  Something went wrong while sending your message. Please email hello@laxportraits.com and we’ll respond as
                  soon as possible.
                </p>
              ) : null}
            </form>

            <div className="mt-10 border-t border-black/10 pt-6 text-xs uppercase tracking-[0.28em] text-current/60 dark:border-white/10">
              Ready sooner? Call +27 72 000 0000 and we will prioritise your brief.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

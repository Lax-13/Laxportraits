import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Facebook } from 'lucide-react';
const testimonials = [{
  id: 'test1',
  name: 'Naledi & Thabo',
  text: 'Every moment felt effortless. We forgot the camera was there, and the images look like they belong in a magazine.',
  rating: 5
}, {
  id: 'test2',
  name: 'The Khumalo Family',
  text: 'From planning to delivery, the studio guided us with so much care. Our family photos finally feel like us.',
  rating: 5
}, {
  id: 'test3',
  name: 'Nthabiseng M.',
  text: 'Professional, organised, and warm. Our campaign visuals were exactly what the brand needed.',
  rating: 5
}] as any[];

// @component: ContactForm
export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<{
    [k: string]: boolean;
  }>({});
  const [submitted, setSubmitted] = useState(false);
  const errors = {
    name: formData.name.trim().length < 2 ? 'Please enter your full name' : '',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? '' : 'Enter a valid email address',
    service: formData.service ? '' : 'Please select a service',
    message: formData.message.trim().length < 10 ? 'Tell me a little more (min 10 characters)' : ''
  } as const;
  const isValid = !errors.name && !errors.email && !errors.service && !errors.message;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1800));
    setIsSubmitting(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
    setTouched({});
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTouched({
      ...touched,
      [e.target.name]: true
    });
  };

  // @return
  return <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }}>
            <div className="mb-12" id="about">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"><span>About the studio</span></h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  <span>
                    Laxportraits is an editorial photography studio led by Lax Ndlovu. We balance intentional direction with
                    relaxed prompts so every frame feels like your story—refined, colourful, and full of movement.
                  </span>
                </p>
                <p>
                  <span>
                    Working across Gauteng and travelling nationwide, the studio supports you from timeline planning to
                    final print delivery, ensuring a calm, well-prepared experience at every step.
                  </span>
                </p>
              </div>
            </div>
            
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6"><span>What Clients Say</span></h3>
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => <motion.div key={testimonial.id} initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.6,
                delay: index * 0.1
              }} viewport={{
                once: true
              }} className="p-6 bg-white rounded-xl shadow-md">
                    <div className="flex mb-2">{Array.from({
                    length: testimonial.rating
                  }).map((_, i) => <span key={i} className="text-yellow-400">★</span>)}</div>
                    <p className="text-gray-700 mb-3"><span>"{testimonial.text}"</span></p>
                    <p className="font-semibold text-gray-900"><span>- {testimonial.name}</span></p>
                  </motion.div>)}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-600" />
                <a href="mailto:hello@laxportraits.com" className="text-gray-700 hover:text-gray-900">hello@laxportraits.com</a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-600" />
                <a href="tel:+27720000000" className="text-gray-700 hover:text-gray-900">+27 72 000 0000</a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Johannesburg, Gauteng · Travel available nationwide</span>
              </div>
              <p className="text-gray-600 text-sm">
                <span>Serving Johannesburg, Pretoria, Sandton, Midrand, Centurion, Soweto, and the wider Gauteng region.</span>
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <a
                  href="https://www.instagram.com/laxportraits"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
                >
                  <Instagram className="h-5 w-5" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.facebook.com/laxportraits"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
                >
                  <Facebook className="h-5 w-5" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="bg-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-3xl font-bold text-gray-900 mb-8"><span>Let's Work Together</span></h3>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="sr-only"><span>Name</span></label>
                  <input id="name" type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} onBlur={handleBlur} aria-invalid={(touched.name || submitted) && !!errors.name} aria-describedby="name-error" className={`w-full px-4 py-3 rounded-xl transition-all duration-300 border ${(touched.name || submitted) && errors.name ? 'border-red-300 focus:ring-2 focus:ring-red-400' : 'border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent'}`} required />
                  {(touched.name || submitted) && errors.name ? <p id="name-error" className="mt-2 text-sm text-red-600"><span>{errors.name}</span></p> : <p className="mt-2 h-0 text-sm opacity-0"><span>&nbsp;</span></p>}
                </div>
                <div>
                  <label htmlFor="email" className="sr-only"><span>Email</span></label>
                  <input id="email" type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} onBlur={handleBlur} aria-invalid={(touched.email || submitted) && !!errors.email} aria-describedby="email-error" className={`w-full px-4 py-3 rounded-xl transition-all duration-300 border ${(touched.email || submitted) && errors.email ? 'border-red-300 focus:ring-2 focus:ring-red-400' : 'border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent'}`} required />
                  {(touched.email || submitted) && errors.email ? <p id="email-error" className="mt-2 text-sm text-red-600"><span>{errors.email}</span></p> : <p className="mt-2 h-0 text-sm opacity-0"><span>&nbsp;</span></p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="sr-only"><span>Phone</span></label>
                  <input id="phone" type="tel" name="phone" placeholder="Phone Number (optional)" value={formData.phone} onChange={handleChange} onBlur={handleBlur} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300" />
                </div>
                <div>
                  <label htmlFor="service" className="sr-only"><span>Service</span></label>
                  <select id="service" name="service" value={formData.service} onChange={handleChange} onBlur={handleBlur} aria-invalid={(touched.service || submitted) && !!errors.service} aria-describedby="service-error" className={`w-full px-4 py-3 rounded-xl transition-all duration-300 border ${(touched.service || submitted) && errors.service ? 'border-red-300 focus:ring-2 focus:ring-red-400' : 'border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent'}`} required>
                    <option value="">Select Service</option>
                    <option value="wedding">Wedding celebration</option>
                    <option value="lifestyle">Lifestyle session</option>
                    <option value="family">Family milestone</option>
                    <option value="campaign">Brand or campaign</option>
                    <option value="corporate">Corporate event</option>
                    <option value="other">Other</option>
                  </select>
                  {(touched.service || submitted) && errors.service ? <p id="service-error" className="mt-2 text-sm text-red-600"><span>{errors.service}</span></p> : <p className="mt-2 h-0 text-sm opacity-0"><span>&nbsp;</span></p>}
                </div>
              </div>
              <div>
                <label htmlFor="message" className="sr-only"><span>Message</span></label>
                <textarea id="message" name="message" placeholder="Tell me about your vision..." rows={6} value={formData.message} onChange={handleChange} onBlur={handleBlur} aria-invalid={(touched.message || submitted) && !!errors.message} aria-describedby="message-error" className={`w-full px-4 py-3 rounded-xl transition-all duration-300 resize-none border ${(touched.message || submitted) && errors.message ? 'border-red-300 focus:ring-2 focus:ring-red-400' : 'border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent'}`} required></textarea>
                {(touched.message || submitted) && errors.message ? <p id="message-error" className="mt-2 text-sm text-red-600"><span>{errors.message}</span></p> : <p className="mt-2 h-0 text-sm opacity-0"><span>&nbsp;</span></p>}
              </div>
              <button type="submit" disabled={isSubmitting || !isValid} className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-300 disabled:opacity-60 ${isValid ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-500'}`}>
                {isSubmitting ? <span>Sending...</span> : <><Send className="h-5 w-5" /><span>Send Message</span></>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>;
};

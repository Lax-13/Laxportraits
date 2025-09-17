(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

(function () {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal, .reveal-stagger').forEach((target) => {
      target.classList.add('show');
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          io.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -15% 0px',
      threshold: 0.15,
    },
  );

  document.querySelectorAll('.reveal, .reveal-stagger').forEach((target) => io.observe(target));
})();

(function () {
  let idleTimer;
  const float = document.querySelector('.whatsapp-float');
  if (!float) return;

  const trigger = () => {
    float.classList.remove('attn');
    void float.offsetWidth;
    float.classList.add('attn');
  };

  const reset = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(trigger, 10000);
  };

  window.addEventListener('scroll', reset, { passive: true });
  window.addEventListener('focus', reset);
  reset();
})();

(function () {
  if (!window.gsap || !window.ScrollTrigger) return;

  const timeline = window.gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.8 } });
  timeline.from('.hero-copy h1', { y: 30, opacity: 0 });
  timeline.from('.hero-copy p', { y: 20, opacity: 0 }, '-=0.4');
  timeline.from('.hero .actions', { y: 20, opacity: 0 }, '-=0.5');
  timeline.from('.hero .stats div', { y: 20, opacity: 0, stagger: 0.1 }, '-=0.4');

  window.gsap.utils.toArray('[data-parallax]').forEach((selector) => {
    window.gsap.to(selector, {
      yPercent: -10,
      scrollTrigger: {
        trigger: selector,
        scrub: true,
      },
    });
  });
})();

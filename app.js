

// Reveal-on-scroll fallback using IntersectionObserver
(function(){
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('show');
        io.unobserve(e.target);
      }
    });
  }, {rootMargin: '0px 0px -10% 0px', threshold: 0.1});
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(t=> io.observe(t));
})();

// Idle pulse for inline banners
(function(){
  let idleTimer;
  function pulseIfVisible(el){
    const r = el.getBoundingClientRect();
    if(r.top < innerHeight && r.bottom > 0){
      el.classList.remove('pulse'); void el.offsetWidth; el.classList.add('pulse');
    }
  }
  const banners = document.querySelectorAll('.inline-banner, .inline-lead');
  function reset(){
    clearTimeout(idleTimer);
    idleTimer = setTimeout(()=> banners.forEach(pulseIfVisible), 5000);
  }
  addEventListener('scroll', reset, {passive:true}); reset();
})();

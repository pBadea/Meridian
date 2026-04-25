/* ── Parallax hero ── */
const heroBg   = document.getElementById('heroBg');
const flyerWrap = document.getElementById('flyerWrap');
const heroEl    = document.getElementById('hero');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroH   = heroEl.offsetHeight;
  const progress = Math.min(scrollY / heroH, 1);

  heroBg.style.transform = `scale(1.1) translateY(${scrollY * 0.25}px)`;

  const scale   = 1 - progress * 0.55;
  const opacity = 1 - progress * 2.2;
  const translateY = -progress * 80;
  flyerWrap.style.opacity   = Math.max(opacity, 0);
  flyerWrap.style.transform = `translate(-50%, calc(-58% + ${translateY}px)) perspective(900px) rotateX(${10 - progress * 10}deg) rotateZ(${-3 + progress * 3}deg) scale(${scale})`;
}, { passive: true });

/* ── Intersection Observer for reveal ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .problema-card, .step, .stat-box').forEach(el => {
  observer.observe(el);
});

/* ── Form Formspree AJAX ── */
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('.submit-btn');
  btn.textContent = 'Se trimite...';
  btn.disabled = true;

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      form.reset();
      successMsg.style.display = 'block';
      btn.style.display = 'none';
    } else {
      btn.textContent = 'Eroare — încearcă din nou';
      btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Eroare — încearcă din nou';
    btn.disabled = false;
  }
});
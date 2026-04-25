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

/* ── Flyer hover reveal ── */
const flyerImg = document.querySelector('.flyer-img');
flyerImg.src = 'res/flyer_unfilled.jpeg';

flyerImg.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s, opacity 0.3s ease 0.15s';

flyerImg.addEventListener('mouseenter', () => {
  flyerImg.src = 'res/flyer.jpeg';
  flyerImg.style.transform = 'scale(1.02)';
});

flyerImg.addEventListener('mouseleave', () => {
  flyerImg.style.transform = 'scale(1)';
  flyerImg.src = 'res/flyer_unfilled.jpeg';
});
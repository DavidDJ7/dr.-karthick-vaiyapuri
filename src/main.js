import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  reveals.forEach(el => revealObs.observe(el));

  const counters = document.querySelectorAll('.stat-number, .hero-metric-num');
  let animated = false;

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !animated) {
        animated = true;
        animateAll();
      }
    });
  }, { threshold: 0.3 });

  const statsRow = document.querySelector('.stats-row');
  if (statsRow) counterObs.observe(statsRow);

  function animateAll() {
    counters.forEach(counter => {
      const raw = counter.textContent.replace(/[+,]/g, '');
      const target = parseInt(raw, 10);
      if (isNaN(target)) return;
      const steps = 60;
      const inc = target / steps;
      let curr = 0;
      const suffix = counter.textContent.includes('+') ? '+' : '';
      const useLocale = target >= 1000;

      function tick() {
        curr += inc;
        if (curr >= target) {
          counter.textContent = useLocale ? target.toLocaleString() + suffix : target + suffix;
          return;
        }
        const v = Math.floor(curr);
        counter.textContent = useLocale ? v.toLocaleString() + suffix : v + suffix;
        requestAnimationFrame(tick);
      }
      tick();
    });
  }

  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Dr. Karthick Vaiyapuri will get back to you soon.');
      form.reset();
    });
  }
});

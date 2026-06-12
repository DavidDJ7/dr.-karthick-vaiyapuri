import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);

    const hero = document.querySelector('.hero-mesh');
    if (hero) {
      const offset = window.scrollY * 0.15;
      hero.style.transform = `translateY(${offset}px)`;
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
        window.scrollTo({
          top: targetElement.offsetTop - 90,
          behavior: 'smooth'
        });
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

  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08 });

  revealElements.forEach(el => revealObserver.observe(el));

  const counters = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.4 });

  if (counters.length > 0) {
    const statsGrid = counters[0].closest('.stats-grid');
    if (statsGrid) counterObserver.observe(statsGrid);
  }

  function animateCounters() {
    counters.forEach(counter => {
      const raw = counter.textContent.replace(/[+,]/g, '');
      const target = parseInt(raw, 10);
      if (isNaN(target)) return;
      const duration = 2500;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const suffix = counter.textContent.includes('+') ? '+' : '';
      const useLocale = target >= 1000;

      function update() {
        current += increment;
        if (current >= target) {
          counter.textContent = useLocale ? target.toLocaleString() + suffix : target + suffix;
          return;
        }
        const val = Math.floor(current);
        counter.textContent = useLocale ? val.toLocaleString() + suffix : val + suffix;
        requestAnimationFrame(update);
      }

      update();
    });
  }

  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your message! Dr. Karthick Vaiyapuri will get back to you soon.');
      form.reset();
    });
  }

  const heroGeo = document.querySelector('.hero-geo');
  if (heroGeo) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      heroGeo.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
});

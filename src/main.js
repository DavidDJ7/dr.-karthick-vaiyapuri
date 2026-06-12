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
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
        window.scrollTo({
          top: targetElement.offsetTop - 80,
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
  }, { threshold: 0.1 });

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
  }, { threshold: 0.5 });

  if (counters.length > 0) {
    counterObserver.observe(counters[0].closest('.stats-grid') || counters[0]);
  }

  function animateCounters() {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target') || counter.textContent.replace(/[+,]/g, ''), 10);
      const duration = 2500;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      if (counter.dataset.target) {
        counter.dataset.target = target;
      }

      const suffix = counter.textContent.includes('+') ? '+' : '';
      const isComma = target >= 1000;

      function update() {
        current += increment;
        if (current >= target) {
          counter.textContent = isComma ? target.toLocaleString() + suffix : target + suffix;
          return;
        }
        counter.textContent = isComma ? Math.floor(current).toLocaleString() + suffix : Math.floor(current) + suffix;
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
});

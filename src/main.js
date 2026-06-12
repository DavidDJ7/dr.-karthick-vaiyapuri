import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed navbar
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile menu toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      // Very basic mobile menu toggle (would need CSS to support .active)
      // Since we hid it with display: none, let's toggle a class
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = 'var(--white)';
      navLinks.style.padding = '1rem';
      navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    });
  }

  // Basic form submission handler
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your message! Dr. Karthick Vaiyapuri will get back to you soon.');
      form.reset();
    });
  }
});

/* ============================================================
   TeckoviaSolutions — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ── */
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar && navbar.classList.add('scrolled');
      backToTop && backToTop.classList.add('visible');
    } else {
      navbar && navbar.classList.remove('scrolled');
      backToTop && backToTop.classList.remove('visible');
    }
  }, { passive: true });

  /* ── Mobile nav toggle ── */
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');

  navToggle && navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMobile && navMobile.classList.toggle('open');
  });

  /* Close mobile nav when a link is clicked */
  document.querySelectorAll('.nav-mobile .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle && navToggle.classList.remove('open');
      navMobile && navMobile.classList.remove('open');
    });
  });

  /* ── Active nav link highlight ── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Back to top ── */
  backToTop && backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── Counter animation ── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function update(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

  /* ── Portfolio filter tabs ── */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      projectCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  /* ── Contact form ── */
  const contactForm = document.querySelector('.contact-form');
  contactForm && contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const success = contactForm.querySelector('.form-success');

    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      contactForm.reset();
      btn.textContent = 'Message Sent ✓';
      btn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
      success && (success.style.display = 'block');
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        btn.style.background = '';
        success && (success.style.display = 'none');
      }, 4000);
    }, 1500);
  });

  /* ── Smooth anchor scroll for in-page links ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

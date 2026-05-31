document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     Header & Back to Top Scroll States
     ========================================================================== */
  const header = document.querySelector('.main-header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     Mobile Navigation Toggle
     ========================================================================== */
  const hamburger = document.getElementById('hamburger-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-links .btn');
  const body = document.body;

  function toggleMenu() {
    const isOpen = hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active', isOpen);
    body.classList.toggle('menu-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ==========================================================================
     Scroll Reveal (Intersection Observer)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  /* ==========================================================================
     Interactive Image Lightbox
     ========================================================================== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentImageIndex = 0;
  const galleryImages = [];

  // Extract gallery data (source URLs & captions)
  galleryItems.forEach((item, index) => {
    const imgEl = item.querySelector('.gallery-img');
    const labelEl = item.querySelector('.gallery-dog-name');
    galleryImages.push({
      src: imgEl.src,
      alt: imgEl.alt,
      caption: labelEl ? labelEl.textContent : imgEl.alt
    });

    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden'; // Lock background scrolling
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    body.style.overflow = ''; // Unlock background scrolling
  }

  function updateLightboxContent() {
    const currentData = galleryImages[currentImageIndex];
    if (currentData) {
      lightboxImg.style.opacity = '0';
      setTimeout(() => {
        lightboxImg.src = currentData.src;
        lightboxImg.alt = currentData.alt;
        lightboxCaption.textContent = currentData.caption;
        lightboxImg.style.opacity = '1';
      }, 150);
    }
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxContent();
  }

  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxContent();
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showNextImage();
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showPrevImage();
    });
  }

  if (lightbox) {
    // Close lightbox on clicking outside the content image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation inside Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    }
  });

  /* ==========================================================================
     Mock Appointment Form Submission
     ========================================================================== */
  const form = document.getElementById('appointment-form');
  const successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate API submit animation
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours...';

      setTimeout(() => {
        // Hide form, show beautiful success panel
        form.classList.add('hidden');
        successMsg.classList.remove('hidden');
        
        // Auto scroll a bit to keep success visible if needed
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 1200);
    });
  }
});

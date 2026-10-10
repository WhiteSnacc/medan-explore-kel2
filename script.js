document.addEventListener('DOMContentLoaded', () => {
    
    // Toggle Menu Mobile
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }

    const navLinks = document.querySelectorAll('[data-nav-link]');
    const navSections = Array.from(navLinks)
      .map((link) => document.getElementById(link.getAttribute('href').slice(1)))
      .filter((section, index, sections) => section && sections.indexOf(section) === index);
    const navbar = document.getElementById('navbar');

    function setActiveNav(sectionId) {
      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${sectionId}`;
        link.classList.toggle('is-active', isActive);

        if (isActive) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const sectionId = link.getAttribute('href').slice(1);
        setActiveNav(sectionId);

        if (mobileMenu) {
          mobileMenu.classList.add('hidden');
        }
      });
    });

    function updateActiveNavOnScroll() {
      const viewportHeight = window.innerHeight;
      const visibleViewportTop = navbar?.getBoundingClientRect().bottom ?? 0;
      const visibleViewportHeight = viewportHeight - visibleViewportTop;
      const requiredVisibleHeight = visibleViewportHeight / 2;
      let activeSection = null;

      for (const section of navSections) {
        const bounds = section.getBoundingClientRect();
        const visibleHeight = Math.max(
          0,
          Math.min(bounds.bottom, viewportHeight) - Math.max(bounds.top, visibleViewportTop),
        );

        if (visibleHeight > requiredVisibleHeight) {
          activeSection = section;
          break;
        }
      }

      if (!activeSection && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        activeSection = navSections[navSections.length - 1];
      }

      if (activeSection) {
        setActiveNav(activeSection.id);
      }
    }

    let scrollUpdateRequested = false;
    window.addEventListener('scroll', () => {
      if (scrollUpdateRequested) return;

      scrollUpdateRequested = true;
      window.requestAnimationFrame(() => {
        updateActiveNavOnScroll();
        scrollUpdateRequested = false;
      });
    }, { passive: true });

    updateActiveNavOnScroll();

    const galleryModal = document.getElementById('gallery-modal');
    const galleryModalImage = document.getElementById('gallery-modal-image');
    const galleryModalCaption = document.getElementById('gallery-modal-caption');
    const galleryModalClose = document.getElementById('gallery-modal-close');

    if (galleryModal && galleryModalImage && galleryModalCaption && galleryModalClose) {
      document.querySelectorAll('.gallery-item').forEach((image) => {
        image.addEventListener('click', () => {
          const scrollPosition = window.scrollY;
          galleryModalImage.src = image.src;
          galleryModalImage.alt = image.alt;
          galleryModalCaption.textContent = image.alt;
          galleryModal.showModal();
          galleryModalClose.focus({ preventScroll: true });

          if (window.scrollY !== scrollPosition) {
            window.scrollTo({ top: scrollPosition, behavior: 'instant' });
          }
        });
      });

      galleryModalClose.addEventListener('click', () => {
        galleryModal.close();
      });

      galleryModal.addEventListener('click', (event) => {
        if (event.target === galleryModal) {
          galleryModal.close();
        }
      });
    }

    // Slideshow Background Hero
    const heroImages = [
      'assets/delipark-mall.jpg',
      'assets/hairos.jpg',
      'assets/hillpark-sibolangit.jpeg',
      'assets/istana-maimun.png',
      'assets/maha-vihara-maitreya.webp',
      'assets/masjid-raya-almashun.png',
      'assets/museum-rahmat.jpg',
      'assets/taman-ahmad-yani.jpg'
    ];

    const heroBg = document.getElementById('hero-bg');
    let currentIndex = 0;

    function rotateBackground() {
      if (!heroBg) return; // Mencegah error jika elemen tidak ditemukan
      
      heroBg.classList.add('opacity-0');

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % heroImages.length;
        heroBg.src = heroImages[currentIndex];
        heroBg.classList.remove('opacity-0');
      }, 500);
    }

    if (heroBg) {
      setInterval(rotateBackground, 4000);
    }

  });
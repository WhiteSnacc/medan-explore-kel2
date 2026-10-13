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

    // ==========================================
    // RENDER 10 DESTINASI WISATA KE HTML
    // ==========================================
    const wisataMedan = [
        {
            nama: "Delipark Mall",
            kategori: "Perbelanjaan & Gaya Hidup",
            lokasi: "Podomoro City Medan",
            deskripsi: "Mal mewah modern di pusat kota Medan dengan konsep area terbuka hijau dan berbagai jenama ternama.",
            gambar: "assets/delipark-mall.jpg"
        },
        {
            nama: "Hairos Water Park",
            kategori: "Rekreasi & Air",
            lokasi: "Jl. Jamin Ginting KM. 14.3, Medan",
            deskripsi: "Taman rekreasi air populer yang menawarkan berbagai wahana seluncuran seru dan kolam ombak buatan.",
            gambar: "assets/hairos.jpg"
        },
        {
            nama: "Hillpark Sibolangit",
            kategori: "Hiburan & Keluarga",
            lokasi: "Sibolangit (Jalur Medan-Berastagi)",
            deskripsi: "Taman bermain tematik terbesar di Sumatera Utara dengan wahana menantang dan udara pegunungan yang sejuk.",
            gambar: "assets/hillpark-sibolangit.jpeg"
        },
        {
            nama: "Istana Maimun",
            kategori: "Sejarah & Budaya",
            lokasi: "Jl. Brigjen Katamso, Medan Maimun",
            deskripsi: "Istana Kesultanan Deli peninggalan sejarah yang memadukan arsitektur Melayu, Islam, Spanyol, India, dan Italia.",
            gambar: "assets/istana-maimun.png"
        },
        {
            nama: "Maha Vihara Maitreya",
            kategori: "Religi & Budaya",
            lokasi: "Komplek Cemara Asri, Medan",
            deskripsi: "Salah satu vihara Buddha terbesar di Indonesia yang megah, tenang, dan menjadi pusat wisata religi serta sosial.",
            gambar: "assets/maha-vihara-maitreya.webp"
        },
        {
            nama: "Masjid Raya Al-Mashun",
            kategori: "Religi & Sejarah",
            lokasi: "Jl. Sisingamangaraja, Medan",
            deskripsi: "Masjid raya bersejarah peninggalan Kesultanan Deli yang dibangun tahun 1906 dengan arsitektur oktagonal khas.",
            gambar: "assets/masjid-raya-almashun.png"
        },
        {
            nama: "Museum Rahmat",
            kategori: "Edukasi & Museum",
            lokasi: "Jl. S. Parman No.309, Medan",
            deskripsi: "Museum margasatwa internasional yang memamerkan ribuan koleksi awetan satwa dunia dalam diorama alam realistis.",
            gambar: "assets/museum-rahmat.jpg"
        },
        {
            nama: "Taman Ahmad Yani",
            kategori: "Taman & Rekreasi",
            lokasi: "Jl. Jend. Sudirman, Medan",
            deskripsi: "Ruang terbuka hijau publik di pusat kota yang asri dan rindang, ideal untuk berolahraga dan bersantai.",
            gambar: "assets/taman-ahmad-yani.jpg"
        },
        {
            nama: "Taman Cadika",
            kategori: "Taman & Rekreasi",
            lokasi: "Jl. Karya Wisata, Medan Johor",
            deskripsi: "Kawasan hijau publik yang dilengkapi danau buatan, jembatan gantung, serta area rekreasi keluarga.",
            gambar: "assets/taman-candika.jpg"
        },
        {
            nama: "Tjong A Fie Mansion",
            kategori: "Sejarah & Museum",
            lokasi: "Jl. Jend. Ahmad Yani (Kesawan), Medan",
            deskripsi: "Rumah besar bersejarah milik saudagar Tionghoa dermawan abad ke-19 dengan arsitektur perpaduan Tionghoa-Eropa.",
            gambar: "assets/Tjong-A-Fie-Mansion.jpg"
        }
    ];

    const destinasiContainer = document.getElementById('destinasi-container');
    if (destinasiContainer) {
        wisataMedan.forEach(item => {
            const card = document.createElement('div');
            card.className = "bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-slate-100";
            card.innerHTML = `
                <div class="h-48 overflow-hidden bg-slate-100">
                    <img src="${item.gambar}" alt="${item.nama}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <span class="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full w-max mb-3">${item.kategori}</span>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">${item.nama}</h3>
                    <p class="text-sm font-medium text-slate-500 mb-3 flex items-center gap-1">📍 ${item.lokasi}</p>
                    <p class="text-sm text-slate-600 leading-relaxed flex-grow">${item.deskripsi}</p>
                </div>
            `;
            destinasiContainer.appendChild(card);
        });
    }
  });
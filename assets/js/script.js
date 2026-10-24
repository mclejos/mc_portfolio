/**
 * Portfolio Interactive Core
 * Streamlined & High-Performance Script
 */

// 0. PRELOADER (RADAR LOADER)
(function () {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    let dismissed = false;
    const hidePreloader = () => {
      if (dismissed) return;
      dismissed = true;
      preloader.classList.add('fade-out');
      setTimeout(() => {
        if (preloader.parentNode) {
          preloader.parentNode.removeChild(preloader);
        }
      }, 700);
    };

    if (document.readyState === 'complete') {
      setTimeout(hidePreloader, 800);
    } else {
      window.addEventListener('load', () => {
        setTimeout(hidePreloader, 800);
      });
    }

    // Safety fallback: maximum 2800ms so site is never blocked
    setTimeout(hidePreloader, 2800);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  // 1. THEME LOCK (Permanent Dark Mode) & SCROLL REVEAL ACTIVATION
  document.documentElement.setAttribute('data-theme', 'dark');
  document.documentElement.classList.add('js-reveal-active');
  try {
    localStorage.removeItem('portfolio-theme');
  } catch {
    // Ignore storage errors in restricted contexts
  }

  // 2. MOBILE NAVIGATION DRAWER
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const setNavState = (open) => {
    navLinks?.classList.toggle('open', open);
    mobileToggle?.setAttribute('aria-expanded', String(open));
  };
  mobileToggle?.addEventListener('click', () => setNavState(!navLinks?.classList.contains('open')));
  navLinks?.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => setNavState(false)));
  document.addEventListener('click', (e) => {
    if (navLinks?.classList.contains('open') && !navLinks.contains(e.target) && !mobileToggle?.contains(e.target)) {
      setNavState(false);
    }
  });

  // 3. ADVANCED DYNAMIC NAVBAR & SCROLL PROGRESS INDICATOR
  const navbar = document.getElementById('navbar');
  const navProgressBar = document.getElementById('navProgressBar');
  const updateUnifiedNavWidth = () => {
    if (!navbar) return;
    const [left, center, right] = ['.nav-left', '.nav-center', '.nav-right'].map(s => navbar.querySelector(s));
    if (left && center && right) {
      navbar.style.setProperty('--nav-unified-width', `${Math.max(740, left.scrollWidth + center.scrollWidth + right.scrollWidth + 72)}px`);
    }
  };
  updateUnifiedNavWidth();
  window.addEventListener('resize', updateUnifiedNavWidth);

  // 4. SCROLL HANDLERS (Navbar, Progress Bar, Back-To-Top & Active Link Spy)
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');
  const launchRocketContainer = document.getElementById('launchRocketContainer');
  const backToTop = document.getElementById('backToTop');
  const rocketSpeechBubble = document.getElementById('rocketSpeechBubble');
  const bubbleText = document.getElementById('bubbleText');
  const launchProgressBar = document.getElementById('launchProgressBar');
  const launchThrustParticles = document.getElementById('launchThrustParticles');

  let fuelTimer = null;
  let isLaunching = false;

  const onScroll = () => {
    const scrollY = window.scrollY;

    // Dynamic Unified-to-Split State: If window.scrollY > 50, add .scrolled
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll Progress Indicator Formula: (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    const scrollTotal = (document.body.scrollHeight || document.documentElement.scrollHeight) - window.innerHeight;
    const scrollPercent = scrollTotal > 0 ? (scrollY / ((document.body.scrollHeight - window.innerHeight) || scrollTotal)) * 100 : 0;
    if (navProgressBar) {
      navProgressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }

    // Floating Launch to Top Rocket Button: Show smoothly after 300px
    if (launchRocketContainer && !isLaunching) {
      if (scrollY > 300) {
        launchRocketContainer.classList.add('visible');
      } else {
        launchRocketContainer.classList.remove('visible');
      }

      const scrollRatio = scrollTotal > 0 ? Math.min(1, Math.max(0, scrollY / scrollTotal)) : 0;

      if (launchProgressBar) {
        launchProgressBar.style.width = `${(scrollRatio * 100).toFixed(1)}%`;
      }

      // Check if user reached the last section / bottom of the page
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
      const distanceFromBottom = docHeight - (window.innerHeight + scrollY);
      const isAtBottom = scrollRatio >= 0.88 || distanceFromBottom <= 220;

      if (isAtBottom && scrollY > 300) {
        launchRocketContainer.classList.add('fully-fueled');
        if (bubbleText && !launchRocketContainer.matches(':hover') && !isLaunching) {
          bubbleText.textContent = '100% Fueled! Ready! 🚀';
        }
      } else {
        launchRocketContainer.classList.remove('fully-fueled');
      }
    }

    // Scroll Spy
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (scrollY >= top && scrollY < top + sec.offsetHeight) {
        allNavLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${sec.id}`));
      }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hover Interactions: Liquid Fuel Charging & Comic Speech Bubble Copy
  if (backToTop && bubbleText) {
    backToTop.addEventListener('mouseenter', () => {
      if (isLaunching) return;
      launchRocketContainer?.classList.add('is-hovered');

      const isFueled = launchRocketContainer?.classList.contains('fully-fueled');
      if (isFueled) {
        bubbleText.textContent = 'Ready for blastoff! 🚀';
      } else {
        bubbleText.textContent = 'Fueling boosters... ⚡';
        clearTimeout(fuelTimer);
        // Liquid fuel fills over ~1.2s; update speech bubble when charged
        fuelTimer = setTimeout(() => {
          if (!isLaunching) {
            bubbleText.textContent = 'Ready for blastoff! 🚀';
          }
        }, 1100);
      }
    });

    backToTop.addEventListener('mouseleave', () => {
      if (isLaunching) return;
      launchRocketContainer?.classList.remove('is-hovered');
      clearTimeout(fuelTimer);
      if (launchRocketContainer?.classList.contains('fully-fueled')) {
        bubbleText.textContent = '100% Fueled! Ready! 🚀';
      } else {
        bubbleText.textContent = 'Fueling boosters... ⚡';
      }
    });
  }

  // Particle Generation for Thrust / Smoke Burst
  const triggerThrustBurst = () => {
    if (!launchThrustParticles) return;
    launchThrustParticles.innerHTML = '';
    const particleCount = 14;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('span');
      p.className = 'thrust-particle';
      const size = Math.floor(Math.random() * 8) + 5;
      const angle = (Math.PI / 4) + (Math.random() * (Math.PI / 2)); // downward arc
      const dist = Math.floor(Math.random() * 45) + 20;
      const px = Math.cos(angle) * dist * (Math.random() > 0.5 ? 1 : -1);
      const py = Math.sin(angle) * dist + 15;

      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.setProperty('--px', `${px}px`);
      p.style.setProperty('--py', `${py}px`);
      p.style.animationDelay = `${Math.random() * 0.1}s`;
      launchThrustParticles.appendChild(p);
    }
  };

  // Launch to Top Click Action: Comic Bubble Ignition & Blastoff Flight
  backToTop?.addEventListener('click', (e) => {
    e.preventDefault();
    if (isLaunching) return;
    isLaunching = true;
    clearTimeout(fuelTimer);

    // Comic speech bubble punchline
    if (bubbleText) {
      bubbleText.textContent = 'BLASTOFF! 💨';
    }

    // Trigger smoke & thruster particle burst
    triggerThrustBurst();

    // Launch rocket container straight up into the stratosphere
    launchRocketContainer?.classList.add('launching');

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });

    // Reset state cleanly after 1.2s timeout
    setTimeout(() => {
      launchRocketContainer?.classList.remove('launching', 'visible', 'fully-fueled', 'is-hovered');
      if (bubbleText) {
        bubbleText.textContent = 'Fueling boosters... ⚡';
      }
      if (launchThrustParticles) {
        launchThrustParticles.innerHTML = '';
      }
      isLaunching = false;
      onScroll(); // Re-evaluate scroll position (will remain hidden at top)
    }, 1200);
  });

  // 4.1 SCROLL-TRIGGERED SMOOTH SECTION TRANSITIONS (Intersection Observer)
  const revealSections = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          setTimeout(() => {
            entry.target.classList.add('transition-complete');
          }, 950);
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -50px 0px'
    });

    revealSections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      // If already in view or above on initial load/reload, reveal immediately
      if (rect.top < window.innerHeight - 50) {
        sec.classList.add('is-revealed', 'transition-complete');
      } else {
        revealObserver.observe(sec);
      }
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    revealSections.forEach(sec => sec.classList.add('is-revealed', 'transition-complete'));
  }

  // 5. EDUCATION TIMELINE: WINDING FLIGHT PATH & ROCKET SCROLL CONTROLLER
  const edu = document.getElementById('education');
  const path = document.getElementById('flightRoute');
  const pathProg = document.getElementById('flightRouteProgress');
  const rocket = document.getElementById('svgTravelingRocket');
  const stations = document.querySelectorAll('.milestone-station');

  if (edu && path && rocket) {
    let pathLen = path.getTotalLength?.() || 0;
    if (pathProg) pathProg.style.strokeDasharray = `${pathLen} ${pathLen}`;

    const updateFlight = () => {
      const rect = edu.getBoundingClientRect();
      const h = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (h * 0.75 - rect.top) / (rect.height + h * 0.5)));
      const dist = progress * pathLen;
      const pt = path.getPointAtLength(dist);
      const nextPt = path.getPointAtLength(Math.min(dist + 2, pathLen));
      const prevPt = path.getPointAtLength(Math.max(dist - 2, 0));
      const deg = Math.atan2(nextPt.y - prevPt.y, nextPt.x - prevPt.x) * (180 / Math.PI);

      rocket.setAttribute('transform', `translate(${pt.x.toFixed(1)}, ${pt.y.toFixed(1)}) rotate(${deg.toFixed(1)})`);
      if (pathProg) pathProg.style.strokeDashoffset = (pathLen - dist).toFixed(1);

      [0.12, 0.46, 0.82].forEach((thresh, i) => {
        stations[i]?.querySelector('.station-planet-pin')?.classList.toggle('active', progress >= thresh);
      });
    };
    window.addEventListener('scroll', updateFlight, { passive: true });
    window.addEventListener('resize', () => { pathLen = path.getTotalLength?.() || 0; updateFlight(); });
    updateFlight();

    stations.forEach(st => st.querySelector('.station-planet-pin')?.addEventListener('click', () => {
      st.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }));
  }

  // 6. PROJECT MODAL CONTROLLER
  const modal = document.getElementById('projectModalBackdrop');
  let lastActiveCard = null;

  const closeModal = () => {
    modal?.classList.remove('open');
    modal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveCard) {
      lastActiveCard.focus();
      lastActiveCard = null;
    }
  };

  document.querySelectorAll('.project-planet-card').forEach(card => {
    const handleOpen = () => {
      if (!modal) return;
      lastActiveCard = card;
      const title = card.querySelector('.planet-title')?.textContent;
      const data = card.querySelector('.planet-hidden-data');
      if (title) document.getElementById('modalProjectTitle').textContent = title;
      if (data) {
        [
          ['modalCategory', '.data-category'],
          ['modalRole', '.data-role'],
          ['modalTechPills', '.data-tech'],
          ['modalBulletsList', '.data-bullets']
        ].forEach(([tId, sCls]) => {
          const el = document.getElementById(tId);
          const src = data.querySelector(sCls);
          if (el && src) el.innerHTML = src.innerHTML;
        });
      }
      // Populate project photo into modal
      const cardImg = card.querySelector('.planet-image-frame img');
      const modalImg = document.getElementById('modalImg');
      const modalEmpty = document.getElementById('modalEmptyBanner');
      if (cardImg && modalImg) {
        modalImg.src = cardImg.src;
        modalImg.alt = cardImg.alt;
        modalImg.style.display = 'block';
        if (modalEmpty) modalEmpty.style.display = 'none';
      }
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.getElementById('modalCloseBtn')?.focus();
    };

    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        e.preventDefault();
      }
      handleOpen();
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleOpen();
      }
    });
  });

  document.getElementById('modalCloseBtn')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => e.target === modal && closeModal());
  document.addEventListener('keydown', (e) => e.key === 'Escape' && modal?.classList.contains('open') && closeModal());

  // 7. EXTRACURRICULARS SPLIT-PANE TABS & SWIPER CAROUSELS
  // Helper to extract numeric suffix for sorting: no number = 0, then -1, -2, -3, etc.
  const getPhotoOrderNumber = (filename) => {
    const match = filename.match(/-(\d+)\.[^.]+$/i);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Master catalog of leadership & community photos
  // Adding a new photo only requires adding one entry to this list!
  const LEADERSHIP_PHOTO_CATALOG = [
    // Cisco NetConnect PUP (4 banner photos)
    { org: 'cisco', file: 'CiscoNetConnect.jpg', alt: 'Cisco NetConnect PUP Community Relations Team', position: 'center 30%' },
    { org: 'cisco', file: 'CiscoNetConnect-2.jpg', alt: 'Cisco NetConnect PUP Tech Workshop', position: 'center 25%' },
    { org: 'cisco', file: 'CiscoNetConnect-3.jpg', alt: 'Cisco NetConnect PUP Student Networking Session', position: 'center 25%' },
    { org: 'cisco', file: 'CiscoNetConnect-4.jpg', alt: 'Cisco NetConnect PUP Community Relations Leadership & Members', position: 'center 25%' },

    // GDG on Campus PUP (2 banner photos)
    { org: 'gdg', file: 'GDG.jpg', alt: 'GDG on Campus PUP Strategic Planning & Dev', position: 'center 25%' },
    { org: 'gdg', file: 'GDG-2.jpg', alt: 'GDG on Campus PUP DevFest & Community Cadets', position: 'center center' },

    // IBITS (3 banner photos)
    { org: 'ibits', file: 'IBITS-1.jpg', alt: 'IBITS Student Leaders Strategic Planning', position: 'center 25%' },
    { org: 'ibits', file: 'IBITS-2.jpg', alt: 'IBITS Executive Committee & Academic Planning', position: 'center 25%' },
    { org: 'ibits', file: 'IBITS-3.jpg', alt: 'IBITS Programs and Activities Committee Team', position: 'center 20%' },

    // AWS Cloud Club PUP (1 portrait photo + 2 landscape photos)
    { org: 'aws', slot: 'portrait', file: 'AWS.jpg', alt: 'Mark Christian Alejos - Documents Head at AWS Cloud Club PUP', position: 'center 20%' },
    { org: 'aws', slot: 'landscape', file: 'AWS-2.JPG', alt: 'AWS Cloud Club PUP Team & Hands-on Lab Session', position: 'center 35%' },
    { org: 'aws', slot: 'landscape', file: 'AWS-3.jpg', alt: 'AWS Cloud Club PUP Cloud Day Conference', position: 'center 25%' }
  ];

  // Dynamically assemble leadershipMedia from catalog, sorted by numeric suffix
  const buildLeadershipMedia = (catalog) => {
    const media = {
      'panel-cisco': { banner: [] },
      'panel-gdg': { banner: [] },
      'panel-ibits': { banner: [] },
      'panel-aws': { portraitSingle: null, landscape: [] }
    };

    const sorted = [...catalog].sort((a, b) => getPhotoOrderNumber(a.file) - getPhotoOrderNumber(b.file));

    sorted.forEach((item) => {
      const photoObj = {
        src: `assets/images/${item.file}`,
        alt: item.alt || '',
        position: item.position || 'center center'
      };

      if (item.org === 'cisco') {
        media['panel-cisco'].banner.push(photoObj);
      } else if (item.org === 'gdg') {
        media['panel-gdg'].banner.push(photoObj);
      } else if (item.org === 'ibits') {
        media['panel-ibits'].banner.push(photoObj);
      } else if (item.org === 'aws') {
        if (item.slot === 'portrait' || item.file.toLowerCase().startsWith('aws.')) {
          media['panel-aws'].portraitSingle = photoObj;
        } else {
          media['panel-aws'].landscape.push(photoObj);
        }
      }
    });

    return media;
  };

  const leadershipMedia = buildLeadershipMedia(LEADERSHIP_PHOTO_CATALOG);

  const tabs = document.querySelectorAll('.extra-tab-btn');
  const panels = document.querySelectorAll('.extra-tab-panel');
  const viewportContainer = document.querySelector('.extra-viewport-container');
  let activeCarousels = [];

  const destroyActiveCarousels = () => {
    activeCarousels.forEach(instance => {
      if (instance && typeof instance.destroy === 'function') {
        try {
          instance.destroy(true, true);
        } catch (err) {
          console.warn('Swiper destroy caught:', err);
        }
      }
    });
    activeCarousels = [];
  };

  const initCarousel = (el, photos, options = {}) => {
    const validPhotos = photos || [];
    if (!el || validPhotos.length === 0) {
      if (el) el.style.display = 'none';
      return null;
    }

    const isSingle = validPhotos.length === 1;
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Preserve existing tag badge if present in the container
    const tagBadge = el.querySelector('.banner-tag-badge');

    // Build Swiper DOM structure
    const swiperEl = document.createElement('div');
    swiperEl.className = 'swiper';

    const wrapperEl = document.createElement('div');
    wrapperEl.className = 'swiper-wrapper';

    validPhotos.forEach((photo, idx) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';

      const img = document.createElement('img');
      img.src = photo.src;
      img.alt = photo.alt || '';
      if (photo.position) {
        img.style.objectPosition = photo.position;
      }
      img.loading = idx === 0 ? 'eager' : 'lazy';

      slide.appendChild(img);
      wrapperEl.appendChild(slide);
    });

    swiperEl.appendChild(wrapperEl);

    let paginationEl = null;
    if (!isSingle) {
      paginationEl = document.createElement('div');
      paginationEl.className = 'swiper-pagination';
      swiperEl.appendChild(paginationEl);
    }

    // Clean previous swiper element if any
    const existingSwiper = el.querySelector('.swiper');
    if (existingSwiper) existingSwiper.remove();

    el.appendChild(swiperEl);
    if (tagBadge && tagBadge.parentElement !== el) {
      el.appendChild(tagBadge);
    }
    el.style.display = '';

    if (typeof Swiper === 'undefined') {
      return null;
    }

    const swiperConfig = {
      loop: !isSingle,
      speed: 500,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      a11y: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true
      }
    };

    if (!isSingle && !prefersReduced) {
      swiperConfig.autoplay = {
        delay: options.delay || 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      };
    } else {
      swiperConfig.autoplay = false;
    }

    if (!isSingle && paginationEl) {
      swiperConfig.pagination = {
        el: paginationEl,
        clickable: true
      };
    }

    const swiperInstance = new Swiper(swiperEl, swiperConfig);
    activeCarousels.push(swiperInstance);
    return swiperInstance;
  };

  const renderCarouselsForPanel = (panel) => {
    if (!panel) return;
    destroyActiveCarousels();

    const panelId = panel.id;
    let media = leadershipMedia[panelId];
    if (panel.dataset.media) {
      try {
        media = JSON.parse(panel.dataset.media);
      } catch (e) {
        console.warn('Invalid JSON in data-media for', panelId, e);
      }
    }
    if (!media) return;

    // Banner slot (Cisco, GDG, IBITS)
    const bannerSlot = panel.querySelector('[data-carousel-slot="banner"]');
    if (bannerSlot) {
      if (media.banner && media.banner.length > 0) {
        initCarousel(bannerSlot, media.banner, { delay: 4000 });
      } else {
        bannerSlot.style.display = 'none';
      }
    }

    // AWS Portrait slot: single photo only, NO carousel, NO dots, NO autoplay
    const portraitSlot = panel.querySelector('.extra-portrait-frame');
    if (portraitSlot) {
      if (media.portraitSingle) {
        let singleImg = portraitSlot.querySelector('img.extra-portrait-img');
        if (!singleImg) {
          singleImg = document.createElement('img');
          singleImg.className = 'extra-portrait-img';
          portraitSlot.prepend(singleImg);
        }
        singleImg.src = media.portraitSingle.src;
        singleImg.alt = media.portraitSingle.alt || '';
        if (media.portraitSingle.position) {
          singleImg.style.objectPosition = media.portraitSingle.position;
        }
        portraitSlot.style.display = '';
      } else if (!media.portrait || media.portrait.length === 0) {
        portraitSlot.style.display = 'none';
      }
    }

    // Landscape slot (AWS left column below bullets)
    const landscapeSlot = panel.querySelector('[data-carousel-slot="landscape"]');
    if (landscapeSlot) {
      if (media.landscape && media.landscape.length > 0) {
        initCarousel(landscapeSlot, media.landscape, { delay: 4500 });
      } else {
        landscapeSlot.style.display = 'none';
      }
    }
  };

  const updatePanelRadius = (index) => {
    if (!viewportContainer) return;
    viewportContainer.classList.toggle('tab-first-active', index === 0);
    viewportContainer.classList.toggle('tab-last-active', index === tabs.length - 1);
  };

  const updateLayoutModifier = (targetPanel) => {
    if (!targetPanel || !viewportContainer) return;
    const media = leadershipMedia[targetPanel.id];
    let isPortrait = false;
    if (media && (media.portraitSingle || media.portrait || media.landscape)) {
      isPortrait = true;
    } else {
      const layout = targetPanel.getAttribute('data-layout') || 'banner';
      isPortrait = layout === 'portrait-right' || layout === 'portrait';
    }
    targetPanel.classList.toggle('is-portrait', isPortrait);
    targetPanel.classList.toggle('is-banner', !isPortrait);
    viewportContainer.classList.toggle('is-portrait', isPortrait);
    viewportContainer.classList.toggle('is-banner', !isPortrait);
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab-target');
      const targetPanel = document.getElementById(targetId);
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      if (targetPanel) {
        targetPanel.classList.add('active');
        // Reset scroll position on tab switch
        const panelBody = targetPanel.querySelector('.extra-panel-body');
        if (panelBody) {
          panelBody.scrollTop = 0;
        }
        targetPanel.scrollTop = 0;
        if (viewportContainer) {
          viewportContainer.scrollTop = 0;
        }
        updateLayoutModifier(targetPanel);
        renderCarouselsForPanel(targetPanel);
      }
      updatePanelRadius(i);
    });

    tab.addEventListener('keydown', (e) => {
      const dir = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? 1 : (e.key === 'ArrowUp' || e.key === 'ArrowLeft') ? -1 : 0;
      if (dir) {
        e.preventDefault();
        const next = (i + dir + tabs.length) % tabs.length;
        tabs[next].focus();
        tabs[next].click();
      }
    });
  });

  // Initialize layout modifier and carousels on initial active panel
  const initialActive = document.querySelector('.extra-tab-panel.active') || panels[0];
  if (initialActive) {
    updateLayoutModifier(initialActive);
    if (typeof Swiper !== 'undefined') {
      renderCarouselsForPanel(initialActive);
    } else {
      window.addEventListener('load', () => renderCarouselsForPanel(initialActive));
    }
  }

  // 8. TOAST NOTIFICATION UTILITY
  const toastContainer = document.getElementById('toast-container');
  const showToast = (title, message) => {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">✓</div>
      <div class="toast-content"><div class="toast-title">${title}</div><div class="toast-text">${message}</div></div>
    `;
    toastContainer.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  };

  // 9. CONTACT FORM SUBMISSION & VALIDATION
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('btn-submit-contact');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const msg = document.getElementById('message')?.value.trim();

    if (!name || !email || !msg) return showToast('Please Complete Fields', 'Please enter your name, email, and message.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showToast('Invalid Email', 'Please enter a valid email address.');

    if (submitBtn) {
      submitBtn.disabled = true;
      const original = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>MESSAGE SENT!</span>`;
      showToast('Message Sent Successfully!', 'Thank you! Your message has been received.');
      contactForm.reset();
      setTimeout(() => { submitBtn.innerHTML = original; submitBtn.disabled = false; }, 3000);
    }
  });

  // 10. CONTACT CARDS CLIPBOARD COPY
  document.querySelectorAll('.contact-copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const target = document.getElementById(btn.getAttribute('data-copy-target'));
      if (!target) return;
      const text = target.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const input = document.createElement('input');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        input.remove();
      }
      btn.classList.add('copied');
      const label = btn.querySelector('.copy-btn-label');
      if (label) label.textContent = 'Copied!';
      showToast('Copied to Clipboard!', text);
      setTimeout(() => {
        btn.classList.remove('copied');
        if (label) label.textContent = 'Copy';
      }, 2000);
    });
  });
});

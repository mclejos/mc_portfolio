/**
 * Portfolio Interactive Logic
 * - Dual Theme Switcher (Dark/Light)
 * - Mobile Navigation Drawer
 * - Scroll Spy & Active Nav Links
 * - Contact Form Validation & Toast Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. THEME SWITCHER
  const themeToggleBtn = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Initialize theme from localStorage or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark'); // default rich dark mode
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  // 2. MOBILE NAVIGATION DRAWER
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking a nav link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2b. ADVANCED DYNAMIC NAVIGATION & SCROLL PROGRESS INDICATOR
  const navbar = document.getElementById('navbar');
  const navProgressBar = document.getElementById('navProgressBar');

  const updateUnifiedNavWidth = () => {
    if (!navbar) return;
    const navLeft = navbar.querySelector('.nav-left');
    const navCenter = navbar.querySelector('.nav-center');
    const navRight = navbar.querySelector('.nav-right');
    if (navLeft && navCenter && navRight) {
      const naturalWidth = navLeft.scrollWidth + navCenter.scrollWidth + navRight.scrollWidth + 72;
      navbar.style.setProperty('--nav-unified-width', Math.max(740, naturalWidth) + 'px');
    }
  };
  updateUnifiedNavWidth();
  window.addEventListener('resize', updateUnifiedNavWidth);

  const handleNavbarScroll = () => {
    // 1. Dynamic Unified-to-Split State: If window.scrollY > 50, add .scrolled
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // 2. Scroll Progress Indicator: (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    if (navProgressBar) {
      const scrollTotal = (document.body.scrollHeight - window.innerHeight) > 0
        ? (document.body.scrollHeight - window.innerHeight)
        : ((document.documentElement.scrollHeight - window.innerHeight) || 1);
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight || scrollTotal)) * 100;
      navProgressBar.style.width = Math.min(100, Math.max(0, scrollPercent)) + '%';
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // 3. SCROLL SPY FOR ACTIVE NAVIGATION
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        allNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });
  highlightNavOnScroll();

  // ==========================================================================
  // 3b. EDUCATION TIMELINE: WINDING FLIGHT PATH & ROCKET SCROLL CONTROLLER
  // ==========================================================================
  const eduSection = document.getElementById('education');
  const flightRoute = document.getElementById('flightRoute');
  const flightRouteProgress = document.getElementById('flightRouteProgress');
  const travelingRocket = document.getElementById('svgTravelingRocket');
  const milestoneStations = document.querySelectorAll('.milestone-station');

  if (eduSection && flightRoute && travelingRocket) {
    let totalPathLength = 0;
    try {
      totalPathLength = flightRoute.getTotalLength();
      if (flightRouteProgress) {
        flightRouteProgress.style.strokeDasharray = `${totalPathLength} ${totalPathLength}`;
        flightRouteProgress.style.strokeDashoffset = `${totalPathLength}`;
      }
    } catch (e) {
      console.warn('SVG path total length fallback', e);
    }

    let isTicking = false;
    let targetProgress = 0;
    let currentProgress = 0;

    const calculateFlightProgress = () => {
      const rect = eduSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Begin smoothly when section reaches the upper-middle of viewport
      const startTrigger = viewportHeight * 0.75;
      const endTrigger = viewportHeight * 0.25;
      const totalScrollable = rect.height + startTrigger - endTrigger;
      const currentScroll = startTrigger - rect.top;

      let progress = currentScroll / totalScrollable;
      return Math.max(0, Math.min(1, progress));
    };

    const updateRocketAnimation = () => {
      if (!totalPathLength) return;

      // Smooth interpolation for butter-smooth rocket trajectory
      currentProgress += (targetProgress - currentProgress) * 0.16;
      if (Math.abs(targetProgress - currentProgress) < 0.0004) {
        currentProgress = targetProgress;
      }

      const currentDistance = currentProgress * totalPathLength;
      const point = flightRoute.getPointAtLength(currentDistance);

      // Tangent / Nose orientation along path trajectory
      const delta = 2.5;
      const nextPoint = flightRoute.getPointAtLength(Math.min(currentDistance + delta, totalPathLength));
      const prevPoint = flightRoute.getPointAtLength(Math.max(currentDistance - delta, 0));
      const angleRad = Math.atan2(nextPoint.y - prevPoint.y, nextPoint.x - prevPoint.x);
      const angleDeg = angleRad * (180 / Math.PI);

      // Translate and rotate rocket nose dynamically
      travelingRocket.setAttribute(
        'transform',
        `translate(${point.x.toFixed(2)}, ${point.y.toFixed(2)}) rotate(${angleDeg.toFixed(2)})`
      );

      // Illuminate progress stroke trail behind rocket
      if (flightRouteProgress) {
        flightRouteProgress.style.strokeDashoffset = `${(totalPathLength - currentDistance).toFixed(2)}`;
      }

      // Activate milestone station pins as rocket passes them
      milestoneStations.forEach((station, index) => {
        const pin = station.querySelector('.station-planet-pin');
        if (!pin) return;
        const stopThresholds = [0.12, 0.46, 0.82];
        if (currentProgress >= stopThresholds[index]) {
          pin.classList.add('active');
        } else {
          pin.classList.remove('active');
        }
      });

      if (Math.abs(targetProgress - currentProgress) > 0.0004) {
        requestAnimationFrame(updateRocketAnimation);
      } else {
        isTicking = false;
      }
    };

    const handleFlightScroll = () => {
      targetProgress = calculateFlightProgress();
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(updateRocketAnimation);
      }
    };

    window.addEventListener('scroll', handleFlightScroll, { passive: true });
    window.addEventListener('resize', () => {
      try {
        totalPathLength = flightRoute.getTotalLength();
        if (flightRouteProgress) {
          flightRouteProgress.style.strokeDasharray = `${totalPathLength} ${totalPathLength}`;
        }
      } catch (err) {}
      handleFlightScroll();
    });

    handleFlightScroll();

    // Clicking milestone pin smoothly brings it into view
    milestoneStations.forEach(station => {
      const pin = station.querySelector('.station-planet-pin');
      if (pin) {
        pin.addEventListener('click', () => {
          station.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      }
    });
  }

  // ==========================================================================
  // 3c. SECTION 3: PROJECT PLANET CARDS & DETAILS MODAL CONTROLLER
  // ==========================================================================
  const planetCards = document.querySelectorAll('.project-planet-card');
  const modalBackdrop = document.getElementById('projectModalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCategory = document.getElementById('modalCategory');
  const modalRole = document.getElementById('modalRole');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalTechPills = document.getElementById('modalTechPills');
  const modalBulletsList = document.getElementById('modalBulletsList');

  const openProjectModal = (card) => {
    if (!modalBackdrop || !card) return;

    const titleEl = card.querySelector('.planet-title');
    const hiddenData = card.querySelector('.planet-hidden-data');
    if (!hiddenData) return;

    const roleEl = hiddenData.querySelector('.data-role');
    const categoryEl = hiddenData.querySelector('.data-category');
    const techEl = hiddenData.querySelector('.data-tech');
    const bulletsEl = hiddenData.querySelector('.data-bullets');

    if (modalTitle && titleEl) modalTitle.textContent = titleEl.textContent;
    if (modalCategory && categoryEl) modalCategory.textContent = categoryEl.textContent;
    if (modalRole && roleEl) modalRole.textContent = roleEl.textContent;

    if (modalTechPills && techEl) {
      modalTechPills.innerHTML = techEl.innerHTML;
    }

    if (modalBulletsList && bulletsEl) {
      modalBulletsList.innerHTML = bulletsEl.innerHTML;
    }

    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalCloseBtn?.focus();
  };

  const closeProjectModal = () => {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  planetCards.forEach(card => {
    card.addEventListener('click', () => openProjectModal(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProjectModal(card);
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('open')) {
      closeProjectModal();
    }
  });

  // ==========================================================================
  // 3d. SECTION 4: EXTRACURRICULARS SPLIT-PANE TABS CONTROLLER
  // ==========================================================================
  const extraTabButtons = document.querySelectorAll('.extra-tab-btn');
  const extraTabPanels = document.querySelectorAll('.extra-tab-panel');

  if (extraTabButtons.length && extraTabPanels.length) {
    extraTabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab-target');
        if (!targetId) return;

        // Deactivate all tab buttons & panels
        extraTabButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });

        extraTabPanels.forEach(p => {
          p.classList.remove('active');
        });

        // Activate selected tab button & panel
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const activePanel = document.getElementById(targetId);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      });

      // Keyboard navigation support for tabs (ArrowUp, ArrowDown)
      btn.addEventListener('keydown', (e) => {
        const buttonsArray = Array.from(extraTabButtons);
        const currentIndex = buttonsArray.indexOf(btn);

        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % buttonsArray.length;
          buttonsArray[nextIndex].focus();
          buttonsArray[nextIndex].click();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const prevIndex = (currentIndex - 1 + buttonsArray.length) % buttonsArray.length;
          buttonsArray[prevIndex].focus();
          buttonsArray[prevIndex].click();
        }
      });
    });
  }

  // 4. BACK TO TOP BUTTON
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 5. TOAST NOTIFICATION UTILITY
  const showToast = (title, message) => {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-text">${message}</div>
      </div>
    `;

    toastContainer.appendChild(toast);

    // Trigger animation in next tick
    setTimeout(() => {
      toast.classList.add('show');
    }, 20);

    // Remove toast after 4 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 4000);
  };

  // 6. CONTACT FORM SUBMISSION & VALIDATION
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('btn-submit-contact');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const subjectVal = subjectInput ? subjectInput.value.trim() : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      if (!nameVal || !emailVal || !messageVal) {
        showToast('Please Complete Fields', 'Please enter your name, email, and message.');
        return;
      }

      if (!validateEmail(emailVal)) {
        showToast('Invalid Email', 'Please enter a valid email address.');
        return;
      }

      // Successful submission
      if (submitBtn) {
        submitBtn.disabled = true;
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>MESSAGE SENT!</span>
        `;

        showToast('Message Sent Successfully!', 'Thank you! Your message has been received.');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalContent;
          submitBtn.disabled = false;
        }, 3000);
      } else {
        showToast('Message Sent Successfully!', 'Thank you! Your message has been received.');
        contactForm.reset();
      }
    });
  }

  // 7. CONTACT CARDS COPY TO CLIPBOARD
  const copyButtons = document.querySelectorAll('.contact-copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-copy-target');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const textToCopy = targetEl.textContent.trim();
      const applyCopiedState = () => {
        btn.classList.add('copied');
        showToast('Copied to Clipboard!', textToCopy);

        setTimeout(() => {
          btn.classList.remove('copied');
        }, 2000);
      };

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
          applyCopiedState();
        } else {
          throw new Error('Clipboard API not available');
        }
      } catch (err) {
        // Fallback for non-secure contexts or older browsers
        try {
          const textarea = document.createElement('textarea');
          textarea.value = textToCopy;
          textarea.style.position = 'fixed';
          textarea.style.left = '-9999px';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          applyCopiedState();
        } catch (fallbackErr) {
          console.error('Failed to copy to clipboard:', fallbackErr);
        }
      }
    });
  });
});

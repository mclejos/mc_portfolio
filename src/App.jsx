import { useState, useEffect, useRef } from 'react';
import ClickSpark from './components/ClickSpark';
import Galaxy from './components/Galaxy';

// External constants to prevent re-initialization of Galaxy on render
const GALAXY_FOCAL = [0.5, 0.5];
const GALAXY_ROTATION = [1.0, 0.0];

const SECTIONS = [
  { id: 'about', num: '01', title: 'About' },
  { id: 'education', num: '02', title: 'Education' },
  { id: 'projects', num: '03', title: 'Academic Projects' },
  { id: 'tech-stack', num: '04', title: 'Tech Stack' },
  { id: 'community', num: '05', title: 'Community Involvement' },
  { id: 'certifications', num: '06', title: 'Certifications' },
  { id: 'contacts', num: '07', title: 'Contacts' }
];

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('');
  const galaxyWrapperRef = useRef(null);

  // Sync theme changes to document root
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Option (b) Mouse-reactive background:
  // Forward window mouse movements to the Galaxy container so stars repel without blocking content
  useEffect(() => {
    const handleMouseMove = (e) => {
      const galaxyDom = galaxyWrapperRef.current?.querySelector('.galaxy-container');
      if (galaxyDom) {
        const syntheticMove = new MouseEvent('mousemove', {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: false
        });
        galaxyDom.dispatchEvent(syntheticMove);
      }
    };

    const handleMouseLeave = () => {
      const galaxyDom = galaxyWrapperRef.current?.querySelector('.galaxy-container');
      if (galaxyDom) {
        galaxyDom.dispatchEvent(new MouseEvent('mouseleave', { bubbles: false }));
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const sparkColor = theme === 'dark' ? '#d9ff75' : '#4a6d12';

  return (
    <>
      {/* Background Layer: Galaxy WebGL Component */}
      <div
        ref={galaxyWrapperRef}
        className="galaxy-bg-layer"
        aria-hidden="true"
      >
        <Galaxy
          focal={GALAXY_FOCAL}
          rotation={GALAXY_ROTATION}
          transparent={true}
          lightMode={theme === 'light'}
          mouseInteraction={true}
          mouseRepulsion={true}
          density={1}
          glowIntensity={0.35}
          twinkleIntensity={0.4}
          starSpeed={0.5}
        />
      </div>

      {/* Interactive Spark Layer Wrapping Page Content */}
      <ClickSpark
        sparkColor={sparkColor}
        sparkSize={12}
        sparkRadius={20}
        sparkCount={8}
        duration={420}
        easing="ease-out"
        extraScale={1.1}
      >
        <div className="page-container">
          {/* Header */}
          <header className="site-header-wrapper">
            <div className="site-header">
              <a href="#hero" className="brand-link" aria-label="Mark Alejos, back to top">
                <span className="dot" aria-hidden="true"></span>
                <span>Mark Alejos</span>
              </a>

              <nav className="main-nav" aria-label="Main Navigation">
                {SECTIONS.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                    aria-current={activeSection === section.id ? 'location' : undefined}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>

              <div className="header-actions">
                <a href="#contacts" className="availability-badge" aria-label="Let's talk, go to contacts">
                  <span className="status-pulse" aria-hidden="true"></span>
                  <span>Let’s talk</span>
                </a>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="theme-btn"
                  aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                  aria-pressed={theme === 'light'}
                >
                  <span aria-hidden="true">{theme === 'dark' ? '◑' : '◐'}</span>
                </button>
              </div>
            </div>
          </header>

          {/* Main Hero & Sections */}
          <main className="main-content">
            {/* Hero Section */}
            <section id="hero" className="hero-section" aria-labelledby="hero-title">
              <div className="hero-copy">
                <div className="hero-eyebrow">
                  <span className="eyebrow-accent-bar" aria-hidden="true"></span>
                  <span>PERSONAL PORTFOLIO • 01 / 07</span>
                </div>

                <h1 id="hero-title" className="hero-title">
                  <span>Mark</span>
                  <span>Christian</span>
                  <span className="title-accent">Alejos</span>
                </h1>

                <p className="hero-intro">
                  Welcome to my corner of the web. I’m Mark, an Information Technology student exploring ideas through design and code.
                </p>

                <div className="hero-actions">
                  <a href="#about" className="cta-button">
                    <span>Explore my work</span>
                    <span className="arrow" aria-hidden="true">↘</span>
                  </a>
                </div>

                <div className="author-pill">
                  <div className="avatar-badge">MC</div>
                  <div className="author-meta">
                    <span className="author-name">Mark Christian Alejos</span>
                    <span className="author-role">3rd Year · Information Technology</span>
                  </div>
                </div>
              </div>

              {/* Orbital Cosmic Graphic Visual */}
              <div className="hero-visual" role="img" aria-label="Cosmic planetary orbital rings representation">
                <div className="visual-backlight" aria-hidden="true"></div>
                <svg className="orbit-svg" viewBox="0 0 500 500" fill="none" aria-hidden="true">
                  <ellipse
                    className="orbit-ring-solid"
                    cx="250"
                    cy="250"
                    rx="195"
                    ry="95"
                    transform="rotate(-28 250 250)"
                  />
                  <ellipse
                    className="orbit-ring-dashed"
                    cx="250"
                    cy="250"
                    rx="230"
                    ry="120"
                    transform="rotate(-34 250 250)"
                  />
                  <circle className="orbit-node" cx="105" cy="165" r="5" />
                  <circle className="orbit-node" cx="420" cy="340" r="3.5" />
                </svg>
                <div className="visual-badge">
                  <span>✳</span> A SMALL UNIVERSE OF IDEAS
                </div>
              </div>
            </section>

            {/* Sections Container (Phase 1 Empty Placeholders) */}
            <section className="sections-container" aria-label="Portfolio sections">
              <div className="sections-intro">
                <h2>Sections Overview</h2>
                <span className="sections-counter">07 Sections Ready</span>
              </div>

              {SECTIONS.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="portfolio-section-card"
                  aria-labelledby={`section-heading-${section.id}`}
                >
                  <div className="section-card-header">
                    <div className="section-card-title-group">
                      <span className="section-num">{section.num}</span>
                      <h2 id={`section-heading-${section.id}`} className="section-name">
                        {section.title}
                      </h2>
                    </div>
                    <span className="section-status-pill">
                      <span className="indicator-dot" aria-hidden="true"></span>
                      <span>Phase 1 Placeholder</span>
                    </span>
                  </div>

                  <div className="section-placeholder-body">
                    <span className="placeholder-tag">[ Ready for Phase 2 Content ]</span>
                    <span>Waiting for content instructions</span>
                  </div>
                </section>
              ))}
            </section>
          </main>

          {/* Footer */}
          <footer className="site-footer">
            <div>
              <span>© {new Date().getFullYear()} Mark Christian C. Alejos. All rights reserved.</span>
            </div>
            <div>
              <a href="#hero">Back to top ↑</a>
            </div>
          </footer>
        </div>
      </ClickSpark>
    </>
  );
}

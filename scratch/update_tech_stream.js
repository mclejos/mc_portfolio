const fs = require('fs');
const path = require('path');

// 1. Update index.html
const indexPath = path.join(__dirname, '..', 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

const htmlStartMarker = '      <!-- Edge-to-Edge Full Viewport Tech Stream (No Box) -->';
const htmlEndMarker = '      </section>';

const newTechStreamHtml = `      <!-- Edge-to-Edge Full Viewport Tech Stream (No Box) -->
      <div class="about-tech-stream-wrapper" id="tech-stream">
        <div class="container">
          <div class="tech-dock-header">
            <div class="tech-dock-title">
              <span class="tech-dock-pulse" aria-hidden="true"></span>
              <span>CORE TECHNOLOGIES &amp; DEVELOPER TOOLKIT</span>
            </div>
            <div class="tech-dock-meta">Continuous Dock &bull; Hover to Pause</div>
          </div>
        </div>

        <!-- 1px line (rgba(255,255,255,0.12)) from far left to far right ABOVE the stream -->
        <div class="tech-stream-line tech-stream-line-top" aria-hidden="true"></div>

        <!-- Infinite auto-scroll stream in pure CSS (No Box, spans full viewport width) -->
        <div class="marquee tech-marquee-wrapper" aria-label="Core Technologies &amp; Developer Toolkit Stream">
          <div class="marquee-track tech-marquee-track">
            <!-- Item Set 1 -->
            <div class="marquee-group tech-marquee-group">
              <!-- 1. JavaScript -->
              <div class="tech-pill tech-badge" data-tech="JavaScript" title="JavaScript">
                <img src="images/tech/javascript.svg" alt="JavaScript" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">JavaScript</span>
              </div>

              <!-- 2. Python -->
              <div class="tech-pill tech-badge" data-tech="Python" title="Python">
                <img src="images/tech/python.svg" alt="Python" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">Python</span>
              </div>

              <!-- 3. Java -->
              <div class="tech-pill tech-badge" data-tech="Java" title="Java">
                <img src="images/tech/openjdk.svg" alt="Java" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">Java</span>
              </div>

              <!-- 4. C/C++ -->
              <div class="tech-pill tech-badge" data-tech="C/C++" title="C/C++">
                <img src="images/tech/cplusplus.svg" alt="C/C++" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">C/C++</span>
              </div>

              <!-- 5. React -->
              <div class="tech-pill tech-badge" data-tech="React" title="React">
                <img src="images/tech/react.svg" alt="React" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">React</span>
              </div>

              <!-- 6. Next.js -->
              <div class="tech-pill tech-badge" data-tech="Next.js" title="Next.js">
                <img src="images/tech/nextdotjs.svg" alt="Next.js" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">Next.js</span>
              </div>

              <!-- 7. Node.js -->
              <div class="tech-pill tech-badge" data-tech="Node.js" title="Node.js">
                <img src="images/tech/nodedotjs.svg" alt="Node.js" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">Node.js</span>
              </div>

              <!-- 8. MySQL -->
              <div class="tech-pill tech-badge" data-tech="MySQL" title="MySQL">
                <img src="images/tech/mysql.svg" alt="MySQL" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">MySQL</span>
              </div>

              <!-- 9. PostgreSQL -->
              <div class="tech-pill tech-badge" data-tech="PostgreSQL" title="PostgreSQL">
                <img src="images/tech/postgresql.svg" alt="PostgreSQL" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">PostgreSQL</span>
              </div>

              <!-- 10. AWS -->
              <div class="tech-pill tech-badge" data-tech="AWS" title="AWS">
                <img src="images/tech/aws.svg" alt="AWS" width="20" height="20" class="tech-pill-logo tech-logo-aws" loading="lazy">
                <span class="tech-pill-name tech-badge-name">AWS</span>
              </div>

              <!-- 11. Supabase -->
              <div class="tech-pill tech-badge" data-tech="Supabase" title="Supabase">
                <img src="images/tech/supabase.svg" alt="Supabase" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">Supabase</span>
              </div>

              <!-- 12. Git -->
              <div class="tech-pill tech-badge" data-tech="Git" title="Git">
                <img src="images/tech/git.svg" alt="Git" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">Git</span>
              </div>

              <!-- 13. HTML5 -->
              <div class="tech-pill tech-badge" data-tech="HTML5" title="HTML5">
                <img src="images/tech/html5.svg" alt="HTML5" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">HTML5</span>
              </div>

              <!-- 14. CSS3 -->
              <div class="tech-pill tech-badge" data-tech="CSS3" title="CSS3">
                <img src="images/tech/css3.svg" alt="CSS3" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">CSS3</span>
              </div>

              <!-- 15. Figma -->
              <div class="tech-pill tech-badge" data-tech="Figma" title="Figma">
                <img src="images/tech/figma.svg" alt="Figma" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">Figma</span>
              </div>

              <!-- 16. Cisco Networking -->
              <div class="tech-pill tech-badge" data-tech="Cisco Networking" title="Cisco Networking">
                <img src="images/tech/cisco.svg" alt="Cisco Networking" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">Cisco Networking</span>
              </div>
            </div>

            <!-- Item Set 2 (Identical duplicate for pure CSS seamless infinite marquee) -->
            <div class="marquee-group tech-marquee-group" aria-hidden="true">
              <!-- 1. JavaScript -->
              <div class="tech-pill tech-badge" data-tech="JavaScript" tabindex="-1">
                <img src="images/tech/javascript.svg" alt="" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">JavaScript</span>
              </div>

              <!-- 2. Python -->
              <div class="tech-pill tech-badge" data-tech="Python" tabindex="-1">
                <img src="images/tech/python.svg" alt="" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">Python</span>
              </div>

              <!-- 3. Java -->
              <div class="tech-pill tech-badge" data-tech="Java" tabindex="-1">
                <img src="images/tech/openjdk.svg" alt="" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">Java</span>
              </div>

              <!-- 4. C/C++ -->
              <div class="tech-pill tech-badge" data-tech="C/C++" tabindex="-1">
                <img src="images/tech/cplusplus.svg" alt="" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">C/C++</span>
              </div>

              <!-- 5. React -->
              <div class="tech-pill tech-badge" data-tech="React" tabindex="-1">
                <img src="images/tech/react.svg" alt="" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">React</span>
              </div>

              <!-- 6. Next.js -->
              <div class="tech-pill tech-badge" data-tech="Next.js" tabindex="-1">
                <img src="images/tech/nextdotjs.svg" alt="" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">Next.js</span>
              </div>

              <!-- 7. Node.js -->
              <div class="tech-pill tech-badge" data-tech="Node.js" tabindex="-1">
                <img src="images/tech/nodedotjs.svg" alt="" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">Node.js</span>
              </div>

              <!-- 8. MySQL -->
              <div class="tech-pill tech-badge" data-tech="MySQL" tabindex="-1">
                <img src="images/tech/mysql.svg" alt="" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">MySQL</span>
              </div>

              <!-- 9. PostgreSQL -->
              <div class="tech-pill tech-badge" data-tech="PostgreSQL" tabindex="-1">
                <img src="images/tech/postgresql.svg" alt="" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">PostgreSQL</span>
              </div>

              <!-- 10. AWS -->
              <div class="tech-pill tech-badge" data-tech="AWS" tabindex="-1">
                <img src="images/tech/aws.svg" alt="" width="20" height="20" class="tech-pill-logo tech-logo-aws" loading="lazy">
                <span class="tech-pill-name tech-badge-name">AWS</span>
              </div>

              <!-- 11. Supabase -->
              <div class="tech-pill tech-badge" data-tech="Supabase" tabindex="-1">
                <img src="images/tech/supabase.svg" alt="" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">Supabase</span>
              </div>

              <!-- 12. Git -->
              <div class="tech-pill tech-badge" data-tech="Git" tabindex="-1">
                <img src="images/tech/git.svg" alt="" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">Git</span>
              </div>

              <!-- 13. HTML5 -->
              <div class="tech-pill tech-badge" data-tech="HTML5" tabindex="-1">
                <img src="images/tech/html5.svg" alt="" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">HTML5</span>
              </div>

              <!-- 14. CSS3 -->
              <div class="tech-pill tech-badge" data-tech="CSS3" tabindex="-1">
                <img src="images/tech/css3.svg" alt="" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">CSS3</span>
              </div>

              <!-- 15. Figma -->
              <div class="tech-pill tech-badge" data-tech="Figma" tabindex="-1">
                <img src="images/tech/figma.svg" alt="" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">Figma</span>
              </div>

              <!-- 16. Cisco Networking -->
              <div class="tech-pill tech-badge" data-tech="Cisco Networking" tabindex="-1">
                <img src="images/tech/cisco.svg" alt="" width="20" height="20" class="tech-pill-logo" loading="lazy">
                <span class="tech-pill-name tech-badge-name">Cisco Networking</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 1px line (rgba(255,255,255,0.12)) from far left to far right BELOW the stream -->
        <div class="tech-stream-line tech-stream-line-bottom" aria-hidden="true"></div>
      </div>
`;

const startIndex = indexHtml.indexOf(htmlStartMarker);
const endIndex = indexHtml.indexOf(htmlEndMarker, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  indexHtml = indexHtml.substring(0, startIndex) + newTechStreamHtml + indexHtml.substring(endIndex);
  fs.writeFileSync(indexPath, indexHtml, 'utf8');
  console.log('Successfully updated index.html');
} else {
  console.error('Could not find markers in index.html', startIndex, endIndex);
}

// 2. Update style.css
const cssPath = path.join(__dirname, '..', 'assets', 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

const cssStartMarker = '/* --- Dedicated Full-Width Edge-to-Edge Tech Stream (No Box) --- */';
const cssEndMarker = '/* Light Theme Support */';

const newTechStreamCss = `/* --- Dedicated Full-Width Edge-to-Edge Tech Stream (No Box) --- */
.about-tech-stream-wrapper {
  width: 100%;
  margin-top: 56px;
  position: relative;
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
}

/* 1px lines running far left to far right of viewport (100vw, no side margins or padding) */
.tech-stream-line {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  height: 1px;
  background: rgba(255, 255, 255, 0.12);
  border: none;
  padding: 0;
}

.tech-stream-line.tech-stream-line-top {
  margin-top: 18px;
  margin-bottom: 24px; /* ~24px spacing between stream and line above */
}

.tech-stream-line.tech-stream-line-bottom {
  margin-top: 24px; /* ~24px spacing between stream and line below */
  margin-bottom: 0;
}

/* Small header text without a box */
.tech-dock-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0;
  flex-wrap: wrap;
  gap: 12px;
  background: transparent;
  border: none;
  padding: 0;
}

/* Left: "CORE TECHNOLOGIES & DEVELOPER TOOLKIT" (monospace, lime, small) */
.tech-dock-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  letter-spacing: 1.6px;
  color: var(--accent-lime);
  text-transform: uppercase;
  font-weight: 600;
}

.tech-dock-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-lime);
  box-shadow: 0 0 8px var(--accent-lime);
  animation: statusPulse 2s ease-in-out infinite;
}

/* Right: "Continuous Dock • Hover to Pause" */
.tech-dock-meta {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
  letter-spacing: 0.3px;
  opacity: 0.8;
}

/* Infinite auto-scroll stream in pure CSS */
.marquee,
.tech-marquee-wrapper {
  position: relative;
  overflow: hidden;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
  padding: 4px 0;
  background: transparent;
  border: none;
}

.marquee-track,
.tech-marquee-track {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: marqueeScroll 36s linear infinite;
}

/* Pause on hover */
.marquee:hover .marquee-track,
.tech-marquee-wrapper:hover .tech-marquee-track {
  animation-play-state: paused;
}

.marquee-group,
.tech-marquee-group {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-right: 16px;
  flex-shrink: 0;
}

@keyframes marqueeScroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes techMarqueeScroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* Wide pill: border-radius 12px, background #171717, 1px solid #262626 */
.tech-pill,
.tech-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background: #171717;
  border: 1px solid #262626;
  border-radius: 12px;
  font-size: 0.86rem;
  font-weight: 500;
  color: #f5f7f6;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.tech-pill:hover,
.tech-badge:hover {
  transform: translateY(-2px);
  background: #202020;
  border-color: rgba(255, 255, 255, 0.22);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 16px rgba(212, 249, 56, 0.12);
  color: #ffffff;
}

/* Small logo (20px) */
.tech-pill-logo,
.tech-badge-icon img,
.tech-badge img {
  width: 20px;
  height: 20px;
  object-fit: contain;
  display: block;
  flex-shrink: 0;
}

/* AWS exception: white with brightness(0) invert(1) */
.tech-logo-aws,
.tech-pill img[src*="aws"],
.tech-badge img[src*="aws"] {
  filter: brightness(0) invert(1);
}

.tech-pill-name,
.tech-badge-name {
  letter-spacing: 0.2px;
  font-family: var(--font-main);
}

`;

const cssStartIndex = css.indexOf(cssStartMarker);
const cssEndIndex = css.indexOf(cssEndMarker, cssStartIndex);

if (cssStartIndex !== -1 && cssEndIndex !== -1) {
  css = css.substring(0, cssStartIndex) + newTechStreamCss + css.substring(cssEndIndex);
  
  // Also check light theme rules for tech-pill
  if (!css.includes('.tech-pill-logo')) {
    css = css.replace(
      '[data-theme="light"] .tech-badge {',
      '[data-theme="light"] .tech-pill,\n[data-theme="light"] .tech-badge {'
    );
    css = css.replace(
      '[data-theme="light"] .tech-badge:hover {',
      '[data-theme="light"] .tech-pill:hover,\n[data-theme="light"] .tech-badge:hover {'
    );
  }

  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Successfully updated style.css');
} else {
  console.error('Could not find markers in style.css', cssStartIndex, cssEndIndex);
}

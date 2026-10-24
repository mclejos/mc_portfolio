/**
 * Aceternity UI: Shooting Stars & Stars Background
 * Global Website Background Engine (Vanilla JS)
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. STARS BACKGROUND (Canvas Twinkling Starfield)
  // =========================================================================
  class StarsBackgroundEngine {
    constructor(canvas, options = {}) {
      if (!canvas) return;
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      if (!this.ctx) return;

      this.starDensity = options.starDensity || 0.00014;
      this.allStarsTwinkle = options.allStarsTwinkle !== undefined ? options.allStarsTwinkle : true;
      this.twinkleProbability = options.twinkleProbability || 0.8;
      this.minTwinkleSpeed = options.minTwinkleSpeed || 0.4;
      this.maxTwinkleSpeed = options.maxTwinkleSpeed || 1.2;

      this.stars = [];
      this.animId = null;
      this.isRunning = false;

      this.init();
    }

    init() {
      this.updateDimensions();
      this.bindEvents();
      this.start();
    }

    updateDimensions() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.canvas.width = width * dpr;
      this.canvas.height = height * dpr;
      this.canvas.style.width = width + 'px';
      this.canvas.style.height = height + 'px';

      this.ctx.resetTransform?.();
      this.ctx.scale(dpr, dpr);

      this.width = width;
      this.height = height;

      this.generateStars();
    }

    generateStars() {
      const area = this.width * this.height;
      const numStars = Math.max(90, Math.floor(area * this.starDensity));
      this.stars = [];

      for (let i = 0; i < numStars; i++) {
        const shouldTwinkle = this.allStarsTwinkle || Math.random() < this.twinkleProbability;
        this.stars.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          radius: Math.random() * 0.75 + 0.4,
          opacity: Math.random() * 0.5 + 0.5,
          twinkleSpeed: shouldTwinkle
            ? this.minTwinkleSpeed + Math.random() * (this.maxTwinkleSpeed - this.minTwinkleSpeed)
            : null,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    }

    bindEvents() {
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          this.updateDimensions();
        }, 120);
      });

      // Pause when tab is hidden to conserve GPU / CPU battery
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stop();
        } else {
          this.start();
        }
      });
    }

    start() {
      if (this.isRunning) return;
      this.isRunning = true;

      const render = () => {
        if (!this.isRunning) return;

        this.ctx.clearRect(0, 0, this.width, this.height);
        const now = Date.now() * 0.001;

        for (let i = 0; i < this.stars.length; i++) {
          const star = this.stars[i];

          let alpha = star.opacity;
          if (star.twinkleSpeed !== null) {
            alpha = 0.35 + Math.abs(Math.sin(now / star.twinkleSpeed + star.twinkleOffset) * 0.65);
          }

          this.ctx.beginPath();
          this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
          this.ctx.fill();
        }

        this.animId = requestAnimationFrame(render);
      };

      this.animId = requestAnimationFrame(render);
    }

    stop() {
      this.isRunning = false;
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
    }
  }


  // =========================================================================
  // 2. SHOOTING STARS (SVG Trajectory Engine Across Viewport)
  // =========================================================================
  class ShootingStarsEngine {
    constructor(svg, options = {}) {
      if (!svg) return;
      this.svg = svg;

      this.minSpeed = options.minSpeed || 14;
      this.maxSpeed = options.maxSpeed || 32;
      this.minDelay = options.minDelay || 1400;
      this.maxDelay = options.maxDelay || 3600;
      this.starWidth = options.starWidth || 14;
      this.starHeight = options.starHeight || 1.8;

      // Color themes for variety
      this.colorPairs = [
        { star: '#d4f938', trail: '#38bdf8' }, // Neon Lime & Sky Cyan
        { star: '#38bdf8', trail: '#ffffff' }, // Cyan & Pure White
        { star: '#ffffff', trail: '#d4f938' }, // White & Lime
        { star: '#9E00FF', trail: '#2EB9DF' }, // Aceternity Purple & Cyan
      ];

      this.activeStars = [];
      this.timer = null;
      this.animId = null;
      this.isRunning = false;

      this.init();
    }

    init() {
      this.setupDefs();
      this.updateDimensions();
      this.bindEvents();
      this.start();
    }

    updateDimensions() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      this.width = w;
      this.height = h;
    }

    setupDefs() {
      const svgNS = 'http://www.w3.org/2000/svg';
      let defs = this.svg.querySelector('defs');
      if (!defs) {
        defs = document.createElementNS(svgNS, 'defs');
        this.svg.appendChild(defs);
      }
      this.defs = defs;
      this.svgNS = svgNS;

      // Pre-create gradient definitions for our color pairs
      this.gradIds = this.colorPairs.map((pair, index) => {
        const id = 'shootingStarGrad_' + index;
        const grad = document.createElementNS(svgNS, 'linearGradient');
        grad.setAttribute('id', id);
        grad.setAttribute('x1', '0%');
        grad.setAttribute('y1', '0%');
        grad.setAttribute('x2', '100%');
        grad.setAttribute('y2', '100%');

        const stop1 = document.createElementNS(svgNS, 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', pair.trail);
        stop1.setAttribute('stop-opacity', '0');

        const stop2 = document.createElementNS(svgNS, 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', pair.star);
        stop2.setAttribute('stop-opacity', '1');

        grad.appendChild(stop1);
        grad.appendChild(stop2);
        defs.appendChild(grad);
        return id;
      });
    }

    getRandomStartPoint() {
      const w = this.width || window.innerWidth;
      const h = this.height || window.innerHeight;
      const side = Math.floor(Math.random() * 4);
      const offset = Math.random() * (side % 2 === 0 ? w : h);

      switch (side) {
        case 0: // Top edge heading down-right
          return { x: offset, y: -20, angle: 45 };
        case 1: // Right edge heading down-left
          return { x: w + 20, y: offset, angle: 135 };
        case 2: // Bottom edge heading up-left
          return { x: offset, y: h + 20, angle: 225 };
        case 3: // Left edge heading up-right
          return { x: -20, y: offset, angle: 315 };
        default:
          return { x: 0, y: 0, angle: 45 };
      }
    }

    spawnStar() {
      if (!this.isRunning) return;
      const pt = this.getRandomStartPoint();
      const gradIndex = Math.floor(Math.random() * this.gradIds.length);
      const gradId = this.gradIds[gradIndex];

      const rect = document.createElementNS(this.svgNS, 'rect');
      rect.setAttribute('fill', `url(#${gradId})`);
      this.svg.appendChild(rect);

      const star = {
        element: rect,
        x: pt.x,
        y: pt.y,
        angle: pt.angle,
        speed: Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed,
        distance: 0,
        scale: 1,
      };

      this.activeStars.push(star);
    }

    scheduleNext() {
      if (!this.isRunning) return;
      const delay = Math.random() * (this.maxDelay - this.minDelay) + this.minDelay;
      this.timer = setTimeout(() => {
        this.spawnStar();
        this.scheduleNext();
      }, delay);
    }

    bindEvents() {
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          this.updateDimensions();
        }, 120);
      });

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stop();
        } else {
          this.start();
        }
      });
    }

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.scheduleNext();

      const move = () => {
        if (!this.isRunning) return;

        const w = this.width || window.innerWidth;
        const h = this.height || window.innerHeight;

        for (let i = this.activeStars.length - 1; i >= 0; i--) {
          const star = this.activeStars[i];
          const rad = (star.angle * Math.PI) / 180;
          star.x += star.speed * Math.cos(rad);
          star.y += star.speed * Math.sin(rad);
          star.distance += star.speed;
          star.scale = 1 + star.distance / 120;

          // Out of viewport check
          if (
            star.x < -60 ||
            star.x > w + 60 ||
            star.y < -60 ||
            star.y > h + 60
          ) {
            star.element.remove();
            this.activeStars.splice(i, 1);
          } else {
            const currentWidth = this.starWidth * star.scale;
            star.element.setAttribute('x', star.x.toFixed(1));
            star.element.setAttribute('y', star.y.toFixed(1));
            star.element.setAttribute('width', currentWidth.toFixed(1));
            star.element.setAttribute('height', this.starHeight);
            star.element.setAttribute(
              'transform',
              `rotate(${star.angle}, ${(star.x + currentWidth / 2).toFixed(1)}, ${(star.y + this.starHeight / 2).toFixed(1)})`
            );
          }
        }

        this.animId = requestAnimationFrame(move);
      };

      this.animId = requestAnimationFrame(move);
    }

    stop() {
      this.isRunning = false;
      if (this.timer) clearTimeout(this.timer);
      if (this.animId) cancelAnimationFrame(this.animId);
      this.activeStars.forEach((s) => s.element.remove());
      this.activeStars = [];
    }
  }


  // =========================================================================
  // 3. AUTO INITIALIZATION FOR GLOBAL WEBSITE BACKGROUND
  // =========================================================================
  function initGlobalStars() {
    const globalBg = document.getElementById('globalStarsBackground');
    if (!globalBg) return;

    const canvas = globalBg.querySelector('.stars-bg-canvas');
    const svg = globalBg.querySelector('.shooting-stars-svg');

    if (canvas && !canvas.dataset.initialized) {
      canvas.dataset.initialized = 'true';
      new StarsBackgroundEngine(canvas, {
        starDensity: 0.00015,
        allStarsTwinkle: true,
        twinkleProbability: 0.8,
        minTwinkleSpeed: 0.4,
        maxTwinkleSpeed: 1.2,
      });
    }

    if (svg && !svg.dataset.initialized) {
      svg.dataset.initialized = 'true';
      new ShootingStarsEngine(svg, {
        minSpeed: 14,
        maxSpeed: 30,
        minDelay: 1200,
        maxDelay: 3200,
        starWidth: 14,
        starHeight: 2,
      });
    }
  }

  // Expose globally
  window.AceternityStars = {
    StarsBackground: StarsBackgroundEngine,
    ShootingStars: ShootingStarsEngine,
    init: initGlobalStars,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalStars);
  } else {
    initGlobalStars();
  }
})();

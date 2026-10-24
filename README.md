# Mark Christian Alejos — Personal Web Portfolio 🚀

> A bespoke, dark-themed personal portfolio built from scratch as a major coursework project for my **Web Development** class (Junior Year, B.S. in Information Technology).

---

## 🌟 About the Project

Hey there! I'm **Mark Christian Alejos (MC)**, an Information Technology student passionate about software systems, project management, and frontend engineering.

Rather than reaching for pre-baked portfolio templates or heavy CSS frameworks, I wanted to build something that reflects who I am: ambitious, detail-oriented, and curious about what happens under the hood of modern web interfaces. This portfolio was engineered from the ground up to explore clean typography, interactive canvas graphics, and micro-animations while adhering to a distinct design aesthetic — deep space black (`#0a0c0b` / `#0d0d0d`) paired with electric lime neon accents (`#c3ff3c` / `#ccff00`).

---

## 🤖 The Role of AI in This Project

In the spirit of continuous learning, **AI was actively embraced as a pair programmer, research assistant, and learning accelerator** throughout the development of this portfolio.

Rather than using AI as a shortcut, I treated it as an interactive mentor:
* **Exploring Complex Math & Physics:** Learning how to implement vector math for canvas particle trajectories, shooting star angles, and WebGL wing-flap aerodynamics.
* **Component Architecture:** Brainstorming how to modularize standalone UI components (like Aceternity UI effects) into lightweight, dependency-free vanilla JavaScript.
* **Accessibility & Edge Cases:** Auditing keyboard navigation, ARIA attributes, reduced motion preferences (`prefers-reduced-motion`), and responsive viewport clamps.
* **Refining Code Quality:** Using AI to critique my CSS architecture, eliminate layout shifts, and sharpen animations.

Embracing AI during this project helped me bridge the gap between classroom theory and modern, production-grade frontend practices.

---

## 🛠️ The Tech Stack

This project prioritizes performance, zero build-step overhead, and native browser capabilities:

| Layer | Technology | Details |
|---|---|---|
| **Structure** | **Semantic HTML5** | Accessible landmarks (`<header>`, `<main>`, `<section>`, `<footer>`), descriptive ARIA tags, and SEO metadata. |
| **Styling** | **Vanilla CSS3** | Custom properties (CSS variables), Flexbox, CSS Grid, clamp-based fluid typography, frosted glassmorphism (`backdrop-filter: blur`), and custom `@keyframes`. |
| **Interactivity** | **Vanilla JavaScript (ES6+)** | Lightweight modular scripts, IntersectionObserver for scroll transitions, event listeners, and dynamic DOM manipulation. |
| **Graphics & FX** | **HTML5 Canvas & WebGL** | Custom particle engines, vector math for shooting stars, and 3D butterfly drift shaders. |
| **Third-Party Libraries** | **Swiper.js** | Lightweight carousel integration for the featured project cards. |

---

## 🧩 Interactive Custom Components

Here are the custom interactive components built into this portfolio:

### 1. 🌌 Aceternity UI Shooting Stars & Twinkling Starfield (`assets/js/shooting-stars.js`)
* **Twinkling Starfield:** A full-viewport HTML5 Canvas engine rendering multi-layered, non-uniform stars with staggered sine-wave twinkle frequencies and depths.
* **Shooting Stars Engine:** An SVG trajectory system that spawns radiant meteors entering from randomized off-screen angles with luminous dual-tone gradient trails (electric lime, sky cyan, and pure white).

### 2. 🦋 Butterfly Drift WebGL Sandbox (`assets/js/butterfly-drift.js`)
* Contained inside the interactive Contact card is an interactive WebGL particle simulation featuring animated 3D butterflies.
* Includes wing-flapping physics and interactive cursor repulsion — hovering or moving your cursor disperses the swarm organically across the card.

### 3. 🪐 Celestial Orbital Constellation (`assets/css/style.css` & `index.html`)
* Surrounding the hero centerpiece photo are dual rotating orbital ellipses.
* **8 Hierarchical Easter-Egg Stars:**
  * **Large Anchors (24px):** Primary diagonal focal points (Photography & Movies/Sci-Fi).
  * **Medium Highlights (16px):** Secondary orbit nodes (Pickleball, Community Builder, Music).
  * **Small Micro-Sparkles (11px):** Delicate filler stars (Gaming, AI Tools, Favorite Color).
* Every star features an invisible **`44px × 44px` touch hitbox**, staggered twinkle timings, and interactive monospace tooltips that reveal personal fun facts and hobbies on hover or during idle auto-cycling.

### 4. 🚀 "Launch to the Top" Blastoff Rocket Button (`#launchRocketContainer`)
* **Default State:** A sleek floating dark pill button fixed at the bottom right with a real-time underline scroll-progress bar. Appears smoothly after scrolling 300px.
* **Hover Interaction (Double Feature):**
  * **Comic Speech Bubble:** A comic-book styled dialogue bubble with an animated pop (`@keyframes comicPop`), downward slanted tail, and playful copy (`"Fueling boosters... ⚡"` transitioning to `"Ready for blastoff! 🚀"`).
  * **Liquid Fuel Fill:** An animated lime gradient inside the pill rises with a wavy SVG crest over ~1.2s to simulate fueling up.
* **Rumble Vibration:** The rocket icon and thrusters enter an engine vibration rumble (`@keyframes rumble`) to signify ignition.
* **Blastoff Sequence:** On click, the bubble punches with `"BLASTOFF! 💨"`, fires a burst of thrust smoke particles, shoots straight up into the stratosphere (`transform: translateY(-135vh)`), and smoothly scrolls the user back to the top.

### 5. 🗂️ Contained Interactive Contact Dock
* Houses an email pill with one-click clipboard copying (`Copied!` pill state feedback) alongside quick-launch links to LinkedIn, GitHub, and downloadable CV.

---

## 📂 Project Structure

```text
responsive-port/
├── index.html                 # Main portfolio markup & semantic structure
├── README.md                  # Project documentation & overview
├── .gitignore                 # Git ignore rules (excludes agent skills, IDE caches)
├── assets/
│   ├── css/
│   │   └── style.css          # Comprehensive design system, animations & layout styles
│   ├── js/
│   │   ├── script.js          # Core app controller (scroll spy, rocket launcher, star cycle)
│   │   ├── shooting-stars.js  # Aceternity UI starfield & shooting stars engine
│   │   └── butterfly-drift.js # Interactive WebGL butterfly sandbox
│   ├── images/
│   │   └── avatar.jpg         # Hero centerpiece portrait
│   └── Mark_Christian-Alejos-CV.pdf # Downloadable resume
└── components/                # Source component reference files & TSX specs
```

---

## 🚀 Running the Project Locally

No complicated build chains, bundlers, or node dependencies are required! You can run it immediately:

### Option A: VS Code Live Server (Recommended)
1. Clone this repository:
   ```bash
   git clone https://github.com/mclejos/responsive-port.git
   ```
2. Open the folder in **Visual Studio Code**.
3. Right-click on `index.html` and click **"Open with Live Server"**.

### Option B: Any Local Static Server
```bash
# Using Python 3
python -m http.server 3000

# Using Node npx
npx serve .
```
Visit `http://localhost:3000` in your web browser.

---

## 👤 Author

**Mark Christian Alejos**  
*3rd Year B.S. Information Technology Student*  
* Cavite, Philippines  
* **GitHub:** [@mclejos](https://github.com/mclejos)  
* **LinkedIn:** [Mark Christian Alejos](https://www.linkedin.com/in/mark-christian-alejos-230a2734b/)  
* **Email:** [alejosmarkchristian@gmail.com](mailto:alejosmarkchristian@gmail.com)

---

## 📄 License

This project was created for educational purposes as part of my academic coursework in Web Development. Feel free to explore the code for inspiration!

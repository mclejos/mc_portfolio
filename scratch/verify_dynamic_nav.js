const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('assets/css/style.css', 'utf8');
const js = fs.readFileSync('assets/js/script.js', 'utf8');

let errors = [];
let passed = [];

function assert(condition, message) {
  if (!condition) {
    errors.push('FAIL: ' + message);
  } else {
    passed.push('PASS: ' + message);
  }
}

// 1. HTML Structure Tests
assert(html.includes('class="master-navbar" id="navbar"') || html.includes('id="navbar" class="master-navbar"'),
  'Master container has id="navbar" and class="master-navbar"');

assert(html.includes('class="nav-left"'), 'Contains .nav-left wrapper');
assert(html.includes('class="nav-center') && html.includes('id="nav-links"'), 'Contains .nav-center wrapper with id="nav-links"');
assert(html.includes('class="nav-right'), 'Contains .nav-right wrapper');

// Logo inside .nav-left
const navLeftMatch = html.match(/<div class="nav-left">([\s\S]*?)<\/div>/);
assert(navLeftMatch && navLeftMatch[1].includes('MC'), '.nav-left contains the "MC" logo');

// Links inside .nav-center
const navCenterMatch = html.match(/<nav[^>]*class="[^"]*nav-center[^"]*"[\s\S]*?<\/nav>/);
assert(navCenterMatch && navCenterMatch[0].includes('About'), '.nav-center contains About link');
assert(navCenterMatch && navCenterMatch[0].includes('Education'), '.nav-center contains Education link');
assert(navCenterMatch && navCenterMatch[0].includes('Projects'), '.nav-center contains Projects link');
assert(navCenterMatch && navCenterMatch[0].includes('Extracurriculars'), '.nav-center contains Extracurriculars link');
assert(navCenterMatch && navCenterMatch[0].includes('Contacts'), '.nav-center contains Contacts link');
assert(navCenterMatch && navCenterMatch[0].includes('id="navProgressBar"'), '.nav-center contains #navProgressBar element');

// Action buttons inside .nav-right
const navRightMatch = html.match(/<div class="nav-right[^"]*">([\s\S]*?)<\/div>/);
assert(navRightMatch && navRightMatch[1].includes("Let's talk"), '.nav-right contains "Let\'s talk" button');
assert(navRightMatch && navRightMatch[1].includes('id="theme-toggle"'), '.nav-right contains Night Mode toggle (#theme-toggle)');

// 2. CSS Styling Tests - State 1 (Unified)
assert(css.includes('position: fixed') && css.includes('top: 24px') && css.includes('left: 50%') && css.includes('transform: translateX(-50%)'),
  'Master container has position: fixed, top: 24px, left: 50%, transform: translateX(-50%)');
assert(css.includes('23, 24, 26, 0.82') || css.includes('#17181A'), 'Master container has dark frosted background matching #17181A / 80%');
assert(css.includes('backdrop-filter: blur'), 'Master container has backdrop-filter blur');
assert(css.includes('border-radius: 9999px'), 'Master container has pill rounded corners');
assert(css.includes('display: flex') && css.includes('align-items: center') && css.includes('justify-content: space-between'),
  'Master container uses flexbox aligning wrappers horizontally');

// 3. CSS Styling Tests - State 2 (Dispersed / Split)
assert(css.includes('.master-navbar.scrolled'), 'CSS defines .master-navbar.scrolled');
assert(css.includes('background: transparent') && css.includes('border-color: transparent'),
  'When .scrolled, master container removes background and border');
assert(css.includes('.master-navbar.scrolled .nav-center'), 'Frosted glass pill styling applied to .nav-center on scroll');
assert(css.includes('cubic-bezier(0.4, 0, 0.2, 1)'), 'Uses cubic-bezier(0.4, 0, 0.2, 1) transition');

// 4. Progress Bar Styling & JS Tests
assert(css.includes('.nav-progress-bar'), 'CSS defines .nav-progress-bar');
assert(css.includes('#CCFF00'), 'Progress bar uses Electric Lime (#CCFF00)');
assert(css.includes('height: 2px'), 'Progress bar has height 2px');

// JS logic
assert(js.includes('window.scrollY > 50'), 'JS checks if window.scrollY > 50 to toggle .scrolled class');
assert(js.includes('document.body.scrollHeight') && js.includes('window.innerHeight'),
  'JS calculates scroll progress using scrollHeight and innerHeight');
assert(js.includes('navProgressBar.style.width'), 'JS updates progress bar width dynamically');

console.log('Passed tests (' + passed.length + '):');
passed.forEach(p => console.log('  ' + p));

if (errors.length > 0) {
  console.log('\nFailed tests (' + errors.length + '):');
  errors.forEach(e => console.log('  ' + e));
  process.exit(1);
} else {
  console.log('\nALL TESTS PASSED SUCCESSFULLY!');
}

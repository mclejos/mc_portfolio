# Web Dev Portfolio — Landing Page Spec (Phase 1)

## 1. Scope

- Build the **landing page first**.
- Start with **all sections empty** (structure/placeholders only, no content yet).
- Content for each section will be added afterward, once the landing page shell exists.
- Click-spark effect via the `ClickSpark` component (Sections 3–4) applied to the page.
- Animated **background** via the `Galaxy` component (Sections 5–6), sitting behind all page content.

### Sections

> Add your section list here. Leave each section empty for Phase 1.

1. `About`
2. `Education`
3. `Academic Projects`
4. `Tech Stack`
5. `Community Involvement`
6. `Certifications`
7. `Contacts`
---

## 2. Tech Notes (taken from the component sources)

**Both components**
- React functional components using hooks.
- Start with the `'use client';` directive (compatible with Next.js App Router).
- Source: React Bits (reactbits.dev).

**ClickSpark**
- Hooks: `useRef`, `useEffect`, `useCallback`.
- No external dependencies besides React.
- Uses inline styles and the HTML Canvas 2D API.

**Galaxy**
- Variant: JavaScript + CSS.
- Dependency: `ogl` (WebGL library).
- Hooks: `useEffect`, `useRef`.
- Renders a WebGL star field with a fragment shader.
- Ships with its own CSS file (`Galaxy.css`).

---

## 3. Component: `ClickSpark`

Renders a wrapper `<div>` containing a transparent canvas overlay. Clicking anywhere inside the wrapper emits a burst of line "sparks" from the click point.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `sparkColor` | string | `'#fff'` | Stroke color of the sparks |
| `sparkSize` | number | `10` | Initial length of each spark line (px) |
| `sparkRadius` | number | `15` | Distance the sparks travel from the click point |
| `sparkCount` | number | `8` | Number of sparks per click, evenly spaced in a circle |
| `duration` | number | `400` | Animation length (ms) |
| `easing` | string | `'ease-out'` | `'linear'`, `'ease-in'`, `'ease-in-out'`, or `'ease-out'` (any other value falls back to ease-out) |
| `extraScale` | number | `1.0` | Multiplier applied to the travel distance |
| `children` | ReactNode | — | Content rendered on top of the canvas |

*(Props table derived from the defaults and logic in the source below.)*

### Behavior

- The wrapper is `position: relative` at `100%` width and height; the canvas fills it.
- The canvas has `pointerEvents: 'none'`, so it never blocks clicks on children.
- The click handler is on the wrapper, so clicks on any child element also trigger sparks.
- The canvas resizes with its parent (`ResizeObserver`, debounced 100 ms).
- Sparks fade out by shrinking line length as they travel.

### Usage Example

```jsx
import ClickSpark from './ClickSpark';

export default function LandingPage() {
  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <main style={{ minHeight: '100vh' }}>
        {/* Sections go here — empty for Phase 1 */}
      </main>
    </ClickSpark>
  );
}
```

*(Example added to complete the "usage example" step referenced in the integration instructions.)*

---

## 4. Component Source (unchanged)

```jsx
'use client';

import { useRef, useEffect, useCallback } from 'react';

const ClickSpark = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  children
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);

    resizeCanvas();

    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  const easeFunc = useCallback(
    t => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;

    const draw = timestamp => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter(spark => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);

  const handleClick = e => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = performance.now();
    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now
    }));

    sparksRef.current.push(...newSparks);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          userSelect: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none'
        }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;
```

---

## 5. Component: `Galaxy` (Background)

- **Variant:** JavaScript + CSS
- **Dependencies:** `ogl`

Renders an animated WebGL star field inside a container `<div>`. Used here as the page background.

### Usage Example

```jsx
import Galaxy from './Galaxy';

// Basic usage
<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Galaxy />
</div>

// With custom prop values
<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Galaxy 
    mouseRepulsion={false}
    mouseInteraction={false}
    density={0.5}
    glowIntensity={0.1}
    saturation={1}
    hueShift={0}
    twinkleIntensity={0.1}
    rotationSpeed={0}
    repulsionStrength={1}
    starSpeed={2}
    speed={0.1}
/>
</div>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| focal | [number, number] | [0.5, 0.5] | Sets the focal point of the galaxy effect as [x, y] coordinates from 0 to 1 |
| rotation | [number, number] | [1.0, 0.0] | Controls the rotation matrix of the galaxy as [x, y] rotation values |
| starSpeed | number | 0.5 | Controls the speed of star movement and animation |
| density | number | 1 | Controls the density of stars in the galaxy |
| hueShift | number | 140 | Shifts the hue of all stars by the specified degrees (0-360) |
| disableAnimation | boolean | false | When true, stops all time-based animations |
| speed | number | 1.0 | Global speed multiplier for all animations |
| mouseInteraction | boolean | true | Enables or disables mouse interaction with the galaxy |
| glowIntensity | number | 0.3 | Controls the intensity of the star glow effect |
| saturation | number | 0.0 | Controls color saturation of stars (0 = grayscale, 1 = full color) |
| mouseRepulsion | boolean | true | When true, stars are repelled by the mouse cursor |
| twinkleIntensity | number | 0.3 | Controls how much stars twinkle (0 = no twinkle, 1 = maximum twinkle) |
| rotationSpeed | number | 0.1 | Speed of automatic galaxy rotation |
| repulsionStrength | number | 2 | Strength of mouse repulsion effect when mouseRepulsion is enabled |
| autoCenterRepulsion | number | 0 | Creates repulsion from center of canvas. Overrides mouse repulsion when > 0 |
| transparent | boolean | true | Makes the black background transparent, showing only stars |

*(The source also accepts an optional `lightMode` prop (default `false`), which the props table above does not list. Any other props are passed through to the container `<div>`.)*

---

## 6. Galaxy Source (unchanged)

### Component

```jsx
'use client';

import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';
import './Galaxy.css';

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform bool uTransparent;
uniform float uLightMode;

varying vec2 vUv;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);

  vec2 gv = fract(uv) - 0.5; 
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);
      
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));

      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;

      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base;

      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;
      
      col += star * size * color;
    }
  }

  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

  vec2 mouseNorm = uMouse - vec2(0.5);
  
  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0);
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  } else if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  } else {
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
    uv += mouseOffset;
  }

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;

  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  vec3 col = vec3(0.0);

  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  if (uLightMode > 0.5) {
    float energy = max(max(col.r, col.g), col.b);
    float coverage = clamp(smoothstep(0.0, 0.42, energy) * 0.92, 0.0, 0.92);
    vec3 ink = clamp(col * 0.48, 0.0, 0.82);
    gl_FragColor = vec4(mix(vec3(1.0), ink, coverage), 1.0);
  } else if (uTransparent) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.3, alpha);
    alpha = min(alpha, 1.0);
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`;

export default function Galaxy({
  focal = [0.5, 0.5],
  rotation = [1.0, 0.0],
  starSpeed = 0.5,
  density = 1,
  hueShift = 140,
  disableAnimation = false,
  speed = 1.0,
  mouseInteraction = true,
  glowIntensity = 0.3,
  saturation = 0.0,
  mouseRepulsion = true,
  repulsionStrength = 2,
  twinkleIntensity = 0.3,
  rotationSpeed = 0.1,
  autoCenterRepulsion = 0,
  transparent = true,
  lightMode = false,
  ...rest
}) {
  const ctnDom = useRef(null);
  const targetMousePos = useRef({ x: 0.5, y: 0.5 });
  const smoothMousePos = useRef({ x: 0.5, y: 0.5 });
  const targetMouseActive = useRef(0.0);
  const smoothMouseActive = useRef(0.0);

  useEffect(() => {
    if (!ctnDom.current) return;
    const ctn = ctnDom.current;
    const renderer = new Renderer({
      alpha: transparent,
      premultipliedAlpha: false
    });
    const gl = renderer.gl;

    if (lightMode) {
      gl.clearColor(1, 1, 1, 1);
    } else if (transparent) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
    } else {
      gl.clearColor(0, 0, 0, 1);
    }

    let program;

    function resize() {
      const scale = 1;
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
      if (program) {
        program.uniforms.uResolution.value = new Color(
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height
        );
      }
    }
    window.addEventListener('resize', resize, false);
    resize();

    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
        },
        uFocal: { value: new Float32Array(focal) },
        uRotation: { value: new Float32Array(rotation) },
        uStarSpeed: { value: starSpeed },
        uDensity: { value: density },
        uHueShift: { value: hueShift },
        uSpeed: { value: speed },
        uMouse: {
          value: new Float32Array([smoothMousePos.current.x, smoothMousePos.current.y])
        },
        uGlowIntensity: { value: glowIntensity },
        uSaturation: { value: saturation },
        uMouseRepulsion: { value: mouseRepulsion },
        uTwinkleIntensity: { value: twinkleIntensity },
        uRotationSpeed: { value: rotationSpeed },
        uRepulsionStrength: { value: repulsionStrength },
        uMouseActiveFactor: { value: 0.0 },
        uAutoCenterRepulsion: { value: autoCenterRepulsion },
        uTransparent: { value: transparent },
        uLightMode: { value: lightMode ? 1 : 0 }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    let animateId;

    function update(t) {
      animateId = requestAnimationFrame(update);
      if (!disableAnimation) {
        program.uniforms.uTime.value = t * 0.001;
        program.uniforms.uStarSpeed.value = (t * 0.001 * starSpeed) / 10.0;
      }

      const lerpFactor = 0.05;
      smoothMousePos.current.x += (targetMousePos.current.x - smoothMousePos.current.x) * lerpFactor;
      smoothMousePos.current.y += (targetMousePos.current.y - smoothMousePos.current.y) * lerpFactor;

      smoothMouseActive.current += (targetMouseActive.current - smoothMouseActive.current) * lerpFactor;

      program.uniforms.uMouse.value[0] = smoothMousePos.current.x;
      program.uniforms.uMouse.value[1] = smoothMousePos.current.y;
      program.uniforms.uMouseActiveFactor.value = smoothMouseActive.current;

      renderer.render({ scene: mesh });
    }
    animateId = requestAnimationFrame(update);
    ctn.appendChild(gl.canvas);

    function handleMouseMove(e) {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMousePos.current = { x, y };
      targetMouseActive.current = 1.0;
    }

    function handleMouseLeave() {
      targetMouseActive.current = 0.0;
    }

    if (mouseInteraction) {
      ctn.addEventListener('mousemove', handleMouseMove);
      ctn.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      if (mouseInteraction) {
        ctn.removeEventListener('mousemove', handleMouseMove);
        ctn.removeEventListener('mouseleave', handleMouseLeave);
      }
      ctn.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [
    focal,
    rotation,
    starSpeed,
    density,
    hueShift,
    disableAnimation,
    speed,
    mouseInteraction,
    glowIntensity,
    saturation,
    mouseRepulsion,
    twinkleIntensity,
    rotationSpeed,
    repulsionStrength,
    autoCenterRepulsion,
    transparent,
    lightMode
  ]);

  return <div ref={ctnDom} className="galaxy-container" {...rest} />;
}
```

### CSS (`Galaxy.css`)

```css
.galaxy-container {
  width: 100%;
  height: 100%;
  position: relative;
}
```

---

## 7. Background Layout (added)

`Galaxy` is the page background and `ClickSpark` wraps the page content. Both component sources stay untouched.

**Requirements**
- Galaxy fills the whole viewport and stays behind all page content.
- Sparks from `ClickSpark` still appear when the user clicks anywhere on the page.
- Page content stays clickable (the background must not intercept clicks).
- `transparent` defaults to `true`, so only the stars are drawn and the page's own background color shows through. Choose a page background that suits the stars (a dark one for the default look).
- Sections must not have opaque backgrounds that cover the galaxy, unless intended.
- Galaxy's effect re-initializes whenever its props change identity. The default `focal` and `rotation` arrays are re-created on every render, so keep Galaxy's parent from re-rendering needlessly, or pass `focal` / `rotation` as constants defined outside the component.
- Any stacking/z-index adjustments are made in the page layout code, not inside the component sources.

**Open decision: mouse interaction**
Galaxy listens for mouse movement on its own container (`mouseInteraction` and `mouseRepulsion` default to `true`). When it sits behind the page content, it will not receive those mouse events. Choose one:
- **(a) Static background:** set `mouseInteraction={false}` and `mouseRepulsion={false}`.
- **(b) Mouse-reactive background:** the layout must let Galaxy receive mouse movement while content stays clickable and ClickSpark still works, without editing the component sources.

> Your choice: `[a / b]`

**Suggested structure**

```jsx
import ClickSpark from './ClickSpark';
import Galaxy from './Galaxy';

export default function LandingPage() {
  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
        <Galaxy />
      </div>

      <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
        <main style={{ minHeight: '100vh' }}>
          {/* Sections go here — empty for Phase 1 */}
        </main>
      </ClickSpark>
    </>
  );
}
```

*(Add Galaxy props from Section 5 as needed. The AI may change the stacking approach if this structure doesn't render correctly.)*

---

## 8. Integration Instructions

1. Install any listed dependencies: `npm install ogl` (needed by `Galaxy`; `ClickSpark` needs nothing beyond React).
2. Copy each component source into the appropriate directory in the project (`ClickSpark`, `Galaxy`, and `Galaxy.css`).
3. Import the CSS file alongside the `Galaxy` component.
4. Import and render the components using the usage examples above (Sections 3, 5 and 7) as a starting point.
5. Adjust props as needed for the specific use case — refer to the props tables for all available options.

---

## 9. More from React Bits

The full library index, including everything reactbits.dev offers, is at https://reactbits.dev/llms.txt — fetch it if a component is not the right fit or the project needs more pieces.

---

## 10. Task for the AI (Phase 1)

1. Set up the landing page with `Galaxy` as the background and `ClickSpark` wrapping the page content, using both component sources (Sections 4 and 6) as-is.
2. Follow the layering requirements and the mouse-interaction choice in Section 7.
3. Create each section from Section 1 as an **empty placeholder** (no content yet).
4. Do not modify the `ClickSpark` or `Galaxy` sources.
5. Wait for content instructions before filling in any section.

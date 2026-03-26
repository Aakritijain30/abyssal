# 🌊 ABYSSAL — Descent into Darkness

> An interactive storytelling experience that takes you through five zones of the ocean — from sun-warmed shallows to crushing, lightless trenches.

---

## 🔗 Live Demo

[View Live →](https://your-live-link-here.vercel.app)

---

## ✨ Features

| Feature | Details |
|---|---|
| **Three.js 3D Scene** | 1800 bioluminescent particles with scroll-driven camera depth |
| **Scroll-Based Interactions** | Parallax hero title, depth-based background colour shift |
| **Custom SVG Illustrations** | Animated jellyfish + anglerfish — hand-coded, no images |
| **Depth Explorer Slider** | Interactive 0–11,000m slider with live zone detection |
| **Depth HUD** | Fixed sidebar with scroll progress + clickable dot nav |
| **Animated Counters** | Numbers count up on scroll into view |
| **Bioluminescent Glow** | Mouse-tracked radial glow on midnight zone cards |
| **Cinematic Loader** | Sonar pulse animation with progress bar |
| **Responsive** | Mobile, tablet, desktop — fully adaptive |

---

## 🗂️ Ocean Zones Covered

| # | Zone | Depth |
|---|---|---|
| 1 | **Epipelagic** — Sunlight Zone | 0–200 m |
| 2 | **Mesopelagic** — Twilight Zone | 200–1,000 m |
| 3 | **Bathypelagic** — Midnight Zone | 1,000–4,000 m |
| 4 | **Abyssopelagic** — Abyssal Zone | 4,000–6,000 m |
| 5 | **Hadal** — Trench Zone | 6,000–11,034 m |

---

## 🛠️ Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties, animations, scroll-reveal, responsive grid
- **Vanilla JavaScript** — ES Modules, IntersectionObserver, requestAnimationFrame
- **Three.js r128** — WebGL particle system
- **SVG** — custom animated illustrations (no external assets)

---

## 📝 Project Description 

ABYSSAL is an immersive, scroll-driven storytelling experience exploring the five vertical zones of Earth's oceans. As users scroll, a Three.js WebGL camera descends through 1,800 bioluminescent particles while the background transitions from deep blue to absolute black. Each of the five sections reveals itself through staggered scroll animations, featuring hand-coded SVG illustrations of deep-sea creatures — an animated jellyfish with morphing tentacles and a glowing anglerfish with a pulsing lure. Interactive elements include a depth-explorer slider that dynamically maps any depth from 0–11,000m to its ocean zone, hover-triggered glow effects, a fixed depth HUD with clickable navigation dots, and animated counters. The design uses an editorial aesthetic with Playfair Display italics, DM Mono for data, and a bioluminescent colour palette. Every asset is generated in code — no external images — keeping the project a lean three-file architecture deployable anywhere.

---

## 🎨 Design Choices

- **Typography:** Playfair Display (editorial serif) + DM Mono (data/labels)
- **Colour palette:** Teal `#00f5d4` · Pink `#ff006e` · Violet `#7b2fff` · Gold `#ffd60a`
- **Aesthetic:** Dark, cinematic, luxury editorial — inspired by deep-sea photography
- **Animations:** CSS keyframes for SVG creatures, requestAnimationFrame for Three.js, IntersectionObserver for scroll reveals

---

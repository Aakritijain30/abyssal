let renderer, scene, camera;
let particles;
let mouseX = 0, mouseY = 0;

const PARTICLE_COUNT = 1800;

/* ─── INIT ─────────────────────────────────── */
export function initScene() {
  const canvas = document.getElementById('three-canvas');

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 5);

  buildParticles();
  animate();

  /* resize */
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  /* mouse track */
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });
}

/* ─── BUILD PARTICLES ──────────────────────── */
function buildParticles() {
  const geo       = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors    = new Float32Array(PARTICLE_COUNT * 3);
  const sizes     = new Float32Array(PARTICLE_COUNT);

  /* bioluminescent colour palette */
  const palettes = [
    [0,    0.96, 0.83],   // teal
    [0.84, 0.18, 1   ],   // violet
    [1,    0,    0.43],   // pink
    [1,    0.84, 0.04],   // gold
    [0,    0.7,  0.85],   // cyan
  ];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    positions[i3]     = (Math.random() - 0.5) * 30;
    positions[i3 + 1] = (Math.random() - 0.5) * 40;
    positions[i3 + 2] = (Math.random() - 0.5) * 20;

    const col       = palettes[Math.floor(Math.random() * palettes.length)];
    colors[i3]      = col[0];
    colors[i3 + 1]  = col[1];
    colors[i3 + 2]  = col[2];

    sizes[i] = Math.random() * 3 + 0.5;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3));
  geo.setAttribute('size',     new THREE.BufferAttribute(sizes,     1));

  const mat = new THREE.PointsMaterial({
    size:         0.06,
    vertexColors: true,
    transparent:  true,
    opacity:      0.75,
    blending:     THREE.AdditiveBlending,
    depthWrite:   false,
  });

  particles = new THREE.Points(geo, mat);
  scene.add(particles);
}

/* ─── ANIMATION LOOP ───────────────────────── */
function animate() {
  requestAnimationFrame(animate);

  const t = Date.now() * 0.001;

  /* drift particles */
  if (particles) {
    const pos = particles.geometry.attributes.position.array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3 + 1] += Math.sin(t * 0.3 + i * 0.1)  * 0.002;
      pos[i3]     += Math.cos(t * 0.2 + i * 0.15) * 0.001;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    particles.rotation.y = t * 0.02 + mouseX * 0.1;
    particles.rotation.x = mouseY * 0.05;
  }

  /* scroll-driven camera */
  const docH      = document.body.scrollHeight - window.innerHeight;
  const scrollPct = Math.max(0, Math.min(1, window.scrollY / docH));
  camera.position.y = -scrollPct * 30;

  /* background colour deepens with scroll */
  const r = Math.max(0, 0.07 - scrollPct * 0.07);
  const g = Math.max(0, 0.08 - scrollPct * 0.07);
  const b = Math.max(0, 0.22 - scrollPct * 0.22);
  renderer.setClearColor(new THREE.Color(r, g, b), scrollPct < 0.05 ? 0 : 1);

  renderer.render(scene, camera);
}

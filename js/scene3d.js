/**
 * Three.js 3D WebGL Engine & Camera Choreography
 */

import * as THREE from 'three';
import { gsap } from 'gsap';
import { PORTFOLIO_DATA } from './data.js';

export class Scene3D {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.scene = null;
    this.camera = null;
    this.renderer = null;

    // Objects
    this.cyberCoreGroup = null;
    this.outerTorusKnot = null;
    this.innerCrystal = null;
    this.cyberRings = [];
    this.particlesGeometry = null;
    this.particlesPoints = null;
    this.projectNodesGroup = null;
    this.projectMeshes = [];

    // Lighting
    this.pointLight1 = null;
    this.pointLight2 = null;
    this.ambientLight = null;

    // Raycasting & Interaction
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);
    this.targetMouse = new THREE.Vector2(0, 0);
    this.hoveredObject = null;
    this.onProjectClick = null;

    // Camera Navigation Anchors (3D Coordinates for each section)
    this.sectionPositions = {
      hero: { pos: { x: 0, y: 0, z: 8 }, lookAt: { x: 0, y: 0, z: 0 } },
      about: { pos: { x: -4, y: 1.5, z: 5 }, lookAt: { x: 0, y: 0, z: 0 } },
      projects: { pos: { x: 4, y: -1.5, z: 6 }, lookAt: { x: 1, y: 0, z: 0 } },
      skills: { pos: { x: 0, y: -3, z: 5 }, lookAt: { x: 0, y: -1, z: 0 } },
      timeline: { pos: { x: -3, y: -2, z: 7 }, lookAt: { x: 0, y: 0, z: 0 } },
      contact: { pos: { x: 0, y: 2, z: 7 }, lookAt: { x: 0, y: 0, z: 0 } }
    };

    this.currentSection = 'hero';
    this.isOrbiting = false;

    this.init();
  }

  init() {
    // 1. Scene Setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x080b14, 0.04);

    // 2. Camera Setup
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 8);

    // 3. Renderer Setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;

    // 4. Build Scene Components
    this.createLights();
    this.createCyberCore();
    this.createParticleField();
    this.createProjectNodes();

    // 5. Event Listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('click', this.onClick.bind(this));

    // 6. Animation Loop
    this.animate(0);
  }

  createLights() {
    this.ambientLight = new THREE.AmbientLight(0x1a0933, 1.5);
    this.scene.add(this.ambientLight);

    this.pointLight1 = new THREE.PointLight(0x00f3ff, 5, 20);
    this.pointLight1.position.set(5, 5, 5);
    this.scene.add(this.pointLight1);

    this.pointLight2 = new THREE.PointLight(0xff007f, 4, 20);
    this.pointLight2.position.set(-5, -5, -2);
    this.scene.add(this.pointLight2);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(0, 10, 10);
    this.scene.add(dirLight);
  }

  createCyberCore() {
    this.cyberCoreGroup = new THREE.Group();

    // Outer Torus Knot
    const knotGeo = new THREE.TorusKnotGeometry(1.4, 0.35, 128, 32);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f3ff,
      metalness: 0.8,
      roughness: 0.2,
      transmission: 0.6,
      thickness: 0.5,
      wireframe: false,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    this.outerTorusKnot = new THREE.Mesh(knotGeo, knotMat);
    this.cyberCoreGroup.add(this.outerTorusKnot);

    // Inner Glowing Crystal (Icosahedron)
    const crystalGeo = new THREE.IcosahedronGeometry(0.8, 1);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0xff007f,
      emissive: 0xff007f,
      emissiveIntensity: 0.8,
      wireframe: true,
      roughness: 0.1
    });
    this.innerCrystal = new THREE.Mesh(crystalGeo, crystalMat);
    this.cyberCoreGroup.add(this.innerCrystal);

    // Concentric Cyber Rings
    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.TorusGeometry(2.2 + i * 0.4, 0.02, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: i === 0 ? 0x00f3ff : i === 1 ? 0x8a2be2 : 0xff007f,
        transparent: true,
        opacity: 0.7
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / (2 + i);
      ring.rotation.y = Math.PI / (4 + i);
      this.cyberRings.push(ring);
      this.cyberCoreGroup.add(ring);
    }

    this.scene.add(this.cyberCoreGroup);
  }

  createParticleField() {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 35;
      scales[i] = Math.random() * 0.8 + 0.2;
    }

    this.particlesGeometry = new THREE.BufferGeometry();
    this.particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00f3ff,
      size: 0.08,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    this.particlesPoints = new THREE.Points(this.particlesGeometry, particlesMaterial);
    this.scene.add(this.particlesPoints);
  }

  createProjectNodes() {
    this.projectNodesGroup = new THREE.Group();
    const projects = PORTFOLIO_DATA.projects;

    projects.forEach((proj, idx) => {
      // Create a 3D interactive floating orb for each project
      const radius = 0.5;
      const geo = new THREE.DodecahedronGeometry(radius, 1);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(proj.color || 0x00f3ff),
        emissive: new THREE.Color(proj.color || 0x00f3ff),
        emissiveIntensity: 0.4,
        roughness: 0.3,
        metalness: 0.7
      });
      const mesh = new THREE.Mesh(geo, mat);

      // Position in orbit around center
      const angle = (idx / projects.length) * Math.PI * 2;
      const distance = 4.5;
      mesh.position.set(
        Math.cos(angle) * distance,
        (idx % 2 === 0 ? 1 : -1) * 1.2,
        Math.sin(angle) * distance
      );

      mesh.userData = { projectData: proj, originalScale: 1, angle: angle, distance: distance };
      this.projectMeshes.push(mesh);
      this.projectNodesGroup.add(mesh);
    });

    this.scene.add(this.projectNodesGroup);
  }

  onMouseMove(e) {
    this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  onClick(e) {
    if (this.hoveredObject && this.hoveredObject.userData.projectData) {
      if (typeof this.onProjectClick === 'function') {
        this.onProjectClick(this.hoveredObject.userData.projectData);
      }
    }
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  navigateToSection(sectionId) {
    if (!this.sectionPositions[sectionId]) return;
    this.currentSection = sectionId;
    const target = this.sectionPositions[sectionId];

    gsap.to(this.camera.position, {
      x: target.pos.x,
      y: target.pos.y,
      z: target.pos.z,
      duration: 1.8,
      ease: 'power3.inOut'
    });
  }

  applyTheme(theme) {
    if (!theme) return;
    const primaryHex = new THREE.Color(theme.primary);
    const secondaryHex = new THREE.Color(theme.secondary);

    gsap.to(this.pointLight1.color, { r: primaryHex.r, g: primaryHex.g, b: primaryHex.b, duration: 1 });
    gsap.to(this.pointLight2.color, { r: secondaryHex.r, g: secondaryHex.g, b: secondaryHex.b, duration: 1 });
    gsap.to(this.outerTorusKnot.material.color, { r: primaryHex.r, g: primaryHex.g, b: primaryHex.b, duration: 1 });
    gsap.to(this.particlesPoints.material.color, { r: primaryHex.r, g: primaryHex.g, b: primaryHex.b, duration: 1 });

    this.scene.fog.color.set(theme.background);
  }

  animate(time) {
    requestAnimationFrame(this.animate.bind(this));

    const t = time * 0.001;

    // Smooth mouse damping for parallax
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

    // 1. Rotate Cyber Core
    if (this.cyberCoreGroup) {
      this.outerTorusKnot.rotation.x = t * 0.3;
      this.outerTorusKnot.rotation.y = t * 0.4;

      this.innerCrystal.rotation.x = -t * 0.5;
      this.innerCrystal.rotation.z = t * 0.3;

      this.cyberRings.forEach((ring, idx) => {
        ring.rotation.z = t * (0.2 + idx * 0.1);
      });
    }

    // 2. Rotate Project Orbs
    this.projectMeshes.forEach((mesh, idx) => {
      const data = mesh.userData;
      data.angle += 0.002;
      mesh.position.x = Math.cos(data.angle) * data.distance;
      mesh.position.z = Math.sin(data.angle) * data.distance;
      mesh.rotation.y += 0.01;
      mesh.rotation.x += 0.005;
    });

    // 3. Subtle Particle Float
    if (this.particlesPoints) {
      this.particlesPoints.rotation.y = t * 0.02;
    }

    // 4. Parallax Camera Offset
    const targetAnchor = this.sectionPositions[this.currentSection] || this.sectionPositions.hero;
    this.camera.position.x += (targetAnchor.pos.x + this.mouse.x * 0.8 - this.camera.position.x) * 0.05;
    this.camera.position.y += (targetAnchor.pos.y + this.mouse.y * 0.8 - this.camera.position.y) * 0.05;
    this.camera.lookAt(targetAnchor.lookAt.x, targetAnchor.lookAt.y, targetAnchor.lookAt.z);

    // 5. Raycasting
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.projectMeshes);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      if (this.hoveredObject !== hit) {
        if (this.hoveredObject) {
          gsap.to(this.hoveredObject.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
        }
        this.hoveredObject = hit;
        document.body.style.cursor = 'pointer';
        gsap.to(hit.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 0.3 });
      }
    } else {
      if (this.hoveredObject) {
        gsap.to(this.hoveredObject.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
        this.hoveredObject = null;
        document.body.style.cursor = 'default';
      }
    }

    this.renderer.render(this.scene, this.camera);
  }
}

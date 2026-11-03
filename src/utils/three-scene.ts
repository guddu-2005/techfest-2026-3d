import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export interface RaycastHit {
  type: 'event_node';
  id: string;
}

export class ThreeSceneManager {
  private container: HTMLDivElement;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private isSoftwareGl: boolean = false;

  // Scene Objects
  private heroGroup!: THREE.Group;
  private outerIcosahedron!: THREE.Mesh;
  private innerQuantumCore!: THREE.Mesh;
  private ring1!: THREE.Mesh;
  private ring2!: THREE.Mesh;
  private particles!: THREE.Points;
  private particlePositions!: Float32Array;
  private eventNodesGroup!: THREE.Group;
  private nodeMeshes: THREE.Mesh[] = [];

  // Interaction & Camera Interpolation
  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private mouse: THREE.Vector2 = new THREE.Vector2(-999, -999);
  private targetMouse: THREE.Vector2 = new THREE.Vector2(0, 0);
  private scrollProgress: number = 0;
  private targetScrollProgress: number = 0;
  private clock: THREE.Clock = new THREE.Clock();

  private frameId: number = 0;
  private isDestroyed: boolean = false;
  private onNodeClickCallback?: (eventId: string) => void;
  private onNodeHoverCallback?: (eventId: string | null) => void;
  private hoveredNodeId: string | null = null;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.initSoftwareGlCheck();
    this.initThree();
    this.createEnvironment();
    this.createHeroObjects();
    this.createParticles();
    this.createEventNodes();
    this.setupEvents();
    this.animate();
  }

  private initSoftwareGlCheck() {
    try {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) {
        this.isSoftwareGl = true;
        return;
      }
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      this.isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      this.isSoftwareGl = true;
    }
  }

  private initThree() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(this.isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    // Dom element
    this.container.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';

    // Scene & Camera
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x05060f, 0.025);

    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 10);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    // Key Warm Light
    const keyLight = new THREE.DirectionalLight(0x00f0ff, 2.5);
    keyLight.position.set(5, 8, 5);
    this.scene.add(keyLight);

    // Fill Cool Light
    const fillLight = new THREE.DirectionalLight(0x8a2be2, 2.0);
    fillLight.position.set(-5, -4, -3);
    this.scene.add(fillLight);

    // Accent Pink Backlight
    const backLight = new THREE.PointLight(0xff2e97, 3, 20);
    backLight.position.set(0, 2, -5);
    this.scene.add(backLight);
  }

  private createEnvironment() {
    try {
      const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
      this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // Fallback environment if PMREM fails
    }
  }

  private createHeroObjects() {
    this.heroGroup = new THREE.Group();
    this.heroGroup.position.set(0, 0, 0);

    // 1. Outer Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const icoMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      wireframe: true,
      emissive: 0x004466,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    this.outerIcosahedron = new THREE.Mesh(icoGeo, icoMat);
    this.heroGroup.add(this.outerIcosahedron);

    // 2. Inner Glowing Quantum Core
    const coreGeo = new THREE.OctahedronGeometry(1.2, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xff2e97,
      emissive: 0xff1080,
      emissiveIntensity: 1.5,
      roughness: 0.15,
      metalness: 0.85
    });
    this.innerQuantumCore = new THREE.Mesh(coreGeo, coreMat);
    this.heroGroup.add(this.innerQuantumCore);

    // 3. Orbital Ring 1 (Cyan)
    const ringGeo1 = new THREE.TorusGeometry(3.2, 0.04, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00b4d8,
      emissiveIntensity: 1.2,
      metalness: 0.9,
      roughness: 0.1
    });
    this.ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    this.ring1.rotation.x = Math.PI / 3;
    this.heroGroup.add(this.ring1);

    // 4. Orbital Ring 2 (Violet)
    const ringGeo2 = new THREE.TorusGeometry(4.0, 0.03, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x8a2be2,
      emissive: 0x6a0dad,
      emissiveIntensity: 1.2,
      metalness: 0.95,
      roughness: 0.1
    });
    this.ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    this.ring2.rotation.y = Math.PI / 4;
    this.heroGroup.add(this.ring2);

    // 5. Tech Chip Element inside hero
    const chipGeo = new THREE.BoxGeometry(0.8, 0.8, 0.15);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.95,
      roughness: 0.2
    });
    const chip = new THREE.Mesh(chipGeo, chipMat);
    chip.position.set(0, 0, 0);
    this.heroGroup.add(chip);

    this.scene.add(this.heroGroup);
  }

  private createParticles() {
    const particleCount = this.isSoftwareGl ? 800 : 2500;
    const geometry = new THREE.BufferGeometry();
    this.particlePositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f0ff);
    const violetColor = new THREE.Color(0x8a2be2);
    const pinkColor = new THREE.Color(0xff2e97);

    for (let i = 0; i < particleCount; i++) {
      const radius = 6 + Math.random() * 24;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      this.particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      this.particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      this.particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      // Color variation
      const randColor = Math.random();
      const col = randColor < 0.5 ? cyanColor : randColor < 0.8 ? violetColor : pinkColor;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(this.particlePositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture canvas
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.4, 'rgba(0, 240, 255, 0.6)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private createEventNodes() {
    this.eventNodesGroup = new THREE.Group();
    const eventIds = ['hack-matrix', 'robo-wars', 'ai-genesis', 'cyber-clash', 'drone-prix', 'ui-future'];
    const colors = [0x00f0ff, 0xff2e97, 0x8a2be2, 0x00f0ff, 0xff2e97, 0x8a2be2];

    const nodeGeo = new THREE.SphereGeometry(0.35, 16, 16);

    eventIds.forEach((id, index) => {
      const angle = (index / eventIds.length) * Math.PI * 2;
      const radius = 5.2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * 1.5 + (index % 2 === 0 ? 0.8 : -0.8);
      const z = Math.sin(angle) * radius - 15; // Placed at Section 3 depth

      const mat = new THREE.MeshStandardMaterial({
        color: colors[index],
        emissive: colors[index],
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8
      });

      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.set(x, y, z);
      mesh.userData = { eventId: id, originalY: y, angle, baseColor: colors[index] };

      // Outer ring for node
      const ringGeo = new THREE.TorusGeometry(0.5, 0.02, 8, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: colors[index], transparent: true, opacity: 0.6 });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      mesh.add(ringMesh);

      this.nodeMeshes.push(mesh);
      this.eventNodesGroup.add(mesh);
    });

    this.scene.add(this.eventNodesGroup);
  }

  private setupEvents() {
    const handleMouseMove = (e: MouseEvent) => {
      this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        this.targetMouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        this.targetMouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };

    const handleClick = () => {
      if (this.hoveredNodeId && this.onNodeClickCallback) {
        this.onNodeClickCallback(this.hoveredNodeId);
      }
    };

    const handleResize = () => {
      if (!this.container) return;
      const width = this.container.clientWidth || window.innerWidth;
      const height = this.container.clientHeight || window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);
  }

  public setScrollProgress(progress: number) {
    this.targetScrollProgress = Math.max(0, Math.min(1, progress));
  }

  public setCallbacks(
    onNodeClick?: (eventId: string) => void,
    onNodeHover?: (eventId: string | null) => void
  ) {
    this.onNodeClickCallback = onNodeClick;
    this.onNodeHoverCallback = onNodeHover;
  }

  private updateCameraPosition(delta: number) {
    // Smooth damp scroll progress
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * Math.min(1, delta * 4);
    const p = this.scrollProgress;

    // Define 5 key Camera Waypoints based on scroll progress p in [0, 1]
    // 0.0 - 0.20: Section 1 Hero (Front view, z=10, y=0)
    // 0.20 - 0.40: Section 2 About (Flying closer to core, z=4, y=0.5, rotation)
    // 0.40 - 0.60: Section 3 Events (Pull back & view floating 3D nodes, z=-10, y=1)
    // 0.60 - 0.80: Section 4 Timeline (Fly along curved path z=-25, x=4, y=-1)
    // 0.80 - 1.00: Section 5 & 6 Stats / Register (Final core resolution z=-40, camera center)

    let targetCamX = 0;
    let targetCamY = 0;
    let targetCamZ = 10;
    let targetRotX = 0;
    let targetRotY = 0;

    if (p <= 0.20) {
      // Hero segment
      const t = p / 0.20;
      targetCamX = this.mouse.x * 0.8;
      targetCamY = this.mouse.y * 0.8;
      targetCamZ = 10 - t * 2;
    } else if (p <= 0.40) {
      // About segment
      const t = (p - 0.20) / 0.20;
      targetCamX = Math.sin(t * Math.PI) * 2 + this.mouse.x * 0.5;
      targetCamY = t * 1.5 + this.mouse.y * 0.5;
      targetCamZ = 8 - t * 6;
      targetRotY = t * 0.3;
    } else if (p <= 0.60) {
      // Events segment
      const t = (p - 0.40) / 0.20;
      targetCamX = Math.cos(t * Math.PI) * 3 + this.mouse.x * 0.6;
      targetCamY = -t * 1.0 + this.mouse.y * 0.6;
      targetCamZ = 2 - t * 15;
      targetRotY = -t * 0.4;
    } else if (p <= 0.80) {
      // Timeline segment
      const t = (p - 0.60) / 0.20;
      targetCamX = 4 * Math.sin(t * Math.PI * 2) + this.mouse.x * 0.5;
      targetCamY = Math.cos(t * Math.PI) * 2 + this.mouse.y * 0.5;
      targetCamZ = -13 - t * 15;
      targetRotX = Math.sin(t * Math.PI) * 0.2;
    } else {
      // Register & Footer segment
      const t = (p - 0.80) / 0.20;
      targetCamX = this.mouse.x * 0.4;
      targetCamY = this.mouse.y * 0.4;
      targetCamZ = -28 - t * 10;
    }

    // Damp camera pos
    this.camera.position.x += (targetCamX - this.camera.position.x) * Math.min(1, delta * 5);
    this.camera.position.y += (targetCamY - this.camera.position.y) * Math.min(1, delta * 5);
    this.camera.position.z += (targetCamZ - this.camera.position.z) * Math.min(1, delta * 5);

    this.camera.rotation.x += (targetRotX - this.camera.rotation.x) * Math.min(1, delta * 5);
    this.camera.rotation.y += (targetRotY - this.camera.rotation.y) * Math.min(1, delta * 5);
  }

  private animate = () => {
    if (this.isDestroyed) return;

    const delta = Math.min(this.clock.getDelta(), 0.1);
    const elapsedTime = this.clock.getElapsedTime();

    // Mouse damp
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * Math.min(1, delta * 8);
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * Math.min(1, delta * 8);

    // 1. Rotate Hero Object
    if (this.heroGroup) {
      this.outerIcosahedron.rotation.x = elapsedTime * 0.3;
      this.outerIcosahedron.rotation.y = elapsedTime * 0.4;

      this.innerQuantumCore.rotation.x = -elapsedTime * 0.6;
      this.innerQuantumCore.rotation.z = elapsedTime * 0.5;

      this.ring1.rotation.z = elapsedTime * 0.25;
      this.ring2.rotation.z = -elapsedTime * 0.35;

      // Color shift based on scroll progress
      const hue = (elapsedTime * 0.05 + this.scrollProgress * 0.5) % 1.0;
      const color = new THREE.Color().setHSL(hue, 0.9, 0.5);
      (this.outerIcosahedron.material as THREE.MeshPhysicalMaterial).color.lerp(color, 0.02);
    }

    // 2. Rotate Particles
    if (this.particles) {
      this.particles.rotation.y = elapsedTime * 0.04;
      this.particles.rotation.x = elapsedTime * 0.02;
    }

    // 3. Animate Event Nodes & Raycasting
    if (this.nodeMeshes.length > 0) {
      this.nodeMeshes.forEach((mesh) => {
        const data = mesh.userData;
        mesh.position.y = data.originalY + Math.sin(elapsedTime * 2 + data.angle) * 0.2;
        mesh.rotation.y = elapsedTime * 0.8;
      });

      // Raycast test for hovering nodes
      this.raycaster.setFromCamera(this.targetMouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.nodeMeshes);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const eventId = hitMesh.userData.eventId;
        if (this.hoveredNodeId !== eventId) {
          this.hoveredNodeId = eventId;
          if (this.onNodeHoverCallback) this.onNodeHoverCallback(eventId);
          hitMesh.scale.set(1.4, 1.4, 1.4);
        }
      } else {
        if (this.hoveredNodeId !== null) {
          this.nodeMeshes.forEach((m) => m.scale.set(1.0, 1.0, 1.0));
          this.hoveredNodeId = null;
          if (this.onNodeHoverCallback) this.onNodeHoverCallback(null);
        }
      }
    }

    // 4. Update Camera trajectory
    this.updateCameraPosition(delta);

    // Render
    this.renderer.render(this.scene, this.camera);

    if (this.isSoftwareGl) {
      this.frameId = window.setTimeout(() => {
        requestAnimationFrame(this.animate);
      }, 40);
    } else {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  public highlightNode(eventId: string | null) {
    this.nodeMeshes.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mesh.userData.eventId === eventId) {
        mesh.scale.set(1.5, 1.5, 1.5);
        mat.emissiveIntensity = 2.5;
      } else {
        mesh.scale.set(1.0, 1.0, 1.0);
        mat.emissiveIntensity = 0.8;
      }
    });
  }

  public destroy() {
    this.isDestroyed = true;
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      clearTimeout(this.frameId);
    }

    window.removeEventListener('resize', () => {});
    window.removeEventListener('mousemove', () => {});

    // Dispose ThreeJS resources
    if (this.heroGroup) {
      this.heroGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    }

    if (this.particles) {
      this.particles.geometry.dispose();
      (this.particles.material as THREE.Material).dispose();
    }

    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }
  }
}

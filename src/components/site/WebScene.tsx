import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * WebScene: 3D Animated Background
 * - Night city skyline with procedural lit windows and dark navy exponential fog.
 * - 4 large sagging spider webs at staggered depths with additive-blended line segments.
 * - 5 swinging web-lines with alternating red/blue glowing orbs on pendulum motion.
 * - Original low-poly 3D spider with bobbing thread and subtle leg wiggles.
 * - Floating dust particles and pulsing red/blue night lights.
 * - Mouse parallax + scroll-driven camera fly-through.
 * - SSR-safe, pointer-events: none, z-index: 0, responsive & performance-capped.
 */
export default function WebScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);

    // ----------------------------------------------------
    // SCENE, CAMERA, RENDERER
    // ----------------------------------------------------
    const scene = new THREE.Scene();
    const fogColor = 0x060814;
    scene.background = new THREE.Color(fogColor);
    scene.fog = new THREE.FogExp2(fogColor, 0.016);

    const camera = new THREE.PerspectiveCamera(58, width / height, 0.1, 400);
    camera.position.set(0, 2, 28);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.setClearColor(fogColor, 1);
    container.appendChild(renderer.domElement);

    // ----------------------------------------------------
    // LIGHTS
    // ----------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0x0e172e, 1.4);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0x2f6bff, 1.6);
    moonLight.position.set(20, 40, 25);
    scene.add(moonLight);

    const redPulseLight = new THREE.PointLight(0xe62429, 3.8, 55);
    redPulseLight.position.set(-10, 8, 8);
    scene.add(redPulseLight);

    const bluePulseLight = new THREE.PointLight(0x2f6bff, 4.2, 60);
    bluePulseLight.position.set(12, 6, 4);
    scene.add(bluePulseLight);

    // ----------------------------------------------------
    // PROCEDURAL WINDOW TEXTURE FOR BUILDINGS
    // ----------------------------------------------------
    const texCanvas = document.createElement("canvas");
    texCanvas.width = 256;
    texCanvas.height = 512;
    const tCtx = texCanvas.getContext("2d");
    if (tCtx) {
      tCtx.fillStyle = "#080c1a";
      tCtx.fillRect(0, 0, 256, 512);

      const cols = 16;
      const rows = 32;
      const wWidth = 10;
      const wHeight = 8;
      const xGap = 16;
      const yGap = 16;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const rand = Math.sin(r * 43.1 + c * 17.7);
          const randVal = (rand - Math.floor(rand));
          if (randVal > 0.6) {
            // Warm yellow / gold window
            tCtx.fillStyle = randVal > 0.88 ? "#fff3c4" : "#ffcc55";
            tCtx.fillRect(c * xGap + 3, r * yGap + 4, wWidth, wHeight);
          } else if (randVal > 0.48) {
            // Electric blue window
            tCtx.fillStyle = "#5ba4ff";
            tCtx.fillRect(c * xGap + 3, r * yGap + 4, wWidth, wHeight);
          } else if (randVal > 0.42) {
            // Neon red window
            tCtx.fillStyle = "#ff4455";
            tCtx.fillRect(c * xGap + 3, r * yGap + 4, wWidth, wHeight);
          } else {
            // Dark window
            tCtx.fillStyle = "#0c1228";
            tCtx.fillRect(c * xGap + 3, r * yGap + 4, wWidth, wHeight);
          }
        }
      }
    }
    const windowTexture = new THREE.CanvasTexture(texCanvas);
    windowTexture.wrapS = THREE.RepeatWrapping;
    windowTexture.wrapT = THREE.RepeatWrapping;

    const buildingMaterial = new THREE.MeshStandardMaterial({
      color: 0x141a2e,
      roughness: 0.6,
      metalness: 0.2,
      map: windowTexture,
      emissiveMap: windowTexture,
      emissive: new THREE.Color(0x283254),
      emissiveIntensity: 0.85,
    });

    const buildingDarkMaterial = new THREE.MeshStandardMaterial({
      color: 0x090e1c,
      roughness: 0.8,
      metalness: 0.1,
    });

    // ----------------------------------------------------
    // BUILDINGS (NIGHT CITY SKYLINE)
    // ----------------------------------------------------
    const buildingCount = isMobile ? 30 : 68;
    const buildingsGroup = new THREE.Group();

    const beaconGeo = new THREE.SphereGeometry(0.2, 8, 8);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff2233 });

    for (let i = 0; i < buildingCount; i++) {
      const isLeft = i % 2 === 0;
      const bWidth = 3 + (Math.sin(i * 3.7) + 1) * 2;
      const bDepth = 3 + (Math.cos(i * 2.3) + 1) * 2;
      const bHeight = 16 + (Math.sin(i * 5.1) + 1) * 16;

      const geo = new THREE.BoxGeometry(bWidth, bHeight, bDepth);
      const bMesh = new THREE.Mesh(geo, i % 5 === 0 ? buildingDarkMaterial : buildingMaterial);

      const xDist = 9 + (Math.sin(i * 1.9) + 1) * 16;
      const x = isLeft ? -xDist : xDist;
      const z = -6 - (i / buildingCount) * 120;
      const y = -14 + bHeight / 2;

      bMesh.position.set(x, y, z);
      buildingsGroup.add(bMesh);

      // Red rooftop antenna beacon on every 4th building
      if (i % 4 === 0) {
        const beacon = new THREE.Mesh(beaconGeo, beaconMat);
        beacon.position.set(x, y + bHeight / 2 + 0.3, z);
        buildingsGroup.add(beacon);
      }
    }
    scene.add(buildingsGroup);

    // ----------------------------------------------------
    // SPIDER WEBS (SAGGING CONCENTRIC LINE SEGMENTS)
    // ----------------------------------------------------
    function createSaggingWeb(
      radius: number,
      spokeCount: number,
      ringCount: number,
      color: number,
      opacity: number,
    ) {
      const points: number[] = [];
      const spokes: { x: number; y: number }[] = [];

      // Spoke directions
      for (let s = 0; s < spokeCount; s++) {
        const angle = (s / spokeCount) * Math.PI * 2 + Math.sin(s * 1.7) * 0.08;
        const sx = Math.cos(angle) * radius;
        const sy = Math.sin(angle) * radius;
        spokes.push({ x: sx, y: sy });

        // Center to outer spoke line
        points.push(0, 0, 0, sx, sy, 0);
      }

      // Sagging concentric spiral rings
      for (let r = 1; r <= ringCount; r++) {
        const ringFraction = Math.pow(r / ringCount, 0.85);
        for (let s = 0; s < spokeCount; s++) {
          const nextS = (s + 1) % spokeCount;
          const p1 = spokes[s];
          const p2 = spokes[nextS];
          if (!p1 || !p2) continue;

          const p1x = p1.x * ringFraction;
          const p1y = p1.y * ringFraction;
          const p2x = p2.x * ringFraction;
          const p2y = p2.y * ringFraction;

          // Quadratic sagging curve towards center with slight gravity
          const midX = (p1x + p2x) * 0.5 * 0.84;
          const midY = (p1y + p2y) * 0.5 * 0.84 - radius * 0.03 * ringFraction;

          // 3 sub-segments for smooth sagging
          let prevX = p1x;
          let prevY = p1y;
          for (let step = 1; step <= 3; step++) {
            const t = step / 3;
            const curX = (1 - t) * (1 - t) * p1x + 2 * (1 - t) * t * midX + t * t * p2x;
            const curY = (1 - t) * (1 - t) * p1y + 2 * (1 - t) * t * midY + t * t * p2y;

            points.push(prevX, prevY, 0, curX, curY, 0);
            prevX = curX;
            prevY = curY;
          }
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
      });

      return new THREE.LineSegments(geo, mat);
    }

    const websGroup = new THREE.Group();
    const webConfigs: {
      radius: number;
      spokes: number;
      rings: number;
      color: number;
      opacity: number;
      pos: [number, number, number];
      rotZ: number;
    }[] = [
      { radius: 11, spokes: 14, rings: 7, color: 0xc4dcff, opacity: 0.45, pos: [-13, 6, 12], rotZ: 0.2 },
      { radius: 15, spokes: 16, rings: 8, color: 0x75aeff, opacity: 0.38, pos: [15, 9, -5], rotZ: -0.3 },
      { radius: 18, spokes: 16, rings: 9, color: 0xff9aa6, opacity: 0.35, pos: [-16, 12, -26], rotZ: 0.4 },
      { radius: 24, spokes: 18, rings: 10, color: 0xd6e5ff, opacity: 0.32, pos: [12, 14, -50], rotZ: -0.15 },
    ];

    const activeWebConfigs = isMobile ? webConfigs.slice(0, 2) : webConfigs;
    const webs: { mesh: THREE.LineSegments; baseRotZ: number; speed: number }[] = [];

    activeWebConfigs.forEach((cfg, idx) => {
      const web = createSaggingWeb(cfg.radius, cfg.spokes, cfg.rings, cfg.color, cfg.opacity);
      web.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      web.rotation.z = cfg.rotZ;
      websGroup.add(web);
      webs.push({ mesh: web, baseRotZ: cfg.rotZ, speed: 0.05 + idx * 0.02 });
    });
    scene.add(websGroup);

    // ----------------------------------------------------
    // SWINGING WEB-LINES WITH GLOWING ORBS (PENDULUM MOTION)
    // ----------------------------------------------------
    const pendulumData = [
      { anchor: new THREE.Vector3(-10, 18, 4), len: 13, speed: 1.35, phase: 0.0, color: 0xe62429 },
      { anchor: new THREE.Vector3(12, 20, -2), len: 15, speed: 1.15, phase: 1.6, color: 0x2f6bff },
      { anchor: new THREE.Vector3(-5, 21, -16), len: 17, speed: 1.05, phase: 3.1, color: 0xe62429 },
      { anchor: new THREE.Vector3(7, 22, -30), len: 18, speed: 0.95, phase: 4.4, color: 0x2f6bff },
      { anchor: new THREE.Vector3(-15, 24, -42), len: 21, speed: 0.85, phase: 2.2, color: 0xe62429 },
    ];

    const activePendulums = isMobile ? pendulumData.slice(0, 3) : pendulumData;
    const pendulums: {
      line: THREE.Line;
      orb: THREE.Mesh;
      anchor: THREE.Vector3;
      len: number;
      speed: number;
      phase: number;
    }[] = [];

    const orbGeo = new THREE.SphereGeometry(0.32, 16, 16);
    const pendulumMat = new THREE.LineBasicMaterial({
      color: 0x90b8ff,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    activePendulums.forEach((p) => {
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        p.anchor,
        new THREE.Vector3(p.anchor.x, p.anchor.y - p.len, p.anchor.z),
      ]);
      const line = new THREE.Line(lineGeo, pendulumMat);
      scene.add(line);

      const orbMat = new THREE.MeshBasicMaterial({ color: p.color });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      orb.position.set(p.anchor.x, p.anchor.y - p.len, p.anchor.z);
      scene.add(orb);

      pendulums.push({ line, orb, anchor: p.anchor, len: p.len, speed: p.speed, phase: p.phase });
    });

    // ----------------------------------------------------
    // ORIGINAL LOW-POLY 3D SPIDER (BOBBING THREAD & WIGGLING LEGS)
    // ----------------------------------------------------
    const spiderGroup = new THREE.Group();
    const spiderBaseX = 8.2;
    const spiderBaseZ = 13;
    const spiderBaseY = 3.2;
    spiderGroup.position.set(spiderBaseX, spiderBaseY, spiderBaseZ);

    // Spider body material (metallic dark charcoal)
    const spiderBodyMat = new THREE.MeshStandardMaterial({
      color: 0x141824,
      roughness: 0.45,
      metalness: 0.6,
    });

    // Cephalothorax (head/chest)
    const cephGeo = new THREE.SphereGeometry(0.4, 16, 16);
    cephGeo.scale(1, 0.7, 1.15);
    const ceph = new THREE.Mesh(cephGeo, spiderBodyMat);
    spiderGroup.add(ceph);

    // Abdomen (larger, tilted behind head)
    const abdomenGeo = new THREE.SphereGeometry(0.64, 16, 16);
    abdomenGeo.scale(1.05, 0.85, 1.45);
    const abdomen = new THREE.Mesh(abdomenGeo, spiderBodyMat);
    abdomen.position.set(0, 0.15, -0.78);
    spiderGroup.add(abdomen);

    // Original generic red hourglass/diamond marking on abdomen
    const markGeo = new THREE.SphereGeometry(0.18, 12, 12);
    markGeo.scale(0.8, 0.15, 1.2);
    const markMat = new THREE.MeshBasicMaterial({ color: 0xe62429 });
    const mark = new THREE.Mesh(markGeo, markMat);
    mark.position.set(0, 0.72, -0.76);
    spiderGroup.add(mark);

    // Glowing eyes (pairs of small red beads on front)
    const eyeGeo = new THREE.SphereGeometry(0.045, 8, 8);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff2030 });
    const eyeOffsets: [number, number, number][] = [
      [-0.12, 0.08, 0.42],
      [0.12, 0.08, 0.42],
      [-0.22, 0.04, 0.38],
      [0.22, 0.04, 0.38],
      [-0.1, 0.16, 0.38],
      [0.1, 0.16, 0.38],
    ];
    eyeOffsets.forEach(([ex, ey, ez]) => {
      const eye = new THREE.Mesh(eyeGeo, eyeMat);
      eye.position.set(ex, ey, ez);
      spiderGroup.add(eye);
    });

    // 8 Legs (4 on each side, 2 segments each)
    const legJoints: THREE.Group[] = [];
    const legFemurGeo = new THREE.CylinderGeometry(0.035, 0.03, 0.7, 8);
    legFemurGeo.translate(0, 0.35, 0);
    const legTibiaGeo = new THREE.CylinderGeometry(0.03, 0.02, 0.9, 8);
    legTibiaGeo.translate(0, 0.45, 0);

    for (let side = -1; side <= 1; side += 2) {
      for (let l = 0; l < 4; l++) {
        const legPivot = new THREE.Group();
        // Position along the body
        const zOffset = 0.2 - l * 0.22;
        legPivot.position.set(side * 0.34, 0, zOffset);

        // Segment 1 (Femur): points outward & up
        const femur = new THREE.Mesh(legFemurGeo, spiderBodyMat);
        const fAngleZ = side * (0.6 + l * 0.05);
        const fAngleY = (l - 1.5) * 0.3 * side;
        femur.rotation.z = fAngleZ;
        femur.rotation.y = fAngleY;
        legPivot.add(femur);

        // Segment 2 (Tibia): attached at tip of femur, points down
        const tibiaPivot = new THREE.Group();
        tibiaPivot.position.set(
          -Math.sin(fAngleZ) * 0.7,
          Math.cos(fAngleZ) * 0.7,
          -Math.sin(fAngleY) * 0.2,
        );
        const tibia = new THREE.Mesh(legTibiaGeo, spiderBodyMat);
        tibia.rotation.z = fAngleZ - side * 1.5;
        tibiaPivot.add(tibia);
        legPivot.add(tibiaPivot);

        spiderGroup.add(legPivot);
        legJoints.push(legPivot);
      }
    }
    scene.add(spiderGroup);

    // Hanging thread line from ceiling (y=16) down to spider
    const threadGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(spiderBaseX, 16, spiderBaseZ),
      new THREE.Vector3(spiderBaseX, spiderBaseY, spiderBaseZ),
    ]);
    const threadMat = new THREE.LineBasicMaterial({
      color: 0xc2d8ff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const spiderThread = new THREE.Line(threadGeo, threadMat);
    scene.add(spiderThread);

    // ----------------------------------------------------
    // FLOATING DUST PARTICLES
    // ----------------------------------------------------
    const particleCount = isMobile ? 300 : 900;
    const partPoints = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount; p++) {
      partPoints[p * 3] = (Math.random() - 0.5) * 60;
      partPoints[p * 3 + 1] = (Math.random() - 0.5) * 35;
      partPoints[p * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute("position", new THREE.BufferAttribute(partPoints, 3));
    const partMat = new THREE.PointsMaterial({
      color: 0x90b8ff,
      size: 0.12,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const dustParticles = new THREE.Points(partGeo, partMat);
    scene.add(dustParticles);

    // ----------------------------------------------------
    // MOUSE PARALLAX & SCROLL INTERACTION
    // ----------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetCamX = 0;
    let targetCamY = 2;

    const onPointerMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onPointerMove, { passive: true });

    // Handle Resize
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // ----------------------------------------------------
    // ANIMATION LOOP
    // ----------------------------------------------------
    let animId = 0;
    let lastTime = performance.now();
    let isPaused = false;

    const onVisibilityChange = () => {
      isPaused = document.hidden;
      if (!isPaused) {
        lastTime = performance.now();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);
      if (isPaused) return;

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const t = prefersReducedMotion ? now * 0.0001 : now * 0.001;

      // 1. Mouse Parallax target
      targetCamX = mouseX * 2.6;
      targetCamY = 2 + mouseY * 1.5;

      // 2. Scroll Fly-Through Progress
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const maxScroll = Math.max(
        1,
        (document.documentElement.scrollHeight || 1000) - window.innerHeight,
      );
      const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));

      // Camera flies forward and down smoothly with scroll
      const desiredZ = 28 - scrollProgress * 44;
      const desiredY = targetCamY - scrollProgress * 7;
      const desiredX = targetCamX + Math.sin(scrollProgress * Math.PI) * 2;

      camera.position.x += (desiredX - camera.position.x) * 0.06;
      camera.position.y += (desiredY - camera.position.y) * 0.06;
      camera.position.z += (desiredZ - camera.position.z) * 0.06;
      camera.lookAt(0, 1.5 - scrollProgress * 4, -40);

      // 3. Spider Webs gentle rotation and drift
      webs.forEach((w, idx) => {
        w.mesh.rotation.z = w.baseRotZ + Math.sin(t * w.speed + idx) * 0.06;
        w.mesh.position.y += Math.sin(t * 0.8 + idx) * 0.003;
      });

      // 4. Swinging web-lines pendulum motion
      pendulums.forEach((p) => {
        const theta = 0.45 * Math.sin(t * p.speed + p.phase);
        const orbX = p.anchor.x + Math.sin(theta) * p.len;
        const orbY = p.anchor.y - Math.cos(theta) * p.len;
        const orbZ = p.anchor.z + Math.sin(t * 0.5 + p.phase) * 1.2;

        p.orb.position.set(orbX, orbY, orbZ);

        const posAttr = p.line.geometry.getAttribute("position") as THREE.BufferAttribute | undefined;
        if (posAttr) {
          posAttr.setXYZ(0, p.anchor.x, p.anchor.y, p.anchor.z);
          posAttr.setXYZ(1, orbX, orbY, orbZ);
          posAttr.needsUpdate = true;
        }
      });

      // 5. 3D Spider bobbing and leg wiggle
      const spiderY = spiderBaseY + Math.sin(t * 1.8) * 0.7;
      spiderGroup.position.y = spiderY;
      spiderGroup.rotation.y = Math.sin(t * 0.9) * 0.2;

      // Update spider hanging thread
      const threadAttr = spiderThread.geometry.getAttribute("position") as THREE.BufferAttribute | undefined;
      if (threadAttr) {
        threadAttr.setXYZ(1, spiderBaseX, spiderY + 0.5, spiderBaseZ);
        threadAttr.needsUpdate = true;
      }

      // Leg wiggle
      legJoints.forEach((joint, jIdx) => {
        joint.rotation.z = Math.sin(t * 3.2 + jIdx * 0.8) * 0.12;
      });

      // 6. Floating dust upward drift
      const dustAttr = dustParticles.geometry.getAttribute("position") as THREE.BufferAttribute | undefined;
      if (dustAttr) {
        const positions = dustAttr.array as Float32Array;
        for (let p = 0; p < particleCount; p++) {
          const idx = p * 3 + 1;
          const curY = positions[idx];
          if (typeof curY === "number") {
            const nextY = curY + 0.015;
            positions[idx] = nextY > 20 ? -15 : nextY;
          }
        }
        dustAttr.needsUpdate = true;
      }

      // 7. Pulsing Point Lights
      redPulseLight.intensity = 2.8 + Math.sin(t * 2.2) * 1.2;
      bluePulseLight.intensity = 3.2 + Math.cos(t * 1.9) * 1.2;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // ----------------------------------------------------
    // CLEANUP DISPOSAL ON UNMOUNT
    // ----------------------------------------------------
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.Points) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
      windowTexture.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}

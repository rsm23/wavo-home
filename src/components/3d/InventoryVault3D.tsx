"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ShieldCheck } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function InventoryVault3D() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeMode, setActiveMode] = useState<"asset" | "liquidity" | "settlement">("liquidity");
  const modeRef = useRef(activeMode);

  useEffect(() => {
    modeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(6.5, 5.0, 7.5);
    camera.lookAt(0, 0.4, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark ? 1.3 : 1.1;
    container.appendChild(renderer.domElement);

    // Lighting (Warm Wavo Coral & Peach Palette)
    const ambient = new THREE.AmbientLight(0xffffff, isDark ? 1.2 : 2.0);
    scene.add(ambient);

    const coralLight = new THREE.DirectionalLight(0xfa6e69, isDark ? 4.2 : 3.6);
    coralLight.position.set(8, 12, 6);
    scene.add(coralLight);

    const peachLight = new THREE.DirectionalLight(0xffbc7d, isDark ? 3.0 : 2.4);
    peachLight.position.set(-8, 4, -4);
    scene.add(peachLight);

    const warmPoint = new THREE.PointLight(0xfa6e69, 3.5, 15);
    warmPoint.position.set(0, 2, 2);
    scene.add(warmPoint);

    // Subtle Holographic Grid Floor
    const gridHelper = new THREE.GridHelper(
      12,
      24,
      0xfa6e69,
      isDark ? 0x1c2639 : 0xfa6e69
    );
    gridHelper.position.y = -0.6;
    gridHelper.material.opacity = isDark ? 0.25 : 0.18;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Glowing Central Hologram Ring (Wavo Coral)
    const ringGeo = new THREE.RingGeometry(2.4, 2.5, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xfa6e69,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.58;
    scene.add(ring);

    // Second Inner Ring (Wavo Peach)
    const innerRingGeo = new THREE.RingGeometry(1.6, 1.66, 64);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0xffbc7d,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = -Math.PI / 2;
    innerRing.position.y = -0.57;
    scene.add(innerRing);

    // Central 3D Asset Stack
    const assetGroup = new THREE.Group();
    scene.add(assetGroup);

    // Glass & Titanium Modular Blocks
    const cubeGeo = new THREE.BoxGeometry(0.85, 0.85, 0.85);
    const edgesGeo = new THREE.EdgesGeometry(cubeGeo);
    const edgeMatCoral = new THREE.LineBasicMaterial({ color: 0xfa6e69, linewidth: 2 });
    const edgeMatPeach = new THREE.LineBasicMaterial({ color: 0xffbc7d, linewidth: 2 });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x10101b : 0xffffff,
      metalness: isDark ? 0.35 : 0.05,
      roughness: isDark ? 0.05 : 0.08,
      transmission: isDark ? 0.85 : 0.94,
      transparent: true,
      opacity: isDark ? 0.9 : 0.88,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const positions = [
      [-0.52, 0.45, -0.52],
      [ 0.52, 0.45, -0.52],
      [-0.52, 0.45,  0.52],
      [ 0.52, 0.45,  0.52],
      [ 0.0,  1.42,  0.0 ],
    ];

    const cubes: THREE.Mesh[] = [];

    positions.forEach((pos, idx) => {
      const cube = new THREE.Mesh(cubeGeo, glassMat.clone());
      cube.position.set(pos[0], pos[1], pos[2]);

      const wireframe = new THREE.LineSegments(
        edgesGeo,
        idx === 4 ? edgeMatPeach : edgeMatCoral
      );
      cube.add(wireframe);

      // Core energetic nucleus inside each cube
      const coreGeo = new THREE.OctahedronGeometry(0.18, 0);
      const coreMat = new THREE.MeshBasicMaterial({
        color: idx === 4 ? 0xffbc7d : 0xfa6e69,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      cube.add(core);

      assetGroup.add(cube);
      cubes.push(cube);
    });

    // Particle Swarm (Warm coral and gold liquidity flow)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 2.1 + (Math.random() - 0.5) * 0.9;
      const height = (Math.random() - 0.5) * 2.4 + 0.8;

      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = height;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      // Coral #FA6E69 (0.98, 0.43, 0.41) to Peach #FFBC7D (1.0, 0.74, 0.49)
      const ratio = Math.random();
      particleColors[i * 3] = 0.98;
      particleColors[i * 3 + 1] = 0.43 + ratio * 0.31;
      particleColors[i * 3 + 2] = 0.41 + ratio * 0.08;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Parallax
    let targetX = 6.5;
    let targetY = 5.0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 2.2;
      mouseY = y * 1.8;
    };

    container.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    const timer = new THREE.Timer();
    timer.connect(document);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      timer.update();
      const time = timer.getElapsed();
      const currentMode = modeRef.current;

      assetGroup.rotation.y = time * 0.3;

      cubes.forEach((cube, idx) => {
        if (currentMode === "asset") {
          cube.position.y = THREE.MathUtils.lerp(cube.position.y, positions[idx][1], 0.08);
          cube.rotation.y = 0;
        } else if (currentMode === "liquidity") {
          const hover = Math.sin(time * 2.2 + idx * 1.2) * 0.08;
          cube.position.y = THREE.MathUtils.lerp(cube.position.y, positions[idx][1] + hover, 0.08);
          cube.rotation.y = Math.sin(time + idx) * 0.06;
        } else {
          const expand = 1.3;
          cube.position.x = THREE.MathUtils.lerp(cube.position.x, positions[idx][0] * expand, 0.06);
          cube.position.z = THREE.MathUtils.lerp(cube.position.z, positions[idx][2] * expand, 0.06);
          cube.position.y = THREE.MathUtils.lerp(cube.position.y, positions[idx][1] + 0.2 + Math.sin(time * 3 + idx) * 0.1, 0.08);
        }
      });

      ring.rotation.z = time * 0.2;
      innerRing.rotation.z = -time * 0.35;
      particles.rotation.y = -time * 0.5;

      targetX = 6.5 + mouseX;
      targetY = 5.0 - mouseY;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(0, 0.5, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      timer.dispose();
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[400px] flex items-center justify-center select-none">
      
      {/* Wavo Coral Ambient Glow behind 3D object */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[360px] h-[360px] bg-gradient-to-tr from-[#fa6e69]/20 via-[#ffbc7d]/15 to-transparent rounded-full blur-[90px] opacity-70 dark:opacity-100" />
      </div>

      {/* 3D WebGL Canvas Layer */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
      />

      {/* Floating Glassmorphic HUD Telemetry Cards with Wavo Brand Accents */}
      
      {/* Floating Card 1: Live Credit Facility Status (Top Right) */}
      <div className="absolute top-3 right-2 sm:right-4 z-20 pointer-events-none max-w-[230px] animate-float">
        <div className="p-3.5 rounded-2xl wavo-glass shadow-lg dark:shadow-2xl space-y-2 border border-slate-200/80 dark:border-white/[0.1]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#fa6e69] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#fa6e69] animate-ping" />
              Ligne Active
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">SEPA 24h</span>
          </div>

          <div className="space-y-0.5">
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">Trésorerie Débloquée</div>
            <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
              250 000,00 €
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-300">
            <span>Avance TVA : +50 000 €</span>
            <span className="text-[#fa6e69] font-bold font-mono">100% Décaissé</span>
          </div>
        </div>
      </div>

      {/* Floating Card 2: Balance Sheet Protection (Bottom Left) */}
      <div className="absolute bottom-12 left-2 sm:left-4 z-20 pointer-events-none max-w-[240px] hidden sm:block animate-float" style={{ animationDelay: "1.5s" }}>
        <div className="p-3 rounded-2xl wavo-glass shadow-lg dark:shadow-2xl space-y-2 border border-slate-200/80 dark:border-white/[0.1]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#fa6e69]/15 text-[#fa6e69]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Impact Bilan Neutre</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Capacité d&apos;emprunt intacte</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/80 dark:border-white/[0.08] text-center font-mono">
            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200/60 dark:border-transparent">
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Dette ajoutée</div>
              <div className="text-xs font-bold text-[#fa6e69]">0 €</div>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200/60 dark:border-transparent">
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Caution perso</div>
              <div className="text-xs font-bold text-[#fa6e69]">AUCUNE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Card 3: Real-Time Unit Settlement (Bottom Right) */}
      <div className="absolute bottom-12 right-2 sm:right-4 z-20 pointer-events-none max-w-[210px] hidden md:block animate-float" style={{ animationDelay: "2.5s" }}>
        <div className="p-3 rounded-2xl wavo-glass shadow-lg dark:shadow-2xl space-y-1.5 border border-slate-200/80 dark:border-white/[0.1] text-xs">
          <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            <span>SYNC ERP TEMPS RÉEL</span>
            <span className="text-[#fa6e69] font-bold">LIVE</span>
          </div>
          <div className="text-slate-900 dark:text-white font-semibold flex items-center justify-between">
            <span>Rachat unitaire :</span>
            <span className="text-[#fa6e69] font-mono">Au fil de l&apos;eau</span>
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">
            Aucun échéancier fixe contraignant
          </div>
        </div>
      </div>

      {/* Mode Selector Pill Tabs (Bottom Center) */}
      <div className="absolute bottom-1 inset-x-0 z-30 flex items-center justify-center pointer-events-auto">
        <div className="p-1 rounded-full wavo-glass border border-slate-200/80 dark:border-white/[0.12] flex items-center gap-1 shadow-lg dark:shadow-2xl">
          {[
            { id: "asset", label: "1. Actif physique" },
            { id: "liquidity", label: "2. Portage & Avance 100%" },
            { id: "settlement", label: "3. Sortie & Vente" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id as "asset" | "liquidity" | "settlement")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                activeMode === mode.id
                  ? "bg-[#fa6e69] text-white shadow-md shadow-[#fa6e69]/30"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

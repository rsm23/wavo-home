"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ArrowUpRight, Box, ShieldCheck, Zap, RefreshCw } from "lucide-react";

export default function InventoryVault3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeStage, setActiveStage] = useState<0 | 1 | 2>(1);
  const stageRef = useRef<number>(1);
  stageRef.current = activeStage;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0c16, 0.04);

    // Camera setup with isometric tilt
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(7, 6, 8);
    camera.lookAt(0, 0.5, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x6366f1, 2.8);
    keyLight.position.set(6, 12, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x06b6d4, 1.8);
    fillLight.position.set(-6, 4, -4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xa855f7, 2.5, 12);
    rimLight.position.set(0, 3, 2);
    scene.add(rimLight);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(14, 28, 0x6366f1, 0x1e293b);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);

    // Central Platform (Pedestal)
    const platformGeo = new THREE.CylinderGeometry(3.6, 4.0, 0.4, 32);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.8,
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = -0.4;
    platform.receiveShadow = true;
    scene.add(platform);

    // Glowing Ring around platform
    const ringGeo = new THREE.RingGeometry(3.65, 3.8, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x635bff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const glowRing = new THREE.Mesh(ringGeo, ringMat);
    glowRing.rotation.x = -Math.PI / 2;
    glowRing.position.y = -0.19;
    scene.add(glowRing);

    // 3D Cargo Crate & Inventory Cubes Hierarchy
    const stockGroup = new THREE.Group();
    scene.add(stockGroup);

    // Pallet Base
    const palletGeo = new THREE.BoxGeometry(2.4, 0.18, 2.4);
    const palletMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.8,
      metalness: 0.1,
    });
    const pallet = new THREE.Mesh(palletGeo, palletMat);
    pallet.position.y = 0;
    pallet.castShadow = true;
    pallet.receiveShadow = true;
    stockGroup.add(pallet);

    // 4 Modular Cargo Containers / Crates
    const crateSize = 0.95;
    const crateGeo = new THREE.BoxGeometry(crateSize, crateSize, crateSize);
    
    // Wireframe edges geometry for tech cyber look
    const edgesGeo = new THREE.EdgesGeometry(crateGeo);
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x00d4ff, linewidth: 2 });

    const crateMatGlass = new THREE.MeshPhysicalMaterial({
      color: 0x1e1b4b,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.8,
      transparent: true,
      opacity: 0.85,
      reflectivity: 0.9,
    });

    const cratePositions = [
      [-0.55, 0.58, -0.55],
      [ 0.55, 0.58, -0.55],
      [-0.55, 0.58,  0.55],
      [ 0.55, 0.58,  0.55],
      [ 0.0,  1.6,   0.0], // Top executive tier crate
    ];

    const crates: THREE.Mesh[] = [];
    cratePositions.forEach((pos, idx) => {
      const crate = new THREE.Mesh(crateGeo, crateMatGlass.clone());
      crate.position.set(pos[0], pos[1], pos[2]);
      crate.castShadow = true;
      crate.receiveShadow = true;

      const wireframe = new THREE.LineSegments(edgesGeo, edgeMat);
      crate.add(wireframe);

      // Inner glowing core
      const coreGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({
        color: idx === 4 ? 0xec4899 : 0x6366f1,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      crate.add(core);

      stockGroup.add(crate);
      crates.push(crate);
    });

    // Orbiting Capital & Liquidity Particle Ring
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 2.2 + (Math.random() - 0.5) * 0.7;
      const height = (Math.random() - 0.5) * 2.2 + 1.0;

      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = height;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      // Colors from Cyan to Indigo
      particleColors[i * 3] = 0.2 + Math.random() * 0.3;     // R
      particleColors[i * 3 + 1] = 0.7 + Math.random() * 0.3; // G
      particleColors[i * 3 + 2] = 1.0;                       // B
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Interaction Physics
    let targetX = 7;
    let targetY = 6;
    let targetZ = 8;
    let mouseX = 0;
    let mouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 2.5;
      mouseY = y * 2.0;
    };

    container.addEventListener("mousemove", handlePointerMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const stage = stageRef.current;

      // Base rotation of stock stack
      stockGroup.rotation.y = time * 0.35;

      // Animate crates based on active stage
      crates.forEach((c, idx) => {
        if (stage === 0) {
          // Physical resting mode
          c.position.y = THREE.MathUtils.lerp(c.position.y, cratePositions[idx][1], 0.08);
          c.rotation.y = 0;
          (c.material as THREE.MeshPhysicalMaterial).color.setHex(0x1e293b);
        } else if (stage === 1) {
          // Digitized Wavo portage mode (floating hover with breath)
          const hoverOffset = Math.sin(time * 2 + idx) * 0.08;
          c.position.y = THREE.MathUtils.lerp(c.position.y, cratePositions[idx][1] + hoverOffset, 0.08);
          c.rotation.y = Math.sin(time + idx) * 0.08;
          (c.material as THREE.MeshPhysicalMaterial).color.setHex(idx === 4 ? 0x4f46e5 : 0x1e1b4b);
        } else {
          // Cash released expansion mode
          const spreadFactor = 1.35;
          c.position.x = THREE.MathUtils.lerp(c.position.x, cratePositions[idx][0] * spreadFactor, 0.05);
          c.position.z = THREE.MathUtils.lerp(c.position.z, cratePositions[idx][2] * spreadFactor, 0.05);
          c.position.y = THREE.MathUtils.lerp(c.position.y, cratePositions[idx][1] + 0.3 + Math.sin(time * 3 + idx) * 0.12, 0.08);
          (c.material as THREE.MeshPhysicalMaterial).color.setHex(0x06b6d4);
        }
      });

      // Particles rotation & pulsation
      particles.rotation.y = -time * 0.6;
      particles.position.y = Math.sin(time) * 0.1;

      // Pulsing ring glow
      ringMat.opacity = 0.5 + Math.sin(time * 2.5) * 0.3;

      // Smooth Camera Lerp with mouse
      targetX = 7 + mouseX;
      targetY = 6 - mouseY;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(0, 0.8, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl group">
      {/* Top Bar Header */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-slate-950/60 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-semibold tracking-wide text-slate-200 uppercase">
            Moteur de conversion 3D • Wavo Liquidity Engine
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-indigo-400" />
          Temps réel • 60 FPS WebGL
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-[460px] cursor-grab active:cursor-grabbing relative" />

      {/* Floating Hologram Badges overlay */}
      <div className="absolute top-16 left-5 z-20 pointer-events-none hidden sm:flex flex-col gap-2">
        <div className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-indigo-500/30 text-[11px] font-medium text-indigo-300 backdrop-blur-md shadow-lg flex items-center gap-1.5">
          <Box className="w-3.5 h-3.5 text-indigo-400" />
          <span>Actif physique valorisé à 100%</span>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-cyan-500/30 text-[11px] font-medium text-cyan-300 backdrop-blur-md shadow-lg flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Virement bancaire &lt; 24h</span>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-emerald-500/30 text-[11px] font-medium text-emerald-300 backdrop-blur-md shadow-lg flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Bilan préservé • 0€ dette</span>
        </div>
      </div>

      {/* Bottom Interactive State Switcher */}
      <div className="absolute bottom-4 inset-x-4 z-20 p-2 rounded-xl bg-slate-950/80 border border-white/10 backdrop-blur-lg flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs text-slate-300 font-medium px-2 hidden md:block">
          Cycle de valorisation :
        </div>
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 0, label: "1. Stock en entrepôt", icon: Box },
            { id: 1, label: "2. Portage & Achat Wavo", icon: RefreshCw },
            { id: 2, label: "3. Trésorerie débloquée", icon: Zap },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeStage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveStage(item.id as 0 | 1 | 2)}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? "text-cyan-300" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

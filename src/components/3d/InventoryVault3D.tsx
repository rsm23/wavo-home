"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ShieldCheck, Zap, Lock, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function InventoryVault3D() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement | null>(null);
  const themeRef = useRef(isDark);
  themeRef.current = isDark;

  const [activeTab, setActiveTab] = useState<"liquidity" | "security" | "speed">("liquidity");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // --- WebGL Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark ? 1.3 : 1.1;
    container.appendChild(renderer.domElement);

    // --- Central Sculptural Group ---
    const vaultGroup = new THREE.Group();
    scene.add(vaultGroup);

    // --- 1. Sculptural 3D Liquid Glass Core (Torus Knot) ---
    // Represents the continuous, frictionless flow of asset liquidity
    const knotGeometry = new THREE.TorusKnotGeometry(1.55, 0.42, 160, 36, 2, 3);
    const knotMaterial = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x141a2e : 0xffffff,
      emissive: isDark ? 0x1c1020 : 0xffeae5,
      emissiveIntensity: isDark ? 0.35 : 0.2,
      roughness: isDark ? 0.12 : 0.08,
      metalness: isDark ? 0.45 : 0.12,
      transmission: isDark ? 0.82 : 0.88,
      opacity: 0.94,
      transparent: true,
      ior: 1.52,
      thickness: 1.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.9,
    });
    const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
    vaultGroup.add(knotMesh);

    // --- 2. Luminous Internal Energy Nucleus ---
    // Warm coral and peach pulsing core
    const coreGeometry = new THREE.SphereGeometry(0.72, 32, 32);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xfa6e69,
      emissive: 0xfa6e69,
      emissiveIntensity: isDark ? 1.6 : 1.2,
      roughness: 0.3,
      metalness: 0.2,
      transparent: true,
      opacity: isDark ? 0.85 : 0.7,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    vaultGroup.add(coreMesh);

    // Secondary warm peach core glow
    const innerCoreGeo = new THREE.SphereGeometry(0.45, 24, 24);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffbc7d,
      transparent: true,
      opacity: 0.9,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    vaultGroup.add(innerCoreMesh);

    // --- 3. Precision Gyroscopic Orbit Rings ---
    // Outer Thin Orbit Ring (Brushed Rose-Gold)
    const outerRingGeo = new THREE.TorusGeometry(2.55, 0.016, 16, 120);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0xffbc7d,
      metalness: 0.9,
      roughness: 0.15,
      transparent: true,
      opacity: isDark ? 0.75 : 0.6,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    scene.add(outerRing);

    // Inner Thin Orbit Ring (Wavo Coral Accent)
    const innerRingGeo = new THREE.TorusGeometry(2.1, 0.014, 16, 100);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0xfa6e69,
      metalness: 0.85,
      roughness: 0.2,
      transparent: true,
      opacity: isDark ? 0.8 : 0.65,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = Math.PI * 0.45;
    scene.add(innerRing);

    // --- 4. Studio Lighting System ---
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x161b2d : 0xffffff,
      isDark ? 1.4 : 2.4
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffecd8, isDark ? 2.5 : 2.0);
    keyLight.position.set(6, 8, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xfa6e69, isDark ? 3.8 : 2.6);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    // Dynamic Cursor Spotlight (Follows cursor smoothly, casting liquid reflections)
    const cursorLight = new THREE.PointLight(0xfa6e69, isDark ? 5.5 : 4.0, 14, 1.2);
    cursorLight.position.set(0, 0, 4);
    scene.add(cursorLight);

    const fillLight = new THREE.PointLight(0xffbc7d, isDark ? 3.5 : 2.5, 12, 1.4);
    fillLight.position.set(3, -2, 3);
    scene.add(fillLight);

    // --- 5. Interactive Mouse Parallax & Morphing ---
    const mouseTarget = { x: 0, y: 0 };
    const mouseSmoothed = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseTarget.x = Math.max(-1.2, Math.min(1.2, x));
      mouseTarget.y = Math.max(-1.2, Math.min(1.2, y));
    };

    const handleMouseLeave = () => {
      mouseTarget.x = 0;
      mouseTarget.y = 0;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // --- Animation Clock & Render Loop ---
    const clock = new THREE.Clock();
    let animationId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Silky spring damping on mouse movement
      mouseSmoothed.x += (mouseTarget.x - mouseSmoothed.x) * 0.045;
      mouseSmoothed.y += (mouseTarget.y - mouseSmoothed.y) * 0.045;

      // Slow, hypnotic continuous rotation
      vaultGroup.rotation.y = elapsed * 0.28 + mouseSmoothed.x * 0.6;
      vaultGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.15 - mouseSmoothed.y * 0.5;
      vaultGroup.rotation.z = Math.cos(elapsed * 0.25) * 0.08;

      // Organic breathing scale (Subtle 3D morphing)
      const breath = 1.0 + Math.sin(elapsed * 1.6) * 0.035;
      knotMesh.scale.set(breath, breath, breath);

      // Pulse the glowing core
      const corePulse = 0.95 + Math.sin(elapsed * 2.8) * 0.08;
      coreMesh.scale.set(corePulse, corePulse, corePulse);

      // Dynamic gyroscopic rings rotation
      outerRing.rotation.x = elapsed * 0.18 + mouseSmoothed.y * 0.3;
      outerRing.rotation.y = elapsed * 0.22 + mouseSmoothed.x * 0.3;

      innerRing.rotation.x = Math.PI * 0.45 - elapsed * 0.14 - mouseSmoothed.y * 0.2;
      innerRing.rotation.z = elapsed * 0.25 + mouseSmoothed.x * 0.25;

      // Dynamic light tracking
      cursorLight.position.x = mouseSmoothed.x * 5.0;
      cursorLight.position.y = mouseSmoothed.y * 4.0;
      cursorLight.position.z = 4.0 + Math.sin(elapsed * 2) * 0.5;

      // Subtle camera parallax
      camera.position.x += (mouseSmoothed.x * 0.8 - camera.position.x) * 0.04;
      camera.position.y += (mouseSmoothed.y * 0.6 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animationId = requestAnimationFrame(animate);

    // --- Resize Handling ---
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW > 0 && newH > 0) {
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    };

    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      knotGeometry.dispose();
      knotMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      outerRingGeo.dispose();
      outerRingMat.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[400px] flex items-center justify-center select-none">
      
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
      />

      {/* Floating Micro-Badge Top Left: Bank Guarantee */}
      <div className="absolute top-3 left-3 z-10 pointer-events-none">
        <div className="px-3 py-2 rounded-2xl bg-white/85 dark:bg-[#121624]/85 backdrop-blur-md border border-slate-200/80 dark:border-white/[0.1] shadow-lg space-y-0.5">
          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>GARANTIE PATRIMOINE</span>
          </div>
          <div className="text-xs font-bold text-slate-900 dark:text-white">
            0 € Caution • 0 Dette
          </div>
        </div>
      </div>

      {/* Floating Micro-Badge Bottom Right: Instant SEPA */}
      <div className="absolute bottom-12 right-3 z-10 pointer-events-none hidden sm:block">
        <div className="px-3 py-2 rounded-2xl bg-white/85 dark:bg-[#121624]/85 backdrop-blur-md border border-slate-200/80 dark:border-white/[0.1] shadow-lg space-y-0.5">
          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#fa6e69] shrink-0" />
            <span>DÉBLOCAGE SEPA</span>
          </div>
          <div className="text-xs font-mono font-bold text-[#fa6e69]">
            Virement sous 24h
          </div>
        </div>
      </div>

      {/* Interactive Feature Focus Pills (Bottom Center) */}
      <div className="absolute bottom-1 inset-x-0 z-20 flex items-center justify-center pointer-events-auto">
        <div className="p-1 rounded-full bg-white/90 dark:bg-[#121624]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/[0.1] flex items-center gap-1 shadow-md">
          {[
            { id: "liquidity", label: "Avance 100%" },
            { id: "security", label: "Stock Chez Vous" },
            { id: "speed", label: "Sans Greffe" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as "liquidity" | "security" | "speed")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#fa6e69] text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

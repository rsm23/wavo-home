"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/theme/ThemeProvider";

interface HeroBackground3DProps {
  className?: string;
}

export default function HeroBackground3D({ className = "" }: HeroBackground3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const themeRef = useRef(isDark);
  themeRef.current = isDark;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, -3.5, 12);
    camera.lookAt(0, 0, 0);

    // --- WebGL Renderer ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark ? 1.2 : 1.0;
    container.appendChild(renderer.domElement);

    // --- Dynamic 3D Morphing Surface Geometry ---
    // 84x64 grid offers ultra-smooth wave contours with negligible frame-time cost (~0.2ms)
    const gridCols = 84;
    const gridRows = 64;
    const planeWidth = 26;
    const planeHeight = 18;
    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, gridCols, gridRows);

    // Cache initial 2D layout for wave displacement
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const vertexCount = posAttr.count;
    const initialPositions = new Float32Array(posAttr.array);

    // --- High-End Materials ---
    // Layer 1: Sculptural Physical Membrane with Frosted Subsurface Look
    const surfaceMaterial = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x0a0e1a : 0xfcf9f7,
      metalness: isDark ? 0.4 : 0.08,
      roughness: isDark ? 0.35 : 0.25,
      clearcoat: isDark ? 0.5 : 0.8,
      clearcoatRoughness: 0.15,
      transmission: isDark ? 0.2 : 0.4,
      opacity: isDark ? 0.88 : 0.72,
      transparent: true,
      side: THREE.DoubleSide,
      wireframe: false,
    });

    const surfaceMesh = new THREE.Mesh(geometry, surfaceMaterial);
    surfaceMesh.rotation.x = -Math.PI * 0.28; // Tilted for dramatic fintech horizon perspective
    surfaceMesh.position.set(0, 0.5, -1);
    scene.add(surfaceMesh);

    // Layer 2: Architectural CAD Lattice Wireframe Overlay (riding the exact same geometry)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xfa6e69,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.22 : 0.16,
    });
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
    wireframeMesh.rotation.copy(surfaceMesh.rotation);
    wireframeMesh.position.copy(surfaceMesh.position);
    wireframeMesh.position.z += 0.02; // Sits microscopically above surface to prevent z-fighting
    scene.add(wireframeMesh);

    // --- Layer 3: Floating Micro-Node Constellation Particles ---
    const particleCount = 75;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);
    const particleOffsets = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 22;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 2] = Math.random() * 3 + 0.5;
      particleSpeeds[i] = 0.2 + Math.random() * 0.4;
      particleOffsets[i] = Math.random() * Math.PI * 2;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    // Canvas-generated soft glow particle circle
    const particleCanvas = document.createElement("canvas");
    particleCanvas.width = 64;
    particleCanvas.height = 64;
    const ctx = particleCanvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(250, 110, 105, 0.8)");
      grad.addColorStop(0.7, "rgba(255, 188, 125, 0.3)");
      grad.addColorStop(1, "rgba(250, 110, 105, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.28,
      map: particleTexture,
      transparent: true,
      opacity: isDark ? 0.75 : 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // --- Dynamic Specular Lighting System ---
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x101524 : 0xffffff,
      isDark ? 1.2 : 2.2
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffecd8, isDark ? 1.6 : 1.8);
    keyLight.position.set(12, 16, 14);
    scene.add(keyLight);

    // Dynamic Cursor Spotlight (Wavo signature coral glow that tracks cursor)
    const cursorLight = new THREE.PointLight(0xfa6e69, isDark ? 6.5 : 4.8, 22, 1.2);
    cursorLight.position.set(0, 0, 3.5);
    scene.add(cursorLight);

    // Secondary Warm Peach Ambient Reflector
    const fillLight = new THREE.PointLight(0xffbc7d, isDark ? 4.2 : 3.0, 26, 1.4);
    fillLight.position.set(-6, -4, 4);
    scene.add(fillLight);

    // --- Cursor Tracking & Physics State ---
    const mouseTarget = { x: 0, y: 0 };
    const mouseSmoothed = { x: 0, y: 0 };
    const mouse3D = { x: 0, y: 0 };
    let mouseVelocity = 0;
    let lastMouse = { x: 0, y: 0 };
    let isHovered = false;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseTarget.x = Math.max(-1.2, Math.min(1.2, x));
      mouseTarget.y = Math.max(-1.2, Math.min(1.2, y));

      const dx = mouseTarget.x - lastMouse.x;
      const dy = mouseTarget.y - lastMouse.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      mouseVelocity = Math.min(3.5, mouseVelocity * 0.7 + speed * 12);
      lastMouse = { x: mouseTarget.x, y: mouseTarget.y };
      isHovered = true;
    };

    const handlePointerLeave = () => {
      mouseTarget.x = 0;
      mouseTarget.y = 0;
      isHovered = false;
    };

    // Attach to window for fluid cursor reception anywhere on top of hero
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    // --- Animation Clock & Render Loop ---
    const clock = new THREE.Clock();
    let animationFrameId: number;
    let isVisible = true;

    // IntersectionObserver to pause when hero is scrolled out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Smooth cursor interpolation (damping/lerp)
      const lerpFactor = 0.045;
      mouseSmoothed.x += (mouseTarget.x - mouseSmoothed.x) * lerpFactor;
      mouseSmoothed.y += (mouseTarget.y - mouseSmoothed.y) * lerpFactor;
      mouseVelocity *= 0.94; // Decay velocity

      // Map smoothed mouse into 3D plane coordinate space
      mouse3D.x = mouseSmoothed.x * 11.0;
      mouse3D.y = mouseSmoothed.y * 7.5;

      // Update Cursor Dynamic Spotlight
      cursorLight.position.x = mouse3D.x * 0.9;
      cursorLight.position.y = mouse3D.y * 0.85 + 0.5;
      cursorLight.position.z = 2.8 + Math.sin(elapsed * 2) * 0.4 + mouseVelocity * 0.6;
      cursorLight.intensity = (themeRef.current ? 6.5 : 4.8) + mouseVelocity * 1.5;

      // Move fill light on gentle harmonic orbit
      fillLight.position.x = -mouse3D.x * 0.6 + Math.cos(elapsed * 0.8) * 4;
      fillLight.position.y = -mouse3D.y * 0.6 + Math.sin(elapsed * 0.6) * 3;

      // Gentle parallax camera response
      camera.position.x += (mouseSmoothed.x * 1.6 - camera.position.x) * 0.035;
      camera.position.y += (-3.5 + mouseSmoothed.y * 1.2 - camera.position.y) * 0.035;
      camera.lookAt(mouseSmoothed.x * 0.5, 0.4 + mouseSmoothed.y * 0.4, 0);

      // --- Morph 3D Surface Geometry Vertices ---
      const positions = posAttr.array as Float32Array;
      const waveTime = elapsed * 0.75;
      const radiusSq = 20.0; // Dynamic zone of cursor influence
      const velocityAmp = 1 + mouseVelocity * 0.8;

      for (let i = 0; i < vertexCount; i++) {
        const i3 = i * 3;
        const x = initialPositions[i3];
        const y = initialPositions[i3 + 1];

        // Harmonic multi-octave base wave
        const harmonic1 = Math.sin(x * 0.28 + waveTime * 0.9) * Math.cos(y * 0.32 + waveTime * 0.7) * 1.05;
        const harmonic2 = Math.sin((x + y) * 0.22 - waveTime * 0.8) * 0.55;
        const harmonic3 = Math.cos(Math.sqrt(x * x + y * y) * 0.35 - waveTime * 1.1) * 0.35;
        const baseZ = harmonic1 + harmonic2 + harmonic3;

        // Interactive Cursor Disturbance & Morphing Wave
        const dx = x - mouse3D.x;
        const dy = y - mouse3D.y;
        const distSq = dx * dx + dy * dy;

        let interactiveZ = 0;
        if (distSq < radiusSq * 2) {
          const dist = Math.sqrt(distSq);
          const influence = Math.exp(-distSq / radiusSq);
          // Ripple wake + crest elevation under cursor
          const ripple = Math.sin(dist * 2.8 - waveTime * 5.0) * influence * 1.35 * velocityAmp;
          const lift = influence * 1.6 * (isHovered ? 1.0 : 0.3);
          interactiveZ = ripple + lift;
        }

        positions[i3 + 2] = baseZ + interactiveZ;
      }

      posAttr.needsUpdate = true;
      geometry.computeVertexNormals();

      // --- Animate Floating Particles ---
      const pPositions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const spd = particleSpeeds[i];
        const off = particleOffsets[i];
        // Bobbing & drifting motion
        pPositions[i3 + 1] += Math.sin(elapsed * spd + off) * 0.006;
        pPositions[i3 + 2] = 0.8 + Math.sin(elapsed * spd * 1.4 + off) * 1.2;

        // Subtle particle deflection away from active cursor
        const pdx = pPositions[i3] - mouse3D.x;
        const pdy = pPositions[i3 + 1] - mouse3D.y;
        const pDistSq = pdx * pdx + pdy * pdy;
        if (pDistSq < 16 && pDistSq > 0.1) {
          const push = (1 - pDistSq / 16) * 0.04;
          pPositions[i3] += (pdx / Math.sqrt(pDistSq)) * push;
          pPositions[i3 + 1] += (pdy / Math.sqrt(pDistSq)) * push;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Render Scene
      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // --- Resize Handling with ResizeObserver ---
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // Return Cleanup Function
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      observer.disconnect();
      resizeObserver.disconnect();

      geometry.dispose();
      surfaceMaterial.dispose();
      wireframeMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        // Soft vignette feathering so the 3D surface seamlessly fades at edges and bottom
        maskImage:
          "radial-gradient(ellipse 95% 85% at 50% 32%, black 45%, rgba(0,0,0,0.4) 80%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 95% 85% at 50% 32%, black 45%, rgba(0,0,0,0.4) 80%, transparent 100%)",
      }}
      aria-hidden="true"
    />
  );
}

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

    // --- 3D Scene & Camera ---
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 18);

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

    // --- Dynamic Studio Lights ---
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x141828 : 0xffffff,
      isDark ? 1.4 : 2.6
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffedd5, isDark ? 2.2 : 2.0);
    keyLight.position.set(12, 16, 12);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xfa6e69, isDark ? 3.0 : 2.0);
    rimLight.position.set(-12, -8, -6);
    scene.add(rimLight);

    // Cursor Follower Spotlight (Wavo Coral Credit Flow)
    const cursorLight = new THREE.PointLight(0xfa6e69, isDark ? 4.5 : 3.0, 20, 1.4);
    cursorLight.position.set(0, 0, 6);
    scene.add(cursorLight);

    // --- Wavo Business Model 3D Asset Ecosystem ---
    // 1. Physical Stock / Inventory Modules (Frosted Glass & Coral Collateral Cubes)
    // Distributed in a balanced, spatial composition (concentrated along sides and depth)
    const stockConfigs = [
      // Right side (Near facility terminal)
      { pos: [6.5, 3.2, -1.0], scale: [1.3, 1.1, 1.1], rotSpeed: [0.15, 0.2] },
      { pos: [8.8, 0.8, -3.5], scale: [1.6, 1.3, 1.3], rotSpeed: [-0.12, 0.18] },
      { pos: [5.2, -2.8, -2.0], scale: [1.2, 1.2, 1.2], rotSpeed: [0.2, -0.1] },
      { pos: [9.5, -3.5, -4.5], scale: [1.8, 1.4, 1.5], rotSpeed: [0.1, 0.15] },
      
      // Top background & center depth
      { pos: [-1.5, 4.5, -4.0], scale: [1.4, 1.2, 1.2], rotSpeed: [-0.15, 0.12] },
      { pos: [2.5, 4.8, -5.0], scale: [1.5, 1.3, 1.3], rotSpeed: [0.18, 0.14] },
      { pos: [0.5, -4.2, -3.5], scale: [1.3, 1.1, 1.2], rotSpeed: [-0.1, -0.2] },

      // Left background (Framing the master headline with subtle depth)
      { pos: [-6.8, 2.8, -3.0], scale: [1.2, 1.0, 1.1], rotSpeed: [0.12, -0.15] },
      { pos: [-8.5, 0.2, -4.5], scale: [1.5, 1.3, 1.3], rotSpeed: [-0.18, 0.1] },
      { pos: [-6.2, -3.0, -2.5], scale: [1.1, 1.1, 1.1], rotSpeed: [0.14, 0.16] },
      { pos: [-9.2, -3.8, -5.5], scale: [1.7, 1.4, 1.4], rotSpeed: [0.1, -0.12] },
    ];

    interface StockItem {
      mesh: THREE.Mesh;
      homePos: THREE.Vector3;
      currentPos: THREE.Vector3;
      velocity: THREE.Vector3;
      rotSpeed: [number, number];
      coreMesh: THREE.Mesh;
      wireframe: THREE.LineSegments;
    }

    const stockItems: StockItem[] = [];
    const stockGroup = new THREE.Group();
    scene.add(stockGroup);

    // Reusable Materials
    const boxMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x0d1222 : 0xffffff,
      roughness: isDark ? 0.18 : 0.12,
      metalness: isDark ? 0.45 : 0.08,
      transmission: isDark ? 0.78 : 0.85,
      opacity: isDark ? 0.9 : 0.8,
      transparent: true,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const edgeCoralMat = new THREE.LineBasicMaterial({
      color: 0xfa6e69,
      transparent: true,
      opacity: isDark ? 0.45 : 0.3,
    });

    const edgePeachMat = new THREE.LineBasicMaterial({
      color: 0xffbc7d,
      transparent: true,
      opacity: isDark ? 0.4 : 0.25,
    });

    const coreEnergyMat = new THREE.MeshBasicMaterial({
      color: 0xfa6e69,
      transparent: true,
      opacity: isDark ? 0.85 : 0.7,
    });

    const corePeachMat = new THREE.MeshBasicMaterial({
      color: 0xffbc7d,
      transparent: true,
      opacity: isDark ? 0.8 : 0.65,
    });

    stockConfigs.forEach((cfg, idx) => {
      const geo = new THREE.BoxGeometry(cfg.scale[0], cfg.scale[1], cfg.scale[2]);
      const mesh = new THREE.Mesh(geo, boxMat.clone());
      mesh.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);

      // Chamfered / Edges line accent
      const edges = new THREE.EdgesGeometry(geo);
      const wireframe = new THREE.LineSegments(
        edges,
        idx % 2 === 0 ? edgeCoralMat : edgePeachMat
      );
      mesh.add(wireframe);

      // Internal Credit Core (Represents capital equity unlocked inside the stock)
      const coreGeo = new THREE.OctahedronGeometry(0.24, 0);
      const coreMesh = new THREE.Mesh(
        coreGeo,
        idx % 2 === 0 ? coreEnergyMat : corePeachMat
      );
      mesh.add(coreMesh);

      stockGroup.add(mesh);

      stockItems.push({
        mesh,
        homePos: new THREE.Vector3(cfg.pos[0], cfg.pos[1], cfg.pos[2]),
        currentPos: new THREE.Vector3(cfg.pos[0], cfg.pos[1], cfg.pos[2]),
        velocity: new THREE.Vector3(0, 0, 0),
        rotSpeed: cfg.rotSpeed as [number, number],
        coreMesh,
        wireframe,
      });
    });

    // --- 2. 3D Liquidity Streams / Credit Pipelines ---
    // Smooth spline curves connecting stock nodes into a flowing liquidity grid
    const pipelineSplines = [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-8.5, 0.2, -4.5),
        new THREE.Vector3(-6.8, 2.8, -3.0),
        new THREE.Vector3(-1.5, 4.5, -4.0),
        new THREE.Vector3(2.5, 4.8, -5.0),
        new THREE.Vector3(6.5, 3.2, -1.0),
        new THREE.Vector3(8.8, 0.8, -3.5),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-9.2, -3.8, -5.5),
        new THREE.Vector3(-6.2, -3.0, -2.5),
        new THREE.Vector3(0.5, -4.2, -3.5),
        new THREE.Vector3(5.2, -2.8, -2.0),
        new THREE.Vector3(9.5, -3.5, -4.5),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-6.8, 2.8, -3.0),
        new THREE.Vector3(-3.0, 0.0, -2.0),
        new THREE.Vector3(1.0, 1.0, -1.5),
        new THREE.Vector3(5.2, -2.8, -2.0),
      ]),
    ];

    const pipelineGroup = new THREE.Group();
    scene.add(pipelineGroup);

    pipelineSplines.forEach((spline, idx) => {
      const tubeGeo = new THREE.TubeGeometry(spline, 64, 0.018, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: idx % 2 === 0 ? 0xfa6e69 : 0xffbc7d,
        transparent: true,
        opacity: isDark ? 0.35 : 0.2,
      });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      pipelineGroup.add(tube);
    });

    // --- 3. Flowing Credit Pulses / Cash Advances (Particles traveling along pipelines) ---
    const pulseCount = 36;
    const pulseGeo = new THREE.BufferGeometry();
    const pulsePositions = new Float32Array(pulseCount * 3);
    const pulseOffsets = new Float32Array(pulseCount);
    const pulseSplineIndices = new Uint8Array(pulseCount);
    const pulseSpeeds = new Float32Array(pulseCount);

    for (let i = 0; i < pulseCount; i++) {
      pulseOffsets[i] = Math.random();
      pulseSplineIndices[i] = i % pipelineSplines.length;
      pulseSpeeds[i] = 0.06 + Math.random() * 0.08;
      pulsePositions[i * 3] = 0;
      pulsePositions[i * 3 + 1] = 0;
      pulsePositions[i * 3 + 2] = 0;
    }

    pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePositions, 3));

    // Glow dot sprite
    const createPulseTexture = () => {
      const cv = document.createElement("canvas");
      cv.width = 64;
      cv.height = 64;
      const c = cv.getContext("2d");
      if (c) {
        const g = c.createRadialGradient(32, 32, 0, 32, 32, 30);
        g.addColorStop(0, "rgba(255, 255, 255, 1)");
        g.addColorStop(0.3, "rgba(250, 110, 105, 0.85)");
        g.addColorStop(0.7, "rgba(255, 188, 125, 0.3)");
        g.addColorStop(1, "rgba(250, 110, 105, 0)");
        c.fillStyle = g;
        c.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(cv);
    };

    const pulseMat = new THREE.PointsMaterial({
      size: 0.35,
      map: createPulseTexture(),
      transparent: true,
      opacity: isDark ? 0.85 : 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pulseSystem = new THREE.Points(pulseGeo, pulseMat);
    scene.add(pulseSystem);

    // --- 4. Minted 3D Wavo Credit Facility Coins (with official Wavo "W" Emblem) ---
    const createWavoCoinTexture = (isDarkTheme: boolean) => {
      const cv = document.createElement("canvas");
      cv.width = 512;
      cv.height = 512;
      const c = cv.getContext("2d");
      const texture = new THREE.CanvasTexture(cv);
      if (!c) return texture;

      const cx = 256;
      const cy = 256;
      const r = 236;

      const drawCoinFace = (logoImg?: HTMLImageElement) => {
        c.clearRect(0, 0, 512, 512);

        // Radial brushed gold/coral metallic background
        const grad = c.createRadialGradient(cx - 30, cy - 30, 20, cx, cy, r);
        if (isDarkTheme) {
          grad.addColorStop(0, "#3a242c");
          grad.addColorStop(0.5, "#24161f");
          grad.addColorStop(0.85, "#180e15");
          grad.addColorStop(1, "#0f090d");
        } else {
          grad.addColorStop(0, "#fff5ee");
          grad.addColorStop(0.4, "#ffeedf");
          grad.addColorStop(0.75, "#ffd9c2");
          grad.addColorStop(1, "#f3b999");
        }
        c.fillStyle = grad;
        c.beginPath();
        c.arc(cx, cy, r, 0, Math.PI * 2);
        c.fill();

        // Outer minted coin rim
        c.strokeStyle = isDarkTheme ? "rgba(250, 110, 105, 0.75)" : "rgba(224, 83, 78, 0.65)";
        c.lineWidth = 10;
        c.beginPath();
        c.arc(cx, cy, r - 6, 0, Math.PI * 2);
        c.stroke();

        // Inner fine engraved concentric ring
        c.strokeStyle = isDarkTheme ? "rgba(255, 188, 125, 0.5)" : "rgba(250, 110, 105, 0.45)";
        c.lineWidth = 3;
        c.beginPath();
        c.arc(cx, cy, r - 26, 0, Math.PI * 2);
        c.stroke();

        // Minted dentil border notches around the circumference
        const dentils = 40;
        c.fillStyle = isDarkTheme ? "rgba(255, 188, 125, 0.7)" : "rgba(224, 83, 78, 0.6)";
        for (let i = 0; i < dentils; i++) {
          const a = (i / dentils) * Math.PI * 2;
          const px = cx + Math.cos(a) * (r - 16);
          const py = cy + Math.sin(a) * (r - 16);
          c.beginPath();
          c.arc(px, py, 3.5, 0, Math.PI * 2);
          c.fill();
        }

        // Embossed Center Wavo "W" Emblem
        const wWidth = 230;
        const wHeight = (wWidth * 60) / 78;
        const wx = cx - wWidth / 2;
        const wy = cy - wHeight / 2;

        if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
          c.save();
          // Drop shadow for embossed 3D relief effect
          c.shadowColor = isDarkTheme ? "rgba(250, 110, 105, 0.6)" : "rgba(180, 50, 40, 0.35)";
          c.shadowBlur = 14;
          c.shadowOffsetX = 0;
          c.shadowOffsetY = 5;

          // Tint image into signature Wavo Coral / Gold
          const tintCv = document.createElement("canvas");
          tintCv.width = logoImg.naturalWidth;
          tintCv.height = logoImg.naturalHeight;
          const tCtx = tintCv.getContext("2d");
          if (tCtx) {
            tCtx.drawImage(logoImg, 0, 0);
            tCtx.globalCompositeOperation = "source-in";
            tCtx.fillStyle = isDarkTheme ? "#fa6e69" : "#e0534e";
            tCtx.fillRect(0, 0, tintCv.width, tintCv.height);
            c.drawImage(tintCv, wx, wy, wWidth, wHeight);
          } else {
            c.drawImage(logoImg, wx, wy, wWidth, wHeight);
          }
          c.restore();
        } else {
          // Sharp geometric W fallback before image loads
          c.save();
          c.fillStyle = isDarkTheme ? "#fa6e69" : "#e0534e";
          c.font = "900 160px sans-serif";
          c.textAlign = "center";
          c.textBaseline = "middle";
          c.fillText("W", cx, cy + 6);
          c.restore();
        }

        texture.needsUpdate = true;
      };

      // Draw initial state
      drawCoinFace();

      // Load official Wavo W logo symbol
      const wImg = new window.Image();
      wImg.src = "/assets/wavo-w-symbol.png";
      wImg.onload = () => {
        drawCoinFace(wImg);
      };

      return texture;
    };

    const coinTexture = createWavoCoinTexture(isDark);

    const coinSideMat = new THREE.MeshStandardMaterial({
      color: 0xffbc7d,
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: isDark ? 0.85 : 0.75,
    });

    const coinFaceMat = new THREE.MeshStandardMaterial({
      map: coinTexture,
      bumpMap: coinTexture,
      bumpScale: 0.03,
      metalness: 0.85,
      roughness: 0.22,
      transparent: true,
      opacity: isDark ? 0.9 : 0.85,
    });

    const coinMaterials = [coinSideMat, coinFaceMat, coinFaceMat];
    const tokenGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.08, 36);

    const tokenPositions = [
      [-4.5, 3.2, -2.5],
      [-3.0, -2.5, -2.0],
      [3.8, 2.5, -1.8],
      [7.2, -1.2, -1.5],
      [1.8, -3.6, -2.8],
      [-7.5, -1.5, -3.2],
      [5.5, 4.2, -3.0],
      [-1.2, 3.8, -2.2],
    ];

    const tokenGroup = new THREE.Group();
    scene.add(tokenGroup);

    const tokens: { mesh: THREE.Mesh; homeY: number; speed: number }[] = [];

    tokenPositions.forEach((pos, idx) => {
      const disc = new THREE.Mesh(tokenGeo, coinMaterials);
      disc.position.set(pos[0], pos[1], pos[2]);
      disc.rotation.x = Math.PI * 0.35 + idx * 0.4;
      disc.rotation.y = idx * 0.5;
      disc.rotation.z = idx * 0.7;
      tokenGroup.add(disc);
      tokens.push({ mesh: disc, homeY: pos[1], speed: 0.5 + idx * 0.15 });
    });

    // --- 5. Interactive Cursor Tracking & 3D Raycast Unprojection ---
    const mouse2D = new THREE.Vector2(0, 0);
    const mouse3D = new THREE.Vector3(0, 0, 0);
    const targetMouse3D = new THREE.Vector3(0, 0, 0);
    let isHovering = false;

    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster();

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse2D.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse2D.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse2D, camera);
      raycaster.ray.intersectPlane(planeZ, targetMouse3D);
      isHovering = true;
    };

    const handlePointerLeave = () => {
      isHovering = false;
      targetMouse3D.set(0, 0, 0);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    // --- Animation & Dynamic Morphing Loop ---
    const clock = new THREE.Clock();
    let animationFrameId: number;
    let isVisible = true;

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

      // Smooth cursor interpolation
      mouse3D.lerp(targetMouse3D, 0.05);

      // Camera parallax
      camera.position.x += (mouse2D.x * 1.5 - camera.position.x) * 0.035;
      camera.position.y += (mouse2D.y * 1.0 - camera.position.y) * 0.035;
      camera.lookAt(0, 0, 0);

      // Dynamic cursor spotlight tracking
      cursorLight.position.x = mouse3D.x * 0.85;
      cursorLight.position.y = mouse3D.y * 0.85;
      cursorLight.position.z = 4.5 + Math.sin(elapsed * 2) * 0.5;

      // --- Animate 3D Stock Inventory Units ---
      const spring = 0.04;
      const damping = 0.88;
      const influenceRadiusSq = 18.0;
      const influenceRadius = Math.sqrt(influenceRadiusSq);

      stockItems.forEach((item, idx) => {
        // Continuous gentle floating rotation
        item.mesh.rotation.y += item.rotSpeed[0] * 0.015;
        item.mesh.rotation.x += item.rotSpeed[1] * 0.012;

        // Pulse the internal credit nucleus
        const pulse = 1.0 + Math.sin(elapsed * 2.5 + idx) * 0.15;
        item.coreMesh.scale.set(pulse, pulse, pulse);

        // Vector from stock unit to cursor
        const dx = item.currentPos.x - mouse3D.x;
        const dy = item.currentPos.y - mouse3D.y;
        const dz = item.currentPos.z - mouse3D.z;
        const distSq = dx * dx + dy * dy + dz * dz;

        // Dynamic Cursor Valuation Reaction (Unlocking credit when cursor approaches)
        if (isHovering && distSq < influenceRadiusSq) {
          const dist = Math.sqrt(distSq);
          const force = (1.0 - dist / influenceRadius) * 0.35;

          // Lift forward towards user and tilt to face cursor
          item.velocity.z += force * 0.8;
          item.velocity.x += (dx / dist) * force * 0.4;
          item.velocity.y += (dy / dist) * force * 0.4;

          // Accelerated rotation on active inspection
          item.mesh.rotation.y += 0.025;
        }

        // Natural subtle floating bobbing
        const targetY = item.homePos.y + Math.sin(elapsed * 0.8 + idx * 1.1) * 0.18;
        const targetZ = item.homePos.z + Math.cos(elapsed * 0.6 + idx * 0.8) * 0.12;

        // Spring physics return
        item.velocity.x += (item.homePos.x - item.currentPos.x) * spring;
        item.velocity.y += (targetY - item.currentPos.y) * spring;
        item.velocity.z += (targetZ - item.currentPos.z) * spring;

        item.velocity.multiplyScalar(damping);
        item.currentPos.add(item.velocity);
        item.mesh.position.copy(item.currentPos);
      });

      // --- Animate Liquidity Cash Pulses along Pipelines ---
      const pPositions = pulseGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < pulseCount; i++) {
        pulseOffsets[i] = (pulseOffsets[i] + pulseSpeeds[i] * 0.008) % 1.0;
        const spline = pipelineSplines[pulseSplineIndices[i]];
        const point = spline.getPoint(pulseOffsets[i]);

        pPositions[i * 3] = point.x;
        pPositions[i * 3 + 1] = point.y;
        pPositions[i * 3 + 2] = point.z;
      }
      pulseGeo.attributes.position.needsUpdate = true;

      // --- Animate Floating Wavo Credit Coins with W Emblem (3D Tumble) ---
      tokens.forEach((t, idx) => {
        t.mesh.position.y = t.homeY + Math.sin(elapsed * t.speed + idx) * 0.22;
        t.mesh.rotation.y += 0.018;
        t.mesh.rotation.x += 0.012;
        t.mesh.rotation.z += 0.008;
      });

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // --- Dynamic Theme Adaptations ---
    const updateTheme = () => {
      const dark = themeRef.current;
      boxMat.color.setHex(dark ? 0x0d1222 : 0xffffff);
      boxMat.roughness = dark ? 0.18 : 0.12;
      boxMat.metalness = dark ? 0.45 : 0.08;
      boxMat.transmission = dark ? 0.78 : 0.85;
      boxMat.opacity = dark ? 0.9 : 0.8;

      edgeCoralMat.opacity = dark ? 0.45 : 0.3;
      edgePeachMat.opacity = dark ? 0.4 : 0.25;
      ambientLight.color.setHex(dark ? 0x141828 : 0xffffff);
      ambientLight.intensity = dark ? 1.4 : 2.6;
      pulseMat.opacity = dark ? 0.85 : 0.65;
    };

    // --- Resize Handling ---
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

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      observer.disconnect();
      resizeObserver.disconnect();

      boxMat.dispose();
      edgeCoralMat.dispose();
      edgePeachMat.dispose();
      coreEnergyMat.dispose();
      coinSideMat.dispose();
      coinFaceMat.dispose();
      coinTexture.dispose();
      tokenGeo.dispose();
      pulseMat.dispose();
      pulseGeo.dispose();
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
        // Smooth bottom and edge feathering to integrate with the layout
        maskImage:
          "linear-gradient(to bottom, black 65%, rgba(0,0,0,0.3) 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 65%, rgba(0,0,0,0.3) 88%, transparent 100%)",
      }}
      aria-hidden="true"
    />
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/theme/ThemeProvider";

interface HeroBackground3DProps {
  className?: string;
}

// GLSL Vertex Shader: Fullscreen quad with UV pass-through
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// GLSL Fragment Shader: Ultra-Subtle Ethereal Fluid Light Field
// Soft, calm, continuous organic flow with gentle cursor refraction & magnetic drift
const fragmentShader = `
  precision highp float;

  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uDark;
  uniform float uHover;

  varying vec2 vUv;

  // Analytical 2D Simplex Noise (Ashima / McEwan)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(
      0.211324865405187,
      0.366025403784439,
      -0.577350269189626,
      0.024390243902439
    );
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 1.8;

    // Slow, serene time progression (peaceful breathing cadence)
    float t = uTime * 0.08;

    // Aspect-corrected cursor coordinates
    vec2 mouseP = (uMouse - 0.5) * vec2(aspect, 1.0) * 1.8;
    float mouseDist = length(p - mouseP);

    // Subtle magnetic cursor deformation: gentle fluid parting and refraction
    float mouseInfluence = exp(-mouseDist * 1.4) * uHover;
    vec2 mouseDrift = (p - mouseP) * mouseInfluence * 0.35;

    // Primary domain warping layer (smooth fluid displacement)
    vec2 q = vec2(
      snoise(p * 0.55 + vec2(t * 0.45, t * 0.35) + mouseDrift * 0.6),
      snoise(p * 0.55 + vec2(-t * 0.35, t * 0.40) - mouseDrift * 0.6)
    );

    // Secondary harmonic layer (silky ribbon folding)
    vec2 r = vec2(
      snoise(p * 0.75 + 1.1 * q + vec2(2.4, 6.7) + t * 0.2),
      snoise(p * 0.75 + 1.1 * q + vec2(7.8, 1.9) - t * 0.15)
    );

    // Final scalar fluid density
    float f = 0.5 + 0.5 * snoise(p * 0.65 + 1.4 * r + t * 0.1);

    // Subtle 3D normal & specular sheen calculation
    float eps = 0.02;
    float fRight = snoise((p + vec2(eps, 0.0)) * 0.65 + 1.4 * r);
    float fUp    = snoise((p + vec2(0.0, eps)) * 0.65 + 1.4 * r);
    vec3 normal = normalize(vec3((f - fRight) / eps, (f - fUp) / eps, 1.6));

    // Dynamic light direction following cursor softly in 3D
    vec3 lightPos = vec3(mouseP.x, mouseP.y, 1.8);
    vec3 lightDir = normalize(lightPos - vec3(p, 0.0));
    float specular = pow(max(dot(normal, lightDir), 0.0), 12.0) * (0.05 + 0.08 * uHover);

    // Wavo Brand Palette
    // Coral: #fa6e69 -> rgb(0.98, 0.43, 0.41)
    // Peach: #ffbc7d -> rgb(1.00, 0.74, 0.49)
    // Rose:  #ff8a85 -> rgb(1.00, 0.54, 0.52)
    vec3 coralColor = vec3(0.98, 0.431, 0.412);
    vec3 peachColor = vec3(1.00, 0.737, 0.490);
    vec3 roseColor  = vec3(1.00, 0.541, 0.522);

    // Color gradient mixing based on fluid density 'f'
    vec3 fluidColor = mix(peachColor, coralColor, smoothstep(0.3, 0.7, f));
    fluidColor = mix(fluidColor, roseColor, smoothstep(0.65, 0.95, f));

    // Add subtle 3D specular highlight
    fluidColor += vec3(specular * 1.1, specular * 0.9, specular * 0.8);

    // --- Theme Adaptations ---
    // Light mode: Ultra-clean, luminous porcelain base with very subtle warm gradient tint
    // Dark mode: Deep obsidian velvet base with glowing warm embers
    vec3 baseLight = vec3(0.98, 0.98, 0.99); // #fafafc
    vec3 baseDark  = vec3(0.031, 0.043, 0.075); // #080b13

    // Vignette / Radial falloff so the center remains calm and edges fade softly
    float radialFalloff = smoothstep(1.6, 0.1, length(p * vec2(0.7, 1.0)));

    // Interactive cursor local glow
    float cursorGlow = exp(-mouseDist * 1.8) * 0.12 * uHover;

    // Density factor: keep it soft and restrained (subtle, non-distracting)
    float lightOpacity = (0.08 + 0.14 * f + cursorGlow) * radialFalloff;
    float darkOpacity  = (0.12 + 0.22 * f + cursorGlow * 1.5) * radialFalloff;

    vec3 finalColor;
    float finalAlpha;

    if (uDark > 0.5) {
      finalColor = mix(baseDark, fluidColor, darkOpacity);
      finalAlpha = clamp(darkOpacity * 1.4, 0.0, 0.9);
    } else {
      finalColor = mix(baseLight, fluidColor, lightOpacity);
      finalAlpha = clamp(lightOpacity * 1.3, 0.0, 0.65);
    }

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

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

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // --- WebGL Renderer ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Shader Material on Fullscreen Quad ---
    const uniforms = {
      uResolution: { value: new THREE.Vector2(width, height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uDark: { value: isDark ? 1.0 : 0.0 },
      uHover: { value: 0.0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    const quadGeometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(quadGeometry, material);
    scene.add(quad);

    // --- Cursor Tracking & Smooth Easing ---
    const targetMouse = { x: 0.5, y: 0.5 };
    const currentMouse = { x: 0.5, y: 0.5 };
    let targetHover = 0.0;
    let currentHover = 0.0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height; // Invert Y for GL coordinates

      targetMouse.x = Math.max(0.0, Math.min(1.0, x));
      targetMouse.y = Math.max(0.0, Math.min(1.0, y));
      targetHover = 1.0;
    };

    const handlePointerLeave = () => {
      targetHover = 0.0;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    // --- Animation & Visibility ---
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

      // Silky, gentle interpolation (damping) for serene, non-jarring motion
      const lerpFactor = 0.025;
      currentMouse.x += (targetMouse.x - currentMouse.x) * lerpFactor;
      currentMouse.y += (targetMouse.y - currentMouse.y) * lerpFactor;
      currentHover += (targetHover - currentHover) * 0.04;

      // Update uniforms
      uniforms.uTime.value = elapsed;
      uniforms.uMouse.value.set(currentMouse.x, currentMouse.y);
      uniforms.uHover.value = currentHover;
      uniforms.uDark.value = themeRef.current ? 1.0 : 0.0;

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // --- Resize Handling ---
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 0 && newH > 0) {
          renderer.setSize(newW, newH);
          uniforms.uResolution.value.set(newW, newH);
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

      quadGeometry.dispose();
      material.dispose();
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
        // Smooth bottom fade so it blends seamlessly into the next sections
        maskImage:
          "linear-gradient(to bottom, black 60%, rgba(0,0,0,0.4) 85%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 60%, rgba(0,0,0,0.4) 85%, transparent 100%)",
      }}
      aria-hidden="true"
    />
  );
}

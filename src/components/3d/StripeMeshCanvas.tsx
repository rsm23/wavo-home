"use client";

import React, { useEffect, useRef } from "react";

export default function StripeMeshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") || (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) {
      // Fallback for browsers with disabled WebGL
      return;
    }

    const vsSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      varying vec2 vUv;

      // Simplex noise implementation
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
          + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        vec2 mouse = uMouse / uResolution.xy;
        
        // Fluid angle coordinate displacement (Stripe slant aesthetic)
        vec2 slantedUv = vec2(uv.x * 0.85 + uv.y * 0.35, uv.y * 0.9 - uv.x * 0.15);
        
        float t = uTime * 0.15;
        
        // Complex fluid multi-octave noise
        float n1 = snoise(slantedUv * 2.2 + vec2(t * 0.4, -t * 0.3));
        float n2 = snoise(slantedUv * 4.0 - vec2(t * 0.2, t * 0.5) + vec2(n1 * 0.5));
        float n3 = snoise(slantedUv * 1.5 + vec2(-t * 0.3, t * 0.1) + (mouse * 0.4));
        
        // Combine wave harmonics
        float wave = sin((slantedUv.x + slantedUv.y + n1 * 0.4 + n2 * 0.25) * 4.0 + t) * 0.5 + 0.5;
        wave += n3 * 0.2;

        // Stripe color palette:
        // C1: Deep Electric Indigo #4338ca
        // C2: Vibrant Cyan #06b6d4
        // C3: Rich Violet #8b5cf6
        // C4: Warm Peach / Coral #f97316
        // C5: Clean Canvas Soft White #f8fafc
        vec3 cIndigo = vec3(0.24, 0.22, 0.86);
        vec3 cCyan   = vec3(0.02, 0.71, 0.83);
        vec3 cViolet = vec3(0.55, 0.36, 0.96);
        vec3 cPeach  = vec3(0.98, 0.45, 0.12);
        vec3 cLight  = vec3(0.98, 0.99, 1.0);

        // Multi-stop smooth gradient blend
        vec3 col = mix(cLight, cIndigo, smoothstep(0.1, 0.45, wave + n1 * 0.2));
        col = mix(col, cCyan, smoothstep(0.4, 0.7, wave + n2 * 0.25));
        col = mix(col, cViolet, smoothstep(0.65, 0.9, wave + n3 * 0.3));
        col = mix(col, cPeach, smoothstep(0.85, 1.1, wave + n1 * 0.35));

        // Soft fade out at bottom edges for natural blend with page background
        float edgeAlpha = smoothstep(0.0, 0.25, uv.y) * smoothstep(1.0, 0.7, uv.y * 0.5);
        
        gl_FragColor = vec4(col, 0.82 * edgeAlpha);
      }
    `;

    function compileShader(type: number, source: string) {
      if (!gl) return null;
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("Program linking error:", gl.getProgramInfoLog(program));
      return;
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionAttr = gl.getAttribLocation(program, "position");
    const timeUniform = gl.getUniformLocation(program, "uTime");
    const resolutionUniform = gl.getUniformLocation(program, "uResolution");
    const mouseUniform = gl.getUniformLocation(program, "uMouse");

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationId: number;
    let startTime = performance.now();

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const displayWidth = Math.floor(canvas.clientWidth * dpr);
      const displayHeight = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    window.addEventListener("resize", resize);
    resize();

    const render = () => {
      if (!gl || !canvas) return;

      resize();

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const elapsed = (performance.now() - startTime) * 0.001;

      gl.useProgram(program);

      gl.enableVertexAttribArray(positionAttr);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttr, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(timeUniform, elapsed);
      gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
      gl.uniform2f(mouseUniform, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-65 dark:opacity-40 transition-opacity duration-1000"
        style={{
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 30%, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 30%, black 40%, transparent 85%)",
        }}
      />
      {/* Subtle secondary ambient glow mesh */}
      <div 
        className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"
      />
      <div 
        className="absolute top-20 right-10 w-[500px] h-[500px] bg-cyan-400/15 rounded-full blur-[140px] pointer-events-none"
      />
    </div>
  );
}

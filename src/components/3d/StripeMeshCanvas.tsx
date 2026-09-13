"use client";

import React, { useEffect, useRef } from "react";

export default function StripeMeshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") || (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

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
        
        vec2 slantedUv = vec2(uv.x * 0.88 + uv.y * 0.38, uv.y * 0.85 - uv.x * 0.18);
        float t = uTime * 0.12;
        
        float n1 = snoise(slantedUv * 1.8 + vec2(t * 0.3, -t * 0.2));
        float n2 = snoise(slantedUv * 3.0 - vec2(t * 0.2, t * 0.35) + vec2(n1 * 0.35));
        float n3 = snoise(slantedUv * 1.3 + vec2(-t * 0.2, t * 0.1) + (mouse * 0.25));
        
        float wave = sin((slantedUv.x + slantedUv.y + n1 * 0.3 + n2 * 0.2) * 3.2 + t) * 0.5 + 0.5;
        wave += n3 * 0.15;

        // Official Wavo Brand Palette:
        // cDark: Midnight Navy #080b13
        // cNavy: Deep Navy #1c2639
        // cCoral: Wavo Official Coral #fa6e69
        // cPeach: Wavo Warm Peach #ffbc7d
        // cRose: Warm Ruby #e0534e
        vec3 cDark  = vec3(0.031, 0.043, 0.075);
        vec3 cNavy  = vec3(0.11, 0.15, 0.22);
        vec3 cCoral = vec3(0.98, 0.43, 0.41);
        vec3 cPeach = vec3(1.0, 0.74, 0.49);
        vec3 cRose  = vec3(0.88, 0.32, 0.30);

        vec3 col = mix(cDark, cNavy, smoothstep(0.1, 0.45, wave + n1 * 0.2));
        col = mix(col, cRose, smoothstep(0.4, 0.7, wave + n2 * 0.22));
        col = mix(col, cCoral, smoothstep(0.65, 0.9, wave + n3 * 0.25));
        col = mix(col, cPeach, smoothstep(0.85, 1.05, wave + n1 * 0.28));

        float edgeAlpha = smoothstep(0.0, 0.25, uv.y) * smoothstep(1.0, 0.6, uv.y * 0.6);
        
        gl_FragColor = vec4(col, 0.55 * edgeAlpha);
      }
    `;

    function compileShader(type: number, source: string) {
      if (!gl) return null;
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
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

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0,  1.0, -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0, -1.0,  1.0,  1.0,
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
        className="w-full h-full opacity-70 transition-opacity duration-1000"
        style={{
          maskImage: "radial-gradient(ellipse 85% 65% at 50% 25%, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 65% at 50% 25%, black 40%, transparent 90%)",
        }}
      />
      {/* Wavo Coral Ambient Glows */}
      <div className="absolute -top-32 left-1/3 w-[650px] h-[650px] bg-[#fa6e69]/15 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-48 right-10 w-[550px] h-[550px] bg-[#ffbc7d]/10 rounded-full blur-[180px] pointer-events-none" />
    </div>
  );
}

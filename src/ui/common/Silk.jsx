import { useEffect, useRef } from "react";

/**
 * Silk — WebGL-based silky fluid wave background component (React Bits inspired)
 * ─────────────────────────────────────────────────────────────────────────────
 * Props:
 * • speed: animation speed multiplier (default: 2)
 * • scale: zoom / wave frequency scale (default: 1)
 * • color: base hex color tint (default: "#2563EB")
 * • noiseIntensity: intensity of fluid turbulence (default: 1.5)
 * • rotation: rotation angle in radians or degrees (default: 0)
 */

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  if (clean.length === 3) {
    const r = ((num >> 8) & 0xf) * 17;
    const g = ((num >> 4) & 0xf) * 17;
    const b = (num & 0xf) * 17;
    return [r / 255, g / 255, b / 255];
  }
  return [((num >> 16) & 0xff) / 255, ((num >> 8) & 0xff) / 255, (num & 0xff) / 255];
}

const VERTEX_SHADER = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = (position + 1.0) * 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uNoiseIntensity;
uniform float uRotation;

// 2D Rotation
vec2 rotate(vec2 p, float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c) * p;
}

// Simplex-style noise approximation
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 st = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
  st = rotate(st, uRotation);
  st *= (2.2 * uScale);

  float t = uTime * uSpeed * 0.15;

  // Layered wavy displacement resembling satin / silk folds
  vec2 q = vec2(0.0);
  q.x = snoise(st + vec2(0.0, t * 0.4)) * uNoiseIntensity;
  q.y = snoise(st + vec2(t * 0.3, 0.0)) * uNoiseIntensity;

  vec2 r = vec2(0.0);
  r.x = snoise(st + 1.2 * q + vec2(1.7, 9.2) + 0.15 * t);
  r.y = snoise(st + 1.2 * q + vec2(8.3, 2.8) + 0.126 * t);

  float f = snoise(st + 1.8 * r + vec2(t * 0.2, t * 0.1));

  // Specular sheen & depth
  float fold = sin(f * 3.14159 + t) * 0.5 + 0.5;
  float highlight = pow(fold, 3.5) * 0.7;

  // Blue gradient tinting
  vec3 darkBg   = vec3(0.02, 0.02, 0.04);
  vec3 midTone  = uColor * 0.45;
  vec3 highTone = mix(uColor, vec3(0.58, 0.78, 1.0), 0.55);

  vec3 col = mix(darkBg, midTone, smoothstep(0.1, 0.8, f * 0.5 + 0.5));
  col = mix(col, highTone, highlight);

  // Soft edge vignette
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float vign = smoothstep(1.4, 0.2, length(uv - 0.5) * 1.5);
  col *= vign;

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function Silk({
  speed = 3,
  scale = 1,
  color = "#2563EB",
  noiseIntensity = 1.5,
  rotation = 0,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    // Create Shaders
    function createShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    // Quad geometry
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uResLoc = gl.getUniformLocation(program, "uResolution");
    const uColorLoc = gl.getUniformLocation(program, "uColor");
    const uSpeedLoc = gl.getUniformLocation(program, "uSpeed");
    const uScaleLoc = gl.getUniformLocation(program, "uScale");
    const uNoiseLoc = gl.getUniformLocation(program, "uNoiseIntensity");
    const uRotLoc = gl.getUniformLocation(program, "uRotation");

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
    resize();
    window.addEventListener("resize", resize);

    let rafId;
    const startTime = performance.now();

    const render = (now) => {
      resize();
      gl.useProgram(program);

      const elapsedTime = (now - startTime) * 0.001;
      const rgb = hexToRgb(color);

      gl.uniform1f(uTimeLoc, elapsedTime);
      gl.uniform2f(uResLoc, canvas.width, canvas.height);
      gl.uniform3f(uColorLoc, rgb[0], rgb[1], rgb[2]);
      gl.uniform1f(uSpeedLoc, speed);
      gl.uniform1f(uScaleLoc, scale);
      gl.uniform1f(uNoiseLoc, noiseIntensity);
      gl.uniform1f(uRotLoc, (rotation * Math.PI) / 180);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(buffer);
      }
    };
  }, [speed, scale, color, noiseIntensity, rotation]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}

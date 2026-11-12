import { useEffect, useRef } from "react";

const vertexShader = `
  attribute vec2 position;
  void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragmentShader = `
  precision mediump float;
  uniform vec2 resolution;
  uniform vec2 pointer;
  uniform float pointerStrength;
  uniform float time;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float clouds(vec2 p) {
    float value = 0.0;
    float amplitude = 0.55;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = mat2(1.65, -1.15, 1.15, 1.65) * p;
      amplitude *= 0.48;
    }
    return value;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float aspect = resolution.x / resolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    vec2 cursor = (pointer - 0.5) * vec2(aspect, 1.0);
    float t = time * 0.24;

    vec2 flow = vec2(
      clouds(p * 1.9 + vec2(t, -t * 0.53)),
      clouds(p * 1.9 + vec2(-t * 0.68, t * 0.8))
    ) - 0.52;
    vec2 warped = p + flow * 0.48;
    warped += vec2(
      sin(p.y * 3.1 + t * 1.25) * 0.075,
      cos(p.x * 2.6 - t) * 0.09
    );

    float cursorField = exp(-dot(p - cursor, p - cursor) * 5.0) * pointerStrength;
    warped += (p - cursor) * cursorField * 0.24;

    float detail = clouds(warped * 3.1 + vec2(t * 0.32, -t * 0.27));
    float wisps = smoothstep(0.28, 0.76, detail);
    float fold = smoothstep(0.27, 0.72, clouds(warped * 2.05 - flow * 0.7));

    vec2 blueCenter = vec2(-aspect * 0.38 + sin(t * 0.55) * 0.12, 0.3);
    vec2 violetCenter = vec2(aspect * 0.32 + cos(t * 0.48) * 0.1, 0.34);
    vec2 mistCenter = vec2(sin(t * 0.35) * 0.11, 0.14);
    float blue = exp(-dot((warped - blueCenter) * vec2(0.7, 1.1), (warped - blueCenter) * vec2(0.7, 1.1)) * 2.25);
    float violet = exp(-dot((warped - violetCenter) * vec2(0.8, 1.1), (warped - violetCenter) * vec2(0.8, 1.1)) * 2.3);
    float mist = exp(-dot((warped - mistCenter) * vec2(0.85, 1.5), (warped - mistCenter) * vec2(0.85, 1.5)) * 2.7);

    vec3 color = vec3(0.045, 0.065, 0.18);
    color += vec3(0.21, 0.31, 0.8) * blue * (0.36 + fold * 0.72);
    color += vec3(0.4, 0.3, 0.8) * violet * (0.3 + wisps * 0.72);
    color += vec3(0.44, 0.48, 0.67) * mist * (0.12 + wisps * 0.44);
    color += vec3(0.19, 0.22, 0.5) * wisps * 0.22;
    color += vec3(0.33, 0.38, 0.95) * cursorField * 0.38;
    float readingZone = exp(-dot(p * vec2(0.95, 1.3), p * vec2(0.95, 1.3)) * 1.8);
    color *= 1.0 - readingZone * 0.22;
    color *= 0.75 + 0.25 * smoothstep(0.05, 0.65, uv.y);
    color *= 0.94 + noise(uv * resolution * 0.3) * 0.06;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
}

export function HeroAtmosphere() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const hero = host?.parentElement;
    const gl = canvas?.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!host || !canvas || !hero || !gl) return;

    const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const resolution = gl.getUniformLocation(program, "resolution");
    const pointer = gl.getUniformLocation(program, "pointer");
    const pointerStrength = gl.getUniformLocation(program, "pointerStrength");
    const time = gl.getUniformLocation(program, "time");
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cursor = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, strength: 0, targetStrength: 0 };
    let frame = 0;
    let visible = true;
    let lastFrame = 0;

    const render = (seconds: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform2f(pointer, cursor.x, 1 - cursor.y);
      gl.uniform1f(pointerStrength, cursor.strength);
      gl.uniform1f(time, seconds);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const tick = (timestamp: number) => {
      cursor.x += (cursor.targetX - cursor.x) * 0.09;
      cursor.y += (cursor.targetY - cursor.y) * 0.09;
      cursor.strength += (cursor.targetStrength - cursor.strength) * 0.1;
      if (timestamp - lastFrame >= 30) {
        render(timestamp * 0.001);
        lastFrame = timestamp;
      }
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const start = () => {
      if (frame || !visible || document.hidden) return;
      if (motionPreference.matches) render(0);
      else frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      const rect = host.getBoundingClientRect();
      const density = Math.min(window.devicePixelRatio || 1, 1.25) * 0.72;
      canvas.width = Math.max(1, Math.round(rect.width * density));
      canvas.height = Math.max(1, Math.round(rect.height * density));
      render(motionPreference.matches ? 0 : performance.now() * 0.001);
    };
    const move = (event: PointerEvent) => {
      if (motionPreference.matches) return;
      const rect = hero.getBoundingClientRect();
      cursor.targetX = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      cursor.targetY = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      cursor.targetStrength = 1;
    };
    const leave = () => {
      cursor.targetStrength = 0;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    const onPreference = () => {
      stop();
      cursor.strength = 0;
      cursor.targetStrength = 0;
      start();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      if (visible) start();
      else stop();
    });
    intersectionObserver.observe(hero);
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", leave);
    hero.addEventListener("pointerup", leave);
    document.addEventListener("visibilitychange", onVisibility);
    motionPreference.addEventListener("change", onPreference);
    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      hero.removeEventListener("pointerup", leave);
      document.removeEventListener("visibilitychange", onVisibility);
      motionPreference.removeEventListener("change", onPreference);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return (
    <div ref={hostRef} className="hero-atmosphere" aria-hidden="true">
      <span className="hero-cloud hero-cloud--left" />
      <span className="hero-cloud hero-cloud--right" />
      <span className="hero-cloud hero-cloud--low" />
      <canvas ref={canvasRef} className="hero-current" />
    </div>
  );
}

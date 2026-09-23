import { useEffect, useRef } from "react";

interface CybersecurityShieldProps {
  className?: string;
  wrapperRef?: React.Ref<HTMLDivElement>;
}

const VS_SOURCE = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  v_uv.y = 1.0 - v_uv.y;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FS_SOURCE = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_texture;

void main() {
  vec4 color = texture2D(u_texture, v_uv);
  
  float r = color.r;
  float g = color.g;
  float b = color.b;
  float maxC = max(r, max(g, b));
  
  // Outer boundary fade to completely eliminate any edge artifacts
  float dx = abs(v_uv.x - 0.5);
  float edgeFade = clamp((0.45 - dx) / 0.08, 0.0, 1.0);
  
  // Soft noise gate to eliminate black compression noise
  float noiseGate = smoothstep(0.015, 0.045, maxC);
  
  // Solid shield opacity (metal reflections and bright neon lines)
  float isMetal = min(g, b);
  float metalOpacity = clamp((isMetal - 0.02) / 0.06, 0.0, 1.0);
  float neonOpacity = clamp((r - 0.25) / 0.25, 0.0, 1.0);
  float solidAlpha = max(metalOpacity, neonOpacity);
  
  // Premultiplied alpha output:
  // Glow acts as additive light, solid metal blocks background
  vec3 outRgb = color.rgb * edgeFade * noiseGate;
  float outAlpha = solidAlpha * edgeFade * noiseGate;
  
  gl_FragColor = vec4(outRgb, outAlpha);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function CybersecurityShield({
  className = "",
  wrapperRef,
}: CybersecurityShieldProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    /* ------------------------------------------------------------- */
    /* 1. WebGL Initialization with Premultiplied Alpha              */
    /* ------------------------------------------------------------- */
    const gl =
      canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: true }) ||
      (canvas.getContext("experimental-webgl", {
        alpha: true,
        premultipliedAlpha: true,
      }) as WebGLRenderingContext | null);

    if (!gl) {
      console.warn("WebGL not supported for shield transparency");
      return;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, VS_SOURCE);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FS_SOURCE);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full-screen Quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Texture for video frames
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);

    /* ------------------------------------------------------------- */
    /* 2. Video Autoplay & Seamless Looping Management               */
    /* ------------------------------------------------------------- */
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          const unlock = () => {
            video.play().catch(() => {});
            window.removeEventListener("pointerdown", unlock);
            window.removeEventListener("scroll", unlock);
            window.removeEventListener("keydown", unlock);
          };
          window.addEventListener("pointerdown", unlock, { once: true });
          window.addEventListener("scroll", unlock, { once: true });
          window.addEventListener("keydown", unlock, { once: true });
        });
      }
    };

    playVideo();

    const handleEnded = () => {
      video.currentTime = 0;
      playVideo();
    };

    const handleVisibility = () => {
      if (!document.hidden && video.paused) {
        playVideo();
      }
    };

    video.addEventListener("ended", handleEnded);
    document.addEventListener("visibilitychange", handleVisibility);

    /* ------------------------------------------------------------- */
    /* 3. Real-time Render Loop                                      */
    /* ------------------------------------------------------------- */
    let animId: number;
    let isMounted = true;

    const render = () => {
      if (!isMounted) return;

      if (video.readyState >= 2 && !video.paused) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      video.removeEventListener("ended", handleEnded);
      document.removeEventListener("visibilitychange", handleVisibility);

      if (texture) gl.deleteTexture(texture);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (program) gl.deleteProgram(program);
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`about-shield-wrapper ${className}`} aria-hidden="true">
      <video
        ref={videoRef}
        className="about-shield-video-source"
        src="/images/cybersecurity_shield.mp4"
        crossOrigin="anonymous"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        style={{ display: "none" }}
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className="about-shield-canvas"
        width={1280}
        height={720}
        aria-hidden="true"
      />
    </div>
  );
}

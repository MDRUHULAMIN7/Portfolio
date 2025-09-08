"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Intro({ onFinish }) {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef();
  const sceneRef = useRef();
  const rendererRef = useRef();
  const cameraRef = useRef();
  const particlesRef = useRef();

  useEffect(() => {
    if (!show) return;

    // === Progress Bar Simulation ===
    let progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2; // ~2% every tick
      });
    }, 40); // fill ~2 seconds total

    // === THREE.js Setup ===
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0a0a, 1);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    camera.position.z = 5;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 600;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = (Math.random() - 0.5) * 15;

      colors[i] = 0.2 + Math.random() * 0.3;
      colors[i + 1] = 0.4 + Math.random() * 0.4;
      colors[i + 2] = 0.8 + Math.random() * 0.2;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.012,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      if (!show) return;
      const time = clock.getElapsedTime();
      if (particlesRef.current) {
        particlesRef.current.rotation.y = time * 0.08;
        particlesRef.current.rotation.x = time * 0.03;
      }
      camera.position.x = Math.sin(time * 0.3) * 0.08;
      camera.position.y = Math.cos(time * 0.3) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Auto finish in ~2s
    const timer = setTimeout(() => {
      if (window.gsap) {
        window.gsap.to(".intro-container", {
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            setShow(false);
            onFinish && onFinish();
          },
        });
      } else {
        setShow(false);
        onFinish && onFinish();
      }
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
      if (renderer) renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, [show, onFinish]);

  if (!show) return null;

  return (
    <div className="intro-container fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-sm">
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        <h1 className="intro-name text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6 text-transparent bg-gradient-to-r from-cyan-300 via-cyan-600 to-pink-700 bg-clip-text leading-tight">
          Welcome to My Portfolio
        </h1>
        <h1 className="intro-name text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6 text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text leading-tight">
          Md. Ruhul Amin
        </h1>
        <div className="intro-role relative px-6 border border-slate-500/50 rounded-full bg-slate-800/40 backdrop-blur-sm shadow-lg">
          <p className="text-lg md:text-xl lg:text-2xl font-semibold text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">
            Frontend Developer
          </p>
        </div>
        <div className="intro-line w-48 md:w-64 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent mt-8 mb-6"></div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-slate-700/40 rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="loading-text text-slate-400 text-xs tracking-widest font-mono mt-2">
          INITALIZING {progress}%
        </p>
      </div>
    </div>
  );
}

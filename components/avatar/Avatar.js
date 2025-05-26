"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import Image from "next/image";


function MovingDots() {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000 * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 100;
      arr[i + 1] = (Math.random() - 0.5) * 100;
      arr[i + 2] = (Math.random() - 0.5) * 100;
    }
    return arr;
  }, []);

  useFrame(() => {
    const positionsAttr = ref.current.geometry.attributes.position;
    for (let i = 0; i < positionsAttr.count; i++) {
      let y = positionsAttr.getY(i);
      y += 0.04;
      if (y > 50) y = -50;
      positionsAttr.setY(i, y);
    }
    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00ffff"
        size={0.17}
        sizeAttenuation
        transparent
        opacity={0.5}
      />
    </points>
  );
}

function Avatar({ avatarData }) {
  return (
    <div className="relative w-full h-[80vh] sm:h-[100vh] pt-10 sm:pt-0 overflow-hidden">
      <div
        className="absolute top-0 w-full  -right-6 md:-right-4"
        style={{ zIndex: -1, transform: "scaleX(-1)" }}
      >
        <Image
          src={"/bg-blue.svg"}
          alt="Hero"
          height={800}
          width={500}
          className=" border-0 h-[550px]   sm:h-[400px] md:h-[600px] lg:h-[800px] w-[1000px] sm:w-[800px] lg:w-[1200px] "
        />
      </div>
      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }

        .stroke-text {
          -webkit-text-stroke: 1px white;
          color: transparent;
        }

        .fade-mask {
          mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
          -webkit-mask-image: linear-gradient(
            to bottom,
            black 80%,
            transparent 100%
          );
        }
      `}</style>

      {/* Canvas Stars Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 20] }}>
          <MovingDots />
        </Canvas>
      </div>

      <h2 className="absolute top-60 md:top-72 lg:top-78 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-center 2xl:text-7xl lg:text-6xl  md:text-8xl  sm:text-6xl text-4xl font-bold text-white z-10 bounce-slow">
        {avatarData[0]?.title2}
      </h2>

      <div className="relative z-20 flex justify-center items-center h-full md:mt-20 pt-2">
        <div className="relative fade-mask">
          <Image
            src={avatarData[0]?.photo}
            alt="Hero"
            height={800}
            width={500}
            className=" w-[900px]  z-30"
          />
        </div>
      </div>
      <h2 className="absolute bottom-16 sm:bottom-12 md:-bottom-2 lg:bottom-4 xl:bottom-0 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-center 2xl:text-7xl lg:text-6xl  md:text-8xl  sm:text-6xl text-4xl font-bold stroke-text bounce-slow z-20">
        {avatarData[0]?.title1}
      </h2>
    </div>
  );
}

export default Avatar;

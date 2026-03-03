"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState } from "react";
import Image from "next/image";

const HERO_TITLE_TOP = "WEB DESIGNER";
const HERO_TITLE_BOTTOM = "WEB DEVELOPER";
const HERO_PHOTO_SRC = "https://res.cloudinary.com/dpomtzref/image/upload/v1748089262/profile11_pn0hqh.png";

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

function Avatar() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const handleHeroLoaded = () => setHeroLoaded(true);
  return (
    <div className="relative w-full h-[80vh] sm:h-[100vh] pt-10 2xl:pt-0 sm:pt-0 overflow-hidden">
      <div
        className="absolute top-0  w-full  -right-6 md:-right-4"
        style={{ zIndex: 1, transform: "scaleX(-1)" }}
      >
        <Image
          src={"/bg-blue.svg"}
          alt="Hero"
          height={800}
          width={500}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 1200px"
          priority
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

      <h2 className="absolute top-60 md:top-72 lg:top-78 2xl:top-55 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-center 2xl:text-[65px] lg:text-6xl  md:text-8xl  sm:text-6xl text-4xl font-bold text-white z-10 bounce-slow">
        {HERO_TITLE_TOP}
      </h2>

      <div className="relative z-20 flex justify-center items-center h-full md:mt-20 2xl:mt-0 pt-2">
        <div className="relative fade-mask">
          {!heroLoaded && (
            <div className="absolute inset-0 rounded-full bg-gray-800/80 animate-pulse z-20 pointer-events-none" />
          )}
          <Image
            src={HERO_PHOTO_SRC}
            alt="Hero"
            height={800}
            width={500}
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 60vw, 40vw"
            className="relative w-[900px] z-30"
            priority
            onLoadingComplete={handleHeroLoaded}
            onError={handleHeroLoaded}
          />
        </div>
      </div>
      <h2 className="absolute bottom-16 sm:bottom-12 md:-bottom-2 lg:bottom-4 xl:bottom-0 2xl:bottom-40 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-center 2xl:text-[62px] lg:text-6xl  md:text-8xl  sm:text-6xl text-4xl font-bold stroke-text bounce-slow z-20">
        {HERO_TITLE_BOTTOM}
      </h2>
    </div>
  );
}

export default Avatar;


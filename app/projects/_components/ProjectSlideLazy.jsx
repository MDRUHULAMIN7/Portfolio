"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ProjectSlideDynamic = dynamic(() => import("./ProjectSlide"), {
  ssr: false,
});

export default function ProjectSlideLazy({ images }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{inView ? <ProjectSlideDynamic images={images} /> : null}</div>;
}

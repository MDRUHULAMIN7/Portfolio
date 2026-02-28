"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const BlogSliderDynamic = dynamic(
  () => import("./BlogSlider").then((m) => m.default),
  { ssr: false, loading: () => null },
);

export default function BlogSliderLazy({ blogs }) {
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
      { rootMargin: "200px" },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>{inView ? <BlogSliderDynamic blogs={blogs} /> : null}</div>
  );
}

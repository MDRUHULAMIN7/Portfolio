"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const TestimonialCardDynamic = dynamic(() => import("./TestimonialCard"), {
  ssr: false,
});

export default function TestimonialClientWrapper({ testimonials }) {
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

  return <div ref={ref}>{inView ? <TestimonialCardDynamic testimonials={testimonials} /> : null}</div>;
}

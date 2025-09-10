"use client";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function LoveButton({ projectId, initialLoves, loves, setLoves}) {
const [loved, setLoved] = useState(false);



  useEffect(() => {
    const saved = localStorage.getItem(`loved-${projectId}`);
    if (saved === "true") {
      setLoved(true);
    }
  }, [projectId]);

  const handleToggleLove = async () => {
    const newLoved = !loved;
    setLoved(newLoved);

    // Update loves locally and in local storage
    const newLoves = newLoved ? loves + 1 : Math.max(loves - 1, 0);
    setLoves(newLoves);

  
    if (newLoved) {
      localStorage.setItem(`loved-${projectId}`, "true");
    } else {
      localStorage.removeItem(`loved-${projectId}`);
    }

    // Send the current loves count to API
    await fetch(`/api/projects/${projectId}/love`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loves: newLoves }), 
    });
  };


  return (
    <button
      onClick={handleToggleLove}
      className="flex items-center justify-center mx-auto gap-2"
    >
      <Heart
        className={`w-5 h-5 transition-all duration-200 ${
          loved ? "text-cyan-400 fill-cyan-400 scale-110" : "text-gray-100"
        } hover:animate-pulse`}
      />
      <span className="relative z-10">{loved ? "Loved" : "Love"} </span>
    </button>
  );
}

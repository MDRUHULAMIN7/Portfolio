"use client";

import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import StarButton from "./StarButton";
import LoveButton from "./LoveButton";
import { useState } from "react";


export default function MetaDatas({ meta, links,projectId }) {
    const [loves, setLoves] = useState(meta.loves || 0);
  return (
    <div className="space-y-3">
  
      <p>
        <strong>Type:</strong> {meta.type ?? "N/A"}
      </p>
      <p>
        <strong>Service:</strong> {meta.service ?? "N/A"}
      </p>
      <p>
        <strong>Budget:</strong> {meta.budget ? `$${meta.budget}` : "$0"}
      </p>
      <p>
        <strong>Start Date:</strong> {meta.startDate ? new Date(meta.startDate).toLocaleDateString() : "N/A"}
      </p>
      <p>
        <strong>End Date:</strong> {meta.endDate ? new Date(meta.endDate).toLocaleDateString() : "N/A"}
      </p>
      <p>
        <strong>Loves:</strong> {loves ?? 0}
      </p>

      {/* Action buttons */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
  


    <StarButton>
     <LoveButton projectId={projectId} loves={loves} setLoves={setLoves} />


   </StarButton>
 

  {links?.[0]?.live && (
      <StarButton>
    <Link
      href={links[0].live}
      className="flex items-center justify-center mx-auto gap-2"
    >
     <ExternalLink  className="w-5 h-5  hover:animate-pulse" />
    <span className="relative z-10 ">Live</span> 
    </Link>
    </StarButton>
  )}


  {links?.[0]?.repo && (
      <StarButton>
    <Link
      href={links[0].repo}
   className="flex items-center justify-center mx-auto gap-2"
    >
     <Github className="w-5 h-5  hover:animate-pulse" />

    <span className="relative z-10 ">Repo</span> 
    </Link>
    </StarButton>
  )}
</div>

    </div>
  );
}

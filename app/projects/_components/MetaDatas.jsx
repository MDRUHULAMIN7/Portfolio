import { Heart } from "lucide-react";
import Link from "next/link";


export default function MetaDatas({ meta, links }) {
  return (
    <div className="space-y-3">
      {/* Explicit meta fields */}
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
        <strong>Loves:</strong> {meta.loves ?? 0}
      </p>

      {/* Action buttons */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
  {/* Love Button */}
  <button className="glow-button flex  group  items-center gap-x-2 btn-accent">
    <Heart className="w-5 h-5 text-cyan-400 group-hover:text-white  group-hover:animate-pulse" />
    <span className="relative z-10 ">Love</span>
   
  </button>

  {/* Live Project Button */}
  {links?.[0]?.live && (
    <Link
      href={links[0].live}
    
    
      className="btn-primary"
    >
      View Project
    </Link>
  )}

  {/* Repo Button */}
  {links?.[0]?.repo && (
    <Link
      href={links[0].repo}

      className="btn-secondary"
    >
      View Repo
    </Link>
  )}
</div>

    </div>
  );
}

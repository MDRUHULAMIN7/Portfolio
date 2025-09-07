"use client";
import { useState } from "react";
import { Edit3 } from "lucide-react";
import ModalWrapper from "@/components/ModalWrapper";
import EditSocialModal from "./EditSocialMOdal";


export default function SocialsTable({ socials: initialSocials }) {
  const [socials, setSocials] = useState(initialSocials);
  const [editSocial, setEditSocial] = useState(null);

  const handleEditSuccess = (updated) => {
    setSocials((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
  };

  return (
    <div>
      <div className=" max-w-sm sm:max-md md:max-w-xl lg:max-w-3xl mx-auto">

        <div className=" p-3">
          {socials.map((social) => (
            <div
              key={social.id}
              className="border border-gray-700 rounded-lg p-4 space-y-4 shadow-sm "
            >
              <p>
                <span className="font-semibold">LinkedIn:</span>{" "}
                <a href={social.linkedin}>{social.linkedin}</a>
              </p>
              <p>
                  <a href={social.github}><span className="font-semibold">GitHub:</span> {social.github}</a>
              </p>
              <p>
                <span className="font-semibold">Facebook:</span>{" "}
                <a href={social.facebook}>{social.facebook}</a>
              </p>
           

              <div className="mt-3">
                <button
                  onClick={() => setEditSocial(social)}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  <Edit3 className="w-4 h-4" /> Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <ModalWrapper isOpen={!!editSocial} onClose={() => setEditSocial(null)}>
        {editSocial && (
          <EditSocialModal
            social={editSocial}
            onClose={() => setEditSocial(null)}
            onSuccess={handleEditSuccess}
          />
        )}
      </ModalWrapper>
    </div>
  );
}

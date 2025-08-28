"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import Heading from "@/components/Heading";

// Helper to format date object to YYYY-MM-DD
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

export const EditProject = ({ projectData, projectId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const defaultValues = projectData
    ? {
        ...projectData,
        meta: {
          ...projectData.meta,
          startDate: formatDate(projectData.meta?.startDate),
          endDate: formatDate(projectData.meta?.endDate),
        },
      }
    : {
        title: "",
        status: "unpublish",
        description: "",
        meta: {
          type: "",
          service: "",
          budget: 0,
          startDate: "",
          endDate: "",
          loves: 0,
        },
        images: [""],
        hashtags: [""],
        links: [{ live: "", repo: "" }],
        techStack: [{ name: "", value: "" }],
        features: [{ group: "Customers", items: [{ text: "" }] }],
      };

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm({ defaultValues });

  const watchAllFields = watch();

  // Detect changes
  useEffect(() => {
    if (projectData) {
      setHasChanges(JSON.stringify(defaultValues) !== JSON.stringify(watchAllFields));
    }
  }, [watchAllFields, defaultValues]);


  useEffect(() => {
    if (projectData) reset(defaultValues);
  }, [projectData, reset]);

  const { fields: imageFields, append: addImage } = useFieldArray({ control, name: "images" });
  const { fields: techFields, append: addTech } = useFieldArray({ control, name: "techStack" });
  const { fields: featureGroups, append: addFeatureGroup } = useFieldArray({ control, name: "features" });
  const { fields: linkFields, append: addLink, remove: removeLink } = useFieldArray({ control, name: "links" });
  const { fields: hashtagFields, append: appendHashtag, remove: removeHashtag } = useFieldArray({ control, name: "hashtags" });

  
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      
      if (!data.meta.startDate) data.meta.startDate = null;
      if (!data.meta.endDate) data.meta.endDate = null;

      const res = await fetch( `/api/projects/${projectId}/edit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setIsLoading(false);

      if (result.success) {
        toast.success( "Project updated!");
        if (!projectId) reset();
      } else {
        toast(result.error || "Failed to submit project.");
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      toast("Network error. Please try again!");
    }
  };

  if (isLoading) {
    return (
          <div className="z-50 fixed inset-0 flex items-center justify-center bg-[#0d1622] backdrop-blur-md">
      <div className="flex gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-cyan-400 shadow-[0_0_15px_5px_#00ffff] animate-bounce"
          
          />
        ))}
      </div>
    </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl bg-[#1f2937] rounded-lg shadow-md mx-auto p-6 space-y-8">
     
      <Heading title1={"Update Project" } title2={'Edit & Update Project'}></Heading>
  

      {/* Basic Info */}
      <div className="space-y-4">
        <label className="label">Project Title *</label>
        <input {...register("title", { required: "Title is required" })} className="input-field" placeholder="Project title" />
        {errors.title && <p className="text-red-400 text-sm">{errors.title.message}</p>}

        <label className="label mt-2">Description *</label>
        <textarea {...register("description", { required: "Description is required" })} className="input-field resize-none" rows={6} placeholder="Project description" />
        {errors.description && <p className="text-red-400 text-sm">{errors.description.message}</p>}
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="label">Type *</label>
          <input {...register("meta.type", { required: "Type is required" })} className="input-field" placeholder="Web App, Mobile App..." />
        </div>
        <div>
          <label className="label">Service *</label>
          <input {...register("meta.service", { required: "Service is required" })} className="input-field" placeholder="Development, Design..." />
        </div>
        <div>
          <label className="label">Budget</label>
          <input {...register("meta.budget", { valueAsNumber: true })} type="number" className="input-field" placeholder="Budget" />
        </div>
        <div>
          <label className="label">Start Date *</label>
          <input {...register("meta.startDate", { required: "Start date is required" })} type="date" className="input-field" />
          {errors.meta?.startDate && <p className="text-red-400 text-sm">{errors.meta.startDate.message}</p>}
        </div>
        <div>
          <label className="label">End Date *</label>
          <input {...register("meta.endDate", { required: "End date is required" })} type="date" className="input-field" />
          {errors.meta?.endDate && <p className="text-red-400 text-sm">{errors.meta.endDate.message}</p>}
        </div>
        <div>
          <label className="label">Expected Loves</label>
          <input {...register("meta.loves", { valueAsNumber: true })} type="number" className="input-field" />
        </div>
      </div>

      {/* Links */}
      <div>
        <label className="label mb-2">Links</label>
        {linkFields.map((field, idx) => (
          <div key={field.id} className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-2">
            <input {...register(`links.${idx}.live`)} className="input-field" placeholder="Live URL" />
            <input {...register(`links.${idx}.repo`)} className="input-field" placeholder="Repo URL" />
          </div>
        ))}
        
      </div>

      {/* Images */}
      <div>
        <label className="label mb-2">Images</label>
        {imageFields.map((field, idx) => (
          <div key={field.id} className="flex items-center gap-2 mb-2">
            <input {...register(`images.${idx}`)} className="input-field" placeholder={`Image ${idx + 1}`} />
          </div>
        ))}
        <button type="button" onClick={() => addImage("")} className="btn-add">
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      {/* Hashtags */}
      <div>
        <label className="label mb-2">Hashtags</label>
        {hashtagFields.map((field, idx) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input {...register(`hashtags.${idx}`)} className="input-field" placeholder={`#hashtag${idx + 1}`} />
            <button type="button" onClick={() => removeHashtag(idx)} className="text-red-400">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => appendHashtag("")} className="btn-add">
          <Plus className="w-4 h-4" /> Add Hashtag
        </button>
      </div>

      {/* Tech Stack */}
      <div>
        <label className="label mb-2">Tech Stack (min 4)</label>
        {techFields.map((field, idx) => (
          <div key={field.id} className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-2">
            <input {...register(`techStack.${idx}.name`)} placeholder="Tech Name" className="input-field" />
            <input {...register(`techStack.${idx}.value`)} placeholder="Value" className="input-field" />
          </div>
        ))}
        <button type="button" onClick={() => addTech({ name: "", value: "" })} className="btn-add">
          <Plus className="w-4 h-4" /> Add Tech
        </button>
      </div>

      {/* Features */}
      <div>
        <label className="label mb-2">Features (min 4 items)</label>
        {featureGroups.map((group, gIdx) => (
          <div key={group.id} className="border border-gray-700 p-4 rounded-lg mb-2">
            <input {...register(`features.${gIdx}.group`)} placeholder="Feature Group" className="input-field mb-2" />
            <FeatureItems control={control} register={register} groupIndex={gIdx} />
          </div>
        ))}
        <button type="button" onClick={() => addFeatureGroup({ group: "", items: [{ text: "" }] })} className="btn-add">
          <Plus className="w-4 h-4" /> Add Feature Group
        </button>
      </div>

      {/* Submit */}
      <div className="mt-4">
        <button
          type="submit"
          disabled={!hasChanges}
          className={`py-2 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
            hasChanges ? "bg-cyan-400 text-black hover:bg-cyan-300" : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          {projectId ? "Update Project" : "Create Project"}
        </button>
      </div>
    </form>
  );
};

// FeatureItems component
const FeatureItems = ({ control, register, groupIndex }) => {
  const { fields, append } = useFieldArray({ control, name: `features.${groupIndex}.items` });

  return (
    <div className="space-y-3">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-3">
          <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-black text-xs font-bold mt-2">
            {index + 1}
          </div>
          <input {...register(`features.${groupIndex}.items.${index}.text`)} placeholder={`Feature ${index + 1}`} className="input-field mt-2" />
        </div>
      ))}
      <button type="button" onClick={() => append({ text: "" })} className="btn-add">
        <Plus className="w-4 h-4" /> Add Feature
      </button>
    </div>
  );
};

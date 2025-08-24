"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { Loading } from "@/app/loading";

export const AddProjects = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    clearErrors,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      meta: {
        type: "",
        service: "",
        budget: 0,
        startDate: "",
        endDate: "",
        likes: 0,
      },
      images: [""],
      hashtags: [""],
      links: [{ live: "", repo: "" }],
      techStack: [{ name: "", value: "" }],
      features: [{ group: "Customers", items: [{ text: "" }] }],
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const { fields: imageFields, append: addImage } = useFieldArray({
    control,
    name: "images",
  });

  const { fields: techFields, append: addTech } = useFieldArray({
    control,
    name: "techStack",
  });

  const { fields: featureGroups, append: addFeatureGroup } = useFieldArray({
    control,
    name: "features",
  });

  const { fields: hashtagFields, append: appendHashtag, remove: removeHashtag } =
    useFieldArray({ control, name: "hashtags" });

  const { fields: linkFields, append: addLink, remove: removeLink } =
    useFieldArray({ control, name: "links" });

  const watchTitle = watch("title");
  const watchDescription = watch("description");
  const watchImages = watch("images");
  const watchTech = watch("techStack");
  const watchFeatures = watch("features");
  const watchMeta = watch("meta");
  const watchLinks = watch("links");

  useEffect(() => {
    if (watchTitle?.trim() !== "") clearErrors("title");
    if (watchDescription.length >= 200) clearErrors("description");
    if (watchImages.some((img) => /^https?:\/\/.+\..+/.test(img))) clearErrors("images");
    if (watchTech.length >= 4 && watchTech.every((t) => t.name && t.value))
      clearErrors("techStack");
    const totalFeatures = watchFeatures.reduce((sum, g) => sum + g.items.length, 0);
    if (totalFeatures >= 4 && watchFeatures.every((g) => g.items.every((f) => f.text)))
      clearErrors("features");
    if (watchMeta.type?.trim() !== "") clearErrors("meta.type");
    if (watchMeta.service?.trim() !== "") clearErrors("meta.service");
    if (
      watchMeta.startDate &&
      watchMeta.endDate &&
      new Date(watchMeta.startDate) < new Date(watchMeta.endDate)
    )
      clearErrors("meta.endDate");
  }, [watchTitle, watchDescription, watchImages, watchTech, watchFeatures, watchMeta, clearErrors]);

  const isSubmitDisabled =
    !watchTitle?.trim() ||
    watchDescription.length < 200 ||
    !watchMeta.type?.trim() ||
    !watchMeta.service?.trim() ||
    !watchMeta.startDate ||
    !watchMeta.endDate ||
    new Date(watchMeta.startDate) >= new Date(watchMeta.endDate) ||
    !watchImages.length ||
    watchImages.some((img) => !/^https?:\/\/.+\..+/.test(img)) ||
    !watchTech.length ||
    watchTech.length < 4 ||
    watchTech.some((t) => !t.name || !t.value) ||
    watchFeatures.reduce((sum, g) => sum + g.items.length, 0) < 4 ||
    watchFeatures.some((g) => g.items.some((f) => !f.text)) ||
    watchLinks.some((l) => !l.live && !l.repo);

  const onSubmit = async (data) => {
    console.log(data, "Submitting...");
    try {
      setIsLoading(true);
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setIsLoading(false);
      if (result.success) {
        console.log("Project saved:", result.project);
      } else {
        console.error("Failed to save project:", result.error);
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Error:", err);
    }
  };

  return (
    <>
      {isLoading && <Loading />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 p-4 md:p-10 max-w-5xl mx-auto bg-gray-900 text-white rounded-2xl shadow-2xl border border-gray-700"
      >
        {/* Title */}
        <div>
          <label className="label">Project Title *</label>
          <input
            {...register("title")}
            className=" input-field"
            placeholder="Enter project title"
          />
          {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="label">Description *</label>
          <textarea
            {...register("description")}
            value={watchDescription}
            onChange={(e) => setValue("description", e.target.value)}
            className="input-field"
            placeholder="Enter a detailed description (min 200 chars)"
          />
          <p className="text-gray-400 text-sm mt-1">{watchDescription.length} / 200 chars</p>
          {errors.description && <p className="text-red-500 mt-1">{errors.description.message}</p>}
        </div>

        {/* Meta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {["type", "service", "budget", "likes", "startDate", "endDate"].map((field, i) => (
            <div key={i}>
              <label className="font-medium capitalize mb-1 block">{field.replace(/([A-Z])/g, " $1")} {["type","service","startDate","endDate"].includes(field) && "*"}</label>
              <input
                {...register(`meta.${field}`, field==="budget"||field==="likes"?{ valueAsNumber: true }: undefined)}
                type={["budget","likes"].includes(field)?"number":field.includes("Date")?"date":"text"}
                className="input-field"
                placeholder={field}
              />
              {errors.meta?.[field] && <p className="text-red-500 mt-1">{errors.meta[field].message}</p>}
            </div>
          ))}
        </div>

      

        {/* Links */}
        <div>
          <label className="label">Project Links</label>
          {linkFields.map((field, index) => (
            <div key={field.id} className="flex flex-col md:flex-row gap-2 mb-2">

              <input {...register(`links.${index}.live`)} placeholder="Live Link" className="input-field" />
              <input {...register(`links.${index}.repo`)} placeholder="Repo Link" className="input-field" />
              <button type="button" onClick={() => removeLink(index)} className="btn-remove transition">Remove</button>

            </div>
          ))}
        
        </div>
  <div className="flex flex-col md:flex-row gap-x-2 items-center w-full  ">
        {/* Images */}
        <div className="flex-1">
          <label className="label">Project Images *</label>
          {imageFields.map((field, index) => (
             
            <input key={field.id} {...register(`images.${index}`)} className="input-field mb-2" placeholder={`Image URL ${index + 1}`} />

          ))}
          <button type="button" onClick={() => addImage("")} className="btn-add w-full md:w-[200px]">+ Add Image</button> 
        </div>
  {/* Hashtags */}
        <div className="flex-1">
          <label className="label">Hashtags</label>
          {hashtagFields.map((field, index) => (
            <div  className="flex  w-full gap-2 mb-2">
              <input key={field.id} {...register(`hashtags.${index}`)} className="input-field w-full" placeholder={`Hashtag ${index + 1}`} />

              <button type="button" onClick={() => removeHashtag(index)} className="btn-remove">Remove</button>

            </div>
          ))}
          <button type="button" onClick={() => appendHashtag("")} className="btn-add w-full md:w-[200px]">+ Add Hashtag</button>
        </div>

        </div>
        {/* Tech Stack */}
        <div>
          <label className="label">Tech Stack (Min 4) *</label>
          {techFields.map((field, index) => (
            <div key={field.id} className="flex flex-col md:flex-row gap-2 mb-2">
              <input {...register(`techStack.${index}.name`)} placeholder="Tech Name" className="input-field" />
              <input {...register(`techStack.${index}.value`)} placeholder="Tech Value" className="input-field" />
            </div>
          ))}
          <button type="button"  onClick={() => addTech({ name: "", value: "" })} className="btn-add w-full md:w-[200px]">+ Add Tech</button>
        </div>

        {/* Features */}
        <div>
          <label className="label">Features (Min 4) *</label>
          {featureGroups.map((group, groupIndex) => (
            <div key={group.id} className="mb-4 p-4 rounded-xl border border-gray-700 bg-gray-800">
              <input
                {...register(`features.${groupIndex}.group`)}
                placeholder="Feature Group (e.g., Customers)"
                className="input-field mb-4"
              />
              <FeatureItems control={control} register={register} groupIndex={groupIndex} />
            </div>
          ))}
          <button type="button" onClick={() => addFeatureGroup({ group: "", items: [{ text: "" }] })} className="btn-add w-full md:w-[200px]">+ Add Feature Group</button>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button type="submit" disabled={isSubmitDisabled} className={`flex-1 py-3 rounded-xl text-white font-semibold ${isSubmitDisabled ? "bg-gray-600 cursor-not-allowed" : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition"}`}>
            Submit Project
          </button>
          <button type="button" onClick={() => reset()} className="flex-1 py-3 bg-red-500 rounded-xl hover:bg-red-600 transition text-white font-semibold">
            Reset Form
          </button>
        </div>
      </form>
    </>
  );
};

const FeatureItems = ({ control, register, groupIndex }) => {
  const { fields, append } = useFieldArray({ control, name: `features.${groupIndex}.items` });

  return (
    <div>
      {fields.map((field, index) => (
        <input key={field.id} {...register(`features.${groupIndex}.items.${index}.text`)} placeholder={`Feature ${index + 1}`} className="input-field mb-2" />

      ))}
      <button type="button" onClick={() => append({ text: "" })} className="btn-add mt-3 w-full md:w-[200px]">
        + Add Feature
      </button>
    </div>
  );
};

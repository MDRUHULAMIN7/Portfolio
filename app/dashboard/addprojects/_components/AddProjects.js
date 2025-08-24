"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";

export const AddProjects = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      meta: { type: "", service: "", budget: "", startDate: "", endDate: "", likes: 0 },
      images: [""],
      techStack: [{ name: "", value: "" }],
      features: [{ group: "Customers", items: [{ text: "" }] }],
    },
  });

  const { fields: imageFields, append: addImage } = useFieldArray({ control, name: "images" });
  const { fields: techFields, append: addTech } = useFieldArray({ control, name: "techStack" });
  const { fields: featureGroups, append: addFeatureGroup } = useFieldArray({ control, name: "features" });

  // Watch all fields
  const watchTitle = watch("title");
  const watchDescription = watch("description");
  const watchImages = watch("images");
  const watchTech = watch("techStack");
  const watchFeatures = watch("features");
  const watchMeta = watch("meta");

  // Real-time validation
  useEffect(() => {
    if (watchTitle && watchTitle.trim() !== "") clearErrors("title");
    if (watchDescription.length >= 200) clearErrors("description");
    if (watchImages.some((img) => /^https?:\/\/.+\..+/.test(img))) clearErrors("images");
    if (watchTech.length >= 4 && watchTech.every((t) => t.name && t.value)) clearErrors("techStack");
    const totalFeatures = watchFeatures.reduce((sum, g) => sum + g.items.length, 0);
    if (totalFeatures >= 4 && watchFeatures.every((g) => g.items.every((f) => f.text))) clearErrors("features");

    // Meta fields
    if (watchMeta.type && watchMeta.type.trim() !== "") clearErrors("meta.type");
    if (watchMeta.service && watchMeta.service.trim() !== "") clearErrors("meta.service");
    if (watchMeta.startDate && watchMeta.endDate && new Date(watchMeta.startDate) < new Date(watchMeta.endDate)) {
      clearErrors("meta.endDate");
    }
  }, [watchTitle, watchDescription, watchImages, watchTech, watchFeatures, watchMeta, clearErrors]);

  // Disable submit logic
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
    watchFeatures.some((g) => g.items.some((f) => !f.text));

  const onSubmit = (data) => {
    console.log("✅ Valid Project Data:", data);
    reset(); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 max-w-3xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg">
      
      {/* Title */}
      <div>
        <label className="block mb-1 font-medium">Project Title *</label>
        <input {...register("title")} className="w-full p-2 rounded bg-gray-800 border border-gray-600" placeholder="Enter project title" />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">Description *</label>
        <textarea {...register("description")} value={watchDescription} onChange={(e) => setValue("description", e.target.value)} className="w-full p-2 rounded bg-gray-800 border border-gray-600 h-40" placeholder="Enter a detailed description (min 200 chars)" />
        {watchDescription.length > 0 && <p className="text-sm text-gray-400">{watchDescription.length} / 200 chars</p>}
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Type *</label>
          <input {...register("meta.type")} className="w-full p-2 rounded bg-gray-800 border border-gray-600" placeholder="Type" />
          {errors.meta?.type && <p className="text-red-500 text-sm mt-1">{errors.meta.type.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Service *</label>
          <input {...register("meta.service")} className="w-full p-2 rounded bg-gray-800 border border-gray-600" placeholder="Service" />
          {errors.meta?.service && <p className="text-red-500 text-sm mt-1">{errors.meta.service.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Budget</label>
          <input {...register("meta.budget", { valueAsNumber: true })} type="number" placeholder="Budget" className="w-full p-2 rounded bg-gray-800 border border-gray-600" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Start Date *</label>
          <input {...register("meta.startDate")} type="date" className="w-full p-2 rounded bg-gray-800 border border-gray-600" />
          {errors.meta?.startDate && <p className="text-red-500 text-sm mt-1">{errors.meta.startDate.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">End Date *</label>
          <input {...register("meta.endDate")} type="date" className="w-full p-2 rounded bg-gray-800 border border-gray-600" />
          {errors.meta?.endDate && <p className="text-red-500 text-sm mt-1">{errors.meta.endDate.message}</p>}
        </div>
      </div>

      {/* Images */}
      <div>
        <label className="block mb-2 font-medium">Project Images *</label>
        {imageFields.map((field, index) => (
          <input key={field.id} {...register(`images.${index}`)} placeholder={`Image URL ${index + 1}`} className="w-full mb-2 p-2 rounded bg-gray-800 border border-gray-600" />
        ))}
        {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>}
        <button type="button" onClick={() => addImage("")} className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700">+ Add Image</button>
      </div>

      {/* Tech Stack */}
      <div>
        <label className="block mb-2 font-medium">Tech Stack (Min 4) *</label>
        {techFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input {...register(`techStack.${index}.name`)} placeholder="Tech Name" className="w-1/2 p-2 rounded bg-gray-800 border border-gray-600" />
            <input {...register(`techStack.${index}.value`)} placeholder="Tech Value" className="w-1/2 p-2 rounded bg-gray-800 border border-gray-600" />
          </div>
        ))}
        {errors.techStack && <p className="text-red-500 text-sm mt-1">{errors.techStack.message}</p>}
        <button type="button" onClick={() => addTech({ name: "", value: "" })} className="px-3 py-1 bg-purple-600 rounded hover:bg-purple-700">+ Add Tech</button>
      </div>

      {/* Features */}
      <div>
        <label className="block mb-2 font-medium">Features (Min 4) *</label>
        {featureGroups.map((group, groupIndex) => (
          <div key={group.id} className="mb-4 border border-gray-700 p-3 rounded">
            <input {...register(`features.${groupIndex}.group`)} placeholder="Feature Group (e.g., Customers)" className="w-full mb-2 p-2 rounded bg-gray-800 border border-gray-600" />
            <FeatureItems control={control} register={register} groupIndex={groupIndex} />
          </div>
        ))}
        {errors.features && <p className="text-red-500 text-sm mt-1">{errors.features.message}</p>}
        <button type="button" onClick={() => addFeatureGroup({ group: "", items: [{ text: "" }] })} className="px-3 py-1 bg-green-600 rounded hover:bg-green-700">+ Add Feature Group</button>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button type="submit" disabled={isSubmitDisabled} className={`w-full py-2 rounded-lg ${isSubmitDisabled ? "bg-gray-600 cursor-not-allowed" : "bg-cyan-500 hover:bg-cyan-600"}`}>
          Submit Project
        </button>
        <button type="button" onClick={() => reset()} className="w-full py-2 bg-red-500 rounded-lg hover:bg-red-600">
          Reset Form
        </button>
      </div>
    </form>
  );
};

// Nested Features Component
const FeatureItems = ({ control, register, groupIndex }) => {
  const { fields, append } = useFieldArray({ control, name: `features.${groupIndex}.items` });

  return (
    <div>
      {fields.map((field, index) => (
        <input key={field.id} {...register(`features.${groupIndex}.items.${index}.text`)} placeholder={`Feature ${index + 1}`} className="w-full mb-2 p-2 rounded bg-gray-800 border border-gray-600" />
      ))}
      <button type="button" onClick={() => append({ text: "" })} className="px-3 py-1 bg-teal-600 rounded hover:bg-teal-700">+ Add Feature</button>
    </div>
  );
};

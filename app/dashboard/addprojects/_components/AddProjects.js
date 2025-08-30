"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Plus,
  X,
  Upload,
  Calendar,
  DollarSign,
  Globe,
  Github,
  Tag,
  Code,
  Star,
  Image,
  Layers,
} from "lucide-react";

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

  const {
    fields: hashtagFields,
    append: appendHashtag,
    remove: removeHashtag,
  } = useFieldArray({ control, name: "hashtags" });

  const {
    fields: linkFields,
    append: addLink,
    remove: removeLink,
  } = useFieldArray({ control, name: "links" });

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
    if (watchImages.some((img) => /^https?:\/\/.+\..+/.test(img)))
      clearErrors("images");
    if (watchTech.length >= 4 && watchTech.every((t) => t.name && t.value))
      clearErrors("techStack");
    const totalFeatures = watchFeatures.reduce(
      (sum, g) => sum + g.items.length,
      0
    );
    if (
      totalFeatures >= 4 &&
      watchFeatures.every((g) => g.items.every((f) => f.text))
    )
      clearErrors("features");
    if (watchMeta.type?.trim() !== "") clearErrors("meta.type");
    if (watchMeta.service?.trim() !== "") clearErrors("meta.service");
    if (
      watchMeta.startDate &&
      watchMeta.endDate &&
      new Date(watchMeta.startDate) < new Date(watchMeta.endDate)
    )
      clearErrors("meta.endDate");
  }, [
    watchTitle,
    watchDescription,
    watchImages,
    watchTech,
    watchFeatures,
    watchMeta,
    clearErrors,
  ]);

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
    watchLinks.some((l) => !l.live );

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-cyan-400 rounded-full animate-spin"></div>
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
            <p className="text-white font-medium">Saving project...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1f2937] py-12 px-4 rounded-2xl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
           <div className="inline-flex items-center gap-3 backdrop-blur-md px-6 py-3 rounded-full border border-gray-700 mb-6">
            <Layers className="w-6 h-6 text-cyan-400" />
            <span className="text-white font-semibold">Project Creator</span>
          </div>
       
        </div>

        <div className="space-y-8 bg-[#1f2937]">
          {/* Basic Information Card */}
          <div className="">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-cyan-400 rounded-2xl flex items-center justify-center">
                <Star className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Basic Information
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Title */}
              <div className="lg:col-span-2">
                <label className="label">
                  Project Title <span className="text-red-400">*</span>
                </label>
                <input
                  {...register("title")}
                  className="input-field"
                  placeholder="Enter your amazing project title"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="lg:col-span-2">
                <label className="label">
                  Project Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  {...register("description")}
                  value={watchDescription}
                  onChange={(e) => setValue("description", e.target.value)}
                  rows="6"
                  className="input-field resize-none"
                  placeholder="Describe your project in detail (minimum 200 characters)"
                />
                <div className="flex justify-between items-center mt-2">
                  <span
                    className={`text-sm ${
                      watchDescription.length >= 200
                        ? "text-cyan-400"
                        : "text-gray-400"
                    }`}
                  >
                    {watchDescription.length} / 200 characters
                  </span>
                  {watchDescription.length >= 200 && (
                    <div className="text-cyan-400 text-sm flex items-center gap-1">
                      <span>✓</span> Minimum reached
                    </div>
                  )}
                </div>
                {errors.description && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Project Metadata Card */}
          <div className="">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-cyan-400 rounded-2xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-2xl font-bold text-white">Project Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Type */}
              <div>
                <label className="label">
                  Project Type <span className="text-red-400">*</span>
                </label>
                <input
                  {...register("meta.type")}
                  className="input-field"
                  placeholder="e.g., Web App, Mobile App"
                />
                {errors.meta?.type && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.meta.type.message}
                  </p>
                )}
              </div>

              {/* Service */}
              <div>
                <label className="label">
                  Service <span className="text-red-400">*</span>
                </label>
                <input
                  {...register("meta.service")}
                  className="input-field"
                  placeholder="e.g., Development, Design"
                />
                {errors.meta?.service && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.meta.service.message}
                  </p>
                )}
              </div>

              {/* Budget */}
              <div>
                <label className="label">Budget</label>
                <div className="relative">
                  <input
                    {...register("meta.budget", { valueAsNumber: true })}
                    type="number"
                    className="input-field bg-[#1a1a1a]   placeholder-gray-400  transition-all"
                    placeholder="Enter your budget"
                  />
                </div>
                {errors.meta?.budget && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.meta.budget.message}
                  </p>
                )}
              </div>

              {/* Start Date */}
              <div>
                <label className="label">
                  Start Date <span className="text-red-400">*</span>
                </label>
                <input
                  {...register("meta.startDate")}
                  type="date"
                  className="input-field"
                />
                {errors.meta?.startDate && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.meta.startDate.message}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label className="label">
                  End Date <span className="text-red-400">*</span>
                </label>
                <input
                  {...register("meta.endDate")}
                  type="date"
                  className="input-field"
                />
                {errors.meta?.endDate && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.meta.endDate.message}
                  </p>
                )}
              </div>

              {/* Loves */}
              <div>
                <label className="label">Expected Loves</label>
                <input
                  {...register("meta.loves", { valueAsNumber: true })}
                  type="number"
                  className="input-field"
                  placeholder="0"
                />
                {errors.meta?.loves && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.meta.loves.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Links and Media Card */}
          <div className="">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-cyan-400 rounded-2xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-2xl font-bold text-white">Links & Media</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Project Links */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Project Links
                </label>
                <div className="space-y-3">
                  {linkFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    >
                      <div className="relative">
                        <Globe className="w-4 h-4 text-gray-400 absolute left-3 top-4" />
                        <input
                          {...register(`links.${index}.live`)}
                          placeholder="Live URL"
                          className="input-field"
                        />
                      </div>
                      <div className="relative">
                        <Github className="w-4 h-4 text-gray-400 absolute left-3 top-4" />
                        <input
                          {...register(`links.${index}.repo`)}
                          placeholder="Repository URL"
                          className="input-field "
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Images */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Project Images <span className="text-red-400">*</span>
                </label>
                <div className="space-y-3">
                  {imageFields.map((field, index) => (
                    <div key={field.id} className="relative">
                      <Image className="w-4 h-4 text-gray-400 absolute left-3 top-4" />
                      <input
                        {...register(`images.${index}`)}
                        className="input-field"
                        placeholder={`Image URL ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addImage("")}
                  className="btn-add"
                >
                  <Plus className="w-4 h-4" />
                  Add Image
                </button>
              </div>
            </div>

            {/* Hashtags */}
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-300 mb-4">
                Hashtags
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {hashtagFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                      <input
                        {...register(`hashtags.${index}`)}
                        className="input-field"
                        placeholder={`#hashtag${index + 1}`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeHashtag(index)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => appendHashtag("")}
                className="btn-add"
              >
                <Plus className="w-4 h-4" />
                Add Hashtag
              </button>
            </div>
          </div>

          {/* Tech Stack Card */}
          <div className="">
            <div className="flex items-center gap-x-3 mb-6">
              <div className="w-10 h-10 bg-cyan-400 rounded-2xl flex items-center justify-center">
                <Code className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Tech Stack{" "}
                <span className="text-sm font-normal text-gray-400">
                  (Minimum 4 required)
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {techFields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-2xl border border-gray-700"
                >
                  <input
                    {...register(`techStack.${index}.name`)}
                    placeholder="Tech Name"
                    className="input-field"
                  />
                  <input
                    {...register(`techStack.${index}.value`)}
                    placeholder="Value"
                    className="input-field"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => addTech({ name: "", value: "" })}
              className="btn-add"
            >
              <Plus className="w-5 h-5" />
              Add Technology
            </button>

            <div className="mt-4 text-sm text-gray-400">
              Current tech stack: {techFields.length}/4 minimum
            </div>
          </div>

          {/* Features Card */}
          <div className="">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-cyan-400 rounded-2xl flex items-center justify-center">
                <Layers className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Features{" "}
                <span className="text-sm font-normal text-gray-400">
                  (Minimum 4 items total)
                </span>
              </h2>
            </div>

            <div className="space-y-6">
              {featureGroups.map((group, groupIndex) => (
                <div
                  key={group.id}
                  className=" border border-gray-700 rounded-2xl p-6"
                >
                  <input
                    {...register(`features.${groupIndex}.group`)}
                    placeholder="Feature Group (e.g., User Management, Analytics)"
                    className="input-field"
                  />
                  <FeatureItems
                    control={control}
                    register={register}
                    groupIndex={groupIndex}
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                addFeatureGroup({ group: "", items: [{ text: "" }] })
              }
              className="btn-add"
            >
              <Plus className="w-5 h-5" />
              Add Feature Group
            </button>

            <div className="mt-4 text-sm text-gray-400">
              Total features:{" "}
              {watchFeatures.reduce((sum, g) => sum + g.items.length, 0)}/4
              minimum
            </div>
          </div>

          {/* Submit Section */}
          <div className="bg-gray-800 ">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitDisabled}
                onClick={handleSubmit(onSubmit)}
                className={`flex-1 py-2 px-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  isSubmitDisabled
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-cyan-400 text-black hover:bg-cyan-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-400/25"
                }`}
              >
                {isSubmitDisabled
                  ? "Complete Required Fields"
                  : " Launch Project"}
              </button>

              <button
                type="button"
                onClick={() => reset()}
                className="flex-1 py-2 px-4 bg-red-500/20 border border-red-500/30 rounded-2xl text-red-400 hover:bg-red-500/30 transition-all duration-300 font-bold text-lg"
              >
                Reset Form
              </button>
            </div>

            {isSubmitDisabled && (
              <div className="mt-4 ">
                <p className="text-yellow-400 text-sm">
                  * Please complete all required fields to submit your project
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItems = ({ control, register, groupIndex }) => {
  const { fields, append } = useFieldArray({
    control,
    name: `features.${groupIndex}.items`,
  });

  return (
    <div className="space-y-3 ">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-3">
          <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-black text-xs font-bold mt-2">
            {index + 1}
          </div>
          <input
            {...register(`features.${groupIndex}.items.${index}.text`)}
            placeholder={`Feature ${index + 1}`}
            className="input-field mt-2"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ text: "" })}
        className="btn-add"
      >
        <Plus className="w-4 h-4" />
        Add Feature
      </button>
    </div>
  );
};

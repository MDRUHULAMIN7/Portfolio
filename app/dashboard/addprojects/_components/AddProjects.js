"use client";

import { useForm, useFieldArray } from "react-hook-form";

export const AddProjects = () => {
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      meta: {
        type: "",
        service: "",
        budget: "",
        startDate: "",
        endDate: "",
        likes: 0,
      },
      images: [""],
      techStack: {
        framework: "",
        styling: "",
        backend: "",
        database: "",
        authentication: "",
        payment: "",
        pdf: "",
      },
      features: {
        customers: [{ text: "" }],
        sellers: [{ text: "" }],
      },
    },
  });

  // For dynamic fields (images, features)
  const { fields: imageFields, append: addImage } = useFieldArray({
    control,
    name: "images",
  });

  const { fields: customerFields, append: addCustomer } = useFieldArray({
    control,
    name: "features.customers",
  });

  const { fields: sellerFields, append: addSeller } = useFieldArray({
    control,
    name: "features.sellers",
  });

  const onSubmit = (data) => {
    console.log("✅ Project Data:", data);
    reset(); // optional, clear form after submit
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Add New Project</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            {...register("title", { required: true })}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-4">
          <input {...register("meta.type")} placeholder="Type" className="p-2 rounded bg-gray-800 border border-gray-600" />
          <input {...register("meta.service")} placeholder="Service" className="p-2 rounded bg-gray-800 border border-gray-600" />
          <input {...register("meta.budget")} placeholder="Budget" className="p-2 rounded bg-gray-800 border border-gray-600" />
          <input {...register("meta.startDate")} type="date" className="p-2 rounded bg-gray-800 border border-gray-600" />
          <input {...register("meta.endDate")} type="date" className="p-2 rounded bg-gray-800 border border-gray-600" />
          <input {...register("meta.likes")} type="number" placeholder="Likes" className="p-2 rounded bg-gray-800 border border-gray-600" />
        </div>

        {/* Images */}
        <div>
          <label className="block mb-2 font-medium">Images</label>
          {imageFields.map((field, index) => (
            <input
              key={field.id}
              {...register(`images.${index}`)}
              placeholder={`Image URL ${index + 1}`}
              className="w-full mb-2 p-2 rounded bg-gray-800 border border-gray-600"
            />
          ))}
          <button
            type="button"
            onClick={() => addImage("")}
            className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
          >
            + Add Image
          </button>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block mb-2 font-medium">Tech Stack</label>
          {["framework", "styling", "backend", "database", "authentication", "payment", "pdf"].map((field) => (
            <input
              key={field}
              {...register(`techStack.${field}`)}
              placeholder={field}
              className="w-full mb-2 p-2 rounded bg-gray-800 border border-gray-600"
            />
          ))}
        </div>

        {/* Features - Customers */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Features (Customers)</h3>
          {customerFields.map((field, index) => (
            <input
              key={field.id}
              {...register(`features.customers.${index}.text`)}
              placeholder={`Customer Feature ${index + 1}`}
              className="w-full mb-2 p-2 rounded bg-gray-800 border border-gray-600"
            />
          ))}
          <button
            type="button"
            onClick={() => addCustomer({ text: "" })}
            className="px-3 py-1 bg-green-600 rounded hover:bg-green-700"
          >
            + Add Customer Feature
          </button>
        </div>

        {/* Features - Sellers */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Features (Sellers)</h3>
          {sellerFields.map((field, index) => (
            <input
              key={field.id}
              {...register(`features.sellers.${index}.text`)}
              placeholder={`Seller Feature ${index + 1}`}
              className="w-full mb-2 p-2 rounded bg-gray-800 border border-gray-600"
            />
          ))}
          <button
            type="button"
            onClick={() => addSeller({ text: "" })}
            className="px-3 py-1 bg-green-600 rounded hover:bg-green-700"
          >
            + Add Seller Feature
          </button>
        </div>

        {/* Submit */}
        <button type="submit" className="w-full py-2 bg-cyan-500 rounded-lg hover:bg-cyan-600">
          Submit Project
        </button>
      </form>
    </div>
  );
};

"use client";
import { SquarePlus, Star, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const ReviewAdd = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.rating = rating;
      data.avatar = avatarUrl; 

      const res = await fetch("/api/testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("Review Added Successfully");
        reset();
        setRating(0);
        setAvatarUrl("");
        setIsOpen(false);
      } else {
        toast.error(result.error || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

 
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET); 

    try {
      const res = await fetch(
        `/api/upload-image`, 
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();

      if (data.url) {
        setAvatarUrl(data.url);
        setValue("avatar", data.url, { shouldValidate: true });
        toast.success("Image uploaded!");
      } else {
        toast.error("Upload failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const inputClass = "input-field";

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-2 rounded-xl shadow-md transition"
      >
        Add<span className="hidden md:block"> Review</span>
        <SquarePlus className="md:w-5 md:h-5 w-4 h-4" />
      </button>

    
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 mx-4 sm:mx-0 pt-10 sm:pt-0 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 max-h-[76vh] sm:max-h-[90vh] p-3 sm:p-6 rounded-2xl w-full max-w-lg shadow-xl text-white flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-xl font-bold mb-4">Add a Review</h2>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-2 sm:space-y-4 noscrollbar overflow-y-auto flex-1 pr-1"
              >
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Name"
                  className={inputClass}
                />
                {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}

                <input
                  {...register("role", { required: "Role is required" })}
                  placeholder="Role"
                  className={inputClass}
                />
                {errors.role && <p className="text-red-400 text-sm">{errors.role.message}</p>}

                {/* Star Rating */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer transition-colors ${
                        (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-500"
                      }`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  ))}
                </div>
                {rating === 0 && <p className="text-red-400 text-sm">Rating is required</p>}

                <input
                  {...register("company", { required: "Company is required" })}
                  placeholder="Company"
                  className={inputClass}
                />
                {errors.company && <p className="text-red-400 text-sm">{errors.company.message}</p>}

                <input
                  type="email"
                  {...register("email", {
                    required: "Valid email is required",
                    pattern: { value: /.+\@.+\..+/, message: "Enter a valid email" },
                  })}
                  placeholder="Email"
                  className={inputClass}
                />
                {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}

                {/* Avatar Upload */}
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-sm text-gray-300">Avatar Image</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="avatarUpload"
                    />
                    <label
                      htmlFor="avatarUpload"
                      className="input-field flex items-center gap-2 cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      {uploading ? "Uploading..." : "Upload Image"}
                    </label>
                    {avatarUrl && (
                      <img src={avatarUrl} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                    )}
                  </div>
                  {errors.avatar && <p className="text-red-400 text-sm">{errors.avatar.message}</p>}
                </div>

                <textarea
                  {...register("review", {
                    required: "Review text is required",
                    minLength: { value: 150, message: "Review must be at least 150 characters" },
                  })}
                  placeholder="Review Text"
                  className={`${inputClass} shadow-inner`}
                  rows={3}
                />
                {errors.review && <p className="text-red-400 text-sm">{errors.review.message}</p>}

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isValid || loading || rating === 0 || uploading || !avatarUrl}
                    className={`px-4 py-2 rounded-lg ${
                      isValid && rating > 0 && avatarUrl
                        ? "bg-cyan-500 hover:bg-cyan-600"
                        : "bg-gray-600 cursor-not-allowed"
                    }`}
                  >
                    {loading ? "Saving..." : "Submit"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewAdd;

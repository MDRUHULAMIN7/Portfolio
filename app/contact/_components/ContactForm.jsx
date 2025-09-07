"use client";


import { useForm } from "react-hook-form";
import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Socials from "@/components/Socials/Socials";

export default function ContactForm({links}) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data);
      await new Promise((res) => setTimeout(res, 1500));
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row  rounded-xl shadow-lg overflow-hidden">
      {/* Left - Contact Info */}
   
      <div className=" w-full md:w-1/2 lg:w-[40%] bg-gray-800/60 text-white p-8   flex flex-col justify-between overflow-hidden">
   
        <div>
          <h2 className="text-xl font-bold mb-2">Contact Information</h2>
          <p className="text-sm text-gray-300 mb-8">
            Say something to start a live chat!
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Phone size={20} /> <span>+88 019030 01637</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={20} /> <span>ruhulthisis@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={20} />
              <span>
                Madhabpur Bargachi Paba,
                <br /> Rajshahi Bangladesh
              </span>
            </div>
          </div>
        </div>

        
        <div className="flex items-center gap-4 mt-8">
          <Socials links={links} />
        </div>

       


      <div className="flex justify-end">
        <Image
        src="/svg/contact.svg"
        alt="contact"
        width={300}
        height={300}
        className=" mt-6 "
      />
      </div>

      </div>

      {/* Right - Form */}
      <div className=" w-full md:w-1/2 lg:w-[60%] bg-gray-900">
     

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">First Name</label>
              <input
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 2, message: "Too short" },
                })}
                className="input-field"
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {String(errors.firstName.message)}
                </p>
              )}
            </div>
            <div>
              <label className="label">Last Name</label>
              <input
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: { value: 2, message: "Too short" },
                })}
                className="input-field"
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {String(errors.lastName.message)}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                })}
                type="email"
                className="input-field"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {String(errors.email.message)}
                </p>
              )}
            </div>
            <div className="relative">
              <label className="label">Phone Number</label>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  minLength: { value: 8, message: "Too short" },
                })}
                className="input-field"
                placeholder="+1 012 3456 789"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="label">Select Subject?</label>
            <div className="flex flex-wrap gap-4 mt-2">
              {["General Inquiry", "Support", "Feedback", "Other"].map(
                (subject) => (
                  <label
                    key={subject}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={subject}
                      {...register("subject", {
                        required: "Please select a subject",
                      })}
                      className="accent-black"
                    />
                    <span className="text-sm">{subject}</span>
                  </label>
                )
              )}
            </div>
            {errors.subject && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.subject.message)}
              </p>
            )}
          </div>

        
          <div>
            <label className="label">Message</label>
            <textarea
              {...register("message", {
                required: "Message is required",
                minLength: { value: 5, message: "Message too short" },
              })}
              className="input-field"
              placeholder="Write your message..."
              rows={4}
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.message.message)}
              </p>
            )}
          </div>

          
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#203550]/70 text-white w-full md:w-fit px-6 py-3 rounded-md shadow hover:bg-gray-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

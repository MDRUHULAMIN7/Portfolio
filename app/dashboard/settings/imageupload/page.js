"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { UploadCloud, Copy } from "lucide-react";
import Image from "next/image";
import Heading from "@/components/Heading";

export default function ImageUploadPage() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [targetSize, setTargetSize] = useState(200);
  const [fileSize, setFileSize] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setFileSize((selectedFile.size / 1024).toFixed(2));
    setImageUrl("");
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Please select an image first!");
    setLoading(true);
    toast.loading("Uploading image...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("width", width);
      formData.append("height", height);
      formData.append("targetSize", targetSize);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      setLoading(false);

      if (data.error) {
        toast.dismiss();
        toast.error(data.error);
        return;
      }

      toast.dismiss();
      toast.success("Image uploaded successfully!");
      setImageUrl(data.url);
      setPreviewUrl("");
    } catch (err) {
      setLoading(false);
      toast.dismiss();
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(imageUrl);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-[80vh]   max-w-3xl mx-auto  bg-gray-900 rounded-xl p-4 md:p-8  shadow-lg">
 <Heading title1="Image Uploader" title2={'Customize  Image'} />
    
      <div className="  w-full max-w-lg mx-auto">
      


      
        <div className="mb-4">
          <label className="label">Select Image</label>
          <label className="flex items-center justify-center w-full h-14 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-cyan-400 transition">
            <UploadCloud className="w-6 h-6 mr-2 text-cyan-400" />
            <span className="text-gray-100">{file ? file.name : "Click to select image"}</span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
          {file && <p className="mt-2 text-sm text-gray-300">Original size: {fileSize} KB</p>}
        </div>

     
        {previewUrl && (
          <div className="mb-4">
            <p className="text-gray-200 font-medium mb-2">Preview:</p>
            <Image width={500} height={500} src={previewUrl} alt="Preview" className="w-full rounded-lg object-contain border border-gray-200" />
          </div>
        )}

       
        {file && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="label">Width (px)</label>
              <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" />
            </div>
            <div>
              <label className="label">Height (px)</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" />
            </div>
            <div>
              <label className="label">Target Size (KB)</label>
              <input type="number" value={targetSize} onChange={(e) => setTargetSize(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" />
            </div>
          </div>
        )}

       
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-cyan-400 hover:bg-cyan-500 text-gray-800 font-semibold py-2 px-4 rounded-lg transition flex justify-center items-center"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          ) : (
            "Upload & Submit"
          )}
        </button>

      
       {/* Uploaded Image & Copy */}
{imageUrl && (
  <div className="mt-6 text-center">
    <p className="text-gray-200 font-medium mb-2">Uploaded Image:</p>
    <Image
      width={500}
      height={500}
      src={imageUrl}
      alt="Uploaded"
      className="mx-auto w-72 rounded-lg border border-cyan-400"
    />

    <div className="mt-2 flex items-center justify-center gap-2">
      <input
        type="text"
        readOnly
        value={imageUrl}
        className="border border-gray-300 rounded-lg p-2 w-full max-w-xs text-sm"
      />
      <button
        onClick={() => {
          navigator.clipboard.writeText(imageUrl);
          toast.success("Copied to clipboard!");
        }}
        className="bg-cyan-400 hover:bg-cyan-500 p-2 rounded-lg"
      >
        <Copy className="w-4 h-4 text-gray-800" />
      </button>
    </div>

    {/* Reset Button */}
    <button
      onClick={() => {
        setFile(null);
        setPreviewUrl("");
        setImageUrl("");
        setWidth(500);
        setHeight(500);
        setTargetSize(200);
        setFileSize(0);
      }}
      className="mt-4 bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg transition"
    >
      Reset
    </button>
  </div>
)}

      </div>
    </div>
  );
}

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) throw new Error("No file provided");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Simple upload without transformations
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "uploads", // Simple folder name
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return new Response(JSON.stringify({ 
      url: result.secure_url,
      public_id: result.public_id 
    }), { 
      status: 200 
    });
    
  } catch (err) {
    return new Response(JSON.stringify({ 
      error: err.message 
    }), { 
      status: 500 
    });
  }
}
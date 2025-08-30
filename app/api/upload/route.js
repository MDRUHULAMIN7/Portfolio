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
    const width = formData.get("width");
    const height = formData.get("height");
    const targetSize = formData.get("targetSize");

    if (!file) throw new Error("No file provided");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Estimate quality for target KB
    let quality = "auto";
    if (targetSize) {
      const kb = (buffer.length / 1024);
      quality = Math.min(100, Math.max(10, Math.round((targetSize / kb) * 100)));
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "nextjs_uploads",
          transformation: [
            { width: width ? parseInt(width) : 500, height: height ? parseInt(height) : 500, crop: "limit" },
            { quality },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return new Response(JSON.stringify({ url: result.secure_url }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

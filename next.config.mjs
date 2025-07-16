/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // Middleware configuration
  middleware: [
    '/:path*', // Apply middleware for all paths
  ],
};

export default nextConfig;

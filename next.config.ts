import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920, 2400],
    imageSizes: [64, 96, 128, 192, 256, 384, 512],
  },
};

export default nextConfig;

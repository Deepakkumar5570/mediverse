import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // existing config

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;
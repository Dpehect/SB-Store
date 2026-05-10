import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "eu.venum.com",
      },
      {
        protocol: "https",
        hostname: "www.everlast.com",
      },
      {
        protocol: "https",
        hostname: "www.fairtex.com",
      },
    ],
  },
};

export default nextConfig;

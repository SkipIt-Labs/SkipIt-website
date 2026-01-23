import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/SkipIt-website",
  assetPrefix: "/SkipIt-website/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

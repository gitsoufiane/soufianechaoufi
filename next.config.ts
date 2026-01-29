import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default withBundleAnalyzer(nextConfig);

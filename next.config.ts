import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    const isDev = process.env.NODE_ENV === "development";
    return [
      {
        source: "/storybook",
        headers: [
          {
            key: "Content-Security-Policy",
            value: isDev
              ? "frame-src 'self' http://localhost:6006; frame-ancestors 'self'"
              : "frame-src 'self'; frame-ancestors 'self'",
          },
          {
            key: "X-Frame-Options",
            value: "ALLOW",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);

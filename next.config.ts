import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "vfqcqhylftsunnhxqysq.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/projects/residential",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/projects/commercial",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/projects/tenant-improvements",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

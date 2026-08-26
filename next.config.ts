import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/business-rpg",
        destination: "https://business-rpg-six.vercel.app",
        permanent: true,
      },
      {
        source: "/ranch",
        destination: "https://mokomoko-ranch.vercel.app",
        permanent: true,
      },
      {
        source: "/sheep",
        destination: "https://sheep-counter-smoky.vercel.app",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uxwing.com",
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "sf6bymp1c6fz7grk.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;

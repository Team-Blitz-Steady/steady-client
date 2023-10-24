/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  eslint: {
    dirs: ["src"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;

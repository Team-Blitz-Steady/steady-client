/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  eslint: {
    dirs: ["src"],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;

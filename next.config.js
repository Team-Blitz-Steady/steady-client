/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  eslint: {
    dirs: ["src"],
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "noticon-static.tammolo.com",
      },
      {
        protocol: "https",
        hostname: "github-production-user-asset-6210df.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "team-13-image-bucket.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://www.steadies.kr",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

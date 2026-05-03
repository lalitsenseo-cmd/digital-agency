/** @type {import('next').NextConfig} */
const nextConfig = {
reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: process.env.VERCEL_URL?.includes("vercel.app")
              ? "noindex, nofollow"
              : "index, follow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
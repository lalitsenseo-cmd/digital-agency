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
            value: process.env.VERCEL_ENV === "production"
              ? "index, follow"
              : "noindex, nofollow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
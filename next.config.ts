import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // There's no dedicated projects page yet, so send visitors to the homepage.
      // Temporary (307) so it's easy to replace with a real /projects page later.
      { source: "/projects", destination: "/", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
    ],
  },
};

export default nextConfig;

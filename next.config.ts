/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'hydeparkwinterwonderland.com',
      },
      {
        protocol: 'https',
        hostname: 'wembleypark.com', // <-- Added this new one
      },
    ],
  },
};

export default nextConfig;


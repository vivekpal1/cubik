/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@cubik/ui", "@cubik/wallet"],
  reactStrictMode: true,
  images: {
    domains: ["imagedelivery.net"],
  },
};

module.exports = nextConfig;

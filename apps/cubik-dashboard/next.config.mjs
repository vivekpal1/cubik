import "./src/env.mjs"

import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "d1yweukyu067aq.cloudfront.net",
      "www.sandstormhackathon.com",
      "media-fastly.hackerearth.com",
      "res.cloudinary.com",
      "source.boringavatars.com",
      "uploadthing.com",
      "media.discordapp.net",
      "pbs.twimg.com",
    ],
  },
  transpilePackages: ["@cubik/database"],
};

export default nextConfig

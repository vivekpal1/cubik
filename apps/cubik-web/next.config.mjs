import "./src/env.mjs";
// @ts-ignore
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";
import { withAxiom } from "next-axiom"
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js";


/** @type {import("next").NextConfig} */
const config = {
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
  transpilePackages: ["@cubik/database", "@cubik/ui"],
  images: {
    domains: [
      "d1yweukyu067aq.cloudfront.net",
      "www.sandstormhackathon.com",
      "media-fastly.hackerearth.com",
      "res.cloudinary.com",
      "source.boringavatars.com",
      "uploadthing.com",
      "media.discordapp.net",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },

};

const nextConfigFunction = async (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = (await import("@ducanh2912/next-pwa")).default({
      dest: "public",
    });
    return withPWA(withAxiom(config));
  }
  return withAxiom(config);
};

export default nextConfigFunction;

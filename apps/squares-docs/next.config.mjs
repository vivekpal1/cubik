import { withAxiom } from "next-axiom";





/** @type {import("next").NextConfig} */
const nextConfig = {
  transpilePackages: ['@cubik/ui', '@cubik/wallet'],
  reactStrictMode: true,
  images: {
    domains: ['imagedelivery.net', 'pbs.twimg.com'],
  },
};

export default withAxiom(nextConfig);

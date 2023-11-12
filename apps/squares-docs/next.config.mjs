import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from 'next/constants.js';
import withPWAInit from '@ducanh2912/next-pwa';
import { withAxiom } from 'next-axiom';

const withPWA = withPWAInit({
  dest: 'public',
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  transpilePackages: ['@cubik/ui'],
  reactStrictMode: true,
  images: {
    domains: ['imagedelivery.net', 'pbs.twimg.com'],
  },
};

const nextConfigFunction = async (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = (await import('@ducanh2912/next-pwa')).default({
      dest: 'public',
    });
    return withPWA(withAxiom(nextConfig));
  }
  return withAxiom(nextConfig);
};

export default nextConfigFunction;

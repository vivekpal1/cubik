import "./src/env.mjs";

/** @type {import("next").NextConfig} */
const config = {
    experimental: { serverActions: true, appDir: true },
    images: {
        domains: [
            "d1yweukyu067aq.cloudfront.net",
            "www.sandstormhackathon.com",
            "media-fastly.hackerearth.com",
            "res.cloudinary.com",
            "source.boringavatars.com",
        ],
    },
};
export default config;
import { fileURLToPath } from "node:url";
import createJiti from "jiti";

const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti("./src/env.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "online-store-dev-bkt.s3.us-east-1.amazonaws.com",
      },
      {
        hostname: "online-store-prd-bkt.s3.us-east-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;

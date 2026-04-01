import { fileURLToPath } from "url";
import { dirname } from "path";

/** Fix __dirname for ESM */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

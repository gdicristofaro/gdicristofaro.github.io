import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  outputFileTracingRoot: path.join(__dirname),

  turbopack: {
    rules: {
      '*.html': {
        loaders: ['raw-loader'],
        as: '*.js'
      }
    }
  }
};

export default nextConfig;

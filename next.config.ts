// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: true,
  distDir: 'build', // Output folder

  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        //destination: 'http://192.168.162.3:8083/Services/:path*',
        destination:'https://localhost:5001/api/:path*',
        //destination:'http://172.24.21.9:9090/Services/:path*',
      },
    ];
  },

}

module.exports = nextConfig


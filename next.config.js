/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  optimizeFonts: false,

  // GitHub Pages static export settings
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/pxlmnrch" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/pxlmnrch/" : "",
  trailingSlash: true,

  // Disable server-side image optimization for static export
  images: {
    unoptimized: true,
  },

  async rewrites() {
    return [
      {
        source: "/(links|lnk|l)",
        destination: "/",
      },
    ];
  },
};

module.exports = nextConfig;

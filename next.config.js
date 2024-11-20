/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  optimizeFonts: false,

  // Enable static export for GitHub Pages
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/pxlmnrch" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/pxlmnrch/" : "",
  trailingSlash: true,

  // Disable server-side image optimization
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

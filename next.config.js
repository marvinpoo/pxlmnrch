/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  optimizeFonts: false,

  // Static export settings
  output: "export",
  basePath: "", // No basePath needed since we're using a custom domain
  assetPrefix: "",
  trailingSlash: true,

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

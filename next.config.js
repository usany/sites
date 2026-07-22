/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      '@': './app',
    },
  },
};

module.exports = nextConfig;

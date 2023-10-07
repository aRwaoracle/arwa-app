// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-var-requires,unicorn/prefer-module */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  distDir: 'build',
  productionBrowserSourceMaps: true,
};

module.exports = withBundleAnalyzer(nextConfig);

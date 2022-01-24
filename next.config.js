/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

module.exports = withBundleAnalyzer(
  withMDX({
    reactStrictMode: true,
    images: {
      domains: ['via.placeholder.com'],
    },
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
    webpack: (config, { isServer }) => {
      // Fixes npm packages (mdx) that depend on `fs` module
      if (!isServer) {
        config.resolve.fallback.fs = false
      }
      return config
    },
  }),
)

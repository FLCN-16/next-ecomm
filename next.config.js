const isProduction = process.env.NODE_ENV === "production"

const moduleExports = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    isProduction,
    API_ROUTE: isProduction ? "/api/" : "/api/",
  },
  pageExtensions: ["tsx", "ts"],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // config.watchOptions = {
    //   poll: 5000,
    //   aggregateTimeout: 2500,
    // }

    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      })
    )

    return config
  },
  client: {
    service: "flcn-ecomm",
    includes: ["./**/*.ts"],
    excludes: ["**/__tests__/**", "./node_modules/**"],
  },
  experimental: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
}

module.exports = moduleExports

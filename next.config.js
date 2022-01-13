const path = require("path")

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
    config.resolve.alias["@flcn-ecomm/container"] = path.join(__dirname, "containers")
    config.resolve.alias["@flcn-ecomm/component"] = path.join(__dirname, "components")
    config.resolve.alias["@flcn-ecomm/assets"] = path.join(__dirname, "public")
    config.resolve.alias["@flcn-ecomm"] = path.join(__dirname, "/")

    config.watchOptions = {
      poll: 5000,
      aggregateTimeout: 2500,
    }

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

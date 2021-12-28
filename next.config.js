const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'

const moduleExports = {
  reactStrictMode: true,
  env: {
    isProduction,
    API_ROUTE: isProduction ? '/api/' : '/api/',
  },
  pageExtensions: ['tsx', 'ts'],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias['@flcn-ecomm/container'] = path.join(__dirname, 'containers')
    config.resolve.alias['@flcn-ecomm/component'] = path.join(__dirname, 'components')
    config.resolve.alias['@flcn-ecomm/assets'] = path.join(__dirname, 'public')
    config.resolve.alias['@flcn-ecomm'] = path.join(__dirname, '/')

    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config
  },
  client: {
    service: "flcn-ecomm",
    includes: ["./**/*.ts"],
    excludes: ["**/__tests__/**", "./node_modules/**"]
  }
}

module.exports = moduleExports;
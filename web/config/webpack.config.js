/** @returns {import('webpack').Configuration} Webpack Configuration */
module.exports = (config, { mode }) => {
  if (mode === 'development') {
    // Add dev plugin
  }

  config.module.rules.push({
    test: /\.(md)$/i,
    use: [
      {
        loader: 'raw-loader',
      },
    ],
  })

  return config
}

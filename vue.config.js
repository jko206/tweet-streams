module.exports = {
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // path to resources that's shared across all .scss files
          resources: [
            './src/styles/_global-var.scss',
            // './src/styles/_button.scss',
          ]
        })
        .end()
    })
  }
}
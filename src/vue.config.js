module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  lintOnSave: false,
  pwa: {
    name: 'Vestra',
    themeColor: '#18224B',
    msTileColor: '#D6DDE1',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/service-worker.js',
      // ...other Workbox options...
    },
  },
};

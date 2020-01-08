const path = require('path')

module.exports = {
  publicPath: process.env.PUBLIC_PATH,
  outputDir: process.env.OUTPUT_DIR,
  productionSourceMap: false,
  pwa: {
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      exclude: [/\.htaccess$/],
      navigateFallback: process.env.WB_NAVIGATE_FALLBACK,
      clientsClaim: true,
      runtimeCaching: [
        {
          // Match any same-origin request that contains 'api'.
          urlPattern: '/api/movies/',
          // Apply a network-first strategy.
          handler: 'NetworkFirst',
          options: {
            // Fall back to the cache after 10 seconds.
            networkTimeoutSeconds: 10,
            // Use a custom cache name for this route.
            cacheName: 'my-api-cache',
            // Configure custom cache expiration.
            expiration: {
              maxEntries: 5,
              maxAgeSeconds: 60,
            },
            // Configure background sync.
            backgroundSync: {
              name: 'my-queue-name',
              options: {
                maxRetentionTime: 60 * 60,
              },
            },
            // Configure which responses are considered cacheable.
            cacheableResponse: {
              statuses: [0, 200],
              headers: { 'x-test': 'true' },
            },
            // Configure the broadcast update plugin.
            broadcastUpdate: {
              channelName: 'my-update-channel',
            },
            // Add in any additional plugin logic you need.
            plugins: [
              {
                cacheDidUpdate: () => {
                  console.log("Plugin Code: Yo cache did updizzle")
                }
              }
            ],
            // matchOptions and fetchOptions are used to configure the handler.
            fetchOptions: {
              mode: 'no-cors',
            },
            matchOptions: {
              ignoreSearch: true,
            }
          }
        }, {
          // To match cross-origin requests, use a RegExp that matches
          // the start of the origin:
          urlPattern: new RegExp('^https://image\.tmdb\.org'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }
}

const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/apis',
    createProxyMiddleware({
      target: 'http://localhost:8002/',
      changeOrigin: true,
    }, {
      target: 'http://localhost:8001/',
      changeOrigin: true,
    }),
  )
}
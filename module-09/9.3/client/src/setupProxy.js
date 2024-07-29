// Add a proxy to the API backend
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001/api',
      changeOrigin: true,
    })
  );
};
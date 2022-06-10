const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/v5c',
        createProxyMiddleware({
            target: 'http://44.201.115.26:3001',
            changeOrigin: true,
            logLevel: 'debug',
            // pathRewrite: {
            //     '^/api/old-path': '/api/new-path', // rewrite path
            // },
        })
    );

    app.use(
        '/images',
        createProxyMiddleware({
            target: 'http://44.201.115.26:3001',
            changeOrigin: true,
            logLevel: 'debug',
            // pathRewrite: {
            //     '^/api/old-path': '/api/new-path', // rewrite path
            // },
        })
    );
};

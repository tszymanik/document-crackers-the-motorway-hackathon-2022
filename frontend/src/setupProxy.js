const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/v5c',
        createProxyMiddleware({
            target: 'https://54.194.168.96:3001',
            changeOrigin: true,
            logLevel: 'debug',
            // pathRewrite: {
            //     '^/api/old-path': '/api/new-path', // rewrite path
            // },
        })
    );
};

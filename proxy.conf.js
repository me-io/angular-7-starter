const PROXY_CONFIG = {
    "/api/*": {
        "target": "http://localhost:3500",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug"
    }
};

module.exports = PROXY_CONFIG;

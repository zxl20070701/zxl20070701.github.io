const config = require('./common.config.js');

// 标记开发模式
config.mode = "development";

// 服务器配置
config.devServer = {
    port: 20000,
    hot: false
};

module.exports = config;

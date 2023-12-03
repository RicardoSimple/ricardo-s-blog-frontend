const env = require('./src/config/env');
let basePath = env.basePath;

module.exports = {

    // 服务地址配置
    devServer: {
        // https: false,    // 是否使用https协议
        // hotOnly: true,   // 是否开启热更新
        open: true,         // 是否自动弹出浏览器页面
        host: "localhost",  // 默认本地地址
        port: 9001,         // 默认服务启动端口
        proxy: {
            '/api': {
                //API服务器的地址
                target: basePath + "/",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    },
}

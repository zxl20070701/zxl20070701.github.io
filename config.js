module.exports = {

    // 服务器配置
    devServer: {
        port: 20000
    },

    // 打包入口
    entry: "./src/index.js",

    // 打包出口
    output: {
        folder: "docs",
        entry: "./dist/main.js"
    },

    // 打包后原样复杂的文件夹
    static: "public",

    // 可省略后缀
    suffix: ['.js', '.json'],

    // 文件处理方法
    loader: [{
        test: /\.js$/,
        handler: function (source) {
            return source;
        }
    }, {
        test: /\.json$/,
        handler: function (source) {
            return "export default " + source;
        }
    }]

};

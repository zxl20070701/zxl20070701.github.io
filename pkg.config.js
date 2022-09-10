const scssLoader = require('./bin/loader/scss');
const styleLoader = require('./bin/loader/style');
const templateLoader = require("./bin/loader/template");

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

    // 打包后原样复制的文件夹
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
    }, {
        test: /\.(css|scss)$/,
        handler: function (source) {

            // 如果是scss文件，需要提前解析成css
            if (/\.scss$/.test(this.filepath)) source = scssLoader(source);

            // 生效
            return styleLoader(source);
        }
    }, {
        test: /\.html$/,
        handler: function (source) {
            return "export default " + JSON.stringify(templateLoader(source), null, 4);
        }
    }]

};

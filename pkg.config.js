const scssLoader = require('./bin/loader/scss');
const styleLoader = require('./bin/loader/style');
const templateLoader = require("./bin/loader/template");
const pkg = require('./package.json');

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
        entry: "./dist/main-v" + pkg.version + ".js"
    },

    // 静态资源
    static: "docs",

    // 可省略后缀
    suffix: ['.js', '.json'],

    // 文件处理方法
    loader: [{
        test: /\.js$/,
        handler: function (source) {

            // 需要兼容commonjs语法的
            if (/loader/.test(this.filepath) || /nodejs/.test(this.filepath)) {
                return `

                var module={
                    exports:{}
                };
                var exports=module.exports;
        
                ${source}
        
                export default module.exports;
        
                `;
            }

            // 默认只支持es6+ modules语法
            else {
                return source;
            }
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

            // 测试文件
            if (/\.test\.html$/.test(this.filepath)) {
                return source;
            }

            // 其它
            else {

                let render = templateLoader(source);
                for (let index = 0; index < render.length; index++) {

                    // 删除无用的信息（后续升级优化再调整）
                    delete render[index].preNode;
                    delete render[index].nextNode;
                    delete render[index].parentNode;
                    delete render[index].__deep__;
                    delete render[index].__tagType__;

                }

                return "export default " + JSON.stringify(render);
            }
        }
    }, {
        test: /\.c$/,
        handler: function (source) {
            return "export default " + JSON.stringify(source);
        }
    }]

};

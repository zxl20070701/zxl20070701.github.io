const fs = require('fs');

const mineTypes = require('../nodejs/mime.types.js');
const { fullPath } = require('../nodejs/path');

module.exports = function (configUrl) {
    let config = require(fullPath(configUrl, process.cwd()));

    /**
     * 根据配置生成需要的方法
     */

    // 读取文件，返回文件内容和类型
    config.suffix.unshift("");
    config.$readFileSync = function (filepath) {
        let _filepath;

        // 如果是 /toolbox/ 开头
        if (process.env.NODE_ENV === 'production' || /^\.\/toolbox\//.test(filepath)) {
            let curpath = process.env.NODE_ENV === 'development' ? filepath.replace(/^\.\/toolbox\//, "./") : filepath;

            for (let index = 0; index < config.suffix.length; index++) {
                _filepath = fullPath(curpath + config.suffix[index], process.cwd());

                // 判断文件是否存在，如果存在就说明匹配到了
                if (fs.existsSync(_filepath) && !fs.lstatSync(_filepath).isDirectory()) {
                    let content = fs.readFileSync(_filepath);

                    for (let k = 0; k < config.loader.length; k++) {

                        // 如果匹配到处理loader，
                        // 就需要使用对应的handler进行处理，
                        // 并且返回的格式一定是js
                        if (config.loader[k].test.test(_filepath)) {

                            return {
                                content: config.loader[k].handler.call({
                                    filepath: _filepath
                                }, content + ""),
                                type: /\.spec\.html$/.test(_filepath) ? "text/html" : "application/javascript"
                            };
                        }
                    }

                    return {
                        content,
                        type: mineTypes[index == 0 ? filepath.match(/\.([^.]+)$/)[1] : config.suffix[index].replace(/^\./, '')]
                    };
                }
            }
        }

        // 静态文件
        _filepath = fullPath(filepath, fullPath(config.static, process.cwd()));


        if (fs.existsSync(_filepath) && !fs.lstatSync(_filepath).isDirectory()) {
            return {
                content: fs.readFileSync(_filepath),
                type: mineTypes[filepath.match(/\.([^.]+)$/)[1]]
            }
        }

        throw new Error("file does not exist:" + filepath);
    };

    return config;
};
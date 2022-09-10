const { fullPath } = require('../../nodejs/path');
const { print } = require('../../nodejs/log');

const analyseImport = require('./analyseImport');
const analyseExport = require('./analyseExport');
const urlToIndex = require('./urlToIndex');

// 懒加载文件的编号
let lazyBundleIndex = 0;

module.exports = function analyseBundle(filepath, config) {

    // bundle代码
    // 也就是在解析当前文件的时候，
    // 发现需要额外引入的bundle（不是懒加载文件）
    let bundleCode = "";

    // 当前bundle发现的需要懒加载的文件
    // 记录的只是路径，具体的需要打包主流程触发
    let lazyBundle = [];

    // 如果已经解决
    if (
        // 入口
        global._rootBundle.indexOf(filepath) > -1 ||
        // 当前
        global._currentBundle.indexOf(filepath) > -1) {

        // 因为已经解决了，
        // 也就不需要新增bundle了（直接使用即可），
        // 也不可能增加需要懒加载的文件（同样的，直接使用即可）
        return {
            code: "",
            lazy: []
        };
    }

    // 否则就记录下来
    else {

        // 记录在全局
        if (global._isEntry) {
            global._rootBundle.push(filepath);
        }

        // 记录在当前局部
        else {
            global._currentBundle.push(filepath);
        }

    }

    print("    * [" + urlToIndex(filepath) + "] " + filepath);

    // 获取当前路径上下文
    let filecontext = fullPath('../', filepath);

    // 读取当前代码
    let source = config.$readFileSync(filepath).content;

    // 分析导入语句
    let importStatement = null;
    while (importStatement = /(?:^|\n) *import[^'"]*(['|"]).+\1;*/.exec(source)) {
        importStatement = importStatement[0].replace(/^\n/, '').trim();

        // 获取导入语句的信息
        let importResult = analyseImport(importStatement.replace(/;$/, ''), filecontext);

        // 解析依赖的bundle
        let bundle = analyseBundle(importResult.filepath, config);
        bundleCode += bundle.code;

        // 当然，如果需要懒加载文件，需要登记后续安排解析
        for (let lazyBundleFile of bundle.lazy) { lazyBundle.push(lazyBundleFile); }

        // 原生的导入语句改成内部可以支持的写法
        source = source.replace(importStatement, importResult.statement);
    }

    // 分析导出语句
    let exportStatement = null;
    while (exportStatement = /(?:^|\n) *export [^\n]+\n/.exec(source)) {
        exportStatement = exportStatement[0].replace(/\n$/, '').replace(/^\n/, '').trim();

        // 获取导出语句的信息
        let exportResult = analyseExport(exportStatement);

        // 原生的导出语句改成内部可以支持的写法
        source = source.replace(/\$\$/g, '-special-code-1-').replace(exportStatement.replace(/\$\$/g, '-special-code-1-'), exportResult.replace(/\$\$/g, '-special-code-1-'));
        source = source.replace(/\-special\-code\-1\-/g, '$$$$')
    }

    // 分析懒加载语句
    let lazyStatement = null;
    while (lazyStatement = /import\((['"])([^'"]+)\1\)/.exec(source)) {
        lazyBundleIndex += 1;

        // 懒加载文件地址
        let lazyFilepath = fullPath(lazyStatement[2], filecontext);

        // 懒加载导出地址
        let lazyOutput = global._output.replace(/\.js$/, '-bundle' + lazyBundleIndex + '.js')

        // 如果当前需要懒加载的文件还没有被解析，就登记一下
        if (global._lazyBundle.indexOf(lazyFilepath)) {
            global._lazyBundle.push(lazyFilepath);

            lazyBundle.push({
                source: lazyFilepath,
                target: lazyOutput
            });
        }

        let lazyfilename = lazyOutput.replace(fullPath(config.output.folder, process.cwd()), './').replace(/\\/g, '/').replace(/\/\//g, '/');

        // 原生的导入语句改成内部可以支持的写法
        source = source.replace(lazyStatement[0], `window.__pkg__getLazyBundle('${lazyfilename}','${urlToIndex(lazyFilepath)}')`);
    }

    return {
        code: `
/*************************** [bundle] ****************************/
// Original file:${filepath.replace(process.cwd(), './').replace(/\\/g, '/').replace(/\/\//g, '/')}
/*****************************************************************/
window.__pkg__bundleSrc__['${urlToIndex(filepath)}']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    ${source}
    return __pkg__scope_bundle__;
}
${bundleCode}`,
        lazy: lazyBundle
    };

};
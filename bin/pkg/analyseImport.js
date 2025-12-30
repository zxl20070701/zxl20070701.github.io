const { fullPath } = require('../../nodejs/path');

const urlToIndex = require('./urlToIndex');

module.exports = function analyseBundle(statement, filecontext) {
    let statementArray = statement.replace(/^import +/, '').split('from');

    // 文件路径
    let filepath = fullPath(statementArray.pop().trim().replace(/['"]/g, ''), filecontext);

    // 引入的内部赋值语句写法
    let argsCode = [];
    if (statementArray.length > 0) {
        if (statementArray[0].indexOf('{') > -1) {
            args = statementArray[0].replace('{', '').replace('}', '').split(',');

            for (let i = 0; i < args.length; i++) {
                let arg = args[i].trim();
                argsCode += "var " + arg + "=__pkg__scope_args__." + arg + ";\n";
            }

        } else {
            argsCode += "var " + statementArray[0] + "=__pkg__scope_args__.default;\n";
        }
    }

    return {
        filepath,
        statement: `__pkg__scope_args__=window.__pkg__getBundle('${urlToIndex(filepath)}');\n${argsCode}`
    };
};
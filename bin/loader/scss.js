var toSelector = function (preSelectorArray, deep) {

    var selectors = preSelectorArray[0], i, j, k;

    // 一层层深入
    for (i = 1; i < deep; i++) {

        var temp = [];
        // 前置循环
        for (j = 0; j < selectors.length; j++) {

            // 预选循环
            for (k = 0; k < preSelectorArray[i].length; k++) {

                temp.push(selectors[j] + preSelectorArray[i][k]);

            }

        }

        selectors = temp;
    }

    // 最后补充 {
    return "\n" + (selectors.join(',')) + "{\n";
};

// 把代码变成代码块
// 比如一个注释就是一块，无论注释的内容有多少
var analyseBlock = function (source) {

    var i = -1,

        // 当前面对的字符
        currentChar = null;

    // 获取下一个字符
    var next = function () {
        currentChar = i++ < source.length - 1 ? source[i] : null;
        return currentChar;
    };

    // 获取往后n个值
    var nextNValue = function (n) {
        return source.substring(i, n + i > source.length ? source.length : n + i);
    };

    var blocks = [];
    var currentBlock = "";

    next();

    while (true) {

        // 先剔除空白字符
        // 保证正式开始的时候匹配的是有效的
        while (new RegExp("[\\x20\\t\\r\\n\\f]").test(currentChar)) {
            next();
        }

        // 如果匹配的字符没有了
        if (currentChar == null) break;

        // 如果是注释
        // /* 类型一 */
        if (nextNValue(2) == '/*') {

            next(); next();
            currentBlock = "/*";

            while (nextNValue(2) != '*/' && currentChar != null) {
                currentBlock += currentChar;
                next();
            }

            // 对于注释 /* */
            // 如果到结尾都没有闭合，应该提示语法错误
            if (currentChar == null) {
                throw new Error('The comment is not closed.');
            }

            currentBlock += "*/";
            next(); next();

            blocks.push({
                value: currentBlock,
                type: "comment-double"
            });
        }

        // 如果是注释
        // // 类型二
        else if (nextNValue(2) == '//') {
            currentBlock = '';

            while (currentChar != '\n' && currentChar != null) {
                currentBlock += currentChar;
                next();
            }

            blocks.push({
                value: currentBlock,
                type: "comment-single"
            });

        }

        // 如果是结束
        //  }
        else if (currentChar == '}') {

            blocks.push({
                value: "}",
                type: "end"
            });

            next();

        }

        // 余下，只有两种情况：
        // 1.如是是开始
        //  xxx {
        // 2.可能是一个语句
        //  xxx : xxx ;
        // 这两种都需要进一步匹配
        else {

            currentBlock = '';

            // 目前先没有考虑下列情况：
            // 语句 content:";"
            while (currentChar != '{' && currentChar != ';' && currentChar != null) {
                currentBlock += currentChar;
                next();
            }

            if (currentChar == null) {
                throw new Error('Statement or code block missing closure.');
            }

            blocks.push({
                value: currentBlock + currentChar,
                type: {
                    '{': "begin",
                    ';': 'statement'
                }[currentChar]
            });

            next();

        }

    }

    return blocks;
};


module.exports = function (source) {

    // 分析出代码块

    var blocks = analyseBlock(source);

    // 根据代码块获得最终代码

    var i, j, cssCode = "", preSelectorArray = [], deep = 0;
    for (i = 0; i < blocks.length; i++) {

        // 注释 double
        if (blocks[i].type == 'comment-double') {

            cssCode += blocks[i].value;

        }

        // 注释 single
        else if (blocks[i].type == 'comment-single') {

            cssCode += "\n/* " + blocks[i].value + " */\n";

        }

        // 开始
        else if (blocks[i].type == 'begin') {

            var preSplit = blocks[i].value.split(',');
            var preSelect = [];
            for (j = 0; j < preSplit.length; j++) {

                // 去掉两端的空格
                preSelect[j] = preSplit[j].replace(/\{$/, '').trim();

                // 判断拼接方式
                if (/^&/.test(preSelect[j])) {
                    preSelect[j] = preSelect[j].replace(/^&/, '');
                } else {
                    preSelect[j] = " " + preSelect[j];
                }

            }

            // 登记到前缀数组
            preSelectorArray[deep] = preSelect;
            deep += 1;
        }

        // 结束
        else if (blocks[i].type == 'end') {

            deep -= 1;

        }

        // 语句
        else if (blocks[i].type == 'statement') {

            // 如果是第一个
            j = 1;
            var preType = blocks[i - j].type;
            while (['comment-double', 'comment-single'].indexOf(preType) > -1) {
                j += 1;
                preType = blocks[i - j].type;
            }
            if (['end', 'begin'].indexOf(preType) > -1) {
                cssCode += toSelector(preSelectorArray, deep);
            }

            cssCode += "\n" + blocks[i].value + "\n";

            // 如果是最后一个
            j = 1;
            var nextType = blocks[i + j].type;
            while (['comment-double', 'comment-single'].indexOf(nextType) > -1) {
                j += 1;
                nextType = blocks[i + j].type;
            }
            if (['end', 'begin'].indexOf(nextType) > -1) {
                cssCode += "\n}\n";
            }

        }

    }

    return cssCode;
};
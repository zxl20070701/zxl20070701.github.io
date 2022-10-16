
/*************************** [bundle] ****************************/
// Original file:./src/pages/scss/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['29']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('92');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('93');


__pkg__scope_args__=window.__pkg__getBundle('94');
var scssLoader =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj) {
    return {
        render: template,
        beforeMount: function () {
            document.getElementsByTagName('title')[0].innerText = "scss转css";
            document.getElementById('icon-logo').setAttribute('href', './scss.png');
        },
        methods: {
            scssToCss: function () {
                var sourceEl = document.getElementById('source-id');
                var targetEl = document.getElementById('target-id');
                targetEl.value = scssLoader(sourceEl.value);
            }
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/scss/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['92']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,7]},{"type":"tag","name":"div","attrs":{},"childNodes":[2,6]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3,4]},{"type":"text","content":"源代码","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"run","ui-on:click":"scssToCss"},"childNodes":[5]},{"type":"text","content":"运行","childNodes":[]},{"type":"tag","name":"textarea","attrs":{"id":"source-id"},"childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[8,10]},{"type":"tag","name":"h2","attrs":{},"childNodes":[9]},{"type":"text","content":"运行结果","childNodes":[]},{"type":"tag","name":"textarea","attrs":{"id":"target-id"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/scss/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['93']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view]{\n\nwidth: calc(100vw - 200px);\n\nheight: calc(100vh - 100px);\n\nposition: fixed;\n\ntop: 50px;\n\nleft: 100px;\n\nfont-size: 0;\n\nwhite-space: nowrap;\n\n}\n\n [page-view]>div{\n\ndisplay: inline-block;\n\nfont-size: 16px;\n\nwhite-space: normal;\n\nvertical-align: top;\n\noutline: 1px solid #8c9da5;\n\nmargin: 20px 0 0 20px;\n\n}\n\n [page-view]>div>h2{\n\nborder-bottom: 1px solid #8c9da5;\n\nheight: 50px;\n\nline-height: 50px;\n\npadding: 0 20px;\n\nposition: relative;\n\nfont-family: cursive;\n\nfont-weight: 200;\n\n}\n\n [page-view]>div>h2>button{\n\nposition: absolute;\n\nright: 10px;\n\ntop: 10px;\n\nheight: 30px;\n\nline-height: 30px;\n\npadding: 0 20px;\n\nborder: none;\n\noutline: none;\n\ncolor: white;\n\ncursor: pointer;\n\n}\n\n [page-view]>div>h2>button.run{\n\nbackground-color: #d05a90;\n\n}\n\n [page-view]>div>textarea{\n\nwidth: calc(50vw - 130px);\n\nheight: calc(100vh - 190px);\n\noutline: none;\n\nborder: none;\n\npadding: 10px;\n\nfont-family: cursive;\n\nfont-size: 14px;\n\nfont-weight: 400;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./bin/loader/scss
/*****************************************************************/
window.__pkg__bundleSrc__['94']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    

                var module={
                    exports:{}
                };
                var exports=module.exports;
        
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
            j = 1
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
        
                __pkg__scope_bundle__.default= module.exports;
        
                

    return __pkg__scope_bundle__;
}


/*************************** [bundle] ****************************/
// Original file:./src/pages/format-json/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['26']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('65');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('66');


__pkg__scope_args__=window.__pkg__getBundle('67');
var formatJSON =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj) {
    return {
        render: template,
        data: {

        },
        beforeMount: function () {
            document.getElementsByTagName('title')[0].innerText = "格式化JSON字符串";
            document.getElementById('icon-logo').setAttribute('href', './format-json.png');
        },
        methods: {
            formatJSON: function () {
                var sourceEl = document.getElementById('source-id');
                var targetEl = document.getElementById('target-id');
                targetEl.value = JSON.stringify(formatJSON(sourceEl.value), null, 4);
            }
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/format-json/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['65']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,7]},{"type":"tag","name":"div","attrs":{},"childNodes":[2,6]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3,4]},{"type":"text","content":"源代码","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"run","ui-on:click":"formatJSON"},"childNodes":[5]},{"type":"text","content":"运行","childNodes":[]},{"type":"tag","name":"textarea","attrs":{"id":"source-id"},"childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[8,10]},{"type":"tag","name":"h2","attrs":{},"childNodes":[9]},{"type":"text","content":"运行结果","childNodes":[]},{"type":"tag","name":"textarea","attrs":{"id":"target-id"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/format-json/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['66']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view]{\n\nwidth: calc(100vw - 200px);\n\nheight: calc(100vh - 100px);\n\nposition: fixed;\n\ntop: 50px;\n\nleft: 100px;\n\nfont-size: 0;\n\nwhite-space: nowrap;\n\n}\n\n [page-view]>div{\n\ndisplay: inline-block;\n\nfont-size: 16px;\n\nwhite-space: normal;\n\nvertical-align: top;\n\noutline: 1px solid #8c9da5;\n\nmargin: 20px 0 0 20px;\n\n}\n\n [page-view]>div>h2{\n\nborder-bottom: 1px solid #8c9da5;\n\nheight: 50px;\n\nline-height: 50px;\n\npadding: 0 20px;\n\nposition: relative;\n\nfont-family: cursive;\n\nfont-weight: 200;\n\n}\n\n [page-view]>div>h2>button{\n\nposition: absolute;\n\nright: 10px;\n\ntop: 10px;\n\nheight: 30px;\n\nline-height: 30px;\n\npadding: 0 20px;\n\nborder: none;\n\noutline: none;\n\ncolor: white;\n\ncursor: pointer;\n\n}\n\n [page-view]>div>h2>button.run{\n\nbackground-color: #009688;\n\n}\n\n [page-view]>div>textarea{\n\nwidth: calc(50vw - 130px);\n\nheight: calc(100vh - 190px);\n\noutline: none;\n\nborder: none;\n\npadding: 10px;\n\nfont-family: cursive;\n\nfont-size: 14px;\n\nfont-weight: 400;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/json/index
/*****************************************************************/
window.__pkg__bundleSrc__['67']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('7');
var isString =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('68');
var analyseWord =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('69');
var toValue =__pkg__scope_args__.default;


// 把一段字符串变成json返回
__pkg__scope_bundle__.default= function (express) {

    if (isString(express)) {

        // 先分析出来单词
        var wordArray = analyseWord(express);

        /**
         * 思路：
         * 从后往前找，找到第一个需要归结的，直接归结，
         * 归结完毕以后，继续，知道找到开头，说明归结完毕，
         * 这样设计的好处是：
         * 从后往前找，一定是叶子，这就消除了递归。
         */
        var i = wordArray.length - 1, j;

        // 只要单词数组归结完毕
        while (wordArray.length > 1) {

            // 从后往前找第一个需要归结的子对象
            while (i >= 0 && (wordArray[i].type != 'insign' || ['{', '['].indexOf(wordArray[i].value) < 0)) {
                i = i - 1;
            }

            if (i < 0) {
                // 如果到开头都没有遇到，缺少开始符号
                throw new Error("Illegal express : " + express + "\nstep='toOne-searchBeginIndex',wordArray=" + wordArray);
            }

            // 然后合并
            j = i + 1;
            var subWordArray = [wordArray[i]];
            while (j < wordArray.length && (wordArray[j].type != 'insign' || wordArray[j].value != {
                "{": "}",
                "[": "]"
            }[wordArray[i].value])) {
                subWordArray.push(wordArray[j]);
                j = j + 1;
            }

            if (j >= wordArray.length) {
                // 如果到结尾都没有需要应该闭合的符号，缺少闭合符号
                throw new Error("Illegal express : " + express + "\nstep='toOne-searchEndIndex',wordArray=" + wordArray);
            } else {

                // 结尾追加进去
                subWordArray.push(wordArray[j]);

                // 归结
                wordArray[i] = toValue(subWordArray);

                // 调整
                wordArray.splice(i + 1, j - i);
            }


        }

        // 返回计算结果
        return wordArray[0].value;

    } else {

        throw new Error('The data passed is not a string.');

    }

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/json/analyseWord
/*****************************************************************/
window.__pkg__bundleSrc__['68']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('46');
var ReadString =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (express) {

    // 剔除开头和结尾的空白
    express = express.trim();

    // 获取字符串分析对象
    var reader = ReadString(express);

    var wordArray = [];
    var tempWord = "";
    reader.readNext();

    // 定义一个追加普通串的方法
    var pushNormal = function () {
        tempWord = tempWord.trim();
        if (tempWord != '') {
            wordArray.push({
                type: "normal",
                value: tempWord
            });
        }
        tempWord = "";
    };

    while (true) {

        if (reader.index >= express.length) break;

        // 单行注释
        if (reader.getNextN(2) == '//') {
            while (!/\n/.test(reader.readNext()) && reader.index < express.length);
        }

        // 多行注释
        else if (reader.getNextN(2) == '/*') {
            while (reader.getNextN(2) != '*/') {
                if (reader.index >= express.length) {
                    throw new Error("Multiline comment not closed correctly : " + express + "\nstep='analyseWord-searchEndComment'");
                }
                reader.readNext();
            }
            reader.readNext();
            reader.readNext();
        }

        // 如果是边界符号
        else if (['{', '}', ',', '[', ']', ':'].indexOf(reader.currentChar) > -1) {
            pushNormal();

            wordArray.push({
                type: "insign",
                value: reader.currentChar
            });
            reader.readNext();
        }

        // 如果遇到字符串，应该是一个独立的单词
        else if (['"', "'"].indexOf(reader.currentChar) > -1) {

            var tempStrWord = "";
            while (['"', "'"].indexOf(reader.readNext()) < 0) {
                if (reader.index >= express.length) {
                    throw new Error("The string is not closed correctly : " + express + "\nstep='analyseWord-searchString',currentStrWord=" + tempStrWord);
                }
                tempStrWord += reader.currentChar;
            }
            reader.readNext();
            wordArray.push({
                type: "string",
                value: tempStrWord
            });

        } else {
            tempWord += reader.currentChar;
            reader.readNext();
        }

    }

    return wordArray;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/ReadString
/*****************************************************************/
window.__pkg__bundleSrc__['46']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (express) {

    var reader = {
        index: -1,
        currentChar: null
    };

    // 读取下一个字符
    reader.readNext = function () {
        reader.currentChar = reader.index++ < express.length - 1 ? express[reader.index] : null;
        return reader.currentChar;
    };

    // 获取往后num个值
    reader.getNextN = function (num) {
        return express.substring(reader.index, num + reader.index > express.length ? express.length : num + reader.index);
    };

    return reader;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/json/toValue
/*****************************************************************/
window.__pkg__bundleSrc__['69']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var toValue = function (word) {

    if (word.type != 'string' && word.type != 'object') {

        // 数字
        if (/[+-]{0,1}\d{1,}\.{0,1}\d{0,}/.test(word.value)) {
            return +word.value;
        }

        // undefined
        else if (word.value == 'undefined') {
            return undefined;
        }

        // null
        else if (word.value == 'null') {
            return null;
        }

        // false
        else if (word.value == 'false') {
            return false;
        }

        // true
        else if (word.value == 'true') {
            return true;
        }

    }

    return word.value;
}

__pkg__scope_bundle__.default= function (wordArray) {

    var value, i;

    // 是json
    if (wordArray[0].value == '{') {
        value = {};
        for (i = 3; i < wordArray.length; i += 4) {
            value[wordArray[i - 2].value] = toValue(wordArray[i]);
        }
    }

    // 数组
    else {
        value = [];
        for (i = 2; i < wordArray.length; i += 2) {
            value.push(toValue(wordArray[i - 1]));
        }
    }

    return {
        type: "object",
        value: value
    };
};


    return __pkg__scope_bundle__;
}

var htmlColors = {
    "text": "#000000",/*文本颜色*/
    "annotation": "#6a9955",/*注释颜色*/
    "insign": "#9e9e9e",/*符号颜色*/
    "node": "#1e50b3",/*结点颜色*/
    "attrKey": "#1e83b1",/*属性名称颜色*/
    "attrValue": "#ac4c1e"/*属性值颜色*/
};

var xmlColors = {
    "text": "#000000",/*文本颜色*/
    "annotation": "#6a9955",/*注释颜色*/
    "insign": "#9e9e9e",/*符号颜色*/
    "node": "#1e50b3",/*结点颜色*/
    "attrKey": "#1e83b1",/*属性名称颜色*/
    "attrValue": "#ac4c1e"/*属性值颜色*/
};

var cssColors = {
    "annotation": "#6a9955",/*注释颜色*/
    "insign": "#9e9e9e",/*符号颜色*/
    "selector": "#1e50b3",/*选择器*/
    "attrKey": "#1e83b1",/*属性名称颜色*/
    "attrValue": "#ac4c1e"/*属性值颜色*/
};

var jsColors = {
    "text": "#000000",/*文本颜色*/
    "annotation": "#6a9955",/*注释颜色*/
    "insign": "#9e9e9e",/*符号颜色*/
    "key": "#ff0000",/*关键字颜色*/
    "string": "#ac4c1e",/*字符串颜色*/
    "funName": "#1e50b3",/*函数名称颜色*/
    "execName": "#1e83b1"/*执行方法颜色*/
};

var pythonColors = {
    "text": "#000000",/*文本颜色*/
    "annotation": "#6a9955",/*注释颜色*/
    "insign": "#9e9e9e",/*符号颜色*/
    "key": "#ff0000",/*关键字颜色*/
    "string": "#ac4c1e",/*字符串颜色*/
    "funName": "#1e50b3",/*函数名称颜色*/
    "execName": "#1e83b1"/*执行方法颜色*/
};

var jsonColors = {
    "text": "#000000",/*文本颜色*/
    "annotation": "#6a9955",/*注释颜色*/
    "insign": "#9e9e9e",/*符号颜色*/
    "string": "#ac4c1e",/*字符串颜色*/
    "number": "#1e50b3",/*数字颜色*/
    "keyword": "#1e83b1"/*关键字颜色*/
};

var javaColors = {
    "text": "#000000",/*文本颜色*/
    "annotation": "#6a9955",/*注释颜色*/
    "insign": "#9e9e9e",/*符号颜色*/
    "key": "#ff0000",/*关键字颜色*/
    "string": "#ac4c1e",/*字符串颜色*/
    "funName": "#1e50b3",/*函数名称颜色*/
    "execName": "#1e83b1"/*执行方法颜色*/
};

var goColors = {
    "text": "#000000",/*文本颜色*/
    "annotation": "#6a9955",/*注释颜色*/
    "insign": "#9e9e9e",/*符号颜色*/
    "key": "#ff0000",/*关键字颜色*/
    "string": "#ac4c1e",/*字符串颜色*/
    "funName": "#1e50b3",/*函数名称颜色*/
    "execName": "#1e83b1"/*执行方法颜色*/
};

var cColors = {
    "text": "#000000",/*文本颜色*/
    "annotation": "#6a9955",/*注释颜色*/
    "insign": "#9e9e9e",/*符号颜色*/
    "key": "#ff0000",/*关键字颜色*/
    "string": "#ac4c1e",/*字符串颜色*/
    "funName": "#1e50b3",/*函数名称颜色*/
    "execName": "#1e83b1"/*执行方法颜色*/
};

var kotlinColors = {
    "text": "#000000",/*文本颜色*/
    "annotation": "#6a9955",/*注释颜色*/
    "insign": "#9e9e9e",/*符号颜色*/
    "key": "#ff0000",/*关键字颜色*/
    "string": "#ac4c1e",/*字符串颜色*/
    "funName": "#1e50b3",/*函数名称颜色*/
    "execName": "#1e83b1"/*执行方法颜色*/
};

var shellColors = {
    "text": "#000000",/*文本颜色*/
    "annotation": "#6a9955",/*注释颜色*/
    "insign": "#9e9e9e",/*符号颜色*/
    "command": "#1e50b3",/*命令颜色*/
    "option": "#1e83b1",/*选项颜色*/
    "argument": "#ac4c1e",/*参数颜色*/
    "string": "#ac4c1e",/*字符串颜色*/
    "variable": "#ff0000"/*变量颜色*/
};

var sqlColors = {
    "text": "#000000",/*文本颜色*/
    "annotation": "#6a9955",/*注释颜色*/
    "insign": "#9e9e9e",/*符号颜色*/
    "key": "#ff0000",/*关键字颜色*/
    "string": "#ac4c1e",/*字符串颜色*/
    "number": "#1e50b3",/*数字颜色*/
    "funName": "#1e83b1"/*函数名称颜色*/
};

var _cssShader = function (textString, colors) {
    var shaderArray = [];

    // 当前面对的
    var i = 0;

    // 获取往后n个值
    var nextNValue = function (n) {
        return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = "";

    // 1:选择器 tag
    // 2:属性名 attr
    // 3:属性值 string
    var state = "tag";

    // 初始化模板，开始文本捕获
    var initTemplate = function () {
        if (template != "") {
            shaderArray.push({
                color: {
                    tag: colors.selector,
                    attr: colors.attrKey,
                    string: colors.attrValue
                }[state],
                content: template
            });
        }

        template = "";
    };

    while (true) {

        /* 1.注释 */

        if (nextNValue(2) == '/*') {

            initTemplate();
            while (nextNValue(2) !== '*/' && i < textString.length) {
                template += textString[i++];
            }

            shaderArray.push({
                color: colors.annotation,
                content: template + nextNValue(2)
            });
            i += 2;
            template = "";

        }

        /* 2.字符串 */

        else if (["'", '"'].indexOf(nextNValue(1)) > -1) {

            var strBorder = nextNValue(1);
            initTemplate();

            do {
                template += textString[i++];
            } while (nextNValue(1) != strBorder && i < textString.length)

            // 因为可能是没有字符导致的结束
            if (nextNValue(1) != strBorder) {
                strBorder = "";
            } else {
                i += 1;
            }

            shaderArray.push({
                color: colors.attrValue,
                content: template + strBorder
            });
            template = "";

        }

        /* 3.边界 */

        else if ([":", '{', '}', ";"].indexOf(nextNValue(1)) > -1) {

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: nextNValue(1)
            });
            template = "";

            if (nextNValue(1) == '{' || nextNValue(1) == ';') {
                state = 'attr';
            } else if (nextNValue(1) == '}') {
                state = 'tag';
            } else {
                state = 'string';
            }

            i += 1;
        }

        /* 追加字符 */

        else {
            if (i >= textString.length) {
                initTemplate();
                break;
            } else {
                template += textString[i++];
            }
        }

    }
    return shaderArray;
};

var _jsShader = function (textString, colors) {

    // JS关键字
    var keyWords = [
        "abstract", "arguments", "boolean", "break", "byte",
        "case", "catch", "char", "class", "const",
        "continue", "debugger", "default", "delete", "do",
        "double", "else", "enum", "eval", "export",
        "extends", "false", "final", "finally", "float",
        "for", "function", "goto", "if", "implements",
        "import", "in", "instanceof", "int", "interface",
        "let", "long", "native", "new", "null",
        "package", "private", "protected", "public", "return",
        "short", "static", "super", "switch", "synchronized",
        "this", "throw", "throws", "transient", "true",
        "try", "typeof", "var", "void", "volatile",
        "while", "with", "yield"
    ];

    var shaderArray = [];

    // 当前面对的
    var i = 0;

    // 获取往后n个值
    var nextNValue = function (n) {
        return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = "";

    // 初始化模板，开始文本捕获
    var initTemplate = function () {
        if (template != "") {

            // 考虑开始的(
            if (template[0] == '(') {
                shaderArray.push({
                    color: colors.insign,
                    content: "("
                });
                template = template.substring(1);
            }

            shaderArray.push({
                color: colors.text,
                content: template
            });
        }

        template = "";
    };

    while (true) {

        /* 1.注释1 */

        if (nextNValue(2) == '/*') {

            initTemplate();
            while (nextNValue(2) !== '*/' && i < textString.length) {
                template += textString[i++];
            }

            shaderArray.push({
                color: colors.annotation,
                content: template + nextNValue(2)
            });
            i += 2;
            template = "";

        }

        /* 2.注释2 */

        else if (nextNValue(2) == '//') {
            initTemplate();
            while (nextNValue(1) !== '\n' && i < textString.length) {
                template += textString[i++];
            }
            shaderArray.push({
                color: colors.annotation,
                content: template
            });
            template = "";
        }

        /* 3.字符串 */

        else if (["'", '"', '`'].indexOf(nextNValue(1)) > -1) {

            var strBorder = nextNValue(1);
            initTemplate();

            do {
                template += textString[i++];
            } while (nextNValue(1) != strBorder && i < textString.length)

            // 因为可能是没有字符导致的结束
            if (nextNValue(1) != strBorder) {
                strBorder = "";
            } else {
                i += 1;
            }

            shaderArray.push({
                color: colors.string,
                content: template + strBorder
            });
            template = "";

        }


        /* 4.函数定义 */

        else if (nextNValue(1) == '(' && (template[0] == ' ' || (i - template.length - 1 >= 0 && textString[i - template.length - 1] == " "))) {
            shaderArray.push({
                color: colors.funName,
                content: template
            });
            i += 1;
            template = "(";

        }

        /* 5.方法调用 */

        else if (nextNValue(1) == '(') {

            shaderArray.push({
                color: colors.execName,
                content: template
            });
            i += 1;
            template = "(";
        }

        /* 6.边界 */

        else if ([";", '{', '}', '(', ')', '.', '\n', '=', '+', '>', '<', '[', ']', '-', '*', '/', '^', '*', '!'].indexOf(nextNValue(1)) > -1) {

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: nextNValue(1)
            });
            template = "";
            i += 1;
        }

        /* 7.关键字 */

        else if (nextNValue(1) == ' ' && keyWords.indexOf(template.trim()) > -1) {

            shaderArray.push({
                color: colors.key,
                content: template + " "
            });
            template = "";
            i += 1;

        }

        /* 追加字符 */

        else {
            if (i >= textString.length) {
                initTemplate();
                break;
            } else {
                template += textString[i++];
            }
        }

    }

    return shaderArray;
};

var _htmlShader = function (textString, colors) {

    textString = textString.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    var shaderArray = [];

    // 当前面对的
    var i = 0;

    // 获取往后n个值
    var nextNValue = function (n) {
        return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = "";

    // 初始化模板，开始文本捕获
    var initTemplate = function () {
        if (template != "") {
            shaderArray.push({
                color: colors.text,
                content: template
            });
        }

        template = "";
    };

    // 匹配属性值模板
    var getAttrValueTemplate = function () {
        var endStr = " ";
        // 寻找属性值边界
        if (nextNValue(1) == '"') endStr = '"';
        if (nextNValue(1) == "'") endStr = "'";

        // 到达边界前一直寻找下一个
        do {
            template += textString[i++];
        } while (nextNValue(1) != endStr && i < textString.length);

        // 如果是匹配成功而不是匹配到末尾
        if (endStr != " " && i < textString.length) {
            template += endStr;
            i += 1;
        }

        shaderArray.push({
            color: colors.attrValue,
            content: template
        });
        template = "";
    };

    while (true) {

        /* 1.注释 */

        if (nextNValue(4) == '<!--') {

            initTemplate();
            while (nextNValue(3) !== '-->' && i < textString.length) {
                template += textString[i++];
            }

            shaderArray.push({
                color: colors.annotation,
                content: template + nextNValue(3)
            });
            i += 3;
            template = "";

        }

        /* 2.</ */

        else if (nextNValue(2) == '</') {

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: "</"
            });
            i += 2;

            while (nextNValue(1) !== '>' && i < textString.length) {
                template += textString[i++];
            }

            if (template != "") {
                shaderArray.push({
                    color: colors.node,
                    content: template
                });
                template = "";

                if (i < textString.length) {
                    shaderArray.push({
                        color: colors.insign,
                        content: ">"
                    });
                    i += 1;
                }

            }
        }

        /* 3.< */

        else if (nextNValue(1) == '<' && nextNValue(2) != '< ') {

            var specialTag = "";

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: "<"
            });
            i += 1;

            // 寻找标签名称
            while (nextNValue(1) != '>' && nextNValue(1) != ' ' && i < textString.length) {
                template += textString[i++];
            }
            if (template != '') {

                // 针对style和script这样特殊的标签，内部需要调用对应的着色器着色
                if (template == "style" || template == 'script') {
                    specialTag = "</" + template + ">";
                }

                shaderArray.push({
                    color: colors.node,
                    content: template
                });

                template = '';
                if (i < textString.length) {

                    // 寻找标签属性
                    while (i < textString.length) {

                        // 遇到这个表示标签结束了
                        // 也就意味着标签匹配结束
                        if (nextNValue(1) == ">") {

                            initTemplate();
                            shaderArray.push({
                                color: colors.insign,
                                content: ">"
                            });
                            i += 1;
                            break;
                        }

                        // 如果是空格，表示是属性之间，接着查看下一个即可
                        else if (nextNValue(1) != ' ') {

                            initTemplate();

                            // 匹配属性名称
                            if (nextNValue(1) != '"' && nextNValue(1) != "'") {

                                // 如果不是=或>和空格就继续
                                while (nextNValue(1) != "=" && nextNValue(1) != '>' && i < textString.length && nextNValue(1) != " ") {
                                    template += textString[i++];
                                }
                                if (template != "") {
                                    shaderArray.push({
                                        color: colors.attrKey,
                                        content: template
                                    });
                                    template = "";

                                    // 如果下一个是=，就接着找属性值
                                    if (nextNValue(1) == '=') {
                                        shaderArray.push({
                                            color: colors.insign,
                                            content: "="
                                        });
                                        i += 1;


                                        if (i < textString.length && nextNValue(1) != " " && nextNValue(1) != '>') {
                                            // 寻找属性值
                                            getAttrValueTemplate();

                                        }
                                    }
                                } else {
                                    template += textString[i++];
                                }
                            } else if (nextNValue(1) == '=') {
                                shaderArray.push({
                                    color: colors.insign,
                                    content: "="
                                });
                                i += 1;
                            } else {
                                if (i < textString.length && nextNValue(1) != " " && nextNValue(1) != '>') {

                                    getAttrValueTemplate();

                                }
                            }

                        } else {
                            template += textString[i++];
                        }

                    }

                }

            }

            if (specialTag != "") {

                var oldI = i, oldTemplate = template, langHelp, innerShaderArray;
                while (nextNValue(specialTag.length) != specialTag && i < textString.length) {
                    template += textString[i++];
                }

                if (i < textString.length) {

                    langHelp = specialTag.replace(/<\//, '');

                    innerShaderArray = {
                        "style>": _cssShader,
                        "script>": _jsShader
                    }[langHelp](template, {
                        "style>": cssColors,
                        "script>": jsColors
                    }[langHelp]);

                    innerShaderArray.forEach(function (innerShader) {
                        shaderArray.push(innerShader);
                    });

                    template = "";
                } else {
                    template = oldTemplate;
                    i = oldI;
                }

            }

        }

        /* 追加字符 */

        else {
            if (i >= textString.length) {
                initTemplate();
                break;
            } else {
                template += textString[i++];
            }
        }

    }

    for (i = 0; i < shaderArray.length; i++) {
        shaderArray[i].content = shaderArray[i].content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    return shaderArray;

};

var _xmlShader = function (textString, colors) {

    textString = textString.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    var shaderArray = [];

    // 当前面对的
    var i = 0;

    // 获取往后n个值
    var nextNValue = function (n) {
        return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = "";

    // 初始化模板，开始文本捕获
    var initTemplate = function () {
        if (template != "") {
            shaderArray.push({
                color: colors.text,
                content: template
            });
        }

        template = "";
    };

    // 匹配属性值模板
    var getAttrValueTemplate = function () {
        var endStr = " ";
        // 寻找属性值边界
        if (nextNValue(1) == '"') endStr = '"';
        if (nextNValue(1) == "'") endStr = "'";

        // 到达边界前一直寻找下一个
        do {
            template += textString[i++];
        } while (nextNValue(1) != endStr && i < textString.length);

        // 如果是匹配成功而不是匹配到末尾
        if (endStr != " " && i < textString.length) {
            template += endStr;
            i += 1;
        }

        shaderArray.push({
            color: colors.attrValue,
            content: template
        });
        template = "";
    };

    // 匹配标签（或xml声明）中的属性，
    // isDeclaration为true时以?>结束，否则以>或/>结束
    var getAttrTemplate = function (isDeclaration) {

        while (i < textString.length) {

            // 边界：声明结束
            if (isDeclaration && nextNValue(2) == '?>') {
                initTemplate();
                shaderArray.push({
                    color: colors.insign,
                    content: "?>"
                });
                i += 2;
                break;
            }

            // 边界：自闭合标签结束
            if (!isDeclaration && nextNValue(2) == '/>') {
                initTemplate();
                shaderArray.push({
                    color: colors.insign,
                    content: "/>"
                });
                i += 2;
                break;
            }

            // 边界：标签结束
            if (!isDeclaration && nextNValue(1) == '>') {
                initTemplate();
                shaderArray.push({
                    color: colors.insign,
                    content: ">"
                });
                i += 1;
                break;
            }

            // 空格表示属性之间，接着查看下一个即可
            if (nextNValue(1) == ' ') {
                template += textString[i++];
                continue;
            }

            initTemplate();

            // 匹配属性名称
            while (nextNValue(1) != "=" && nextNValue(1) != '>' && nextNValue(1) != '/' && nextNValue(1) != '?' && nextNValue(1) != ' ' && i < textString.length) {
                template += textString[i++];
            }

            if (template != "") {
                shaderArray.push({
                    color: colors.attrKey,
                    content: template
                });
                template = "";

                // 如果下一个是=，就接着找属性值
                if (nextNValue(1) == '=') {
                    shaderArray.push({
                        color: colors.insign,
                        content: "="
                    });
                    i += 1;

                    // 属性值存在时才继续寻找
                    if (i < textString.length && nextNValue(1) != ' ') {
                        var atValueEnd = isDeclaration ? nextNValue(2) == '?>' : (nextNValue(1) == '>' || nextNValue(2) == '/>');
                        if (!atValueEnd) {
                            getAttrValueTemplate();
                        }
                    }
                }
            } else {
                template += textString[i++];
            }

        }
    };

    while (true) {

        /* 1.注释 */

        if (nextNValue(4) == '<!--') {

            initTemplate();
            while (nextNValue(3) !== '-->' && i < textString.length) {
                template += textString[i++];
            }

            shaderArray.push({
                color: colors.annotation,
                content: template + nextNValue(3)
            });
            i += 3;
            template = "";

        }

        /* 2.CDATA */

        else if (nextNValue(9) == '<![CDATA[') {

            initTemplate();
            while (nextNValue(3) !== ']]>' && i < textString.length) {
                template += textString[i++];
            }

            shaderArray.push({
                color: colors.attrValue,
                content: template + nextNValue(3)
            });
            i += 3;
            template = "";

        }

        /* 3.xml声明 */

        else if (nextNValue(2) == '<?') {

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: "<?"
            });
            i += 2;

            // 声明名称（如xml）
            while (nextNValue(1) != '?' && nextNValue(1) != ' ' && i < textString.length) {
                template += textString[i++];
            }
            if (template != "") {
                shaderArray.push({
                    color: colors.node,
                    content: template
                });
                template = "";
            }

            getAttrTemplate(true);

        }

        /* 4.结束标签 */

        else if (nextNValue(2) == '</') {

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: "</"
            });
            i += 2;

            while (nextNValue(1) !== '>' && i < textString.length) {
                template += textString[i++];
            }

            if (template != "") {
                shaderArray.push({
                    color: colors.node,
                    content: template
                });
                template = "";

                if (i < textString.length) {
                    shaderArray.push({
                        color: colors.insign,
                        content: ">"
                    });
                    i += 1;
                }

            }
        }

        /* 5.开始标签 */

        else if (nextNValue(1) == '<') {

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: "<"
            });
            i += 1;

            // 寻找标签名称
            while (nextNValue(1) != '>' && nextNValue(1) != '/' && nextNValue(1) != ' ' && i < textString.length) {
                template += textString[i++];
            }
            if (template != "") {
                shaderArray.push({
                    color: colors.node,
                    content: template
                });
                template = "";

                getAttrTemplate(false);
            }

        }

        /* 追加字符 */

        else {
            if (i >= textString.length) {
                initTemplate();
                break;
            } else {
                template += textString[i++];
            }
        }

    }

    for (i = 0; i < shaderArray.length; i++) {
        shaderArray[i].content = shaderArray[i].content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    return shaderArray;

};

var _pythonShader = function (textString, colors) {

    // python关键字
    var keyWords = ['False', 'None', 'True', 'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield'];

    var shaderArray = [];

    // 当前面对的
    var i = 0;

    // 获取往后n个值
    var nextNValue = function (n) {
        return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = "";

    // 初始化模板，开始文本捕获
    var initTemplate = function () {
        if (template != "") {

            // 考虑开始的(
            if (template[0] == '(') {
                shaderArray.push({
                    color: colors.insign,
                    content: "("
                });
                template = template.substring(1);
            }

            shaderArray.push({
                color: colors.text,
                content: template
            });
        }

        template = "";
    };

    while (true) {

        /* 1.注释 */

        if (nextNValue(1) == '#') {
            initTemplate();
            while (nextNValue(1) !== '\n' && i < textString.length) {
                template += textString[i++];
            }
            shaderArray.push({
                color: colors.annotation,
                content: template
            });
            template = "";
        }

        /* 2.字符串 */

        else if (["'", '"'].indexOf(nextNValue(1)) > -1) {

            var strBorder = nextNValue(1);
            initTemplate();

            do {
                template += textString[i++];
            } while (nextNValue(1) != strBorder && i < textString.length)

            // 因为可能是没有字符导致的结束
            if (nextNValue(1) != strBorder) {
                strBorder = "";
            } else {
                i += 1;
            }

            shaderArray.push({
                color: colors.string,
                content: template + strBorder
            });
            template = "";

        }


        /* 3.边界 */

        else if ([':', '{', '}', '(', ')', '.', '\n', '=', '+', '>', '<', '[', ']', '-', '*', '/', '^', '*', '!'].indexOf(nextNValue(1)) > -1) {

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: nextNValue(1)
            });
            template = "";
            i += 1;
        }

        /* 4.关键字 */

        else if (nextNValue(1) == ' ' && keyWords.indexOf(template.trim()) > -1) {

            shaderArray.push({
                color: colors.key,
                content: template + " "
            });
            template = "";
            i += 1;

        }

        /* 追加字符 */

        else {
            if (i >= textString.length) {
                initTemplate();
                break;
            } else {
                template += textString[i++];
            }
        }

    }

    return shaderArray;
};

var _jsonShader = function (textString, colors) {
    var shaderArray = [];

    // 当前面对的
    var i = 0;

    // 获取往后n个值
    var nextNValue = function (n) {
        return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = "";

    // 初始化模板，开始文本捕获
    var initTemplate = function () {
        if (template != "") {
            shaderArray.push({
                color: colors.text,
                content: template
            });
        }
        template = "";
    };

    while (true) {

        /* 1.注释 */

        if (nextNValue(2) == '//') {
            initTemplate();
            while (nextNValue(1) !== '\n' && i < textString.length) {
                template += textString[i++];
            }
            shaderArray.push({
                color: colors.annotation,
                content: template
            });
            template = "";
        }

        /* 2.字符串 */

        else if (["'", '"'].indexOf(nextNValue(1)) > -1) {

            var strBorder = nextNValue(1);
            initTemplate();

            do {
                template += textString[i++];
                // 处理转义字符
                if (nextNValue(1) == '\\') {
                    template += textString[i++];
                    template += textString[i++];
                }
            } while (nextNValue(1) != strBorder && i < textString.length)

            // 因为可能是没有字符导致的结束
            if (nextNValue(1) != strBorder) {
                strBorder = "";
            } else {
                i += 1;
            }

            shaderArray.push({
                color: colors.string,
                content: template + strBorder
            });
            template = "";

        }

        /* 3.数字 */

        else if (nextNValue(1).match(/[0-9]/) || (nextNValue(1) == '-' && nextNValue(2).match(/[0-9]/))) {

            initTemplate();
            template += textString[i++];

            // 匹配数字
            while (nextNValue(1).match(/[0-9.]/) && i < textString.length) {
                template += textString[i++];
            }

            shaderArray.push({
                color: colors.number,
                content: template
            });
            template = "";

        }

        /* 4.布尔值和null */

        else if (nextNValue(4) == 'true' && (nextNValue(5) == '' || nextNValue(5)[4].match(/[\s,:}\]]/))) {
            initTemplate();
            shaderArray.push({
                color: colors.keyword,
                content: 'true'
            });
            i += 4;
        }

        else if (nextNValue(5) == 'false' && (nextNValue(6) == '' || nextNValue(6)[5].match(/[\s,:}\]]/))) {
            initTemplate();
            shaderArray.push({
                color: colors.keyword,
                content: 'false'
            });
            i += 5;
        }

        else if (nextNValue(4) == 'null' && (nextNValue(5) == '' || nextNValue(5)[4].match(/[\s,:}\]]/))) {
            initTemplate();
            shaderArray.push({
                color: colors.keyword,
                content: 'null'
            });
            i += 4;
        }

        /* 5.边界 */

        else if ([":", "{", "}", "[", "]", ",", " ", "\n", "\t"].indexOf(nextNValue(1)) > -1) {

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: nextNValue(1)
            });
            template = "";
            i += 1;
        }

        /* 追加字符 */

        else {
            if (i >= textString.length) {
                initTemplate();
                break;
            } else {
                template += textString[i++];
            }
        }

    }

    return shaderArray;
};

var _javaShader = function (textString, colors) {

    // Java关键字
    var keyWords = [
        "abstract", "assert", "boolean", "break", "byte",
        "case", "catch", "char", "class", "const",
        "continue", "default", "do", "double", "else",
        "enum", "extends", "final", "finally", "float",
        "for", "goto", "if", "implements", "import",
        "instanceof", "int", "interface", "long", "native",
        "new", "package", "private", "protected", "public",
        "return", "short", "static", "strictfp", "super",
        "switch", "synchronized", "this", "throw", "throws",
        "transient", "try", "void", "volatile", "while",
        "true", "false", "null"
    ];

    var shaderArray = [];

    // 当前面对的
    var i = 0;

    // 获取往后n个值
    var nextNValue = function (n) {
        return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = "";

    // 初始化模板，开始文本捕获
    var initTemplate = function () {
        if (template != "") {

            // 考虑开始的(
            if (template[0] == '(') {
                shaderArray.push({
                    color: colors.insign,
                    content: "("
                });
                template = template.substring(1);
            }

            shaderArray.push({
                color: colors.text,
                content: template
            });
        }

        template = "";
    };

    while (true) {

        /* 1.注释1 */

        if (nextNValue(2) == '/*') {

            initTemplate();
            while (nextNValue(2) !== '*/' && i < textString.length) {
                template += textString[i++];
            }

            shaderArray.push({
                color: colors.annotation,
                content: template + nextNValue(2)
            });
            i += 2;
            template = "";

        }

        /* 2.注释2 */

        else if (nextNValue(2) == '//') {
            initTemplate();
            while (nextNValue(1) !== '\n' && i < textString.length) {
                template += textString[i++];
            }
            shaderArray.push({
                color: colors.annotation,
                content: template
            });
            template = "";
        }

        /* 3.字符串 */

        else if (["'", '"'].indexOf(nextNValue(1)) > -1) {

            var strBorder = nextNValue(1);
            initTemplate();

            do {
                template += textString[i++];
                // 处理转义字符
                if (nextNValue(1) == '\\') {
                    template += textString[i++];
                    template += textString[i++];
                }
            } while (nextNValue(1) != strBorder && i < textString.length)

            // 因为可能是没有字符导致的结束
            if (nextNValue(1) != strBorder) {
                strBorder = "";
            } else {
                i += 1;
            }

            shaderArray.push({
                color: colors.string,
                content: template + strBorder
            });
            template = "";

        }

        /* 4.函数定义 */

        else if (nextNValue(1) == '(' && (template[0] == ' ' || (i - template.length - 1 >= 0 && textString[i - template.length - 1] == " "))) {
            shaderArray.push({
                color: colors.funName,
                content: template
            });
            i += 1;
            template = "(";

        }

        /* 5.方法调用 */

        else if (nextNValue(1) == '(') {

            shaderArray.push({
                color: colors.execName,
                content: template
            });
            i += 1;
            template = "(";
        }

        /* 6.边界 */

        else if ([";", '{', '}', '(', ')', '.', '\n', '=', '+', '>', '<', '[', ']', '-', '*', '/', '^', '*', '!', '@'].indexOf(nextNValue(1)) > -1) {

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: nextNValue(1)
            });
            template = "";
            i += 1;
        }

        /* 7.关键字 */

        else if (nextNValue(1) == ' ' && keyWords.indexOf(template.trim()) > -1) {

            shaderArray.push({
                color: colors.key,
                content: template + " "
            });
            template = "";
            i += 1;

        }

        /* 追加字符 */

        else {
            if (i >= textString.length) {
                initTemplate();
                break;
            } else {
                template += textString[i++];
            }
        }

    }

    return shaderArray;
};

var _goShader = function (textString, colors) {

    // Go关键字
    var keyWords = [
        "break", "case", "chan", "const", "continue",
        "default", "defer", "else", "fallthrough", "for",
        "func", "go", "goto", "if", "import",
        "interface", "map", "package", "range", "return",
        "select", "struct", "switch", "type", "var",
        "true", "false", "iota", "nil"
    ];

    var shaderArray = [];

    // 当前面对的
    var i = 0;

    // 获取往后n个值
    var nextNValue = function (n) {
        return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = "";

    // 初始化模板，开始文本捕获
    var initTemplate = function () {
        if (template != "") {

            // 考虑开始的(
            if (template[0] == '(') {
                shaderArray.push({
                    color: colors.insign,
                    content: "("
                });
                template = template.substring(1);
            }

            shaderArray.push({
                color: colors.text,
                content: template
            });
        }

        template = "";
    };

    while (true) {

        /* 1.注释1 */

        if (nextNValue(2) == '/*') {

            initTemplate();
            while (nextNValue(2) !== '*/' && i < textString.length) {
                template += textString[i++];
            }

            shaderArray.push({
                color: colors.annotation,
                content: template + nextNValue(2)
            });
            i += 2;
            template = "";

        }

        /* 2.注释2 */

        else if (nextNValue(2) == '//') {
            initTemplate();
            while (nextNValue(1) !== '\n' && i < textString.length) {
                template += textString[i++];
            }
            shaderArray.push({
                color: colors.annotation,
                content: template
            });
            template = "";
        }

        /* 3.字符串 */

        else if (["'", '"', '`'].indexOf(nextNValue(1)) > -1) {

            var strBorder = nextNValue(1);
            initTemplate();

            do {
                template += textString[i++];
                // 处理转义字符
                if (nextNValue(1) == '\\') {
                    template += textString[i++];
                    template += textString[i++];
                }
            } while (nextNValue(1) != strBorder && i < textString.length)

            // 因为可能是没有字符导致的结束
            if (nextNValue(1) != strBorder) {
                strBorder = "";
            } else {
                i += 1;
            }

            shaderArray.push({
                color: colors.string,
                content: template + strBorder
            });
            template = "";

        }

        /* 4.函数定义 */

        else if (nextNValue(1) == '(' && (template[0] == ' ' || (i - template.length - 1 >= 0 && textString[i - template.length - 1] == " "))) {
            shaderArray.push({
                color: colors.funName,
                content: template
            });
            i += 1;
            template = "(";

        }

        /* 5.方法调用 */

        else if (nextNValue(1) == '(') {

            shaderArray.push({
                color: colors.execName,
                content: template
            });
            i += 1;
            template = "(";
        }

        /* 6.边界 */

        else if ([";", '{', '}', '(', ')', '.', '\n', '=', '+', '>', '<', '[', ']', '-', '*', '/', '^', '*', '!', ':'].indexOf(nextNValue(1)) > -1) {

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: nextNValue(1)
            });
            template = "";
            i += 1;
        }

        /* 7.关键字 */

        else if (nextNValue(1) == ' ' && keyWords.indexOf(template.trim()) > -1) {

            shaderArray.push({
                color: colors.key,
                content: template + " "
            });
            template = "";
            i += 1;

        }

        /* 追加字符 */

        else {
            if (i >= textString.length) {
                initTemplate();
                break;
            } else {
                template += textString[i++];
            }
        }

    }

    return shaderArray;
};

var _cShader = function (textString, colors) {

    // C关键字
    var keyWords = [
        "auto", "break", "case", "char", "const",
        "continue", "default", "do", "double", "else",
        "enum", "extern", "float", "for", "goto",
        "if", "int", "long", "register", "return",
        "short", "signed", "sizeof", "static", "struct",
        "switch", "typedef", "union", "unsigned", "void",
        "volatile", "while", "true", "false", "NULL"
    ];

    var shaderArray = [];

    // 当前面对的
    var i = 0;

    // 获取往后n个值
    var nextNValue = function (n) {
        return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = "";

    // 初始化模板，开始文本捕获
    var initTemplate = function () {
        if (template != "") {

            // 考虑开始的(
            if (template[0] == '(') {
                shaderArray.push({
                    color: colors.insign,
                    content: "("
                });
                template = template.substring(1);
            }

            shaderArray.push({
                color: colors.text,
                content: template
            });
        }

        template = "";
    };

    while (true) {

        /* 1.注释1 */

        if (nextNValue(2) == '/*') {

            initTemplate();
            while (nextNValue(2) !== '*/' && i < textString.length) {
                template += textString[i++];
            }

            shaderArray.push({
                color: colors.annotation,
                content: template + nextNValue(2)
            });
            i += 2;
            template = "";

        }

        /* 2.注释2 */

        else if (nextNValue(2) == '//') {
            initTemplate();
            while (nextNValue(1) !== '\n' && i < textString.length) {
                template += textString[i++];
            }
            shaderArray.push({
                color: colors.annotation,
                content: template
            });
            template = "";
        }

        /* 3.字符串 */

        else if (["'", '"'].indexOf(nextNValue(1)) > -1) {

            var strBorder = nextNValue(1);
            initTemplate();

            do {
                template += textString[i++];
                // 处理转义字符
                if (nextNValue(1) == '\\') {
                    template += textString[i++];
                    template += textString[i++];
                }
            } while (nextNValue(1) != strBorder && i < textString.length)

            // 因为可能是没有字符导致的结束
            if (nextNValue(1) != strBorder) {
                strBorder = "";
            } else {
                i += 1;
            }

            shaderArray.push({
                color: colors.string,
                content: template + strBorder
            });
            template = "";

        }

        /* 4.函数定义 */

        else if (nextNValue(1) == '(' && (template[0] == ' ' || (i - template.length - 1 >= 0 && textString[i - template.length - 1] == " "))) {
            shaderArray.push({
                color: colors.funName,
                content: template
            });
            i += 1;
            template = "(";

        }

        /* 5.方法调用 */

        else if (nextNValue(1) == '(') {

            shaderArray.push({
                color: colors.execName,
                content: template
            });
            i += 1;
            template = "(";
        }

        /* 6.边界 */

        else if ([";", '{', '}', '(', ')', '.', '\n', '=', '+', '>', '<', '[', ']', '-', '*', '/', '^', '*', '!', '&', '|'].indexOf(nextNValue(1)) > -1) {

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: nextNValue(1)
            });
            template = "";
            i += 1;
        }

        /* 7.关键字 */

        else if (nextNValue(1) == ' ' && keyWords.indexOf(template.trim()) > -1) {

            shaderArray.push({
                color: colors.key,
                content: template + " "
            });
            template = "";
            i += 1;

        }

        /* 追加字符 */

        else {
            if (i >= textString.length) {
                initTemplate();
                break;
            } else {
                template += textString[i++];
            }
        }

    }

    return shaderArray;
};

var _kotlinShader = function (textString, colors) {

    // Kotlin关键字
    var keyWords = [
        // 硬关键字
        "as", "break", "class", "continue", "do",
        "else", "false", "for", "fun", "if",
        "in", "interface", "is", "null", "object",
        "package", "return", "super", "this", "throw",
        "true", "try", "typealias", "typeof", "val",
        "var", "when", "while",
        // 软关键字
        "by", "catch", "constructor", "delegate", "dynamic",
        "field", "file", "finally", "get", "import",
        "init", "param", "property", "receiver", "set",
        "setparam", "where",
        // 修饰符
        "abstract", "actual", "annotation", "companion", "const",
        "crossinline", "data", "enum", "expect", "external",
        "final", "infix", "inline", "inner", "internal",
        "lateinit", "noinline", "open", "operator", "out",
        "override", "private", "protected", "public", "reified",
        "sealed", "suspend", "tailrec", "vararg"
    ];

    var shaderArray = [];

    // 当前面对的
    var i = 0;

    // 获取往后n个值
    var nextNValue = function (n) {
        return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = "";

    // 初始化模板，开始文本捕获
    var initTemplate = function () {
        if (template != "") {

            // 考虑开始的(
            if (template[0] == '(') {
                shaderArray.push({
                    color: colors.insign,
                    content: "("
                });
                template = template.substring(1);
            }

            shaderArray.push({
                color: colors.text,
                content: template
            });
        }

        template = "";
    };

    while (true) {

        /* 1.注释1 */

        if (nextNValue(2) == '/*') {

            initTemplate();
            while (nextNValue(2) !== '*/' && i < textString.length) {
                template += textString[i++];
            }

            shaderArray.push({
                color: colors.annotation,
                content: template + nextNValue(2)
            });
            i += 2;
            template = "";

        }

        /* 2.注释2 */

        else if (nextNValue(2) == '//') {
            initTemplate();
            while (nextNValue(1) !== '\n' && i < textString.length) {
                template += textString[i++];
            }
            shaderArray.push({
                color: colors.annotation,
                content: template
            });
            template = "";
        }

        /* 3.字符串 */

        else if (["'", '"', '`'].indexOf(nextNValue(1)) > -1) {

            var strBorder = nextNValue(1);
            initTemplate();

            // 三引号字符串（Kotlin 原生字符串）
            if (nextNValue(3) == '"""' || nextNValue(3) == "'''") {
                var triBorder = nextNValue(3);
                template += triBorder;
                i += 3;
                while (nextNValue(3) != triBorder && i < textString.length) {
                    template += textString[i++];
                }
                if (i < textString.length) {
                    template += triBorder;
                    i += 3;
                }
                shaderArray.push({
                    color: colors.string,
                    content: template
                });
                template = "";
            } else {
                do {
                    template += textString[i++];
                    // 处理转义字符
                    if (nextNValue(1) == '\\') {
                        template += textString[i++];
                        template += textString[i++];
                    }
                } while (nextNValue(1) != strBorder && i < textString.length)

                // 因为可能是没有字符导致的结束
                if (nextNValue(1) != strBorder) {
                    strBorder = "";
                } else {
                    i += 1;
                }

                shaderArray.push({
                    color: colors.string,
                    content: template + strBorder
                });
                template = "";
            }

        }

        /* 4.函数定义 */

        else if (nextNValue(1) == '(' && (template[0] == ' ' || (i - template.length - 1 >= 0 && textString[i - template.length - 1] == " "))) {
            shaderArray.push({
                color: colors.funName,
                content: template
            });
            i += 1;
            template = "(";

        }

        /* 5.方法调用 */

        else if (nextNValue(1) == '(') {

            shaderArray.push({
                color: colors.execName,
                content: template
            });
            i += 1;
            template = "(";
        }

        /* 6.边界 */

        else if ([";", '{', '}', '(', ')', '.', '\n', '=', '+', '>', '<', '[', ']', '-', '*', '/', '^', '*', '!', '@', '?', ':'].indexOf(nextNValue(1)) > -1) {

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: nextNValue(1)
            });
            template = "";
            i += 1;
        }

        /* 7.关键字 */

        else if (nextNValue(1) == ' ' && keyWords.indexOf(template.trim()) > -1) {

            shaderArray.push({
                color: colors.key,
                content: template + " "
            });
            template = "";
            i += 1;

        }

        /* 追加字符 */

        else {
            if (i >= textString.length) {
                initTemplate();
                break;
            } else {
                template += textString[i++];
            }
        }

    }

    return shaderArray;
};

var _shellShader = function (textString, colors) {
    // Shell关键字和内置命令
    var keyWords = [
        "if", "then", "else", "elif", "fi", "case", "esac", "for", "select", "while", "until", "do", "done", "in", "function", "time", "coproc",
        "alias", "bg", "bind", "break", "builtin", "caller", "cd", "command", "compgen", "complete", "compopt", "continue", "declare", "dirs", "disown",
        "echo", "enable", "eval", "exec", "exit", "export", "false", "fc", "fg", "getopts", "hash", "help", "history", "jobs", "kill", "let", "local",
        "logout", "mapfile", "popd", "printf", "pushd", "pwd", "read", "readarray", "readonly", "return", "set", "shift", "shopt", "source", "suspend",
        "test", "times", "trap", "true", "type", "typeset", "ulimit", "umask", "unalias", "unset", "wait"
    ];

    var shaderArray = [];

    // 当前面对的
    var i = 0;

    // 获取往后n个值
    var nextNValue = function (n) {
        return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = "";

    // 初始化模板，开始文本捕获
    var initTemplate = function () {
        if (template != "") {
            shaderArray.push({
                color: colors.text,
                content: template
            });
        }
        template = "";
    };

    while (true) {
        /* 1.注释 */
        if (nextNValue(1) == '#') {
            initTemplate();
            while (nextNValue(1) !== '\n' && i < textString.length) {
                template += textString[i++];
            }
            shaderArray.push({
                color: colors.annotation,
                content: template
            });
            template = "";
        }

        /* 2.字符串 */
        else if (["'", '"', '`'].indexOf(nextNValue(1)) > -1) {
            var strBorder = nextNValue(1);
            initTemplate();

            do {
                template += textString[i++];
                // 处理转义字符
                if (nextNValue(1) == '\\') {
                    template += textString[i++];
                    template += textString[i++];
                }
            } while (nextNValue(1) != strBorder && i < textString.length)

            // 因为可能是没有字符导致的结束
            if (nextNValue(1) != strBorder) {
                strBorder = "";
            } else {
                i += 1;
            }

            shaderArray.push({
                color: colors.string,
                content: template + strBorder
            });
            template = "";
        }

        /* 3.变量 */
        else if (nextNValue(1) == '$') {
            initTemplate();
            template += textString[i++]; // 添加 $

            // 处理 ${VAR} 形式的变量
            if (nextNValue(1) == '{') {
                template += textString[i++]; // 添加 {
                while (nextNValue(1) != '}' && i < textString.length) {
                    template += textString[i++];
                }
                if (i < textString.length) {
                    template += textString[i++]; // 添加 }
                }
            } else {
                // 处理 $VAR 形式的变量
                while (/[a-zA-Z_][a-zA-Z0-9_]*/.test(nextNValue(1)) && i < textString.length) {
                    template += textString[i++];
                }
            }

            shaderArray.push({
                color: colors.variable,
                content: template
            });
            template = "";
        }

        /* 4.命令和选项识别 */
        else if (nextNValue(1) == ' ' || nextNValue(1) == '\n' || nextNValue(1) == '\t') {
            // 判断是否是命令（行首或分号后）
            var isCommand = false;
            if (template.trim() !== '' &&
                (i - template.length === 0 ||
                 nextNValue(template.length + 1).substring(0, template.length + 1)[0] === '\n' ||
                 nextNValue(template.length + 1).substring(0, template.length + 1)[0] === ';')) {
                isCommand = true;
            }

            if (isCommand) {
                shaderArray.push({
                    color: colors.command,
                    content: template
                });
            } else if (template.trim().startsWith('-')) {
                // 选项
                shaderArray.push({
                    color: colors.option,
                    content: template
                });
            } else if (template.trim() !== '') {
                // 普通参数
                shaderArray.push({
                    color: colors.argument,
                    content: template
                });
            }

            shaderArray.push({
                color: colors.insign,
                content: nextNValue(1)
            });
            template = "";
            i += 1;
        }

        /* 5.边界符号 */
        else if ([';', '|', '&', '>', '<', '(', ')', '[', ']', '{', '}', '=', '!', '?', '*', '+', '-', '~', '^'].indexOf(nextNValue(1)) > -1) {
            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: nextNValue(1)
            });
            template = "";
            i += 1;
        }

        /* 6.关键字 */
        else if (nextNValue(1) == ' ' && keyWords.indexOf(template.trim()) > -1) {
            shaderArray.push({
                color: colors.key,
                content: template + " "
            });
            template = "";
            i += 1;
        }

        /* 追加字符 */
        else {
            if (i >= textString.length) {
                initTemplate();
                break;
            } else {
                template += textString[i++];
            }
        }
    }

    return shaderArray;
};

var _mysqlShader = function (textString, colors) {

    // SQL关键字
    var keyWords = [
        "ADD", "ALL", "ALTER", "AND", "AS", "ASC",
        "BETWEEN", "BY", "CASCADE", "CASE", "CHECK",
        "COLUMN", "COMMIT", "CONSTRAINT", "CREATE", "CROSS",
        "DATABASE", "DATABASES", "DEFAULT", "DELETE", "DESC",
        "DISTINCT", "DROP", "ELSE", "ESCAPE", "EXISTS",
        "FOREIGN", "FROM", "FULL", "GROUP", "HAVING",
        "IF", "IN", "INDEX", "INNER", "INSERT",
        "INTO", "IS", "JOIN", "KEY", "LEFT",
        "LIKE", "LIMIT", "MATCH", "NATURAL", "NOT",
        "NULL", "ON", "OR", "ORDER", "OUTER",
        "PRIMARY", "REFERENCES", "RIGHT", "ROLLBACK", "ROW",
        "SAVEPOINT", "SELECT", "SET", "TABLE", "THEN",
        "TO", "TRANSACTION", "UNION", "UNIQUE", "UPDATE",
        "USING", "VALUES", "VARCHAR", "VIEW", "WHEN",
        "WHERE", "WITH", "RECURSIVE", "OVER",
        "PARTITION", "RANGE", "ROWS", "CURRENT", "ROW_NUMBER",
        "RANK", "DENSE_RANK", "LAG", "LEAD",
        "TRUE", "FALSE", "AUTO_INCREMENT", "ENGINE",
        "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN",
        "GROUP BY", "ORDER BY", "INSERT INTO",
        "UNIQUE INDEX", "FULLTEXT INDEX", "SPATIAL INDEX"
    ];

    var shaderArray = [];

    // 当前面对的
    var i = 0;

    // 获取往后n个值
    var nextNValue = function (n) {
        return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = "";

    // 初始化模板，开始文本捕获
    var initTemplate = function () {
        if (template != "") {

            // 考虑开始的(
            if (template[0] == '(') {
                shaderArray.push({
                    color: colors.insign,
                    content: "("
                });
                template = template.substring(1);
            }

            // 检查是否为关键字
            var trimmed = template.trim().toUpperCase();
            if (keyWords.indexOf(trimmed) > -1) {
                shaderArray.push({
                    color: colors.key,
                    content: template
                });
            } else {
                shaderArray.push({
                    color: colors.text,
                    content: template
                });
            }
        }

        template = "";
    };

    while (true) {

        /* 1. 多行注释 */

        if (nextNValue(2) == '/*') {

            initTemplate();
            while (nextNValue(2) !== '*/' && i < textString.length) {
                template += textString[i++];
            }

            shaderArray.push({
                color: colors.annotation,
                content: template + nextNValue(2)
            });
            i += 2;
            template = "";

        }

        /* 2. 单行注释 */

        else if (nextNValue(2) == '--') {
            initTemplate();
            while (nextNValue(1) !== '\n' && i < textString.length) {
                template += textString[i++];
            }
            shaderArray.push({
                color: colors.annotation,
                content: template
            });
            template = "";
        }

        /* 3. 字符串 */

        else if (["'", '"'].indexOf(nextNValue(1)) > -1) {

            var strBorder = nextNValue(1);
            initTemplate();

            do {
                template += textString[i++];
                // 处理转义字符
                if (nextNValue(1) == '\\') {
                    template += textString[i++];
                    template += textString[i++];
                }
            } while (nextNValue(1) != strBorder && i < textString.length);

            // 因为可能是没有字符导致的结束
            if (nextNValue(1) != strBorder) {
                strBorder = "";
            } else {
                i += 1;
            }

            shaderArray.push({
                color: colors.string,
                content: template + strBorder
            });
            template = "";

        }

        /* 4. 数字 */

        else if (nextNValue(1).match(/[0-9]/) || (nextNValue(1) == '-' && nextNValue(2).match(/[0-9]/))) {

            initTemplate();
            template += textString[i++];

            // 匹配数字（包括小数）
            while (nextNValue(1).match(/[0-9.]/) && i < textString.length) {
                template += textString[i++];
            }

            shaderArray.push({
                color: colors.number,
                content: template
            });
            template = "";

        }

        /* 5. 函数调用 */

        else if (nextNValue(1) == '(') {

            initTemplate();

            // 检查是否为SQL函数名
            var trimmed = template.trim().toUpperCase();
            var sqlFuncs = [
                "COUNT", "SUM", "AVG", "MAX", "MIN",
                "ABS", "CEIL", "FLOOR", "ROUND", "RAND",
                "CONCAT", "UPPER", "LOWER", "TRIM", "LENGTH",
                "SUBSTRING", "SUBSTR", "REPLACE", "LOCATE",
                "NOW", "CURDATE", "CURTIME", "YEAR", "MONTH",
                "DAY", "HOUR", "MINUTE", "SECOND",
                "DATE_ADD", "DATE_SUB", "DATEDIFF", "DATE_FORMAT",
                "STR_TO_DATE", "IF", "IFNULL", "COALESCE",
                "CASE", "CAST", "CONVERT", "GROUP_CONCAT",
                "DATE", "TIME", "TIMESTAMP", "DATETIME",
                "INET_ATON", "INET_NTOA", "LAST_INSERT_ID",
                "USER", "DATABASE", "VERSION", "MD5", "SHA1",
                "TRUNCATE", "MOD", "POW", "SQRT",
                "LEAST", "GREATEST", "LPAD", "RPAD",
                "FIND_IN_SET", "FIELD", "EXPORT_SET",
                "FROM_UNIXTIME", "UNIX_TIMESTAMP"
            ];

            if (sqlFuncs.indexOf(trimmed) > -1) {
                shaderArray.push({
                    color: colors.funName,
                    content: template
                });
            } else {
                shaderArray.push({
                    color: colors.text,
                    content: template
                });
            }

            i += 1;
            template = "(";
        }

        /* 6. 边界符号 */

        else if ([";", '{', '}', '(', ')', '.', '\n', '=', '+', '>', '<', '[', ']', '-', '*', '/', '^', '!', ','].indexOf(nextNValue(1)) > -1) {

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: nextNValue(1)
            });
            template = "";
            i += 1;
        }

        /* 7. 关键字（空格分隔） */

        else if (nextNValue(1) == ' ') {

            var trimmed = template.trim().toUpperCase();

            if (keyWords.indexOf(trimmed) > -1) {
                shaderArray.push({
                    color: colors.key,
                    content: template + " "
                });
                template = "";
                i += 1;
            } else {
                initTemplate();
                template += textString[i++];
            }

        }

        /* 追加字符 */

        else {
            if (i >= textString.length) {
                initTemplate();
                break;
            } else {
                template += textString[i++];
            }
        }

    }

    return shaderArray;
};

// 对特殊转义符号等进行校对
var replaceCode = function (source) {
    return source
        .replace(/\&amp;/g, '&')
        .replace(/\&lt;/g, '<')
        .replace(/\&gt;/g, '>');
}
window.doShader = function (el) {

    var preEls = el.getElementsByTagName('pre'), i, j;
    for (i = 0; i < preEls.length; i++) {
        var shaderJSON = null, source;
        var nonBlankLines = preEls[i].innerHTML.split(/\n/).filter(function (line) {
            return line.trim() !== "";
        });
        if (nonBlankLines.length <= 1) {
            source = replaceCode(preEls[i].innerHTML.trim());
        } else {
            source = replaceCode(preEls[i].innerHTML);
        }

        switch (preEls[i].getAttribute('tag')) {
            case "html": {
                shaderJSON = _htmlShader(source, htmlColors);
                break
            }
            case "xml": {
                shaderJSON = _xmlShader(source, xmlColors);
                break
            }
            case "css": {
                shaderJSON = _cssShader(source, cssColors);
                break
            }
            case "javascript": {
                shaderJSON = _jsShader(source, jsColors);
                break
            }
            case "python": {
                shaderJSON = _pythonShader(source, pythonColors);
                break
            }
            case "json": {
                shaderJSON = _jsonShader(source, jsonColors);
                break
            }
            case "java": {
                shaderJSON = _javaShader(source, javaColors);
                break
            }
            case "go": {
                shaderJSON = _goShader(source, goColors);
                break
            }
            case "c": {
                shaderJSON = _cShader(source, cColors);
                break
            }
            case "kotlin": {
                shaderJSON = _kotlinShader(source, kotlinColors);
                break
            }
            case "shell": {
                shaderJSON = _shellShader(source, shellColors);
                break
            }
            case "mysql":
            case "sql": {
                shaderJSON = _mysqlShader(source, sqlColors);
                break
            }
            default: {
                shaderJSON = [{
                    color: "black",
                    content: source
                }];
            }
        }
        if (shaderJSON) {
            preEls[i].innerHTML = "";
            preEls[i].style.backgroundColor = '#f2f2f3';
            preEls[i].style.padding = '10px';
            preEls[i].style.fontSize = '13px';
            preEls[i].style.fontFamily = 'monospace';
            preEls[i].style.fontWeight = '400';
            preEls[i].style.lineHeight = '20px';

            var itemEl;
            for (j = 0; j < shaderJSON.length; j++) {
                itemEl = document.createElement('span');
                preEls[i].appendChild(itemEl);

                itemEl.style.color = shaderJSON[j].color;
                itemEl.innerText = replaceCode(shaderJSON[j].content);
            }

            var copyEl = document.createElement('button');
            preEls[i].appendChild(copyEl);

            copyEl.setAttribute('class', 'copy-icon');

            (function (copyEl) {
                copyEl.addEventListener('click', function () {
                    var filterEl = document.createElement('div');
                    filterEl.innerHTML = copyEl.parentElement.innerHTML.replace(/\<br\>/g, '\n');

                    var textareaEl = document.createElement('textarea');
                    textareaEl.innerHTML = filterEl.innerText;

                    document.body.appendChild(textareaEl);
                    textareaEl.select();

                    // copy提醒
                    function prompt(isOk) {
                        copyEl.setAttribute("copied", isOk ? "yes" : "no")
                        copyEl.setAttribute('data-before', isOk ? "复制成功" : "复制失败");
                        setTimeout(function () {
                            copyEl.removeAttribute("copied");
                            copyEl.removeAttribute('data-before');
                            copyEl.blur();
                        }, 700);
                    }

                    try {
                        var result = window.document.execCommand("copy", false, null);

                        if (result) {
                            prompt(true);
                        } else {
                            prompt(false);
                        }
                    } catch (e) {
                        prompt(false);
                        console.error(e);
                    }

                    document.body.removeChild(textareaEl);

                });
            })(copyEl);
        }
    }

};
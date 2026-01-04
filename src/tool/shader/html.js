import _inner_CSS_shader from './css';
import _inner_ES_shader from './javascript';

export default function (textString, colors) {

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
                        "style>": _inner_CSS_shader,
                        "script>": _inner_ES_shader
                    }[langHelp](template, {
                        "style>": colors._css,
                        "script>": colors._javascript
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

    return shaderArray;

}

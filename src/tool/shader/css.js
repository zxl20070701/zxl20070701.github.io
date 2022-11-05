export default function (textString, colors) {
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
}

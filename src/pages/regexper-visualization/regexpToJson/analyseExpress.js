import ReadString from '../../../tool/ReadString';

// 特殊字符处理
import specialWord from './specialWord';

// 范围分析
import analysePurview from './analysePurview';

// 用于辅助计算内容宽
import calcWidth from './calcWidth';

// 对表达式进行结构分析

export default function (express) {

    // 生成字符串分析辅助对象
    var reader = ReadString(express);

    // 读取第一个字符后准备分析
    reader.readNext();

    var expressArray = [], temp;

    while (true) {

        // 如果还有字符，分析继续
        if (reader.index >= express.length) break;

        // 如果遇到边界字符，截断
        if (reader.currentChar == ')' || reader.currentChar == '(' || reader.currentChar == '|') {
            expressArray.push(reader.currentChar);
            reader.readNext();
        }

        // 否则就是一段内容
        else {

            // 内容按照最小单元分割
            var subExpressArray = [];
            var tempContent = "";

            var pushContentItem = function (isSpecialFlag) {
                if (tempContent != "") {

                    var tempContentArray;
                    if (isSpecialFlag && tempContent.length > 1) {
                        tempContentArray = [
                            tempContent.substring(0, tempContent.length - 1),
                            tempContent[tempContent.length - 1]
                        ];
                    } else {
                        tempContentArray = [tempContent];
                    }

                    for (var _index = 0; _index < tempContentArray.length; _index++) {
                        subExpressArray.push({
                            content: tempContentArray[_index],
                            type: '内容',
                            max: 1,
                            min: 1,
                            height: 44,
                            width: calcWidth(tempContentArray[_index]) + 30
                        });
                    }

                    tempContent = "";
                }
            };

            while (reader.index < express.length) {

                // 如果遇到边界字符，当前段内容分析完毕
                if (reader.currentChar == ')' || reader.currentChar == '(' || reader.currentChar == '|') {
                    pushContentItem();
                    break;
                } else {

                    // 转义
                    if (reader.currentChar == '\\') {
                        pushContentItem();

                        if (reader.getNextN(2) == '\\x') {
                            temp = specialWord(reader.getNextN(4));
                            reader.readNext(); reader.readNext(); reader.readNext(); reader.readNext();
                        } else {
                            temp = specialWord(reader.getNextN(2));
                            reader.readNext(); reader.readNext();
                        }

                        subExpressArray.push({
                            content: temp[0],
                            type: temp[1],
                            max: 1,
                            min: 1,
                            width: calcWidth(temp[0]) + 30,
                            height: 44
                        });
                    }

                    // 备选
                    else if (reader.currentChar == '[') {
                        pushContentItem();
                        temp = "";
                        while (reader.currentChar != ']') {
                            temp += reader.currentChar;
                            reader.readNext();
                        }
                        temp = analysePurview(temp.replace(/^\[/, ''));
                        subExpressArray.push({
                            content: temp[0],
                            type: "范围",
                            max: 1,
                            min: 1,
                            width: temp[1] + 20, // 5+X+4+4+4+X+5  +20
                            height: temp[0].length * 28 + 26 // 5+24+4+24+4+...+5  +20
                        });
                        reader.readNext();
                    }

                    // 如果是分组的特殊说明符号
                    else if (
                        reader.currentChar == '?' &&
                        ['?=', '?!', '?:'].indexOf(reader.getNextN(2)) > -1 &&
                        expressArray[expressArray.length - 1] == '(' &&
                        subExpressArray.length == 0
                    ) {
                        pushContentItem();
                        subExpressArray.push(reader.getNextN(2));
                        reader.readNext(); reader.readNext();
                    }

                    // 范围
                    // 对于范围而言，它应该是和前面一个内容单元为一组
                    else if (['{', '*', '?', '+'].indexOf(reader.currentChar) > -1) {
                        pushContentItem(true);

                        temp = [];

                        // {}
                        if (reader.currentChar == '{') {

                            while (reader.currentChar != '}') {
                                temp += reader.currentChar;
                                reader.readNext();
                            }

                            temp = temp.replace(/^\{/, '').split(',');

                            // 最小值
                            if (temp[0].trim() == '') {
                                temp[0] = -1;
                            } else {
                                temp[0] = +temp[0];
                            }

                            // 最大值
                            if (temp.length <= 1) {
                                temp[1] = temp[0];
                            } else if (temp[1].trim() == '') {
                                temp[1] = -1;
                            } else {
                                temp[1] = +temp[1];
                            }

                        }

                        //  + * ？
                        else {

                            temp = {
                                "+": [1, -1],
                                "*": [0, -1],
                                "?": [0, 1]
                            }[reader.currentChar];

                        }

                        // 如果是标记分组循环次数的
                        if (subExpressArray.length == 0) {
                            expressArray.push({
                                type: "分组循环",
                                max: temp[1],
                                min: temp[0]
                            });
                        }

                        // 否则就是普通的
                        else {
                            subExpressArray[subExpressArray.length - 1].min = temp[0];
                            subExpressArray[subExpressArray.length - 1].max = temp[1];
                        }

                        reader.readNext();

                    }

                    // 否则就是普通的常量了
                    else {

                        if (reader.currentChar == '.') {
                            pushContentItem();
                            subExpressArray.push({
                                content: "任意字符",
                                type: '描述',
                                max: 1,
                                min: 1,
                                height: 44,
                                width: calcWidth('任意字符') + 30
                            });
                        } else {
                            tempContent += reader.currentChar;
                        }

                        reader.readNext();
                    }
                }

            }
            pushContentItem();
            expressArray.push(subExpressArray);

        }

    }

    return expressArray;

};

import pretreatment from './pretreatment';
import analyseExpress from './analyseExpress';

export default function (express, _isString, helpEl) {

    // 预处理
    express = pretreatment(express, _isString);

    // 单词分析
    var expressArray = analyseExpress(express.trim(), helpEl);

    // 补充辅助括号
    expressArray.unshift(["?@"]);
    expressArray.unshift('(');
    expressArray.push(')');

    /**
     * 接下来，我们将进行结构分析，
     * 获取完整的尺寸大小和结点之间的关系
     */
    return (function calcImageData(index) {

        var imageData = {
            width: 0,
            height: 0,

            // 考虑到有的分组需要捕获，有的不记录等，对每个分组添加说明
            // no-group  非分组
            // group 匹配,并捕获文本到自动命名的组里
            // ?: 匹配,不捕获匹配的文本，也不给此分组分配组号
            // ?= 零宽断言，匹配目标的后面是
            // ?! 零宽断言，匹配目标的后面不是
            // ?@ 辅助组
            flag: "no-group",

            // 标记当前组循环次数
            max: 1, min: 1,

            type: "组",

            // 记录并列的一列列内容
            contents: []
        };

        // 判断分组标志
        if (expressArray[index] == '(') {
            imageData.flag = 'group';
            index += 1;
        }

        // 表示一行（一个组可以有并列的多行）
        var rowObject = {
            contents: [],
            width: 0,
            height: 0
        }, i;

        for (i = index; i < expressArray.length; i++) {

            // 说明开始一个新的匹配分组
            if (expressArray[i] == '(') {
                var _imageData = calcImageData(i);
                rowObject.contents.push(_imageData[0]);

                // 更新大小
                rowObject.width += _imageData[0].width;
                if (rowObject.height < _imageData[0].height) rowObject.height = _imageData[0].height;

                i = _imageData[1];
            }

            // 分组匹配结束，返回
            else if (expressArray[i] == ')') {

                if (expressArray[i + 1] && expressArray[i + 1].type == "分组循环") {
                    imageData.max = expressArray[i + 1].max;
                    imageData.min = expressArray[i + 1].min;
                    i++;
                }

                break;
            }

            // 需要换行（新的行）
            else if (expressArray[i] == '|') {
                imageData.contents.push(rowObject);

                // 更新大小
                if (rowObject.width > imageData.width) imageData.width = rowObject.width;
                imageData.height += rowObject.height;

                //  重置数据
                rowObject = {
                    contents: [],
                    width: 0,
                    height: 0
                };

            }

            else {

                for (var j = 0; j < expressArray[i].length; j++) {

                    // 如果是分组标记
                    if (j == 0 && ['?=', '?!', '?:', '?@'].indexOf(expressArray[i][0]) > -1) {
                        imageData.flag = expressArray[i][0];
                    }

                    // 否则就是普通的条目
                    else {

                        rowObject.contents.push(expressArray[i][j]);

                        // 更新大小
                        rowObject.width += expressArray[i][j].width;
                        if (rowObject.height < expressArray[i][j].height) rowObject.height = expressArray[i][j].height;
                    }
                }

            }

        }

        if (rowObject.contents.length > 0) imageData.contents.push(rowObject);

        // 更新大小
        if (rowObject.width > imageData.width) imageData.width = rowObject.width;
        imageData.height += rowObject.height;

        return [imageData, i];
    })(0)[0];
};

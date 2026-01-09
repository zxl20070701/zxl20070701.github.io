import isNumber from "../../type/isNumber";
import { defaultStyle } from '../config';

export function styleToString(style) {

    var styleString = "";
    for (var key in style) {
        styleString += key + ":" + style[key] + ';';
    }

    return styleString;
};

export function newItemData() {
    return {
        value: " ", colspan: "1", rowspan: "1",
        style: defaultStyle()
    };
};

export function formatContent(file) {

    // 如果传递了内容
    if (file && 'version' in file && file.filename == 'Excel') {

        // 后续如果格式进行了升级，可以格式兼容转换成最新版本
        return file.contents;
    }

    // 否则，自动初始化
    else {

        var content = [];
        for (var i = 0; i < 100; i++) {
            var rowArray = []
            for (var j = 0; j < 30; j++) {
                rowArray.push(this.$$newItemData());
            }

            content.push(rowArray);
        }
        return [{
            name: "未命名",
            content
        }];
    }

};

export function calcColName(index) {
    if (!isNumber(index)) return index;

    var codes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var result = "";

    while (true) {

        // 求解当前坐标
        var _index = index % 26;

        // 拼接
        result = codes[_index] + result;

        // 求解余下的数
        index = Math.floor(index / 26);

        if (index == 0) break;

        index -= 1;
    }
    return result;
};

export function getLeftTop(rowIndex, colIndex) {
    var content = this.__contentArray[this.__tableIndex].content;

    // 从下到上
    for (var row = rowIndex; row >= 1; row--) {
        // 从右到左
        for (var col = colIndex; col >= 1; col--) {

            // 同一行如果遇到第一个显示的，只有两种可能：
            // 1.这个就是所求
            // 2.本行都不会有结果
            if (content[row - 1][col - 1].style.display != 'none') {

                // 如果目标可以包含自己，那就找到了
                if (
                    content[row - 1][col - 1].rowspan - - row > rowIndex
                    &&
                    content[row - 1][col - 1].colspan - - col > colIndex
                ) {

                    return {
                        row,
                        col,
                        content: content[row - 1][col - 1]
                    };

                } else {
                    break;
                }

            }

            // 不加else的原因是，理论上一定会存在唯一的一个

        }
    }
};

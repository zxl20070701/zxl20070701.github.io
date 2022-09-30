import drawNode from './drawNode';
import toLoopText from './toLoopText';

var normalConfig = {
    'strokeStyle': '#000000',
    'lineDash': [],
    'lineWidth': 2,
    "font-size": 12
};

export default function drawImage(painter, imageData, left, top) {

    // 绘制组标记
    if (imageData.flag != "no-group" && imageData.flag != '?@') {

        painter.config({
            'strokeStyle': 'red',
            'lineDash': [2],
            'lineWidth': 1,
            'font-size': 10
        })
            .strokeRect(left + 5, top + 5, imageData.width - 10, imageData.height - 10)

            // 提示文字
            .fillText({
                "?:": "仅匹配",
                "?!": "匹配否",
                "?=": "匹配是",
                "group": "#" + (window.group_index++)
            }[imageData.flag], left + imageData.width * 0.5, top);

        // 绘制循环次数
        if (imageData.min != 1 || imageData.max != 1) {

            painter.fillText(
                toLoopText(imageData.min, imageData.max),
                left + imageData.width * 0.5, top + imageData.height
            );

        }
    }

    // 统一配置画笔
    painter.config(normalConfig);

    if (imageData.contents.length > 1) {

        // 绘制并列行的前后连线

        painter
            .config({
                lineWidth: 2
            })
            .beginPath()
            .moveTo(left, top + imageData.contents[0].height * 0.5)
            .lineTo(left, top + imageData.contents[0].height * 0.5 + imageData.height - imageData.contents[imageData.contents.length - 1].height * 0.5 - imageData.contents[0].height * 0.5)
            .stroke()
            .beginPath()
            .moveTo(left + imageData.width, top + imageData.contents[0].height * 0.5)
            .lineTo(left + imageData.width, top + imageData.contents[0].height * 0.5 + imageData.height - imageData.contents[imageData.contents.length - 1].height * 0.5 - imageData.contents[0].height * 0.5)
            .stroke();
    }

    // 绘制一行行的
    var _top = top;
    for (var rowNum = 0; rowNum < imageData.contents.length; rowNum++) {

        var _helpWidth = (imageData.width - imageData.contents[rowNum].width) * 0.5;

        // 绘制一列列的
        var _left = left;
        for (var colNum = 0; colNum < imageData.contents[rowNum].contents.length; colNum++) {

            var colItem = imageData.contents[rowNum].contents[colNum];
            var _helpHeight = (imageData.contents[rowNum].height - colItem.height) * 0.5;

            // 绘制开头和结尾的

            var _helpDist = (colItem.type == '组' && colItem.contents.length != 1) ? 0 : 10;

            painter
                .config({
                    lineWidth: 2
                })
                .beginPath()
                .moveTo(
                    colNum == 0 ?
                        _left
                        :
                        _left + _helpWidth, _top + _helpHeight + colItem.height * 0.5)
                .lineTo(_left + _helpWidth + _helpDist, _top + _helpHeight + colItem.height * 0.5)
                .stroke()
                .beginPath()
                .moveTo(
                    colNum == imageData.contents[rowNum].contents.length - 1 ?
                        left + imageData.width
                        :
                        _left + _helpWidth + colItem.width, _top + _helpHeight + colItem.height * 0.5)
                .lineTo(_left + _helpWidth + colItem.width - _helpDist, _top + _helpHeight + colItem.height * 0.5)
                .stroke();


            // 组
            if (colItem.type == '组') {
                drawImage(painter, colItem, _left + _helpWidth, _top + _helpHeight);
            }

            // 否则就是需要进行实际绘制的了
            else {

                // 绘制循环次数
                if (colItem.min != 1 || colItem.max != 1) {

                    var purview = toLoopText(colItem.min, colItem.max);

                    painter.config({
                        'fillStyle': 'gray',
                        'font-size': 10
                    })
                        // 提示文字
                        .fillText(purview, _left + _helpWidth + colItem.width * 0.5, _top + colItem.height + _helpHeight - 5);

                    // 统一配置画笔
                    painter.config(normalConfig);
                }

                if (colItem.type == '内容') {

                    drawNode(painter, _left + 10 + _helpWidth, _top + 10 + _helpHeight, colItem.width - 20, colItem.height - 20, '#dae9e5', colItem.content);

                } else if (colItem.type == '描述') {

                    drawNode(painter, _left + 10 + _helpWidth, _top + 10 + _helpHeight, colItem.width - 20, colItem.height - 20, '#bada55', colItem.content);

                } else if (colItem.type == '范围') {

                    // 先绘制最后的背景
                    painter
                        .config('fillStyle', '#cbcbba')
                        .fillRect(_left + 10 + _helpWidth, _top + 10 + _helpHeight, colItem.width - 20, colItem.height - 20);

                    for (var k = 0; k < colItem.content.length; k++) {
                        if (Array.isArray(colItem.content[k])) {

                            drawNode(painter, _left + colItem.width * 0.5 + _helpWidth - 6 - colItem.content[k][0].width, _top + 15 + 28 * k + _helpHeight, colItem.content[k][0].width, 24, {
                                "内容": '#dae9e5',
                                "描述": "#bada55"
                            }[colItem.content[k][0].type], colItem.content[k][0].content);
                            drawNode(painter, _left + colItem.width * 0.5 + 6 + _helpWidth, _top + 15 + 28 * k + _helpHeight, colItem.content[k][1].width, 24, {
                                "内容": '#dae9e5',
                                "描述": "#bada55"
                            }[colItem.content[k][1].type], colItem.content[k][1].content);

                            // 画线条
                            painter
                                .beginPath()
                                .moveTo(_left + colItem.width * 0.5 - 2 + _helpWidth, _top + 27 + 28 * k + _helpHeight)
                                .lineTo(_left + colItem.width * 0.5 + 2 + _helpWidth, _top + 27 + 28 * k + _helpHeight)
                                .stroke();

                        } else {

                            if (k == 0 && colItem.content[0].content == '^') {

                                drawNode(painter, _left + _helpWidth + colItem.width * 0.5 - colItem.content[k].width * 0.5, _top + 15 + 28 * k + _helpHeight, colItem.content[k].width, 24, "#cbcbba", "非下列", 'white');

                            } else {

                                drawNode(painter, _left + _helpWidth + colItem.width * 0.5 - colItem.content[k].width * 0.5, _top + 15 + 28 * k + _helpHeight, colItem.content[k].width, 24, {
                                    "内容": '#dae9e5',
                                    "描述": "#bada55"
                                }[colItem.content[k].type], colItem.content[k].content);

                            }

                        }
                    }

                } else {
                    throw new Error('发生了未期待的情况\n' + JSON.stringify(colItem, null, 4));
                }

            }


            // 右移
            _left += colItem.width;

        }

        // 换行
        _top += imageData.contents[rowNum].height;
    }

};

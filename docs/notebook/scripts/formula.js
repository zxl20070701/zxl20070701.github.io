// 绘制括号
var drawBracket = function (painter, type, position, x, y, size) {

    if (type == 'small') {

        if (position == 'left') {
            painter.beginPath();
            painter.moveTo(x + 10, y);
            painter.quadraticCurveTo(x, y + size * 0.5, x + 10, y + size);
            painter.stroke();
        } else if (position = 'right') {
            painter.beginPath();
            painter.moveTo(x, y);
            painter.quadraticCurveTo(x + 10, y + size * 0.5, x, y + size);
            painter.stroke();
        }

    } else if (type == 'middle') {

        if (position == 'left') {
            painter.beginPath();
            painter.lineTo(x + 10, y);
            painter.lineTo(x + 5, y);
            painter.lineTo(x + 5, y + size);
            painter.lineTo(x + 10, y + size);
            painter.stroke();

        } else if (position = 'right') {
            painter.beginPath();
            painter.lineTo(x, y);
            painter.lineTo(x + 5, y);
            painter.lineTo(x + 5, y + size);
            painter.lineTo(x, y + size);
            painter.stroke();

        }

    } else if (type == 'big') {

        if (position == 'left') {
            painter.beginPath()
            painter.lineTo(x + 10, y);
            painter.lineTo(x + 5, y + 3);
            painter.lineTo(x + 5, y + size * 0.5 - 3);
            painter.lineTo(x + 2, y + size * 0.5);
            painter.lineTo(x + 5, y + size * 0.5 + 3);
            painter.lineTo(x + 5, y + size - 3);
            painter.lineTo(x + 10, y + size);
            painter.stroke();
        } else if (position = 'right') {
            painter.beginPath();
            painter.lineTo(x, y);
            painter.lineTo(x + 5, y + 3);
            painter.lineTo(x + 5, y + size * 0.5 - 3);
            painter.lineTo(x + 7, y + size * 0.5);
            painter.lineTo(x + 5, y + size * 0.5 + 3);
            painter.lineTo(x + 5, y + size - 3);
            painter.lineTo(x, y + size);
            painter.stroke();
        }

    }

};

var helpHidden;
var calcSize = function (text) {

    if (!helpHidden) {
        helpHidden = document.createElement('div');
        helpHidden.style.fontSize = '12px';
        helpHidden.style.fontFamily = 'sans-serif';
        helpHidden.style.padding = '0';
        helpHidden.style.border = 'none';
        helpHidden.style.position = 'fixed';
        helpHidden.style.bottom = '-100px';
        document.body.appendChild(helpHidden);
    }

    helpHidden.innerText = text;

    return {
        width: helpHidden.clientWidth,
        height: helpHidden.clientHeight
    }
};

var paddingSize = 3;
var formatBasic = function (p1) {
    if (typeof p1 == 'string') {

        var contentSize = calcSize(p1);
        return {
            width: contentSize.width + paddingSize * 2,
            height: contentSize.height + paddingSize * 2,
            contents: [p1],
            type: 'string'
        };

    } else {
        return p1;
    }
};

// 捕获并解析意图
var jsonToFormat = function (json) {
    var i, j, k;
    for (i = 0; i < json.length; i++) {

        // 如果是数组，需要进一步解析
        if (Array.isArray(json[i])) {

            if (i > 0 && json[i - 1] == 'matrix') {

                for (j = 0; j < json[i].length; j++) {
                    for (k = 0; k < json[i][j].length; k++) {

                        if (Array.isArray(json[i][j][k])) {
                            json[i][j][k] = jsonToFormat(json[i][j][k]);
                        } else {
                            json[i][j][k] = formatBasic(json[i][j][k] + "");
                        }
                    }
                }

            } else {
                json[i] = jsonToFormat(json[i]);
            }
        }
    }

    switch (json[0]) {

        // 根号
        case "gen": {
            var p1Obj = formatBasic(json[1]);

            return {
                width: p1Obj.width + 5 + paddingSize * 2,
                height: p1Obj.height + paddingSize * 2,
                contents: [p1Obj],
                type: 'gen'
            };
        }

        // 极限
        case "limt": {
            var p1Obj = formatBasic(json[1]);
            var p2Obj = formatBasic(json[2]);

            // 对底部趋近进行兼容
            p1Obj.width -= paddingSize * 2;
            p1Obj.height -= paddingSize * 2;

            var limtSize = calcSize('limt');

            var leftHeight = limtSize.height + p1Obj.height * 2;

            return {
                width: p1Obj.width + p2Obj.width + paddingSize * 2,
                height: (leftHeight > p2Obj.height ? leftHeight : p2Obj.height) * 0.5 + p2Obj.height * 0.5,
                contents: [p1Obj, p2Obj],
                type: 'limt',
                _help: {
                    limtSize,
                    leftWidth: p1Obj.width
                }
            };
        }

        // 求和
        case "sum": {
            var p1Obj = formatBasic(json[1]);
            var p2Obj = formatBasic(json[2]);
            var p3Obj = formatBasic(json[3]);

            var leftWidth = Math.max(p1Obj.width, p2Obj.width, 20);

            return {
                width: leftWidth + p3Obj.width + paddingSize * 2,
                height: Math.max(Math.max(p1Obj.height, p2Obj.height) * 2 + 20, p3Obj.height) + paddingSize * 2,
                contents: [p1Obj, p2Obj, p3Obj],
                type: "sum",
                _help: {
                    leftWidth,
                    p1Height: p1Obj.height,
                    p1Width: p1Obj.width,
                    p2Height: p2Obj.height,
                    p2Width: p2Obj.width,
                    rightHeight: p3Obj.height
                }
            };
        }

        // 拼接组合
        case "join": {
            var pxObjs = [], width = 0, height = 0, k;
            for (k = 1; k < json.length; k++) {
                var pxObj = formatBasic(json[k]);
                pxObjs.push(pxObj);

                width += pxObj.width;
                height = pxObj.height > height ? pxObj.height : height;
            }

            return {
                width: width + paddingSize * 2,
                height: height + paddingSize * 2,
                contents: pxObjs,
                type: "join"
            };
        }

        // 矩阵和行列式
        case "matrix": {
            var pxObjs = [];

            // 分别用于记录当前行最高多少和当前列最宽多少
            var rowMax = [], colMax = [];
            for (var i in json[1]) rowMax[i] = 0;
            for (var j in json[1][0]) colMax[j] = 0;

            for (var i in json[1]) {
                var rowPxObjs = [], row = json[1][i];
                for (var j in row) {
                    var col = row[j];
                    var colPxObj = formatBasic(col);
                    rowPxObjs.push(colPxObj);

                    // 校对行和列的最值
                    if (rowMax[i] < colPxObj.height) rowMax[i] = colPxObj.height;
                    if (colMax[j] < colPxObj.width) colMax[j] = colPxObj.width;

                }
                pxObjs.push(rowPxObjs);
            }

            // 计算得出宽和高
            var width = 0, height = 0;
            for (var value of rowMax) height += value;
            for (var value of colMax) width += value;

            // 计算中心位置
            var rowCenter = [], colCenter = [];
            rowCenter[0] = paddingSize + rowMax[0] * 0.5;
            colCenter[0] = paddingSize + colMax[0] * 0.5 + 10;

            for (var i = 1; i < rowMax.length; i++) {
                rowCenter[i] = rowCenter[i - 1] + (rowMax[i - 1] + rowMax[i]) * 0.5;
            }

            for (var j = 1; j < colMax.length; j++) {
                colCenter[j] = colCenter[j - 1] + (colMax[j - 1] + colMax[j]) * 0.5;
            }

            return {
                width: width + paddingSize * 2 + 20,
                height: height + paddingSize * 2,
                contents: pxObjs,
                type: "matrix",
                _help: {
                    isHLS: json[2],
                    rowCenter,
                    colCenter
                }
            };
        }

        // 除
        case "division": {
            var p1Obj = formatBasic(json[1]);
            var p2Obj = formatBasic(json[2]);

            return {
                width: Math.max(p1Obj.width, p2Obj.width) + paddingSize * 2,
                height: p1Obj.height + p2Obj.height + 2 + paddingSize * 2,
                contents: [p1Obj, p2Obj],
                type: "division"
            };
        }

        // 括号
        // p2表示括号的类型，可选的有：
        // small、middle、big，分别表示，小括号、中括号、大括号
        case "bracket": {
            var p1Obj = formatBasic(json[1]);

            return {
                width: p1Obj.width + 20 + paddingSize * 2,
                height: p1Obj.height + paddingSize * 2,
                contents: [p1Obj],
                type: "bracket",
                _help: {
                    type: json[2]
                }
            };
        }

        // 特殊位置

        case "rightTop": {
            var p1Obj = formatBasic(json[1]);
            var p2Obj = formatBasic(json[2]);

            return {
                width: p1Obj.width + p2Obj.width - paddingSize * 2,
                height: p1Obj.height + p2Obj.height - paddingSize * 2 - 5,
                contents: [p1Obj, p2Obj],
                type: "rightTop",
                _help: {
                    p1Width: p1Obj.width,
                    p1Height: p1Obj.height
                }
            };
        }

        case "rightBottom": {
            var p1Obj = formatBasic(json[1]);
            var p2Obj = formatBasic(json[2]);

            return {
                width: p1Obj.width + p2Obj.width - paddingSize * 2,
                height: p1Obj.height + p2Obj.height - paddingSize * 2 - 5,
                contents: [p1Obj, p2Obj],
                type: "rightBottom",
                _help: {
                    p1Width: p1Obj.width,
                    p2Height: p2Obj.height
                }
            };
        }

        // 方程组
        case "equationSet": {
            var pxObjs = [], width = 0, height = 0, pxTop = paddingSize, pxTops = [];
            for (var i = 1; i < json.length; i++) {
                var pxObj = formatBasic(json[i]);
                pxObjs.push(pxObj);

                height += pxObj.height;
                width = pxObj.width > width ? pxObj.width : width;

                pxTops.push(pxTop);
                pxTop += pxObj.height;
            }
            return {
                width: width + 10 + paddingSize * 2,
                height: height + paddingSize * 2,
                contents: pxObjs,
                type: "equationSet",
                _help: {
                    pxTops
                }
            };
        }

        // 上线
        case "upLine": {
            var p1Obj = formatBasic(json[1]);

            return {
                width: p1Obj.width,
                height: p1Obj.height + paddingSize,
                contents: [p1Obj],
                type: "upLine"
            };
        }

        // 下线
        case "downLine": {
            var p1Obj = formatBasic(json[1]);

            return {
                width: p1Obj.width,
                height: p1Obj.height + paddingSize,
                contents: [p1Obj],
                type: "downLine"
            };
        }

        // 向量
        case "vector": {
            var p1Obj = formatBasic(json[1]);

            return {
                width: p1Obj.width,
                height: p1Obj.height + paddingSize,
                contents: [p1Obj],
                type: "vector"
            };
        }

        // 绝对值
        case "abs": {
            var p1Obj = formatBasic(json[1]);

            return {
                width: p1Obj.width + paddingSize * 2,
                height: p1Obj.height,
                contents: [p1Obj],
                type: "abs"
            };
        }

        // 定积分和不定积分
        case "integral": {
            var p1Obj = formatBasic(json[1]);
            var p2Obj = formatBasic(json[2]);
            var p3Obj = formatBasic(json[3] || "");
            var p4Obj = formatBasic(json[4] || "");

            return {
                width: Math.max(p1Obj.width + p2Obj.width, p3Obj.width - 5, p4Obj.width) + 15 + paddingSize * 2,
                height: p1Obj.height + p3Obj.height + p4Obj.height + paddingSize * 2,
                contents: [p1Obj, p2Obj, p3Obj, p4Obj],
                type: "integral"
            };
        }

        // 可列交和并

        case "listedOr": {
            var p1Obj = formatBasic(json[1]);
            var p2Obj = formatBasic(json[2]);

            return {
                width: Math.max(p1Obj.width, p2Obj.width, 30) + paddingSize * 2,
                height: p1Obj.height + p2Obj.height + 35 + paddingSize * 2,
                contents: [p1Obj, p2Obj],
                type: 'listedOr'
            };
        }

        case "listedAnd": {
            var p1Obj = formatBasic(json[1]);
            var p2Obj = formatBasic(json[2]);

            return {
                width: Math.max(p1Obj.width, p2Obj.width, 30) + paddingSize * 2,
                height: p1Obj.height + p2Obj.height + 35 + paddingSize * 2,
                contents: [p1Obj, p2Obj],
                type: 'listedAnd'
            };
        }

        // 排列和组合

        case "A": {
            var p1Obj = formatBasic(json[1]);
            var p2Obj = formatBasic(json[2]);

            return {
                width: Math.max(p1Obj.width, p2Obj.width) + 20 + paddingSize * 2,
                height: p1Obj.height + p2Obj.height + 5 + paddingSize * 2,
                contents: [p1Obj, p2Obj],
                type: 'A'
            };
        }

        case "C": {
            var p1Obj = formatBasic(json[1]);
            var p2Obj = formatBasic(json[2]);

            return {
                width: Math.max(p1Obj.width, p2Obj.width) + 20 + paddingSize * 2,
                height: p1Obj.height + p2Obj.height + 5 + paddingSize * 2,
                contents: [p1Obj, p2Obj],
                type: 'C'
            };
        }

    }

};

window.doFormula = function (el) {

    var codeEls = el.getElementsByTagName('code'), i;
    for (i = codeEls.length - 1; i > -1; i--) {

        try {
            var format = jsonToFormat(JSON.parse(codeEls[i].innerHTML));

            // 设置画布大小

            var canvas = document.createElement('canvas');

            canvas.setAttribute('width', 3 * format.width);
            canvas.setAttribute('height', 3 * format.height);

            // 获取画笔并进行配置

            var painter = canvas.getContext("2d");

            painter.scale(3, 3);

            painter.textAlign = "center";
            painter.textBaseline = "middle";
            painter.font = "12px sans-serif";

            var allStyle = document.defaultView && document.defaultView.getComputedStyle ?
                document.defaultView.getComputedStyle(codeEls[i], null) :
                codeEls[i].currentStyle;

            painter.fillStyle = allStyle.getPropertyValue("color");
            painter.strokeStyle = allStyle.getPropertyValue("color");

            var drawFormula = function (x, y, data) {

                switch (data.type) {

                    case "string": {
                        painter.fillText(data.contents[0], x + data.width * 0.5, y + data.height * 0.5);
                        break;
                    }

                    case "gen": {
                        // 先绘制根号下的表达式
                        drawFormula(x + 5 + paddingSize, y + paddingSize, data.contents[0]);

                        // 然后绘制根号
                        painter.beginPath();
                        painter.lineTo(x + paddingSize, y + data.height - paddingSize);
                        painter.lineTo(x + paddingSize + 2.5, y + data.height - paddingSize - 2.5);
                        painter.lineTo(x + paddingSize + 5, y + data.height - paddingSize);
                        painter.lineTo(x + paddingSize + 5, y + paddingSize * 0.5);
                        painter.lineTo(x + data.width - paddingSize, y + paddingSize * 0.5);
                        painter.stroke();
                        break;
                    }

                    case "limt": {
                        var leftTop = y + data.contents[1].height * 0.5 - data._help.limtSize.height * 0.5;

                        // 先绘制极限文字和趋势
                        painter.fillText("lim", x + paddingSize + data._help.leftWidth * 0.5, paddingSize + leftTop);
                        drawFormula(x, data._help.limtSize.height + leftTop - paddingSize, data.contents[0]);

                        // 然后绘制表达式
                        drawFormula(x + paddingSize + data._help.leftWidth, y, data.contents[1]);
                        break;
                    }

                    case "sum": {

                        // 先绘制左边的，从下到上
                        drawFormula(x + data._help.leftWidth * 0.5 - data._help.p1Width * 0.5 + paddingSize, y + data.height * 0.5 + 10 + paddingSize, data.contents[0]);
                        painter.beginPath();
                        painter.lineTo(x + data._help.leftWidth * 0.5 + 10 + paddingSize, y + data.height * 0.5 - 10 + paddingSize);
                        painter.lineTo(x + data._help.leftWidth * 0.5 - 10 + paddingSize, y + data.height * 0.5 - 10 + paddingSize);
                        painter.lineTo(x + data._help.leftWidth * 0.5 + 7 + paddingSize, y + data.height * 0.5 + paddingSize);
                        painter.lineTo(x + data._help.leftWidth * 0.5 - 10 + paddingSize, y + data.height * 0.5 + 10 + paddingSize);
                        painter.lineTo(x + data._help.leftWidth * 0.5 + 10 + paddingSize, y + data.height * 0.5 + 10 + paddingSize);
                        painter.stroke();
                        drawFormula(x + data._help.leftWidth * 0.5 - data._help.p2Width * 0.5 + paddingSize, y + data.height * 0.5 - 10 - data._help.p2Height + paddingSize, data.contents[1]);

                        // 然后绘制右边的
                        drawFormula(x + data._help.leftWidth + paddingSize, y + data.height * 0.5 - data._help.rightHeight * 0.5, data.contents[2]);

                        break;
                    }

                    case "join": {

                        // 从左到右，一个个绘制即可
                        for (var item of data.contents) {
                            drawFormula(x + paddingSize, y - item.height * 0.5 + data.height * 0.5, item);
                            x += item.width;
                        }

                        break;
                    }

                    case "matrix": {
                        // 先绘制内容
                        for (var i in data.contents) {
                            for (var j in data.contents[i]) {
                                var curData = data.contents[i][j];

                                // 对于"|"特殊处理
                                if (curData.contents[0] == '|') {
                                    painter.beginPath()
                                    painter.lineTo(x + data._help.colCenter[j], y + data._help.rowCenter[i] - curData.height * 0.5);
                                    painter.lineTo(x + data._help.colCenter[j], y + data._help.rowCenter[i] + curData.height * 0.5);
                                    painter.stroke();
                                } else {
                                    drawFormula(x + data._help.colCenter[j] - curData.width * 0.5, y + data._help.rowCenter[i] - curData.height * 0.5, curData);
                                }
                            }
                        }

                        // 绘制两边
                        if (data._help.isHLS) {

                            painter.beginPath();
                            painter.lineTo(x + paddingSize + 5, y + paddingSize);
                            painter.lineTo(x + paddingSize + 5, y + data.height - paddingSize);
                            painter.stroke();

                            painter.beginPath();
                            painter.lineTo(x - paddingSize - 5 + data.width, y + paddingSize);
                            painter.lineTo(x - paddingSize - 5 + data.width, y + data.height - paddingSize);
                            painter.stroke();

                        } else {

                            painter.beginPath();
                            painter.lineTo(x + paddingSize + 10, y + paddingSize);
                            painter.lineTo(x + paddingSize + 5, y + paddingSize + 5);
                            painter.lineTo(x + paddingSize + 5, y + data.height - paddingSize - 5);
                            painter.lineTo(x + paddingSize + 10, y + data.height - paddingSize);
                            painter.stroke();

                            painter.beginPath();
                            painter.lineTo(x - paddingSize - 10 + data.width, y + paddingSize);
                            painter.lineTo(x - paddingSize - 5 + data.width, y + paddingSize + 5);
                            painter.lineTo(x - paddingSize - 5 + data.width, y + data.height - paddingSize - 5);
                            painter.lineTo(x - paddingSize - 10 + data.width, y + data.height - paddingSize);
                            painter.stroke();

                        }
                        break;
                    }

                    case "division": {

                        // 先绘制内容，从上到下
                        drawFormula(x + (data.width - data.contents[0].width) * 0.5, y + paddingSize, data.contents[0]);
                        drawFormula(x + (data.width - data.contents[1].width) * 0.5, y + paddingSize + data.contents[0].height + 2, data.contents[1]);

                        // 再绘制中间的线条
                        painter.beginPath();
                        painter.lineTo(x + paddingSize, y + data.contents[0].height + 1);
                        painter.lineTo(x + data.width - paddingSize, y + data.contents[0].height + 1);
                        painter.stroke();

                        break;
                    }

                    case "bracket": {
                        // 先绘制中间的内容
                        drawFormula(x + paddingSize + 10, y + paddingSize, data.contents[0]);

                        // 再绘制括号
                        drawBracket(painter, data._help.type, 'left', x + paddingSize, y + paddingSize, data.height - 2 * paddingSize);
                        drawBracket(painter, data._help.type, 'right', x + data.width - paddingSize - 10, y + paddingSize, data.height - 2 * paddingSize);
                        break;
                    }

                    case "rightTop": {
                        drawFormula(x + 0.5 * paddingSize, y + data.height - data._help.p1Height - paddingSize, data.contents[0]);
                        drawFormula(x - 1.5 * paddingSize + data._help.p1Width, y + 0.5 * paddingSize, data.contents[1]);
                        break;
                    }

                    case "rightBottom": {
                        drawFormula(x + 0.5 * paddingSize, y + paddingSize, data.contents[0]);
                        drawFormula(x - 1.5 * paddingSize + data._help.p1Width, y + data.height - 0.5 * paddingSize - data._help.p2Height, data.contents[1]);
                        break;
                    }

                    case "equationSet": {
                        drawBracket(painter, "big", 'left', x + paddingSize, y + paddingSize, data.height - 2 * paddingSize);

                        for (var i in data.contents) {
                            drawFormula(x + paddingSize + 10, y + data._help.pxTops[i], data.contents[i]);
                        }

                        break;
                    }

                    case "upLine": {
                        drawFormula(x, y + paddingSize, data.contents[0]);
                        painter.beginPath();
                        painter.lineTo(x, y + paddingSize);
                        painter.lineTo(x + data.width, y + paddingSize);
                        painter.stroke();

                        break;
                    }

                    case "downLine": {
                        drawFormula(x, y, data.contents[0]);
                        painter.beginPath();
                        painter.lineTo(x, y + data.height - paddingSize);
                        painter.lineTo(x + data.width, y + data.height - paddingSize);
                        painter.stroke();

                        break;
                    }

                    case "vector": {
                        drawFormula(x, y + paddingSize, data.contents[0]);
                        painter.beginPath();
                        painter.lineTo(x + paddingSize * 0.3, y + paddingSize);
                        painter.lineTo(x + data.width - paddingSize * 0.3, y + paddingSize);
                        painter.stroke();
                        painter.beginPath();
                        painter.lineTo(x + data.width - 5, y + paddingSize - 2);
                        painter.lineTo(x + data.width, y + paddingSize);
                        painter.lineTo(x + data.width - 5, y + paddingSize + 2);
                        painter.stroke();

                        break;
                    }

                    case "abs": {
                        drawFormula(x + paddingSize, y, data.contents[0]);

                        painter.beginPath();
                        painter.lineTo(x + paddingSize, y);
                        painter.lineTo(x + paddingSize, y + data.height);
                        painter.stroke();

                        painter.beginPath();
                        painter.lineTo(x + data.width - paddingSize, y);
                        painter.lineTo(x + data.width - paddingSize, y + data.height);
                        painter.stroke();

                        break;
                    }

                    case "integral": {
                        drawFormula(x + paddingSize + 15, y + paddingSize, data.contents[3]);
                        drawFormula(x + paddingSize + 10, y + data.height - data.contents[2].height - paddingSize, data.contents[2]);
                        drawFormula(x + paddingSize + 15, y + paddingSize + data.contents[3].height, data.contents[0]);
                        drawFormula(x + paddingSize + 15 + data.contents[0].width, y + paddingSize + data.contents[3].height + 0.5 * (data.contents[0].height - data.contents[1].height), data.contents[1]);

                        // 然后绘制积分符号
                        painter.beginPath();
                        painter.moveTo(x + paddingSize, y + data.height - paddingSize - 2.5);
                        painter.arc(x + paddingSize + 2.5, y + data.height - paddingSize - 2.5, 2.5, Math.PI, 0, true);
                        painter.lineTo(x + paddingSize + 10, y + paddingSize + 2.5);
                        painter.arc(x + paddingSize + 12.5, y + paddingSize + 2.5, 2.5, Math.PI, 2 * Math.PI, false);
                        painter.stroke();

                        break;
                    }

                    case "listedOr": {
                        drawFormula(x + data.width * 0.5 - data.contents[0].width * 0.5, y + data.height - paddingSize - data.contents[0].height, data.contents[0]);
                        drawFormula(x + data.width * 0.5 - data.contents[1].width * 0.5, y + paddingSize, data.contents[1]);

                        painter.beginPath();
                        painter.moveTo(x + data.width * 0.5 - 15, y + paddingSize + data.contents[1].height);
                        painter.lineTo(x + data.width * 0.5 - 15, y + paddingSize + data.contents[1].height + 25);
                        painter.bezierCurveTo(
                            x + data.width * 0.5 - 10, y + paddingSize + data.contents[1].height + 30,
                            x + data.width * 0.5 + 10, y + paddingSize + data.contents[1].height + 30,
                            x + data.width * 0.5 + 15, y + paddingSize + data.contents[1].height + 25
                        );
                        painter.lineTo(x + data.width * 0.5 + 15, y + paddingSize + data.contents[1].height);
                        painter.stroke();

                        break;
                    }

                    case "listedAnd": {
                        drawFormula(x + data.width * 0.5 - data.contents[0].width * 0.5, y + data.height - paddingSize - data.contents[0].height, data.contents[0]);
                        drawFormula(x + data.width * 0.5 - data.contents[1].width * 0.5, y + paddingSize, data.contents[1]);

                        painter.beginPath();
                        painter.moveTo(x + data.width * 0.5 - 15, y + paddingSize + data.contents[1].height + 35);
                        painter.lineTo(x + data.width * 0.5 - 15, y + paddingSize + data.contents[1].height + 10);
                        painter.bezierCurveTo(
                            x + data.width * 0.5 - 10, y + paddingSize + data.contents[1].height + 5,
                            x + data.width * 0.5 + 10, y + paddingSize + data.contents[1].height + 5,
                            x + data.width * 0.5 + 15, y + paddingSize + data.contents[1].height + 10
                        );
                        painter.lineTo(x + data.width * 0.5 + 15, y + paddingSize + data.contents[1].height + 35);
                        painter.stroke();

                        break;
                    }

                    case "C": {
                        drawFormula(x + paddingSize + 20, y + paddingSize, data.contents[1]);
                        drawFormula(x + paddingSize + 20, y + 5 + data.contents[1].height + paddingSize, data.contents[0]);

                        painter.beginPath();
                        painter.moveTo(x + 20, y + paddingSize * 2);
                        painter.bezierCurveTo(x, y + data.height * 0.7, x + 18, y + data.height - paddingSize * 2, x + 22, y + data.height - paddingSize * 2 - 10)
                        painter.stroke();

                        break;
                    }

                    case "A": {
                        drawFormula(x + paddingSize + 20, y + paddingSize, data.contents[1]);
                        drawFormula(x + paddingSize + 20, y + 5 + data.contents[1].height + paddingSize, data.contents[0]);

                        painter.beginPath();
                        painter.moveTo(x + paddingSize, y + data.height - paddingSize);
                        painter.lineTo(x + paddingSize + 10, y + paddingSize);
                        painter.lineTo(x + paddingSize + 20, y + data.height - paddingSize);
                        painter.stroke();

                        painter.beginPath();
                        painter.moveTo(x + paddingSize + 4, y + data.height * 0.5);
                        painter.lineTo(x + paddingSize + 16, y + data.height * 0.5);
                        painter.stroke();

                        break;
                    }

                    default: {
                        console.error('未匹配的数据格式：');
                        console.error(x, y, data);
                    }
                }

            };

            drawFormula(0, 0, format);

            // 设置图片文字并插入页面
            var span = document.createElement("span");

            span.style.display = 'inline-block';

            span.style.width = format.width + "px";
            span.style.height = format.height + "px";

            span.style.backgroundSize = '100% auto';

            span.style.verticalAlign = "middle";

            span.style.backgroundImage = "url(" + canvas.toDataURL() + ")";

            codeEls[i].parentNode.insertBefore(span, codeEls[i].nextSibling);
            codeEls[i].parentNode.removeChild(codeEls[i]);

        } catch (event) {

            console.log(event)
            codeEls[i].innerText = event.message + " " + event.filename + " " + event.lineno + " \nstack :\n" + (event.error ? event.error.stack : "");

            codeEls[i].style.color = 'red';
            codeEls[i].style.fontSize = "12px";
            codeEls[i].style.textDecoration = "underline";
            codeEls[i].style.fontWeight = 800;
        }
    }

};
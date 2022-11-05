
/*************************** [bundle] ****************************/
// Original file:./src/dialogs/labory/examples/tree/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['146']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('160');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('161');


__pkg__scope_args__=window.__pkg__getBundle('162');
var treeLayout =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('60');
var canvasRender =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj) {
    return {
        name: "tree",
        render: template,
        mounted: function () {

            var tree = treeLayout({

                // 获取根结点
                root: function (initTree) {
                    return initTree[0];
                },

                // 获取孩子结点
                child: function (parentTree, initTree) {
                    var children = [], i;
                    for (i = 0; i < initTree.length; i++) {
                        if (initTree[i][1] == parentTree[0])
                            children.push(initTree[i]);
                    }
                    return children;
                },

                // 获取结点标志id
                id: function (initTree) {
                    return initTree[0];
                }

            })([

                // 结点名称、父节点名称
                ["手绘", null],
                ["水粉", "手绘"],
                ["油画", "手绘"],
                ['题材', '油画'],
                ['画法', '油画'],
                ["素描", "手绘"],
                ["中国画", "手绘"],
                ["空间透视", "素描"],
                ["色彩五大调", "素描"]

            ]);

            // 绘制

            var painter = canvasRender(document.getElementById('tree-canvas'), 500, 500);

            painter.config({
                fillStyle: 'red',
                textAlign: "center"
            });

            for (var key in tree.node) {
                console.log(tree.node[key]);

                var x = tree.node[key].left * 150;
                var y = tree.node[key].top * 100;

                // 绘制矩形框子
                painter.strokeRect(x - 30, y - 30, 60, 60);

                // 绘制文字
                painter.fillText(tree.node[key].id, x, y);

                // 绘制连线
                if (tree.node[key].pid != null) {
                    painter
                        .beginPath()
                        .moveTo(x - 30, y)
                        .lineTo(tree.node[tree.node[key].pid].left * 150 + 30, tree.node[tree.node[key].pid].top * 100)
                        .stroke();
                }
            }

        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/labory/examples/tree/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['160']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,2]},{"type":"tag","name":"canvas","attrs":{"id":"tree-canvas"},"childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"$closeExample"},"childNodes":[3,4,5]},{"type":"text","content":"关","childNodes":[]},{"type":"tag","name":"br","attrs":{},"childNodes":[]},{"type":"text","content":"闭","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/labory/examples/tree/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['161']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [example-view='tree']{\n\nposition: fixed;\n\nbackground-color: white;\n\nwidth: 500px;\n\nheight: 500px;\n\nleft: calc(50vw - 250px);\n\ntop: calc(50vh - 250px);\n\noutline: 1px solid red;\n\n}\n\n [example-view='tree']>button{\n\nposition: absolute;\n\nright: -30px;\n\ntop: 10px;\n\ntext-align: center;\n\nwidth: 30px;\n\noutline: none;\n\nborder: none;\n\nbackground-color: red;\n\ncolor: white;\n\npadding: 5px 0;\n\ncursor: pointer;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/tree
/*****************************************************************/
window.__pkg__bundleSrc__['162']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (_config) {
    /**
     * 无论绘制的树结构是什么样子的
     * 计算时都假想目标树的样子如下：
     *  1.根结点在最左边，且上下居中
     *  2.树是从左往右生长的结构
     *  3.每个结点都是一块1*1的正方形，top和left分别表示正方形中心的位置
     */
    var config = _config || {},
        // 维护的树
        alltreedata,
        // 根结点ID
        rootid;

    /**
    * 把内部保存的树结点数据
    * 计算结束后会调用配置的绘图方法
    */
    var update = function () {

        var beforeDis = [], size = 0, maxDeep = 0;
        (function positionCalc(pNode, deep) {

            if (deep > maxDeep) maxDeep = deep;
            var flag;
            for (flag = 0; flag < pNode.children.length; flag++)
                // 因为全部的子结点的位置确定了，父结点的y位置就是子结点的中间位置
                // 因此有子结点的，先计算子结点
                positionCalc(alltreedata[pNode.children[flag]], deep + 1);

            // left的位置比较简单，deep从0开始编号
            // 比如deep=0，第一层，left=0+0.5=0.5，也就是根结点
            alltreedata[pNode.id].left = deep + 0.5;
            if (flag == 0) {

                // beforeDis是一个数组，用以记录每一层此刻top下边缘（每一层是从上到下）
                // 比如一层的第一个，top值最小可以取top=0.5
                // 为了方便计算，beforeDis[deep] == undefined的时候表示现在准备计算的是这层的第一个结点
                // 因此设置最低上边缘为-0.5
                if (beforeDis[deep] == undefined) beforeDis[deep] = -0.5;
                // 父边缘同意的进行初始化
                if (beforeDis[deep - 1] == undefined) beforeDis[deep - 1] = -0.5;

                // 添加的新结点top值第一种求法：本层上边缘+1（比如上边缘是-0.5，那么top最小是top=-0.5+1=0.5）
                alltreedata[pNode.id].top = beforeDis[deep] + 1;

                var pTop = beforeDis[deep] + 1 + (alltreedata[pNode.pid].children.length - 1) * 0.5;
                // 计算的原则是：如果第一种可行，选择第一种，否则必须选择第二种
                // 判断第一种是否可行的方法就是：如果第一种计算后确定的孩子上边缘不对导致孩子和孩子的前兄弟重合就是可行的
                if (pTop - 1 < beforeDis[deep - 1])
                    // 必须保证父亲结点和父亲的前一个兄弟保存1的距离，至少
                    // 添加的新结点top值的第二种求法：根据孩子取孩子结点的中心top
                    alltreedata[pNode.id].top = beforeDis[deep - 1] + 1 - (alltreedata[pNode.pid].children.length - 1) * 0.5;

            } else {

                // 此刻flag!=0
                // 意味着结点有孩子，那么问题就解决了，直接取孩子的中间即可
                // 其实，flag==0的分支计算的就是孩子，是没有孩子的叶结点，那是关键
                alltreedata[pNode.id].top = (alltreedata[pNode.children[0]].top + alltreedata[pNode.children[flag - 1]].top) * 0.5;
            }

            // 因为计算孩子的时候
            // 无法掌握父辈兄弟的情况
            // 可能会出现父亲和兄弟重叠问题
            if (alltreedata[pNode.id].top <= beforeDis[deep]) {
                var needUp = beforeDis[deep] + 1 - alltreedata[pNode.id].top;
                (function doUp(_pid, _deep) {
                    alltreedata[_pid].top += needUp;
                    if (beforeDis[_deep] < alltreedata[_pid].top) beforeDis[_deep] = alltreedata[_pid].top;
                    var _flag;
                    for (_flag = 0; _flag < alltreedata[_pid].children.length; _flag++) {
                        doUp(alltreedata[_pid].children[_flag], _deep + 1);
                    }
                })(pNode.id, deep);
            }

            // 计算好一个结点后，需要更新此刻该层的上边缘
            beforeDis[deep] = alltreedata[pNode.id].top;

            // size在每次计算一个结点后更新，是为了最终绘图的时候知道树有多宽（此处应该叫高）
            if (alltreedata[pNode.id].top + 0.5 > size) size = alltreedata[pNode.id].top + 0.5;

        })(alltreedata[rootid], 0);

        // 传递的参数分别表示：记录了位置信息的树结点集合、根结点ID和树的宽
        return {
            "node": alltreedata,
            "root": rootid,
            "size": size,
            "deep": maxDeep + 1
        };

    };

    /**
    * 根据配置的层次关系（配置的id,child,root）把原始数据变成内部结构，方便后期位置计算
    * @param {any} initTree
    *
    * tempTree[id]={
    *  "data":原始数据,
    *  "pid":父亲ID,
    *  "id":唯一标识ID,
    *  "children":[cid1、cid2、...]
    * }
    */
    var toInnerTree = function (initTree) {

        var tempTree = {};
        // 根结点
        var temp = config.root(initTree), id, rid;
        id = rid = config.id(temp);
        tempTree[id] = {
            "data": temp,
            "pid": null,
            "id": id,
            "children": []
        };

        var num = 1;
        // 根据传递的原始数据，生成内部统一结构
        (function createTree(pdata, pid) {
            var children = config.child(pdata, initTree), flag;
            num += children ? children.length : 0;
            for (flag = 0; children && flag < children.length; flag++) {
                id = config.id(children[flag]);
                tempTree[pid].children.push(id);
                tempTree[id] = {
                    "data": children[flag],
                    "pid": pid,
                    "id": id,
                    "children": []
                };
                createTree(children[flag], id);
            }
        })(temp, id);

        return {
            value: [rid, tempTree],
            num: num
        };
    };

    // 可以传递任意格式的树原始数据
    // 只要配置对应的解析方法即可
    var tree = function (initTree) {

        var treeData = toInnerTree(initTree);
        alltreedata = treeData.value[1];
        rootid = treeData.value[0];

        if (treeData.num == 1) {
            alltreedata[rootid].left = 0.5;
            alltreedata[rootid].top = 0.5;
            return {
                deep: 1,
                node: alltreedata,
                root: rootid,
                size: 1
            };
        }

        return update();
    };

    // 获取根结点的方法:root(initTree)
    tree.root = function (rootback) {
        config.root = rootback;
        return tree;
    };

    // 获取子结点的方法:child(parentTree,initTree)
    tree.child = function (childback) {
        config.child = childback;
        return tree;
    };

    // 获取结点ID方法:id(treedata)
    tree.id = function (idback) {
        config.id = idback;
        return tree;
    };

    return tree;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/index
/*****************************************************************/
window.__pkg__bundleSrc__['60']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('61');
var initText=__pkg__scope_args__.initText;
var initArc=__pkg__scope_args__.initArc;
var initCircle=__pkg__scope_args__.initCircle;
var initRect=__pkg__scope_args__.initRect;

__pkg__scope_args__=window.__pkg__getBundle('63');
var linearGradient=__pkg__scope_args__.linearGradient;
var radialGradient=__pkg__scope_args__.radialGradient;

__pkg__scope_args__=window.__pkg__getBundle('61');
var initPainterConfig=__pkg__scope_args__.initPainterConfig;


// 画笔对象

__pkg__scope_bundle__.default= function (canvas, width, height) {

    // 设置宽
    if (width) {
        canvas.style.width = width + "px";
        canvas.setAttribute('width', width);
    }

    // 设置高
    if (height) {
        canvas.style.height = height + "px";
        canvas.setAttribute('height', height);
    }

    var painter = canvas.getContext("2d");

    // 默认配置canvas2D对象已经存在的属性
    painter.textBaseline = 'middle';
    painter.textAlign = 'left';

    // 用于记录配置
    // 因为部分配置的设置比较特殊，只先记录意图
    var config = {};

    // 配置生效方法
    var useConfig = function (key, value) {

        /**
         * -----------------------------
         * 特殊的设置开始
         * -----------------------------
         */

        if (key == 'lineDash') {
            painter.setLineDash(value);
        }

        /**
         * -----------------------------
         * 常规的配置开始
         * -----------------------------
         */

        // 如果已经存在默认配置中，说明只需要缓存起来即可
        else if (["font-size", "font-family", "arc-start-cap", "arc-end-cap"].indexOf(key) > -1) {
            config[key] = value;
        }

        // 其它情况直接生效即可
        else if (key in initPainterConfig) {
            painter[key] = value;
        }

        // 如果属性未被定义
        else {
            throw new Error('Illegal configuration item of painter : ' + key + " !");
        }
    };

    // 画笔
    var enhancePainter = {

        // 属性设置或获取
        "config": function () {
            if (arguments.length === 1) {
                if (typeof arguments[0] !== 'object') return painter[arguments[0]];
                for (var key in arguments[0]) {
                    useConfig(key, arguments[0][key]);
                }
            } else if (arguments.length === 2) {
                useConfig(arguments[0], arguments[1]);
            }
            return enhancePainter;
        },

        // 文字
        "fillText": function (text, x, y, deg) {
            painter.save();
            initText(painter, config, x, y, deg || 0).fillText(text, 0, 0);
            painter.restore();
            return enhancePainter;
        },
        "strokeText": function (text, x, y, deg) {
            painter.save();
            initText(painter, config, x, y, deg || 0).strokeText(text, 0, 0);
            painter.restore();
            return enhancePainter;
        },
        "fullText": function (text, x, y, deg) {
            painter.save();
            initText(painter, config, x, y, deg || 0);
            painter.fillText(text, 0, 0);
            painter.strokeText(text, 0, 0);
            painter.restore();
            return enhancePainter;
        },

        // 路径
        "beginPath": function () { painter.beginPath(); return enhancePainter; },
        "closePath": function () { painter.closePath(); return enhancePainter; },
        "moveTo": function (x, y) { painter.moveTo(x, y); return enhancePainter; },
        "lineTo": function (x, y) { painter.lineTo(x, y); return enhancePainter; },
        "arc": function (x, y, r, beginDeg, deg) {
            painter.arc(x, y, r, beginDeg, beginDeg + deg, deg < 0);
            return enhancePainter;
        },
        "fill": function () { painter.fill(); return enhancePainter; },
        "stroke": function () { painter.stroke(); return enhancePainter; },
        "full": function () { painter.fill(); painter.stroke(); return enhancePainter; },

        "save": function () { painter.save(); return enhancePainter; },
        "restore": function () { painter.restore(); return enhancePainter; },

        // 路径 - 贝塞尔曲线
        "quadraticCurveTo": function (cpx, cpy, x, y) {
            painter.quadraticCurveTo(cpx, cpy, x, y); return enhancePainter;
        },
        "bezierCurveTo": function (cp1x, cp1y, cp2x, cp2y, x, y) {
            painter.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y); return enhancePainter;
        },

        // 擦除画面
        "clearRect": function (x, y, w, h) { painter.clearRect(x, y, w, h); return enhancePainter; },

        // 弧
        "fillArc": function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(painter, config, cx, cy, r1, r2, beginDeg, deg).fill(); return enhancePainter;
        },
        "strokeArc": function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(painter, config, cx, cy, r1, r2, beginDeg, deg).stroke(); return enhancePainter;
        },
        "fullArc": function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(painter, config, cx, cy, r1, r2, beginDeg, deg);
            painter.fill();
            painter.stroke();
            return enhancePainter;
        },

        // 圆形
        "fillCircle": function (cx, cy, r) {
            initCircle(painter, cx, cy, r).fill(); return enhancePainter;
        },
        "strokeCircle": function (cx, cy, r) {
            initCircle(painter, cx, cy, r).stroke(); return enhancePainter;
        },
        "fullCircle": function (cx, cy, r) {
            initCircle(painter, cx, cy, r);
            painter.fill();
            painter.stroke();
            return enhancePainter;
        },

        // 矩形
        "fillRect": function (x, y, width, height) {
            initRect(painter, x, y, width, height).fill(); return enhancePainter;
        },
        "strokeRect": function (x, y, width, height) {
            initRect(painter, x, y, width, height).stroke(); return enhancePainter;
        },
        "fullRect": function (x, y, width, height) {
            initRect(painter, x, y, width, height);
            painter.fill();
            painter.stroke();
            return enhancePainter;
        },

        // base64
        "toDataURL": function (type) {
            type = type || 'image/png';
            return canvas.toDataURL(type);
        },

        // image
        "drawImage": function (img, sx, sy, sw, sh, x, y, w, h) {
            sx = sx || 0;
            sy = sy || 0;
            x = x || 0;
            y = y || 0;
            w = w ? w : canvas.getAttribute('width');
            h = h ? h : canvas.getAttribute('height');

            if (img.nodeName == 'CANVAS') {
                sw = sw ? sw : canvas.getAttribute('width');
                sh = sh ? sh : canvas.getAttribute('height');
            } else {
                // 默认类型是图片
                sw = sw || img.width;
                sh = sh || img.height;
            }

            painter.drawImage(img, sx, sy, sw, sh, x, y, w, h);
            return enhancePainter;
        },

        /**
        * 渐变
        * -------------
        */

        //  线性渐变
        "createLinearGradient": function (x0, y0, x1, y1) {
            return linearGradient(painter, x0, y0, x1, y1);
        },

        // 环形渐变
        "createRadialGradient": function (cx, cy, r) {
            return radialGradient(painter, cx, cy, r);
        }

    };

    return enhancePainter;

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/config
/*****************************************************************/
window.__pkg__bundleSrc__['61']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('62');
var arc =__pkg__scope_args__.default;


__pkg__scope_bundle__.initPainterConfig = {

    // 填充色或图案
    "fillStyle": 'black',

    // 轮廓色或图案
    "strokeStyle": 'black',

    // 线条宽度(单位px，下同)
    "lineWidth": 1,

    // 文字水平对齐方式（"left"左对齐、"center"居中和"right"右对齐）
    "textAlign": 'left',

    // 文字垂直对齐方式（"middle"垂直居中、"top"上对齐和"bottom"下对齐）
    "textBaseline": 'middle',

    // 文字大小
    "font-size": 16,

    // 字体，默认"sans-serif"
    "font-family": "sans-serif",

    // 圆弧开始端闭合方式（"butt"直线闭合、"round"圆帽闭合）
    "arc-start-cap": 'butt',

    // 圆弧结束端闭合方式，和上一个类似
    "arc-end-cap": 'butt',

    // 设置线条虚线，应该是一个数组[number,...]
    "lineDash": [],

    // 阴影的模糊系数，默认0，也就是无阴影
    "shadowBlur": 0,

    // 阴影的颜色
    "shadowColor": "black"

};

// 文字统一设置方法
__pkg__scope_bundle__.initText = function (painter, config, x, y, deg) {

    painter.beginPath();
    painter.translate(x, y);
    painter.rotate(deg);
    painter.font = config['font-size'] + "px " + config['font-family'];
    return painter;
};

// 画弧统一设置方法
__pkg__scope_bundle__.initArc = function (painter, config, cx, cy, r1, r2, beginDeg, deg) {

    if (r1 > r2) {
        var temp = r1;
        r1 = r2;
        r2 = temp;
    }

    beginDeg = beginDeg % (Math.PI * 2);

    // 当|deg|>=2π的时候都认为是一个圆环
    // 为什么不取2π比较，是怕部分浏览器浮点不精确
    if (deg >= Math.PI * 1.999999 || deg <= -Math.PI * 1.999999) {
        deg = Math.PI * 2;
    } else {
        deg = deg % (Math.PI * 2);
    }

    arc(beginDeg, deg, cx, cy, r1, r2, function (
        beginA, endA,
        begInnerX, begInnerY,
        begOuterX, begOuterY,
        endInnerX, endInnerY,
        endOuterX, endOuterY,
        r
    ) {
        if (r < 0) r = -r;
        painter.beginPath();
        painter.moveTo(begInnerX, begInnerY);
        painter.arc(
            // (圆心x，圆心y，半径，开始角度，结束角度，true逆时针/false顺时针)
            cx, cy, r1, beginA, endA, false);
        // 结尾
        if (config["arc-end-cap"] != 'round')
            painter.lineTo(endOuterX, endOuterY);
        else
            painter.arc((endInnerX + endOuterX) * 0.5, (endInnerY + endOuterY) * 0.5, r, endA - Math.PI, endA, true);
        painter.arc(cx, cy, r2, endA, beginA, true);
        // 开头
        if (config["arc-start-cap"] != 'round')
            painter.lineTo(begInnerX, begInnerY);
        else
            painter.arc((begInnerX + begOuterX) * 0.5, (begInnerY + begOuterY) * 0.5, r, beginA, beginA - Math.PI, true);
    });
    if (config["arc-start-cap"] == 'butt') painter.closePath();
    return painter;
};

// 画圆统一设置方法
__pkg__scope_bundle__.initCircle = function (painter, cx, cy, r) {
    painter.beginPath();
    painter.moveTo(cx + r, cy);
    painter.arc(cx, cy, r, 0, Math.PI * 2);
    return painter;
};

// 画矩形统一设置方法
__pkg__scope_bundle__.initRect = function (painter, x, y, width, height) {
    painter.beginPath();
    painter.rect(x, y, width, height);
    return painter;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/arc
/*****************************************************************/
window.__pkg__bundleSrc__['62']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
// 点（x,y）围绕中心（cx,cy）旋转deg度

var rotate = function (cx, cy, deg, x, y) {
    var cos = Math.cos(deg), sin = Math.sin(deg);
    return [
        +((x - cx) * cos - (y - cy) * sin + cx).toFixed(7),
        +((x - cx) * sin + (y - cy) * cos + cy).toFixed(7)
    ];
};

// r1和r2，内半径和外半径
// beginA起点弧度，rotateA旋转弧度式

__pkg__scope_bundle__.default= function (beginA, rotateA, cx, cy, r1, r2, doback) {

    // 保证逆时针也是可以的
    if (rotateA < 0) {
        beginA += rotateA;
        rotateA *= -1;
    }

    var temp = [], p;

    // 内部
    p = rotate(0, 0, beginA, r1, 0);
    temp[0] = p[0];
    temp[1] = p[1];
    p = rotate(0, 0, rotateA, p[0], p[1]);
    temp[2] = p[0];
    temp[3] = p[1];

    // 外部
    p = rotate(0, 0, beginA, r2, 0);
    temp[4] = p[0];
    temp[5] = p[1];
    p = rotate(0, 0, rotateA, p[0], p[1]);
    temp[6] = p[0];
    temp[7] = p[1];

    doback(
        beginA, beginA + rotateA,
        temp[0] + cx, temp[1] + cy,
        temp[4] + cx, temp[5] + cy,
        temp[2] + cx, temp[3] + cy,
        temp[6] + cx, temp[7] + cy,
        (r2 - r1) * 0.5
    );

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/Gradient
/*****************************************************************/
window.__pkg__bundleSrc__['63']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 线性渐变
__pkg__scope_bundle__.linearGradient = function (painter, x0, y0, x1, y1) {
    var gradient = painter.createLinearGradient(x0, y0, x1, y1);
    var enhanceGradient = {
        "value": function () {
            return gradient;
        },
        "addColorStop": function (stop, color) {
            gradient.addColorStop(stop, color);
            return enhanceGradient;
        }
    };
    return enhanceGradient;
};

// 环形渐变
__pkg__scope_bundle__.radialGradient = function (painter, cx, cy, r) {
    var gradient = painter.createRadialGradient(cx, cy, 0, cx, cy, r);
    var enhanceGradient = {
        "value": function () {
            return gradient;
        },
        "addColorStop": function (stop, color) {
            gradient.addColorStop(stop, color);
            return enhanceGradient;
        }
    };
    return enhanceGradient;
};


    return __pkg__scope_bundle__;
}

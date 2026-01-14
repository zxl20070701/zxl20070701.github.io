
/*************************** [bundle] ****************************/
// Original file:./src/pages/echarts/dialogs/tree-layout-lr/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['267']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('414');
var template =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('197');
var ResizeObserver =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('307');
var xhr =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('415');
var TreeLayout =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('305');
var canvasRender =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj, props) {

    return {
        name: "echarts-example",
        render: template,
        data: {
            srcUrl: props.srcUrl
        },
        mounted: function () {
            var _this = this;

            xhr({
                method: "GET",
                url: "../data/flare.json"
            }, function (data) {
                if (data.status == 200) {

                    var mycontent = _this._refs.mycontent.value;
                    var mycanvas = _this._refs.mycanvas.value;

                    var painter = canvasRender(mycanvas, mycontent.clientWidth, mycontent.clientHeight), pid, dist;

                    var treeLayout = new TreeLayout({
                        "id": function (treedata) {
                            return treedata.name
                        }
                    }).setOption({
                        type: "rect",
                        direction: "LR",
                        x: 50,
                        y: mycontent.clientHeight * 0.5,
                        width: mycontent.clientWidth - 200,
                        height: mycontent.clientHeight - 60
                    }).bind(JSON.parse(data.data), function (tree) {
                        painter.config({
                            fontSize: 9
                        }).clearRect(0, 0, mycontent.clientWidth, mycontent.clientHeight);

                        // 绘制连线
                        painter.setRegion("").config({
                            strokeStyle: '#cccccc'
                        });
                        for (var key in tree.node) {
                            if (tree.node[key].show && key != tree.root) {
                                pid = tree.node[key].pid

                                dist = (tree.node[key].left - tree.node[pid].left) * 0.5

                                painter
                                    .beginPath()
                                    .moveTo(tree.node[key].left, tree.node[key].top)
                                    .bezierCurveTo(
                                        tree.node[key].left - dist, tree.node[key].top,
                                        tree.node[pid].left + dist, tree.node[pid].top,
                                        tree.node[pid].left, tree.node[pid].top
                                    ).stroke()
                            }
                        }

                        // 绘制节点和文字
                        painter.config({
                            strokeStyle: '#b0c4de'
                        });
                        for (var key in tree.node) {
                            if (tree.node[key].show) {
                                if (!tree.node[key].isOpen && tree.node[key].children.length > 0) {
                                    painter.config({
                                        fillStyle: "#b0c4de"
                                    });
                                } else {
                                    painter.config({
                                        fillStyle: "#ffffff"
                                    });
                                }
                                painter.setRegion(key).fullCircle(tree.node[key].left, tree.node[key].top, 4)

                                painter.setRegion("").config({
                                    fillStyle: "black"
                                }).fillText(key.replace(/\-\d+$/, ''), tree.node[key].left + 10, tree.node[key].top)
                            }
                        }

                    }, {
                        analytics: true,
                        animate: true,
                        physics: true,
                        scale: true,
                        util: true,
                        vis: true
                    });

                    ResizeObserver(mycontent, function () {
                        painter = canvasRender(mycanvas, mycontent.clientWidth, mycontent.clientHeight);

                        treeLayout.setOption({
                            y: mycontent.clientHeight * 0.5,
                            width: mycontent.clientWidth - 200,
                            height: mycontent.clientHeight - 60
                        }).doUpdate();
                    });

                    mycontent.addEventListener('click', function (event) {
                        var regionName = painter.getRegion(event);
                        if (regionName) {
                            treeLayout.toggleNode(regionName);
                        }
                    });
                }
            });
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/echarts/dialogs/tree-layout-lr/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['414']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,10]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,4,7]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"从左到右树状图","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"src-url"},"childNodes":[5,6]},{"type":"text","content":"查看源码：","childNodes":[]},{"type":"tag","name":"a","attrs":{"ui-bind:href":"srcUrl","ui-bind":"srcUrl","target":"_blank"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[8]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeDialog"},"childNodes":[9]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content","ref":"mycontent"},"childNodes":[11]},{"type":"tag","name":"canvas","attrs":{"ref":"mycanvas"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/ResizeObserver
/*****************************************************************/
window.__pkg__bundleSrc__['197']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var _support_ = true;

__pkg__scope_bundle__.default= function (el, doback) {

    var observer = null;
    var _hadWilldo_ = false;
    var _hadNouse_ = false;

    var doit = function () {

        // 如果前置任务都完成了
        if (!_hadWilldo_) {
            _hadWilldo_ = true;

            // 既然前置任务已经没有了，那么就可以更新了？
            // 不是的，可能非常短的时间里，后续有改变
            // 因此延迟一点点来看看后续有没有改变
            // 如果改变了，就再延迟看看
            var interval = window.setInterval(function () {

                // 判断当前是否可以立刻更新
                if (!_hadNouse_) {
                    window.clearInterval(interval);

                    _hadWilldo_ = false;
                    doback();

                }

                _hadNouse_ = false;
            }, 100);

        } else {
            _hadNouse_ = true;
        }
    }

    try {


        observer = new ResizeObserver(doit);
        observer.observe(el);

    } catch (e) {

        // 如果浏览器不支持此接口

        if (_support_) {
            console.error('ResizeObserver undefined!');

            // 不支持的话，提示一次就可以了
            _support_ = false;
        }

        // 使用resize进行退化支持
        doit();
        window.addEventListener('resize', doit, false);

    }

    return function () {
        if (observer) {

            // 解除对画布大小改变的监听
            observer.disconnect();

        } else {
            window.removeEventListener('resize', doit);
        }
    };

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhr/index
/*****************************************************************/
window.__pkg__bundleSrc__['307']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('32');
var isFunction =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('308');
var toString =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (settings, callback, errorback) {

    var xmlhttp;

    // 如果外部定义了
    if (isFunction(settings.xhr)) {
        xmlhttp = settings.xhr();
    }

    // 否则就内部创建
    else {
        xmlhttp = new XMLHttpRequest();
    }

    // 请求完成回调
    xmlhttp.onload = function () {

        if (xmlhttp.readyState == 4) {

            callback({

                // 状态码
                status: xmlhttp.status,

                // 数据
                data: xmlhttp.responseText

            });

        }
    };

    // 请求超时回调
    xmlhttp.ontimeout = function () {
        errorback({
            status: xmlhttp.status,
            data: "请求超时了"
        });
    };

    // 请求错误回调
    xmlhttp.onerror = function () {
        errorback({
            status: xmlhttp.status,
            data: xmlhttp.responseText
        });
    };

    xmlhttp.open(settings.method, settings.url, true);

    // 设置请求头
    for (var key in settings.header) {
        xmlhttp.setRequestHeader(key, settings.header[key]);
    }

    // 设置超时时间
    xmlhttp.timeout = 'timeout' in settings ? settings.timeout : 6000;

    xmlhttp.send(toString(settings.data));

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhr/toString
/*****************************************************************/
window.__pkg__bundleSrc__['308']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('54');
var isPlainObject =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('31');
var isString =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (data) {

    // 如果是字符串
    if (isString(data)) {
        return data;
    }

    // 如果是JSON数据
    else if (isPlainObject(data)) {
        return JSON.stringify(data);
    }

    // 如果为空
    else if (data === undefined) {
        return "";
    }

    // 否则
    else {
        return data;
    }

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/treeLayout/index
/*****************************************************************/
window.__pkg__bundleSrc__['415']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('416');
var Tree =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('216');
var initConfig=__pkg__scope_args__.initConfig;

__pkg__scope_args__=window.__pkg__getBundle('121');
var animation =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('222');
var rotate =__pkg__scope_args__.default;


function TreeLayout(config) {

    this.__option = {
        offsetX: 0,
        offsetY: 0,
        duration: 500,
        type: "plain",
        direction: "LR",
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        radius: 100
    };

    this.__rback = null;
    this.__oralTree = null;
    this.__preTree = null;

    this.__noOpens = {};

    this.__Tree = new Tree(config);

    return this;
}

TreeLayout.prototype.setOption = function (option) {
    initConfig(this.__option, option);
    return this;
};

TreeLayout.prototype.use = function (initTree, noOpens) {
    noOpens = noOpens || {};

    var tree = this.__Tree.use(initTree, noOpens);

    // 校对偏差
    if (this.__option.offsetX != 0 || this.__option.offsetY != 0) {
        for (var key in tree.node) {
            if (!tree.node[key].show) {

                var deep = 0, pid = key;
                do {
                    pid = tree.node[pid].pid;
                    deep++;
                } while (!tree.node[pid].show);

                tree.node[key].left += this.__option.offsetX * deep;
                tree.node[key].top += this.__option.offsetY * deep;
            }
        }
    }

    if (this.__option.type == 'rect') {
        if (this.__option.direction == 'LR' || this.__option.direction == "RL") {

            var perW = this.__option.height / tree.size
            var perD = this.__option.width / (tree.deep - 1)

            var balanceW = this.__option.y - this.__option.height * 0.5
            var flag = this.__option.direction == 'LR' ? 1 : -1

            for (var key in tree.node) {
                if (tree.deep == 1) {
                    tree.node[key].left = this.__option.x + this.__option.width * 0.5 * flag
                    tree.node[key].top = this.__option.y
                } else {
                    tree.node[key].left = this.__option.x + (tree.node[key].left - 0.5) * perD * flag
                    tree.node[key].top = tree.node[key].top * perW + balanceW
                }
            }
        } else if (this.__option.direction == 'TB' || this.__option.direction == "BT") {

            var perW = this.__option.width / tree.size;
            var perD = this.__option.height / (tree.deep - 1);

            var balanceW = this.__option.x - this.__option.width * 0.5;
            var flag = this.__option.direction == 'TB' ? 1 : -1;

            for (var key in tree.node) {
                tree.node[key].deg = this.__option.direction == 'TB' ? Math.PI * 0.5 : Math.PI * -0.5;

                if (tree.deep == 1) {
                    tree.node[key].left = this.__option.x;
                    tree.node[key].top = this.__option.y + this.__option.height * 0.5 * flag;
                } else {
                    var left = tree.node[key].left;

                    tree.node[key].left = tree.node[key].top * perW + balanceW;
                    tree.node[key].top = this.__option.y + (left - 0.5) * perD * flag;
                }
            }

        }

    } else if (this.__option.type == 'circle') {
        var cx = this.__option.x, cy = this.__option.y;
        var deg = Math.PI * 2 / tree.size;
        var per = this.__option.radius / (tree.deep - 1);

        for (var key in tree.node) {
            if (tree.node[key].left == 0.5) {
                tree.node[key].left = cx;
                tree.node[key].top = cy;
            } else {
                var position = rotate(cx, cy, deg * tree.node[key].top, cx + (tree.node[key].left - 0.5) * per, cy);

                tree.node[key].deg = deg * tree.node[key].top;
                tree.node[key].left = position[0];
                tree.node[key].top = position[1];
            }
        }
    }

    return tree;
};

TreeLayout.prototype.bind = function (initTree, renderBack, noOpens) {
    noOpens = noOpens || {};

    this.__rback = renderBack;
    this.__oralTree = initTree;
    this.__noOpens = noOpens;

    this.__preTree = this.use(this.__oralTree, this.__noOpens);
    this.__rback(this.__preTree);

    return this;
};

TreeLayout.prototype.unbind = function () {
    this.__rback = function () { return null };
    this.__oralTree = null;
    this.__preTree = null;
    this.__noOpens = {};
    return this;
};

TreeLayout.prototype.doUpdate = function () {
    var newTree = this.use(this.__oralTree, this.__noOpens);

    var cacheTree = JSON.parse(JSON.stringify(newTree));

    var _this=this;
    animation(function (deep) {

        if (_this.__preTree) {
            for (var key in cacheTree.node) {
                if (newTree.node[key].show || _this.__preTree.node[key].show) {
                    cacheTree.node[key].show = true;

                    cacheTree.node[key].left = _this.__preTree.node[key].left + (newTree.node[key].left - _this.__preTree.node[key].left) * deep;
                    cacheTree.node[key].top = _this.__preTree.node[key].top + (newTree.node[key].top - _this.__preTree.node[key].top) * deep;
                }
            }
        }
        _this.__rback(cacheTree);


    }, this.__option.duration, function () {
        _this.__preTree = newTree;
        _this.__rback(_this.__preTree);
    })
};

TreeLayout.prototype.closeNode = function (id) {
    if (!this.__preTree) return this;
    this.__noOpens[id] = true;

    this.doUpdate();
    return this;
};

TreeLayout.prototype.openNode = function (id) {
    if (!this.__preTree) return this;
    this.__noOpens[id] = false;

    this.doUpdate();
    return this;
};

TreeLayout.prototype.toggleNode = function (id) {
    if (!this.__preTree) return this;
    this.__noOpens[id] = !this.__noOpens[id];

    this.doUpdate();
    return this;
};

__pkg__scope_bundle__.default= TreeLayout;

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/treeLayout/Tree
/*****************************************************************/
window.__pkg__bundleSrc__['416']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('417');
var toPlainTree =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('216');
var initConfig=__pkg__scope_args__.initConfig;


function Tree(config) {
    this.__config = initConfig({
        root: (initTree) => initTree,
        children: (parentTree) => parentTree.children,
        id: (treedata) => treedata.name
    }, config || {});
    return this;
}

Tree.prototype.use = function (initTree, noOpens) {
    return toPlainTree(initTree, this.__config, noOpens);
};

__pkg__scope_bundle__.default= Tree;

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/treeLayout/toPlainTree
/*****************************************************************/
window.__pkg__bundleSrc__['417']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('418');
var toInnerTree =__pkg__scope_args__.default;


// 可以传递任意格式的树原始数据
// 只要配置对应的解析方法即可
__pkg__scope_bundle__.default= function (initTree, config, noOpens) {
    noOpens = noOpens || {};

    var treeData = toInnerTree(initTree, config);
    var alltreedata = treeData.value; // 维护的树
    var rootid = treeData.rid; // 根结点ID

    if (treeData.num == 1) {
        alltreedata[rootid].left = 0.5;
        alltreedata[rootid].top = 0.5;
        alltreedata[rootid].show = true;
        return {
            deep: 1,
            node: alltreedata,
            root: rootid,
            size: 1
        };
    } else {

        var beforeDis = [], size = 0, maxDeep = 0;

        if (noOpens[rootid]) {
            alltreedata[rootid].left = 0.5;
            alltreedata[rootid].top = 0.5;
            alltreedata[rootid].show = true;

            size = 1;
        } else {
            (function positionCalc(pNode, deep) {

                if (deep > maxDeep) maxDeep = deep;

                var flag = 0;
                if (!noOpens[pNode.id]) {

                    for (flag = 0; flag < pNode.children.length; flag++)

                        // 因为全部的子结点的位置确定了，父结点的y位置就是子结点的中间位置
                        // 因此有子结点的，先计算子结点
                        positionCalc(alltreedata[pNode.children[flag]], deep + 1);

                }

                // left的位置比较简单，deep从0开始编号
                // 比如deep=0，第一层，left=0+0.5=0.5，也就是根结点
                alltreedata[pNode.id].left = deep + 0.5;
                if (flag == 0) {

                    // beforeDis是一个数组，用以记录每一层此刻top下边缘（每一层是从上到下）
                    // 比如一层的第一个，top值最小可以取top=0.5
                    // 为了方便计算，beforeDis[deep] == undefined的时候表示现在准备计算的是这层的第一个结点
                    // 因此设置最低上边缘为-0.5
                    if (beforeDis[deep] == void 0) beforeDis[deep] = -0.5;
                    // 父边缘同意的进行初始化
                    if (beforeDis[deep - 1] == void 0) beforeDis[deep - 1] = -0.5;

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

                        for (var _flag = 0; _flag < alltreedata[_pid].children.length; _flag++) {
                            doUp(alltreedata[_pid].children[_flag], _deep + 1);
                        }
                    })(pNode.id, deep);
                }

                // 计算好一个结点后，需要更新此刻该层的上边缘
                beforeDis[deep] = alltreedata[pNode.id].top;

                // size在每次计算一个结点后更新，是为了最终绘图的时候知道树有多宽（此处应该叫高）
                if (alltreedata[pNode.id].top + 0.5 > size) size = alltreedata[pNode.id].top + 0.5;

            })(alltreedata[rootid], 0);

        }
        // 对于不显示的，需要标记一下
        for (var key in noOpens) {
            if (noOpens[key]) {
                alltreedata[key].isOpen = false;
                (function updateHidden(pid, left, top) {
                    for (var index = 0; index < alltreedata[pid].children.length; index++) {
                        alltreedata[alltreedata[pid].children[index]].left = left;
                        alltreedata[alltreedata[pid].children[index]].top = top;
                        alltreedata[alltreedata[pid].children[index]].show = false;

                        updateHidden(alltreedata[pid].children[index], left, top);
                    }
                })(key, alltreedata[key].left, alltreedata[key].top);
            }
        }

        // 传递的参数分别表示：记录了位置信息的树结点集合、根结点ID和树的宽
        return {
            "node": alltreedata,
            "root": rootid,
            "size": size,
            "deep": maxDeep + 1
        };

    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/treeLayout/toInnerTree
/*****************************************************************/
window.__pkg__bundleSrc__['418']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    /**
 * 根据配置的层次关系（配置的id,child,root）把原始数据变成内部结构，方便后期位置计算
 *
 * tempTree[id] = {
 *  "data": 原始数据,
 *  "pid": 父亲ID,
 *  "id": 唯一标识ID,
 *  "show": boolean,
 *  "isOpen": boolean,
 *  "children": [cid1、cid2、...]
 * }
 */
__pkg__scope_bundle__.default= (initTree, config) => {
    var tempTree = {};

    // 根结点
    var temp = (config.root)(initTree);
    var id, rid;
    id = rid = (config.id)(temp);
    tempTree[id] = {
        "data": temp,
        "pid": null,
        "id": id,
        "isOpen": true,
        "show": true,
        "deg": 0,
        "children": []
    };

    var num = 1;

    // 根据传递的原始数据，生成内部统一结构
    (function createTree(pdata, pid) {
        var children = (config.children)(pdata, initTree);
        num += children ? children.length : 0;
        for (var flag = 0; children && flag < children.length; flag++) {
            id = (config.id)(children[flag]);
            tempTree[pid].children.push(id);
            tempTree[id] = {
                "data": children[flag],
                "pid": pid,
                "id": id,
                "isOpen": true,
                "show": true,
                "deg": 0,
                "children": []
            };
            createTree(children[flag], id);
        }
    })(temp, id);

    return {
        rid,
        value: tempTree,
        num
    };

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/config
/*****************************************************************/
window.__pkg__bundleSrc__['216']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
// 初始化配置文件

__pkg__scope_bundle__.initConfig = function (init, data) {
    var key;
    for (key in data)
        try {
            init[key] = data[key];
        } catch (e) {
            throw new Error("Illegal property value！");
        }
    return init;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/animation
/*****************************************************************/
window.__pkg__bundleSrc__['121']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    //当前正在运动的动画的tick函数堆栈
var $timers = [];
//唯一定时器的定时间隔
var $interval = 13;
//指定了动画时长duration默认值
var $speeds = 400;
//定时器ID
var $timerId = null;

/**
 * 动画轮播
 * @param {function} doback 轮询函数，有一个形参deep，0-1，表示执行进度
 * @param {number} duration 动画时长，可选
 * @param {function} callback 动画结束回调，可选，有一个形参deep，0-1，表示执行进度
 *
 * @returns {function} 返回一个函数，调用该函数，可以提前结束动画
 */
__pkg__scope_bundle__.default= function (doback, duration, callback) {

    // 如果没有传递时间，使用内置默认值
    if (arguments.length < 2) duration = $speeds;

    var clock = {
        //把tick函数推入堆栈
        "timer": function (tick, duration, callback) {
            if (!tick) {
                throw new Error('Tick is required!');
            }
            var id = new Date().valueOf() + "_" + (Math.random() * 1000).toFixed(0);
            $timers.push({
                "id": id,
                "createTime": new Date(),
                "tick": tick,
                "duration": duration,
                "callback": callback
            });
            clock.start();
            return id;
        },

        //开启唯一的定时器timerId
        "start": function () {
            if (!$timerId) {
                $timerId = setInterval(clock.tick, $interval);
            }
        },

        //被定时器调用，遍历timers堆栈
        "tick": function () {
            var createTime, flag, tick, callback, timer, duration, passTime,
                timers = $timers;
            $timers = [];
            $timers.length = 0;
            for (flag = 0; flag < timers.length; flag++) {
                //初始化数据
                timer = timers[flag];
                createTime = timer.createTime;
                tick = timer.tick;
                duration = timer.duration;
                callback = timer.callback;

                //执行
                passTime = (+new Date() - createTime) / duration;
                passTime = passTime > 1 ? 1 : passTime;
                tick(passTime);
                if (passTime < 1 && timer.id) {
                    //动画没有结束再添加
                    $timers.push(timer);
                } else if (callback) {
                    callback(passTime);
                }
            }
            if ($timers.length <= 0) {
                clock.stop();
            }
        },

        //停止定时器，重置timerId=null
        "stop": function () {
            if ($timerId) {
                clearInterval($timerId);
                $timerId = null;
            }
        }
    };

    var id = clock.timer(function (deep) {
        //其中deep为0-1，表示改变的程度
        doback(deep);
    }, duration, callback);

    // 返回一个函数
    // 用于在动画结束前结束动画
    return function () {
        var i;
        for (i in $timers) {
            if ($timers[i].id == id) {
                $timers[i].id = undefined;
                return;
            }
        }
    };

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/transform/rotate
/*****************************************************************/
window.__pkg__bundleSrc__['222']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 点（x,y）围绕中心（cx,cy）旋转deg度
__pkg__scope_bundle__.default= function (cx, cy, deg, x, y) {
    var cos = Math.cos(deg), sin = Math.sin(deg);
    return [
        +((x - cx) * cos - (y - cy) * sin + cx).toFixed(7),
        +((x - cx) * sin + (y - cy) * cos + cy).toFixed(7)
    ];
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/region
/*****************************************************************/
window.__pkg__bundleSrc__['305']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('144');
var canvasRender =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('211');
var assemble =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (canvas, width, height, isScale) {

    // 初始化尺寸
    width = width || canvas.clientWidth;
    height = height || canvas.clientHeight;

    // 获取绘制画笔
    var drawPainter = canvasRender(canvas, width, height, {}, isScale);

    // 获取区域画笔
    var regionPainter = canvasRender(document.createElement('canvas'), width, height, {

        // https://html.spec.whatwg.org/multipage/canvas.html#concept-canvas-will-read-frequently
        willReadFrequently: true
    });

    var regions = {}; //区域映射表
    var regionAssemble = assemble(0, 255, 10, 3);

    var drawRegion = false;

    var instance = {

        // 配置画笔
        config: function () {
            if (arguments.length === 1) {
                if (typeof arguments[0] !== "object") return drawPainter.config([arguments[0]]);
                for (var key in arguments[0]) {
                    if (['fillStyle', 'strokeStyle', 'shadowBlur', 'shadowColor'].indexOf(key) < 0) regionPainter.config(key, arguments[0][key]);
                    drawPainter.config(key, arguments[0][key]);
                }
            } else if (arguments.length === 2) {
                if (['fillStyle', 'strokeStyle', 'shadowBlur', 'shadowColor'].indexOf(key) < 0) regionPainter.config(arguments[0], arguments[1]);
                drawPainter.config(arguments[0], arguments[1]);
            }
            return instance;
        },

        // 设置当前绘制区域名称
        setRegion: function (regionName) {
            if (regionName === false) {
                drawRegion = false;
            } else {
                drawRegion = true;

                if (regions[regionName] == undefined) {
                    var tempColor = regionAssemble();
                    regions[regionName] = "rgb(" + tempColor[0] + "," + tempColor[1] + "," + tempColor[2] + ")";
                }

                regionPainter.config({
                    fillStyle: regions[regionName],
                    strokeStyle: regions[regionName]
                });
            }

            return instance;
        },

        // 获取当前事件触发的区域名称
        getRegion: function (event) {

            // 获取点击点的颜色
            var currentRGBA = regionPainter.painter.getImageData(event.offsetX - 0.5, event.offsetY - 0.5, 1, 1).data;

            // 查找当前点击的区域
            for (var key in regions) {
                if ("rgb(" + currentRGBA[0] + "," + currentRGBA[1] + "," + currentRGBA[2] + ")" == regions[key]) {
                    return key;
                }
            }

            return false;
        }

    };

    for (var key in drawPainter) {
        (function (key) {

            // 如果是获取原生画笔
            if ('painter' == key) {
                instance.painter = function () {
                    return {
                        draw: drawPainter.painter,
                        region: regionPainter.painter
                    };
                };
            }

            // 特殊的过滤掉
            else if (['config'].indexOf(key) < 0) {
                instance[key] = function () {
                    if (drawRegion) regionPainter[key].apply(regionPainter, arguments);
                    var result = drawPainter[key].apply(drawPainter, arguments);
                    return result.__only__painter__ ? instance : result;
                };

            }
        })(key);
    }

    return instance;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/index
/*****************************************************************/
window.__pkg__bundleSrc__['144']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('145');
var initText=__pkg__scope_args__.initText;
var initArc=__pkg__scope_args__.initArc;
var initCircle=__pkg__scope_args__.initCircle;
var initRect=__pkg__scope_args__.initRect;

__pkg__scope_args__=window.__pkg__getBundle('147');
var linearGradient=__pkg__scope_args__.linearGradient;
var radialGradient=__pkg__scope_args__.radialGradient;

__pkg__scope_args__=window.__pkg__getBundle('145');
var initPainterConfig=__pkg__scope_args__.initPainterConfig;


// 画笔对象

__pkg__scope_bundle__.default= function (canvas, width, height, opts, isScale) {

    // 设置宽
    if (width) {
        canvas.style.width = width + "px";
        canvas.setAttribute('width', (isScale ? 2 : 1) * width);
    }

    // 设置高
    if (height) {
        canvas.style.height = height + "px";
        canvas.setAttribute('height', (isScale ? 2 : 1) * height);
    }

    var painter = canvas.getContext("2d", opts || {});
    if (isScale) painter.scale(2, 2);

    // 默认配置canvas2D对象已经存在的属性
    painter.textBaseline = 'middle';
    painter.textAlign = 'left';

    // 用于记录配置
    // 因为部分配置的设置比较特殊，只先记录意图
    var config = {

        // 文字大小
        "fontSize": 16,

        // 字体
        "fontFamily": "sans-serif",

        // 字重
        "fontWeight": 400,

        // 字类型
        "fontStyle": "normal",

        // 圆弧开始端闭合方式（"butt"直线闭合、"round"圆帽闭合）
        "arcStartCap": 'butt',

        // 圆弧结束端闭合方式，和上一个类似
        "arcWndCap": 'butt',
    };

    // 配置生效方法
    var useConfig = function (key, value) {

        /**
         * -----------------------------
         * 特殊的设置开始
         * -----------------------------
         */

        if (key == 'lineDash') {
            if (painter.setLineDash) painter.setLineDash(value);
        }

        /**
         * -----------------------------
         * 常规的配置开始
         * -----------------------------
         */

        // 如果已经存在默认配置中，说明只需要缓存起来即可
        else if (key in config) {
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
        __only__painter__: true,

        // 原生画笔
        painter: painter,

        // 属性设置或获取
        "config": function () {
            if (arguments.length === 1) {
                if (typeof arguments[0] !== 'object') {

                    // 暂存的
                    if (arguments[0] in config) return config[arguments[0]];

                    // lineDash
                    if ('lineDash' == arguments[0]) return painter.getLineDash();

                    // 普通的
                    return painter[arguments[0]];
                }
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
        "moveTo": function (x, y) {

            // 解决1px模糊问题，别的地方类似原因
            painter.moveTo(Math.round(x) + 0.5, Math.round(y) + 0.5);
            return enhancePainter;
        },
        "lineTo": function (x, y) { painter.lineTo(Math.round(x) + 0.5, Math.round(y) + 0.5); return enhancePainter; },
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
        "clearCircle": function (cx, cy, r) {
            painter.beginPath();
            painter.globalCompositeOperation = "destination-out";
            painter.arc(cx, cy, r, 0, Math.PI * 2); // 绘制圆形
            painter.fill(); // 填充圆形，这将会清除这个圆形区域
            painter.globalCompositeOperation = "source-over";
            painter.closePath();
            return enhancePainter;
        },

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

        // 获取指定位置颜色
        "getColor": function (x, y) {
            var currentRGBA = painter.getImageData(x - 0.5, y - 0.5, 1, 1).data;
            return "rgba(" + currentRGBA[0] + "," + currentRGBA[1] + "," + currentRGBA[2] + "," + currentRGBA[3] + ")";
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
        "createRadialGradient": function (cx, cy, r1, r2) {
            if (arguments.length < 4) {
                return radialGradient(painter, cx, cy, 0, r1);
            } else {
                return radialGradient(painter, cx, cy, r1, r2);
            }

        }

    };

    return enhancePainter;

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/config
/*****************************************************************/
window.__pkg__bundleSrc__['145']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('146');
var arc =__pkg__scope_args__.default;


__pkg__scope_bundle__.initPainterConfig = {

    // 填充色或图案
    "fillStyle": 'black',

    // 轮廓色或图案
    "strokeStyle": 'black',

    // 线的端点类型，（"butt"平直边缘、"round"半圆和"square"矩形）
    "lineCap": "butt",

    // 线的拐角连接方式，（"miter"连接处边缘延长相接、"bevel"对角线斜角和"round"圆）
    "lineJoin": "miter",

    // 线条宽度(单位px，下同)
    "lineWidth": 1,

    // 设置线条虚线，应该是一个数组[number,...]
    "lineDash": [],

    // 文字水平对齐方式（"left"左对齐、"center"居中和"right"右对齐）
    "textAlign": 'left',

    // 文字垂直对齐方式（"middle"垂直居中、"top"上对齐和"bottom"下对齐）
    "textBaseline": 'middle',

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
    painter.font = config.fontStyle + " " + config.fontWeight + " " + config.fontSize + "px " + config.fontFamily;
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
        if (config.arcEndCap != 'round')
            painter.lineTo(endOuterX, endOuterY);
        else
            painter.arc((endInnerX + endOuterX) * 0.5, (endInnerY + endOuterY) * 0.5, r, endA - Math.PI, endA, true);
        painter.arc(cx, cy, r2, endA, beginA, true);
        // 开头
        if (config.arcStartCap != 'round')
            painter.lineTo(begInnerX, begInnerY);
        else
            painter.arc((begInnerX + begOuterX) * 0.5, (begInnerY + begOuterY) * 0.5, r, beginA, beginA - Math.PI, true);
    });
    if (config.arcStartCap == 'butt') painter.closePath();
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
window.__pkg__bundleSrc__['146']=function(){
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
window.__pkg__bundleSrc__['147']=function(){
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
__pkg__scope_bundle__.radialGradient = function (painter, cx, cy, r1, r2) {
    var gradient = painter.createRadialGradient(cx, cy, r1, cx, cy, r2);
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

/*************************** [bundle] ****************************/
// Original file:./src/tool/assemble
/*****************************************************************/
window.__pkg__bundleSrc__['211']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (begin, end, step, count) {
    var val = [];
    for (var index = 0; index < count; index++) val[index] = begin;

    // 非常类似进制数，每次调用都+1
    return function () {
        for (var i = 0; i < count; i++) {

            // 如果当前位可以进1
            if (val[i] + step < end) {
                val[i] = +(val[i] + step).toFixed(7);
                break;
            }

            // 如果当前位不可以，那当前位归0，尝试下一位
            else if (i < count - 1) {
                val[i] = begin;
            }
        }

        return val;
    }
};

    return __pkg__scope_bundle__;
}

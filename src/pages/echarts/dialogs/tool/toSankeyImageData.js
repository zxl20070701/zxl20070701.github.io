
// 把数据变成容易绘制桑基图的格式

export default function (data, width, height, x, y) {

    // 每个结点的格式如下
    /**
     * {
     *  // 记录前序结点
     *  pres:[
     *          {name:"",value:""},...
     *      ],
     *
     *  // 记录后续结点
     *  nexts:[
     *          {name:"",value:""},...
     *      ],
     *
     *  // 记录当前结点的层次
     *  deep:"",
     *
     *  // 值
     *  value:"",
     *
     *  // 位置和大小
     *  left,top,width,height,
     *
     *  值位置
     *  preTops:[],
     *  nextTops:[]
     * }
     */
    var nodes = {}, i, j, link, disDeep;
    for (i = 0; i < data.nodes.length; i++) {
        nodes[data.nodes[i].name] = {
            pres: [],
            nexts: [],
            deep: 0,
            _sValue: 0,
            _tValue: 0,
            preTops: [],
            nextTops: []
        };
    }

    // 根据连接信息不断更新结点信息

    for (i = 0; i < data.links.length; i++) {

        link = data.links[i];

        // 首先更新起点和终点结点的连接记录

        nodes[link.source].nexts.push({
            name: link.target,
            value: link.value
        });
        nodes[link.source]._sValue += link.value;

        nodes[link.target].pres.push({
            name: link.source,
            value: link.value
        });
        nodes[link.target]._tValue += link.value;

        // 然后校对deep

        if (nodes[link.source].deep >= nodes[link.target].deep) {

            disDeep = nodes[link.source].deep + 1 - nodes[link.target].deep;

            // 修改target的deep
            nodes[link.target].deep += disDeep;

            // 然后对于target和其所有nexts同步提升deep
            (function reCalcDeep(name, deep) {

                if (nodes[name].deep < deep) {
                    nodes[name].deep = deep;

                    var _nexts = nodes[name].nexts, j;

                    for (j = 0; j < _nexts.length; j++) {
                        reCalcDeep(_nexts[j].name, nodes[name].deep + 1);
                    }
                }

            })(link.target, nodes[link.target].deep + 1);

        }

    }

    // 计算第一层的总值（用于计算每个点的位置）
    var values = [];
    for (i in nodes) {
        if (values[nodes[i].deep] == undefined) values[nodes[i].deep] = 0;
        nodes[i].value = nodes[i]._sValue > nodes[i]._tValue ? nodes[i]._sValue : nodes[i]._tValue;

        values[nodes[i].deep] += nodes[i].value;

    }

    // 辅助过会计算位置
    var topPreDis = [];

    // 求解最大值
    var maxValue = 0;
    for (i = 0; i < values.length; i++) {
        if (maxValue < values[i]) maxValue = values[i];
        topPreDis.push(0);
    }

    var _width = width / values.length;
    var _itemWidth = _width / 3;
    var _heightDis;

    // 然后，计算出每个结点的位置，大小
    for (i in nodes) {
        _heightDis = nodes[i].value / values[nodes[i].deep] * height;

        nodes[i].width = _itemWidth;
        nodes[i].height = nodes[i].value / maxValue * height * 0.9;
        nodes[i].left = _width * (nodes[i].deep + 1 / 3) + x;
        nodes[i].top = topPreDis[nodes[i].deep] + (_heightDis - nodes[i].height) * 0.5 + y;

        nodes[i].preTops.push(nodes[i].top);
        for (j = 0; j < nodes[i].pres.length; j++) {
            nodes[i].preTops[j + 1] = nodes[i].preTops[j] + nodes[i].pres[j].value / nodes[i].value * nodes[i].height;
        }

        nodes[i].nextTops.push(nodes[i].top);
        for (j = 0; j < nodes[i].nexts.length; j++) {
            nodes[i].nextTops[j + 1] = nodes[i].nextTops[j] + nodes[i].nexts[j].value / nodes[i].value * nodes[i].height;
        }

        topPreDis[nodes[i].deep] += _heightDis;
    }

    return nodes;
};

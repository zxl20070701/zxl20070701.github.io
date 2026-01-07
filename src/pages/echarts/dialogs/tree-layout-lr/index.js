import template from './index.html';

import ResizeObserver from '../../../../tool/ResizeObserver';
import xhr from '../../../../tool/xhr/index';
import TreeLayout from '../../../../tool/treeLayout/index';
import canvasRender from '../../../../tool/canvas/region';

export default function (obj, props) {

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
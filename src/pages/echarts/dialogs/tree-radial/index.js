import template from './index.html';

import ResizeObserver from '../../../../tool/ResizeObserver';
import xhr from '../../../../tool/xhr/index';
import TreeLayout from '../../../../tool/treeLayout/index';
import canvasRender from '../../../../tool/canvas/region';
import move from '../../../../tool/transform/move';

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

                    var painter = canvasRender(mycanvas, mycontent.clientWidth, mycontent.clientHeight), pid;

                    var cx = mycontent.clientWidth * 0.5, cy = mycontent.clientHeight * 0.5;

                    var treeLayout = new TreeLayout({
                        "id": function (treedata) {
                            return treedata.name
                        }
                    }).setOption({
                        type: "circle",
                        x: cx,
                        y: cy,
                        radius: Math.min(mycontent.clientWidth, mycontent.clientHeight) * 0.5 - 100
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

                                let x1 = tree.node[key].left, y1 = tree.node[key].top;
                                let x2 = tree.node[pid].left, y2 = tree.node[pid].top;
                                if (pid == tree.root) {
                                    painter
                                        .beginPath()
                                        .moveTo(x1, y1)
                                        .bezierCurveTo(
                                            ...move(cx - 30 - x1, cy - 30 - y1, 30, x1, y1),
                                            ...move(x2 - cx + 30, y2 - cy + 30, 30, x2, y2),
                                            x2, y2
                                        ).stroke();
                                } else {
                                    painter
                                        .beginPath()
                                        .moveTo(x1, y1)
                                        .bezierCurveTo(
                                            ...move(cx - x1, cy - y1, 30, x1, y1),
                                            ...move(x2 - cx, y2 - cy, 30, x2, y2),
                                            x2, y2
                                        ).stroke();
                                }
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
                                }).fillText("   " + key.replace(/\-\d+$/, ''), tree.node[key].left, tree.node[key].top, tree.node[key].deg);
                            }
                        }

                    });

                    ResizeObserver(mycontent, function () {
                        cx = mycontent.clientWidth * 0.5;
                        cy = mycontent.clientHeight * 0.5;
                        painter = canvasRender(mycanvas, mycontent.clientWidth, mycontent.clientHeight);

                        treeLayout.setOption({
                            x: cx,
                            y: cy,
                            radius: Math.min(mycontent.clientWidth, mycontent.clientHeight) * 0.5 - 100
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
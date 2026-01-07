import template from './index.html';

import ResizeObserver from '../../../../tool/ResizeObserver';
import canvasRender from '../../../../tool/canvas/index';
import xhr from '../../../../tool/xhr/index';
import toSankeyImageData from "../tool/toSankeyImageData";
import getLoopColors from '../../../../tool/getLoopColors';

export default function (obj, props) {

    return {
        name: "echarts-example",
        render: template,
        data: {
            srcUrl: props.srcUrl
        },
        mounted: function () {

            var mycontent = this._refs.mycontent.value;
            var mycanvas = this._refs.mycanvas.value;

            xhr({
                method: "GET",
                url: "../data/energy.json"
            }, function (data) {
                if (data.status == 200) {
                    data = JSON.parse(data.data);

                    var updateView = function () {
                        var sankeyData = toSankeyImageData(data, mycontent.clientWidth - 50, mycontent.clientHeight - 60, 0, 30);
                        var painter = canvasRender(mycanvas, mycontent.clientWidth, mycontent.clientHeight, {}, true);

                        // 获取颜色
                        var nodeColors = getLoopColors(data.nodes.length);
                        var lineColors = getLoopColors(data.nodes.length, 0.2);

                        painter.config({
                            "fontSize": 10
                        });

                        // 先绘制连线
                        var key, node, tNode, i, _helpDis;
                        for (key in sankeyData) {
                            node = sankeyData[key];

                            painter.config({
                                fillStyle: lineColors.pop()
                            });
                            // 连线
                            for (i = 0; i < node.nexts.length; i++) {
                                tNode = sankeyData[node.nexts[i].name];

                                _helpDis = (tNode.left - (node.left + node.width)) * 0.5;

                                painter
                                    .beginPath()
                                    .moveTo(node.left + node.width, node.nextTops[i])
                                    .bezierCurveTo(node.left + node.width + _helpDis, node.nextTops[i], tNode.left - _helpDis, tNode.preTops[0], tNode.left, tNode.preTops[0])
                                    .lineTo(tNode.left, tNode.preTops[1])
                                    .bezierCurveTo(tNode.left - _helpDis, tNode.preTops[1], node.left + node.width + _helpDis, node.nextTops[i + 1], node.left + node.width, node.nextTops[i + 1])
                                    .fill();
                                tNode.preTops.shift();
                            }

                        }

                        // 再绘制别的
                        for (key in sankeyData) {
                            node = sankeyData[key];

                            // 结点
                            painter.config({
                                fillStyle: nodeColors.pop()
                            }).fillRect(node.left, node.top, node.width, node.height);

                            // 文字
                            painter.config({
                                fillStyle: '#555555'
                            }).fillText(key, node.left + node.width, node.top + node.height * 0.5);

                        }
                    };

                    ResizeObserver(mycontent, updateView);
                }
            });

        }
    };
};
import template from './index.html';
import './index.scss';

import treeLayout from '../../../../tool/tree';
import canvasRender from '../../../../tool/canvas/index';

export default function (obj) {
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
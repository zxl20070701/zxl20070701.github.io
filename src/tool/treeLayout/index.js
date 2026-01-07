import Tree from "./Tree";
import { initConfig } from '../config';
import animation from "../animation";
import rotate from "../transform/rotate";

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

export default TreeLayout;
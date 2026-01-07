import toPlainTree from './toPlainTree';
import { initConfig } from '../config';

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

export default Tree;
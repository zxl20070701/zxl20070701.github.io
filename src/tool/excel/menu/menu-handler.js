import hasClass from '../../xhtml/hasClass';
import find from '../../xhtml/find';
import addClass from '../../xhtml/addClass';

export default function (defType, node) {

    // 格式刷
    if (defType == 'format') {

        // 首先需要确定选择区域，然后点击格式刷来同步格式
        if (this.__region != null) {

            // 标记格式刷
            this.__format = true;
            addClass(find(this.__menuQuickDom, function (node) { return node.getAttribute('def-type') == 'format'; }, 'span')[0], 'active');

        }

    }

    // 粗体
    else if (defType == 'bold') {
        this.$$setItemStyle('font-weight', hasClass(node, 'active') ? 'normal' : 'bold');
    }

    // 斜体
    else if (defType == 'italic') {
        this.$$setItemStyle('font-style', hasClass(node, 'active') ? 'normal' : 'italic');
    }

    // 中划线
    else if (defType == 'line-through') {
        this.$$setItemStyle('text-decoration', hasClass(node, 'active') ? 'none' : 'line-through');
    }

    // 下划线
    else if (defType == 'underline') {
        this.$$setItemStyle('text-decoration', hasClass(node, 'active') ? 'none' : 'underline');
    }

    // 水平对齐方式
    else if (/^horizontal\-/.test(defType)) {
        this.$$setItemStyle('text-align', defType.replace('horizontal-', ''));
    }

    // 垂直对齐方式
    else if (/^vertical\-/.test(defType)) {
        this.$$setItemStyle('vertical-align', defType.replace('vertical-', ''));
    }

    // 合并单元格
    else if (/^merge\-/.test(defType)) {

        // 无选择区域，直接结束
        if (this.__region == null) return;

        // 全部合并
        if (defType == 'merge-all') {

            // 如果选择的区域就一个结点，不用额外的操作了
            if (this.__region.nodes.length <= 1) return;

            // 删除多余的结点并修改数据
            for (var i = 1; i < this.__region.nodes.length; i++) {

                this.__contentArray[this.__tableIndex].content[this.__region.nodes[i].getAttribute('row') - 1][this.__region.nodes[i].getAttribute('col') - 1].style.display = 'none';
                this.__contentArray[this.__tableIndex].content[this.__region.nodes[i].getAttribute('row') - 1][this.__region.nodes[i].getAttribute('col') - 1].value = ' ';
                this.__region.nodes[i].style.display = 'none';
            }

            this.__region.nodes = [this.__region.nodes[0]];

            // 修改第一个结点的数据和占位

            this.__contentArray[this.__tableIndex].content[this.__region.nodes[0].getAttribute('row') - 1][this.__region.nodes[0].getAttribute('col') - 1].colspan = (this.__region.info.col[1] - this.__region.info.col[0] + 1) + "";
            this.__contentArray[this.__tableIndex].content[this.__region.nodes[0].getAttribute('row') - 1][this.__region.nodes[0].getAttribute('col') - 1].rowspan = (this.__region.info.row[1] - this.__region.info.row[0] + 1) + "";

            this.__region.nodes[0].setAttribute('colspan', (this.__region.info.col[1] - this.__region.info.col[0] + 1) + "");
            this.__region.nodes[0].setAttribute('rowspan', (this.__region.info.row[1] - this.__region.info.row[0] + 1) + "");

            this.__region.nodes[0].click();
        }

        // 取消合并
        else if (defType == 'merge-cancel') {

            var rowNodes = find(this.__contentDom[this.__tableIndex], function () { return true; }, 'tr');

            // 确保所有的格子都是 1*1 的
            for (var row = this.__region.info.row[0]; row <= this.__region.info.row[1]; row++) {

                var colNodes = find(rowNodes[row], function () { return true; }, 'th');

                for (var col = this.__region.info.col[0]; col <= this.__region.info.col[1]; col++) {

                    // 修改界面显示
                    colNodes[col].style.display = 'table-cell';
                    colNodes[col].setAttribute('colspan', '1');
                    colNodes[col].setAttribute('rowspan', '1');

                    // 修改数据
                    this.__contentArray[this.__tableIndex].content[row - 1][col - 1].style.display = 'table-cell';
                    this.__contentArray[this.__tableIndex].content[row - 1][col - 1].colspan = '1';
                    this.__contentArray[this.__tableIndex].content[row - 1][col - 1].rowspan = '1';

                }

            }

            this.$$cancelRegion();
            this.__region = null;

        }

    }

    // 插入
    else if (/^insert\-/.test(defType)) {

        var num = +find(node.parentNode, function () { return true; }, 'input')[0].value;

        // 向上插入行
        if (defType == 'insert-up') {
            for (var i = 0; i < num; i++) this.$$insertUpNewRow();
        }

        // 向下插入行
        else if (defType == 'insert-down') {
            for (var i = 0; i < num; i++) this.$$insertDownNewRow();
        }

        // 向左插入列
        else if (defType == 'insert-left') {
            for (var i = 0; i < num; i++) this.$$insertLeftNewCol();
        }

        // 向右插入列
        else if (defType == 'insert-right') {
            for (var i = 0; i < num; i++) this.$$insertRightNewCol();
        }

    }

    // 删除
    else if (/^delete\-/.test(defType)) {

        // 删除当前行
        if (defType == 'delete-row') {
            this.$$deleteCurrentRow();
        }

        // 删除当前列
        else if (defType == 'delete-col') {
            this.$$deleteCurrentCol();
        }

    }

};
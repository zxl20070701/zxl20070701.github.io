
// 修改默认输入条目的样式
export function setItemStyle(key, value) {

    // 更新数据内容
    this.__contentArray[this.__tableIndex].content[this.__rowNum - 1][this.__colNum - 1].style[key] = value;

    // 更新输入条目
    this.__target.style[key] = value;

    // 更新菜单状态
    this.$$updateMenu(this.__contentArray[this.__tableIndex].content[this.__rowNum - 1][this.__colNum - 1].style);

};

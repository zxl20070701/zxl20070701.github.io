// 获取函数名称
// 部分旧浏览器不支持
if ('name' in Function.prototype === false) {
    // https://www.ecma-international.org/ecma-262/6.0/#sec-setfunctionname
    Object.defineProperty(Function.prototype, 'name', {
        get: function () {
            return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1];
        }
    });
}

// 判断一个数字正负
// IE不支持
if (Math.sign === undefined) {
    // https://www.ecma-international.org/ecma-262/6.0/#sec-math.sign
    Math.sign = function (x) {
        return (x < 0) ? - 1 : (x > 0) ? 1 : + x;
    };
}

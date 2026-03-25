// 表示二个正的浮点数之间的最新差值
// 你可以由此判断二个浮点数是否相对
// （因为js浮点运算都不是准确的，不可以简单的等号判断）
// 老火狐和IE不支持
if (Number.EPSILON === undefined) {
    // https://www.ecma-international.org/ecma-262/6.0/#sec-number.epsilon
    Number.EPSILON = Math.pow(2, - 52);
}

// 判断是不是整数
// IE浏览器不支持
if (Number.isInteger === undefined) {
    Number.isInteger = function (value) {
        // https://www.ecma-international.org/ecma-262/6.0/#sec-isfinite-number
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    };
}

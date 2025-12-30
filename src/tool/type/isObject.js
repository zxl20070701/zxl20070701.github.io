/**
 * 判断一个值是不是Object。
 *
 * @param {*} value 需要判断类型的值
 * @returns {boolean} 如果是Object返回true，否则返回false
 */
export default function (value) {
    var type = typeof value;
    return value != null && (type === 'object' || type === 'function');
};

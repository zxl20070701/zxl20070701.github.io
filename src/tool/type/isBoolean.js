import getType from './getType.js';

/**
 * 判断一个值是不是Boolean。
 *
 * @param {*} value 需要判断类型的值
 * @returns {boolean} 如果是Boolean返回true，否则返回false
 */
export default function (value) {
    return value === true || value === false ||
        (value !== null && typeof value === 'object' && getType(value) === '[object Boolean]');
};

import isObject from '../tool/type/isObject.js';

var _ref = function (data) {

    // 如果是定义的数据，不好监听，嵌套一层壳
    return {
        value: data,
        type: 'ref'
    };

};

export var ref = _ref;
export var reactive = function (data) {

    // 如果是对象
    if (isObject(data)) {
        return {
            value: data,
            type: 'reactive'
        };
    }

    // 否则，还是用ref
    else {
        return _ref(data);
    }

};
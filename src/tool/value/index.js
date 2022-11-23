import analyseExpress from './analyseExpress.js';
import toPath from './toPath.js';
import calcValue from './value.js';

// 解析一段表达式
export var evalExpress = function (target, express, scope) {
    if (arguments.length < 3) scope = {};

    var expressArray = analyseExpress(target, express, scope);
    var path = toPath(target, expressArray, scope);

    // 如果不是表达式
    if (path.length > 1) throw new Error("Illegal expression : " + express + "\nstep='evalExpress',path=" + path + ",expressArray=" + expressArray);

    return path[0];
};

// 获取表达式作为key对应的值
export var getValue = function (target, express, scope) {
    if (arguments.length < 3) scope = {};

    var expressArray = analyseExpress(target, express, scope);
    var path = toPath(target, expressArray, scope);
    return calcValue(target, path, scope);
};

// 设置表达式作为key对应的值
export var setValue = function (target, express, value, scope) {
    if (arguments.length < 4) scope = {};

    var expressArray = analyseExpress(target, express, scope);
    var path = toPath(target, expressArray, scope);

    var _target = target;
    for (var i = 0; i < path.length - 1; i++) {

        // 如果需要补充
        if (!(path[i] in _target)) _target[path[i]] = Array.isArray(_target) ? [] : {};

        // 拼接下一个
        _target = _target[path[i]];
    }

    _target[path[path.length - 1]] = value;
    return target;
};

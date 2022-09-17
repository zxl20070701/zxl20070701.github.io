
// 预处理的任务就是把不同可能的输入统一成一样的格式，
// 这样的好处是后续判断的时候可以在一个比较小的集合里面考虑

export default function (express, _isString) {

    if (_isString) {
        var _express = "";
        for (var i = 0; i < express.length; i++) {
            if (express[i] == '\\') {
                if (i + 1 < express.length) _express += express[i + 1];
                i += 1;
            } else {
                _express += express[i];
            }
        }
        express = _express;
    } else {

        if (/^\//.test(express) && /\/$/.test(express)) {
            express = express.replace(/^\//, '').replace(/\/$/, '');
        }
    }

    return express;
};

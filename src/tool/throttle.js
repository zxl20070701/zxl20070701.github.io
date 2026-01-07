export default function throttle(callback, _option) {

    // 缺省值
    var option = {
        time: 200,
        keep: false,
        opportunity: "end"
    };

    // 校对
    if (_option) {
        for (var key in _option) {
            option[key] = _option[key];
        }
    }

    var hadInterval = false, hadClick = false, oneClick = false, arg;
    return function () {
        const _this = this;
        arg = arguments;

        // 如果前置任务都完成了
        if (!hadInterval) {
            if (option.opportunity != 'end') {
                callback.apply(_this, arg);
            }
            hadInterval = true;

            var interval = setInterval(() => {
                if (hadClick) {
                    if (!option.keep) {
                        callback.apply(_this, arg);
                    }
                } else {
                    if (option.opportunity != 'begin') {
                        if (oneClick || option.opportunity == 'end') callback.apply(_this, arg);
                    }
                    hadInterval = false;
                    oneClick = false;
                    clearInterval(interval);
                }
                hadClick = false;
            }, option.time);
        } else {
            hadClick = true;
            oneClick = true;
        }

    };
};
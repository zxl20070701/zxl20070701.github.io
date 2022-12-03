// 刻度尺刻度求解

// 需要注意的是，实际的间距个数可能是 num-1 或 num 或 num+1 或 1
export default function (maxValue, minValue, num) {

    // 如果最大值最小值反了
    if (maxValue < minValue) {
        var temp = minValue;
        minValue = maxValue;
        maxValue = temp;
    }

    // 如果相等
    else if (maxValue == minValue) {
        return [maxValue];
    }

    // 为了变成 -100 ~ 100 需要放大或者缩小的倍数
    var times100 =

        (function (_value) {

            // 先确定基调，是放大还是缩小
            var _times100_base = (_value < 100 && _value > -100) ? 10 : 0.1;

            // 记录当前缩放倍数
            var _times100 = 1, _tiemsValue = _value;

            while (_times100_base == 10 ?
                // 如果是放大，超过 -100 ~ 100 就应该停止
                (_tiemsValue >= -100 && _tiemsValue <= 100)
                :
                // 如果是缩小，进入 -100 ~ 100 就应该停止
                (_tiemsValue <= -100 || _tiemsValue >= 100)
            ) {

                _times100 *= _times100_base;
                _tiemsValue *= _times100_base;

            }

            return _times100;
        })

            // 根据差值来缩放
            (maxValue - minValue);


    // 求解出 -100 ~ 100 的最佳间距值 后直接转换原来的倍数
    var distance = Math.ceil((maxValue - minValue) * times100 / num) / times100;

    // 最小值，也就是起点
    var begin = Math.floor(minValue / distance) * distance;

    var rulerArray = [], index;
    // 获取最终的刻度尺数组
    rulerArray.push(begin);
    for (index = 1; rulerArray[rulerArray.length - 1] < maxValue; index++) {
        rulerArray.push(begin + distance * index);
    }

    return rulerArray;
};

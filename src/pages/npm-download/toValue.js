export default function (oralValue, interval) {

    var value = [], time = [], max = 0;

    for (var i = oralValue.length - 1; i >= interval - 1; i -= interval) {

        var temp = 0;
        for (var j = 0; j < interval; j++) {
            temp += oralValue[i - j].downloads;
        }

        if (max < temp) max = temp;

        // 数据
        value.unshift(temp);

        // 日期
        time.unshift(oralValue[i - interval + 1].day + "至" + (i == i - interval + 1 ? oralValue[i].day : oralValue[i].day));

    }

    return {
        value: value,
        time: time,
        max: max
    };

};
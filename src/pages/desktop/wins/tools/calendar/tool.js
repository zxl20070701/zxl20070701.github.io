// 计算某月多少天
var _calcDays = function (year, month) {

    if (month == 2) {

        if ((year % 4 != 0) || (year % 100 == 0 && year % 400 != 0)) {
            return 28;
        } else {
            return 29;
        }

    } else {
        return [31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
    }

};

export var calcDays = _calcDays;

// 计算某月日历视图的天数组
export var calcDaysArray = function (year, month) {

    // 0->周日 1->周一 ... 6->周六
    var index = new Date(year + '/' + month + '/1').getDay();

    // 前置多少天
    var preNum = index - 1;
    if (preNum == -1) preNum = 6;

    // 本月多少天
    var curNum = _calcDays(year, month);

    // 后置多少天
    var nextNum = 42 - preNum - curNum;

    var daysArray = {
        pre: [],
        cur: [],
        next: []
    };

    // 前置天数组
    var preMonthDays = _calcDays(month == 1 ? year - 1 : year, month == 1 ? 12 : month - 1);
    for (var i = preNum; i > 0; i--) {
        daysArray.pre.push(preMonthDays - i + 1);
    }

    // 本月天数组
    for (var i = 1; i <= curNum; i++) {
        daysArray.cur.push(i);
    }

    // 后置天数组
    for (var i = 1; i <= nextNum; i++) {
        daysArray.next.push(i);
    }

    return daysArray;
};
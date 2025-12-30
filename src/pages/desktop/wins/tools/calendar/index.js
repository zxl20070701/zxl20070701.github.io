import { calcDaysArray } from './tool'

export default function (el) {
    var curDate = new Date();
    var _year = curDate.getFullYear(), _month = curDate.getMonth() + 1, _day = curDate.getDate();

    var selectDayView = function (year, month) {
        var daysArray = calcDaysArray(year, month);

        var preTemplate = "";
        for (var i = 0; i < daysArray.pre.length; i++) {
            preTemplate += "<span class='gray'>" + daysArray.pre[i] + "</span>";
        }

        var curTemplate = "";
        for (var i = 0; i < daysArray.cur.length; i++) {
            if (year == _year && month == _month && daysArray.cur[i] == _day) {
                curTemplate += "<span class='today'>" + daysArray.cur[i] + "</span>";
            } else {
                curTemplate += "<span>" + daysArray.cur[i] + "</span>";
            }
        }

        var nextTemplate = "";
        for (var i = 0; i < daysArray.next.length; i++) {
            nextTemplate += "<span class='gray'>" + daysArray.next[i] + "</span>";
        }

        el.innerHTML = "";

        var headerEl = document.createElement('div');
        el.appendChild(headerEl);

        headerEl.setAttribute('class', 'header');

        // 当前日期
        var valEl = document.createElement('h3');
        headerEl.appendChild(valEl);

        valEl.innerHTML = year + "年" + month + "月";

        // 上个月
        var leftEl = document.createElement('button');
        headerEl.appendChild(leftEl);

        leftEl.innerHTML = "▲";

        leftEl.addEventListener('click', function () {
            selectDayView(month == 1 ? year - 1 : year, month == 1 ? 12 : month - 1);
        });

        // 下个月
        var rightEl = document.createElement('button');
        headerEl.appendChild(rightEl);

        rightEl.innerHTML = "▼";

        rightEl.addEventListener('click', function () {
            selectDayView(month == 12 ? year + 1 : year, month == 12 ? 1 : month + 1);
        });

        // 标题
        var titleEl = document.createElement('div');
        el.appendChild(titleEl);
        titleEl.innerHTML = '<span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span>';

        titleEl.setAttribute('class', 'title');

        // 内容
        var itemsEl = document.createElement('div');
        el.appendChild(itemsEl);
        itemsEl.innerHTML = preTemplate + curTemplate + nextTemplate;

        itemsEl.setAttribute('class', 'items');
    };

    // 启动
    selectDayView(_year, _month);
};
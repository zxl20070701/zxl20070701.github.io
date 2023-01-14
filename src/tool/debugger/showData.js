import appendTo from '../xhtml/appendTo';
import bind from '../xhtml/bind';
import isString from '../type/isString';
import isFunction from '../type/isFunction';
import isNumber from '../type/isNumber';
import isBoolean from '../type/isBoolean';
import toString from './toString';

var doit = function (target, obj) {

    bind(target.getElementsByTagName('i')[0], 'click', function () {

        // 如果是字符串，就不需要展开了
        if (isString(obj)) return;

        // 如果没有加载过
        if (target.getAttribute('hadload') != 'yes') {

            target.setAttribute('hadload', 'yes');
            target.setAttribute('isopen', 'yes');

            var template = "<div class='item'>";

            for (var key in obj) {
                try {
                    template += "<span isopen='no'><i><em style='font-style:normal;color:#905'>" + key + "</em>:" + toString(obj[key]) + "</i></span>";
                } catch (e) {
                    // todo
                }
            }
            template += "</div>";
            appendTo(target, template);

            // 添加交互
            var index = 0, lis = target.getElementsByTagName('span');
            for (var key in obj) {
                doit(lis[index++], obj[key]);
            }
        }

        // 如果加载过了，直接控制打开或者关闭即可
        else {
            if (target.getAttribute('isopen') == 'no') target.setAttribute('isopen', 'yes');
            else target.setAttribute('isopen', 'no');
        }

    });

};

export default function (target, msg) {

    // 如果是字符串、函数、数字等
    if (isString(msg) || isFunction(msg) || isNumber(msg) || isBoolean(msg)) {
        target.innerText = msg;
    }

    else if (msg === undefined) target.innerText = 'undefined';
    else if (msg === null) target.innerText = 'null';

    else {
        target.setAttribute('defType', 'showobject');
        target.setAttribute('class', 'item');

        // 默认作为对象显示
        target.setAttribute('hadload', 'no');
        target.setAttribute('isopen', 'no');
        target.innerHTML = "<i>" + toString(msg) + "</i>";
        doit(target, msg);
    }
};

import template from './index.html';
import './index.scss';

import animation from '../../../../tool/animation';
import cardinal from '../../../../tool/interpolation/cardinal';

import renderCalendar from './calendar/index';

// 显示隐藏动画曲线
var cardinalFun = cardinal().setP([[0, 0], [0.4, 0.35], [1, 1]]);

export default function (obj) {
    return {
        name: "tools",
        render: template,
        data: {

        },
        methods: {
            openApp: function (event, target) {
                this.$openView(target.getAttribute('tag'));
            }
        },
        mounted: function () {
            this._el.addEventListener('click', function (event) {
                event.stopPropagation();
            });

            // 日历
            renderCalendar(this._refs.calendar.value);
        },
        show: function () {
            var _this = this;

            this._el.style.right = "-360px";
            this._el.style.display = "";

            animation(function (deep) {
                _this._el.style.right = (360 * cardinalFun(deep) - 360) + "px";
            }, 350, function () {
                _this._el.style.right = "0px";
            });

            return true;
        },
        hidden: function () {
            var _this = this;

            animation(function (deep) {
                _this._el.style.right = (-360 * cardinalFun(deep)) + "px";
            }, 350, function () {
                _this._el.style.display = "none";
            });

            return true;
        }
    };
};
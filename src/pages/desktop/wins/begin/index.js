import template from './index.html';
import './index.scss';

import animation from '../../../../tool/animation';
import cardinal from '../../../../tool/interpolation/cardinal';

// 显示隐藏动画曲线
var cardinalFun = cardinal().setP([[0, 0], [0.4, 0.35], [1, 1]]);

export default function (obj) {
    return {
        name: "begin",
        render: template,
        data: {
            project: window._project_
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
        },
        show: function () {
            var _this = this;

            this._el.style.bottom = "-505px";
            this._el.style.display = "";

            animation(function (deep) {
                _this._el.style.bottom = (545 * cardinalFun(deep) - 505) + "px";
            }, 350, function () {
                _this._el.style.bottom = "40px";
            });

            return true;
        },
        hidden: function () {
            var _this = this;

            // 恢复滚动位置
            this._refs.application.value.scrollTop = 0;

            animation(function (deep) {
                _this._el.style.bottom = (40 - 545 * cardinalFun(deep)) + "px";
            }, 350, function () {
                _this._el.style.display = "none";
            });

            return true;
        }
    };
};
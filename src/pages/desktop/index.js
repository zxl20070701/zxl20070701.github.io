import template from './index.html';
import './index.scss';

import isString from '../../tool/type/isString';
import isFunction from '../../tool/type/isFunction';

import lazyWins from './wins/lazy-load';

var formatTimeItem = function (val) {
    if (val < 10) return "0" + val;
    return val;
};

var wins = {}, isWinOpen = {};
export default function (obj) {
    return {
        name: "desktop",
        render: template,
        data: {

            // 当前时间
            time: obj.ref(""),
            date: obj.ref(""),

            // 记录谁被选中
            select: obj.ref("")
        },
        methods: {

            // 打开应用
            goto: function (event, target) {
                this.select = "";
                this.$openView(target.getAttribute('tag'));
            },

            // 打开弹框
            openDialog: function (event, target) {
                if (isWinOpen.begin) this.toggleWin("begin");
                if (isWinOpen.tools) this.toggleWin("tools");

                this.$openDialog(target.getAttribute('tag'));
            },

            // 修改当前选中应用
            doSelect: function (event, target) {
                this.select = target.getAttribute('tag');
            },

            // 窗口控制
            toggleWin: function (event, target) {
                var _this = this, winName = isString(event) ? event : target.getAttribute('tag');

                // 如果已经加载，切换
                if (wins[winName]) {

                    if (isWinOpen[winName]) {
                        if (!isFunction(wins[winName].instance._hidden) || !wins[winName].instance._hidden()) {
                            wins[winName].el.style.display = "none";
                        }
                    } else {
                        if (!isFunction(wins[winName].instance._show) || !wins[winName].instance._show()) {
                            wins[winName].el.style.display = "";
                        }
                    }

                    isWinOpen[winName] = !isWinOpen[winName];
                }

                // 否则打开
                else {
                    this.$openWin(lazyWins[winName]).then(function (data) {
                        wins[winName] = data;
                        isWinOpen[winName] = true;

                        if (isFunction(wins[winName].instance._show) && wins[winName].instance._show()) { }

                        // 补充方法
                        data.instance.$openView = _this.$openView;
                        data.instance.openDialog = function (event, target) {
                            _this.openDialog(event, target);
                        }

                    });
                }
            },
        },
        mounted: function () {
            var _this = this, updateTime = function () {
                var curDate = new Date();

                _this.time = formatTimeItem(curDate.getHours()) + ":" + formatTimeItem(curDate.getMinutes()) + ":" + formatTimeItem(curDate.getSeconds());
                _this.date = curDate.getFullYear() + "年" + (curDate.getMonth() + 1) + "月" + curDate.getDate() + "日"
            };

            setInterval(updateTime, 1000);
            updateTime();

            document.getElementsByTagName("body")[0].addEventListener('click', function () {
                if (isWinOpen.begin) _this.toggleWin("begin");
                if (isWinOpen.tools) _this.toggleWin("tools");
            });
        }
    };
};
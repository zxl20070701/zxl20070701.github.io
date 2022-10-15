import template from './index.html';
import './index.scss';

export default function (obj) {
    return {

        // 模板
        render: template,

        // 数据
        data: {

        },

        // 挂载前
        beforeMount: function () {

        },

        // 挂载后
        mounted: function () {

        },

        // 数据改变前
        beforeUpdate: function () {

        },

        // 数据改变后
        updated: function () {

        },

        // 方法
        methods: {
            goto(event, target) {
                var el = document.createElement('a');
                el.setAttribute('target', '_blank');
                el.setAttribute('href', "#/" + target.getAttribute('tag'));
                el.click();
            }
        }

    };
};
import template from './index.html';
import './index.scss';

export default function (obj) {
    return {
        render: template,
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

        }
    };
};
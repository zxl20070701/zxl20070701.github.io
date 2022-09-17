import template from './index.html';
import './index.scss';

export default function (obj) {
    return {

        // 模板
        render: template,

        // 数据
        data: {
            searchInput: obj.ref("")
        },

        // 方法
        methods: {
            doSearch: function (event, target) {
                if (event.keyCode == 13) {
                    alert('当前内容较少，查询功能未支持！');
                    this.searchInput = "";
                }
            },
            goto(event, target) {
                var el = document.createElement('a');
                el.setAttribute('target', '_blank');
                el.setAttribute('href', "#/" + target.getAttribute('tag'));
                el.click();
            }
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
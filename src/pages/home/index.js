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
            doSearch: function (event) {
                if (event.keyCode == 13) {
                    alert('当前内容较少，查询功能未支持！');
                    this.searchInput = "";
                }
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
            console.log(this.searchInput)
        },

        // 数据改变后
        updated: function () {

        }

    };
};
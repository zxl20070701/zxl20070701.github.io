import template from './index.html';
import './index.scss';

import Excel from '../../tool/excel/index';

export default function (obj) {

    return {
        name: "excel",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "Excel" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './excel.png');
        },
        methods: {

        },
        mounted: function () {
            new Excel({
                el: this._refs.excel.value,
                content: {
                    version: "v1",
                    filename: "Excel",
                    contents: [{
                        name: "食物列表",
                        content: [
                            [
                                { colspan: 1, rowspan: 2, value: "序号", style: { "vertical-align": "middle", "text-align": "center", "color": "rgb(255, 255, 255)", "background": "rgb(238, 121, 118)" } },
                                { colspan: 1, rowspan: 2, value: "名称", style: { "vertical-align": "middle", "text-align": "center", "color": "rgb(255, 255, 255)", "background": "rgb(238, 121, 118)" } },
                                { colspan: 2, rowspan: 1, value: "分类", style: { "vertical-align": "middle", "text-align": "center", "color": "rgb(255, 255, 255)", "background": "rgb(238, 121, 118)" } },
                                { colspan: 1, rowspan: 1, value: "", style: { display: "none" } },
                                { colspan: 1, rowspan: 2, value: "价格", style: { "vertical-align": "middle", "text-align": "center", "color": "rgb(255, 255, 255)", "background": "rgb(238, 121, 118)" } },
                                { colspan: 1, rowspan: 2, value: "备注", style: { "vertical-align": "middle", "text-align": "center", "color": "rgb(255, 255, 255)", "background": "rgb(238, 121, 118)" } }
                            ],
                            [
                                { colspan: 1, rowspan: 1, value: "", style: { display: "none" } },
                                { colspan: 1, rowspan: 1, value: "", style: { display: "none" } },
                                { colspan: 1, rowspan: 1, value: "大类", style: { "vertical-align": "middle", "text-align": "center", "color": "rgb(255, 255, 255)", "background": "rgb(238, 121, 118)" } },
                                { colspan: 1, rowspan: 1, value: "小类", style: { "vertical-align": "middle", "text-align": "center", "color": "rgb(255, 255, 255)", "background": "rgb(238, 121, 118)" } },
                                { colspan: 1, rowspan: 1, value: "", style: { display: "none" } },
                                { colspan: 1, rowspan: 1, value: "", style: { display: "none" } },
                            ], [
                                { colspan: 1, rowspan: 1, value: "001" },
                                { colspan: 1, rowspan: 1, value: "苹果" },
                                { colspan: 1, rowspan: 1, value: "植物" },
                                { colspan: 1, rowspan: 1, value: "水果" },
                                { colspan: 1, rowspan: 1, value: "6.2¥/kg" },
                                { colspan: 1, rowspan: 1, value: "" }
                            ], [
                                { colspan: 1, rowspan: 1, value: "002" },
                                { colspan: 1, rowspan: 1, value: "西瓜" },
                                { colspan: 1, rowspan: 1, value: "植物" },
                                { colspan: 1, rowspan: 1, value: "水果" },
                                { colspan: 1, rowspan: 1, value: "10.4¥/kg" },
                                { colspan: 1, rowspan: 1, value: "" }
                            ], [
                                { colspan: 1, rowspan: 1, value: "003" },
                                { colspan: 1, rowspan: 1, value: "猪肉" },
                                { colspan: 1, rowspan: 1, value: "动物" },
                                { colspan: 1, rowspan: 1, value: "肉类" },
                                { colspan: 1, rowspan: 1, value: "10.5¥/kg" },
                                { colspan: 1, rowspan: 1, value: "" }
                            ], [
                                { colspan: 1, rowspan: 1, value: "004" },
                                { colspan: 1, rowspan: 1, value: "榴莲" },
                                { colspan: 1, rowspan: 1, value: "植物" },
                                { colspan: 1, rowspan: 1, value: "水果" },
                                { colspan: 1, rowspan: 1, value: "59¥/kg" },
                                { colspan: 1, rowspan: 1, value: "不好吃，多次尝试失败，难以下咽" }
                            ], [
                                { colspan: 1, rowspan: 1, value: "005" },
                                { colspan: 1, rowspan: 1, value: "西红柿" },
                                { colspan: 1, rowspan: 1, value: "植物" },
                                { colspan: 1, rowspan: 1, value: "水果&蔬菜" },
                                { colspan: 1, rowspan: 1, value: "4.7¥/kg" },
                                { colspan: 1, rowspan: 1, value: "" }
                            ], [
                                { colspan: 1, rowspan: 1, value: "006" },
                                { colspan: 1, rowspan: 1, value: "橘子" },
                                { colspan: 1, rowspan: 1, value: "植物" },
                                { colspan: 1, rowspan: 1, value: "水果" },
                                { colspan: 1, rowspan: 1, value: "5.9¥/kg" },
                                { colspan: 1, rowspan: 1, value: "yyds，非常好吃，爱了爱了" }
                            ], [], [], [], [], [], []
                        ]
                    }, {
                        name: "未命名",
                        content: [
                            [], [], [], [], [], [], [], []
                        ]
                    }]
                }

            });

        }
    };
};
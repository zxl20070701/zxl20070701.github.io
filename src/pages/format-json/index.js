import template from './index.html';
import './index.scss';

import formatJSON from '../../tool/json/index';
import editorRender from '../../tool/editor/index';

export default function (obj) {
    var sourceEditor, targetEditor;

    return {
        name: "format-json",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "格式化JSON字符串" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './format-json.png');
        },
        mounted: function () {
            sourceEditor = new editorRender({
                el: this._refs.source.value,
                shader: ['javascript']
            });

            targetEditor = new editorRender({
                el: this._refs.target.value,
                shader: ['javascript'],
                readonly: true
            });
        },
        methods: {
            formatJSON: function () {

                try {
                    targetEditor.valueOf(JSON.stringify(formatJSON(sourceEditor.valueOf()), null, 4));
                } catch (e) {
                    console.error(e);
                    alert('运行出错（' + e + '）');
                }
            }
        }
    };
};
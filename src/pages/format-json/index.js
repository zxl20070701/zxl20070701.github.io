import template from './index.html';
import './index.scss';

import formatJSON from '../../tool/json/index';
import editorRender from '../../tool/editor/index';

var sourceEditor, targetEditor;
export default function (obj) {
    return {
        render: template,
        beforeMount: function () {
            document.getElementsByTagName('title')[0].innerText = "格式化JSON字符串";
            document.getElementById('icon-logo').setAttribute('href', './format-json.png');
        },
        mounted: function () {
            sourceEditor = new editorRender({
                el: document.getElementById('source-id'),
                shader: ['javascript']
            });

            targetEditor = new editorRender({
                el: document.getElementById('target-id'),
                shader: ['javascript'],
                readonly: true
            });
        },
        methods: {
            formatJSON: function () {
                targetEditor.valueOf(JSON.stringify(formatJSON(sourceEditor.valueOf()), null, 4));
            }
        }
    };
};
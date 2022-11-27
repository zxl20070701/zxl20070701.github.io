import template from './index.html';
import './index.scss';

import scssLoader from '../../../bin/loader/scss';
import editorRender from '../../tool/editor/index';

var sourceEditor, targetEditor;
export default function (obj) {
    return {
        render: template,
        beforeMount: function () {
            document.getElementsByTagName('title')[0].innerText = "scss转css";
            document.getElementById('icon-logo').setAttribute('href', './scss.png');
        },
        mounted: function () {
            sourceEditor = new editorRender({
                el: document.getElementById('source-id'),
                shader: ['css']
            });

            targetEditor = new editorRender({
                el: document.getElementById('target-id'),
                shader: ['css'],
                readonly: true
            });
        },
        methods: {
            scssToCss: function () {
                try {
                    targetEditor.valueOf(scssLoader(sourceEditor.valueOf()));
                } catch (e) {
                    console.error(e);
                    alert('运行出错（' + e + '）');
                }
            }
        }
    };
};
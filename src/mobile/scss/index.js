import template from './index.html';
import './index.scss';

import scssLoader from '../../../bin/loader/scss';
import editorRender from '../../tool/editor/index';

export default function (obj) {
    var targetEditor;

    return {
        name: "scss",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "scss转css" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './scss.png');
        },
        mounted: function () {
            targetEditor = new editorRender({
                el: this._refs.target.value,
                shader: ['css'],
                readonly: true
            });
        },
        methods: {
            scssToCss() {
                try {
                    targetEditor.valueOf(scssLoader(this._refs.source.value.value));
                } catch (e) {
                    console.error(e);
                    alert('运行出错（' + e + '）');
                }
            }
        }
    };
};
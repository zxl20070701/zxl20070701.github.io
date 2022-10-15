import template from './index.html';
import './index.scss';

import formatJSON from '../../tool/json/index';

export default function (obj) {
    return {
        render: template,
        data: {

        },
        beforeMount: function () {
            document.getElementsByTagName('title')[0].innerText = "格式化JSON字符串";
            document.getElementById('icon-logo').setAttribute('href', './format-json.png');
        },
        methods: {
            formatJSON: function () {
                var sourceEl = document.getElementById('source-id');
                var targetEl = document.getElementById('target-id');
                targetEl.value = JSON.stringify(formatJSON(sourceEl.value), null, 4);
            }
        }
    };
};
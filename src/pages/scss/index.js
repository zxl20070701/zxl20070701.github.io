import template from './index.html';
import './index.scss';

import scssLoader from '../../../bin/loader/scss';

export default function (obj) {
    return {
        render: template,
        beforeMount: function () {
            document.getElementsByTagName('title')[0].innerText = "scss转css";
            document.getElementById('icon-logo').setAttribute('href', './scss.png');
        },
        methods: {
            scssToCss: function () {
                var sourceEl = document.getElementById('source-id');
                var targetEl = document.getElementById('target-id');
                targetEl.value = scssLoader(sourceEl.value);
            }
        }
    };
};
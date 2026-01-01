import template from './index.html';
import './index.scss';

export default function (obj, props) {
    return {
        name: "system",
        render: template,
        methods: {

            // 刷新
            doReload: function () {
                window.location.reload(true);
            }
        }
    };
};
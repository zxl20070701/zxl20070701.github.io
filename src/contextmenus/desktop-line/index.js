import template from './index.html';
import './index.scss';

export default function (obj, props) {
    return {
        name: "desktop-line",
        render: template,
        methods: {

            // 回到桌面
            goDesktop: function () {
                window._minAllView_();
            }

        }
    };
};
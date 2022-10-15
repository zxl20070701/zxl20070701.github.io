import template from './index.html';
import './index.scss';

export default function (obj, props) {
    return {
        name: "debugger",
        render: template,
        data: {

        },
        methods: {

        },
        mounted: function () {
            var index;

            // 初始化console
            for (index = 0; index < window._consoleArray_.length; index++) {
                window._consoleAppend_(window._consoleArray_[index]);
            }

        }
    }
};
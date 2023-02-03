import template from './index.html';
import './index.scss';

import copy from '../../tool/xhtml/copy';

export default function (obj, props) {

    return {
        name: "app",
        render: template,
        data: {

            // app类型
            type: props.exp || "view",

            // 发起来源
            from: props.instance._name
        },
        methods: {

            // 打开
            openApp: function () {

                // 应用
                if (this.type == 'view') {
                    props.instance.$openView(props.target.getAttribute('tag'));
                }

                // 弹框
                else if (this.type == 'dialog') {
                    props.instance.$openDialog(props.target.getAttribute('tag'));
                }
            },

            // 复制应用url
            copyURL: function () {
                if (this.type == 'view') {
                    copy(window.location.origin + "" + window.location.pathname + "#/" + props.target.getAttribute('tag'), function () {
                        alert('复制应用URL成功！');
                    }, function (e) {
                        console.error(e);
                        alert('复制应用URL失败！');
                    });
                }
            }

        }
    };
};
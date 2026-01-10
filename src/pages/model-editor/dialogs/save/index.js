import template from './index.html';
import './index.scss';

export default function (obj, props) {

    return {
        name: "save",
        render: template,
        data: {
            name: obj.ref(props.name),
        },
        methods: {

            // 确定
            doSubmit: function () {

                this.$closeDialog({
                    name: this.name
                });
            },

            // 取消
            doClose: function () {
                this.$closeDialog();
            }
        }
    };
};
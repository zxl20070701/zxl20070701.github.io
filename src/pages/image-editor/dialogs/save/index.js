import template from './index.html';
import './index.scss';

export default function (obj, props) {

    var width = props.width < 218 ? props.width : 218;
    var height = width / props.width * props.height;

    if (height > 300) {
        height = 300;
        width = 300 / props.height * props.width;
    }

    return {
        name: "save",
        render: template,
        data: {
            name: obj.ref(props.name),
            base64: obj.ref(props.painter.toDataURL()),
            height: height,
            width: width
        },
        methods: {

            // 确定
            doSubmit: function () {
                var formatEl = this._refs.format.value;

                this.$closeDialog({
                    name: this.name,
                    format: [formatEl.value, formatEl.value.replace("image\/", "")]
                });
            },

            // 取消
            doClose: function () {
                this.$closeDialog();
            }
        }
    };
};
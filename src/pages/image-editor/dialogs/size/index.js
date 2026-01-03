import template from './index.html';
import './index.scss';

export default function (obj, props) {
    return {
        name: "size",
        render: template,
        data: {
            title: props.title,
            width: props.width,
            height: props.height,

            newWidth: obj.ref(props.width),
            newHeight: obj.ref(props.height),

            changeType: obj.ref('center-middle')
        },
        methods: {

            calcHeight() {
                if (this.title == '图像大小') {
                    this.newHeight = +(this.newWidth * this.height / this.width).toFixed(0);
                }
            },

            calcWidth() {
                if (this.title == '图像大小') {
                    this.newWidth = +(this.newHeight * this.width / this.height).toFixed(0);
                }
            },

            doChangeType: function (event, target) {
                this.changeType = target.getAttribute('val');
            },

            // 确定
            doSubmit: function () {
                this.$closeDialog({
                    width: +this.newWidth,
                    height: +this.newHeight,
                    changeType: this.changeType
                });
            },

            // 取消
            doClose: function () {
                this.$closeDialog();
            }

        }
    };
};
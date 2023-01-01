import template from './index.html';
import './index.scss';

export default function (obj, props) {
    return {
        name: "tool",
        render: template,
        data: {
            active: obj.ref('move'),
            dragdropPadding: [30, 0, 0, 0]
        },
        methods: {

            // 选择工具
            changeTool: function (event) {
                this.active = event.target.getAttribute('name');
                this.callback('activeTool', this.active);
            },

            // 选择颜色
            selectColor: function (event) {
                var _this = this;

                this.$openDialog('color-picker', {
                    title: event.target.getAttribute('title'),
                    color: event.target.style.backgroundColor
                }).then(function (data) {
                    event.target.style.backgroundColor = data;
                    _this.callback(event.target.getAttribute('tag'), data);
                });

            }
        }
    };
};
import template from './index.html';
import './index.scss';

export default function (obj, props) {

    var kindName = {
        sphere: "球体",
        prism: "棱柱体",
        cylinder: "圆柱体"
    }[props.kind];

    return {
        name: "geometry",
        render: template,
        data: {
            kind: props.kind,
            kindName: kindName,
            name: props.name,
            x: props.x,
            y: props.y,
            z: props.z,
            radius: 0.2,
            x2: props.x,
            y2: props.y + 0.5,
            z2: props.z,
            count: 7
        },
        methods: {

            // 确定
            doSubmit: function () {
                this.$closeDialog({
                    name: this.name,
                    geometry: {
                        sphere: [+this.x, +this.y, +this.z, +this.radius],
                        prism: [+this.x, +this.y, +this.z, +this.radius, +this.x2, +this.y2, +this.z2, +this.count],
                        cylinder: [+this.x, +this.y, +this.z, +this.radius, +this.x2, +this.y2, +this.z2]
                    }[props.kind]
                });
            },

            // 取消
            doClose: function () {
                this.$closeDialog();
            }
        }
    };
};
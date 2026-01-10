import template from './index.html';
import './index.scss';

export default function (obj, props) {
    return {
        name: "geometry",
        render: template,
        data: {
            dragdropPadding: [0, 0, 0, 0]
        },
        methods: {
            addGeometry: function (event, target) {
                props.addGeometry(target.parentElement.getAttribute("name"), 0, 0, 0);
            }
        }
    };
};
import template from './index.html';
import './index.scss';

export default function (obj, props) {
    return {
        name: "layer",
        render: template,
        data: {
            dragdropPadding: [30, 0, 0, 0]
        }
    };
};
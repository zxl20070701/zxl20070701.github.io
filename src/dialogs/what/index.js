import template from './index.html';
import './index.scss';

export default function (obj, props) {
    return {
        name: "what",
        render: template,
        data: {
            project: window._project_
        }
    }
};
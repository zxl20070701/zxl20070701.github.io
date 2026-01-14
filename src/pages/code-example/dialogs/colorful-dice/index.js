import template from './index.html';
import "./index.scss";


export default function (obj, props) {

    return {
        name: "code-example",
        render: template,
        data: {
            srcUrl: props.srcUrl
        },
        mounted: function () {


        }

    };
};
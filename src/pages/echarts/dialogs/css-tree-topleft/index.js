import template from './index.html';
import "./index.scss";

export default function (obj, props) {

    return {
        name: "echarts-example",
        render: template,
        data: {
            srcUrl: props.srcUrl
        }
    };
};
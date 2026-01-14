import template from './index.html';
import './index.scss';

export default function (obj, props) {
    return {
        name: "drawio",
        render: template,
        data: {
            
        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "draw.io" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './drawio.png');
        },
        mounted: function () {
           
        },
        methods: {
           
        }
    };
};
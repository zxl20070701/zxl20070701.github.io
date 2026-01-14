import template from './index.html';
import './index.scss';

export default function (obj, props) {
    return {
        name: "draft",
        render: template,
        data: {
            
        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "草稿纸" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './draft.png');
        },
        mounted: function () {
           
        },
        methods: {
           
        }
    };
};
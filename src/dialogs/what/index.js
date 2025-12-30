import template from './index.html';
import './index.scss';

export default function (obj, props) {
    return {
        name: "what",
        render: template,
        data: {
            project: window._project_,
            systemBtn: window.systeNameEn == "pc" ? "切换成手机模式" : "切换成电脑模式"
        },
        methods: {
            changeSystem: function () {
                localStorage.setItem("systeNameEn", window.systeNameEn == "pc" ? "mobile" : "pc");
                window.location.reload();
            },
            resetSystem: function () {
                localStorage.removeItem("systeNameEn");
                window.location.reload();
            }
        }
    }
};
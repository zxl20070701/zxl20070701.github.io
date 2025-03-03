import template from './index.html';
import "./index.scss";


export default function (obj, props) {

    return {
        name: "code-example",
        render: template,
        data: {
            srcUrl: props.srcUrl,
            text: "嗟乎！时运不齐，命途多舛。冯唐易老，李广难封。屈贾谊于长沙，非无圣主；窜梁鸿于海曲，岂乏明时？所赖君子见机，达人知命。老当益壮，宁移白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙以犹欢。北海虽赊，扶摇可接；东隅已逝，桑榆非晚。孟尝高洁，空余报国之情；阮籍猖狂，岂效穷途之哭！"
        },
        mounted: function () {


        }

    };
};
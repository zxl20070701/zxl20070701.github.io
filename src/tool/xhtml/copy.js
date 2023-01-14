import isFunction from "../type/isFunction";
import appendTo from "./appendTo";

// 复制到剪切板
export default function (text, callback, errorback) {

    var el = appendTo(document.body, '<textarea>' + text + '</textarea>');

    // 执行复制
    el.select();
    try {
        var result = window.document.execCommand("copy", false, null);

        if (result) {
            if (isFunction(callback)) callback();
        } else {
            if (isFunction(errorback)) errorback();
        }
    } catch (e) {
        if (isFunction(errorback)) errorback(e);
    }

    document.body.removeChild(el);

};
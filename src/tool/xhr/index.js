import isFunction from '../type/isFunction';
import toString from './toString';

export default function (settings, callback, errorback) {

    var xmlhttp;

    // 如果外部定义了
    if (isFunction(settings.xhr)) {
        xmlhttp = settings.xhr();
    }

    // 否则就内部创建
    else {
        xmlhttp = new XMLHttpRequest();
    }

    // 请求完成回调
    xmlhttp.onload = function () {

        if (xmlhttp.readyState == 4) {

            callback({

                // 状态码
                status: xmlhttp.status,

                // 数据
                data: xmlhttp.responseText

            });

        }
    };

    // 请求超时回调
    xmlhttp.ontimeout = function () {
        errorback({
            status: xmlhttp.status,
            data: "请求超时了"
        });
    };

    // 请求错误回调
    xmlhttp.onerror = function () {
        errorback({
            status: xmlhttp.status,
            data: xmlhttp.responseText
        });
    };

    xmlhttp.open(settings.method, settings.url, true);

    // 设置请求头
    for (var key in settings.header) {
        xmlhttp.setRequestHeader(key, settings.header[key]);
    }

    // 设置超时时间
    xmlhttp.timeout = 'timeout' in settings ? settings.timeout : 6000;

    xmlhttp.send(toString(settings.data));

};
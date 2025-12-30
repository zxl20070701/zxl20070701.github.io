// 地址解析
function urlFormat(url) {

    var splitTemp = url.split('?');
    var routerTemp = (splitTemp[0] + "#").split("#")[1].replace(/^\//, '').replace(/\/$/, '').split('/');
    var paramTemp = splitTemp[1] || "";

    var paramResult, paramArray;
    if (paramTemp == "") {
        paramResult = {};
    } else {
        paramArray = paramTemp.split("&"), paramResult = {};
        paramArray.forEach(function (item) {
            var temp = item.split("=");
            paramResult[temp[0]] = temp[1];
        })
    }

    var resultData = {
        router: routerTemp[0] == '' ? [] : routerTemp,
        params: paramResult
    };

    if (resultData.router.length > 3) {
        var router3 = resultData.router[2], index;
        for (index = 3; index < resultData.router.length; index++) {
            router3 += "/" + resultData.router[index];
        }

        resultData.router = [resultData.router[0], resultData.router[1], router3];
    }

    return resultData;
}

// 加载新的页面

var now = new Date();
var hash = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();

function loadPage(pagename, callback) {
    var processEl = document.getElementById('process');

    if (window.needCache) {
        var storageData = sessionStorage.getItem("cache://notebook/" + pagename);
        if (storageData) {
            callback(zhcnTozhtw(storageData));
            return;
        }
    }

    var xmlhttp = new XMLHttpRequest();

    // 请求完成回调
    xmlhttp.onload = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == '404') return;

            if (window.needCache) {
                sessionStorage.setItem("cache://notebook/" + pagename, xmlhttp.responseText);
            }

            processEl.style.width = "0";
            callback(zhcnTozhtw(xmlhttp.responseText));
        }
    };

    // 请求进度
    xmlhttp.onprogress = function (event) {
        processEl.style.width = event.total == 0 ? "100%" : (((event.loaded / event.total) * 100).toFixed(2) + '%');
    }

    xmlhttp.open("GET", "./" + pagename + ".html?hash=" + hash, true);

    // 设置超时时间
    xmlhttp.timeout = 6000;

    xmlhttp.send();
}

function updateUrl() {
    window.noFresh = true;

    var paramsStr = "", key;
    for (key in urlObj.params) {
        paramsStr += key + "=" + urlObj.params[key] + "&";
    }
    window.location.href = "#/" + urlObj.router.join('/') + (paramsStr == "" ? "" : "?" + paramsStr.replace(/\&$/, ''));
}

function fixedTo(fixedId) {
    document.getElementById("fixed-id-" + fixedId).click();
}

function initFixed(docEl, fixedMenuEl) {
    var els = docEl.children;
    fixedMenuEl.innerHTML = "<h1>导航</h1>";
    for (index = 0; index < els.length; index++) {
        (function (index) {

            if (["H2", "H3", "H4"].indexOf(els[index].nodeName) > -1) {
                var fixedItemEl = document.createElement(els[index].nodeName);

                var fixedId = els[index].getAttribute("fixed");
                if (fixedId) {
                    fixedItemEl.setAttribute("id", "fixed-id-" + fixedId);
                }

                fixedMenuEl.appendChild(fixedItemEl);
                fixedItemEl.innerHTML = els[index].innerHTML;
                fixedItemEl.addEventListener('click', function () {
                    docEl.scrollTop = els[index].offsetTop;
                });

            }
        })(index);
    }
}
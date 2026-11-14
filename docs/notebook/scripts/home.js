// 记录当前地址栏信息
var urlObj = urlFormat(window.location.href);

// 关闭随手记
function closePageview() {
    urlObj.router = [];
    updateUrl();

    document.getElementById("pageview-content-id").style.display = "none";
    document.getElementById("pageview-content-view-id").innerHTML = "";
}

function initMenu() {
    var menusEl = document.getElementsByName("dialog-btn");

    var contentEl = document.getElementById("pageview-content-id");
    var viewEl = document.getElementById("pageview-content-view-id");

    // 旧的悬浮关闭按钮不再使用，关闭入口统一放在报头右端
    var legacyCloseEl = document.getElementById("pageview-content-close-id");
    if (legacyCloseEl) {
        legacyCloseEl.style.display = "none";
    }

    var routerTag = Array.isArray(urlObj.router) ? urlObj.router.join("/") : "";
    for (var i = 0; i < menusEl.length; i++) {

        (function (menuEl) {
            menuEl.addEventListener("click", function () {
                loadPage("journals/" + menuEl.getAttribute("tag"), function (data) {
                    contentEl.style.display = "block";

                    // 设置内容
                    viewEl.innerHTML = data;

                    // 报头：品牌 / 栏目 / 期号 / 关闭
                    var masthead = document.createElement("div");
                    masthead.setAttribute("class", "pv-masthead");
                    masthead.innerHTML = '<span class="pv-brand">z Z ...</span>' +
                        '<span class="pv-title">随手记</span>' +
                        '<span class="pv-issue">PERSONAL NOTES · NO.01</span>';

                    var closeBtn = document.createElement("span");
                    closeBtn.setAttribute("class", "pv-close");
                    closeBtn.innerHTML = "关闭";
                    closeBtn.addEventListener("click", closePageview);
                    masthead.appendChild(closeBtn);

                    var rule = document.createElement("div");
                    rule.setAttribute("class", "pv-rule");

                    // 正文分栏容器
                    var body = document.createElement("div");
                    body.setAttribute("class", "pv-body");
                    while (viewEl.firstChild) {
                        body.appendChild(viewEl.firstChild);
                    }

                    viewEl.appendChild(masthead);
                    viewEl.appendChild(rule);
                    viewEl.appendChild(body);

                    doShader(viewEl);
                    doFormula(viewEl);

                    urlObj.router = menuEl.getAttribute("tag").split("/");
                    updateUrl();
                });
            });

            if (routerTag == menuEl.getAttribute("tag")) {
                menuEl.click();
            }
        })(menusEl[i]);
    }
}

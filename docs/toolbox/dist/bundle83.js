
/*************************** [bundle] ****************************/
// Original file:./src/pages/code-example/dialogs/sphere-rotate/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['330']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('448');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('449');


__pkg__scope_args__=window.__pkg__getBundle('450');
var createSphereVertices =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('315');
var xhr =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj, props) {

    return {
        name: "code-example",
        render: template,
        data: {
            srcUrl: props.srcUrl
        },
        mounted: function () {
            var _this = this;

            xhr({
                method: "GET",
                url: "../data/animation.json"
            }, function (res) {
                if (res.status == 200) {
                    var data = JSON.parse(res.data);
                    _this.initSphere(data);
                }
            });

        },
        methods: {
            initSphere: function (names) {
                var stage = this._refs.mycontent.value.querySelector('.globe-stage');
                var radius = 200;
                var points = createSphereVertices(names.length, radius);

                // 创建卡片元素并定位到球面上
                names.forEach(function (name, i) {
                    var card = document.createElement('div');
                    card.className = 'card';
                    card.textContent = name;
                    var p = points[i];
                    card.style.transform = 'translate3d(' + p.x + 'px,' + p.y + 'px,' + p.z + 'px) rotateY(' + p.rotationY + 'deg) rotateX(' + p.rotationX + 'deg)';
                    card.style.marginLeft = '-50px';
                    card.style.marginTop = '-14px';
                    card.style.width = 'fit-content';
                    stage.appendChild(card);
                });

                // 使用 requestAnimationFrame 实现持续旋转
                var angleX = 0;
                var angleY = 0;

                function animate() {
                    angleY += 0.3;
                    // angleX += 0.1;
                    stage.style.transform = 'rotateX(' + angleX + 'deg) rotateY(' + angleY + 'deg)';
                    requestAnimationFrame(animate);
                }

                animate();
            }
        }

    };
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/code-example/dialogs/sphere-rotate/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['448']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,8]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,5]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"tag","name":"a","attrs":{"ui-bind:href":"srcUrl","target":"_blank"},"childNodes":[4]},{"type":"text","content":"动态生成的拼接球体","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[6]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeDialog"},"childNodes":[7]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content sphere-rotate","ref":"mycontent"},"childNodes":[9]},{"type":"tag","name":"div","attrs":{"class":"globe-wrapper"},"childNodes":[10]},{"type":"tag","name":"div","attrs":{"class":"globe-stage"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/code-example/dialogs/sphere-rotate/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['449']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view=\"code-example\"]{\n\nheight: 600px;\n\nwidth: 600px;\n\ntop: calc(50vh - 300px);\n\nleft: calc(50vw - 300px);\n\n}\n\n [dialog-view=\"code-example\"]>div.sphere-rotate{\n\nwidth: 100%;\n\nheight: calc(100% - 51px);\n\ndisplay: flex;\n\nalign-items: center;\n\njustify-content: center;\n\nperspective: 800px;\n\n}\n\n [dialog-view=\"code-example\"]>div.sphere-rotate>.globe-wrapper{\n\ntransform-style: preserve-3d;\n\n}\n\n [dialog-view=\"code-example\"]>div.sphere-rotate>.globe-wrapper>.globe-stage{\n\nposition: relative;\n\nwidth: 0;\n\nheight: 0;\n\ntransform-style: preserve-3d;\n\n}\n\n [dialog-view=\"code-example\"]>div.sphere-rotate>.globe-wrapper>.globe-stage>.card{\n\nposition: absolute;\n\npadding: 4px 10px;\n\nbackground: rgba(83, 52, 131, 0.85);\n\ncolor: #fff;\n\nfont-size: 12px;\n\nborder-radius: 4px;\n\nwhite-space: nowrap;\n\nbackface-visibility: hidden;\n\ntext-align: center;\n\nborder: 1px solid rgba(255, 255, 255, 0.15);\n\nbox-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/cardSphere/createSphereVertices
/*****************************************************************/
window.__pkg__bundleSrc__['450']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (count, sphereRadius) {
    const points = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2; // 黄金比例 ≈ 1.618

    for (let i = 0; i < count; i++) {
        // phi: 极角（从-z轴方向测量），通过余弦分布避免极点聚集
        const phi = Math.acos(-1 + (2 * i + 1) / count);
        // theta: 方位角，使用黄金比例确保均匀分布
        const theta = 2 * Math.PI * i / goldenRatio;

        // 将球坐标转换为笛卡尔坐标（x, y, z）
        const x = sphereRadius * Math.cos(theta) * Math.sin(phi);
        const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
        const z = sphereRadius * Math.cos(phi);

        // 计算卡片朝向角度，使卡片始终面向球心
        const rotationY = Math.atan2(x, z) * 180 / Math.PI;
        const rotationX = -Math.asin(y / sphereRadius) * 180 / Math.PI;

        points.push({
            x: x,
            y: y,
            z: z,
            rotationX: rotationX,
            rotationY: rotationY,
            index: i
        });
    }
    return points;
}

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhr/index
/*****************************************************************/
window.__pkg__bundleSrc__['315']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('32');
var isFunction =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('316');
var toString =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (settings, callback, errorback) {

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

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhr/toString
/*****************************************************************/
window.__pkg__bundleSrc__['316']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('61');
var isPlainObject =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('31');
var isString =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (data) {

    // 如果是字符串
    if (isString(data)) {
        return data;
    }

    // 如果是JSON数据
    else if (isPlainObject(data)) {
        return JSON.stringify(data);
    }

    // 如果为空
    else if (data === undefined) {
        return "";
    }

    // 否则
    else {
        return data;
    }

};


    return __pkg__scope_bundle__;
}

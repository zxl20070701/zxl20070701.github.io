
/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['37']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('134');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('135');


__pkg__scope_args__=window.__pkg__getBundle('136');
var doResize =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('137');
var webglRender =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('143');
var Matrix4 =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('148');
var viewHandler =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('149');
var mainView=__pkg__scope_args__.mainView;
var directiveView=__pkg__scope_args__.directiveView;


// 着色器
__pkg__scope_args__=window.__pkg__getBundle('150');
var vertexShader =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('151');
var fragmentShader =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj) {

    // 记录着当前的模型数据
    var modelValue = mainView();

    var doDraw, stopDoResize;

    var isFocus = false;

    return {
        name: "model-editor",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "3D模型编辑器" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './model-editor.png');
        },
        data: {
            width: obj.ref(0),
            height: obj.ref(0)
        },
        mounted: function () {

            // 启动画布监听
            var _this = this;
            var el = this._refs.mainViewRoot.value;

            // 绘制刻度尺的方法
            var drawAxis = this.renderAxisView();

            stopDoResize = doResize(el, function () {
                _this.width = el.clientWidth;
                _this.height = el.clientHeight;

                setTimeout(function () {
                    _this.updateView(drawAxis);
                });

            });
        },
        beforeDestory: function () {

            // 取消对画布大小改变的监听
            if (stopDoResize) stopDoResize();

        },

        beforeUnfocus: function () {
            isFocus = false;
        },

        focused: function () {
            isFocus = true;
        },

        methods: {

            triggleFile: function () {
                this._refs.file.value.click();
            },

            // 导入本地文件
            inputLocalFile: function (event) {
                alert('未完成');
            },

            // 导出
            exportFile: function () {
                alert('未完成');
            },

            //  新建
            resetEditor: function () {
                alert('未完成');
            },

            // 根据模型数据进行绘制
            updateView: function (drawAxis) {

                //  当前缩放率
                var rateScale = 1.4;

                // 创建3d对象
                var webgl = webglRender(this._refs.mainView.value);
                webgl.updateScale(rateScale);

                // 启用着色器
                webgl.shader(vertexShader, fragmentShader);

                // 初始化缓冲区
                var buffer = webgl.buffer();

                // 获取画笔并开启深度计算
                var painter = webgl.painter().openDeep();

                // 控制矩阵
                var matrix = Matrix4().multiply([
                    1 / 5, 0, 0, 0,
                    0, 1 / 5, 0, 0,
                    0, 0, -1 / 5, 0,
                    0, 0, 0, 1
                ]).rotate(-0.4, 1, 0, 0);

                // 为了控制不变形而提前计算的比例参数
                var proportion = webgl._gl_.canvas.clientWidth / webgl._gl_.canvas.clientHeight;
                var xProportion = 1, yProportion = 1;
                if (proportion > 1) yProportion = proportion; else xProportion = 1 / proportion;
                var zProportion = Math.min(xProportion, yProportion);

                //  定义绘制方法
                doDraw = function () {
                    drawAxis(matrix);

                    // 设置好矩阵
                    webgl.setUniformMatrix4fv('u_matrix', Matrix4(matrix.value()).multiply([
                        xProportion, 0, 0, 0,
                        0, yProportion, 0, 0,
                        0, 0, zProportion, 0,
                        0, 0, 0, 1
                    ]).value());

                    // 一个个绘制
                    for (var index = 0; index < modelValue.length; index++) {
                        var itemValue = modelValue[index].value;

                        // 内置默认类型
                        if (modelValue[index].type == 'default') {

                            // 设置颜色
                            webgl.setUniform4f('u_color', itemValue.color[0], itemValue.color[1], itemValue.color[2], itemValue.color[3]);

                            // 缓冲区写入数据并分配
                            buffer.write(new Float32Array(itemValue.points)).use('a_position', 3, 3, 0);

                            // 绘制
                            // 先不考虑索引画笔的情况，后续需要再扩展
                            painter[itemValue.method](0, itemValue.points.length / 3);

                        }

                        // 未知类型
                        else {
                            alert('未知数据类型：' + modelValue[index].type);
                        }

                    }
                };

                // 每次调整的幅度
                var deg = 0.1;
                viewHandler(function (data) {
                    if (!isFocus) return;

                    /*
                     * 修改相机
                     */

                    // 键盘控制
                    if (data.type == 'lookUp') {
                        matrix.rotate(deg, 1, 0, 0);
                    } else if (data.type == 'lookDown') {
                        matrix.rotate(deg, -1, 0, 0);
                    } else if (data.type == 'lookLeft') {
                        matrix.rotate(deg, 0, 1, 0);
                    } else if (data.type == 'lookRight') {
                        matrix.rotate(deg, 0, -1, 0);
                    }

                    // 鼠标拖动或手指控制
                    else if (data.type == 'rotate') {
                        matrix.rotate(deg * data.dist * 0.07, data.normal[0], data.normal[1], data.normal[2]);
                    }

                    // 滚轮控制
                    else if (data.type == 'scale') {
                        var baseTimes = 0.98;
                        var times = data.kind == 'enlarge' ? 2 - baseTimes : baseTimes;
                        rateScale *= times;
                        webgl.updateScale(rateScale);
                    }

                    doDraw();
                });

                doDraw();
            },

            // 绘制刻度尺图标
            renderAxisView: function () {
                var webgl = webglRender(this._refs.directiveView.value);
                webgl.shader(vertexShader, fragmentShader);
                var buffer = webgl.buffer();
                var painter = webgl.painter().openDeep();

                var axisValue = directiveView();

                // 返回绘制方法由主流程控制
                return function (matrix) {
                    setTimeout(function () {
                        webgl.setUniformMatrix4fv('u_matrix', matrix.value());
                        for (var index = 0; index < axisValue.length; index++) {
                            var itemValue = axisValue[index];

                            webgl.setUniform4f('u_color', itemValue.color[0], itemValue.color[1], itemValue.color[2], itemValue.color[3]);
                            buffer.write(new Float32Array(itemValue.points)).use('a_position', 3, 3, 0);
                            painter[itemValue.method](0, itemValue.length);

                        }
                    });
                };
            }
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['134']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,19,21,23]},{"type":"tag","name":"div","attrs":{"class":"menu","ui-dragdrop:desktop":""},"childNodes":[2,4,6,12,14]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"3D模型编辑器","childNodes":[]},{"type":"tag","name":"span","attrs":{"ui-on:click":"resetEditor"},"childNodes":[5]},{"type":"text","content":"新建","childNodes":[]},{"type":"tag","name":"span","attrs":{"class":"more"},"childNodes":[7,8]},{"type":"text","content":"导入","childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[9]},{"type":"tag","name":"span","attrs":{},"childNodes":[10]},{"type":"tag","name":"label","attrs":{"ui-on:click":"triggleFile"},"childNodes":[11]},{"type":"text","content":"本地选择","childNodes":[]},{"type":"tag","name":"span","attrs":{"ui-on:click":"exportFile"},"childNodes":[13]},{"type":"text","content":"导出","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[15,17]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[16]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[18]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content","ref":"mainViewRoot"},"childNodes":[20]},{"type":"tag","name":"canvas","attrs":{"ui-bind:width":"width","ui-bind:height":"height","ref":"mainView"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"axis"},"childNodes":[22]},{"type":"tag","name":"canvas","attrs":{"width":"100","height":"100","ref":"directiveView"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"no-view"},"childNodes":[24]},{"type":"tag","name":"input","attrs":{"type":"file","ref":"file","multiple":"","ui-on:change":"inputLocalFile","accept":".json,.stl,.obj,.fbx,.mtl,.ply,.gltf,.mod"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['135']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"model-editor\"]{\n\nwidth: calc(100vw - 160px);\n\nheight: calc(100vh - 55px);\n\nleft: 80px;\n\ntop: 10px;\n\n}\n\n [page-view=\"model-editor\"] .no-view{\n\ndisplay: none;\n\n}\n\n [page-view=\"model-editor\"][focus=\"no\"]>div.menu{\n\nbackground-color: #afbabe;\n\n}\n\n [page-view=\"model-editor\"]>div.menu{\n\nbackground-color: #cad6db;\n\nborder-bottom: 1px solid #cccccc;\n\nheight: 30px;\n\nheight: 30px;\n\nline-height: 30px;\n\n}\n\n [page-view=\"model-editor\"]>div.menu>h2{\n\nbackground-image: url('./model-editor.png');\n\npadding-left: 30px;\n\npadding-right: 10px;\n\ndisplay: inline-block;\n\nvertical-align: top;\n\nbackground-size: auto 70%;\n\nbackground-repeat: no-repeat;\n\nbackground-position: 5px center;\n\nfont-size: 12px;\n\ncolor: rgb(0, 0, 0);\n\nfont-weight: 800;\n\nborder-right: 1px solid #cccccc;\n\n}\n\n [page-view=\"model-editor\"]>div.menu>span{\n\nmargin-left: 20px;\n\ndisplay: inline-block;\n\nvertical-align: top;\n\nfont-size: 12px;\n\ncursor: pointer;\n\nwhite-space: nowrap;\n\n}\n\n [page-view=\"model-editor\"]>div.menu>span:hover{\n\ntext-decoration: underline;\n\nfont-weight: 800;\n\n}\n\n [page-view=\"model-editor\"]>div.menu>span.more{\n\nposition: relative;\n\npadding-right: 10px;\n\n}\n\n [page-view=\"model-editor\"]>div.menu>span.more:hover>div{\n\ndisplay: block;\n\n}\n\n [page-view=\"model-editor\"]>div.menu>span.more::after{\n\nposition: absolute;\n\ntop: 13px;\n\nright: -3px;\n\nwidth: 0;\n\nheight: 0;\n\nborder-left: 4px solid transparent;\n\nborder-right: 4px solid transparent;\n\nborder-top: 5px solid #4f5959;\n\ncontent: \" \";\n\n}\n\n [page-view=\"model-editor\"]>div.menu>span.more>div{\n\nposition: absolute;\n\nbackground-color: white;\n\nbox-shadow: 0 0 7px 0px #cccccc;\n\npadding: 5px 0;\n\nline-height: 1.8em;\n\ndisplay: none;\n\n}\n\n [page-view=\"model-editor\"]>div.menu>span.more>div>span{\n\ndisplay: block;\n\npadding: 0 10px;\n\nfont-weight: 400;\n\ncursor: pointer;\n\n}\n\n [page-view=\"model-editor\"]>div.menu>span.more>div>span>label{\n\ncursor: pointer;\n\n}\n\n [page-view=\"model-editor\"]>div.menu>span.more>div>span:hover{\n\ntext-decoration: underline;\n\n}\n\n [page-view=\"model-editor\"]>div.menu>span.more>div>span:not(:last-child){\n\nborder-bottom: 1px solid #cccccc;\n\n}\n\n [page-view=\"model-editor\"]>div.content{\n\nwidth: 100%;\n\nheight: calc(100% - 30px);\n\noverflow: hidden;\n\ntext-align: center;\n\nbackground-color: #9fa2a3;\n\n}\n\n [page-view=\"model-editor\"]>div.axis{\n\nposition: absolute;\n\nright: 30px;\n\nbottom: 30px;\n\npointer-events: none;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/ResizeObserver
/*****************************************************************/
window.__pkg__bundleSrc__['136']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var _support_ = true;

__pkg__scope_bundle__.default= function (el, doback) {

    var observer = null;
    var _hadWilldo_ = false;
    var _hadNouse_ = false;

    var doit = function () {

        // 如果前置任务都完成了
        if (!_hadWilldo_) {
            _hadWilldo_ = true;

            // 既然前置任务已经没有了，那么就可以更新了？
            // 不是的，可能非常短的时间里，后续有改变
            // 因此延迟一点点来看看后续有没有改变
            // 如果改变了，就再延迟看看
            var interval = window.setInterval(function () {

                // 判断当前是否可以立刻更新
                if (!_hadNouse_) {
                    window.clearInterval(interval);

                    _hadWilldo_ = false;
                    doback();

                }

                _hadNouse_ = false;
            }, 100);

        } else {
            _hadNouse_ = true;
        }
    }

    try {


        observer = new ResizeObserver(doit);
        observer.observe(el);

    } catch (e) {

        // 如果浏览器不支持此接口

        if (_support_) {
            console.error('ResizeObserver undefined!');

            // 不支持的话，提示一次就可以了
            _support_ = false;
        }

        // 使用resize进行退化支持
        doit();
        window.addEventListener('resize', doit, false);

    }

    return function () {
        if (observer) {

            // 解除对画布大小改变的监听
            observer.disconnect();

        } else {
            window.removeEventListener('resize', doit);
        }
    };

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/webgl/index
/*****************************************************************/
window.__pkg__bundleSrc__['137']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('138');
var useShader=__pkg__scope_args__.useShader;

__pkg__scope_args__=window.__pkg__getBundle('139');
var newBuffer=__pkg__scope_args__.newBuffer;
var writeBuffer=__pkg__scope_args__.writeBuffer;
var useBuffer=__pkg__scope_args__.useBuffer;

__pkg__scope_args__=window.__pkg__getBundle('140');
var initTexture=__pkg__scope_args__.initTexture;
var linkImage=__pkg__scope_args__.linkImage;
var linkCube=__pkg__scope_args__.linkCube;

__pkg__scope_args__=window.__pkg__getBundle('141');
var value =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('142');
var painter =__pkg__scope_args__.default;


// 获取webgl上下文
var getCanvasWebgl = function (node, opts) {
    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"],
        context = null, i;
    for (i = 0; i < names.length; i++) {
        try {
            context = node.getContext(names[i], opts);
        } catch (e) { }
        if (context) break;
    }
    if (!context) throw new Error('Non canvas or browser does not support webgl.');
    return context;
}

// 绘图核心对象
__pkg__scope_bundle__.default= function (node, opts) {
    var gl = getCanvasWebgl(node, opts),
        glObj = {

            "_gl_": gl,

            // 画笔
            "painter": function () {
                return painter(gl);
            },

            // 启用着色器
            "shader": function (vshaderSource, fshaderSource) {
                gl.program = useShader(gl, vshaderSource, fshaderSource);
                return glObj;
            },

            // 缓冲区
            "buffer": function (isElement) {
                // 创建缓冲区
                newBuffer(gl, isElement);
                var bufferData,
                    bufferObj = {
                        // 写入数据
                        "write": function (data, usage) {
                            usage = usage || gl.STATIC_DRAW;
                            writeBuffer(gl, data, usage, isElement);
                            bufferData = data;
                            return bufferObj;
                        },
                        // 分配使用
                        "use": function (location, size, stride, offset, type, normalized) {
                            var fsize = bufferData.BYTES_PER_ELEMENT;
                            if (typeof location == 'string') location = gl.getAttribLocation(gl.program, location);
                            stride = stride || 0;
                            offset = offset || 0;
                            type = type || gl.FLOAT;
                            useBuffer(gl, location, size, type, stride * fsize, offset * fsize, normalized);
                            return bufferObj;
                        }
                    };
                return bufferObj;
            },

            // 纹理
            "texture": function (_type_, unit) {
                var type = {
                    "2d": gl.TEXTURE_2D,/*二维纹理*/
                    "cube": gl.TEXTURE_CUBE_MAP/*立方体纹理*/
                }[_type_];

                // 创建纹理
                var texture = initTexture(gl, type, unit, _type_);

                // 配置纹理（默认配置）
                gl.texParameteri(type, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(type, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(type, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                var textureObj = {
                    // 链接图片资源
                    "useImage": function (image, level, format, textureType) {
                        linkImage(gl, type, level, format, textureType, image);
                        return textureObj;
                    },
                    // 链接多张图片
                    "useCube": function (images, width, height, level, format, textureType) {
                        linkCube(gl, type, level, format, textureType, images, width, height, texture);
                        return textureObj;
                    }
                };
                return textureObj;
            },

            // 视图窗口缩放设置
            "updateScale": function (value) {

                var viewWidth = gl.canvas.width * value;
                var viewHeight = gl.canvas.height * value;

                var elWidth = gl.canvas.width;
                var elHeight = gl.canvas.height;

                gl.viewport((elWidth - viewWidth) * 0.5, (elHeight - viewHeight) * 0.5, viewWidth, viewHeight);

                return glObj;
            }

        };

    // attribue和uniform数据设置
    var valueMethods = value(gl);
    for (var key in valueMethods) {
        glObj[key] = valueMethods[key];
    }

    /**
     * gl.viewport告诉WebGL如何将裁剪空间（-1 到 +1）中的点转换到像素空间
     * 当你第一次创建WebGL上下文的时候WebGL会设置视域大小和画布大小匹配
     * 但是在那之后就需要你自己设置（当你改变画布大小就需要告诉WebGL新的视域设置）
     * 为了避免麻烦，我们每次都主动调用一下
     */
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/depthFunc
    gl.depthFunc(gl.LEQUAL);

    return glObj;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/webgl/shader
/*****************************************************************/
window.__pkg__bundleSrc__['138']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    /**
 * 着色器一些公共的方法
 * --------------------------------------------
 * 主要是和生成特定着色器无关的方法
 * 着色器分为两类：顶点着色器 + 片段着色器
 * 前者用于定义一个点的特性，比如位置，大小，颜色等
 * 后者用于针对每个片段（可以理解为像素）进行处理
 *
 * 着色器采用的语言是：GLSL ES语言
 */

// 把着色器字符串加载成着色器对象
var _loadShader = function (gl, type, source) {
    // 创建着色器对象
    var shader = gl.createShader(type);
    if (shader == null) throw new Error('Unable to create shader!');
    // 绑定资源
    gl.shaderSource(shader, source);
    // 编译着色器
    gl.compileShader(shader);
    // 检测着色器编译是否成功
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error('Failed to compile shader:' + gl.getShaderInfoLog(shader));
    return shader;
};

// 初始化着色器
var _useShader = function (gl, vshaderSource, fshaderSource) {
    // 分别加载顶点着色器对象和片段着色器对象
    var vertexShader = _loadShader(gl, gl.VERTEX_SHADER, vshaderSource),
        fragmentShader = _loadShader(gl, gl.FRAGMENT_SHADER, fshaderSource);
    // 创建一个着色器程序
    var glProgram = gl.createProgram();
    // 把前面创建的两个着色器对象添加到着色器程序中
    gl.attachShader(glProgram, vertexShader);
    gl.attachShader(glProgram, fragmentShader);
    // 把着色器程序链接成一个完整的程序
    gl.linkProgram(glProgram);
    // 检测着色器程序链接是否成功
    if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS))
        throw new Error('Failed to link program: ' + gl.getProgramInfoLog(glProgram));
    // 使用这个完整的程序
    gl.useProgram(glProgram);
    return glProgram;
};

__pkg__scope_bundle__.loadShader = _loadShader;
__pkg__scope_bundle__.useShader = _useShader;

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/webgl/buffer
/*****************************************************************/
window.__pkg__bundleSrc__['139']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    /**
 * 缓冲区核心方法
 * --------------------------------------------
 * 缓冲区分为两种：
 *  1.缓冲区中保存了包含顶点的数据
 *  2.缓冲区保存了包含顶点的索引值
 *
 */

// 获取一个新的缓冲区
// isElement默认false，创建第一种缓冲区，为true创建第二种
__pkg__scope_bundle__.newBuffer = function (gl, isElement) {
    var buffer = gl.createBuffer(),
        TYPE = isElement ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
    // 把缓冲区对象绑定到目标
    gl.bindBuffer(TYPE, buffer);
    return buffer;
};

// 数据写入缓冲区
// data是一个类型化数组，表示写入的数据
// usage表示程序如何使用存储在缓冲区的数据
__pkg__scope_bundle__.writeBuffer = function (gl, data, usage, isElement) {
    var TYPE = isElement ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
    gl.bufferData(TYPE, data, usage);
};

// 使用缓冲区数据
// location指定待分配的attribute变量的存储位置
// size每个分量个数
// type数据类型，应该是以下的某个：
//      gl.UNSIGNED_BYTE    Uint8Array
//      gl.SHORT            Int16Array
//      gl.UNSIGNED_SHORT   Uint16Array
//      gl.INT              Int32Array
//      gl.UNSIGNED_INT     Uint32Array
//      gl.FLOAT            Float32Array
// stride相邻两个数据项的字节数
// offset数据的起点字节位置
// normalized是否把非浮点型的数据归一化到[0,1]或[-1,1]区间
__pkg__scope_bundle__.useBuffer = function (gl, location, size, type, stride, offset, normalized) {
    // 把缓冲区对象分配给目标变量
    gl.vertexAttribPointer(location, size, type, normalized || false, stride || 0, offset || 0);
    // 连接目标对象和缓冲区对象
    gl.enableVertexAttribArray(location);
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/webgl/texture
/*****************************************************************/
window.__pkg__bundleSrc__['140']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    /**
 * 纹理方法
 * --------------------------------------------
 * 在绘制的多边形上贴图
 * 丰富效果
 */

// 初始化一个纹理对象
// type有gl.TEXTURE_2D代表二维纹理，gl.TEXTURE_CUBE_MAP 立方体纹理等
__pkg__scope_bundle__.initTexture = function (gl, type, unit, _type_) {
    // 创建纹理对象
    var texture = gl.createTexture();

    if (_type_ == '2d') {
        unit = unit || 0;
        // 开启纹理单元，unit表示开启的编号
        gl.activeTexture(gl['TEXTURE' + unit]);
    }

    // 绑定纹理对象到目标上
    gl.bindTexture(type, texture);
    return texture;
};

// 链接资源图片
// level默认传入0即可，和金字塔纹理有关
// format表示图像的内部格式：
//      gl.RGB(红绿蓝)
//      gl.RGBA(红绿蓝透明度)
//      gl.ALPHA(0.0,0.0,0.0,透明度)
//      gl.LUMINANCE(L、L、L、1L:流明)
//      gl.LUMINANCE_ALPHA(L、L、L,透明度)
// textureType表示纹理数据的格式：
//      gl.UNSIGNED_BYTE: 表示无符号整形，每一个颜色分量占据1字节
//      gl.UNSIGNED_SHORT_5_6_5: 表示RGB，每一个分量分别占据占据5, 6, 5比特
//      gl.UNSIGNED_SHORT_4_4_4_4: 表示RGBA，每一个分量分别占据占据4, 4, 4, 4比特
//      gl.UNSIGNED_SHORT_5_5_5_1: 表示RGBA，每一个分量分别占据占据5比特，A分量占据1比特
__pkg__scope_bundle__.linkImage = function (gl, type, level, format, textureType, image) {
    format = {
        "rgb": gl.RGB,
        "rgba": gl.RGBA,
        "alpha": gl.ALPHA
    }[format] || gl.RGBA;

    gl.texImage2D(type, level || 0, format, format, {

        // 目前一律采用默认值，先不对外提供修改权限

    }[textureType] || gl.UNSIGNED_BYTE, image);
};

__pkg__scope_bundle__.linkCube = function (gl, type, level, format, textureType, images, width, height, texture) {
    format = {
        "rgb": gl.RGB,
        "rgba": gl.RGBA,
        "alpha": gl.ALPHA
    }[format] || gl.RGBA;

    level = level || 0;

    textureType = {

        // 目前一律采用默认值，先不对外提供修改权限

    }[textureType] || gl.UNSIGNED_BYTE;

    var types = [
        gl.TEXTURE_CUBE_MAP_POSITIVE_X,//右
        gl.TEXTURE_CUBE_MAP_NEGATIVE_X,//左
        gl.TEXTURE_CUBE_MAP_POSITIVE_Y,//上
        gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,//下
        gl.TEXTURE_CUBE_MAP_POSITIVE_Z,//后
        gl.TEXTURE_CUBE_MAP_NEGATIVE_Z//前
    ], i, target;

    for (i = 0; i < types.length; i++) {
        target = types[i];
        gl.texImage2D(target, level, format, width, height, 0, format, textureType, null);
        gl.bindTexture(type, texture);
        gl.texImage2D(target, level, format, format, textureType, images[i]);
    }

    gl.generateMipmap(type);

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/webgl/value
/*****************************************************************/
window.__pkg__bundleSrc__['141']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (gl) {
    return {

        /**
         * attribue
         * ----------------------------------------
         */

        // 浮点数
        setAttribute1f: function (name, v0) {
            // 获取存储位置
            var location = gl.getAttribLocation(gl.program, name);
            // 传递数据给变量
            gl.vertexAttrib1f(location, v0);
        },
        setAttribute2f: function (name, v0, v1) {
            var location = gl.getAttribLocation(gl.program, name);
            gl.vertexAttrib2f(location, v0, v1);
        },
        setAttribute3f: function (name, v0, v1, v2) {
            var location = gl.getAttribLocation(gl.program, name);
            gl.vertexAttrib3f(location, v0, v1, v2);
        },
        setAttribute4f: function (name, v0, v1, v2, v3) {
            var location = gl.getAttribLocation(gl.program, name);
            gl.vertexAttrib4f(location, v0, v1, v2, v3);
        },

        // 整数
        setAttribute1i: function (name, v0) {
            // 获取存储位置
            var location = gl.getAttribLocation(gl.program, name);
            // 传递数据给变量
            gl.vertexAttrib1i(location, v0);
        },
        setAttribute2i: function (name, v0, v1) {
            var location = gl.getAttribLocation(gl.program, name);
            gl.vertexAttrib2i(location, v0, v1);
        },
        setAttribute3i: function (name, v0, v1, v2) {
            var location = gl.getAttribLocation(gl.program, name);
            gl.vertexAttrib3i(location, v0, v1, v2);
        },
        setAttribute4i: function (name, v0, v1, v2, v3) {
            var location = gl.getAttribLocation(gl.program, name);
            gl.vertexAttrib4i(location, v0, v1, v2, v3);
        },

        /**
        * uniform
        * ----------------------------------------
        */

        // 浮点数
        setUniform1f: function (name, v0) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniform1f(location, v0);
        },
        setUniform2f: function (name, v0, v1) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniform2f(location, v0, v1);
        },
        setUniform3f: function (name, v0, v1, v2) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniform3f(location, v0, v1, v2);
        },
        setUniform4f: function (name, v0, v1, v2, v3) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniform4f(location, v0, v1, v2, v3);
        },

        // 整数
        setUniform1i: function (name, v0) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniform1i(location, v0);
        },
        setUniform2i: function (name, v0, v1) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniform2i(location, v0, v1);
        },
        setUniform3i: function (name, v0, v1, v2) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniform3i(location, v0, v1, v2);
        },
        setUniform4i: function (name, v0, v1, v2, v3) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniform4i(location, v0, v1, v2, v3);
        },

        // 矩阵
        setUniformMatrix2fv: function (name, value) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniformMatrix2fv(location, false, value);
        },
        setUniformMatrix3fv: function (name, value) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniformMatrix3fv(location, false, value);
        },
        setUniformMatrix4fv: function (name, value) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniformMatrix4fv(location, false, value);
        },
    };
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/webgl/painter
/*****************************************************************/
window.__pkg__bundleSrc__['142']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (gl) {

    var typeMap = {
        "byte": gl.UNSIGNED_BYTE,
        "short": gl.UNSIGNED_SHORT
    };

    return {

        // 开启深度计算
        openDeep:function() {
            gl.enable(gl.DEPTH_TEST);
            return this;
        },

        // 绘制点
        points:function(first, count, type) {
            if (type) {
                gl.drawElements(gl.POINTS, count, typeMap[type], first);
            } else {
                gl.drawArrays(gl.POINTS, first, count);
            }
            return this;
        },

        // 绘制直线
        lines:function(first, count, type) {
            if (type) {
                gl.drawElements(gl.LINES, count, typeMap[type], first);
            } else {
                gl.drawArrays(gl.LINES, first, count);
            }
            return this;
        },

        // 绘制连续直线
        stripLines:function(first, count, type) {
            if (type) {
                gl.drawElements(gl.LINE_STRIP, count, typeMap[type], first);
            } else {
                gl.drawArrays(gl.LINE_STRIP, first, count);
            }
            return this;
        },

        // 绘制闭合直线
        loopLines:function(first, count, type) {
            if (type) {
                gl.drawElements(gl.LINE_LOOP, count, typeMap[type], first);
            } else {
                gl.drawArrays(gl.LINE_LOOP, first, count);
            }
            return this;
        },

        // 绘制三角形
        triangles:function(first, count, type) {
            if (type) {
                gl.drawElements(gl.TRIANGLES, count, typeMap[type], first);
            } else {
                gl.drawArrays(gl.TRIANGLES, first, count);
            }
            return this;
        },

        // 绘制共有边三角形
        stripTriangles:function(first, count, type) {
            if (type) {
                gl.drawElements(gl.TRIANGLE_STRIP, count, typeMap[type], first);
            } else {
                gl.drawArrays(gl.TRIANGLE_STRIP, first, count);
            }
            return this;
        },

        // 绘制旋转围绕三角形
        fanTriangles:function(first, count, type) {
            if (type) {
                gl.drawElements(gl.TRIANGLE_FAN, count, typeMap[type], first);
            } else {
                gl.drawArrays(gl.TRIANGLE_FAN, first, count);
            }
            return this;
        }
    };
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/Matrix4/index
/*****************************************************************/
window.__pkg__bundleSrc__['143']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 两个4x4矩阵相乘
// 或矩阵和齐次坐标相乘
var _multiply = function (matrix4, param) {
    var newParam = [];
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < param.length / 4; j++)
            newParam[j * 4 + i] =
                matrix4[i] * param[j * 4] +
                matrix4[i + 4] * param[j * 4 + 1] +
                matrix4[i + 8] * param[j * 4 + 2] +
                matrix4[i + 12] * param[j * 4 + 3];
    return newParam;
};

__pkg__scope_args__=window.__pkg__getBundle('144');
var _move =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('145');
var _rotate =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('146');
var _scale =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('147');
var _transform =__pkg__scope_args__.default;


// 列主序存储的4x4矩阵

__pkg__scope_bundle__.default= function (initMatrix4) {

    var matrix4 = initMatrix4 || [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];

    var matrix4Obj = {

        // 移动
        "move": function (dis, a, b, c) {
            matrix4 = _multiply(_move(dis, a, b, c), matrix4);
            return matrix4Obj;
        },

        // 旋转
        "rotate": function (deg, a1, b1, c1, a2, b2, c2) {
            var matrix4s = _transform(a1, b1, c1, a2, b2, c2);
            matrix4 = _multiply(_multiply(_multiply(matrix4s[1], _rotate(deg)), matrix4s[0]), matrix4);
            return matrix4Obj;
        },

        // 缩放
        "scale": function (xTimes, yTimes, zTimes, cx, cy, cz) {
            matrix4 = _multiply(_scale(xTimes, yTimes, zTimes, cx, cy, cz), matrix4);
            return matrix4Obj;
        },

        // 乘法
        // 可以传入一个矩阵(matrix4,flag)
        "multiply": function (newMatrix4, flag) {
            matrix4 = flag ? _multiply(matrix4, newMatrix4) : _multiply(newMatrix4, matrix4);
            return matrix4Obj;
        },

        // 对一个坐标应用变换
        // 齐次坐标(x,y,z,w)
        "use": function (x, y, z, w) {
            // w为0表示点位于无穷远处，忽略
            z = z || 0; w = w || 1;
            var temp = _multiply(matrix4, [x, y, z, w]);
            temp[0] = +temp[0].toFixed(7);
            temp[1] = +temp[1].toFixed(7);
            temp[2] = +temp[2].toFixed(7);
            temp[3] = +temp[3].toFixed(7);
            return temp;
        },

        // 矩阵的值
        "value": function () {
            return matrix4;
        }

    };

    return matrix4Obj;

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/Matrix4/move
/*****************************************************************/
window.__pkg__bundleSrc__['144']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    /**
 * 在(a,b,c)方向位移d
 */
__pkg__scope_bundle__.default= function (d, a, b, c) {
    c = c || 0;
    var sqrt = Math.sqrt(a * a + b * b + c * c);
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        a * d / sqrt, b * d / sqrt, c * d / sqrt, 1
    ];
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/Matrix4/rotate
/*****************************************************************/
window.__pkg__bundleSrc__['145']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    /**
 * 围绕0Z轴旋转
 * 其它的旋转可以借助transform实现
 * 旋转角度单位采用弧度制
 */
__pkg__scope_bundle__.default= function (deg) {
    var sin = Math.sin(deg),
        cos = Math.cos(deg);
    return [
        cos, sin, 0, 0,
        -sin, cos, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/Matrix4/scale
/*****************************************************************/
window.__pkg__bundleSrc__['146']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    /**
 * 围绕圆心x、y和z分别缩放xTimes, yTimes和zTimes倍
 */
__pkg__scope_bundle__.default= function (xTimes, yTimes, zTimes, cx, cy, cz) {
    cx = cx || 0; cy = cy || 0; cz = cz || 0;
    return [
        xTimes, 0, 0, 0,
        0, yTimes, 0, 0,
        0, 0, zTimes, 0,
        cx - cx * xTimes, cy - cy * yTimes, cz - cz * zTimes, 1
    ];
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/Matrix4/transform
/*****************************************************************/
window.__pkg__bundleSrc__['147']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    /**
 * 针对任意射线(a1,b1,c1)->(a2,b2,c2)
 * 计算出两个变换矩阵
 * 分别为：任意射线变成OZ轴变换矩阵 + OZ轴变回原来的射线的变换矩阵
 */
__pkg__scope_bundle__.default= function (a1, b1, c1, a2, b2, c2) {

    if (typeof a1 === 'number' && typeof b1 === 'number') {

        // 如果设置两个点
        // 表示二维上围绕某个点旋转
        if (typeof c1 !== 'number') {
            c1 = 0; a2 = a1; b2 = b1; c2 = 1;
        }
        // 只设置三个点(设置不足六个点都认为只设置了三个点)
        // 表示围绕从原点出发的射线旋转
        else if (typeof a2 !== 'number' || typeof b2 !== 'number' || typeof c2 !== 'number') {
            a2 = a1; b2 = b1; c2 = c1; a1 = 0; b1 = 0; c1 = 0;
        }

        if (a1 == a2 && b1 == b2 && c1 == c2) throw new Error('It\'s not a legitimate ray!');

        var sqrt1 = Math.sqrt((a2 - a1) * (a2 - a1) + (b2 - b1) * (b2 - b1)),
            cos1 = sqrt1 != 0 ? (b2 - b1) / sqrt1 : 1,
            sin1 = sqrt1 != 0 ? (a2 - a1) / sqrt1 : 0,

            b = (a2 - a1) * sin1 + (b2 - b1) * cos1,
            c = c2 - c1,

            sqrt2 = Math.sqrt(b * b + c * c),
            cos2 = sqrt2 != 0 ? c / sqrt2 : 1,
            sin2 = sqrt2 != 0 ? b / sqrt2 : 0;

        return [

            // 任意射线变成OZ轴变换矩阵
            [
                cos1, cos2 * sin1, sin1 * sin2, 0,
                -sin1, cos1 * cos2, cos1 * sin2, 0,
                0, -sin2, cos2, 0,
                b1 * sin1 - a1 * cos1, c1 * sin2 - a1 * sin1 * cos2 - b1 * cos1 * cos2, -a1 * sin1 * sin2 - b1 * cos1 * sin2 - c1 * cos2, 1
            ],

            // OZ轴变回原来的射线的变换矩阵
            [
                cos1, -sin1, 0, 0,
                cos2 * sin1, cos2 * cos1, -sin2, 0,
                sin1 * sin2, cos1 * sin2, cos2, 0,
                a1, b1, c1, 1
            ]

        ];
    } else {
        throw new Error('a1 and b1 is required!');
    }
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/viewHandler
/*****************************************************************/
window.__pkg__bundleSrc__['148']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 屏幕3D控制信息捕获

__pkg__scope_args__=window.__pkg__getBundle('118');
var mousePosition =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('20');
var bind =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('117');
var getKeyCode =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (callback) {

    var el = document.getElementsByTagName('body')[0];

    // 键盘控制
    getKeyCode(function (keyCode) {
        callback({
            type: {
                up: "lookUp", // 向上
                down: "lookDown", // 向下
                left: "lookLeft", // 向左
                right: "lookRight", // 向右
            }[keyCode]
        });
    });

    // 鼠标控制
    var mouseP = null;
    var doMove = function (event) {
        if (mouseP == null) return;

        var tempMouseP = mousePosition(el, event);

        // 先求解出轨迹向量
        var normal = [tempMouseP.x - mouseP.x, mouseP.y - tempMouseP.y];

        // 方向向量旋转90deg得到选择向量
        var rotateNormal = [
            normal[1],
            normal[0] * -1,
            0
        ]

        // 非法射线忽略
        if (rotateNormal[0] == 0 && rotateNormal[1] == 0) return;

        callback({
            type: "rotate",
            normal: rotateNormal,
            dist: Math.abs(tempMouseP.x - mouseP.x) + Math.abs(tempMouseP.y - mouseP.y)
        });

        mouseP = tempMouseP;
    };

    bind(el, 'mousedown', function (event) {
        mouseP = mousePosition(el, event);
    });
    bind(el, 'mouseup', function (event) {
        mouseP = null;
    });
    bind(el, 'mousemove', function (event) {
        doMove(event);
    });

    // 手指控制
    bind(el, 'touchend', function (event) {
        mouseP = null;
    });
    bind(el, 'touchstart', function (event) {
        mouseP = mousePosition(el, event.touches[0]);
    });
    bind(el, 'touchmove', function (event) {
        doMove(event.touches[0]);
    });

    var doScale = function (value) {
        if (value == 0) return;

        callback({
            type: "scale",
            kind: value < 0 ? "reduce" : "enlarge",
            rate: Math.abs(value),
        });
    };

    // 滚轮控制
    bind(el, 'mousewheel', function (event) {
        doScale(event.wheelDelta);
    });

    if (window.addEventListener) {

        // 针对火狐浏览器
        window.addEventListener('DOMMouseScroll', function (event) {
            doScale(-1 * event.detail);
        }, false);
    }

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/mousePosition
/*****************************************************************/
window.__pkg__bundleSrc__['118']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 获取鼠标相对特定元素左上角位置
__pkg__scope_bundle__.default= function (el, event) {

    event = event || window.event;

    // 返回元素的大小及其相对于视口的位置
    var bounding = el.getBoundingClientRect();

    if (!event || !event.clientX)
        throw new Error('Event is necessary!');
    var temp = {

        // 鼠标相对元素位置 = 鼠标相对窗口坐标 - 元素相对窗口坐标
        "x": event.clientX - bounding.left + el.scrollLeft,
        "y": event.clientY - bounding.top + el.scrollTop
    };

    return temp;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/keyCode
/*****************************************************************/
window.__pkg__bundleSrc__['117']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 字典表
var dictionary = {

    // 数字
    48: [0, ')'],
    49: [1, '!'],
    50: [2, '@'],
    51: [3, '#'],
    52: [4, '$'],
    53: [5, '%'],
    54: [6, '^'],
    55: [7, '&'],
    56: [8, '*'],
    57: [9, '('],
    96: [0, 0],
    97: 1,
    98: 2,
    99: 3,
    100: 4,
    101: 5,
    102: 6,
    103: 7,
    104: 8,
    105: 9,
    106: "*",
    107: "+",
    109: "-",
    110: ".",
    111: "/",

    // 字母
    65: ["a", "A"],
    66: ["b", "B"],
    67: ["c", "C"],
    68: ["d", "D"],
    69: ["e", "E"],
    70: ["f", "F"],
    71: ["g", "G"],
    72: ["h", "H"],
    73: ["i", "I"],
    74: ["j", "J"],
    75: ["k", "K"],
    76: ["l", "L"],
    77: ["m", "M"],
    78: ["n", "N"],
    79: ["o", "O"],
    80: ["p", "P"],
    81: ["q", "Q"],
    82: ["r", "R"],
    83: ["s", "S"],
    84: ["t", "T"],
    85: ["u", "U"],
    86: ["v", "V"],
    87: ["w", "W"],
    88: ["x", "X"],
    89: ["y", "Y"],
    90: ["z", "Z"],

    // 方向
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    33: "page up",
    34: "page down",
    35: "end",
    36: "home",

    // 控制键
    16: "shift",
    17: "ctrl",
    18: "alt",
    91: "command",
    92: "command",
    93: "command",
    224: "command",
    9: "tab",
    20: "caps lock",
    32: "spacebar",
    8: "backspace",
    13: "enter",
    27: "esc",
    46: "delete",
    45: "insert",
    144: "number lock",
    145: "scroll lock",
    12: "clear",
    19: "pause",

    // 功能键
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",

    // 余下键
    189: ["-", "_"],
    187: ["=", "+"],
    219: ["[", "{"],
    221: ["]", "}"],
    220: ["\\", "|"],
    186: [";", ":"],
    222: ["'", '"'],
    188: [",", "<"],
    190: [".", ">"],
    191: ["/", "?"],
    192: ["`", "~"]

};

// 非独立键字典
var help_key = ["shift", "ctrl", "alt"];

// 返回键盘此时按下的键的组合结果
var keyCode = function (event) {
    event = event || window.event;

    var keycode = event.keyCode || event.which;
    var key = dictionary[keycode] || keycode;
    if (!key) return;
    if (key.constructor !== Array) key = [key, key];

    var _key = key[0];

    var shift = event.shiftKey ? "shift+" : "",
        alt = event.altKey ? "alt+" : "",
        ctrl = event.ctrlKey ? "ctrl+" : "";

    var resultKey = "",
        preKey = ctrl + shift + alt;

    if (help_key.indexOf(key[0]) >= 0) {
        key[0] = key[1] = "";
    }

    // 判断是否按下了caps lock
    var lockPress = event.code == "Key" + event.key && !shift;

    // 只有字母（且没有按下功能Ctrl、shift或alt）区分大小写
    resultKey = (preKey + ((preKey == '' && lockPress) ? key[1] : key[0]));

    if (key[0] == "") {
        resultKey = resultKey.replace(/\+$/, '');
    }

    return resultKey == '' ? _key : resultKey;
};

__pkg__scope_bundle__.getKeyString = keyCode;

/**
 * 获取键盘此时按下的键的组合结果
 * @param {Function} callback 回调，键盘有键被按下的时候触发
 * @return {Function} 返回一个函数，执行此函数可以取消键盘监听
 * @examples
 *  keyCode(function (data) {
 *      console.log(data);
 *  });
 */
__pkg__scope_bundle__.default= function (callback) {

    // 记录MacOS的command是否被按下
    var macCommand = false;

    var doKeydown = function (event) {
        var keyStringCode = keyCode(event);
        if (/command/.test(keyStringCode)) macCommand = true;

        if (macCommand && !/command/.test(keyStringCode) && !/ctrl/.test(keyStringCode)) keyStringCode = "ctrl+" + keyStringCode;
        callback(keyStringCode.replace(/command/g, 'ctrl').replace('ctrl+ctrl', 'ctrl'), event);
    };

    var doKeyup = function (event) {
        var keyStringCode = keyCode(event);
        if (/command/.test(keyStringCode)) macCommand = false;
    };

    // 在body上注册
    document.body.addEventListener('keydown', doKeydown, false);
    document.body.addEventListener('keyup', doKeyup, false);

    // 返回取消监听函数
    return function () {
        document.body.removeEventListener('keydown', doKeydown, false);
        document.body.removeEventListener('keyup', doKeyup, false);
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/initModelValue
/*****************************************************************/
window.__pkg__bundleSrc__['149']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 主视图
__pkg__scope_bundle__.mainView = function () {

    var modelValue = [{
        type: "default",
        value: {
            color: [0.5, 0.5, 0.5, 1],
            method: "lines",
            points: []
        }
    }, {
        type: "default",
        value: {
            color: [0.8, 0.8, 0.8, 1],
            method: "lines",
            points: []
        }
    }];

    for (var i = 0; i <= 25; i++) {

        // 深色线
        if (i % 5 == 0) {
            modelValue[0].value.points.push(

                // 横
                // [-1,0,-1+(2/25)*i]
                -1, 0, 0.08 * i - 1,
                1, 0, 0.08 * i - 1,

                // 竖
                0.08 * i - 1, 0, -1,
                0.08 * i - 1, 0, 1
            );
        }

        // 浅色线
        else {
            modelValue[1].value.points.push(
                -1, 0, 0.08 * i - 1,
                1, 0, 0.08 * i - 1,
                0.08 * i - 1, 0, -1,
                0.08 * i - 1, 0, 1
            );
        }

    }

    return modelValue;
};

// 方向图标
__pkg__scope_bundle__.directiveView = function () {

    return [

        // X轴承
        {
            length: 2,
            method: "lines",
            points: [-1.3, 0, 0, 1.3, 0, 0],
            color: [1, 0, 0, 1]
        }, {
            length: 6,
            method: "fanTriangles",
            points: [
                2, 0, 0,
                1.25, 0.3, 0.3,
                1.25, -0.3, 0.3,
                1.25, -0.3, -0.3,
                1.25, 0.3, -0.3,
                1.25, 0.3, 0.3
            ],
            color: [1, 0, 0, 1]
        },

        // Y轴承
        {
            length: 2,
            method: "lines",
            points: [0, -1.3, 0, 0, 1.3, 0],
            color: [0, 1, 0, 1]
        }, {
            length: 6,
            method: "fanTriangles",
            points: [
                0, 2, 0,
                0.3, 1.25, 0.3,
                -0.3, 1.25, 0.3,
                -0.3, 1.25, -0.3,
                0.3, 1.25, -0.3,
                0.3, 1.25, 0.3,
            ],
            color: [0, 1, 0, 1]
        },

        // Z轴承
        {
            length: 2,
            method: "lines",
            points: [0, 0, -1.3, 0, 0, 1.3],
            color: [0, 0, 1, 1]
        }, {
            length: 6,
            method: "fanTriangles",
            points: [
                0, 0, 2,
                0.3, 0.3, 1.25,
                -0.3, 0.3, 1.25,
                -0.3, -0.3, 1.25,
                0.3, -0.3, 1.25,
                0.3, 0.3, 1.25
            ],
            color: [0, 0, 1, 1]
        }
    ];

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/shader-vertex.c
/*****************************************************************/
window.__pkg__bundleSrc__['150']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= "attribute vec4 a_position;\r\nuniform mat4 u_matrix;\r\n\r\nvoid main()\r\n{\r\n    vec4 temp = u_matrix * a_position;\r\n\r\n    // 表示眼睛距离vec4(0.0,0.0,1.0)的距离\r\n    float dist = 1.0;\r\n\r\n    // 使用投影直接计算\r\n    gl_Position = vec4((dist + 1.0) * temp.x / (dist + temp.z), (dist + 1.0) * temp.y / (dist + temp.z), temp.z, 1.0);\r\n\r\n}\r\n"

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/shader-fragment.c
/*****************************************************************/
window.__pkg__bundleSrc__['151']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= "precision mediump float;\r\nuniform vec4 u_color;\r\n\r\nvoid main()\r\n{\r\n    gl_FragColor = u_color;\r\n}\r\n"

    return __pkg__scope_bundle__;
}

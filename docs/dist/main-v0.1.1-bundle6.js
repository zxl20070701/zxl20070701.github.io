
/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['26']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('68');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('69');


__pkg__scope_args__=window.__pkg__getBundle('70');
var doResize =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('71');
var webglRender =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('77');
var mainView=__pkg__scope_args__.mainView;
var directiveView=__pkg__scope_args__.directiveView;


// 记录着当前的模型数据
var modelValue = [];

// 着色器
__pkg__scope_args__=window.__pkg__getBundle('78');
var vertexShader =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('79');
var fragmentShader =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj) {
    return {
        render: template,
        beforeMount: function () {
            document.getElementsByTagName('title')[0].innerText = "3D模型编辑器";
            document.getElementById('icon-logo').setAttribute('href', './model-editor.png');
        },
        data: {
            width: obj.ref(0),
            height: obj.ref(0)
        },
        mounted: function () {

            // 初始化基础辅助图形


            // 启动画布监听
            var _this = this;
            var el = document.getElementById('canvas');
            doResize(el, function () {
                _this.width = el.clientWidth;
                _this.height = el.clientHeight;

                setTimeout(function () {
                    _this.updateView();
                });

            });
        },
        methods: {

            // 根据模型数据进行绘制
            updateView: function () {

                // 创建3d对象
                var webgl = webglRender(document.getElementsByTagName('canvas')[0]);

                // 启用着色器
                webgl.shader(vertexShader, fragmentShader);

            },

            // 导入本地文件
            inputLocalFile: function (event) {

            },

            // 导出
            exportFile: function () {

            },

            //  新建
            resetEditor: function () {

            }
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['68']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,14,16]},{"type":"tag","name":"div","attrs":{"class":"menu"},"childNodes":[2,4,6,12]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"3D模型编辑器","childNodes":[]},{"type":"tag","name":"span","attrs":{"ui-on:click":"resetEditor"},"childNodes":[5]},{"type":"text","content":"新建","childNodes":[]},{"type":"tag","name":"span","attrs":{"class":"more"},"childNodes":[7,8]},{"type":"text","content":"导入","childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[9]},{"type":"tag","name":"span","attrs":{},"childNodes":[10]},{"type":"tag","name":"label","attrs":{"for":"file"},"childNodes":[11]},{"type":"text","content":"本地选择","childNodes":[]},{"type":"tag","name":"span","attrs":{"ui-on:click":"exportFile"},"childNodes":[13]},{"type":"text","content":"导出","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content","id":"canvas"},"childNodes":[15]},{"type":"tag","name":"canvas","attrs":{"ui-bind:width":"width","ui-bind:height":"height"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"no-view"},"childNodes":[17]},{"type":"tag","name":"input","attrs":{"type":"file","id":"file","multiple":"","ui-on:change":"inputLocalFile","accept":".json,.stl,.obj,.fbx,.mtl,.ply,.gltf,.mod"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['69']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view]{\n\nbackground-color: #eff2f2;\n\nwidth: 100vw;\n\nheight: 100vh;\n\n}\n\n [page-view] .no-view{\n\ndisplay: none;\n\n}\n\n [page-view]>div.menu{\n\nborder-bottom: 1px solid #cccccc;\n\nheight: 30px;\n\nheight: 30px;\n\nline-height: 30px;\n\n}\n\n [page-view]>div.menu>h2{\n\nbackground-image: url('./model-editor.png');\n\npadding-left: 30px;\n\npadding-right: 10px;\n\ndisplay: inline-block;\n\nvertical-align: top;\n\nbackground-size: auto 70%;\n\nbackground-repeat: no-repeat;\n\nbackground-position: 5px center;\n\nfont-size: 12px;\n\ncolor: rgb(0, 0, 0);\n\nfont-weight: 800;\n\nborder-right: 1px solid #cccccc;\n\n}\n\n [page-view]>div.menu>span{\n\nmargin-left: 20px;\n\ndisplay: inline-block;\n\nvertical-align: top;\n\nfont-size: 12px;\n\ncursor: pointer;\n\nwhite-space: nowrap;\n\n}\n\n [page-view]>div.menu>span:hover{\n\ntext-decoration: underline;\n\nfont-weight: 800;\n\n}\n\n [page-view]>div.menu>span.more{\n\nposition: relative;\n\npadding-right: 10px;\n\n}\n\n [page-view]>div.menu>span.more:hover>div{\n\ndisplay: block;\n\n}\n\n [page-view]>div.menu>span.more::after{\n\nposition: absolute;\n\ntop: 13px;\n\nright: -3px;\n\nwidth: 0;\n\nheight: 0;\n\nborder-left: 4px solid transparent;\n\nborder-right: 4px solid transparent;\n\nborder-top: 5px solid #4f5959;\n\ncontent: \" \";\n\n}\n\n [page-view]>div.menu>span.more>div{\n\nposition: absolute;\n\nbackground-color: white;\n\nbox-shadow: 0 0 7px 0px #cccccc;\n\npadding: 5px 0;\n\nline-height: 1.8em;\n\ndisplay: none;\n\n}\n\n [page-view]>div.menu>span.more>div>span{\n\ndisplay: block;\n\npadding: 0 10px;\n\nfont-weight: 400;\n\ncursor: pointer;\n\n}\n\n [page-view]>div.menu>span.more>div>span>label{\n\ncursor: pointer;\n\n}\n\n [page-view]>div.menu>span.more>div>span:hover{\n\ntext-decoration: underline;\n\n}\n\n [page-view]>div.menu>span.more>div>span:not(:last-child){\n\nborder-bottom: 1px solid #cccccc;\n\n}\n\n [page-view]>div.content{\n\nwidth: 100vw;\n\nheight: calc(100vh - 30px);\n\noverflow: hidden;\n\ntext-align: center;\n\nbackground-color: #9fa2a3;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/ResizeObserver
/*****************************************************************/
window.__pkg__bundleSrc__['70']=function(){
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

        }
    };

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/webgl/index
/*****************************************************************/
window.__pkg__bundleSrc__['71']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('72');
var useShader=__pkg__scope_args__.useShader;

__pkg__scope_args__=window.__pkg__getBundle('73');
var newBuffer=__pkg__scope_args__.newBuffer;
var writeBuffer=__pkg__scope_args__.writeBuffer;
var useBuffer=__pkg__scope_args__.useBuffer;

__pkg__scope_args__=window.__pkg__getBundle('74');
var initTexture=__pkg__scope_args__.initTexture;
var linkImage=__pkg__scope_args__.linkImage;
var linkCube=__pkg__scope_args__.linkCube;

__pkg__scope_args__=window.__pkg__getBundle('75');
var value =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('76');
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
                    }
                };
                return textureObj;
            },


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
window.__pkg__bundleSrc__['72']=function(){
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
window.__pkg__bundleSrc__['73']=function(){
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
window.__pkg__bundleSrc__['74']=function(){
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
window.__pkg__bundleSrc__['75']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (gl) {
    return {

        /**
         * attribue
         * ----------------------------------------
         */

        // 浮点数
        setAttribute1f(name, v0) {
            // 获取存储位置
            var location = gl.getAttribLocation(gl.program, name);
            // 传递数据给变量
            gl.vertexAttrib1f(location, v0);
        },
        setAttribute2f(name, v0, v1) {
            var location = gl.getAttribLocation(gl.program, name);
            gl.vertexAttrib2f(location, v0, v1);
        },
        setAttribute3f(name, v0, v1, v2) {
            var location = gl.getAttribLocation(gl.program, name);
            gl.vertexAttrib3f(location, v0, v1, v2);
        },
        setAttribute4f(name, v0, v1, v2, v3) {
            var location = gl.getAttribLocation(gl.program, name);
            gl.vertexAttrib4f(location, v0, v1, v2, v3);
        },

        // 整数
        setAttribute1i(name, v0) {
            // 获取存储位置
            var location = gl.getAttribLocation(gl.program, name);
            // 传递数据给变量
            gl.vertexAttrib1i(location, v0);
        },
        setAttribute2i(name, v0, v1) {
            var location = gl.getAttribLocation(gl.program, name);
            gl.vertexAttrib2i(location, v0, v1);
        },
        setAttribute3i(name, v0, v1, v2) {
            var location = gl.getAttribLocation(gl.program, name);
            gl.vertexAttrib3i(location, v0, v1, v2);
        },
        setAttribute4i(name, v0, v1, v2, v3) {
            var location = gl.getAttribLocation(gl.program, name);
            gl.vertexAttrib4i(location, v0, v1, v2, v3);
        },

        /**
        * uniform
        * ----------------------------------------
        */

        // 浮点数
        setUniform1f(name, v0) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniform1f(location, v0);
        },
        setUniform2f(name, v0, v1) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniform2f(location, v0, v1);
        },
        setUniform3f(name, v0, v1, v2) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniform3f(location, v0, v1, v2);
        },
        setUniform4f(name, v0, v1, v2, v3) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniform4f(location, v0, v1, v2, v3);
        },

        // 整数
        setUniform1i(name, v0) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniform1i(location, v0);
        },
        setUniform2i(name, v0, v1) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniform2i(location, v0, v1);
        },
        setUniform3i(name, v0, v1, v2) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniform3i(location, v0, v1, v2);
        },
        setUniform4i(name, v0, v1, v2, v3) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniform4i(location, v0, v1, v2, v3);
        },

        // 矩阵
        setUniformMatrix2fv(name, value) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniformMatrix2fv(location, false, value);
        },
        setUniformMatrix3fv(name, value) {
            var location = gl.getUniformLocation(gl.program, name);
            gl.uniformMatrix3fv(location, false, value);
        },
        setUniformMatrix4fv(name, value) {
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
window.__pkg__bundleSrc__['76']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (gl) {

    var typeMap = {
        "byte": gl.UNSIGNED_BYTE,
        "short": gl.UNSIGNED_SHORT
    };

    return {

        // 开启深度计算
        openDeep() {
            gl.enable(gl.DEPTH_TEST);
            return this;
        },

        // 绘制点
        points(first, count, type) {
            if (type) {
                gl.drawElements(gl.POINTS, count, typeMap[type], first);
            } else {
                gl.drawArrays(gl.POINTS, first, count);
            }
            return this;
        },

        // 绘制直线
        lines(first, count, type) {
            if (type) {
                gl.drawElements(gl.LINES, count, typeMap[type], first);
            } else {
                gl.drawArrays(gl.LINES, first, count);
            }
            return this;
        },

        // 绘制连续直线
        stripLines(first, count, type) {
            if (type) {
                gl.drawElements(gl.LINE_STRIP, count, typeMap[type], first);
            } else {
                gl.drawArrays(gl.LINE_STRIP, first, count);
            }
            return this;
        },

        // 绘制闭合直线
        loopLines(first, count, type) {
            if (type) {
                gl.drawElements(gl.LINE_LOOP, count, typeMap[type], first);
            } else {
                gl.drawArrays(gl.LINE_LOOP, first, count);
            }
            return this;
        },

        // 绘制三角形
        triangles(first, count, type) {
            if (type) {
                gl.drawElements(gl.TRIANGLES, count, typeMap[type], first);
            } else {
                gl.drawArrays(gl.TRIANGLES, first, count);
            }
            return this;
        },

        // 绘制共有边三角形
        stripTriangles(first, count, type) {
            if (type) {
                gl.drawElements(gl.TRIANGLE_STRIP, count, typeMap[type], first);
            } else {
                gl.drawArrays(gl.TRIANGLE_STRIP, first, count);
            }
            return this;
        },

        // 绘制旋转围绕三角形
        fanTriangles(first, count, type) {
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
// Original file:./src/pages/model-editor/initModelValue
/*****************************************************************/
window.__pkg__bundleSrc__['77']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 主视图
__pkg__scope_bundle__.mainView = function () {

};

// 方向图标
__pkg__scope_bundle__.directiveView = function () {

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/shader-vertex.c
/*****************************************************************/
window.__pkg__bundleSrc__['78']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= "attribute vec4 a_position;\nuniform mat4 u_matrix;\n\nvoid main()\n{\n    vec4 temp = u_matrix * a_position;\n\n    // 表示眼睛距离vec4(0.0,0.0,1.0)的距离\n    float dist = 2.0;\n\n    // 使用投影直接计算\n    gl_Position = vec4((dist + 1.0) * temp.x / (dist + temp.z), (dist + 1.0) * temp.y / (dist + temp.z), temp.z, 1.0);\n\n}\n"

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/model-editor/shader-fragment.c
/*****************************************************************/
window.__pkg__bundleSrc__['79']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= "precision mediump float;\nuniform vec4 u_color;\n\nvoid main()\n{\n    gl_FragColor = u_color;\n}\n"

    return __pkg__scope_bundle__;
}

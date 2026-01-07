
/*************************** [bundle] ****************************/
// Original file:./src/pages/echarts/dialogs/h2o/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['193']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('249');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('250');


// 着色器
__pkg__scope_args__=window.__pkg__getBundle('251');
var vertexShader =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('252');
var fragmentShader =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('253');
var webglRender =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('259');
var cylinderFactory =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('267');
var sphereFactory =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('269');
var Matrix4 =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj, props) {

    return {
        name: "echarts-example",
        render: template,
        data: {
            srcUrl: props.srcUrl
        },
        mounted: function () {
            var webgl = webglRender(this._refs.mycanvas.value);
            webgl.shader(vertexShader, fragmentShader);

            var sphere = sphereFactory(), cylinder = cylinderFactory();

            // 氢原子
            var H1_Geometry = sphere(-0.7, 0, 0, 0.36);
            var H2_Geometry = sphere(0.7, 0, 0, 0.36);

            // 氧原子
            var O_Geometry = sphere(0, 0.7, 0, 0.5);

            // 化学键（左）
            var L_left_Geometry = cylinder(-0.7, 0, 0, 0.16, 0, 0.7, 0);

            // 化学键（右）
            var L_right_Geometry = cylinder(0.7, 0, 0, 0.16, 0, 0.7, 0);

            var globalMatrix4 = Matrix4();

            var buffer = webgl.buffer();
            var painter = webgl.painter().openDeep();

            var drawGeometry = function (geometryData) {
                for (var index = 0; index < geometryData.length; index++) {
                    buffer.write(new Float32Array(geometryData[index].points)).use("a_position", 3, 3, 0);
                    painter[geometryData[index].method](0, geometryData[index].length);
                }
            };

            function freshView() {

                // 首先，每次围绕x轴旋转一点点
                webgl.setUniformMatrix4fv("u_matrix", globalMatrix4.rotate(0.05, -1, 0.2, 0, 1, 0.2, 0).value());

                // 设置为绘制氧原子颜色
                webgl.setUniform4f("u_color", 1, 0.2, 0.2, 1.0);

                // 绘制氧原子
                drawGeometry(O_Geometry);

                // 设置为绘制氢原子颜色
                webgl.setUniform4f("u_color", 0.6, 0.6, 0.6, 1.0);

                // 绘制氢原子（左）
                drawGeometry(H1_Geometry);

                // 绘制氢原子（右）
                drawGeometry(H2_Geometry);

                // 设置为绘制化学键颜色
                webgl.setUniform4f("u_color", 0.2, 0.3, 0.1, 0.4);

                // 绘制化学键（左）
                drawGeometry(L_left_Geometry);

                // 绘制化学键（右）
                drawGeometry(L_right_Geometry);
            }

            setInterval(function () {
                freshView();
            }, 14);
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/echarts/dialogs/h2o/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['249']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,10]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,4,7]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"水分子式H2O","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"src-url"},"childNodes":[5,6]},{"type":"text","content":"查看源码：","childNodes":[]},{"type":"tag","name":"a","attrs":{"ui-bind:href":"srcUrl","ui-bind":"srcUrl","target":"_blank"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[8]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeDialog"},"childNodes":[9]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content h2o","ref":"mycontent"},"childNodes":[11]},{"type":"tag","name":"canvas","attrs":{"ref":"mycanvas","class":"canvas","width":"500","height":"500"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/echarts/dialogs/h2o/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['250']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view='echarts-example']>div.h2o .canvas{\n\nwidth: 500px;\n\nheight: 500px;\n\nmargin: 50px auto;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/echarts/dialogs/h2o/shader-vertex.c
/*****************************************************************/
window.__pkg__bundleSrc__['251']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= "attribute vec4 a_position;\r\nuniform mat4 u_matrix;\r\n\r\nvoid main()\r\n{\r\n    vec4 temp = u_matrix * a_position;\r\n    \r\n    // 表示眼睛距离vec4(0.0,0.0,1.0)的距离\r\n    float dist = 3.0;\r\n\r\n    // 使用投影直接计算\r\n    // 为保证纹理和相对位置正确\r\n    // x、y、z的改变满足线性变换\r\n    gl_Position = vec4((dist + 1.0) * temp.x, (dist + 1.0) * temp.y, dist * (dist + temp.z) + 1.0 - dist * dist, temp.w * 2.0 * (dist + temp.z));\r\n}"

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/echarts/dialogs/h2o/shader-fragment.c
/*****************************************************************/
window.__pkg__bundleSrc__['252']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= "precision mediump float;\r\n\r\nuniform vec4 u_color;\r\n\r\nvoid main()\r\n{\r\n    gl_FragColor = u_color;\r\n}"

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/webgl/index
/*****************************************************************/
window.__pkg__bundleSrc__['253']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('254');
var useShader=__pkg__scope_args__.useShader;

__pkg__scope_args__=window.__pkg__getBundle('255');
var newBuffer=__pkg__scope_args__.newBuffer;
var writeBuffer=__pkg__scope_args__.writeBuffer;
var useBuffer=__pkg__scope_args__.useBuffer;

__pkg__scope_args__=window.__pkg__getBundle('256');
var initTexture=__pkg__scope_args__.initTexture;
var linkImage=__pkg__scope_args__.linkImage;
var linkCube=__pkg__scope_args__.linkCube;

__pkg__scope_args__=window.__pkg__getBundle('257');
var value =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('258');
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

                // 配置纹理
                gl.texParameteri(type, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(type, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
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
window.__pkg__bundleSrc__['254']=function(){
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
window.__pkg__bundleSrc__['255']=function(){
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
window.__pkg__bundleSrc__['256']=function(){
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

    unit = unit || 0;
    // 开启纹理单元，unit表示开启的编号
    gl.activeTexture(gl['TEXTURE' + unit]);

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
window.__pkg__bundleSrc__['257']=function(){
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
window.__pkg__bundleSrc__['258']=function(){
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
// Original file:./src/tool/geometry/cylinder
/*****************************************************************/
window.__pkg__bundleSrc__['259']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('260');
var getOption =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('261');
var splitNum=__pkg__scope_args__.splitNum;

__pkg__scope_args__=window.__pkg__getBundle('262');
var prism =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (option) {
    var __option = getOption(option);

    // 圆柱体
    return function (x, y, z, radius, x2, y2, z2) {
        // 求解出需要切割多少份比较合理
        var num = splitNum(__option.precision, radius);

        if (arguments.length == 5) {
            return prism(option)(x, y, z, radius, x2, num);
        } else {
            return prism(option)(x, y, z, radius, x2, y2, z2, num);
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/geometry/option
/*****************************************************************/
window.__pkg__bundleSrc__['260']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('134');
var initConfig=__pkg__scope_args__.initConfig;


__pkg__scope_bundle__.default= function (option) {
    return initConfig({
        precision: 0.1, // 精度
        normal: false, // 是否需要法向量
    }, option || {});
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/config
/*****************************************************************/
window.__pkg__bundleSrc__['134']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
// 初始化配置文件

__pkg__scope_bundle__.initConfig = function (init, data) {
    var key;
    for (key in data)
        try {
            init[key] = data[key];
        } catch (e) {
            throw new Error("Illegal property value！");
        }
    return init;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/geometry/tool/circle
/*****************************************************************/
window.__pkg__bundleSrc__['261']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 计算切割份数
__pkg__scope_bundle__.splitNum = function (precision, radius) {

    // 根据切割弧度得出切割块数目
    var num = Math.ceil(Math.PI * 2 /

        // 为了满足最小精度而得出的切割弧度
        Math.asin(precision / radius) * 2);

    return (isNaN(num) || num < 12) ? 12 : num;

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/geometry/prism
/*****************************************************************/
window.__pkg__bundleSrc__['262']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('260');
var getOption =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('263');
var mergeArrayTo=__pkg__scope_args__.mergeArrayTo;

__pkg__scope_args__=window.__pkg__getBundle('264');
var rotateLineFactory =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('265');
var prismHorizontal =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('266');
var prismVertical =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (option) {
    var __option = getOption(option);

    // 棱柱体
    return function (x, y, z, radius, x2, y2, z2, num) {
        var height, rotateLine = null;

        if (arguments.length == 6) {
            height = x2;
            num = y2;
        } else {
            height = (y > y2 ? -1 : 1) * Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y) + (z2 - z) * (z2 - z));
            rotateLine = rotateLineFactory(x, y, z, x2, y2, z2);
        }

        var result = [{
            name: "bottom",
            points: [],
            length: 0,
            method: "triangles"
        }, {
            name: "top",
            points: [],
            length: 0,
            method: "triangles"
        }, {
            name: "side",
            points: [],
            length: 0,
            method: "triangles"
        }];

        // 绘制底部的盖子
        mergeArrayTo(result[0].points, prismHorizontal(__option.normal, x, y, z, radius, num, height > 0 ? -1 : 1));

        // 绘制顶部的盖子
        mergeArrayTo(result[1].points, prismHorizontal(__option.normal, x, y + height, z, radius, num, height > 0 ? 1 : -1));

        // 绘制侧边部分
        mergeArrayTo(result[2].points, prismVertical(__option.normal, x, y, z, radius, height, num));

        for (var i = 0; i < result.length; i++) {
            if (rotateLine) {

                var points = [];
                var isNormal = false;
                for (var index = 0; index < result[i].points.length; index += 3) {
                    mergeArrayTo(points, rotateLine(result[i].points[index], result[i].points[index + 1], result[i].points[index + 2], (__option.normal) && isNormal));
                    isNormal = !isNormal;
                }
                result[i].points = points;
            }
            result[i].length = result[i].points.length / (__option.normal ? 6 : 3);
        }

        return result;

    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/Array
/*****************************************************************/
window.__pkg__bundleSrc__['263']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 合并数组到第一个
__pkg__scope_bundle__.mergeArrayTo = function (targetArray) {
    var sourceArray;
    for (var i = 1; i < arguments.length; i++) {
        sourceArray = arguments[i];
        if (Array.isArray(sourceArray)) {
            for (var j = 0; j < sourceArray.length; j++) {
                targetArray.push(sourceArray[j]);
            }
        } else {
            targetArray.push(sourceArray);
        }
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/geometry/tool/rotateLine
/*****************************************************************/
window.__pkg__bundleSrc__['264']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (x, y, z, x2, y2, z2) {
    return function (x0, y0, z0, isNormal) {
        if (x == x2 && z == z2) return [x0, y0, z0];

        var sin, cos, temp;

        // 第一步：归零化
        var _x0 = x0 - (isNormal ? 0 : x), _y0 = y0 - (isNormal ? 0 : y), _z0 = z0 - (isNormal ? 0 : z);  // 法向量起点本来就是原点
        var _x2 = x2 - x, _y2 = y2 - y, _z2 = z2 - z;

        // 第二步：围绕OZ轴旋转

        var __d = Math.sqrt(_x2 * _x2 + _z2 * _z2);
        cos = _x2 / __d;
        sin = _z2 / __d;

        var _x2N = _z2 * sin + _x2 * cos;

        var d = Math.sqrt(_y2 * _y2 + _x2N * _x2N);
        cos = _y2 / d;
        sin = _x2N / d;

        temp = [_y0, _x0];
        _y0 = temp[0] * cos - temp[1] * sin;
        _x0 = temp[0] * sin + temp[1] * cos;

        // 第三步：围绕0Y轴旋转
        cos = _x2 / __d;
        sin = _z2 / __d;

        temp = [_x0, _z0];
        _x0 = temp[0] * cos - temp[1] * sin;
        _z0 = temp[0] * sin + temp[1] * cos;

        // 第四步：去零化（直接返回）
        return [_x0 + (isNormal ? 0 : x), _y0 + (isNormal ? 0 : y), _z0 + (isNormal ? 0 : z)];
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/geometry/tool/prism-horizontal
/*****************************************************************/
window.__pkg__bundleSrc__['265']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('136');
var rotate =__pkg__scope_args__.default;


// 棱柱水平部分

__pkg__scope_bundle__.default= function (normal, x, y, z, radius, num, d) {

    var beginX, beginZ;
    if (num == 4) {
        var temp = radius / 1.414;
        beginX = x + temp;
        beginZ = z + temp;

    } else {
        beginX = x + radius;
        beginZ = z;
    }

    var point = [beginX, beginZ];
    var points = [];
    var deg = Math.PI * 2 / num;
    for (var i = 0; i < num; i++) {

        points.push(x, y, z);
        if (normal) points.push(0, d, 0);

        points.push(point[0], y, point[1]);
        if (normal) points.push(0, d, 0);

        point = rotate(x, z, deg * (i + 1), beginX, beginZ);
        points.push(point[0], y, point[1]);
        if (normal) points.push(0, d, 0);
    }

    return points;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/transform/rotate
/*****************************************************************/
window.__pkg__bundleSrc__['136']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 点（x,y）围绕中心（cx,cy）旋转deg度
__pkg__scope_bundle__.default= function (cx, cy, deg, x, y) {
    var cos = Math.cos(deg), sin = Math.sin(deg);
    return [
        +((x - cx) * cos - (y - cy) * sin + cx).toFixed(7),
        +((x - cx) * sin + (y - cy) * cos + cy).toFixed(7)
    ];
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/geometry/tool/prism-vertical
/*****************************************************************/
window.__pkg__bundleSrc__['266']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('136');
var rotate =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('263');
var mergeArrayTo=__pkg__scope_args__.mergeArrayTo;


// 棱柱垂直部分

__pkg__scope_bundle__.default= function (normal, x, y, z, radius, height, num) {
    var points = [], beginPosition;

    if (num == 4) {
        beginPosition = rotate(x, z, Math.PI * 0.25, x - radius, z);
    } else {
        beginPosition = [x + radius, z];
    }

    var deg = Math.PI * 2 / num, degHalf = Math.PI * 2 / (num * 2);

    var endPosition, normalPosition = [];
    for (var i = 0; i < num; i++) {

        endPosition = rotate(x, z, deg, beginPosition[0], beginPosition[1]);

        if (normal) {
            var halfPosition = rotate(x, z, degHalf, beginPosition[0], beginPosition[1]);
            normalPosition = [halfPosition[0], 0, halfPosition[1]];
        }

        mergeArrayTo(points, beginPosition[0], y, beginPosition[1], normalPosition)
        mergeArrayTo(points, beginPosition[0], y + height, beginPosition[1], normalPosition);
        mergeArrayTo(points, endPosition[0], y + height, endPosition[1], normalPosition);

        mergeArrayTo(points, beginPosition[0], y, beginPosition[1], normalPosition);
        mergeArrayTo(points, endPosition[0], y, endPosition[1], normalPosition);
        mergeArrayTo(points, endPosition[0], y + height, endPosition[1], normalPosition);

        beginPosition = endPosition;
    }

    return points;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/geometry/sphere
/*****************************************************************/
window.__pkg__bundleSrc__['267']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('260');
var getOption =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('263');
var mergeArrayTo=__pkg__scope_args__.mergeArrayTo;

__pkg__scope_args__=window.__pkg__getBundle('268');
var sphereFragment =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('261');
var splitNum=__pkg__scope_args__.splitNum;


__pkg__scope_bundle__.default= function (option) {
    var __option = getOption(option);

    // 球体
    return function (cx, cy, cz, radius) {

        // 求解出需要切割多少份比较合理
        var num = splitNum(__option.precision, radius);

        // 然后一瓣瓣的绘制
        var result = [{
            name: "surface",
            points: [],
            length: 0,
            method: "triangles"
        }];
        for (var i = 0; i < num; i++) {
            mergeArrayTo(result[0].points, sphereFragment(__option.normal, cx, cy, cz, radius, num, i));
        }

        result[0].length = result[0].points.length / (__option.normal ? 6 : 3);
        return result;
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/geometry/tool/sphere-fragment
/*****************************************************************/
window.__pkg__bundleSrc__['268']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('136');
var rotate =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('263');
var mergeArrayTo=__pkg__scope_args__.mergeArrayTo;


// 球体中的一瓣子

__pkg__scope_bundle__.default= function (normal, cx, cy, cz, radius, num, index) {
    var points = [cx, cy + radius, cz], deg = Math.PI * 2 / num, point;

    if (normal) points.push(0, radius, 0);

    var copy2 = function () {
        mergeArrayTo(points, points.slice(points.length - (normal ? 12 : 6)));
    }

    for (var i = 1; i < num * 0.5; i++) {
        point = rotate(cx, cy, deg * i, cx, cy + radius);

        if (i > 1) copy2();

        // 第一个点
        var point1 = rotate(cx, cz, deg * index, point[0], cz);
        points.push(point1[0], point[1], point1[1]);

        if (normal) points.push(point1[0] - cx, point[1] - cy, point1[1] - cz);

        if (i > 1) copy2();

        // 下一个点
        var point2 = rotate(cx, cz, deg * (index + 1), point[0], cz);
        points.push(point2[0], point[1], point2[1]);

        if (normal) points.push(point2[0] - cx, point2[1] - cy, point2[1] - cz);
    }
    copy2();
    points.push(cx, cy - radius, cz);

    if (normal) points.push(0, - radius, 0);

    return points;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/Matrix4/index
/*****************************************************************/
window.__pkg__bundleSrc__['269']=function(){
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

__pkg__scope_args__=window.__pkg__getBundle('270');
var _move =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('271');
var _rotate =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('272');
var _scale =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('273');
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
window.__pkg__bundleSrc__['270']=function(){
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
window.__pkg__bundleSrc__['271']=function(){
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
window.__pkg__bundleSrc__['272']=function(){
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
window.__pkg__bundleSrc__['273']=function(){
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

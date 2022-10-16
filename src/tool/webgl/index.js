import { useShader } from './shader';
import { newBuffer, writeBuffer, useBuffer } from './buffer';
import { initTexture, linkImage, linkCube } from './texture';
import value from './value';
import painter from './painter';

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
export default function (node, opts) {
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

            // 视图窗口缩放设置
            "updateScale": function (value) {

                var viewWidth = gl.canvas.width * value;
                var viewHeight = gl.canvas.height * value;

                var elWidth = gl.canvas.width;
                var elHeight = gl.canvas.height;

                gl.viewport((elWidth - viewWidth) * 0.5, (elHeight - viewHeight) * 0.5, viewWidth, viewHeight);
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

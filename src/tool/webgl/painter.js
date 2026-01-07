export default function (gl) {

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

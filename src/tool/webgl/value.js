export default function (gl) {
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

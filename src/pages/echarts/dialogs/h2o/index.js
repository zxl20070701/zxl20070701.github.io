import template from './index.html';
import "./index.scss";

// 着色器
import vertexShader from './shader-vertex.c';
import fragmentShader from './shader-fragment.c';

import webglRender from '../../../../tool/webgl/index';
import cylinderFactory from '../../../../tool/geometry/cylinder';
import sphereFactory from '../../../../tool/geometry/sphere';
import Matrix4 from '../../../../tool/Matrix4/index';

export default function (obj, props) {

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
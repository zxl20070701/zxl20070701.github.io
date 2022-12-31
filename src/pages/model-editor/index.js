import template from './index.html';
import './index.scss';

import doResize from '../../tool/ResizeObserver';
import webglRender from '../../tool/webgl/index';
import Matrix4 from '../../tool/Matrix4/index';
import viewHandler from '../../tool/viewHandler';

import { mainView, directiveView } from './initModelValue';

// 记录着当前的模型数据
var modelValue = mainView();

// 着色器
import vertexShader from './shader-vertex.c';
import fragmentShader from './shader-fragment.c';

var doDraw;
export default function (obj) {
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

            // 启动画布监听
            var _this = this;
            var el = document.getElementById('main-view');

            // 绘制刻度尺的方法
            var drawAxis = this.renderAxisView();

            doResize(el, function () {
                _this.width = el.clientWidth;
                _this.height = el.clientHeight;

                setTimeout(function () {
                    _this.updateView(drawAxis);
                });

            });
        },
        methods: {

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
                var webgl = webglRender(document.getElementById('main-view-canvas'));
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
                var webgl = webglRender(document.getElementById('directive-view-canvas'));
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
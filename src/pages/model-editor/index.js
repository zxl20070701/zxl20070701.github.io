import template from './index.html';
import './index.scss';

import doResize from '../../tool/ResizeObserver';
import webglRender from '../../tool/webgl/index';

import { mainView, directiveView } from './initModelValue';

// 记录着当前的模型数据
var modelValue = [];

// 着色器
import vertexShader from './shader-vertex.c';
import fragmentShader from './shader-fragment.c';

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
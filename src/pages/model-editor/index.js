import template from './index.html';
import './index.scss';

import lazyDialogs from './dialogs/lazy-load';
import lazyWins from './wins/lazy-load';

import remove from '../../tool/xhtml/remove';
import doResize from '../../tool/ResizeObserver';
import webglRender from '../../tool/webgl/index';
import Matrix4 from '../../tool/Matrix4/index';
import viewHandler from '../../tool/viewHandler';
import { downloadJSON } from '../../tool/download';
import assemble from '../../tool/assemble';
import getColorFactory from '../../tool/webgl/getColorFactory';

import { mainView, axios } from './initModelValue';
import { UpToDown, DownToUp } from './methodChange';

import cylinderFactory from "../../tool/geometry/cylinder";
import sphereFactory from "../../tool/geometry/sphere";
import prismFactory from '../../tool/geometry/prism';

var geometry = {
    sphere: sphereFactory(),
    cylinder: cylinderFactory(),
    prism: prismFactory()
};

// 着色器
import vertexShader from './shader-vertex.c';
import fragmentShader from './shader-fragment.c';

// 标记当前无弹框
var noDialog = true;

export default function (obj) {
    var wins = {};

    var object3D = []; // 记录着当前的模型几何绘制

    var doDraw, stopDoResize;
    var doDraw_region, __regionList = {}, __getColor, __regionIndex = -1, __regionNeedUpdate = false;

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
            height: obj.ref(0),

            isMenuOpen: obj.reactive({}), // 菜单是否打开
        },
        mounted: function () {
            this.resetEditor();
            var _this = this;

            Promise.all([
                this.$openWin(lazyWins.geometry, {
                    addGeometry: function () {
                        _this.addGeometry.apply(_this, arguments)
                    }
                }),
                this.$openWin(lazyWins.modify)
            ]).then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    _this.initWin(data[i].instance._name, data[i]);
                }
            });
        },
        beforeDestory: function () {

            // 取消对画布大小改变的监听
            if (stopDoResize) stopDoResize();

            // 销毁所有的win窗口
            for (var winName in wins) {
                remove(wins[winName].el);
            }
            this.isMenuOpen = {};
            wins = {};
        },

        beforeUnfocus: function () {
            isFocus = false;

            // 关闭所有的win窗口
            for (var winName in wins) {
                if (this.isMenuOpen[winName]) {
                    wins[winName].el.style.display = "none";
                }
            }
        },

        focused: function () {
            isFocus = true;

            // 显示本来应该打开的窗口
            for (var winName in wins) {
                if (this.isMenuOpen[winName]) {
                    wins[winName].el.style.display = "";
                }
            }
        },

        methods: {

            // 新窗口初始化处理
            initWin: function (name, data) {
                wins[name] = data;
                this.isMenuOpen[name] = true;
            },

            triggleFile: function () {
                this._refs.file.value.click();
            },

            addGeometry: function (name, x, y, z) {
                this.$openDialog(lazyDialogs.geometry, {
                    kind: name,
                    name: "",
                    x: x,
                    y: y,
                    z: z
                }).then(function (data) {
                    var geometryData = geometry[name].apply(null, data.geometry);
                    var mesh = [];
                    for (var i = 0; i < geometryData.length; i++) {
                        mesh.push({
                            geometry: {
                                attributes: {
                                    position: {
                                        array: geometryData[i].points,
                                        count: geometryData[i].length,
                                        itemSize: 3
                                    }
                                },
                                type: DownToUp[geometryData[i].method]
                            },
                            material: {
                                color: {
                                    r: 0,
                                    g: 0,
                                    b: 0,
                                    alpha: 1
                                }
                            }
                        });
                    }

                    object3D.push({
                        region: data.name,
                        matrix: Matrix4(),
                        mesh: mesh
                    });

                    doDraw();
                });
            },

            doClick: function (event) {
                if (doDraw_region) {
                    if (__regionNeedUpdate) doDraw_region();
                    var regionIndex = __regionList[__getColor(event.offsetX, event.offsetY)] || -1;
                    if (regionIndex != __regionIndex) {
                        __regionIndex = regionIndex;
                        doDraw(true);

                        if (__regionIndex > 0) {
                            wins.modify.instance.initData({
                                name: object3D[regionIndex].region
                            }, {
                                save: function (data) {
                                    object3D[regionIndex].region = data.name;
                                },
                                delete: function () {
                                    object3D.splice(regionIndex, 1);
                                    __regionIndex = -1;
                                    doDraw();
                                }
                            });
                        } else {
                            wins.modify.instance.initData();
                        }

                    }
                }
            },

            // 导入本地文件
            inputLocalFile: function (event) {
                var i, files = event.target.files;

                var unsupportFile = "";
                for (i = 0; i < files.length; i++) {

                    // JSON文件
                    if (/\.json$/.test(files[i].name)) {
                        (function (file) {
                            var reader = new FileReader();
                            reader.onload = function () {
                                try {
                                    var resultObj = JSON.parse(reader.result);
                                    if (resultObj.type == "model-eidtor") {
                                        var _object3D = [object3D[0]];
                                        for (var j = 0; j < resultObj.value.length; j++) {
                                            resultObj.value[j].matrix = Matrix4(resultObj.value[j].matrix);
                                            _object3D.push(resultObj.value[j]);
                                        }
                                        object3D = _object3D;
                                    } else {
                                        alert("【" + files[i].name + "】不支持的JSON文件");
                                    }
                                    doDraw();
                                } catch (e) {
                                    alert("【" + files[i].name + "】文件解析出错了");
                                    console.error(e);
                                }
                            };

                            reader.readAsText(file, "utf-8");
                        })(files[i]);
                    } else {

                        // 标记还没有支持的
                        unsupportFile += files[i].name + ",";
                    }
                }

                // 如果存在还不支持的，提示一下
                if (unsupportFile.length > 0) {
                    alert('部分文件由于时间问题，目前不支持打开其格式：【 ' + (unsupportFile.replace(/\,$/, '')) + '】');
                }
            },

            // 导出
            exportFile: function () {

                noDialog = false;
                this.$openDialog(lazyDialogs.save, {
                    name: "model",
                }).then(function (data) {

                    var object3DArray = [];
                    for (var i = 1; i < object3D.length; i++) {
                        object3DArray.push({
                            region: object3D[i].region,
                            mesh: object3D[i].mesh,
                            matrix: object3D[i].matrix.value()
                        });
                    }

                    downloadJSON(data.name, {
                        type: "model-eidtor",
                        version: "0.1.0",
                        value: object3DArray
                    });

                }).finally(function () {
                    noDialog = true;
                });
            },

            // 新建
            resetEditor: function (event) {
                object3D = event ? [object3D[0]] : mainView();

                if (event) wins.modify.instance.initData();
                if (stopDoResize) stopDoResize();

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

                if (event) {
                    alert("新建成功！");
                }
            },

            // 根据模型数据进行绘制
            updateView: function (drawAxis) {

                //  当前缩放率
                var rateScale = 5;

                // 创建3d对象
                var webgl = webglRender(this._refs.mainView.value);
                webgl.updateScale(rateScale);

                // => 区域
                var webgl_region = webglRender(this._refs.mainView_region.value);
                webgl_region.updateScale(rateScale);

                // 启用着色器
                webgl.shader(vertexShader, fragmentShader);

                // => 区域
                webgl_region.shader(vertexShader, fragmentShader);

                // 初始化缓冲区
                var buffer = webgl.buffer();

                // => 区域
                var buffer_region = webgl_region.buffer();

                // 获取画笔并开启深度计算
                var painter = webgl.painter().openDeep();

                // => 区域
                var painter_region = webgl_region.painter().openDeep();

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
                doDraw = function (regionNotUpdate) {
                    drawAxis(matrix);

                    // 区域是否需要更新
                    __regionNeedUpdate = !regionNotUpdate;

                    // 相机矩阵
                    webgl.setUniformMatrix4fv('u_camera', Matrix4(matrix.value()).multiply([
                        xProportion, 0, 0, 0,
                        0, yProportion, 0, 0,
                        0, 0, zProportion, 0,
                        0, 0, 0, 1
                    ]).value());

                    for (var i = 0; i < object3D.length; i++) {

                        // 物体矩阵
                        webgl.setUniformMatrix4fv('u_matrix', object3D[i].matrix.value());

                        // 一个个绘制
                        for (var j = 0; j < object3D[i].mesh.length; j++) {

                            var itemValue = object3D[i].mesh[j];

                            // 设置颜色
                            if (__regionIndex == i) {
                                webgl.setUniform4f('u_color', 1, 1, 1, 1);
                            } else {
                                webgl.setUniform4f('u_color', itemValue.material.color.r, itemValue.material.color.g, itemValue.material.color.b, itemValue.material.color.alpha);
                            }

                            // 缓冲区写入数据并分配
                            buffer.write(new Float32Array(itemValue.geometry.attributes.position.array)).use('a_position', 3, 3, 0);

                            // 绘制
                            painter[UpToDown[itemValue.geometry.type]](0, itemValue.geometry.attributes.position.count);

                        }
                    }

                };

                // => 区域
                doDraw_region = function () {

                    // 相机矩阵
                    webgl_region.setUniformMatrix4fv('u_camera', Matrix4(matrix.value()).multiply([
                        xProportion, 0, 0, 0,
                        0, yProportion, 0, 0,
                        0, 0, zProportion, 0,
                        0, 0, 0, 1
                    ]).value());

                    var regionAssemble = assemble(0, 1, 0.2, 3);
                    __regionList = {};

                    for (var i = 1; i < object3D.length; i++) {

                        // 物体矩阵
                        webgl_region.setUniformMatrix4fv('u_matrix', object3D[i].matrix.value());

                        // 设置颜色
                        var regionColor = regionAssemble();

                        __regionList["rgba(" + regionColor[0] * 255 + "," + regionColor[1] * 255 + "," + regionColor[2] * 255 + "," + 255 + ")"] = i
                        webgl_region.setUniform4f('u_color', regionColor[0], regionColor[1], regionColor[2], 1);

                        // 一个个绘制
                        for (var j = 0; j < object3D[i].mesh.length; j++) {

                            var itemValue = object3D[i].mesh[j];

                            // 缓冲区写入数据并分配
                            buffer_region.write(new Float32Array(itemValue.geometry.attributes.position.array)).use('a_position', 3, 3, 0);

                            // 绘制
                            painter_region[UpToDown[itemValue.geometry.type]](0, itemValue.geometry.attributes.position.count);
                        }
                    }

                    __getColor = getColorFactory(webgl_region._gl_);
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

                    } else if (data.type == 'lookDown') {

                    } else if (data.type == 'lookLeft') {

                    } else if (data.type == 'lookRight') {

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
                var webgl = webglRender(this._refs.axios.value);
                webgl.shader(vertexShader, fragmentShader);
                var buffer = webgl.buffer();
                var painter = webgl.painter().openDeep();

                webgl.setUniformMatrix4fv('u_matrix', Matrix4().value());

                webgl.updateScale(3);

                var axisValue = axios();

                // 返回绘制方法由主流程控制
                return function (matrix) {
                    setTimeout(function () {
                        webgl.setUniformMatrix4fv('u_camera', matrix.value());
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
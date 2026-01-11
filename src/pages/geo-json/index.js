import template from './index.html';
import './index.scss';

import getBoundary from '../../tool/map/getBoundary';
import canvasRender from '../../tool/canvas/index';
import eoapFactory from '../../tool/map/eoap';
import drawGeometry from '../../tool/map/drawGeometry';

export default function (obj) {

    return {
        name: "geo-json",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "geoJSON查看器" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './geoJSON.png');
        },

        methods: {

            openDownload: function () {
                this.$openView("browser", {
                    url: "http://datav.aliyun.com/portal/school/atlas/area_selector"
                });
            },

            triggleFile: function () {
                this._refs.file.value.click();
            },

            inputLocalFile: function (event, target) {
                var _this = this;

                var file = target.files[0];
                var reader = new FileReader();

                reader.onload = function () {

                    try {
                        var geoJSON = JSON.parse(reader.result);
                        var boundary = getBoundary(geoJSON);

                        var painter = canvasRender(_this._refs.mycanvas.value, 800, 600);
                        var eoap = eoapFactory({
                            scale: Math.min(420 / (boundary.maxX - boundary.minX), 300 / (boundary.maxY - boundary.minY)),
                            center: [(boundary.minX + boundary.maxX) * 0.5, (boundary.minY + boundary.maxY) * 0.5]
                        });

                        var i, cx = 400, cy = 300;

                        // 绘制区域

                        painter.config({
                            strokeStyle: "#555555",
                            fillStyle: "white"
                        });

                        for (var i = 0; i < geoJSON.features.length; i++) {
                            drawGeometry(eoap, painter, cx, cy, geoJSON.features[i].geometry);
                        }

                        // 绘制名称

                        painter.config({
                            textAlign: "center",
                            fillStyle: "black",
                            "fontSize": 10
                        });

                        var dxy;
                        for (var i = 0; i < geoJSON.features.length; i++) {
                            if (Array.isArray(geoJSON.features[i].properties.center)) {
                                dxy = eoap(geoJSON.features[i].properties.center[0], geoJSON.features[i].properties.center[1]);
                                painter.fillText(geoJSON.features[i].properties.name, cx + dxy[0], cy + dxy[1]);
                            }
                        }

                    } catch (e) {
                        console.error(e);
                        alert('出现错误导致程序执行中断，你可以带着当前使用的GeoJSON去（ ' + window._project_.bugs + ' ）给我们留言。');
                    }
                };

                reader.readAsText(file);
            }
        }
    };
};
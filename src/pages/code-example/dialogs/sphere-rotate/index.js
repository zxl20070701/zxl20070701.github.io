import template from './index.html';
import "./index.scss";

import createSphereVertices from "../../../../tool/cardSphere/createSphereVertices"
import xhr from '../../../../tool/xhr/index';

export default function (obj, props) {

    return {
        name: "code-example",
        render: template,
        data: {
            srcUrl: props.srcUrl
        },
        mounted: function () {
            var _this = this;

            xhr({
                method: "GET",
                url: "../data/animation.json"
            }, function (res) {
                if (res.status == 200) {
                    var data = JSON.parse(res.data);
                    _this.initSphere(data);
                }
            });

        },
        methods: {
            initSphere: function (names) {
                var stage = this._refs.mycontent.value.querySelector('.globe-stage');
                var radius = 200;
                var points = createSphereVertices(names.length, radius);

                // 创建卡片元素并定位到球面上
                names.forEach(function (name, i) {
                    var card = document.createElement('div');
                    card.className = 'card';
                    card.textContent = name;
                    var p = points[i];
                    card.style.transform = 'translate3d(' + p.x + 'px,' + p.y + 'px,' + p.z + 'px) rotateY(' + p.rotationY + 'deg) rotateX(' + p.rotationX + 'deg)';
                    card.style.marginLeft = '-50px';
                    card.style.marginTop = '-14px';
                    card.style.width = 'fit-content';
                    stage.appendChild(card);
                });

                // 使用 requestAnimationFrame 实现持续旋转
                var angleX = 0;
                var angleY = 0;

                function animate() {
                    angleY += 0.3;
                    // angleX += 0.1;
                    stage.style.transform = 'rotateX(' + angleX + 'deg) rotateY(' + angleY + 'deg)';
                    requestAnimationFrame(animate);
                }

                animate();
            }
        }

    };
};

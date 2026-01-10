import Matrix4 from "../../tool/Matrix4/index";
import cylinderFactory from "../../tool/geometry/cylinder";
import sphereFactory from "../../tool/geometry/sphere";

import { DownToUp } from "./methodChange";

var sphere = sphereFactory(), cylinder = cylinderFactory();

// 主视图
export var mainView = function () {

    var modelValue = [{
        geometry: {
            attributes: {
                position: {
                    array: [],
                    count: 0,
                    itemSize: 3
                }
            },
            type: "LINES"
        },
        material: {
            color: {
                r: 0.5,
                g: 0.5,
                b: 0.5,
                alpha: 1
            }
        }
    }, {
        geometry: {
            attributes: {
                position: {
                    array: [],
                    count: 0,
                    itemSize: 3
                }
            },
            type: "LINES"
        },
        material: {
            color: {
                r: 0.8,
                g: 0.8,
                b: 0.8,
                alpha: 1
            }
        }
    }];

    for (var i = 0; i <= 25; i++) {

        // 深色线
        if (i % 5 == 0) {
            modelValue[0].geometry.attributes.position.array.push(

                // 横
                // [-1,0,-1+(2/25)*i]
                -1, 0, 0.08 * i - 1,
                1, 0, 0.08 * i - 1,

                // 竖
                0.08 * i - 1, 0, -1,
                0.08 * i - 1, 0, 1
            );
        }

        // 浅色线
        else {
            modelValue[1].geometry.attributes.position.array.push(
                -1, 0, 0.08 * i - 1,
                1, 0, 0.08 * i - 1,
                0.08 * i - 1, 0, -1,
                0.08 * i - 1, 0, 1
            );
        }

    }

    modelValue[0].geometry.attributes.position.count = modelValue[0].geometry.attributes.position.array.length / 3;
    modelValue[1].geometry.attributes.position.count = modelValue[1].geometry.attributes.position.array.length / 3;

    var object3D = [{
        region: "Axios",
        matrix: Matrix4(),
        mesh: modelValue
    }];

    var geometryOral = [];

    // 氢原子
    geometryOral.push([sphere(-0.7, 0, 0, 0.36), [0.6, 0.6, 0.6, 1.0]]);
    geometryOral.push([sphere(0.7, 0, 0, 0.36), [0.6, 0.6, 0.6, 1.0]]);

    // 氧原子
    geometryOral.push([sphere(0, 0.7, 0, 0.5), [1, 0.2, 0.2, 1.0]]);

    // 化学键（左）
    geometryOral.push([cylinder(-0.7, 0, 0, 0.16, 0, 0.7, 0), [0.2, 0.3, 0.1, 0.4]]);

    // 化学键（右）
    geometryOral.push([cylinder(0.7, 0, 0, 0.16, 0, 0.7, 0), [0.2, 0.3, 0.1, 0.4]]);

    for (var i = 0; i < geometryOral.length; i++) {
        var mesh = []
        for (var j = 0; j < geometryOral[i][0].length; j++) {
            mesh.push({
                geometry: {
                    attributes: {
                        position: {
                            array: geometryOral[i][0][j].points,
                            count: geometryOral[i][0][j].length,
                            itemSize: 3
                        }
                    },
                    type: DownToUp[geometryOral[i][0][j].method]
                },
                material: {
                    color: {
                        r: geometryOral[i][1][0],
                        g: geometryOral[i][1][1],
                        b: geometryOral[i][1][2],
                        alpha: geometryOral[i][1][3]
                    }
                }
            });
        }

        object3D.push({
            region: "H2O#" + i,
            matrix: Matrix4().scale(0.5, 0.5, 0.5, 0, 0, 0),
            mesh: mesh
        });
    }

    return object3D;
};

// 方向图标
export var axios = function () {

    return [

        // X轴承
        {
            length: 2,
            method: "lines",
            points: [-1.3, 0, 0, 1.3, 0, 0],
            color: [1, 0, 0, 1]
        }, {
            length: 6,
            method: "fanTriangles",
            points: [
                2, 0, 0,
                1.25, 0.3, 0.3,
                1.25, -0.3, 0.3,
                1.25, -0.3, -0.3,
                1.25, 0.3, -0.3,
                1.25, 0.3, 0.3
            ],
            color: [1, 0, 0, 1]
        },

        // Y轴承
        {
            length: 2,
            method: "lines",
            points: [0, -1.3, 0, 0, 1.3, 0],
            color: [0, 1, 0, 1]
        }, {
            length: 6,
            method: "fanTriangles",
            points: [
                0, 2, 0,
                0.3, 1.25, 0.3,
                -0.3, 1.25, 0.3,
                -0.3, 1.25, -0.3,
                0.3, 1.25, -0.3,
                0.3, 1.25, 0.3,
            ],
            color: [0, 1, 0, 1]
        },

        // Z轴承
        {
            length: 2,
            method: "lines",
            points: [0, 0, -1.3, 0, 0, 1.3],
            color: [0, 0, 1, 1]
        }, {
            length: 6,
            method: "fanTriangles",
            points: [
                0, 0, 2,
                0.3, 0.3, 1.25,
                -0.3, 0.3, 1.25,
                -0.3, -0.3, 1.25,
                0.3, -0.3, 1.25,
                0.3, 0.3, 1.25
            ],
            color: [0, 0, 1, 1]
        }
    ];

};
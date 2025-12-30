import { initConfig } from '../config';
import move from './move';
import rotate from './rotate';
import scale from './scale';

export default function (config) {

    config = initConfig({
        // 前进方向
        d: [1, 1],
        // 中心坐标
        c: [0, 0],
        // 当前位置
        p: [0, 0]
    }, config);

    var dotObj = {

        // 前进方向以当前位置为中心，旋转deg度
        "rotate": function (deg) {
            var dPx = config.d[0] + config.p[0], dPy = config.d[1] + config.p[1];
            var dP = rotate(config.p[0], config.p[1], deg, dPx, dPy);
            config.d = [
                dP[0] - config.p[0],
                dP[1] - config.p[1]
            ];
            return dotObj;
        },

        // 沿着当前前进方向前进d
        "move": function (d) {
            config.p = move(config.d[0], config.d[1], d, config.p[0], config.p[1]);
            return dotObj;
        },

        // 围绕中心坐标缩放
        "scale": function (times) {
            config.p = scale(config.c[0], config.c[1], times, config.p[0], config.p[1]);
            return dotObj;
        },

        // 当前位置
        "value": function () {
            return config.p;
        }

    };

    return dotObj;
};
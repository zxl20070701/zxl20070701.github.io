import getOption from "./option";
import { mergeArrayTo } from "../Array";
import rotateLineFactory from "./tool/rotateLine";
import prismHorizontal from "./tool/prism-horizontal";
import prismVertical from "./tool/prism-vertical";

export default function (option) {
    var __option = getOption(option);

    // 棱柱体
    return function (x, y, z, radius, x2, y2, z2, num) {
        var height, rotateLine = null;

        if (arguments.length == 6) {
            height = x2;
            num = y2;
        } else {
            height = (y > y2 ? -1 : 1) * Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y) + (z2 - z) * (z2 - z));
            rotateLine = rotateLineFactory(x, y, z, x2, y2, z2);
        }

        var result = [{
            name: "bottom",
            points: [],
            length: 0,
            method: "triangles"
        }, {
            name: "top",
            points: [],
            length: 0,
            method: "triangles"
        }, {
            name: "side",
            points: [],
            length: 0,
            method: "triangles"
        }];

        // 绘制底部的盖子
        mergeArrayTo(result[0].points, prismHorizontal(__option.normal, x, y, z, radius, num, height > 0 ? -1 : 1));

        // 绘制顶部的盖子
        mergeArrayTo(result[1].points, prismHorizontal(__option.normal, x, y + height, z, radius, num, height > 0 ? 1 : -1));

        // 绘制侧边部分
        mergeArrayTo(result[2].points, prismVertical(__option.normal, x, y, z, radius, height, num));

        for (var i = 0; i < result.length; i++) {
            if (rotateLine) {

                var points = [];
                var isNormal = false;
                for (var index = 0; index < result[i].points.length; index += 3) {
                    mergeArrayTo(points, rotateLine(result[i].points[index], result[i].points[index + 1], result[i].points[index + 2], (__option.normal) && isNormal));
                    isNormal = !isNormal;
                }
                result[i].points = points;
            }
            result[i].length = result[i].points.length / (__option.normal ? 6 : 3);
        }

        return result;

    };
};
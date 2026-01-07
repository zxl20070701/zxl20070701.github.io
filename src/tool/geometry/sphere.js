import getOption from "./option";
import { mergeArrayTo } from "../Array";
import sphereFragment from "./tool/sphere-fragment";
import { splitNum } from "./tool/circle";

export default function (option) {
    var __option = getOption(option);

    // 球体
    return function (cx, cy, cz, radius) {

        // 求解出需要切割多少份比较合理
        var num = splitNum(__option.precision, radius);

        // 然后一瓣瓣的绘制
        var result = [{
            name: "surface",
            points: [],
            length: 0,
            method: "triangles"
        }];
        for (var i = 0; i < num; i++) {
            mergeArrayTo(result[0].points, sphereFragment(__option.normal, cx, cy, cz, radius, num, i));
        }

        result[0].length = result[0].points.length / (__option.normal ? 6 : 3);
        return result;
    };
};
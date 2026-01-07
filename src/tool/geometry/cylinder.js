import getOption from "./option";
import { splitNum } from "./tool/circle";
import prism from "./prism";

export default function (option) {
    var __option = getOption(option);

    // 圆柱体
    return function (x, y, z, radius, x2, y2, z2) {
        // 求解出需要切割多少份比较合理
        var num = splitNum(__option.precision, radius);

        if (arguments.length == 5) {
            return prism(option)(x, y, z, radius, x2, num);
        } else {
            return prism(option)(x, y, z, radius, x2, y2, z2, num);
        }
    };
};
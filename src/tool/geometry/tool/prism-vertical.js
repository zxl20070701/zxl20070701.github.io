import rotate from '../../transform/rotate';
import { mergeArrayTo } from '../../Array';

// 棱柱垂直部分

export default function (normal, x, y, z, radius, height, num) {
    var points = [], beginPosition;

    if (num == 4) {
        beginPosition = rotate(x, z, Math.PI * 0.25, x - radius, z);
    } else {
        beginPosition = [x + radius, z];
    }

    var deg = Math.PI * 2 / num, degHalf = Math.PI * 2 / (num * 2);

    var endPosition, normalPosition = [];
    for (var i = 0; i < num; i++) {

        endPosition = rotate(x, z, deg, beginPosition[0], beginPosition[1]);

        if (normal) {
            var halfPosition = rotate(x, z, degHalf, beginPosition[0], beginPosition[1]);
            normalPosition = [halfPosition[0], 0, halfPosition[1]];
        }

        mergeArrayTo(points, beginPosition[0], y, beginPosition[1], normalPosition)
        mergeArrayTo(points, beginPosition[0], y + height, beginPosition[1], normalPosition);
        mergeArrayTo(points, endPosition[0], y + height, endPosition[1], normalPosition);

        mergeArrayTo(points, beginPosition[0], y, beginPosition[1], normalPosition);
        mergeArrayTo(points, endPosition[0], y, endPosition[1], normalPosition);
        mergeArrayTo(points, endPosition[0], y + height, endPosition[1], normalPosition);

        beginPosition = endPosition;
    }

    return points;
};

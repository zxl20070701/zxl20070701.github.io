import rotate from '../../transform/rotate';

// 棱柱水平部分

export default function (normal, x, y, z, radius, num, d) {

    var beginX, beginZ;
    if (num == 4) {
        var temp = radius / 1.414;
        beginX = x + temp;
        beginZ = z + temp;

    } else {
        beginX = x + radius;
        beginZ = z;
    }

    var point = [beginX, beginZ];
    var points = [];
    var deg = Math.PI * 2 / num;
    for (var i = 0; i < num; i++) {

        points.push(x, y, z);
        if (normal) points.push(0, d, 0);

        points.push(point[0], y, point[1]);
        if (normal) points.push(0, d, 0);

        point = rotate(x, z, deg * (i + 1), beginX, beginZ);
        points.push(point[0], y, point[1]);
        if (normal) points.push(0, d, 0);
    }

    return points;
};

export default function (deep) {

    var distDeep = 1 / 6;

    var r, g, b;
    if (deep <= distDeep) {

        r = 255;
        g = 0;
        b = deep / distDeep * 255;

    } else if (deep <= 2 * distDeep) {

        r = (distDeep * 2 - deep) / distDeep * 255;
        g = 0;
        b = 255;

    } else if (deep <= 3 * distDeep) {

        r = 0;
        g = (deep - 2 * distDeep) / distDeep * 255;
        b = 255;

    } else if (deep <= 4 * distDeep) {

        r = 0;
        g = 255;
        b = (distDeep * 4 - deep) / distDeep * 255;

    } else if (deep <= 5 * distDeep) {

        r = (deep - distDeep * 4) / distDeep * 255;
        g = 255;
        b = 0;

    } else {

        r = 255;
        g = (distDeep * 6 - deep) / distDeep * 255;
        b = 0;

    }

    return [+r.toFixed(0), +g.toFixed(0), +b.toFixed(0)];
};

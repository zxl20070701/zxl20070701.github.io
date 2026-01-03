export default function (r, g, b) {

    var distDeep = 1 / 6;

    if (r == 255 && g == 0) {
        return b / 255 * distDeep;
    } else if (g == 0 && b == 255) {
        return 2 * distDeep - r / 255 * distDeep;
    } else if (r == 0 && b == 255) {
        return 2 * distDeep + g / 255 * distDeep;
    } else if (r == 0 && g == 255) {
        return 4 * distDeep - b / 255 * distDeep;
    } else if (g == 255 && b == 0) {
        return 4 * distDeep + r / 255 * distDeep;
    } else {
        return 6 * distDeep - g / 255 * distDeep;
    }

};

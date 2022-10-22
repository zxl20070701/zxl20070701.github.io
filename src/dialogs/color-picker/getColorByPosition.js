export default function (r, g, b, x, y) {

    var width = 300, height = 160;

    // X方向
    var _r = x / width * (r - 255) + 255;
    var _g = x / width * (g - 255) + 255;
    var _b = x / width * (b - 255) + 255;

    // Y方向
    _r = (160 - y) / height * _r;
    _g = (160 - y) / height * _g;
    _b = (160 - y) / height * _b;

    return [_r.toFixed(0), _g.toFixed(0), _b.toFixed(0)];
};

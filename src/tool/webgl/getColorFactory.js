export default function (painter) {
    var width = painter.drawingBufferWidth, height = painter.drawingBufferHeight;

    var pixels = new Uint8Array(
        4 * width * height
    );
    painter.readPixels(
        0,
        0,
        width,
        height,
        painter.RGBA,
        painter.UNSIGNED_BYTE,
        pixels
    );

    return function (x, y) {
        y = height - y;

        var pixelR = pixels[4 * (y * width + x)];
        var pixelG = pixels[4 * (y * width + x) + 1];
        var pixelB = pixels[4 * (y * width + x) + 2];
        var pixelA = pixels[4 * (y * width + x) + 3];

        return "rgba(" + pixelR + "," + pixelG + "," + pixelB + "," + pixelA + ")";
    };
};
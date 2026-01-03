export default function (image, left, top, width, height) {
    left = left || 0;
    top = top || 0;
    width = width || image.width;
    height = height || image.height;

    var canvas = document.createElement('canvas');

    canvas.setAttribute('width', width + "");
    canvas.setAttribute('height', height + "");

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    var painter = canvas.getContext('2d');
    painter.drawImage(image, 0, 0, image.width, image.height, left, top, image.width, image.height);

    return canvas;
};
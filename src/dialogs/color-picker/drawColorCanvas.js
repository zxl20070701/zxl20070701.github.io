import getColorByPosition from "./getColorByPosition";

export default function (painter, r, g, b) {
    var width = 300, height = 160;

    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {

            var rgb = getColorByPosition(r, g, b, i, j);

            painter.fillStyle = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
            painter.fillRect(i, j, 1, 1);

        }
    }

};

export default function (map, painter, cx, cy, coordinates) {
    var i, dxy;

    painter.beginPath();
    for (i = 0; i < coordinates.length; i++) {
        dxy = map(coordinates[i][0], coordinates[i][1]);
        painter.lineTo(cx + dxy[0], cy + dxy[1]);
    }
};
import drawPolygon from "./drawPolygon";

export default function (map, painter, cx, cy, geometry) {
    var i, j;

    if (geometry.type == 'Polygon') {
        for (j = 0; j < geometry.coordinates.length; j++) {
            drawPolygon(map, painter, cx, cy, geometry.coordinates[j]);
            painter.closePath().full();
        }
    } else if (geometry.type == 'MultiLineString') {
        for (j = 0; j < geometry.coordinates.length; j++) {
            drawPolygon(map, painter, cx, cy, geometry.coordinates[j]);
            painter.stroke();
        }
    } else if (geometry.type == 'MultiPolygon') {
        for (i = 0; i < geometry.coordinates.length; i++) {
            for (j = 0; j < geometry.coordinates[i].length; j++) {
                drawPolygon(map, painter, cx, cy, geometry.coordinates[i][j]);
                painter.closePath().full();
            }
        }
    } else {
        throw new Error('不支持的几何类型：' + geometry.type);
    }
};
var calcMultiPolygon = function (data) {

    var minX = data[0][0][0][0],
        maxX = data[0][0][0][0],
        minY = data[0][0][0][1],
        maxY = data[0][0][0][1],
        i,
        temp;

    for (i = 0; i < data.length; i++) {
        temp = calcPolygon(data[i]);

        if (temp.minX < minX) minX = temp.minX;
        if (temp.maxX > maxX) maxX = temp.maxX;
        if (temp.minY < minY) minY = temp.minY;
        if (temp.maxY > maxY) maxY = temp.maxY;

    }

    return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY
    };

};

var calcPolygon = function (data) {

    var minX = data[0][0][0],
        maxX = data[0][0][0],
        minY = data[0][0][1],
        maxY = data[0][0][1],
        i,
        j;

    for (i = 0; i < data.length; i++) {
        for (j = 0; j < data[i].length; j++) {

            if (minX > data[i][j][0]) minX = data[i][j][0];
            else if (maxX < data[i][j][0]) maxX = data[i][j][0];

            if (minY > data[i][j][1]) minY = data[i][j][1];
            else if (maxY < data[i][j][1]) maxY = data[i][j][1];

        }
    }

    return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY
    };

};

var calcFeatureCollection = function (data) {

    var temp = calcFeature(data.features[0]),
        minX = temp.minX,
        maxX = temp.maxX,
        minY = temp.minY,
        maxY = temp.maxY,
        i,
        temp;

    for (i = 1; i < data.features.length; i++) {
        temp = calcFeature(data.features[i]);

        if (temp.minX < minX) minX = temp.minX;
        if (temp.maxX > maxX) maxX = temp.maxX;
        if (temp.minY < minY) minY = temp.minY;
        if (temp.maxY > maxY) maxY = temp.maxY;
    }

    return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY
    };

};

var calcFeature = function (data) {

    if (data.geometry.type == 'Polygon' || data.geometry.type == 'MultiLineString') {
        return calcPolygon(data.geometry.coordinates);
    } else {
        return calcMultiPolygon(data.geometry.coordinates);
    }

};

export default function (data) {

    if (data.type == 'FeatureCollection') {
        return calcFeatureCollection(data);
    } else if (data.type == 'Feature') {
        return calcFeature(data);
    } else {
        throw new Error('Type error：不是一个合法的geoJSON数据!');
    }

};
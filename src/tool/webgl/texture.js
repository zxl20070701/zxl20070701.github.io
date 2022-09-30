/**
 * 纹理方法
 * --------------------------------------------
 * 在绘制的多边形上贴图
 * 丰富效果
 */

// 初始化一个纹理对象
// type有gl.TEXTURE_2D代表二维纹理，gl.TEXTURE_CUBE_MAP 立方体纹理等
export var initTexture = function (gl, type, unit, _type_) {
    // 创建纹理对象
    var texture = gl.createTexture();

    if (_type_ == '2d') {
        unit = unit || 0;
        // 开启纹理单元，unit表示开启的编号
        gl.activeTexture(gl['TEXTURE' + unit]);
    }

    // 绑定纹理对象到目标上
    gl.bindTexture(type, texture);
    return texture;
};

// 链接资源图片
// level默认传入0即可，和金字塔纹理有关
// format表示图像的内部格式：
//      gl.RGB(红绿蓝)
//      gl.RGBA(红绿蓝透明度)
//      gl.ALPHA(0.0,0.0,0.0,透明度)
//      gl.LUMINANCE(L、L、L、1L:流明)
//      gl.LUMINANCE_ALPHA(L、L、L,透明度)
// textureType表示纹理数据的格式：
//      gl.UNSIGNED_BYTE: 表示无符号整形，每一个颜色分量占据1字节
//      gl.UNSIGNED_SHORT_5_6_5: 表示RGB，每一个分量分别占据占据5, 6, 5比特
//      gl.UNSIGNED_SHORT_4_4_4_4: 表示RGBA，每一个分量分别占据占据4, 4, 4, 4比特
//      gl.UNSIGNED_SHORT_5_5_5_1: 表示RGBA，每一个分量分别占据占据5比特，A分量占据1比特
export var linkImage = function (gl, type, level, format, textureType, image) {
    format = {
        "rgb": gl.RGB,
        "rgba": gl.RGBA,
        "alpha": gl.ALPHA
    }[format] || gl.RGBA;

    gl.texImage2D(type, level || 0, format, format, {

        // 目前一律采用默认值，先不对外提供修改权限

    }[textureType] || gl.UNSIGNED_BYTE, image);
};

export var linkCube = function (gl, type, level, format, textureType, images, width, height, texture) {
    format = {
        "rgb": gl.RGB,
        "rgba": gl.RGBA,
        "alpha": gl.ALPHA
    }[format] || gl.RGBA;

    level = level || 0;

    textureType = {

        // 目前一律采用默认值，先不对外提供修改权限

    }[textureType] || gl.UNSIGNED_BYTE;

    var types = [
        gl.TEXTURE_CUBE_MAP_POSITIVE_X,//右
        gl.TEXTURE_CUBE_MAP_NEGATIVE_X,//左
        gl.TEXTURE_CUBE_MAP_POSITIVE_Y,//上
        gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,//下
        gl.TEXTURE_CUBE_MAP_POSITIVE_Z,//后
        gl.TEXTURE_CUBE_MAP_NEGATIVE_Z//前
    ], i, target;

    for (i = 0; i < types.length; i++) {
        target = types[i];
        gl.texImage2D(target, level, format, width, height, 0, format, textureType, null);
        gl.bindTexture(type, texture);
        gl.texImage2D(target, level, format, format, textureType, images[i]);
    }

    gl.generateMipmap(type);

};

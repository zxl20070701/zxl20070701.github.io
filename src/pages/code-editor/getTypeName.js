import mimeTypes from '../../../nodejs/mime.types';

export default function (name) {
    var typeName = name.split('.').pop().toLowerCase();

    // 特殊类型
    if (['html', 'css', 'js', 'json', 'scss', 'sass'].indexOf(typeName) > -1) {
        return typeName;
    }

    // 余下的由类型文件判断
    else {

        typeName = (mimeTypes[typeName] || "").split('/')[0];
        if (['image'].indexOf(typeName) > -1) {
            return typeName;
        }

    }

};
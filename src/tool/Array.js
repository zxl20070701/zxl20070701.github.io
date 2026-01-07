// 合并数组到第一个
export var mergeArrayTo = function (targetArray) {
    var sourceArray;
    for (var i = 1; i < arguments.length; i++) {
        sourceArray = arguments[i];
        if (Array.isArray(sourceArray)) {
            for (var j = 0; j < sourceArray.length; j++) {
                targetArray.push(sourceArray[j]);
            }
        } else {
            targetArray.push(sourceArray);
        }
    }
};
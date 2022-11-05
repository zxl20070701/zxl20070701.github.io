
// 判断一行是否匹配

var euqalLine = function (line1, line2) {
    if (line1.length != line2.length) return false;
    for (var i = 0; i < line1.length; i++) {
        if (line1[i].content != line2[i].content || line1[i].color != line2[i].color) return false;
    }
    return true;
};

/**
 * 为了加速页面渲染，我们引入差异对比
 * 简单的理解就是：
 * 原本在数据改变的时候直接更新整个DOM的方式替换成只功能必要的DOM
 */

export default function (newFormatData) {

    /**
     * 思路：
     * 
     * 从开始匹配无法匹配的，匹配条个数记作beginNum
     * 再从结尾匹配无法匹配的，匹配条个数记作endNum
     * 只有begin和end之间的数据需要更新DOM
     * 
     * 当然，也有特殊情况，因此在进行回归前，先把特殊情况提取处理
     * 
     */

    var oldFormatData = this.__formatData;

    if (oldFormatData) {
        // 寻找开始匹配行数
        var beginNum = 0;
        for (var i = 0; i < oldFormatData.length && i < newFormatData.length; i++) {
            if (!euqalLine(oldFormatData[i], newFormatData[i])) {
                break;
            }
            beginNum += 1;
        }

        // 寻找结束匹配行数
        var endNum = 0;
        for (var i = 1; i <= oldFormatData.length && i <= newFormatData.length; i++) {
            if (!euqalLine(oldFormatData[oldFormatData.length - i], newFormatData[newFormatData.length - i])) {
                break;
            }
            endNum += 1;
        }

        var minLength = Math.min(oldFormatData.length, newFormatData.length);

        // 校对(如果复用重叠了)
        if (beginNum + endNum >= minLength) {
            endNum = minLength - beginNum - 1;

            // 由于不知道是删除还是增加，因此可能出现负数
            if (endNum < 0) endNum = 0;
        }

        // 对比以后的差异信息
        this.__diff = {
            beginNum,
            endNum
        };

    }

    return newFormatData;
};

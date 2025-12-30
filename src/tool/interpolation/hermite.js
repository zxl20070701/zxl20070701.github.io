export default function (u) {

    // 张弛系数
    if (arguments.length < 1) u = 0.5;

    var MR, a, b;

    /**
     * 根据x值返回y值
     * @param {Number} x
     */
    var hermite = function (x) {
        if (MR) {
            var sx = (x - a) / (b - a),
                sx2 = sx * sx,
                sx3 = sx * sx2;
            var sResult = sx3 * MR[0] + sx2 * MR[1] + sx * MR[2] + MR[3];
            return sResult * (b - a);
        } else throw new Error('You shoud first set the position!');
    };

    /**
     * 设置点的位置
     * @param {Number} x1 左边点的位置
     * @param {Number} y1
     * @param {Number} x2 右边点的位置
     * @param {Number} y2
     * @param {Number} s1 两个点的斜率
     * @param {Number} s2
     */
    hermite.setP = function (x1, y1, x2, y2, s1, s2) {
        if (x1 < x2) {
            // 记录原始尺寸
            a = x1; b = x2;
            var p3 = u * s1,
                p4 = u * s2;
            // 缩放到[0,1]定义域
            y1 /= (x2 - x1);
            y2 /= (x2 - x1);
            // MR是提前计算好的多项式通解矩阵
            // 为了加速计算
            // 如上面说的
            // 统一在[0,1]上计算后再通过缩放和移动恢复
            // 避免了动态求解矩阵的麻烦
            MR = [
                2 * y1 - 2 * y2 + p3 + p4,
                3 * y2 - 3 * y1 - 2 * p3 - p4,
                p3,
                y1
            ];
        } else throw new Error('The point x-position should be increamented!');
        return hermite;
    };

    return hermite;
};

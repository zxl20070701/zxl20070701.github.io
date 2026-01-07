export default function (points) {
    points.push(points[0]);

    // 环绕数法
    // 以某一点做水平向右的射线，
    // 如果多边形的某条边的从下往上穿过该射线，则环绕数加一；
    // 如果多边形的某条边的从上往下穿过该射线，则环绕数减一；
    // 最终的环绕数如果不为 0 则该点在多边形内部，否则在多边形的外部。

    var count = 0;
    for (var index = 0; index < points.length - 1; index++) {

        var A = points[index], B = points[index + 1];

        // 重合的点可以忽略
        if (A[0] == B[0] && A[1] == B[1]) continue;

        // 先判断是否和当前线段相交（如果不相交，忽略）
        // 相交的第一步是，P点在垂直方向上位于AB之间
        if ((A[1] - this.y) * (B[1] - this.y) < 0) {

            // AB和P射线的焦点记为C(x,y)
            // 由AB和AC平行，且C的y值和P一样可以得到
            var C = [
                A[0] + (B[0] - A[0]) * (this.y - A[1]) / (B[1] - A[1]),
                this.y
            ];

            // 如果相交
            if (C[0] > this.x) {

                // 现在可以确定，这个P这个射线一定被线段击中了，接下来，需要确定击中的方向

                // 如果是从下往上穿
                if (A[1] < B[1]) {
                    count += 1;
                }

                // 否则就是从上往下穿
                else {
                    count -= 1;
                }

            }

        }
    }

    return count != 0;
};
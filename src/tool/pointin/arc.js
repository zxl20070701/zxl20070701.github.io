// 判断第二个弧度是否大于第一个
// 范围：[0,2PI)
var compareDeg = function (sin1, cos1, sin2, cos2) {

    // 先根据sin值把弧度分为0～PI和PI～2PI区间，如果不在一个区间，大小可以立刻判断
    if (sin2 > 0 && sin1 < 0) return false;
    else if (sin2 < 0 && sin1 > 0) return true;

    // 如果都在0～PI区间，根据cos，cos谁大谁小
    else if (sin2 > 0 && sin1 > 0) {
        return cos2 < cos1;
    }

    // 如果都在PI～2PI区间，根据cos，cos谁大谁大
    else if (sin2 < 0 && sin1 < 0) {
        return cos2 > cos1;
    }

    // sin2和sin1都不为0的情况判断了，接下来看看为0的情况

    // 都为0时，根据cos，cos谁大谁小
    else if (sin2 == 0 && sin1 == 0) {
        return cos2 < cos1;
    }

    // 只有sin2为0时，如果sin1<0则false，否则根据cos，cos谁大谁小
    else if (sin2 == 0) {
        if (sin1 < 0) return false;
        else {
            return cos2 < cos1;
        }
    }

    // 余下就是sin1为0时，如果sin2<0则true，否则根据cos，cos谁大谁小
    else {
        if (sin2 < 0) return true;
        else {
            return cos2 < cos1;
        }
    }
};

export default function (cx, cy, r1, r2, beginDeg, deg) {
    if (r1 > r2) {
        var r = r1;
        r1 = r2;
        r2 = r;
    }

    // 如果在小圈中，或者不在大圈中，肯定不在弧中
    if (this.circle(cx, cy, r1) || !this.circle(cx, cy, r2)) return false;

    var deg1, deg2;
    if (deg >= 0) {
        deg1 = beginDeg;
        deg2 = beginDeg + deg;
    } else {
        deg2 = beginDeg;
        deg1 = beginDeg + deg;
    }

    deg1 %= (Math.PI * 2);
    deg2 %= (Math.PI * 2);

    if (deg1 < 0) deg1 += Math.PI * 2;
    if (deg2 < 0) deg2 += Math.PI * 2;

    var d = Math.sqrt((cx - this.x) * (cx - this.x) + (cy - this.y) * (cy - this.y));
    var sin = (this.y - cy) / d, cos = (this.x - cx) / d;

    if (deg1 < deg2) {
        return compareDeg(Math.sin(deg1), Math.cos(deg1), sin, cos) && compareDeg(sin, cos, Math.sin(deg2), Math.cos(deg2));
    } else {
        return !(compareDeg(Math.sin(deg2), Math.cos(deg2), sin, cos) && compareDeg(sin, cos, Math.sin(deg1), Math.cos(deg1)));
    }
};
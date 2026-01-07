export default function (cx, cy, r) {

    // 特殊情况提前判断，加速计算
    if (this.x < cx - r || this.x > cx + r || this.y < cy - r || this.y > cy + r) return false;

    var d2 = (cx - this.x) * (cx - this.x) + (cy - this.y) * (cy - this.y), r2 = r * r;
    return d2 <= r2;
};
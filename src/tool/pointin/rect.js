export default function (x, y, width, height) {
    return this.x >= x && this.x <= x + width && this.y >= y && this.y <= y + height;
};
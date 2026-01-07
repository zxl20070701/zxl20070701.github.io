import arc from "./arc";
import circle from "./circle";
import polygon from "./polygon";
import rect from "./rect";

var PointIn = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

PointIn.prototype.setPoint = function (x, y) {
    this.x = x;
    this.y = y;
    return this;
};

PointIn.prototype.arc = arc;
PointIn.prototype.circle = circle;
PointIn.prototype.polygon = polygon;
PointIn.prototype.rect = rect;

export default PointIn;
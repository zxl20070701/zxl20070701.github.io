// 针对部分浏览器svg上没有innerHTML进行加强
var _innerHTML = {
    get: function () {
        var frame = document.createElement("div"), i;
        for (i = 0; i < this.childNodes.length; i++) {
            // 深度克隆，克隆节点以及节点下面的子内容
            frame.appendChild(this.childNodes[i].cloneNode(true));
        }
        return frame.innerHTML;
    },
    set: function (svgstring) {
        var frame = document.createElement("div"), i;
        frame.innerHTML = svgstring;
        var toSvgNode = function (htmlNode) {
            var svgNode = document.createElementNS("http://www.w3.org/2000/svg", (htmlNode.tagName + "").toLowerCase());
            var attrs = htmlNode.attributes, i;
            for (i = 0; attrs && i < attrs.length; i++) {
                if (["href", "title", "show", "type", "role", "actuate"].indexOf(attrs[i].nodeName) >= 0) {
                    // 特殊的svg属性需要使用特殊的方法设置
                    svgNode.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:' + attrs[i].nodeName, htmlNode.getAttribute(attrs[i].nodeName));
                } else {
                    svgNode.setAttribute(attrs[i].nodeName, htmlNode.getAttribute(attrs[i].nodeName));
                }

            }
            return svgNode;
        };
        var rslNode = toSvgNode(frame.firstChild);
        (function toSVG(pnode, svgPnode) {
            var node = pnode.firstChild;
            if (node && node.nodeType == 3) {
                svgPnode.textContent = pnode.innerText;
                return;
            }
            while (node) {
                var svgNode = toSvgNode(node);
                svgPnode.appendChild(svgNode);
                if (node.firstChild) toSVG(node, svgNode);
                node = node.nextSibling;
            }
        })(frame.firstChild, rslNode);
        this.appendChild(rslNode);
    }
};

if ('innerHTML' in SVGElement.prototype === false) {
    Object.defineProperty(SVGElement.prototype, 'innerHTML', _innerHTML);
}

if ('innerHTML' in SVGSVGElement.prototype === false) {
    Object.defineProperty(SVGSVGElement.prototype, 'innerHTML', _innerHTML);
}

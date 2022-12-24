import xhtml from "../../xhtml";

// 初始化结点

export function initDom() {
    var _this=this;

    this._el.innerHTML = "";

    xhtml.css(this._el, {
        "font-size": "12px",
        position: "relative",
        cursor: "text",
        "font-family": this._fontFamily,
        "background": this._colorBackground,
        overflow: "auto"
    });

    xhtml.bind(this._el, 'click', function() {

        // 由于有时候点击屏幕的时候，是滚动导致的，因此位置可能没有计算好前聚焦了，导致光标错位
        setTimeout(function() {
            _this.__focusDOM.focus();
        });

    })

    // 辅助计算标签
    this.__helpCalcDOM = xhtml.appendTo(this._el, "<span></span>");

    xhtml.css(this.__helpCalcDOM, {
        position: "absolute",
        "z-index": "-1",
        "white-space": "pre",
        "top": 0,
        "left": 0,
        "color": "rgba(0,0,0,0)",
        "font-weight": this._fontWeight
    });

    // 辅助输入标签
    this.__helpInputDOM = xhtml.appendTo(this._el, "<div></div>");

    xhtml.css(this.__helpInputDOM, {
        position: "absolute",
        "z-index": 1
    });

    xhtml.bind(this.__helpInputDOM, 'click', function(event ) {

        xhtml.stopPropagation(event);
        xhtml.preventDefault(event);

        _this.__focusDOM.focus();

    });

    // 光标
    this.__focusDOM = xhtml.appendTo(this._el, "<textarea></textarea>");

    xhtml.css(this.__focusDOM, {
        position: "absolute",
        width: "6px",
        "margin-top": "3px",
        height: "15px",
        "line-height": "15px",
        resize: "none",
        overflow: "hidden",
        padding: "0",
        outline: "none",
        border: "none",
        background: "rgba(0,0,0,0)",
        color: this._colorCursor
    });

    xhtml.attr(this.__focusDOM, {
        wrap: "off",
        autocorrect: "off",
        autocapitalize: "off",
        spellcheck: "false"
    });

    if (this._readonly) {
        xhtml.attr(this.__focusDOM, {
            readonly: true
        });
    }

    // 显示区域
    this.__showDOM = xhtml.appendTo(this._el, "<div></div>");

    xhtml.css(this.__showDOM, {
        padding: "10px 0"
    });

    // 选中区域
    this.__selectCanvas = xhtml.appendTo(this._el, "<canvas></canvas>");

    xhtml.css(this.__selectCanvas, {
        position: "absolute",
        left: "40px",
        top: "10px",
        opacity: "0.5"
    });

    this.$$updateCanvasSize(1, 1);

};

// 初始化视图

export function initView() {

    // 初始化定位光标位置
    xhtml.css(this.__focusDOM, {
        left: (40 + this.$$textWidth(this._contentArray[this.__lineNum])) + "px",
        top: (10 + this.__lineNum * 21) + "px"
    });

};
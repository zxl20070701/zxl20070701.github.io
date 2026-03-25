
/*************************** [bundle] ****************************/
// Original file:./src/pages/drawio/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['94']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('327');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('328');


__pkg__scope_args__=window.__pkg__getBundle('312');
var canvasRender =__pkg__scope_args__.default;


var painter;
var elements = []; // 存储所有元素
var connections = []; // 存储所有连接线
var selectedElement = null; // 当前选中的元素
var isDragging = false; // 是否正在拖拽
var dragOffsetX = 0; // 拖拽偏移
var dragOffsetY = 0;
var isDrawing = false; // 是否正在绘制
var startX = 0; // 开始绘制时的坐标
var startY = 0;
var currentTool = 'select'; // 当前工具：select, rectangle, circle, diamond, line, text
var currentColor = '#000000'; // 当前颜色
var currentLineWidth = 2; // 当前线宽
var tempConnection = null; // 临时连接线
var tempElement = null; // 临时元素（用于预览）

__pkg__scope_bundle__.default= function (obj, props) {
    return {
        name: "drawio",
        render: template,
        data: {
            currentTool: obj.ref('select'),
            currentColor: obj.ref('#000000'),
            currentLineWidth: obj.ref(2),
            selectedElement: obj.ref(null)
        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "draw.io" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './drawio.png');
        },
        mounted: function () {
            // 获取画笔
            painter = canvasRender(this._refs.mycanvas.value);
            
            // 设置画布背景为白色
            var canvas = this._refs.mycanvas.value;
            painter.config({
                fillStyle: '#FFFFFF'
            }).fillRect(0, 0, canvas.width, canvas.height);

            // 绑定事件
            this.bindEvents();
            
            // 初始渲染
            this.render();
        },
        methods: {
            bindEvents: function () {
                var canvas = this._refs.mycanvas.value;
                var self = this;

                // 鼠标按下事件
                canvas.addEventListener('mousedown', function (e) {
                    var rect = canvas.getBoundingClientRect();
                    var x = e.clientX - rect.left;
                    var y = e.clientY - rect.top;
                    
                    if (currentTool === 'select') {
                        // 选择工具：检查是否点击了某个元素
                        var clickedElement = self.getElementAt(x, y);
                        if (clickedElement) {
                            selectedElement = clickedElement;
                            isDragging = true;
                            dragOffsetX = x - clickedElement.x;
                            dragOffsetY = y - clickedElement.y;
                        } else {
                            selectedElement = null;
                        }
                    } else if (currentTool === 'line') {
                        // 连接线工具：检查是否点击了某个元素的连接点
                        var clickedElement = self.getElementAt(x, y);
                        if (clickedElement) {
                            isDrawing = true;
                            startX = x;
                            startY = y;
                            tempConnection = {
                                from: clickedElement,
                                fromX: x,
                                fromY: y,
                                toX: x,
                                toY: y
                            };
                        }
                    } else {
                        // 其他绘图工具
                        isDrawing = true;
                        startX = x;
                        startY = y;
                    }
                    
                    self.render();
                });

                // 鼠标移动事件
                canvas.addEventListener('mousemove', function (e) {
                    var rect = canvas.getBoundingClientRect();
                    var x = e.clientX - rect.left;
                    var y = e.clientY - rect.top;
                    
                    if (isDragging && selectedElement) {
                        // 拖拽元素
                        selectedElement.x = x - dragOffsetX;
                        selectedElement.y = y - dragOffsetY;
                        self.render();
                    } else if (isDrawing) {
                        if (currentTool === 'line' && tempConnection) {
                            // 更新临时连接线
                            tempConnection.toX = x;
                            tempConnection.toY = y;
                        } else if (currentTool === 'rectangle' || currentTool === 'circle' || currentTool === 'diamond') {
                            // 创建临时元素用于预览
                            if (currentTool === 'rectangle') {
                                var width = Math.abs(x - startX);
                                var height = Math.abs(y - startY);
                                var rectX = Math.min(x, startX);
                                var rectY = Math.min(y, startY);
                                
                                tempElement = {
                                    type: 'rectangle',
                                    x: rectX,
                                    y: rectY,
                                    width: width,
                                    height: height,
                                    color: currentColor,
                                    lineWidth: currentLineWidth,
                                    text: ''
                                };
                            } else if (currentTool === 'circle') {
                                var radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
                                
                                tempElement = {
                                    type: 'circle',
                                    x: startX,
                                    y: startY,
                                    radius: radius,
                                    color: currentColor,
                                    lineWidth: currentLineWidth,
                                    text: ''
                                };
                            } else if (currentTool === 'diamond') {
                                var width = Math.abs(x - startX);
                                var height = Math.abs(y - startY);
                                var diamondX = Math.min(x, startX);
                                var diamondY = Math.min(y, startY);
                                
                                tempElement = {
                                    type: 'diamond',
                                    x: diamondX,
                                    y: diamondY,
                                    width: width,
                                    height: height,
                                    color: currentColor,
                                    lineWidth: currentLineWidth,
                                    text: ''
                                };
                            }
                        }
                        self.render();
                    }
                });

                // 鼠标释放事件
                canvas.addEventListener('mouseup', function (e) {
                    var rect = canvas.getBoundingClientRect();
                    var x = e.clientX - rect.left;
                    var y = e.clientY - rect.top;
                    
                    if (isDrawing) {
                        if (currentTool === 'rectangle') {
                            // 创建矩形
                            var width = Math.abs(x - startX);
                            var height = Math.abs(y - startY);
                            var rectX = Math.min(x, startX);
                            var rectY = Math.min(y, startY);
                            
                            if (width > 10 && height > 10) {
                                elements.push({
                                    type: 'rectangle',
                                    x: rectX,
                                    y: rectY,
                                    width: width,
                                    height: height,
                                    color: currentColor,
                                    lineWidth: currentLineWidth,
                                    text: ''
                                });
                            }
                        } else if (currentTool === 'circle') {
                            // 创建圆形
                            var radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
                            
                            if (radius > 10) {
                                elements.push({
                                    type: 'circle',
                                    x: startX,
                                    y: startY,
                                    radius: radius,
                                    color: currentColor,
                                    lineWidth: currentLineWidth,
                                    text: ''
                                });
                            }
                        } else if (currentTool === 'diamond') {
                            // 创建菱形
                            var width = Math.abs(x - startX);
                            var height = Math.abs(y - startY);
                            var diamondX = Math.min(x, startX);
                            var diamondY = Math.min(y, startY);
                            
                            if (width > 10 && height > 10) {
                                elements.push({
                                    type: 'diamond',
                                    x: diamondX,
                                    y: diamondY,
                                    width: width,
                                    height: height,
                                    color: currentColor,
                                    lineWidth: currentLineWidth,
                                    text: ''
                                });
                            }
                        } else if (currentTool === 'line' && tempConnection) {
                            // 创建连接线
                            var targetElement = self.getElementAt(x, y);
                            if (targetElement && targetElement !== tempConnection.from) {
                                connections.push({
                                    from: tempConnection.from,
                                    to: targetElement,
                                    color: currentColor,
                                    lineWidth: currentLineWidth
                                });
                            }
                        } else if (currentTool === 'text') {
                            // 创建文本
                            var text = prompt('请输入文本:');
                            if (text) {
                                elements.push({
                                    type: 'text',
                                    x: x,
                                    y: y,
                                    text: text,
                                    color: currentColor,
                                    fontSize: 14
                                });
                            }
                        }
                        
                        isDrawing = false;
                        tempConnection = null;
                        tempElement = null;
                        self.render();
                    } else if (isDragging) {
                        isDragging = false;
                    }
                });

                // 双击事件（用于编辑文本）
                canvas.addEventListener('dblclick', function (e) {
                    var rect = canvas.getBoundingClientRect();
                    var x = e.clientX - rect.left;
                    var y = e.clientY - rect.top;
                    
                    var clickedElement = self.getElementAt(x, y);
                    if (clickedElement) {
                        var newText = prompt('编辑文本:', clickedElement.text || '');
                        if (newText !== null) {
                            clickedElement.text = newText;
                            self.render();
                        }
                    }
                });
                
                // 键盘事件
                document.addEventListener('keydown', function (e) {
                    if (e.key === 'Delete' && selectedElement) {
                        self.deleteSelected();
                    }
                });
            },

            // 获取指定位置的元素
            getElementAt: function (x, y) {
                // 从后往前遍历，确保选中的是最上层的元素
                // 对于连接线工具，增加检测范围
                var tolerance = (currentTool === 'line') ? 10 : 0;
                
                for (var i = elements.length - 1; i >= 0; i--) {
                    var element = elements[i];
                    // 尝试原始位置
                    if (this.isPointInElement(x, y, element)) {
                        return element;
                    }
                    // 如果当前工具是连接线，尝试扩大检测范围
                    if (currentTool === 'line') {
                        // 检查周围区域
                        for (var dy = -tolerance; dy <= tolerance; dy++) {
                            for (var dx = -tolerance; dx <= tolerance; dx++) {
                                if (dx !== 0 || dy !== 0) { // 跳过已经检查过的中心点
                                    if (this.isPointInElement(x + dx, y + dy, element)) {
                                        return element;
                                    }
                                }
                            }
                        }
                    }
                }
                return null;
            },

            // 判断点是否在元素内
            isPointInElement: function (x, y, element) {
                switch (element.type) {
                    case 'rectangle':
                        return x >= element.x && x <= element.x + element.width &&
                               y >= element.y && y <= element.y + element.height;
                    case 'circle':
                        var dx = x - element.x;
                        var dy = y - element.y;
                        return dx * dx + dy * dy <= element.radius * element.radius;
                    case 'diamond':
                        var cx = element.x + element.width / 2;
                        var cy = element.y + element.height / 2;
                        var dx = Math.abs(x - cx);
                        var dy = Math.abs(y - cy);
                        return dx / (element.width / 2) + dy / (element.height / 2) <= 1;
                    case 'text':
                        // 简单的文本点击检测
                        return x >= element.x - 50 && x <= element.x + 50 &&
                               y >= element.y - 10 && y <= element.y + 10;
                    default:
                        return false;
                }
            },

            // 渲染画布
            render: function () {
                var canvas = this._refs.mycanvas.value;
                
                // 清空画布
                painter.config({
                    fillStyle: '#FFFFFF'
                }).fillRect(0, 0, canvas.width, canvas.height);
                
                // 绘制网格
                this.drawGrid();
                
                // 绘制连接线
                for (var i = 0; i < connections.length; i++) {
                    this.drawConnection(connections[i]);
                }
                
                // 绘制临时连接线
                if (tempConnection) {
                    this.drawTempConnection();
                }
                
                // 绘制临时元素（用于预览）
                if (tempElement) {
                    this.drawElement(tempElement, false);
                }
                
                // 绘制元素
                for (var i = 0; i < elements.length; i++) {
                    this.drawElement(elements[i], elements[i] === selectedElement);
                }
            },

            // 绘制网格
            drawGrid: function () {
                var canvas = this._refs.mycanvas.value;
                var gridSize = 20;
                
                painter.config({
                    strokeStyle: '#f0f0f0',
                    lineWidth: 1
                });
                
                // 绘制垂直线
                for (var x = 0; x <= canvas.width; x += gridSize) {
                    painter.beginPath().moveTo(x, 0).lineTo(x, canvas.height).stroke();
                }
                
                // 绘制水平线
                for (var y = 0; y <= canvas.height; y += gridSize) {
                    painter.beginPath().moveTo(0, y).lineTo(canvas.width, y).stroke();
                }
            },

            // 绘制元素
            drawElement: function (element, isSelected) {
                painter.config({
                    strokeStyle: element.color,
                    fillStyle: '#FFFFFF',
                    lineWidth: element.lineWidth
                });
                
                switch (element.type) {
                    case 'rectangle':
                        if (isSelected) {
                            // 绘制选中框
                            painter.config({
                                strokeStyle: '#0066CC',
                                lineWidth: 1,
                                lineDash: [5, 5]
                            }).strokeRect(element.x - 5, element.y - 5, element.width + 10, element.height + 10);
                            painter.config({lineDash: []});
                        }
                        
                        painter.strokeRect(element.x, element.y, element.width, element.height);
                        
                        // 绘制文本
                        if (element.text) {
                            painter.config({
                                fillStyle: element.color,
                                fontSize: 14,
                                textAlign: 'center',
                                textBaseline: 'middle'
                            }).fillText(element.text, element.x + element.width / 2, element.y + element.height / 2);
                        }
                        break;
                        
                    case 'circle':
                        if (isSelected) {
                            // 绘制选中框
                            painter.config({
                                strokeStyle: '#0066CC',
                                lineWidth: 1,
                                lineDash: [5, 5]
                            }).strokeCircle(element.x, element.y, element.radius + 5);
                            painter.config({lineDash: []});
                        }
                        
                        painter.strokeCircle(element.x, element.y, element.radius);
                        
                        // 绘制文本
                        if (element.text) {
                            painter.config({
                                fillStyle: element.color,
                                fontSize: 14,
                                textAlign: 'center',
                                textBaseline: 'middle'
                            }).fillText(element.text, element.x, element.y);
                        }
                        break;
                        
                    case 'diamond':
                        var cx = element.x + element.width / 2;
                        var cy = element.y + element.height / 2;
                        
                        if (isSelected) {
                            // 绘制选中框
                            painter.config({
                                strokeStyle: '#0066CC',
                                lineWidth: 1,
                                lineDash: [5, 5]
                            });
                            painter.beginPath()
                                .moveTo(cx, element.y - 5)
                                .lineTo(element.x + element.width + 5, cy)
                                .lineTo(cx, element.y + element.height + 5)
                                .lineTo(element.x - 5, cy)
                                .closePath()
                                .stroke();
                            painter.config({lineDash: []});
                        }
                        
                        painter.beginPath()
                            .moveTo(cx, element.y)
                            .lineTo(element.x + element.width, cy)
                            .lineTo(cx, element.y + element.height)
                            .lineTo(element.x, cy)
                            .closePath()
                            .stroke();
                        
                        // 绘制文本
                        if (element.text) {
                            painter.config({
                                fillStyle: element.color,
                                fontSize: 14,
                                textAlign: 'center',
                                textBaseline: 'middle'
                            }).fillText(element.text, cx, cy);
                        }
                        break;
                        
                    case 'text':
                        painter.config({
                            fillStyle: element.color,
                            fontSize: element.fontSize,
                            textAlign: 'left',
                            textBaseline: 'top'
                        }).fillText(element.text, element.x, element.y);
                        break;
                }
            },

            // 绘制连接线
            drawConnection: function (connection) {
                var fromX, fromY, toX, toY;
                
                // 计算起始点（从元素边缘开始）
                if (connection.from.type === 'rectangle' || connection.from.type === 'diamond') {
                    var fromCenterX = connection.from.x + connection.from.width / 2;
                    var fromCenterY = connection.from.y + connection.from.height / 2;
                    var toCenterX = connection.to.x + (connection.to.width ? connection.to.width / 2 : 0);
                    var toCenterY = connection.to.y + (connection.to.height ? connection.to.height / 2 : 0);
                    
                    // 计算连接点（在元素边缘）
                    var dx = toCenterX - fromCenterX;
                    var dy = toCenterY - fromCenterY;
                    
                    if (connection.from.type === 'rectangle') {
                        // 矩形连接点
                        if (Math.abs(dx) / connection.from.width > Math.abs(dy) / connection.from.height) {
                            // 左右边缘
                            fromX = fromCenterX + (dx > 0 ? connection.from.width / 2 : -connection.from.width / 2);
                            fromY = fromCenterY;
                        } else {
                            // 上下边缘
                            fromX = fromCenterX;
                            fromY = fromCenterY + (dy > 0 ? connection.from.height / 2 : -connection.from.height / 2);
                        }
                    } else {
                        // 菱形连接点 - 计算从中心到边缘的交点
                        var halfWidth = connection.from.width / 2;
                        var halfHeight = connection.from.height / 2;
                        
                        // 计算方向向量
                        var length = Math.sqrt(dx * dx + dy * dy);
                        if (length === 0) length = 1;
                        var dirX = dx / length;
                        var dirY = dy / length;
                        
                        // 计算菱形边缘点的参数方程
                        // 菱形可以看作是旋转45度的矩形，使用参数方程求解
                        var t;
                        if (Math.abs(dirX) / halfWidth > Math.abs(dirY) / halfHeight) {
                            // 与左右边缘相交
                            t = halfWidth / Math.abs(dirX);
                        } else {
                            // 与上下边缘相交
                            t = halfHeight / Math.abs(dirY);
                        }
                        
                        fromX = fromCenterX + dirX * t;
                        fromY = fromCenterY + dirY * t;
                    }
                } else if (connection.from.type === 'circle') {
                    var toCenterX = connection.to.x + (connection.to.width ? connection.to.width / 2 : 0);
                    var toCenterY = connection.to.y + (connection.to.height ? connection.to.height / 2 : 0);
                    var dx = toCenterX - connection.from.x;
                    var dy = toCenterY - connection.from.y;
                    var angle = Math.atan2(dy, dx);
                    fromX = connection.from.x + connection.from.radius * Math.cos(angle);
                    fromY = connection.from.y + connection.from.radius * Math.sin(angle);
                }
                
                // 计算结束点（到元素边缘结束）
                if (connection.to.type === 'rectangle' || connection.to.type === 'diamond') {
                    var toCenterX = connection.to.x + connection.to.width / 2;
                    var toCenterY = connection.to.y + connection.to.height / 2;
                    var dx = toCenterX - fromX;
                    var dy = toCenterY - fromY;
                    
                    if (connection.to.type === 'rectangle') {
                        // 矩形连接点
                        if (Math.abs(dx) / connection.to.width > Math.abs(dy) / connection.to.height) {
                            // 左右边缘
                            toX = toCenterX + (dx < 0 ? connection.to.width / 2 : -connection.to.width / 2);
                            toY = toCenterY;
                        } else {
                            // 上下边缘
                            toX = toCenterX;
                            toY = toCenterY + (dy < 0 ? connection.to.height / 2 : -connection.to.height / 2);
                        }
                    } else {
                        // 菱形连接点 - 计算从外部点到边缘的交点
                        var halfWidth = connection.to.width / 2;
                        var halfHeight = connection.to.height / 2;
                        
                        // 计算方向向量（从外部点指向中心）
                        var dirToCenterX = toCenterX - fromX;
                        var dirToCenterY = toCenterY - fromY;
                        var length = Math.sqrt(dirToCenterX * dirToCenterX + dirToCenterY * dirToCenterY);
                        if (length === 0) length = 1;
                        var dirX = dirToCenterX / length;
                        var dirY = dirToCenterY / length;
                        
                        // 计算菱形边缘点的参数方程
                        var t;
                        if (Math.abs(dirX) / halfWidth > Math.abs(dirY) / halfHeight) {
                            // 与左右边缘相交
                            t = halfWidth / Math.abs(dirX);
                        } else {
                            // 与上下边缘相交
                            t = halfHeight / Math.abs(dirY);
                        }
                        
                        toX = toCenterX - dirX * t;
                        toY = toCenterY - dirY * t;
                    }
                } else if (connection.to.type === 'circle') {
                    var dx = connection.to.x - fromX;
                    var dy = connection.to.y - fromY;
                    var angle = Math.atan2(dy, dx);
                    toX = connection.to.x - connection.to.radius * Math.cos(angle);
                    toY = connection.to.y - connection.to.radius * Math.sin(angle);
                }
                
                painter.config({
                    strokeStyle: connection.color,
                    lineWidth: connection.lineWidth
                }).beginPath().moveTo(fromX, fromY).lineTo(toX, toY).stroke();
                
                // 绘制箭头
                this.drawArrow(fromX, fromY, toX, toY, connection.color);
            },

            // 绘制临时连接线
            drawTempConnection: function () {
                painter.config({
                    strokeStyle: currentColor,
                    lineWidth: currentLineWidth,
                    lineDash: [5, 5]
                }).beginPath().moveTo(tempConnection.fromX, tempConnection.fromY).lineTo(tempConnection.toX, tempConnection.toY).stroke();
                
                // 绘制箭头
                this.drawArrow(tempConnection.fromX, tempConnection.fromY, tempConnection.toX, tempConnection.toY, currentColor);
                painter.config({lineDash: []});
            },

            // 绘制箭头
            drawArrow: function (fromX, fromY, toX, toY, color) {
                var angle = Math.atan2(toY - fromY, toX - fromX);
                var arrowLength = 10;
                
                painter.config({
                    strokeStyle: color,
                    lineWidth: 1
                }).beginPath()
                    .moveTo(toX, toY)
                    .lineTo(toX - arrowLength * Math.cos(angle - Math.PI / 6), toY - arrowLength * Math.sin(angle - Math.PI / 6))
                    .moveTo(toX, toY)
                    .lineTo(toX - arrowLength * Math.cos(angle + Math.PI / 6), toY - arrowLength * Math.sin(angle + Math.PI / 6))
                    .stroke();
            },

            // 设置工具
            setTool: function (event) {
                var tool = event.target.getAttribute('data-tool');
                currentTool = tool;
                this.currentTool = tool;
                selectedElement = null;
                this.selectedElement = null;
            },

            // 设置颜色
            setColor: function (event) {
                var color = event.target.getAttribute('data-value');
                currentColor = color;
                this.currentColor = color;
            },

            // 设置线宽
            setLineWidth: function (event) {
                var width = parseInt(event.target.value);
                currentLineWidth = width;
                this.currentLineWidth = width;
            },


            // 清空画布
            clearCanvas: function () {
                if (confirm('确定要清空所有内容吗？')) {
                    elements = [];
                    connections = [];
                    selectedElement = null;
                    this.selectedElement = null;
                    this.render();
                }
            },

            // 保存画布为图片
            saveCanvas: function () {
                var canvas = this._refs.mycanvas.value;
                var link = document.createElement('a');
                link.download = '流程图_' + new Date().getTime() + '.png';
                link.href = canvas.toDataURL();
                link.click();
            },

            // 导出数据
            saveData: function () {
                var data = {
                    elements: elements,
                    connections: connections.map(function(conn) {
                        return {
                            fromIndex: elements.indexOf(conn.from),
                            toIndex: elements.indexOf(conn.to),
                            color: conn.color,
                            lineWidth: conn.lineWidth
                        };
                    })
                };
                
                var jsonData = JSON.stringify(data, null, 2);
                var blob = new Blob([jsonData], { type: 'application/json' });
                var url = URL.createObjectURL(blob);
                
                var link = document.createElement('a');
                link.download = '流程图数据_' + new Date().getTime() + '.json';
                link.href = url;
                link.click();
                
                URL.revokeObjectURL(url);
            },

            // 导入数据
            openData: function () {
                var input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                
                input.onchange = function(e) {
                    var file = e.target.files[0];
                    if (!file) return;
                    
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        try {
                            var data = JSON.parse(e.target.result);
                            
                            // 清空当前数据
                            elements = [];
                            connections = [];
                            selectedElement = null;
                            
                            // 导入元素
                            if (data.elements) {
                                elements = data.elements;
                            }
                            
                            // 导入连接线
                            if (data.connections) {
                                for (var i = 0; i < data.connections.length; i++) {
                                    var conn = data.connections[i];
                                    if (conn.fromIndex >= 0 && conn.fromIndex < elements.length &&
                                        conn.toIndex >= 0 && conn.toIndex < elements.length) {
                                        connections.push({
                                            from: elements[conn.fromIndex],
                                            to: elements[conn.toIndex],
                                            color: conn.color || currentColor,
                                            lineWidth: conn.lineWidth || currentLineWidth
                                        });
                                    }
                                }
                            }
                            
                            // 重新渲染
                            this.render();
                        } catch (error) {
                            alert('导入失败：' + error.message);
                        }
                    }.bind(this);
                    
                    reader.readAsText(file);
                }.bind(this);
                
                input.click();
            },

        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/drawio/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['327']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,9,70]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,7]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[3,5]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[4]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[6]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"h2","attrs":{},"childNodes":[8]},{"type":"text","content":"draw.io","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"toolbar"},"childNodes":[10,31,42,56,60]},{"type":"tag","name":"div","attrs":{"class":"tool-group"},"childNodes":[11,13,16,19,22,25,28]},{"type":"tag","name":"label","attrs":{},"childNodes":[12]},{"type":"text","content":"工具:","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-bind:class":"'tool-btn ' + (currentTool === 'select' ? 'active' : '')","data-tool":"select","ui-on:click":"setTool"},"childNodes":[14,15]},{"type":"tag","name":"i","attrs":{"class":"icon-select"},"childNodes":[]},{"type":"text","content":"选择","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-bind:class":"'tool-btn ' + (currentTool === 'rectangle' ? 'active' : '')","data-tool":"rectangle","ui-on:click":"setTool"},"childNodes":[17,18]},{"type":"tag","name":"i","attrs":{"class":"icon-rectangle"},"childNodes":[]},{"type":"text","content":"矩形","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-bind:class":"'tool-btn ' + (currentTool === 'circle' ? 'active' : '')","data-tool":"circle","ui-on:click":"setTool"},"childNodes":[20,21]},{"type":"tag","name":"i","attrs":{"class":"icon-circle"},"childNodes":[]},{"type":"text","content":"圆形","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-bind:class":"'tool-btn ' + (currentTool === 'diamond' ? 'active' : '')","data-tool":"diamond","ui-on:click":"setTool"},"childNodes":[23,24]},{"type":"tag","name":"i","attrs":{"class":"icon-diamond"},"childNodes":[]},{"type":"text","content":"菱形","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-bind:class":"'tool-btn ' + (currentTool === 'line' ? 'active' : '')","data-tool":"line","ui-on:click":"setTool"},"childNodes":[26,27]},{"type":"tag","name":"i","attrs":{"class":"icon-line"},"childNodes":[]},{"type":"text","content":"连接线","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-bind:class":"'tool-btn ' + (currentTool === 'text' ? 'active' : '')","data-tool":"text","ui-on:click":"setTool"},"childNodes":[29,30]},{"type":"tag","name":"i","attrs":{"class":"icon-text"},"childNodes":[]},{"type":"text","content":"文本","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"tool-group"},"childNodes":[32,34]},{"type":"tag","name":"label","attrs":{},"childNodes":[33]},{"type":"text","content":"颜色:","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"color-palette"},"childNodes":[35,36,37,38,39,40,41]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#000000' ? 'active' : '')","style":"background-color: #000000","data-value":"#000000","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#FF0000' ? 'active' : '')","style":"background-color: #FF0000","data-value":"#FF0000","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#00FF00' ? 'active' : '')","style":"background-color: #00FF00","data-value":"#00FF00","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#0000FF' ? 'active' : '')","style":"background-color: #0000FF","data-value":"#0000FF","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#FFFF00' ? 'active' : '')","style":"background-color: #FFFF00","data-value":"#FFFF00","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#FF00FF' ? 'active' : '')","style":"background-color: #FF00FF","data-value":"#FF00FF","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#00FFFF' ? 'active' : '')","style":"background-color: #00FFFF","data-value":"#00FFFF","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"tool-group"},"childNodes":[43,45]},{"type":"tag","name":"label","attrs":{},"childNodes":[44]},{"type":"text","content":"样式:","childNodes":[]},{"type":"tag","name":"select","attrs":{"ui-bind:value":"currentLineWidth","ui-on:change":"setLineWidth"},"childNodes":[46,48,50,52,54]},{"type":"tag","name":"option","attrs":{"value":"1"},"childNodes":[47]},{"type":"text","content":"1px","childNodes":[]},{"type":"tag","name":"option","attrs":{"value":"2"},"childNodes":[49]},{"type":"text","content":"2px","childNodes":[]},{"type":"tag","name":"option","attrs":{"value":"3"},"childNodes":[51]},{"type":"text","content":"3px","childNodes":[]},{"type":"tag","name":"option","attrs":{"value":"4"},"childNodes":[53]},{"type":"text","content":"4px","childNodes":[]},{"type":"tag","name":"option","attrs":{"value":"5"},"childNodes":[55]},{"type":"text","content":"5px","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"tool-group"},"childNodes":[57]},{"type":"tag","name":"button","attrs":{"class":"clear-btn","ui-on:click":"clearCanvas"},"childNodes":[58,59]},{"type":"tag","name":"i","attrs":{"class":"icon-clear"},"childNodes":[]},{"type":"text","content":"清空","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"tool-group"},"childNodes":[61,64,67]},{"type":"tag","name":"button","attrs":{"class":"save-btn","ui-on:click":"saveCanvas"},"childNodes":[62,63]},{"type":"tag","name":"i","attrs":{"class":"icon-save"},"childNodes":[]},{"type":"text","content":"保存图片","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"export-btn","ui-on:click":"saveData"},"childNodes":[65,66]},{"type":"tag","name":"i","attrs":{"class":"icon-export"},"childNodes":[]},{"type":"text","content":"导出数据","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"import-btn","ui-on:click":"openData"},"childNodes":[68,69]},{"type":"tag","name":"i","attrs":{"class":"icon-import"},"childNodes":[]},{"type":"text","content":"导入数据","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content"},"childNodes":[71]},{"type":"tag","name":"canvas","attrs":{"style":"width: 100%; height: 100%;","ref":"mycanvas"},"childNodes":[72]},{"type":"text","content":"非常抱歉，您的浏览器不支持canvas!","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/drawio/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['328']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"drawio\"]{\n\nwidth: calc(100vw - 100px);\n\nleft: 50px;\n\ntop: 25px;\n\n}\n\n [page-view=\"drawio\"][focus=\"no\"]>header{\n\nbackground-color: #cad5da;\n\n}\n\n [page-view=\"drawio\"]>header{\n\ntext-align: left;\n\nline-height: 50px;\n\nbackground-color: #b8c9d1;\n\n}\n\n [page-view=\"drawio\"]>header>h2{\n\ncolor: #d5582d;\n\nfont-size: 20px;\n\npadding-left: 50px;\n\nbackground-image: url(\"./drawio.png\");\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\nfont-family: fangsong;\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"drawio\"]>.toolbar{\n\ndisplay: flex;\n\nalign-items: center;\n\npadding: 10px;\n\nbackground-color: #f5f5f5;\n\nborder-bottom: 1px solid #ddd;\n\ngap: 15px;\n\nflex-wrap: wrap;\n\n}\n\n [page-view=\"drawio\"]>.toolbar button>i{\n\nmargin-right: 5px;\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group{\n\ndisplay: flex;\n\nalign-items: center;\n\ngap: 5px;\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group label{\n\nfont-size: 14px;\n\ncolor: #333;\n\nmargin-right: 5px;\n\n}\n\n/* // 图标样式\r */\n\n [page-view=\"drawio\"]>.toolbar .tool-group .icon-select::before{\n\ncontent: \"↖\";\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .icon-rectangle::before{\n\ncontent: \"▭\";\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .icon-circle::before{\n\ncontent: \"○\";\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .icon-diamond::before{\n\ncontent: \"◇\";\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .icon-line::before{\n\ncontent: \"↗\";\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .icon-text::before{\n\ncontent: \"T\";\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .icon-clear::before{\n\ncontent: \"⌧\";\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .icon-save::before{\n\ncontent: \"💾\";\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .tool-btn{\n\npadding: 6px 12px;\n\nbackground-color: #fff;\n\nborder: 1px solid #ddd;\n\nborder-radius: 4px;\n\ncursor: pointer;\n\nfont-size: 14px;\n\ntransition: all 0.2s;\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .tool-btn:hover{\n\nbackground-color: #e9e9e9;\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .tool-btn.active{\n\nbackground-color: #224858;\n\ncolor: white;\n\nborder-color: #224858;\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .color-palette{\n\ndisplay: flex;\n\ngap: 5px;\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .color-palette .color-item{\n\nwidth: 24px;\n\nheight: 24px;\n\nborder-radius: 50%;\n\ncursor: pointer;\n\nborder: 2px solid transparent;\n\ntransition: all 0.2s;\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .color-palette .color-item:hover{\n\ntransform: scale(1.1);\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .color-palette .color-item.active{\n\nborder-color: white;\n\ntransform: scale(1.1);\n\nbox-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group select{\n\npadding: 5px 10px;\n\nborder: 1px solid #ddd;\n\nborder-radius: 4px;\n\nbackground-color: #fff;\n\nfont-size: 14px;\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .clear-btn{\n\npadding: 6px 12px;\n\nbackground-color: #ffaa44;\n\ncolor: white;\n\nborder: 1px solid #ffaa44;\n\nborder-radius: 4px;\n\ncursor: pointer;\n\nfont-size: 14px;\n\ntransition: all 0.2s;\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .clear-btn:hover{\n\nbackground-color: #ff8800;\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .save-btn, [page-view=\"drawio\"]>.toolbar .tool-group .export-btn, [page-view=\"drawio\"]>.toolbar .tool-group .import-btn{\n\npadding: 6px 12px;\n\nbackground-color: #44aa44;\n\ncolor: white;\n\nborder: 1px solid #44aa44;\n\nborder-radius: 4px;\n\ncursor: pointer;\n\nfont-size: 14px;\n\ntransition: all 0.2s;\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .save-btn:hover, [page-view=\"drawio\"]>.toolbar .tool-group .export-btn:hover, [page-view=\"drawio\"]>.toolbar .tool-group .import-btn:hover{\n\nbackground-color: #339933;\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .export-btn{\n\nbackground-color: #4488aa;\n\nborder-color: #4488aa;\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .export-btn:hover{\n\nbackground-color: #336699;\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .import-btn{\n\nbackground-color: #8844aa;\n\nborder-color: #8844aa;\n\n}\n\n [page-view=\"drawio\"]>.toolbar .tool-group .import-btn:hover{\n\nbackground-color: #663399;\n\n}\n\n [page-view=\"drawio\"]>.content{\n\nheight: calc(100vh - 150px);\n\noverflow: hidden;\n\n}\n\n [page-view=\"drawio\"]>.content canvas{\n\ndisplay: block;\n\ncursor: crosshair;\n\nbackground-color: white;\n\n}\n\n/* // 图标样式\r */\n\n .icon-select::before{\n\ncontent: \"↖\";\n\n}\n\n .icon-rectangle::before{\n\ncontent: \"▭\";\n\n}\n\n .icon-circle::before{\n\ncontent: \"○\";\n\n}\n\n .icon-diamond::before{\n\ncontent: \"◇\";\n\n}\n\n .icon-line::before{\n\ncontent: \"↗\";\n\n}\n\n .icon-text::before{\n\ncontent: \"T\";\n\n}\n\n .icon-delete::before{\n\ncontent: \"✕\";\n\n}\n\n .icon-clear::before{\n\ncontent: \"⌧\";\n\n}\n\n .icon-save::before{\n\ncontent: \"💾\";\n\n}\n\n .icon-export::before{\n\ncontent: \"⤴\";\n\n}\n\n .icon-import::before{\n\ncontent: \"⤵\";\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/region
/*****************************************************************/
window.__pkg__bundleSrc__['312']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('151');
var canvasRender =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('218');
var assemble =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (canvas, width, height, isScale) {

    // 初始化尺寸
    width = width || canvas.clientWidth;
    height = height || canvas.clientHeight;

    // 获取绘制画笔
    var drawPainter = canvasRender(canvas, width, height, {}, isScale);

    // 获取区域画笔
    var regionPainter = canvasRender(document.createElement('canvas'), width, height, {

        // https://html.spec.whatwg.org/multipage/canvas.html#concept-canvas-will-read-frequently
        willReadFrequently: true
    });

    var regions = {}; //区域映射表
    var regionAssemble = assemble(0, 255, 10, 3);

    var drawRegion = false;

    var instance = {

        // 配置画笔
        config: function () {
            if (arguments.length === 1) {
                if (typeof arguments[0] !== "object") return drawPainter.config([arguments[0]]);
                for (var key in arguments[0]) {
                    if (['fillStyle', 'strokeStyle', 'shadowBlur', 'shadowColor'].indexOf(key) < 0) regionPainter.config(key, arguments[0][key]);
                    drawPainter.config(key, arguments[0][key]);
                }
            } else if (arguments.length === 2) {
                if (['fillStyle', 'strokeStyle', 'shadowBlur', 'shadowColor'].indexOf(key) < 0) regionPainter.config(arguments[0], arguments[1]);
                drawPainter.config(arguments[0], arguments[1]);
            }
            return instance;
        },

        // 设置当前绘制区域名称
        setRegion: function (regionName) {
            if (regionName === false) {
                drawRegion = false;
            } else {
                drawRegion = true;

                if (regions[regionName] == undefined) {
                    var tempColor = regionAssemble();
                    regions[regionName] = "rgb(" + tempColor[0] + "," + tempColor[1] + "," + tempColor[2] + ")";
                }

                regionPainter.config({
                    fillStyle: regions[regionName],
                    strokeStyle: regions[regionName]
                });
            }

            return instance;
        },

        // 获取当前事件触发的区域名称
        getRegion: function (event) {

            // 获取点击点的颜色
            var currentRGBA = regionPainter.painter.getImageData(event.offsetX - 0.5, event.offsetY - 0.5, 1, 1).data;

            // 查找当前点击的区域
            for (var key in regions) {
                if ("rgb(" + currentRGBA[0] + "," + currentRGBA[1] + "," + currentRGBA[2] + ")" == regions[key]) {
                    return key;
                }
            }

            return false;
        }

    };

    for (var key in drawPainter) {
        (function (key) {

            // 如果是获取原生画笔
            if ('painter' == key) {
                instance.painter = function () {
                    return {
                        draw: drawPainter.painter,
                        region: regionPainter.painter
                    };
                };
            }

            // 特殊的过滤掉
            else if (['config'].indexOf(key) < 0) {
                instance[key] = function () {
                    if (drawRegion) regionPainter[key].apply(regionPainter, arguments);
                    var result = drawPainter[key].apply(drawPainter, arguments);
                    return result.__only__painter__ ? instance : result;
                };

            }
        })(key);
    }

    return instance;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/index
/*****************************************************************/
window.__pkg__bundleSrc__['151']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('152');
var initText=__pkg__scope_args__.initText;
var initArc=__pkg__scope_args__.initArc;
var initCircle=__pkg__scope_args__.initCircle;
var initRect=__pkg__scope_args__.initRect;

__pkg__scope_args__=window.__pkg__getBundle('154');
var linearGradient=__pkg__scope_args__.linearGradient;
var radialGradient=__pkg__scope_args__.radialGradient;

__pkg__scope_args__=window.__pkg__getBundle('152');
var initPainterConfig=__pkg__scope_args__.initPainterConfig;


// 画笔对象

__pkg__scope_bundle__.default= function (canvas, width, height, opts, isScale) {

    // 设置宽
    if (width) {
        canvas.style.width = width + "px";
        canvas.setAttribute('width', (isScale ? 2 : 1) * width);
    }

    // 设置高
    if (height) {
        canvas.style.height = height + "px";
        canvas.setAttribute('height', (isScale ? 2 : 1) * height);
    }

    var painter = canvas.getContext("2d", opts || {});
    if (isScale) painter.scale(2, 2);

    // 默认配置canvas2D对象已经存在的属性
    painter.textBaseline = 'middle';
    painter.textAlign = 'left';

    // 用于记录配置
    // 因为部分配置的设置比较特殊，只先记录意图
    var config = {

        // 文字大小
        "fontSize": 16,

        // 字体
        "fontFamily": "sans-serif",

        // 字重
        "fontWeight": 400,

        // 字类型
        "fontStyle": "normal",

        // 圆弧开始端闭合方式（"butt"直线闭合、"round"圆帽闭合）
        "arcStartCap": 'butt',

        // 圆弧结束端闭合方式，和上一个类似
        "arcWndCap": 'butt',
    };

    // 配置生效方法
    var useConfig = function (key, value) {

        /**
         * -----------------------------
         * 特殊的设置开始
         * -----------------------------
         */

        if (key == 'lineDash') {
            if (painter.setLineDash) painter.setLineDash(value);
        }

        /**
         * -----------------------------
         * 常规的配置开始
         * -----------------------------
         */

        // 如果已经存在默认配置中，说明只需要缓存起来即可
        else if (key in config) {
            config[key] = value;
        }

        // 其它情况直接生效即可
        else if (key in initPainterConfig) {
            painter[key] = value;
        }

        // 如果属性未被定义
        else {
            throw new Error('Illegal configuration item of painter : ' + key + " !");
        }
    };

    // 画笔
    var enhancePainter = {
        __only__painter__: true,

        // 原生画笔
        painter: painter,

        // 属性设置或获取
        "config": function () {
            if (arguments.length === 1) {
                if (typeof arguments[0] !== 'object') {

                    // 暂存的
                    if (arguments[0] in config) return config[arguments[0]];

                    // lineDash
                    if ('lineDash' == arguments[0]) return painter.getLineDash();

                    // 普通的
                    return painter[arguments[0]];
                }
                for (var key in arguments[0]) {
                    useConfig(key, arguments[0][key]);
                }
            } else if (arguments.length === 2) {
                useConfig(arguments[0], arguments[1]);
            }
            return enhancePainter;
        },

        // 文字
        "fillText": function (text, x, y, deg) {
            painter.save();
            initText(painter, config, x, y, deg || 0).fillText(text, 0, 0);
            painter.restore();
            return enhancePainter;
        },
        "strokeText": function (text, x, y, deg) {
            painter.save();
            initText(painter, config, x, y, deg || 0).strokeText(text, 0, 0);
            painter.restore();
            return enhancePainter;
        },
        "fullText": function (text, x, y, deg) {
            painter.save();
            initText(painter, config, x, y, deg || 0);
            painter.fillText(text, 0, 0);
            painter.strokeText(text, 0, 0);
            painter.restore();
            return enhancePainter;
        },

        // 路径
        "beginPath": function () { painter.beginPath(); return enhancePainter; },
        "closePath": function () { painter.closePath(); return enhancePainter; },
        "moveTo": function (x, y) {

            // 解决1px模糊问题，别的地方类似原因
            painter.moveTo(Math.round(x) + 0.5, Math.round(y) + 0.5);
            return enhancePainter;
        },
        "lineTo": function (x, y) { painter.lineTo(Math.round(x) + 0.5, Math.round(y) + 0.5); return enhancePainter; },
        "arc": function (x, y, r, beginDeg, deg) {
            painter.arc(x, y, r, beginDeg, beginDeg + deg, deg < 0);
            return enhancePainter;
        },
        "fill": function () { painter.fill(); return enhancePainter; },
        "stroke": function () { painter.stroke(); return enhancePainter; },
        "full": function () { painter.fill(); painter.stroke(); return enhancePainter; },

        "save": function () { painter.save(); return enhancePainter; },
        "restore": function () { painter.restore(); return enhancePainter; },

        // 路径 - 贝塞尔曲线
        "quadraticCurveTo": function (cpx, cpy, x, y) {
            painter.quadraticCurveTo(cpx, cpy, x, y); return enhancePainter;
        },
        "bezierCurveTo": function (cp1x, cp1y, cp2x, cp2y, x, y) {
            painter.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y); return enhancePainter;
        },

        // 擦除画面
        "clearRect": function (x, y, w, h) { painter.clearRect(x, y, w, h); return enhancePainter; },
        "clearCircle": function (cx, cy, r) {
            painter.beginPath();
            painter.globalCompositeOperation = "destination-out";
            painter.arc(cx, cy, r, 0, Math.PI * 2); // 绘制圆形
            painter.fill(); // 填充圆形，这将会清除这个圆形区域
            painter.globalCompositeOperation = "source-over";
            painter.closePath();
            return enhancePainter;
        },

        // 弧
        "fillArc": function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(painter, config, cx, cy, r1, r2, beginDeg, deg).fill(); return enhancePainter;
        },
        "strokeArc": function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(painter, config, cx, cy, r1, r2, beginDeg, deg).stroke(); return enhancePainter;
        },
        "fullArc": function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(painter, config, cx, cy, r1, r2, beginDeg, deg);
            painter.fill();
            painter.stroke();
            return enhancePainter;
        },

        // 圆形
        "fillCircle": function (cx, cy, r) {
            initCircle(painter, cx, cy, r).fill(); return enhancePainter;
        },
        "strokeCircle": function (cx, cy, r) {
            initCircle(painter, cx, cy, r).stroke(); return enhancePainter;
        },
        "fullCircle": function (cx, cy, r) {
            initCircle(painter, cx, cy, r);
            painter.fill();
            painter.stroke();
            return enhancePainter;
        },

        // 矩形
        "fillRect": function (x, y, width, height) {
            initRect(painter, x, y, width, height).fill(); return enhancePainter;
        },
        "strokeRect": function (x, y, width, height) {
            initRect(painter, x, y, width, height).stroke(); return enhancePainter;
        },
        "fullRect": function (x, y, width, height) {
            initRect(painter, x, y, width, height);
            painter.fill();
            painter.stroke();
            return enhancePainter;
        },

        // base64
        "toDataURL": function (type) {
            type = type || 'image/png';
            return canvas.toDataURL(type);
        },

        // 获取指定位置颜色
        "getColor": function (x, y) {
            var currentRGBA = painter.getImageData(x - 0.5, y - 0.5, 1, 1).data;
            return "rgba(" + currentRGBA[0] + "," + currentRGBA[1] + "," + currentRGBA[2] + "," + currentRGBA[3] + ")";
        },

        // image
        "drawImage": function (img, sx, sy, sw, sh, x, y, w, h) {
            sx = sx || 0;
            sy = sy || 0;
            x = x || 0;
            y = y || 0;
            w = w ? w : canvas.getAttribute('width');
            h = h ? h : canvas.getAttribute('height');

            if (img.nodeName == 'CANVAS') {
                sw = sw ? sw : canvas.getAttribute('width');
                sh = sh ? sh : canvas.getAttribute('height');
            } else {
                // 默认类型是图片
                sw = sw || img.width;
                sh = sh || img.height;
            }

            painter.drawImage(img, sx, sy, sw, sh, x, y, w, h);
            return enhancePainter;
        },

        /**
        * 渐变
        * -------------
        */

        //  线性渐变
        "createLinearGradient": function (x0, y0, x1, y1) {
            return linearGradient(painter, x0, y0, x1, y1);
        },

        // 环形渐变
        "createRadialGradient": function (cx, cy, r1, r2) {
            if (arguments.length < 4) {
                return radialGradient(painter, cx, cy, 0, r1);
            } else {
                return radialGradient(painter, cx, cy, r1, r2);
            }

        }

    };

    return enhancePainter;

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/config
/*****************************************************************/
window.__pkg__bundleSrc__['152']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('153');
var arc =__pkg__scope_args__.default;


__pkg__scope_bundle__.initPainterConfig = {

    // 填充色或图案
    "fillStyle": 'black',

    // 轮廓色或图案
    "strokeStyle": 'black',

    // 线的端点类型，（"butt"平直边缘、"round"半圆和"square"矩形）
    "lineCap": "butt",

    // 线的拐角连接方式，（"miter"连接处边缘延长相接、"bevel"对角线斜角和"round"圆）
    "lineJoin": "miter",

    // 线条宽度(单位px，下同)
    "lineWidth": 1,

    // 设置线条虚线，应该是一个数组[number,...]
    "lineDash": [],

    // 文字水平对齐方式（"left"左对齐、"center"居中和"right"右对齐）
    "textAlign": 'left',

    // 文字垂直对齐方式（"middle"垂直居中、"top"上对齐和"bottom"下对齐）
    "textBaseline": 'middle',

    // 阴影的模糊系数，默认0，也就是无阴影
    "shadowBlur": 0,

    // 阴影的颜色
    "shadowColor": "black"

};

// 文字统一设置方法
__pkg__scope_bundle__.initText = function (painter, config, x, y, deg) {

    painter.beginPath();
    painter.translate(x, y);
    painter.rotate(deg);
    painter.font = config.fontStyle + " " + config.fontWeight + " " + config.fontSize + "px " + config.fontFamily;
    return painter;
};

// 画弧统一设置方法
__pkg__scope_bundle__.initArc = function (painter, config, cx, cy, r1, r2, beginDeg, deg) {

    if (r1 > r2) {
        var temp = r1;
        r1 = r2;
        r2 = temp;
    }

    beginDeg = beginDeg % (Math.PI * 2);

    // 当|deg|>=2π的时候都认为是一个圆环
    // 为什么不取2π比较，是怕部分浏览器浮点不精确
    if (deg >= Math.PI * 1.999999 || deg <= -Math.PI * 1.999999) {
        deg = Math.PI * 2;
    } else {
        deg = deg % (Math.PI * 2);
    }

    arc(beginDeg, deg, cx, cy, r1, r2, function (
        beginA, endA,
        begInnerX, begInnerY,
        begOuterX, begOuterY,
        endInnerX, endInnerY,
        endOuterX, endOuterY,
        r
    ) {
        if (r < 0) r = -r;
        painter.beginPath();
        painter.moveTo(begInnerX, begInnerY);
        painter.arc(
            // (圆心x，圆心y，半径，开始角度，结束角度，true逆时针/false顺时针)
            cx, cy, r1, beginA, endA, false);
        // 结尾
        if (config.arcEndCap != 'round')
            painter.lineTo(endOuterX, endOuterY);
        else
            painter.arc((endInnerX + endOuterX) * 0.5, (endInnerY + endOuterY) * 0.5, r, endA - Math.PI, endA, true);
        painter.arc(cx, cy, r2, endA, beginA, true);
        // 开头
        if (config.arcStartCap != 'round')
            painter.lineTo(begInnerX, begInnerY);
        else
            painter.arc((begInnerX + begOuterX) * 0.5, (begInnerY + begOuterY) * 0.5, r, beginA, beginA - Math.PI, true);
    });
    if (config.arcStartCap == 'butt') painter.closePath();
    return painter;
};

// 画圆统一设置方法
__pkg__scope_bundle__.initCircle = function (painter, cx, cy, r) {
    painter.beginPath();
    painter.moveTo(cx + r, cy);
    painter.arc(cx, cy, r, 0, Math.PI * 2);
    return painter;
};

// 画矩形统一设置方法
__pkg__scope_bundle__.initRect = function (painter, x, y, width, height) {
    painter.beginPath();
    painter.rect(x, y, width, height);
    return painter;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/arc
/*****************************************************************/
window.__pkg__bundleSrc__['153']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
// 点（x,y）围绕中心（cx,cy）旋转deg度

var rotate = function (cx, cy, deg, x, y) {
    var cos = Math.cos(deg), sin = Math.sin(deg);
    return [
        +((x - cx) * cos - (y - cy) * sin + cx).toFixed(7),
        +((x - cx) * sin + (y - cy) * cos + cy).toFixed(7)
    ];
};

// r1和r2，内半径和外半径
// beginA起点弧度，rotateA旋转弧度式

__pkg__scope_bundle__.default= function (beginA, rotateA, cx, cy, r1, r2, doback) {

    // 保证逆时针也是可以的
    if (rotateA < 0) {
        beginA += rotateA;
        rotateA *= -1;
    }

    var temp = [], p;

    // 内部
    p = rotate(0, 0, beginA, r1, 0);
    temp[0] = p[0];
    temp[1] = p[1];
    p = rotate(0, 0, rotateA, p[0], p[1]);
    temp[2] = p[0];
    temp[3] = p[1];

    // 外部
    p = rotate(0, 0, beginA, r2, 0);
    temp[4] = p[0];
    temp[5] = p[1];
    p = rotate(0, 0, rotateA, p[0], p[1]);
    temp[6] = p[0];
    temp[7] = p[1];

    doback(
        beginA, beginA + rotateA,
        temp[0] + cx, temp[1] + cy,
        temp[4] + cx, temp[5] + cy,
        temp[2] + cx, temp[3] + cy,
        temp[6] + cx, temp[7] + cy,
        (r2 - r1) * 0.5
    );

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/Gradient
/*****************************************************************/
window.__pkg__bundleSrc__['154']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 线性渐变
__pkg__scope_bundle__.linearGradient = function (painter, x0, y0, x1, y1) {
    var gradient = painter.createLinearGradient(x0, y0, x1, y1);
    var enhanceGradient = {
        "value": function () {
            return gradient;
        },
        "addColorStop": function (stop, color) {
            gradient.addColorStop(stop, color);
            return enhanceGradient;
        }
    };
    return enhanceGradient;
};

// 环形渐变
__pkg__scope_bundle__.radialGradient = function (painter, cx, cy, r1, r2) {
    var gradient = painter.createRadialGradient(cx, cy, r1, cx, cy, r2);
    var enhanceGradient = {
        "value": function () {
            return gradient;
        },
        "addColorStop": function (stop, color) {
            gradient.addColorStop(stop, color);
            return enhanceGradient;
        }
    };
    return enhanceGradient;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/assemble
/*****************************************************************/
window.__pkg__bundleSrc__['218']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (begin, end, step, count) {
    var val = [];
    for (var index = 0; index < count; index++) val[index] = begin;

    // 非常类似进制数，每次调用都+1
    return function () {
        for (var i = 0; i < count; i++) {

            // 如果当前位可以进1
            if (val[i] + step < end) {
                val[i] = +(val[i] + step).toFixed(7);
                break;
            }

            // 如果当前位不可以，那当前位归0，尝试下一位
            else if (i < count - 1) {
                val[i] = begin;
            }
        }

        return val;
    }
};

    return __pkg__scope_bundle__;
}

import template from './index.html';
import './index.scss';

import canvasRender from '../../tool/canvas/region';

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

export default function (obj, props) {
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
import template from './index.html';
import './index.scss';

import canvasRender from '../../tool/canvas/region';

var painter;
var participants = []; // 存储所有参与者
var messages = []; // 存储所有消息
var activations = []; // 存储所有激活期
var notes = []; // 存储所有注释
var selectedElement = null; // 当前选中的元素
var isDragging = false; // 是否正在拖拽
var dragOffsetX = 0; // 拖拽偏移
var dragOffsetY = 0;
var currentTool = 'select'; // 当前工具：select, participant, message, activation, note
var currentMessageType = 'sync'; // 消息类型：sync, async, return
var currentColor = '#000000'; // 当前颜色
var currentLineWidth = 2; // 当前线宽
var tempMessage = null; // 临时消息（用于预览）
var tempParticipant = null; // 临时参与者（用于预览）
var tempNote = null; // 临时注释（用于预览）
var isDrawing = false; // 是否正在绘制
var startX = 0; // 开始绘制时的坐标
var startY = 0;
var canvasWidth = 1200; // 画布宽度
var canvasHeight = 800; // 画布高度

// 配置参数
var config = {
    participantWidth: 100,
    participantHeight: 40,
    participantSpacing: 150,
    timelineTop: 100,
    timelineBottom: 50,
    messageSpacing: 60,
    arrowSize: 8,
    noteWidth: 120,
    noteHeight: 60
};

export default function (obj, props) {
    return {
        name: "sequence-diagram",
        render: template,
        data: {
            currentTool: obj.ref('select'),
            currentMessageType: obj.ref('sync'),
            currentColor: obj.ref('#000000'),
            currentLineWidth: obj.ref(2),
            canvasWidth: obj.ref(canvasWidth),
            canvasHeight: obj.ref(canvasHeight)
        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "时序图" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './sequence-diagram.png');
        },
        mounted: function () {
            // 获取画笔
            painter = canvasRender(this._refs.mycanvas.value);

            // 设置画布大小
            this.setCanvasSize();

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

                // 键盘事件（监听Delete键）
                document.addEventListener('keydown', function (e) {
                    if (e.key === 'Delete' || e.key === 'Backspace') {
                        self.deleteSelected();
                    }
                });

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

                            if (clickedElement.type === 'participant') {
                                dragOffsetX = x - clickedElement.x;
                                dragOffsetY = y - clickedElement.y;
                            } else if (clickedElement.type === 'note') {
                                dragOffsetX = x - clickedElement.x;
                                dragOffsetY = y - clickedElement.y;
                            } else if (clickedElement.type === 'activation') {
                                dragOffsetY = y - clickedElement.startY;
                            }
                        } else {
                            selectedElement = null;
                        }
                    } else if (currentTool === 'participant') {
                        // 参与者工具
                        isDrawing = true;
                        startX = x;
                        startY = y;
                        // 计算自适应大小
                        var tempName = '参与者' + (participants.length + 1);
                        var adaptiveWidth = self.calculateAdaptiveWidth(tempName, 100, 200, 14);
                        var adaptiveHeight = 40; // 参与者高度固定

                        tempParticipant = {
                            type: 'participant',
                            x: x - adaptiveWidth / 2,
                            y: config.timelineTop - adaptiveHeight,
                            width: adaptiveWidth,
                            height: adaptiveHeight,
                            name: tempName,
                            color: currentColor,
                            lineWidth: currentLineWidth
                        };
                    } else if (currentTool === 'message') {
                        // 消息工具：检查是否点击了某个参与者
                        var clickedParticipant = self.getParticipantAt(x, y);
                        if (clickedParticipant) {
                            isDrawing = true;
                            startX = x;
                            startY = y;

                            // 计算起始点在生命线上的位置
                            var startYOnTimeline = Math.max(config.timelineTop, Math.min(y, canvas.height - config.timelineBottom));

                            tempMessage = {
                                type: 'message',
                                from: clickedParticipant,
                                fromY: startYOnTimeline,
                                to: null,
                                toY: startYOnTimeline,
                                messageType: currentMessageType,
                                text: '',
                                color: currentColor,
                                lineWidth: currentLineWidth
                            };
                        }
                    } else if (currentTool === 'activation') {
                        // 激活期工具：检查是否点击了某个参与者
                        var clickedParticipant = self.getParticipantAt(x, y);
                        if (clickedParticipant) {
                            // 计算激活期在生命线上的位置
                            var activationY = Math.max(config.timelineTop, Math.min(y, canvas.height - config.timelineBottom));

                            // 弹出对话框让用户输入激活期文字
                            var activationText = prompt('请输入激活期说明:', '');

                            // 计算自适应高度（基于文本内容）
                            var adaptiveHeight = 80; // 激活期默认高度
                            if (activationText) {
                                var lines = self.wrapText(activationText, 80, 12); // 激活期宽度固定为80
                                var lineHeight = 15;
                                var minHeight = 40;
                                adaptiveHeight = Math.max(minHeight, lines.length * lineHeight + 20);
                            }

                            activations.push({
                                type: 'activation',
                                participant: clickedParticipant,
                                startY: activationY,
                                endY: activationY + adaptiveHeight,
                                text: activationText || '',
                                color: currentColor,
                                lineWidth: currentLineWidth
                            });

                            self.render();
                        }
                    } else if (currentTool === 'note') {
                        // 注释工具
                        isDrawing = true;
                        startX = x;
                        startY = y;
                        // 计算自适应大小
                        var tempText = '注释';
                        var adaptiveWidth = self.calculateAdaptiveWidth(tempText, 120, 160, 12); // 调整最大宽度以匹配激活期
                        var adaptiveHeight = self.calculateAdaptiveHeight(tempText, adaptiveWidth, 12, 15);

                        tempNote = {
                            type: 'note',
                            x: x - 10,
                            y: y,
                            width: adaptiveWidth,
                            height: adaptiveHeight,
                            text: tempText,
                            color: currentColor,
                            lineWidth: currentLineWidth
                        };
                    }

                    self.render();
                });

                // 鼠标移动事件
                canvas.addEventListener('mousemove', function (e) {
                    var rect = canvas.getBoundingClientRect();
                    var x = e.clientX - rect.left;
                    var y = e.clientY - rect.top;

                    if (isDragging && selectedElement) {
                        if (selectedElement.type === 'participant') {
                            // 拖拽参与者
                            selectedElement.x = x - dragOffsetX;
                            selectedElement.y = config.timelineTop - config.participantHeight;
                        } else if (selectedElement.type === 'note') {
                            // 拖拽注释
                            selectedElement.x = x - dragOffsetX;
                            selectedElement.y = y - dragOffsetY;
                        } else if (selectedElement.type === 'activation') {
                            // 拖拽激活期（只允许垂直移动）
                            var deltaY = y - dragOffsetY - selectedElement.startY;
                            selectedElement.startY += deltaY;
                            selectedElement.endY += deltaY;

                            // 确保激活期在合理范围内
                            selectedElement.startY = Math.max(config.timelineTop, Math.min(selectedElement.startY, canvas.height - config.timelineBottom - 20));
                            selectedElement.endY = Math.max(selectedElement.startY + 20, Math.min(selectedElement.endY, canvas.height - config.timelineBottom));
                        }
                        self.render();
                    } else if (isDrawing) {
                        if (currentTool === 'participant' && tempParticipant) {
                            // 更新临时参与者
                            tempParticipant.x = x - config.participantWidth / 2;
                            tempParticipant.y = y - config.participantHeight / 2;
                        } else if (currentTool === 'message' && tempMessage) {
                            // 更新临时消息
                            var targetParticipant = self.getParticipantAt(x, y);
                            if (targetParticipant) {
                                tempMessage.to = targetParticipant;
                                // 保持水平连线，使用起始点的Y坐标
                                tempMessage.toY = tempMessage.fromY;
                            } else {
                                tempMessage.to = null;
                                // 保持水平连线，使用起始点的Y坐标
                                tempMessage.toY = tempMessage.fromY;
                            }
                        } else if (currentTool === 'note' && tempNote) {
                            // 更新临时注释
                            tempNote.x = x;
                            tempNote.y = y;
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
                        if (currentTool === 'participant' && tempParticipant) {
                            // 创建参与者
                            if (tempParticipant.name) {
                                // 计算自适应大小
                                var adaptiveWidth = self.calculateAdaptiveWidth(tempParticipant.name, 100, 200, 14);
                                var adaptiveHeight = 40; // 参与者高度固定

                                participants.push({
                                    type: 'participant',
                                    x: tempParticipant.x + (tempParticipant.width - adaptiveWidth) / 2,
                                    y: config.timelineTop - adaptiveHeight,
                                    width: adaptiveWidth,
                                    height: adaptiveHeight,
                                    name: tempParticipant.name,
                                    color: currentColor,
                                    lineWidth: currentLineWidth
                                });
                            }
                        } else if (currentTool === 'message' && tempMessage) {
                            // 创建消息
                            if (tempMessage.from && tempMessage.to && tempMessage.from !== tempMessage.to) {
                                var messageText = prompt('请输入消息内容:', '消息');
                                if (messageText) {
                                    messages.push({
                                        type: 'message',
                                        from: tempMessage.from,
                                        fromY: tempMessage.fromY,
                                        to: tempMessage.to,
                                        toY: tempMessage.fromY, // 保持水平连线
                                        messageType: tempMessage.messageType,
                                        text: messageText,
                                        color: currentColor,
                                        lineWidth: currentLineWidth
                                    });
                                }
                            }
                        } else if (currentTool === 'note' && tempNote) {
                            // 创建注释
                            var noteText = prompt('请输入注释内容:', '注释');
                            if (noteText) {
                                // 计算自适应大小
                                var adaptiveWidth = self.calculateAdaptiveWidth(noteText, 120, 160, 12); // 调整最大宽度以匹配激活期
                                var adaptiveHeight = self.calculateAdaptiveHeight(noteText, adaptiveWidth, 12, 15);

                                notes.push({
                                    type: 'note',
                                    x: tempNote.x,
                                    y: tempNote.y,
                                    width: adaptiveWidth,
                                    height: adaptiveHeight,
                                    text: noteText,
                                    color: currentColor,
                                    lineWidth: currentLineWidth
                                });
                            }
                        }

                        isDrawing = false;
                        tempParticipant = null;
                        tempMessage = null;
                        tempNote = null;
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
                        if (clickedElement.type === 'participant') {
                            var newName = prompt('编辑参与者名称:', clickedElement.name || '');
                            if (newName !== null) {
                                clickedElement.name = newName;
                                // 更新自适应大小
                                var adaptiveWidth = self.calculateAdaptiveWidth(newName, 100, 200, 14);
                                clickedElement.width = adaptiveWidth;
                                self.render();
                            }
                        } else if (clickedElement.type === 'message') {
                            var newText = prompt('编辑消息内容:', clickedElement.text || '');
                            if (newText !== null) {
                                clickedElement.text = newText;
                                self.render();
                            }
                        } else if (clickedElement.type === 'activation') {
                            var newText = prompt('编辑激活期说明:', clickedElement.text || '');
                            if (newText !== null) {
                                clickedElement.text = newText;
                                // 更新自适应大小（基于文本内容）
                                if (newText) {
                                    var lines = self.wrapText(newText, 80, 12); // 激活期宽度固定为80
                                    var lineHeight = 15;
                                    var minHeight = 40;
                                    var adaptiveHeight = Math.max(minHeight, lines.length * lineHeight + 20);
                                    clickedElement.endY = clickedElement.startY + adaptiveHeight;
                                }
                                self.render();
                            }
                        } else if (clickedElement.type === 'note') {
                            var newText = prompt('编辑注释内容:', clickedElement.text || '');
                            if (newText !== null) {
                                clickedElement.text = newText;
                                // 更新自适应大小
                                var adaptiveWidth = self.calculateAdaptiveWidth(newText, 120, 160, 12); // 调整最大宽度以匹配激活期
                                var adaptiveHeight = self.calculateAdaptiveHeight(newText, adaptiveWidth, 12, 15);
                                clickedElement.width = adaptiveWidth;
                                clickedElement.height = adaptiveHeight;
                                self.render();
                            }
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

                // 先检查注释
                for (var i = notes.length - 1; i >= 0; i--) {
                    var note = notes[i];
                    if (x >= note.x && x <= note.x + note.width &&
                        y >= note.y && y <= note.y + note.height) {
                        return note;
                    }
                }

                // 检查消息
                for (var i = messages.length - 1; i >= 0; i--) {
                    var message = messages[i];
                    if (!message.from || !message.to) continue;

                    var fromX = message.from.x + message.from.width / 2;
                    var toX = message.to.x + message.to.width / 2;

                    // 简单的消息点击检测（检查点是否在线段附近）
                    var tolerance = 8; // 增加容差
                    var minX = Math.min(fromX, toX) - tolerance;
                    var maxX = Math.max(fromX, toX) + tolerance;
                    var minY = Math.min(message.fromY, message.toY) - tolerance;
                    var maxY = Math.max(message.fromY, message.toY) + tolerance;

                    if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
                        // 计算点到线段的距离
                        var lineLength = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(message.toY - message.fromY, 2));
                        if (lineLength === 0) continue;

                        var t = ((x - fromX) * (toX - fromX) + (y - message.fromY) * (message.toY - message.fromY)) / (lineLength * lineLength);
                        t = Math.max(0, Math.min(1, t));

                        var closestX = fromX + t * (toX - fromX);
                        var closestY = message.fromY + t * (message.toY - message.fromY);

                        var distance = Math.sqrt(Math.pow(x - closestX, 2) + Math.pow(y - closestY, 2));

                        if (distance <= tolerance) {
                            return message;
                        }
                    }
                }

                // 检查激活期
                for (var i = activations.length - 1; i >= 0; i--) {
                    var activation = activations[i];
                    if (!activation.participant) continue;

                    var participant = activation.participant;
                    var centerX = participant.x + participant.width / 2;
                    var activationWidth = participant.width * 0.6;
                    var activationX = centerX - activationWidth / 2;

                    if (x >= activationX && x <= activationX + activationWidth &&
                        y >= activation.startY && y <= activation.endY) {
                        return activation;
                    }
                }

                // 最后检查参与者
                for (var i = participants.length - 1; i >= 0; i--) {
                    var participant = participants[i];
                    if (x >= participant.x && x <= participant.x + participant.width &&
                        y >= participant.y && y <= participant.y + participant.height) {
                        return participant;
                    }
                }

                return null;
            },

            // 获取指定位置的参与者
            getParticipantAt: function (x, y) {
                var canvas = this._refs.mycanvas.value;

                // 检查是否在参与者的生命线上
                for (var i = 0; i < participants.length; i++) {
                    var participant = participants[i];
                    var participantCenterX = participant.x + participant.width / 2;

                    // 检查是否在生命线上（垂直线）
                    if (Math.abs(x - participantCenterX) <= 5 &&
                        y >= config.timelineTop &&
                        y <= canvas.height - config.timelineBottom) {
                        return participant;
                    }
                }

                return null;
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

                // 绘制参与者
                for (var i = 0; i < participants.length; i++) {
                    this.drawParticipant(participants[i], participants[i] === selectedElement);
                }

                // 绘制生命线
                this.drawLifelines();

                // 绘制激活期
                for (var i = 0; i < activations.length; i++) {
                    this.drawActivation(activations[i], activations[i] === selectedElement);
                }

                // 绘制消息
                for (var i = 0; i < messages.length; i++) {
                    this.drawMessage(messages[i], messages[i] === selectedElement);
                }

                // 绘制临时消息（用于预览）
                if (tempMessage) {
                    this.drawTempMessage();
                }

                // 绘制临时参与者（用于预览）
                if (tempParticipant) {
                    this.drawParticipant(tempParticipant, false);
                }

                // 绘制临时注释（用于预览）
                if (tempNote) {
                    this.drawNote(tempNote, false);
                }

                // 绘制注释
                for (var i = 0; i < notes.length; i++) {
                    this.drawNote(notes[i], notes[i] === selectedElement);
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

            // 绘制参与者
            drawParticipant: function (participant, isSelected) {
                painter.config({
                    strokeStyle: participant.color,
                    fillStyle: '#FFFFFF',
                    lineWidth: participant.lineWidth
                });

                if (isSelected) {
                    // 绘制选中框
                    painter.config({
                        strokeStyle: '#0066CC',
                        lineWidth: 1,
                        lineDash: [5, 5]
                    }).strokeRect(participant.x - 5, participant.y - 5, participant.width + 10, participant.height + 10);
                    painter.config({ lineDash: [] });
                }

                // 绘制参与者矩形
                painter.strokeRect(participant.x, participant.y, participant.width, participant.height);

                // 绘制参与者名称
                painter.config({
                    fillStyle: participant.color,
                    fontSize: 14,
                    textAlign: 'center',
                    textBaseline: 'middle'
                }).fillText(participant.name, participant.x + participant.width / 2, participant.y + participant.height / 2);
            },

            // 绘制生命线
            drawLifelines: function () {
                var canvas = this._refs.mycanvas.value;

                painter.config({
                    strokeStyle: '#000000',
                    lineWidth: 1,
                    lineDash: [5, 5]
                });

                for (var i = 0; i < participants.length; i++) {
                    var participant = participants[i];
                    var centerX = participant.x + participant.width / 2;

                    // 绘制生命线（虚线）
                    painter.beginPath()
                        .moveTo(centerX, config.timelineTop)
                        .lineTo(centerX, canvas.height - config.timelineBottom)
                        .stroke();
                }

                painter.config({ lineDash: [] });
            },

            // 绘制激活期
            drawActivation: function (activation, isSelected) {
                var participant = activation.participant;
                var centerX = participant.x + participant.width / 2;
                var activationWidth = participant.width * 0.6;
                var activationX = centerX - activationWidth / 2;

                painter.config({
                    strokeStyle: activation.color,
                    fillStyle: isSelected ? '#C0C0C0' : '#E0E0E0',
                    lineWidth: activation.lineWidth
                });

                // 绘制激活期矩形
                painter.fillRect(activationX - 6, activation.startY, activationWidth + 12, activation.endY - activation.startY);
                painter.strokeRect(activationX - 6, activation.startY, activationWidth + 12, activation.endY - activation.startY);

                // 绘制激活期文字
                if (activation.text) {
                    painter.config({
                        fillStyle: '#000000',
                        fontSize: 12,
                        textAlign: 'center',
                        textBaseline: 'middle'
                    });

                    // 简单的文本换行处理
                    var lines = this.wrapText(activation.text, activationWidth - 10, 12);
                    var lineHeight = 15;

                    // 计算文字起始位置，减少底部留白
                    var totalTextHeight = lines.length * lineHeight;
                    var availableHeight = activation.endY - activation.startY - 10; // 减少上下边距
                    var startTextY = activation.startY + Math.max(5, (availableHeight - totalTextHeight) / 2);

                    // 确保文字不会超出激活期范围
                    var maxLines = Math.floor(availableHeight / lineHeight);
                    lines = lines.slice(0, maxLines);

                    for (var i = 0; i < lines.length; i++) {
                        var textY = startTextY + i * lineHeight + lineHeight / 2;
                        if (textY <= activation.endY - 5 && textY >= activation.startY + 5) {
                            painter.fillText(lines[i], centerX, textY);
                        }
                    }
                }

                // 绘制选中框
                if (isSelected) {
                    painter.config({
                        strokeStyle: '#0066CC',
                        lineWidth: 1,
                        lineDash: [5, 5]
                    }).strokeRect(activationX - 9, activation.startY - 3, activationWidth + 19, activation.endY - activation.startY + 6);
                    painter.config({ lineDash: [] });
                }
            },

            // 绘制消息
            drawMessage: function (message, isSelected) {
                var fromParticipant = message.from;
                var toParticipant = message.to;

                var fromX = fromParticipant.x + fromParticipant.width / 2;
                var toX = toParticipant.x + toParticipant.width / 2;

                painter.config({
                    strokeStyle: message.color,
                    lineWidth: message.lineWidth
                });

                // 根据消息类型绘制不同的线型
                if (message.messageType === 'async') {
                    // 异步消息（虚线）
                    painter.config({
                        lineDash: [5, 3]
                    });
                } else if (message.messageType === 'return') {
                    // 返回消息（虚线带箭头）
                    painter.config({
                        lineDash: [5, 3]
                    });
                } else {
                    // 同步消息（实线）
                    painter.config({
                        lineDash: []
                    });
                }

                // 绘制消息线（保持水平）
                painter.beginPath()
                    .moveTo(fromX, message.fromY)
                    .lineTo(toX, message.fromY) // 使用fromY保持水平
                    .stroke();

                // 绘制箭头（除了返回消息）
                if (message.messageType !== 'return') {
                    this.drawArrow(fromX, message.fromY, toX, message.fromY, message.color);
                } else {
                    this.drawArrow(toX, message.fromY, fromX, message.fromY, message.color);
                }

                // 绘制消息文本
                var midX = (fromX + toX) / 2;

                painter.config({
                    fillStyle: message.color,
                    fontSize: 12,
                    textAlign: 'center',
                    textBaseline: 'bottom'
                }).fillText(message.text, midX, message.fromY - 5);

                // 绘制选中效果
                if (isSelected) {
                    // 绘制选中框
                    var minX = Math.min(fromX, toX) - 10;
                    var maxX = Math.max(fromX, toX) + 10;
                    var minY = message.fromY - 25;
                    var maxY = message.fromY + 15;

                    painter.config({
                        strokeStyle: '#0066CC',
                        lineWidth: 1,
                        lineDash: [5, 5]
                    }).strokeRect(minX, minY, maxX - minX, maxY - minY);
                    painter.config({ lineDash: [] });
                }

                painter.config({ lineDash: [] });
            },

            // 绘制临时消息（用于预览）
            drawTempMessage: function () {
                if (!tempMessage.from) return;

                var fromParticipant = tempMessage.from;
                var fromX = fromParticipant.x + fromParticipant.width / 2;
                var toX = tempMessage.to ? tempMessage.to.x + tempMessage.to.width / 2 : tempMessage.toX;

                painter.config({
                    strokeStyle: tempMessage.color,
                    lineWidth: tempMessage.lineWidth,
                    lineDash: [5, 5]
                });

                // 绘制临时消息线（保持水平）
                painter.beginPath()
                    .moveTo(fromX, tempMessage.fromY)
                    .lineTo(toX, tempMessage.fromY) // 使用fromY保持水平
                    .stroke();

                // 绘制箭头
                if (tempMessage.messageType !== 'return') {
                    this.drawArrow(fromX, tempMessage.fromY, toX, tempMessage.fromY, tempMessage.color);
                } else {
                    this.drawArrow(toX, tempMessage.fromY, fromX, tempMessage.fromY, tempMessage.color);
                }

                painter.config({ lineDash: [] });
            },

            // 绘制注释
            drawNote: function (note, isSelected) {
                painter.config({
                    strokeStyle: note.color,
                    fillStyle: '#FFFFE0',
                    lineWidth: note.lineWidth
                });

                if (isSelected) {
                    // 绘制选中框
                    painter.config({
                        strokeStyle: '#0066CC',
                        lineWidth: 1,
                        lineDash: [5, 5]
                    }).strokeRect(note.x - 20, note.y - 5, note.width + 40, note.height + 10);
                    painter.config({ lineDash: [] });
                }

                // 绘制注释矩形
                painter.fillRect(note.x - 15, note.y, note.width + 30, note.height);
                painter.strokeRect(note.x - 15, note.y, note.width + 30, note.height);

                // 绘制注释文本
                if (note.text) {
                    painter.config({
                        fillStyle: note.color,
                        fontSize: 12,
                        textAlign: 'center',
                        textBaseline: 'middle'
                    });

                    // 计算文本换行
                    var availableWidth = note.width - 10; // 减去左右边距
                    var lines = this.wrapText(note.text, availableWidth, 12);
                    var lineHeight = 15;

                    // 计算文字起始位置，垂直居中
                    var totalTextHeight = lines.length * lineHeight;
                    var availableHeight = note.height - 10; // 减少上下边距
                    var startTextY = note.y + Math.max(5, (availableHeight - totalTextHeight) / 2);

                    // 确保文字不会超出注释范围
                    var maxLines = Math.floor(availableHeight / lineHeight);
                    lines = lines.slice(0, maxLines);

                    for (var i = 0; i < lines.length; i++) {
                        var textY = startTextY + i * lineHeight + lineHeight / 2;
                        if (textY <= note.y + note.height - 5 && textY >= note.y + 5) {
                            // 确保每行文字不会超出注释宽度
                            var lineWidth = this.getTextWidth(lines[i], 12);
                            if (lineWidth <= availableWidth) {
                                painter.fillText(lines[i], note.x + note.width / 2, textY);
                            } else {
                                // 如果单行文字仍然超出，进行字符级截断
                                var truncatedLine = this.truncateText(lines[i], availableWidth, 12);
                                painter.fillText(truncatedLine, note.x + note.width / 2, textY);
                            }
                        }
                    }
                }
            },

            // 绘制箭头
            drawArrow: function (fromX, fromY, toX, toY, color) {
                var angle = Math.atan2(toY - fromY, toX - fromX);
                var arrowLength = config.arrowSize;

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

            // 文本换行处理
            wrapText: function (text, maxWidth, fontSize) {
                // 如果文本为空，返回空数组
                if (!text) return [''];

                // 按空格分割单词
                var words = text.split(' ');
                var lines = [];
                var currentLine = '';

                for (var i = 0; i < words.length; i++) {
                    var word = words[i];

                    // 如果单词本身就很长，需要强制换行
                    if (this.getTextWidth(word, fontSize) > maxWidth) {
                        if (currentLine) {
                            lines.push(currentLine);
                            currentLine = '';
                        }

                        // 强制换行长单词
                        var remainingWord = word;
                        while (remainingWord.length > 0) {
                            var chunk = remainingWord;
                            while (chunk.length > 1 && this.getTextWidth(chunk, fontSize) > maxWidth) {
                                chunk = chunk.slice(0, -1);
                            }
                            lines.push(chunk);
                            remainingWord = remainingWord.slice(chunk.length);
                        }
                    } else {
                        var testLine = currentLine + (currentLine ? ' ' : '') + word;
                        var testWidth = this.getTextWidth(testLine, fontSize);

                        if (testWidth > maxWidth && currentLine !== '') {
                            lines.push(currentLine);
                            currentLine = word;
                        } else {
                            currentLine = testLine;
                        }
                    }
                }

                if (currentLine) {
                    lines.push(currentLine);
                }

                // 如果没有任何行，至少返回一行
                if (lines.length === 0) {
                    lines.push(text);
                }

                return lines;
            },

            // 计算文本宽度
            getTextWidth: function (text, fontSize) {
                return painter.config({
                    fontSize
                }).painter().draw.measureText(text).width;
            },

            // 计算自适应宽度（用于注释和激活期）
            calculateAdaptiveWidth: function (text, minWidth, maxWidth, fontSize) {
                // 使用实际绘制的最大行宽来计算宽度
                var lines = this.wrapText(text, maxWidth - 20, fontSize);
                var maxLineWidth = 0;

                for (var i = 0; i < lines.length; i++) {
                    var lineWidth = this.getTextWidth(lines[i], fontSize);
                    maxLineWidth = Math.max(maxLineWidth, lineWidth);
                }

                // 添加边距
                var padding = 20;
                var width = Math.max(minWidth, maxLineWidth + padding);
                // 确保不超过画布宽度的一定比例
                var maxCanvasWidth = canvasWidth * 0.8;
                return Math.min(width, maxWidth, maxCanvasWidth);
            },

            // 计算自适应高度
            calculateAdaptiveHeight: function (text, width, fontSize, lineHeight) {
                var lines = this.wrapText(text, width - 20, fontSize);
                return Math.max(40, lines.length * lineHeight + 20);
            },

            // 设置工具
            setTool: function (event) {
                var tool = event.target.getAttribute('data-tool');
                currentTool = tool;
                this.currentTool = tool;
                selectedElement = null;
            },

            // 设置消息类型
            setMessageType: function (event) {
                var type = event.target.getAttribute('data-type');
                currentMessageType = type;
                this.currentMessageType = type;
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

            // 设置画布宽度
            setCanvasWidth: function (event) {
                var width = parseInt(event.target.value);
                canvasWidth = Math.max(800, Math.min(3000, width));
                this.canvasWidth = canvasWidth;
                this.setCanvasSize();
                this.render();
            },

            // 设置画布高度
            setCanvasHeight: function (event) {
                var height = parseInt(event.target.value);
                canvasHeight = Math.max(600, Math.min(2000, height));
                this.canvasHeight = canvasHeight;
                this.setCanvasSize();
                this.render();
            },

            // 截断文本以适应指定宽度
            truncateText: function (text, maxWidth, fontSize) {
                var width = this.getTextWidth(text, fontSize);
                if (width <= maxWidth) {
                    return text;
                }

                // 逐步移除字符直到适合宽度
                var truncated = text;
                while (truncated.length > 0) {
                    truncated = truncated.slice(0, -1);
                    if (this.getTextWidth(truncated + '...', fontSize) <= maxWidth) {
                        return truncated + '...';
                    }
                }

                return '...';
            },

            // 设置画布大小
            setCanvasSize: function () {
                var canvas = this._refs.mycanvas.value;
                canvas.style.width = canvasWidth + 'px';
                canvas.style.height = canvasHeight + 'px';
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;

                // 重新初始化画笔
                painter = canvasRender(canvas);
            },

            // 删除选中的元素
            deleteSelected: function () {
                var elementToDelete = selectedElement;
                if (!elementToDelete) return;

                if (elementToDelete.type === 'participant') {
                    // 删除参与者及其相关的消息和激活期
                    var index = participants.indexOf(elementToDelete);
                    if (index > -1) {
                        participants.splice(index, 1);

                        // 删除相关的消息
                        for (var i = messages.length - 1; i >= 0; i--) {
                            if (messages[i].from === elementToDelete || messages[i].to === elementToDelete) {
                                messages.splice(i, 1);
                            }
                        }

                        // 删除相关的激活期
                        for (var i = activations.length - 1; i >= 0; i--) {
                            if (activations[i].participant === elementToDelete) {
                                activations.splice(i, 1);
                            }
                        }
                    }
                } else if (elementToDelete.type === 'message') {
                    // 删除消息
                    var index = messages.indexOf(elementToDelete);
                    if (index > -1) {
                        messages.splice(index, 1);
                    }
                } else if (elementToDelete.type === 'activation') {
                    // 删除激活期
                    var index = activations.indexOf(elementToDelete);
                    if (index > -1) {
                        activations.splice(index, 1);
                    }
                } else if (elementToDelete.type === 'note') {
                    // 删除注释
                    var index = notes.indexOf(elementToDelete);
                    if (index > -1) {
                        notes.splice(index, 1);
                    }
                }

                selectedElement = null;
                this.render();
            },

            // 清空画布
            clearCanvas: function () {
                if (confirm('确定要清空所有内容吗？')) {
                    participants = [];
                    messages = [];
                    activations = [];
                    notes = [];
                    selectedElement = null;
                    this.render();
                }
            },

            // 保存画布为图片
            saveCanvas: function () {
                var canvas = this._refs.mycanvas.value;
                var link = document.createElement('a');
                link.download = '时序图_' + new Date().getTime() + '.png';
                link.href = canvas.toDataURL();
                link.click();
            },

            // 导出数据
            saveData: function () {
                var data = {
                    participants: participants,
                    messages: messages.map(function (msg) {
                        return {
                            fromIndex: participants.indexOf(msg.from),
                            toIndex: participants.indexOf(msg.to),
                            fromY: msg.fromY,
                            toY: msg.toY,
                            messageType: msg.messageType,
                            text: msg.text,
                            color: msg.color,
                            lineWidth: msg.lineWidth
                        };
                    }),
                    activations: activations.map(function (act) {
                        return {
                            participantIndex: participants.indexOf(act.participant),
                            startY: act.startY,
                            endY: act.endY,
                            color: act.color,
                            lineWidth: act.lineWidth
                        };
                    }),
                    notes: notes
                };

                var jsonData = JSON.stringify(data, null, 2);
                var blob = new Blob([jsonData], { type: 'application/json' });
                var url = URL.createObjectURL(blob);

                var link = document.createElement('a');
                link.download = '时序图数据_' + new Date().getTime() + '.json';
                link.href = url;
                link.click();

                URL.revokeObjectURL(url);
            },

            // 导入数据
            openData: function () {
                var input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';

                input.onchange = function (e) {
                    var file = e.target.files[0];
                    if (!file) return;

                    var reader = new FileReader();
                    reader.onload = function (e) {
                        try {
                            var data = JSON.parse(e.target.result);

                            // 清空当前数据
                            participants = [];
                            messages = [];
                            activations = [];
                            notes = [];
                            selectedElement = null;

                            // 导入参与者
                            if (data.participants) {
                                participants = data.participants;
                            }

                            // 导入消息
                            if (data.messages) {
                                for (var i = 0; i < data.messages.length; i++) {
                                    var msg = data.messages[i];
                                    if (msg.fromIndex >= 0 && msg.fromIndex < participants.length &&
                                        msg.toIndex >= 0 && msg.toIndex < participants.length) {
                                        messages.push({
                                            type: 'message',
                                            from: participants[msg.fromIndex],
                                            fromY: msg.fromY,
                                            to: participants[msg.toIndex],
                                            toY: msg.toY,
                                            messageType: msg.messageType,
                                            text: msg.text,
                                            color: msg.color || currentColor,
                                            lineWidth: msg.lineWidth || currentLineWidth
                                        });
                                    }
                                }
                            }

                            // 导入激活期
                            if (data.activations) {
                                for (var i = 0; i < data.activations.length; i++) {
                                    var act = data.activations[i];
                                    if (act.participantIndex >= 0 && act.participantIndex < participants.length) {
                                        activations.push({
                                            type: 'activation',
                                            participant: participants[act.participantIndex],
                                            startY: act.startY,
                                            endY: act.endY,
                                            color: act.color || currentColor,
                                            lineWidth: act.lineWidth || currentLineWidth
                                        });
                                    }
                                }
                            }

                            // 导入注释
                            if (data.notes) {
                                notes = data.notes;
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
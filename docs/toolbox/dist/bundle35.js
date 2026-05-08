
/*************************** [bundle] ****************************/
// Original file:./src/pages/sequence-diagram/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['98']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('334');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('335');


__pkg__scope_args__=window.__pkg__getBundle('313');
var canvasRender =__pkg__scope_args__.default;


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

__pkg__scope_bundle__.default= function (obj, props) {
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

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/sequence-diagram/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['334']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,9,86]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,7]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[3,5]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[4]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[6]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"h2","attrs":{},"childNodes":[8]},{"type":"text","content":"时序图","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"toolbar"},"childNodes":[10,28,37,48,62,69,76]},{"type":"tag","name":"div","attrs":{"class":"tool-group"},"childNodes":[11,13,16,19,22,25]},{"type":"tag","name":"label","attrs":{},"childNodes":[12]},{"type":"text","content":"工具:","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-bind:class":"'tool-btn ' + (currentTool === 'select' ? 'active' : '')","data-tool":"select","ui-on:click":"setTool"},"childNodes":[14,15]},{"type":"tag","name":"i","attrs":{"class":"icon-select"},"childNodes":[]},{"type":"text","content":"选择","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-bind:class":"'tool-btn ' + (currentTool === 'participant' ? 'active' : '')","data-tool":"participant","ui-on:click":"setTool"},"childNodes":[17,18]},{"type":"tag","name":"i","attrs":{"class":"icon-participant"},"childNodes":[]},{"type":"text","content":"参与者","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-bind:class":"'tool-btn ' + (currentTool === 'message' ? 'active' : '')","data-tool":"message","ui-on:click":"setTool"},"childNodes":[20,21]},{"type":"tag","name":"i","attrs":{"class":"icon-message"},"childNodes":[]},{"type":"text","content":"消息","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-bind:class":"'tool-btn ' + (currentTool === 'activation' ? 'active' : '')","data-tool":"activation","ui-on:click":"setTool"},"childNodes":[23,24]},{"type":"tag","name":"i","attrs":{"class":"icon-activation"},"childNodes":[]},{"type":"text","content":"激活期","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-bind:class":"'tool-btn ' + (currentTool === 'note' ? 'active' : '')","data-tool":"note","ui-on:click":"setTool"},"childNodes":[26,27]},{"type":"tag","name":"i","attrs":{"class":"icon-note"},"childNodes":[]},{"type":"text","content":"注释","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"tool-group","ui-show":"currentTool === 'message'"},"childNodes":[29,31,33,35]},{"type":"tag","name":"label","attrs":{},"childNodes":[30]},{"type":"text","content":"消息类型:","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-bind:class":"'tool-btn ' + (currentMessageType === 'sync' ? 'active' : '')","data-type":"sync","ui-on:click":"setMessageType"},"childNodes":[32]},{"type":"text","content":"同步","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-bind:class":"'tool-btn ' + (currentMessageType === 'async' ? 'active' : '')","data-type":"async","ui-on:click":"setMessageType"},"childNodes":[34]},{"type":"text","content":"异步","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-bind:class":"'tool-btn ' + (currentMessageType === 'return' ? 'active' : '')","data-type":"return","ui-on:click":"setMessageType"},"childNodes":[36]},{"type":"text","content":"返回","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"tool-group"},"childNodes":[38,40]},{"type":"tag","name":"label","attrs":{},"childNodes":[39]},{"type":"text","content":"颜色:","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"color-palette"},"childNodes":[41,42,43,44,45,46,47]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#000000' ? 'active' : '')","style":"background-color: #000000","data-value":"#000000","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#FF0000' ? 'active' : '')","style":"background-color: #FF0000","data-value":"#FF0000","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#00FF00' ? 'active' : '')","style":"background-color: #00FF00","data-value":"#00FF00","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#0000FF' ? 'active' : '')","style":"background-color: #0000FF","data-value":"#0000FF","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#FFFF00' ? 'active' : '')","style":"background-color: #FFFF00","data-value":"#FFFF00","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#FF00FF' ? 'active' : '')","style":"background-color: #FF00FF","data-value":"#FF00FF","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ui-bind:class":"'color-item ' + (currentColor === '#00FFFF' ? 'active' : '')","style":"background-color: #00FFFF","data-value":"#00FFFF","ui-on:click":"setColor"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"tool-group"},"childNodes":[49,51]},{"type":"tag","name":"label","attrs":{},"childNodes":[50]},{"type":"text","content":"样式:","childNodes":[]},{"type":"tag","name":"select","attrs":{"ui-bind:value":"currentLineWidth","ui-on:change":"setLineWidth"},"childNodes":[52,54,56,58,60]},{"type":"tag","name":"option","attrs":{"value":"1"},"childNodes":[53]},{"type":"text","content":"1px","childNodes":[]},{"type":"tag","name":"option","attrs":{"value":"2"},"childNodes":[55]},{"type":"text","content":"2px","childNodes":[]},{"type":"tag","name":"option","attrs":{"value":"3"},"childNodes":[57]},{"type":"text","content":"3px","childNodes":[]},{"type":"tag","name":"option","attrs":{"value":"4"},"childNodes":[59]},{"type":"text","content":"4px","childNodes":[]},{"type":"tag","name":"option","attrs":{"value":"5"},"childNodes":[61]},{"type":"text","content":"5px","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"tool-group"},"childNodes":[63,66]},{"type":"tag","name":"button","attrs":{"class":"delete-btn","ui-on:click":"deleteSelected"},"childNodes":[64,65]},{"type":"tag","name":"i","attrs":{"class":"icon-delete"},"childNodes":[]},{"type":"text","content":"删除选中","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"clear-btn","ui-on:click":"clearCanvas"},"childNodes":[67,68]},{"type":"tag","name":"i","attrs":{"class":"icon-clear"},"childNodes":[]},{"type":"text","content":"清空画布","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"tool-group"},"childNodes":[70,72,73,75]},{"type":"tag","name":"label","attrs":{},"childNodes":[71]},{"type":"text","content":"画布大小:","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"number","ui-bind:value":"canvasWidth","ui-on:input":"setCanvasWidth","min":"100","max":"3000","style":"width: 60px;"},"childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[74]},{"type":"text","content":"×","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"number","ui-bind:value":"canvasHeight","ui-on:input":"setCanvasHeight","min":"100","max":"2000","style":"width: 60px;"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"tool-group"},"childNodes":[77,80,83]},{"type":"tag","name":"button","attrs":{"class":"save-btn","ui-on:click":"saveCanvas"},"childNodes":[78,79]},{"type":"tag","name":"i","attrs":{"class":"icon-save"},"childNodes":[]},{"type":"text","content":"保存图片","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"export-btn","ui-on:click":"saveData"},"childNodes":[81,82]},{"type":"tag","name":"i","attrs":{"class":"icon-export"},"childNodes":[]},{"type":"text","content":"导出数据","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"import-btn","ui-on:click":"openData"},"childNodes":[84,85]},{"type":"tag","name":"i","attrs":{"class":"icon-import"},"childNodes":[]},{"type":"text","content":"导入数据","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content"},"childNodes":[87]},{"type":"tag","name":"canvas","attrs":{"ui-bind:style":"'width: ' + canvasWidth + 'px; height: ' + canvasHeight + 'px;'","ref":"mycanvas"},"childNodes":[88]},{"type":"text","content":"非常抱歉，您的浏览器不支持canvas!","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/sequence-diagram/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['335']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"sequence-diagram\"]{\n\nwidth: calc(100vw - 100px);\n\nleft: 50px;\n\ntop: 25px;\n\n}\n\n [page-view=\"sequence-diagram\"][focus=\"no\"]>header{\n\nbackground-color: #ececec;\n\n}\n\n [page-view=\"sequence-diagram\"]>header{\n\ntext-align: left;\n\nline-height: 50px;\n\nbackground-color: #e5e5e5;\n\n}\n\n [page-view=\"sequence-diagram\"]>header>h2{\n\ncolor: #2e88fb;\n\nfont-size: 20px;\n\npadding-left: 50px;\n\nbackground-image: url(\"./sequence-diagram.jpeg\");\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\nfont-family: fangsong;\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"sequence-diagram\"]>.toolbar{\n\ndisplay: flex;\n\nflex-wrap: wrap;\n\npadding: 10px;\n\nbackground-color: #f5f5f5;\n\nborder-bottom: 1px solid #ddd;\n\n}\n\n [page-view=\"sequence-diagram\"]>.toolbar .tool-group{\n\ndisplay: flex;\n\nalign-items: center;\n\nmargin-right: 20px;\n\nmargin-bottom: 5px;\n\n}\n\n [page-view=\"sequence-diagram\"]>.toolbar .tool-group label{\n\nmargin-right: 8px;\n\nfont-weight: bold;\n\nfont-size: 14px;\n\ncolor: #333;\n\n}\n\n [page-view=\"sequence-diagram\"]>.toolbar .tool-group .tool-btn{\n\npadding: 6px 12px;\n\nmargin-right: 5px;\n\nbackground-color: #fff;\n\nborder: 1px solid #ddd;\n\nborder-radius: 4px;\n\ncursor: pointer;\n\nfont-size: 12px;\n\ntransition: all 0.2s;\n\n}\n\n [page-view=\"sequence-diagram\"]>.toolbar .tool-group .tool-btn:hover{\n\nbackground-color: #e9e9e9;\n\n}\n\n [page-view=\"sequence-diagram\"]>.toolbar .tool-group .tool-btn.active{\n\nbackground-color: #007bff;\n\ncolor: white;\n\nborder-color: #007bff;\n\n}\n\n [page-view=\"sequence-diagram\"]>.toolbar .tool-group .color-palette{\n\ndisplay: flex;\n\n}\n\n [page-view=\"sequence-diagram\"]>.toolbar .tool-group .color-palette .color-item{\n\nwidth: 20px;\n\nheight: 20px;\n\nmargin-right: 5px;\n\nborder: 1px solid #ddd;\n\nborder-radius: 3px;\n\ncursor: pointer;\n\ntransition: transform 0.2s;\n\n}\n\n [page-view=\"sequence-diagram\"]>.toolbar .tool-group .color-palette .color-item:hover{\n\ntransform: scale(1.1);\n\n}\n\n [page-view=\"sequence-diagram\"]>.toolbar .tool-group .color-palette .color-item.active{\n\nborder: 2px solid #007bff;\n\ntransform: scale(1.1);\n\n}\n\n [page-view=\"sequence-diagram\"]>.toolbar .tool-group select{\n\npadding: 6px 10px;\n\nborder: 1px solid #ddd;\n\nborder-radius: 4px;\n\nfont-size: 12px;\n\nbackground-color: white;\n\ncursor: pointer;\n\n}\n\n [page-view=\"sequence-diagram\"]>.toolbar .tool-group .clear-btn, [page-view=\"sequence-diagram\"]>.toolbar .tool-group .save-btn, [page-view=\"sequence-diagram\"]>.toolbar .tool-group .export-btn, [page-view=\"sequence-diagram\"]>.toolbar .tool-group .import-btn{\n\npadding: 6px 12px;\n\nmargin-right: 5px;\n\nbackground-color: #007bff;\n\ncolor: white;\n\nborder: none;\n\nborder-radius: 4px;\n\ncursor: pointer;\n\nfont-size: 12px;\n\ntransition: background-color 0.2s;\n\n}\n\n [page-view=\"sequence-diagram\"]>.toolbar .tool-group .clear-btn:hover, [page-view=\"sequence-diagram\"]>.toolbar .tool-group .save-btn:hover, [page-view=\"sequence-diagram\"]>.toolbar .tool-group .export-btn:hover, [page-view=\"sequence-diagram\"]>.toolbar .tool-group .import-btn:hover{\n\nbackground-color: #0056b3;\n\n}\n\n [page-view=\"sequence-diagram\"]>.toolbar .tool-group .clear-btn:active, [page-view=\"sequence-diagram\"]>.toolbar .tool-group .save-btn:active, [page-view=\"sequence-diagram\"]>.toolbar .tool-group .export-btn:active, [page-view=\"sequence-diagram\"]>.toolbar .tool-group .import-btn:active{\n\ntransform: translateY(1px);\n\n}\n\n [page-view=\"sequence-diagram\"]>.toolbar .tool-group .clear-btn{\n\nbackground-color: #dc3545;\n\n}\n\n [page-view=\"sequence-diagram\"]>.toolbar .tool-group .clear-btn:hover{\n\nbackground-color: #c82333;\n\n}\n\n [page-view=\"sequence-diagram\"]>.toolbar .tool-group .delete-btn{\n\npadding: 6px 12px;\n\nmargin-right: 5px;\n\nbackground-color: #ffc107;\n\ncolor: #ffffff;\n\nborder: none;\n\nborder-radius: 4px;\n\ncursor: pointer;\n\nfont-size: 12px;\n\ntransition: background-color 0.2s;\n\n}\n\n [page-view=\"sequence-diagram\"]>.toolbar .tool-group .delete-btn:hover{\n\nbackground-color: #e0a800;\n\n}\n\n [page-view=\"sequence-diagram\"]>.content{\n\nheight: calc(100vh - 200px);\n\noverflow: auto;\n\n}\n\n [page-view=\"sequence-diagram\"]>.content canvas{\n\ndisplay: block;\n\ncursor: crosshair;\n\nbackground-color: white;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/region
/*****************************************************************/
window.__pkg__bundleSrc__['313']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('152');
var canvasRender =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('219');
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
window.__pkg__bundleSrc__['152']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('153');
var initText=__pkg__scope_args__.initText;
var initArc=__pkg__scope_args__.initArc;
var initCircle=__pkg__scope_args__.initCircle;
var initRect=__pkg__scope_args__.initRect;

__pkg__scope_args__=window.__pkg__getBundle('155');
var linearGradient=__pkg__scope_args__.linearGradient;
var radialGradient=__pkg__scope_args__.radialGradient;

__pkg__scope_args__=window.__pkg__getBundle('153');
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
window.__pkg__bundleSrc__['153']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('154');
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
window.__pkg__bundleSrc__['154']=function(){
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
window.__pkg__bundleSrc__['155']=function(){
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
window.__pkg__bundleSrc__['219']=function(){
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

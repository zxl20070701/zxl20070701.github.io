import template from './index.html';
import './index.scss';

import newFile from '../../tool/audio/newFile';
import audiobufferToWav from '../../tool/audio/AudioBuffer-To-Wav';
import formatTime from '../../tool/formatTime';

import lazyLoad from './dialogs/lazy-load';

export default function (obj) {
    return {
        render: template,
        methods: {

            // 下载按钮
            doDownload: function () {
                var audioBuffer = this.mergeAudio();

                if (audioBuffer)
                    this.downloadFile(audioBuffer);
            },

            // 播放按钮
            doPlay: function () {
                var audioBuffer = this.mergeAudio();

                if (audioBuffer)
                    this.play(audioBuffer);
            },

            // 下载文件
            downloadFile: function (audioBuffer) {

                // 需要下载的AudioBuffer变成ArrayBuffer
                var buffer = audiobufferToWav(audioBuffer);

                var btnEl = document.createElement('a');
                btnEl.setAttribute('href', URL.createObjectURL(new Blob([buffer])));
                btnEl.setAttribute('download', 'audio.wav');
                btnEl.click();
            },

            // 合并音频
            mergeAudio() {
                var items = document.getElementById('editor-view-id').children;
                var index, audios = [];
                for (index = 0; index < items.length; index++) {
                    if (items[index]._data.checked) {
                        audios.push(this.mergePice(items[index]._data));
                    }
                }

                // 没有选中的
                if (audios.length <= 0) {
                    alert("非常抱歉，没有可以操作的资源~");
                    return;
                }

                // 如果就一首
                else if (audios.length == 1) {
                    return audios[0];
                }

                // 多于一首就要合并
                else {

                    var rate = audios[0].sampleRate;
                    var channels = audios[0].numberOfChannels;

                    // 先计算总时长
                    var timeCount = 0;
                    for (index = 0; index < audios.length; index++) {
                        timeCount += audios[index].duration;
                    }

                    // 总帧数
                    var frameCount = timeCount * rate;

                    // 空的AudioBuffer
                    var newAudioBuffer = new AudioContext().createBuffer(channels, frameCount, rate);

                    var targetOffset = 0, anotherArray, channel;
                    for (index = 0; index < audios.length; index++) {
                        anotherArray = new Float32Array(audios[index].duration * rate);
                        for (channel = 0; channel < channels; channel++) {
                            audios[index].copyFromChannel(anotherArray, channel, 0);
                            newAudioBuffer.copyToChannel(anotherArray, channel, targetOffset);
                        }

                        // 校对目标偏移量
                        targetOffset += audios[index].duration * rate;
                    }

                    return newAudioBuffer;
                }
            },

            // 合并片段
            mergePice: function (oralData) {
                var index, count = {}, loopCount = +oralData.repeat;

                // 先计算时长
                var timeCount = 0;
                for (index = 0; index < oralData.pice.value.length; index++) {
                    count[index] = oralData.pice.split[index + 1] - oralData.pice.split[index];

                    // 需要复制的时长叠加
                    if (oralData.pice.value[index]) {
                        timeCount += count[index];
                    }

                    // 变成帧数给后面用
                    count[index] *= oralData.audio.content.sampleRate;
                }

                // 总帧数
                var frameCount = timeCount * oralData.audio.content.sampleRate * loopCount;

                // 空的AudioBuffer
                var newAudioBuffer = new AudioContext().createBuffer(oralData.audio.content.numberOfChannels, frameCount, oralData.audio.content.sampleRate);

                var sourceOffset, targetOffset = 0, anotherArray, channel, loop;
                for (loop = 0; loop < loopCount; loop++) {
                    sourceOffset = 0;
                    for (index = 0; index < oralData.pice.value.length; index++) {
                        if (oralData.pice.value[index]) {
                            anotherArray = new Float32Array(count[index]);
                            for (channel = 0; channel < oralData.audio.content.numberOfChannels; channel++) {
                                oralData.audio.content.copyFromChannel(anotherArray, channel, sourceOffset);
                                newAudioBuffer.copyToChannel(anotherArray, channel, targetOffset);
                            }

                            // 校对目标偏移量
                            targetOffset += count[index];
                        }

                        // 校对源偏移量
                        sourceOffset += count[index];

                    }
                }

                return newAudioBuffer;
            },

            // 播放
            play: function (audioBuffer) {
                var audioEl = document.getElementById('play-audio-id');

                // 把AudioBuffer变成ArrayBuffer
                var buffer = audiobufferToWav(audioBuffer);
                audioEl.src = URL.createObjectURL(new Blob([buffer]));

                audioEl.play();
            },

            // 导入文件
            doImport: function () {
                var _this = this;
                newFile().then(function (data) {
                    var ulEl = document.getElementById('source-list-id');

                    var index;
                    for (index = 0; index < data.length; index++) {
                        (function (index) {

                            var liEl = document.createElement('li');
                            ulEl.appendChild(liEl);

                            // icon
                            var iEl = document.createElement('i');
                            liEl.appendChild(iEl);

                            // 标题
                            var spanEl = document.createElement('span');
                            spanEl.innerText = data[index].name;
                            liEl.appendChild(spanEl);

                            // 播放按钮
                            var playEl = document.createElement('button');
                            playEl.setAttribute('class', 'play');
                            liEl.appendChild(playEl);

                            playEl.addEventListener('click', function () {
                                _this.play(data[index].content);
                            });

                            // 追加按钮
                            var addEl = document.createElement('button');
                            addEl.setAttribute('class', 'add');
                            liEl.appendChild(addEl);

                            addEl.addEventListener('click', function () {

                                var editorEl = document.getElementById('editor-view-id');
                                var contentEl;

                                // 条目
                                var itemEl = document.createElement('div');
                                editorEl.appendChild(itemEl);
                                itemEl.setAttribute('class', 'item');

                                itemEl._data = {

                                    // 是否选中
                                    checked: true,

                                    // 片段
                                    pice: {
                                        split: [0, data[index].content.duration], // 切割点
                                        value: [true] // 每段是否需要
                                    },

                                    // 重复
                                    repeat: 1,

                                    // 音频数据
                                    audio: data[index]

                                };

                                // 标题
                                var titleEl = document.createElement('div');
                                itemEl.appendChild(titleEl);
                                titleEl.setAttribute('class', 'title');

                                var titleEl_checkbox = document.createElement('input');
                                titleEl.appendChild(titleEl_checkbox);

                                titleEl_checkbox.setAttribute('type', 'checkbox');

                                if (itemEl._data.checked)
                                    titleEl_checkbox.setAttribute('checked', "");

                                titleEl_checkbox.addEventListener('click', function () {
                                    itemEl._data.checked = !itemEl._data.checked;

                                    if (itemEl._data.checked)
                                        titleEl_checkbox.setAttribute('checked', "");
                                    else {
                                        titleEl_checkbox.removeAttribute('checked');
                                    }

                                });

                                var titleEl_span = document.createElement('span');
                                titleEl.appendChild(titleEl_span);

                                titleEl_span.innerText = data[index].name;

                                // 按钮组
                                var btnsEl = document.createElement('div');
                                itemEl.appendChild(btnsEl);
                                btnsEl.setAttribute('class', 'btns');

                                var btn_toUpEl = document.createElement('button');
                                btnsEl.appendChild(btn_toUpEl);
                                btn_toUpEl.innerText = '上移';
                                btn_toUpEl.addEventListener('click', function () {

                                    if (!itemEl.previousElementSibling) {
                                        alert('已经是第一个了，无法再上移');
                                    } else {
                                        itemEl.parentNode.insertBefore(itemEl, itemEl.previousElementSibling);
                                    }

                                });

                                var btn_toDownEl = document.createElement('button');
                                btnsEl.appendChild(btn_toDownEl);
                                btn_toDownEl.innerText = '下移';
                                btn_toDownEl.addEventListener('click', function () {

                                    if (!itemEl.nextElementSibling) {
                                        alert('已经是最后一个了，无法再下移');
                                    } else {
                                        itemEl.parentNode.insertBefore(itemEl, itemEl.nextElementSibling.nextSibling);
                                    }

                                });

                                var btn_piceEl = document.createElement('button');
                                btnsEl.appendChild(btn_piceEl);
                                btn_piceEl.innerText = '片段';
                                btn_piceEl.addEventListener('click', function () {

                                    // 打开片段编辑弹框
                                    _this.$openDialog(lazyLoad.pice, {
                                        piceData: itemEl._data.pice,
                                        duration: itemEl._data.audio.content.duration
                                    }).then(function (piceData) {
                                        itemEl._data.pice = piceData;

                                        // 修改进度显示
                                        var template = "", piceIndex, piceColor, piceLen, piceHover;
                                        for (piceIndex = 0; piceIndex < piceData.value.length; piceIndex++) {

                                            // 背景色
                                            piceColor = piceData.value[piceIndex] ? "" : "background-color:red";

                                            // 长度
                                            piceLen = piceData.split[piceIndex + 1] - piceData.split[piceIndex];

                                            // 悬浮提示
                                            piceHover = formatTime(piceData.split[piceIndex]) + " ~ " + formatTime(piceData.split[piceIndex + 1])

                                            template += "<span " +
                                                "style='width:" + piceLen + "px;" + piceColor + "' title='" + piceHover + "'></span>";
                                        }

                                        contentEl.innerHTML = template;

                                    });

                                });

                                var btn_playEl = document.createElement('button');
                                btnsEl.appendChild(btn_playEl);
                                btn_playEl.innerText = '播放';
                                btn_playEl.addEventListener('click', function () {
                                    _this.play(_this.mergePice(itemEl._data));
                                });

                                var btn_downloadEl = document.createElement('button');
                                btnsEl.appendChild(btn_downloadEl);
                                btn_downloadEl.innerText = '下载';
                                btn_downloadEl.addEventListener('click', function () {
                                    _this.downloadFile(_this.mergePice(itemEl._data));
                                });

                                // 内容轨道
                                contentEl = document.createElement('div');
                                itemEl.appendChild(contentEl);
                                contentEl.setAttribute('class', 'content');

                                contentEl.innerHTML = '<span style="width:' + data[index].content.duration + 'px"></span>';

                                // 重复次数
                                var repeatEl = document.createElement('div');
                                itemEl.appendChild(repeatEl);
                                repeatEl.setAttribute('class', 'repeat');

                                var repeatEl_span = document.createElement('span');
                                repeatEl_span.innerHTML = '重复次数：';

                                repeatEl.appendChild(repeatEl_span);

                                var repeatEl_input = document.createElement('input');
                                repeatEl.appendChild(repeatEl_input);

                                repeatEl_input.setAttribute('value', itemEl._data.repeat);
                                repeatEl_input.addEventListener('input', function () {
                                    itemEl._data.repeat = repeatEl_input.value;
                                });

                            });

                        })(index);
                    }

                });
            }
        }
    };
};
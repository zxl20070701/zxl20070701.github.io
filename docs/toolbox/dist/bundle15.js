
/*************************** [bundle] ****************************/
// Original file:./src/pages/audio-editor/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['71']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('143');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('144');


__pkg__scope_args__=window.__pkg__getBundle('145');
var newFile =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('147');
var audiobufferToWav =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('148');
var formatTime =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('149');
var lazyDialogs =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj) {
    return {
        name: "audio-editor",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "音频编辑器" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './audio-editor.png');
        },
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
            mergeAudio: function () {
                var items = this._refs.editorView.value.children;
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
                var audioEl = this._refs.playAudio.value;

                // 把AudioBuffer变成ArrayBuffer
                var buffer = audiobufferToWav(audioBuffer);
                audioEl.src = URL.createObjectURL(new Blob([buffer]));

                audioEl.play();
            },

            // 导入文件
            doImport: function () {
                var _this = this;
                newFile().then(function (data) {
                    var ulEl = _this._refs.sourceList.value;

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

                                var editorEl = _this._refs.editorView.value;
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
                                    _this.$openDialog(lazyDialogs.pice, {
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

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/audio-editor/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['143']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,9]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,4]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"音频编辑器","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[5,7]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[6]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[8]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[10,14]},{"type":"tag","name":"div","attrs":{"class":"source-view"},"childNodes":[11,13]},{"type":"tag","name":"button","attrs":{"ui-on:click":"doImport"},"childNodes":[12]},{"type":"text","content":"导入+","childNodes":[]},{"type":"tag","name":"ul","attrs":{"ref":"sourceList"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"mulp-view"},"childNodes":[15,17,18]},{"type":"tag","name":"div","attrs":{"class":"play-view"},"childNodes":[16]},{"type":"tag","name":"audio","attrs":{"src":"","controls":"controls","ref":"playAudio"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"editor-view","ref":"editorView"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"btns-view"},"childNodes":[19,21]},{"type":"tag","name":"button","attrs":{"ui-on:click":"doPlay"},"childNodes":[20]},{"type":"text","content":"播放","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"doDownload"},"childNodes":[22]},{"type":"text","content":"下载","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/audio-editor/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['144']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view='audio-editor']{\n\nleft: 80px;\n\ntop: 20px;\n\nfont-size: 12px;\n\noverflow: hidden;\n\n}\n\n [page-view='audio-editor'][focus=\"no\"]>header{\n\nbackground-color: #e8eaed;\n\n}\n\n [page-view='audio-editor']>header{\n\ntext-align: left;\n\nline-height: 40px;\n\nbox-shadow: rgb(213, 221, 225) 0px 4px 6px;\n\nbackground-color: #dee1e7;\n\n}\n\n [page-view='audio-editor']>header>h2{\n\ncolor: #000000;\n\nfont-size: 14px;\n\npadding-left: 35px;\n\nbackground-image: url(\"./audio-editor.png\");\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\nfont-family: cursive;\n\ndisplay: inline-block;\n\n}\n\n [page-view='audio-editor']>div{\n\ndisplay: flex;\n\nwidth: calc(100vw - 160px);\n\nheight: calc(100vh - 110px);\n\n}\n\n [page-view='audio-editor']>div>div{\n\nflex-grow: 1;\n\nheight: 100%;\n\n}\n\n [page-view='audio-editor']>div>div.source-view{\n\nflex-grow: 0;\n\nflex-shrink: 0;\n\nflex-basis: 200px;\n\nborder-right: 1px solid #d8d8d8;\n\npadding: 10px;\n\n}\n\n [page-view='audio-editor']>div>div.source-view>button{\n\nwidth: 60px;\n\nline-height: 20px;\n\nbackground-color: #939393;\n\ncolor: white;\n\nborder: none;\n\noutline: none;\n\ncursor: pointer;\n\n}\n\n [page-view='audio-editor']>div>div.source-view>ul{\n\nmargin: 10px 0;\n\n}\n\n [page-view='audio-editor']>div>div.source-view>ul>li{\n\nline-height: 20px;\n\npadding: 5px 0;\n\n}\n\n [page-view='audio-editor']>div>div.source-view>ul>li:not(:last-child){\n\nborder-bottom: 1px solid rgb(191, 190, 190);\n\n}\n\n [page-view='audio-editor']>div>div.source-view>ul>li>i{\n\ndisplay: inline-block;\n\nwidth: 24px;\n\nheight: 24px;\n\nbackground-image: url('./audio-icon.png');\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\nbackground-size: auto 100%;\n\nvertical-align: top;\n\n}\n\n [page-view='audio-editor']>div>div.source-view>ul>li>span{\n\nwhite-space: nowrap;\n\nwidth: 90px;\n\noverflow: hidden;\n\ntext-overflow: ellipsis;\n\ndisplay: inline-block;\n\n}\n\n [page-view='audio-editor']>div>div.source-view>ul>li>button{\n\nbackground-repeat: no-repeat;\n\nbackground-position: center center;\n\nbackground-size: auto 100%;\n\nwidth: 24px;\n\nheight: 24px;\n\nfloat: right;\n\nborder: none;\n\noutline: none;\n\ncursor: pointer;\n\nbackground-color: transparent;\n\n}\n\n [page-view='audio-editor']>div>div.source-view>ul>li>button.play{\n\nbackground-image: url('./start.png');\n\n}\n\n [page-view='audio-editor']>div>div.source-view>ul>li>button.add{\n\nbackground-image: url('./add.png');\n\n}\n\n [page-view='audio-editor']>div>div.mulp-view{\n\ndisplay: flex;\n\nflex-direction: column;\n\nposition: relative;\n\n}\n\n [page-view='audio-editor']>div>div.mulp-view>div.play-view{\n\nflex-basis: 100px;\n\nline-height: 100px;\n\nbackground-color: #f1f3f4;\n\n}\n\n [page-view='audio-editor']>div>div.mulp-view>div.play-view>audio{\n\nwidth: 100%;\n\nvertical-align: middle;\n\n}\n\n [page-view='audio-editor']>div>div.mulp-view>div.editor-view{\n\nflex-grow: 1;\n\nbackground-color: #e4e4e4;\n\noverflow: auto;\n\n}\n\n [page-view='audio-editor']>div>div.mulp-view>div.editor-view>div.item{\n\nbackground-color: #f2f2f2;\n\npadding: 10px;\n\nmargin: 10px;\n\noverflow: auto;\n\nwidth: calc(100vw - 380px);\n\n}\n\n [page-view='audio-editor']>div>div.mulp-view>div.editor-view>div.item>div.title{\n\nfont-size: 12px;\n\npadding-left: 10px;\n\n}\n\n [page-view='audio-editor']>div>div.mulp-view>div.editor-view>div.item>div.btns>button{\n\nheight: 24px;\n\nwidth: 50px;\n\nmargin: 8px 0 0 8px;\n\ncursor: pointer;\n\nbackground-color: #9e9e9e;\n\ncolor: white;\n\nborder: none;\n\nfont-size: 12px;\n\n}\n\n [page-view='audio-editor']>div>div.mulp-view>div.editor-view>div.item>div.content{\n\npadding: 5px 10px;\n\n}\n\n [page-view='audio-editor']>div>div.mulp-view>div.editor-view>div.item>div.content>span{\n\ndisplay: inline-block;\n\nmargin-left: 1px;\n\nbackground-color: #8bc34a;\n\nheight: 5px;\n\n}\n\n [page-view='audio-editor']>div>div.mulp-view>div.editor-view>div.item>div.repeat{\n\npadding: 0 10px;\n\n}\n\n [page-view='audio-editor']>div>div.mulp-view>div.editor-view>div.item>div.repeat>input{\n\nwidth: 50px;\n\noutline: none;\n\npadding: 2px 5px;\n\n}\n\n [page-view='audio-editor']>div>div.mulp-view>div.btns-view{\n\nflex-basis: 40px;\n\nbackground-color: #f2f2f2;\n\nborder-top: 1px solid #d8d8d8;\n\n}\n\n [page-view='audio-editor']>div>div.mulp-view>div.btns-view>button{\n\nheight: 24px;\n\nwidth: 70px;\n\nmargin: 8px 0 0 8px;\n\ncursor: pointer;\n\nbackground: #2196f3;\n\ncolor: white;\n\nborder: none;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/audio/newFile
/*****************************************************************/
window.__pkg__bundleSrc__['145']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('146');
var AudioContext =__pkg__scope_args__.default;


var inputEl = document.createElement('input');

inputEl.setAttribute('type', 'file');
inputEl.setAttribute('multiple', 'multiple'); // 可以多选
inputEl.setAttribute('accept', 'audio/*'); // 只能选中音频文件

var doit;
inputEl.addEventListener('change', function (event) {
    if (doit) {
        var files = inputEl.files;
        var datas = [];

        var index;
        for (index = 0; index < files.length; index++) {
            (function (index) {
                var reader = new FileReader();
                reader.onload = function () {

                    var arrayBuffer = reader.result;

                    // 创建一个audio上下文
                    var context = new AudioContext();

                    // 把arrayBuffer变成audioBuffer
                    context.decodeAudioData(arrayBuffer, function (audioBuffer) {

                        /**
                        * AudioBuffer对象是一个音频专用Buffer对象，包含很多音频信息，包括：
                        * 
                        * 音频时长 duration
                        * 声道数量 numberOfChannels
                        * 采样率 sampleRate
                        * 等。
                        * 
                        * 包括一些音频声道数据处理方法，例如：
                        * 获取通道数据 getChannelData()
                        * 复制通道数据 copyFromChannel()
                        * 写入通道数据 copyToChannel()
                        * 
                        * 文档见这里：https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer
                        */

                        datas.push({
                            name: files[index].name, // 文件名
                            content: audioBuffer // 内容
                        });

                        // 如果解析完毕
                        if (datas.length == files.length) {
                            doit(datas);
                        }

                    });


                };
                reader.readAsArrayBuffer(files[index]);
            })(index);
        }

    }
});

__pkg__scope_bundle__.default= function () {
    return new Promise(function (resolve, reject) {

        // 重置处理文件回调
        doit = function (datas) {
            resolve(datas);
        };

        // 触发打开文件
        inputEl.click();
    });
}

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/audio/AudioContext
/*****************************************************************/
window.__pkg__bundleSrc__['146']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default=
    window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/audio/AudioBuffer-To-Wav
/*****************************************************************/
window.__pkg__bundleSrc__['147']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (buffer, opt) {
  opt = opt || {};

  var numChannels = buffer.numberOfChannels;
  var sampleRate = opt.sampleRate || buffer.sampleRate;
  var format = opt.float32 ? 3 : 1;
  var bitDepth = format === 3 ? 32 : 16;
  var result;
  if (numChannels === 2) {
    result = interleave(buffer.getChannelData(0), buffer.getChannelData(1));
  } else {
    result = buffer.getChannelData(0);
  }

  return encodeWAV(result, format, sampleRate, numChannels, bitDepth);
}

function encodeWAV(samples, format, sampleRate, numChannels, bitDepth) {
  var bytesPerSample = bitDepth / 8;
  var blockAlign = numChannels * bytesPerSample;

  var buffer = new ArrayBuffer(44 + samples.length * bytesPerSample);
  var view = new DataView(buffer);

  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + samples.length * bytesPerSample, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(view, 36, "data");
  view.setUint32(40, samples.length * bytesPerSample, true);
  if (format === 1) {
    floatTo16BitPCM(view, 44, samples);
  } else {
    writeFloat32(view, 44, samples);
  }

  return buffer;
}

function interleave(inputL, inputR) {
  var length = inputL.length + inputR.length;
  var result = new Float32Array(length);

  var index = 0;
  var inputIndex = 0;

  while (index < length) {
    result[index++] = inputL[inputIndex];
    result[index++] = inputR[inputIndex];
    inputIndex++;
  }
  return result;
}

function writeFloat32(output, offset, input) {
  for (var i = 0; i < input.length; i++, offset += 4) {
    output.setFloat32(offset, input[i], true);
  }
}

function floatTo16BitPCM(output, offset, input) {
  for (var i = 0; i < input.length; i++, offset += 2) {
    var s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
}

function writeString(view, offset, string) {
  for (var i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/formatTime
/*****************************************************************/
window.__pkg__bundleSrc__['148']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 把秒值变成更可读的格式
__pkg__scope_bundle__.default= function(time) {
    return (Math.floor(time / 60)) + ":" + (Math.floor(time % 60)) + "." + ((time % 1).toFixed(3) + "").replace(/^.{0,}\./, '')
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/audio-editor/dialogs/lazy-load
/*****************************************************************/
window.__pkg__bundleSrc__['149']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= {

    // 编辑切割点
    pice: function () {
        return window.__pkg__getLazyBundle('./dist/bundle47.js','150')
    }

};

    return __pkg__scope_bundle__;
}

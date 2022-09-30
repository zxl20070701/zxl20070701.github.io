import AudioContext from './AudioContext';

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

export default function () {
    return new Promise((resolve, reject) => {

        // 重置处理文件回调
        doit = function (datas) {
            resolve(datas);
        };

        // 触发打开文件
        inputEl.click();
    });
}
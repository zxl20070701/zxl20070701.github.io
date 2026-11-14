
/*************************** [bundle] ****************************/
// Original file:./src/pages/type-practice/dialogs/pinyin/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['286']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('442');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('443');


var lessons = [
    {
        title: '清晨散步',
        target: '清晨，微风轻轻吹过河面，阳光照亮了两岸的树木。小雨沿着河边慢慢散步，看见有人跑步，有人骑车，还有孩子在桥上观察水鸟。她停下来听了一会儿鸟鸣，觉得新的一天充满了希望。'
    },
    {
        title: '小小花园',
        target: '图书馆后面有一座安静的小花园。邻居们在这里种下薄荷、西红柿和各种颜色的鲜花。天气晴朗的时候，大家一起浇水、除草，也会分享刚刚成熟的果实。花园虽然不大，却让许多人有机会认识彼此。'
    },
    {
        title: '雨天的书店',
        target: '下雨的下午，街角的书店显得格外温暖。窗边摆着几盆绿植，木桌上放着热茶和一本打开的故事书。来这里的人可以慢慢挑选喜欢的书，也可以坐下来读一会儿。雨声轻轻落在屋檐上，让整个房间变得宁静。'
    }
];

__pkg__scope_bundle__.default= function (obj) {
    var interval, removeInputListeners, currentLesson, startTime, targetCharacters = [];
    var typedCharacters = [], rightCount = 0, restartPractice;

    return {
        name: 'type-practice',
        render: template,
        data: {
            flag: 'ready',
            time: obj.ref('00:00:00'),
            speed: obj.ref('0 字/分'),
            process: obj.ref('0%'),
            rate: obj.ref('100%')
        },
        beforeDestory: function () {
            clearInterval(interval);
            if (removeInputListeners) removeInputListeners();
        },
        methods: {
            reopen: function () {
                restartPractice();
            }
        },
        mounted: function () {
            var _this = this;
            var guideEl = this._refs.guide.value;
            var promptEl = this._refs.prompt.value;
            var inputEl = this._refs.entry.value;
            promptEl.classList.add('pinyin-prompt');

            function updatePrompt() {
                promptEl.innerHTML = '';
                targetCharacters = [];
                var characters = Array.from(currentLesson.target);
                var charsPerLine = 32;
                for (var start = 0; start < characters.length; start += charsPerLine) {
                    var row = document.createElement('div');
                    row.className = 'practice-row';
                    characters.slice(start, start + charsPerLine).forEach(function (character) {
                        var span = document.createElement('span');
                        span.className = 'character';
                        span.textContent = character;
                        row.appendChild(span);
                        targetCharacters.push(span);
                    });
                    promptEl.appendChild(row);
                }
                updateProgress();
            }

            function updateStats() {
                var elapsedSeconds = Math.max((Date.now() - startTime) / 1000, 1);
                var hours = Math.floor(elapsedSeconds / 3600);
                var minutes = Math.floor(elapsedSeconds % 3600 / 60);
                var seconds = Math.floor(elapsedSeconds % 60);
                var pad = function (value) { return value < 10 ? '0' + value : value; };
                _this.time = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
                _this.speed = Math.round(rightCount / elapsedSeconds * 60) + ' 字/分';
                _this.process = Math.round(Math.min(typedCharacters.length, targetCharacters.length) / targetCharacters.length * 100) + '%';
                _this.rate = (typedCharacters.length ? Math.round(rightCount / typedCharacters.length * 100) : 100) + '%';
            }

            function updateProgress() {
                rightCount = 0;
                targetCharacters.forEach(function (span, index) {
                    span.classList.remove('typed', 'current', 'wrong');
                    if (index < typedCharacters.length) {
                        if (typedCharacters[index] === currentLesson.target[index]) {
                            span.classList.add('typed');
                            rightCount += 1;
                        } else {
                            span.classList.add('wrong');
                        }
                    } else if (index === typedCharacters.length) {
                        span.classList.add('current');
                    }
                });

                if (startTime) updateStats();

                if (typedCharacters.length === targetCharacters.length && typedCharacters.every(function (character, index) {
                    return character === currentLesson.target[index];
                })) {
                    clearInterval(interval);
                    updateStats();
                    _this.flag = 'end';
                    inputEl.readOnly = true;
                } else if (startTime) {
                    _this.flag = 'running';
                }
            }

            function handleInput(event) {
                if (event && event.isComposing) return;
                if (inputEl.value && !startTime) {
                    startTime = Date.now();
                    interval = setInterval(updateStats, 1000);
                    _this.flag = 'running';
                }
                typedCharacters = Array.from(inputEl.value);
                updateProgress();
            }

            function reset() {
                clearInterval(interval);
                interval = null;
                startTime = null;
                typedCharacters = [];
                rightCount = 0;
                currentLesson = lessons[Math.floor(Math.random() * lessons.length)];
                _this.flag = 'ready';
                _this.time = '00:00:00';
                _this.speed = '0 字/分';
                _this.process = '0%';
                _this.rate = '100%';
                guideEl.textContent = currentLesson.title;
                inputEl.readOnly = false;
                inputEl.value = '';
                updatePrompt();
                inputEl.focus();
            }

            inputEl.addEventListener('input', handleInput);
            inputEl.addEventListener('compositionend', handleInput);
            removeInputListeners = function () {
                inputEl.removeEventListener('input', handleInput);
                inputEl.removeEventListener('compositionend', handleInput);
            };

            restartPractice = reset;
            reset();
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/type-practice/dialogs/pinyin/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['442']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,7]},{"type":"tag","name":"header","attrs":{"class":"pinyin-dialog-header","ui-dragdrop:desktop":""},"childNodes":[2,4]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"拼音打字","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[5]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeDialog"},"childNodes":[6]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content typing-practice pinyin-practice"},"childNodes":[8,12,16]},{"type":"tag","name":"div","attrs":{"class":"practice-view","ui-bind:active":"flag=='end'?'no':'yes'"},"childNodes":[9,10,11]},{"type":"tag","name":"div","attrs":{"ref":"guide","class":"guide"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"ref":"prompt","class":"prompt"},"childNodes":[]},{"type":"tag","name":"textarea","attrs":{"ref":"entry","class":"entry","rows":"3","spellcheck":"false","autocomplete":"off","placeholder":"点击这里，使用中文输入法输入文章"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"endinfo","ui-bind:active":"flag=='end'?'yes':'no'"},"childNodes":[13,14]},{"type":"text","content":"🎉 练习完成！","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"reopen"},"childNodes":[15]},{"type":"text","content":"再来一次","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"info"},"childNodes":[17,20,23,26]},{"type":"tag","name":"span","attrs":{},"childNodes":[18,19]},{"type":"text","content":"时间","childNodes":[]},{"type":"tag","name":"i","attrs":{"ui-bind":"time"},"childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[21,22]},{"type":"text","content":"速度","childNodes":[]},{"type":"tag","name":"i","attrs":{"ui-bind":"speed"},"childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[24,25]},{"type":"text","content":"进度","childNodes":[]},{"type":"tag","name":"i","attrs":{"ui-bind":"process"},"childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[27,28]},{"type":"text","content":"正确率","childNodes":[]},{"type":"tag","name":"i","attrs":{"ui-bind":"rate"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/type-practice/dialogs/pinyin/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['443']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view='type-practice']{\n\nleft: max(16px, calc(50vw - 450px));\n\ntop: max(16px, calc(50vh - 300px));\n\nwidth: min(900px, calc(100vw - 32px));\n\nheight: min(550px, calc(100vh - 32px));\n\n}\n\n [dialog-view='type-practice'] .content.typing-practice.pinyin-practice{\n\nbox-sizing: border-box;\n\ndisplay: flex;\n\nflex-direction: column;\n\nalign-items: stretch;\n\nheight: calc(100% - 50px);\n\npadding: 16px 30px 18px;\n\nbackground-color: #fafafa;\n\ncolor: #222;\n\n}\n\n [dialog-view='type-practice'] .content.typing-practice.pinyin-practice .practice-view{\n\nwidth: 100%;\n\nmin-height: 0;\n\nflex: 1;\n\n}\n\n [dialog-view='type-practice'] .content.typing-practice.pinyin-practice .practice-view[active='no']{\n\ndisplay: none;\n\n}\n\n [dialog-view='type-practice'] .content.typing-practice.pinyin-practice .guide{\n\nmargin: 0 0 10px;\n\ncolor: #0b71c1;\n\nfont-size: 22px;\n\nfont-weight: 700;\n\n}\n\n [dialog-view='type-practice'] .content.typing-practice.pinyin-practice .prompt{\n\nbox-sizing: border-box;\n\nwidth: 100%;\n\nmax-height: 275px;\n\nmin-height: 150px;\n\nmargin: 0 0 12px;\n\npadding: 12px 16px;\n\noverflow: auto;\n\nborder: 1px solid #ccc;\n\nborder-radius: 5px;\n\nbackground: #fff;\n\ncolor: #666;\n\nfont-family: 'Songti SC', 'SimSun', serif;\n\nfont-size: 21px;\n\nline-height: 1.85;\n\ntext-align: left;\n\n}\n\n [dialog-view='type-practice'] .content.typing-practice.pinyin-practice .prompt .practice-row{\n\nbox-sizing: border-box;\n\nwidth: 100%;\n\nmargin: 0 0 4px;\n\npadding: 7px 8px;\n\nborder-radius: 5px;\n\nletter-spacing: 0.06em;\n\nwhite-space: normal;\n\n}\n\n [dialog-view='type-practice'] .content.typing-practice.pinyin-practice .prompt .character{\n\nborder-radius: 3px;\n\n}\n\n [dialog-view='type-practice'] .content.typing-practice.pinyin-practice .prompt .character.typed{\n\ncolor: #25845c;\n\n}\n\n [dialog-view='type-practice'] .content.typing-practice.pinyin-practice .prompt .character.current{\n\ncolor: #222;\n\nbackground: #ffe49a;\n\n}\n\n [dialog-view='type-practice'] .content.typing-practice.pinyin-practice .prompt .character.wrong{\n\ncolor: #b42318;\n\nbackground: #ffe3df;\n\n}\n\n [dialog-view='type-practice'] .content.typing-practice.pinyin-practice .entry{\n\nbox-sizing: border-box;\n\nwidth: 100%;\n\nmin-height: 70px;\n\npadding: 12px 14px;\n\nborder: 1px solid #ccc;\n\nborder-radius: 5px;\n\noutline: none;\n\nbackground: #fff;\n\ncolor: #222;\n\nfont-family: inherit;\n\nfont-size: 15px;\n\nline-height: 1.6;\n\nresize: vertical;\n\ntransition: border-color 140ms ease, box-shadow 140ms ease;\n\n}\n\n [dialog-view='type-practice'] .content.typing-practice.pinyin-practice .entry:focus{\n\nborder-color: #0b71c1;\n\nbox-shadow: 0 0 0 2px rgba(11, 113, 193, 0.15);\n\n}\n\n [dialog-view='type-practice'] .content.typing-practice.pinyin-practice .entry::placeholder{\n\ncolor: #888;\n\n}\n\n [dialog-view='type-practice'] .content.typing-practice.pinyin-practice .endinfo{\n\ndisplay: none;\n\nmin-height: 220px;\n\nflex: 1;\n\nalign-items: center;\n\njustify-content: center;\n\ncolor: #25845c;\n\nfont-size: 24px;\n\nfont-weight: 700;\n\n}\n\n [dialog-view='type-practice'] .content.typing-practice.pinyin-practice .endinfo[active='yes']{\n\ndisplay: flex;\n\n}\n\n [dialog-view='type-practice'] .content.typing-practice.pinyin-practice .endinfo button{\n\npadding: 5px 10px;\n\nmargin-left: 12px;\n\nborder: 0;\n\nborder-radius: 20px;\n\nbackground: #f44336;\n\ncolor: #fff;\n\nfont: inherit;\n\nfont-size: 14px;\n\ncursor: pointer;\n\n}\n\n [dialog-view='type-practice'] .content.typing-practice.pinyin-practice .info{\n\nwidth: 700px;\n\nmax-width: 100%;\n\nmargin: 12px auto 0;\n\nborder-radius: 5px;\n\nbackground-color: #e5e5e5;\n\nbox-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);\n\nline-height: 35px;\n\n}\n\n [dialog-view='type-practice'] .content.typing-practice.pinyin-practice .info > span{\n\ndisplay: inline-block;\n\nwidth: 120px;\n\nfont-size: 14px;\n\nwhite-space: nowrap;\n\n}\n\n [dialog-view='type-practice'] .content.typing-practice.pinyin-practice .info > span > i{\n\npadding: 0 5px;\n\ncolor: #ff5722;\n\nfont-size: 12px;\n\nfont-style: normal;\n\nfont-weight: 800;\n\n}\n\n [dialog-view='type-practice'] @media (max-width: 960px){\n\nleft: 16px;\n\ntop: 16px;\n\nwidth: calc(100vw - 32px);\n\nheight: calc(100vh - 32px);\n\n}\n\n [dialog-view='type-practice'] @media (max-width: 960px) .content.typing-practice.pinyin-practice{\n\npadding: 14px 18px;\n\n}\n\n [dialog-view='type-practice'] @media (max-width: 960px) .content.typing-practice.pinyin-practice .prompt{\n\nmin-height: 130px;\n\nfont-size: 19px;\n\n}\n\n [dialog-view='type-practice'] @media (max-width: 560px) .content.typing-practice.pinyin-practice{\n\npadding: 12px;\n\n}\n\n [dialog-view='type-practice'] @media (max-width: 560px) .content.typing-practice.pinyin-practice .guide{\n\nfont-size: 20px;\n\n}\n\n [dialog-view='type-practice'] @media (max-width: 560px) .content.typing-practice.pinyin-practice .prompt{\n\nmax-height: 36vh;\n\nmin-height: 110px;\n\npadding: 8px;\n\nfont-size: 17px;\n\n}\n\n [dialog-view='type-practice'] @media (max-width: 560px) .content.typing-practice.pinyin-practice .prompt .practice-row{\n\nletter-spacing: 0;\n\n}\n\n [dialog-view='type-practice'] @media (max-width: 560px) .content.typing-practice.pinyin-practice .info{\n\ndisplay: grid;\n\ngrid-template-columns: repeat(2, minmax(0, 1fr));\n\ngap: 4px;\n\nmargin-top: 10px;\n\n}\n\n [dialog-view='type-practice'] @media (max-width: 560px) .content.typing-practice.pinyin-practice .info > span{\n\nwidth: auto;\n\npadding: 4px 8px;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

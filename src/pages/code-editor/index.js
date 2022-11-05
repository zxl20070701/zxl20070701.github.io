import template from './index.html';
import './index.scss';

import getListByFileHandle from './getListByFileHandle';
import getKeyCode from '../../tool/keyCode';
import pushNavEditor from './pushNavEditor';
import getTypeName from './getTypeName';

var currentInfo = null;
export default function (obj) {
    return {
        render: template,
        data: {
            nav: obj.ref('folder')
        },
        beforeMount: function () {
            document.getElementsByTagName('title')[0].innerText = "代码编辑器";
            document.getElementById('icon-logo').setAttribute('href', './code-editor.png');
        },
        mounted: function () {

            // 启动键盘监听
            var _this = this;
            getKeyCode(function (keyCode, event) {

                var handler = {
                    'ctrl+shift+o': _this.openFolder,
                    'ctrl+o': _this.openFile,
                    'ctrl+n': _this.newFile,
                    'ctrl+s': _this.saveFile
                }[keyCode];

                if (handler) {
                    event.preventDefault();
                    handler();
                }

            });

        },
        methods: {

            // 切换功能
            changeNav: function (event) {
                this.nav = event.target.getAttribute('tag');
            },

            // 打开文件夹
            openFolder: function () {
                window.showDirectoryPicker({
                    mode: "readwrite"
                }).then(function (handle) {

                    var el = document.getElementById('folder-root');
                    el.innerHTML = "";

                    var initMenu = function (el, handle) {
                        getListByFileHandle(handle).then(function (list) {
                            var ulEl = document.createElement('ul');
                            el.appendChild(ulEl);

                            for (var i = 0; i < list.length; i++) {
                                (function (list, i) {
                                    var liEl = document.createElement('li');
                                    ulEl.appendChild(liEl);

                                    var textEl = document.createElement('div');
                                    liEl.appendChild(textEl);

                                    textEl.innerText = list[i].name;
                                    textEl.setAttribute('is-directory', list[i].isDirectory);

                                    textEl.setAttribute('load', 'no'); // 目录是否加载或文件是否已经打开
                                    if (list[i].isDirectory == 'yes') {
                                        textEl.setAttribute('open', 'no'); // 目录是否打开
                                    } else {

                                        var typeName = getTypeName(list[i].name);
                                        if (typeName) textEl.setAttribute('type', typeName); //  文件类型

                                    }

                                    textEl.addEventListener('click', function () {

                                        // 如果是文件夹
                                        if (list[i].isDirectory == 'yes') {

                                            // 如果没有加载过
                                            if (textEl.getAttribute('load') == 'no') {

                                                textEl.setAttribute('load', 'yes');
                                                initMenu(liEl, list[i].handle);
                                            }

                                            // 展开闭合切换
                                            textEl.setAttribute('open', textEl.getAttribute('open') == 'yes' ? 'no' : 'yes');

                                        }

                                        // 如果是文件
                                        else {
                                            if (textEl.getAttribute('load') == 'yes') {
                                                textEl._navItem_.click();
                                            } else {
                                                list[i].handle.getFile().then(function (file) {
                                                    var reader = new FileReader();
                                                    reader.onload = function () {
                                                        pushNavEditor(textEl.innerText, textEl.getAttribute('type'), reader.result, function (_currentInfo) {
                                                            currentInfo = _currentInfo;
                                                        }, list[i].handle, textEl);
                                                    };
                                                    reader.readAsText(file);
                                                });
                                            }
                                        }

                                    });
                                })(list, i);
                            }

                        });
                    }

                    initMenu(el, handle);
                }).catch(function (error) {
                    console.debug(error);
                });
            },

            // 打开文件
            openFile: function () {

                window.showOpenFilePicker().then(function (handles) {
                    handles[0].getFile().then(function (file) {
                        var reader = new FileReader();
                        reader.onload = function () {
                            pushNavEditor(handles[0].name, getTypeName(handles[0].name), reader.result, function (_currentInfo) {
                                currentInfo = _currentInfo;
                            }, handles[0]);
                        };
                        reader.readAsText(file);
                    });
                });
            },

            // 新建文件
            newFile: function () {
                window.showSaveFilePicker().then(function (handle) {
                    pushNavEditor(handle.name, getTypeName(handle.name), "", function (_currentInfo) {
                        currentInfo = _currentInfo;
                    }, handle);
                });
            },

            // 保存文件
            saveFile: function () {
                // 判断是否需要保存
                if (currentInfo && currentInfo.nav.getAttribute('modify') == 'yes') {
                    // 创建写入对象
                    currentInfo.handle.createWritable().then(function (writable) {
                        // 写入内容
                        writable.write(currentInfo.editor.valueOf()).then(function () {
                            // 关闭并确认写入
                            writable.close().then(function () {
                                // 修改记录，标记写入完毕
                                currentInfo.nav.setAttribute('modify', 'no');
                            });
                        });
                    });
                }
            }

        }
    };
};
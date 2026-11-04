import template from './index.html';
import './index.scss';
import editorRender from '../../tool/editor/index';

export default function (obj) {
    var noteEditor;

    return {
        name: "notepad",
        render: template,
        data: {
            notes: [],
            currentNote: null,
            isEditing: false
        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "记事本" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './note.png');
        },
        mounted: function () {
            // 初始化编辑器
            noteEditor = new editorRender({
                el: this._refs.editorContainer.value,
                color: {
                    background: "#ffffff",
                    text: "#333333",
                    edit: "#f0f8ff",
                    cursor: "#007aff"
                },
                "font-family": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                "font-weight": 400
            });

            // 加载保存的笔记
            this.loadNotes();
        },
        methods: {
            // 加载所有笔记
            loadNotes: function () {
                try {
                    var savedNotes = localStorage.getItem('notepad_notes');
                    if (savedNotes) {
                        this.notes = JSON.parse(savedNotes);
                    } else {
                        this.notes = [];
                    }
                    this.renderNotesList();
                } catch (e) {
                    console.error('加载笔记失败:', e);
                    this.notes = [];
                }
            },

            // 保存所有笔记到本地存储
            saveNotesToStorage: function () {
                try {
                    localStorage.setItem('notepad_notes', JSON.stringify(this.notes));
                } catch (e) {
                    console.error('保存笔记失败:', e);
                    alert('保存失败，请检查浏览器存储权限');
                }
            },

            // 渲染笔记列表
            renderNotesList: function () {
                var notesList = this._refs.notesList.value;
                notesList.innerHTML = '';

                if (this.notes.length === 0) {
                    this._refs.emptyState.value.style.display = 'flex';
                    this._refs.notesList.value.style.display = 'none';
                    return;
                }

                this._refs.emptyState.value.style.display = 'none';
                this._refs.notesList.value.style.display = 'block';

                // 按更新时间倒序排列
                var sortedNotes = [...this.notes].sort(function (a, b) {
                    return b.updatedAt - a.updatedAt;
                });

                sortedNotes.forEach((function (note, index) {
                    var noteItem = document.createElement('div');
                    noteItem.className = 'note-item';
                    noteItem.innerHTML = `
                        <div class="note-info">
                            <h4 class="note-title">${note.title || '无标题'}</h4>
                            <p class="note-preview">${note.content.substring(0, 50) || '空笔记'}${note.content.length > 50 ? '...' : ''}</p>
                            <span class="note-time">${this.formatTime(note.updatedAt)}</span>
                        </div>
                        <div class="note-actions">
                            <button class="edit-btn" data-index="${index}">编辑</button>
                        </div>
                    `;

                    // 绑定编辑按钮事件
                    var editBtn = noteItem.querySelector('.edit-btn');
                    editBtn.addEventListener('click', (function (e) {
                        e.stopPropagation();
                        this.openNoteEditor(note);
                    }).bind(this));

                    // 点击整个项目也可以编辑
                    noteItem.addEventListener('click', (function () {
                        this.openNoteEditor(note);
                    }).bind(this));

                    notesList.appendChild(noteItem);
                }).bind(this));
            },

            // 打开笔记编辑器
            openNoteEditor: function (note) {
                this.currentNote = note;
                this.isEditing = true;

                // 切换视图
                this._refs.notesListView.value.style.display = 'none';
                this._refs.noteEditorView.value.style.display = 'block';

                // 设置标题和编辑器内容
                this._refs.noteTitleInput.value.value = note.title || '';
                noteEditor.valueOf(note.content || '');

                // 聚焦标题输入框
                setTimeout((function () {
                    this._refs.noteTitleInput.value.focus();
                }).bind(this), 100);
            },

            // 创建新笔记
            createNewNote: function () {
                var newNote = {
                    id: Date.now().toString(),
                    title: '',
                    content: '',
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                };

                this.notes.push(newNote);
                this.openNoteEditor(newNote);
            },

            // 保存笔记
            saveNote: function () {
                if (!this.currentNote) return;

                var title = this._refs.noteTitleInput.value.value.trim();
                var content = noteEditor.valueOf().trim();

                // 更新笔记数据
                this.currentNote.title = title;
                this.currentNote.content = content;
                this.currentNote.updatedAt = Date.now();

                // 如果是新笔记，确保它在列表中
                var existingIndex = this.notes.findIndex((function (note) {
                    return note.id === this.currentNote.id;
                }).bind(this));

                if (existingIndex === -1) {
                    this.notes.push(this.currentNote);
                }

                // 保存到本地存储
                this.saveNotesToStorage();

                // 返回列表视图
                this.backToList();

                alert('笔记已保存');
            },

            // 删除笔记
            deleteNote: function () {
                if (!this.currentNote) return;

                if (confirm('确定要删除这条笔记吗？此操作不可恢复。')) {
                    var index = this.notes.findIndex((function (note) {
                        return note.id === this.currentNote.id;
                    }).bind(this));

                    if (index !== -1) {
                        this.notes.splice(index, 1);
                        this.saveNotesToStorage();
                        this.backToList();
                        alert('笔记已删除');
                    }
                }
            },

            // 返回笔记列表
            backToList: function () {
                this.isEditing = false;
                this.currentNote = null;

                this._refs.noteEditorView.value.style.display = 'none';
                this._refs.notesListView.value.style.display = 'block';

                // 重新渲染笔记列表
                this.renderNotesList();
            },

            // 格式化时间显示
            formatTime: function (timestamp) {
                var date = new Date(timestamp);
                var now = new Date();
                var diff = now.getTime() - timestamp;

                // 今天内显示时间
                if (date.toDateString() === now.toDateString()) {
                    return date.getHours().toString().padStart(2, '0') + ':' +
                        date.getMinutes().toString().padStart(2, '0');
                }

                // 昨天显示"昨天"
                var yesterday = new Date(now);
                yesterday.setDate(yesterday.getDate() - 1);
                if (date.toDateString() === yesterday.toDateString()) {
                    return '昨天 ' + date.getHours().toString().padStart(2, '0') + ':' +
                        date.getMinutes().toString().padStart(2, '0');
                }

                // 一周内显示星期几
                if (diff < 7 * 24 * 60 * 60 * 1000) {
                    var weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
                    return weekdays[date.getDay()] + ' ' +
                        date.getHours().toString().padStart(2, '0') + ':' +
                        date.getMinutes().toString().padStart(2, '0');
                }

                // 超过一周显示日期
                return (date.getMonth() + 1) + '月' +
                    date.getDate() + '日 ' +
                    date.getHours().toString().padStart(2, '0') + ':' +
                    date.getMinutes().toString().padStart(2, '0');
            }
        }
    };
};
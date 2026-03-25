
/*************************** [bundle] ****************************/
// Original file:./src/pages/job-resume/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['97']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('337');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('338');


__pkg__scope_bundle__.default= function (obj) {
    let resumeData = {
        personalInfo: {
            name: '',
            position: '',
            phone: '',
            email: '',
            website: '',
            summary: ''
        },
        education: [],
        work: [],
        skills: [],
        projects: []
    };

    return {
        name: "job-resume",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "Job Resume" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './job-resume.png');
        },
        mounted: function () {
            this.initEventListeners();
            this.updatePreview();
        },
        methods: {
            initEventListeners: function () {
                // 个人信息输入监听
                const personalInputs = ['name', 'position', 'phone', 'email', 'website', 'summary'];
                personalInputs.forEach(id => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.addEventListener('input', (e) => {
                            resumeData.personalInfo[id] = e.target.value;
                            this.updatePreview();
                        });
                    }
                });

                // 添加按钮监听
                document.getElementById('add-education').addEventListener('click', () => this.addEducation());
                document.getElementById('add-work').addEventListener('click', () => this.addWork());
                document.getElementById('add-skill').addEventListener('click', () => this.addSkill());
                document.getElementById('add-project').addEventListener('click', () => this.addProject());

                // 导出按钮监听
                document.getElementById('daochu-pdf-resume').addEventListener('click', () => this.daochuPDF());
                document.getElementById('daochu-resume').addEventListener('click', () => this.daochuResume());
                document.getElementById('daoru-resume').addEventListener('click', () => this.daoruResume());
                document.getElementById('daoru-file').addEventListener('change', (e) => this.handleFileImport(e));
            },
            updatePreview: function () {
                // 更新个人信息预览
                document.getElementById('preview-name').textContent = resumeData.personalInfo.name || '姓名';
                document.getElementById('preview-position').textContent = resumeData.personalInfo.position || '应聘职位';
                document.getElementById('preview-phone').textContent = resumeData.personalInfo.phone || '电话';
                document.getElementById('preview-email').textContent = resumeData.personalInfo.email || '邮箱';
                document.getElementById('preview-website').textContent = resumeData.personalInfo.website || 'WebSite';
                document.getElementById('preview-summary').textContent = resumeData.personalInfo.summary || '个人简介内容...';

                // 更新教育经历预览
                this.updateEducationPreview();

                // 更新工作经历预览
                this.updateWorkPreview();

                // 更新技能预览
                this.updateSkillsPreview();

                // 更新项目经历预览
                this.updateProjectsPreview();
            },
            addEducation: function () {
                const educationList = document.getElementById('education-list');
                const educationId = `education-${Date.now()}`;

                const educationItem = {
                    id: educationId,
                    school: '',
                    degree: '',
                    major: '',
                    startDate: '',
                    endDate: '',
                    description: ''
                };

                resumeData.education.push(educationItem);

                const educationDiv = document.createElement('div');
                educationDiv.className = 'item-card';
                educationDiv.id = educationId;
                educationDiv.innerHTML = `
                    <button class="remove-btn" onclick="this.parentElement.remove()">×</button>
                    <div class="form-group">
                        <label>学校</label>
                        <input type="text" placeholder="请输入学校名称" data-field="school">
                    </div>
                    <div class="form-group">
                        <label>学历</label>
                        <input type="text" placeholder="请输入学历" data-field="degree">
                    </div>
                    <div class="form-group">
                        <label>专业</label>
                        <input type="text" placeholder="请输入专业" data-field="major">
                    </div>
                    <div class="form-group">
                        <label>开始时间</label>
                        <input type="text" placeholder="如：2015年9月" data-field="startDate">
                    </div>
                    <div class="form-group">
                        <label>结束时间</label>
                        <input type="text" placeholder="如：2019年6月" data-field="endDate">
                    </div>
                    <div class="form-group">
                        <label>描述</label>
                        <textarea placeholder="请输入教育经历描述" data-field="description"></textarea>
                    </div>
                `;

                educationList.appendChild(educationDiv);

                // 添加事件监听
                const inputs = educationDiv.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.addEventListener('input', (e) => {
                        const field = e.target.getAttribute('data-field');
                        const index = resumeData.education.findIndex(item => item.id === educationId);
                        if (index !== -1) {
                            resumeData.education[index][field] = e.target.value;
                            this.updateEducationPreview();
                        }
                    });
                });

                // 添加删除按钮事件
                const removeBtn = educationDiv.querySelector('.remove-btn');
                removeBtn.addEventListener('click', () => {
                    const index = resumeData.education.findIndex(item => item.id === educationId);
                    if (index !== -1) {
                        resumeData.education.splice(index, 1);
                        this.updateEducationPreview();
                    }
                    educationDiv.remove();
                });
            },
            updateEducationPreview: function () {
                const previewEducation = document.getElementById('preview-education');
                previewEducation.innerHTML = '';

                if (resumeData.education.length === 0) {
                    previewEducation.innerHTML = '<p>暂无教育经历</p>';
                    return;
                }

                resumeData.education.forEach(edu => {
                    const eduDiv = document.createElement('div');
                    eduDiv.className = 'education-item';
                    eduDiv.innerHTML = `
                        <h4>${edu.school || '学校名称'} · ${edu.degree || '学历'}</h4>
                        <p class="time-period">${edu.startDate || '开始时间'} - ${edu.endDate || '结束时间'}</p>
                        <p class="major">${edu.major || '专业'}</p>
                        <p class="description">${edu.description || '教育经历描述'}</p>
                    `;
                    previewEducation.appendChild(eduDiv);
                });
            },
            addWork: function () {
                const workList = document.getElementById('work-list');
                const workId = `work-${Date.now()}`;

                const workItem = {
                    id: workId,
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    description: ''
                };

                resumeData.work.push(workItem);

                const workDiv = document.createElement('div');
                workDiv.className = 'item-card';
                workDiv.id = workId;
                workDiv.innerHTML = `
                    <button class="remove-btn" onclick="this.parentElement.remove()">×</button>
                    <div class="form-group">
                        <label>公司</label>
                        <input type="text" placeholder="请输入公司名称" data-field="company">
                    </div>
                    <div class="form-group">
                        <label>职位</label>
                        <input type="text" placeholder="请输入职位" data-field="position">
                    </div>
                    <div class="form-group">
                        <label>开始时间</label>
                        <input type="text" placeholder="如：2019年7月" data-field="startDate">
                    </div>
                    <div class="form-group">
                        <label>结束时间</label>
                        <input type="text" placeholder="如：2022年8月" data-field="endDate">
                    </div>
                    <div class="form-group">
                        <label>工作描述</label>
                        <textarea placeholder="请输入工作描述" data-field="description"></textarea>
                    </div>
                `;

                workList.appendChild(workDiv);

                // 添加事件监听
                const inputs = workDiv.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.addEventListener('input', (e) => {
                        const field = e.target.getAttribute('data-field');
                        const index = resumeData.work.findIndex(item => item.id === workId);
                        if (index !== -1) {
                            resumeData.work[index][field] = e.target.value;
                            this.updateWorkPreview();
                        }
                    });
                });

                // 添加删除按钮事件
                const removeBtn = workDiv.querySelector('.remove-btn');
                removeBtn.addEventListener('click', () => {
                    const index = resumeData.work.findIndex(item => item.id === workId);
                    if (index !== -1) {
                        resumeData.work.splice(index, 1);
                        this.updateWorkPreview();
                    }
                    workDiv.remove();
                });
            },
            updateWorkPreview: function () {
                const previewWork = document.getElementById('preview-work');
                previewWork.innerHTML = '';

                if (resumeData.work.length === 0) {
                    previewWork.innerHTML = '<p>暂无工作经历</p>';
                    return;
                }

                resumeData.work.forEach(work => {
                    const workDiv = document.createElement('div');
                    workDiv.className = 'work-item';
                    workDiv.innerHTML = `
                        <h4>${work.company || '公司名称'} · ${work.position || '职位'}</h4>
                        <p class="time-period">${work.startDate || '开始时间'} - ${work.endDate || '结束时间'}</p>
                        <p class="description">${work.description || '工作描述'}</p>
                    `;
                    previewWork.appendChild(workDiv);
                });
            },
            addSkill: function () {
                const skillList = document.getElementById('skill-list');
                const skillId = `skill-${Date.now()}`;

                const skillItem = {
                    id: skillId,
                    name: '',
                    level: ''
                };

                resumeData.skills.push(skillItem);

                const skillDiv = document.createElement('div');
                skillDiv.className = 'item-card';
                skillDiv.id = skillId;
                skillDiv.innerHTML = `
                    <button class="remove-btn" onclick="this.parentElement.remove()">×</button>
                    <div class="form-group">
                        <label>技能名称</label>
                        <input type="text" placeholder="请输入技能名称" data-field="name">
                    </div>
                    <div class="form-group">
                        <label>熟练程度</label>
                        <input type="text" placeholder="如：精通、熟练、了解" data-field="level">
                    </div>
                `;

                skillList.appendChild(skillDiv);

                // 添加事件监听
                const inputs = skillDiv.querySelectorAll('input');
                inputs.forEach(input => {
                    input.addEventListener('input', (e) => {
                        const field = e.target.getAttribute('data-field');
                        const index = resumeData.skills.findIndex(item => item.id === skillId);
                        if (index !== -1) {
                            resumeData.skills[index][field] = e.target.value;
                            this.updateSkillsPreview();
                        }
                    });
                });

                // 添加删除按钮事件
                const removeBtn = skillDiv.querySelector('.remove-btn');
                removeBtn.addEventListener('click', () => {
                    const index = resumeData.skills.findIndex(item => item.id === skillId);
                    if (index !== -1) {
                        resumeData.skills.splice(index, 1);
                        this.updateSkillsPreview();
                    }
                    skillDiv.remove();
                });
            },
            updateSkillsPreview: function () {
                const previewSkills = document.getElementById('preview-skills');
                previewSkills.innerHTML = '';

                if (resumeData.skills.length === 0) {
                    previewSkills.innerHTML = '<p>暂无技能展示</p>';
                    return;
                }

                const ul = document.createElement('ul');
                resumeData.skills.forEach(skill => {
                    const li = document.createElement('li');
                    li.textContent = `${skill.name || '技能名称'}${skill.level ? ` - ${skill.level}` : ''}`;
                    ul.appendChild(li);
                });
                previewSkills.appendChild(ul);
            },
            addProject: function () {
                const projectList = document.getElementById('project-list');
                const projectId = `project-${Date.now()}`;

                const projectItem = {
                    id: projectId,
                    name: '',
                    role: '',
                    time: '',
                    description: ''
                };

                resumeData.projects.push(projectItem);

                const projectDiv = document.createElement('div');
                projectDiv.className = 'item-card';
                projectDiv.id = projectId;
                projectDiv.innerHTML = `
                    <button class="remove-btn" onclick="this.parentElement.remove()">×</button>
                    <div class="form-group">
                        <label>项目名称</label>
                        <input type="text" placeholder="请输入项目名称" data-field="name">
                    </div>
                    <div class="form-group">
                        <label>担任角色</label>
                        <input type="text" placeholder="请输入担任角色" data-field="role">
                    </div>
                    <div class="form-group">
                        <label>项目时间</label>
                        <input type="text" placeholder="如：2021年3月 - 2021年8月" data-field="time">
                    </div>
                    <div class="form-group">
                        <label>项目描述</label>
                        <textarea placeholder="请输入项目描述" data-field="description"></textarea>
                    </div>
                `;

                projectList.appendChild(projectDiv);

                // 添加事件监听
                const inputs = projectDiv.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.addEventListener('input', (e) => {
                        const field = e.target.getAttribute('data-field');
                        const index = resumeData.projects.findIndex(item => item.id === projectId);
                        if (index !== -1) {
                            resumeData.projects[index][field] = e.target.value;
                            this.updateProjectsPreview();
                        }
                    });
                });

                // 添加删除按钮事件
                const removeBtn = projectDiv.querySelector('.remove-btn');
                removeBtn.addEventListener('click', () => {
                    const index = resumeData.projects.findIndex(item => item.id === projectId);
                    if (index !== -1) {
                        resumeData.projects.splice(index, 1);
                        this.updateProjectsPreview();
                    }
                    projectDiv.remove();
                });
            },
            updateProjectsPreview: function () {
                const previewProjects = document.getElementById('preview-projects');
                previewProjects.innerHTML = '';

                if (resumeData.projects.length === 0) {
                    previewProjects.innerHTML = '<p>暂无项目经历</p>';
                    return;
                }

                resumeData.projects.forEach(project => {
                    const projectDiv = document.createElement('div');
                    projectDiv.className = 'project-item';
                    projectDiv.innerHTML = `
                        <h4>${project.name || '项目名称'} · ${project.role || '担任角色'}</h4>
                        <p class="time-period">${project.time || '项目时间'}</p>
                        <p class="description">${project.description || '项目描述'}</p>
                    `;
                    previewProjects.appendChild(projectDiv);
                });
            },
            daochuPDF: function () {
                // 创建专门的打印内容
                const resumeData = this.getResumeData();
                const printWindow = window.open('', '_blank');

                const printContent = this.generatePrintContent(resumeData);

                printWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>简历 - ${resumeData.personalInfo.name || '未命名'}</title>
                        <style>
                            body {
                                margin: 0;
                                padding: 0;
                                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                                line-height: 1.6;
                                color: #333;
                                background: #f5f7fa;
                                -webkit-print-color-adjust: exact;
                                print-color-adjust: exact;
                            }
                            .resume-container {
                                display: flex;
                                min-height: 100%;
                                background: white;
                                box-shadow: 0 8px 30px rgba(0,0,0,0.12);
                                margin: 20px;
                                border-radius: 12px;
                                overflow: hidden;
                            }
                            .resume-sidebar {
                                width: 35%;
                                background: linear-gradient(135deg, #2c3e50, #1a2530);
                                color: white;
                                padding: 40px 30px;
                            }
                            .sidebar-header {
                                text-align: center;
                                margin-bottom: 30px;
                                padding-bottom: 25px;
                                border-bottom: 1px solid rgba(255,255,255,0.2);
                            }
                            .sidebar-header h1 {
                                margin: 0 0 10px 0;
                                font-size: 32px;
                                font-weight: 700;
                                color: white;
                            }
                            .sidebar-header .position {
                                font-size: 18px;
                                color: #3498db;
                                margin: 0 0 20px 0;
                                font-weight: 500;
                            }
                            .contact-info {
                                display: flex;
                                flex-direction: column;
                                gap: 12px;
                                font-size: 14px;
                                color: rgba(255,255,255,0.9);
                            }
                            .contact-item {
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            }
                            .sidebar-section {
                                margin-bottom: 30px;
                            }
                            .sidebar-section h3 {
                                color: #3498db;
                                font-size: 18px;
                                margin: 0 0 15px 0;
                                padding-bottom: 8px;
                                border-bottom: 1px solid rgba(255,255,255,0.2);
                                font-weight: 600;
                            }
                            .sidebar-section p {
                                line-height: 1.7;
                                color: rgba(255,255,255,0.9);
                                margin-bottom: 15px;
                            }
                            .skills-list {
                                list-style: none;
                                padding: 0;
                            }
                            .skills-list li {
                                background: rgba(52,152,219,0.2);
                                padding: 8px 12px;
                                margin-bottom: 8px;
                                border-radius: 6px;
                                font-size: 14px;
                                color: white;
                            }
                            .resume-main {
                                width: 65%;
                                padding: 40px;
                            }
                            .main-section {
                                margin-bottom: 35px;
                            }
                            .main-section h3 {
                                color: #2c3e50;
                                font-size: 22px;
                                margin: 0 0 20px 0;
                                padding-bottom: 10px;
                                border-bottom: 2px solid #3498db;
                                font-weight: 700;
                            }
                            .experience-list {
                                position: relative;
                            }
                            .item {
                                margin-bottom: 25px;
                                padding: 25px;
                                background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,249,250,0.95));
                                border-radius: 16px;
                                position: relative;
                                border: 1px solid #dfdfdf;
                            }
                            .item h3 {
                                color: #2c3e50;
                                font-size: 18px;
                                margin: 0 0 10px 0;
                                font-weight: 600;
                            }
                            .item .time-period {
                                color: #3498db;
                                font-weight: 500;
                                margin: 5px 0;
                            }
                            .item .major {
                                font-style: italic;
                                color: #666;
                                margin: 5px 0;
                            }
                            .item .description {
                                margin: 10px 0;
                                color: #555;
                                line-height: 1.6;
                            }
                            .item strong {
                                color: #333;
                                font-weight: 600;
                            }
                            @media print {
                                body {
                                    margin: 0;
                                    background: white;
                                }
                                .resume-container {
                                    margin: 0;
                                    box-shadow: none;
                                    border-radius: 0;
                                }
                                .resume-sidebar {
                                    background: linear-gradient(135deg, #2c3e50, #1a2530) !important;
                                    -webkit-print-color-adjust: exact;
                                    print-color-adjust: exact;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        ${printContent}
                    </body>
                    </html>
                `);

                printWindow.document.close();
                printWindow.focus();

                // 延迟打印，确保内容加载完成
                setTimeout(() => {
                    printWindow.print();
                }, 500);
            },
            getResumeData: function () {
                return {
                    personalInfo: {
                        name: document.getElementById('name').value,
                        position: document.getElementById('position').value,
                        phone: document.getElementById('phone').value,
                        email: document.getElementById('email').value,
                        website: document.getElementById('website').value,
                        summary: document.getElementById('summary').value
                    },
                    education: resumeData.education.filter(edu => edu.school),
                    work: resumeData.work.filter(work => work.company),
                    skills: resumeData.skills.filter(skill => skill.name),
                    projects: resumeData.projects.filter(project => project.name)
                };
            },
            generatePrintContent: function (data) {
                let content = '<div class="resume-container">';

                // 左侧栏
                content += '<div class="resume-sidebar">';

                // 个人信息
                content += '<div class="sidebar-header">';
                if (data.personalInfo.name) {
                    content += `<h1>${data.personalInfo.name}</h1>`;
                }
                if (data.personalInfo.position) {
                    content += `<p class="position">${data.personalInfo.position}</p>`;
                }

                content += '<div class="contact-info">';
                content += `<div class="contact-item"><span>📞</span><span>${data.personalInfo.phone || '电话'}</span></div>`;
                content += `<div class="contact-item"><span>✉️</span><span>${data.personalInfo.email || '邮箱'}</span></div>`;
                content += `<div class="contact-item"><span>🔗</span><span>${data.personalInfo.website || 'WebSite'}</span></div>`;
                content += '</div>';
                content += '</div>';

                // 个人简介
                if (data.personalInfo.summary) {
                    content += `
                        <div class="sidebar-section">
                            <h3>个人简介</h3>
                            <p>${data.personalInfo.summary}</p>
                        </div>
                    `;
                }

                // 技能展示
                if (data.skills.length > 0) {
                    content += '<div class="sidebar-section"><h3>技能展示</h3>';
                    content += '<ul class="skills-list">';
                    data.skills.forEach(skill => {
                        if (skill.name) {
                            content += `<li>${skill.name}${skill.level ? ` - ${skill.level}` : ''}</li>`;
                        }
                    });
                    content += '</ul></div>';
                }

                content += '</div>'; // 结束左侧栏

                // 右侧主要内容
                content += '<div class="resume-main">';

                // 教育经历
                if (data.education.length > 0) {
                    content += '<div class="main-section"><h3>教育经历</h3>';
                    data.education.forEach(edu => {
                        content += '<div class="item">';
                        content += `<h3>${edu.school || ''} · ${edu.degree || ''}</h3>`;
                        content += `<p class="time-period">${edu.startDate || ''} - ${edu.endDate || ''}</p>`;
                        if (edu.major) {
                            content += `<p class="major">${edu.major}</p>`;
                        }
                        if (edu.description) {
                            content += `<p class="description">${edu.description}</p>`;
                        }
                        content += '</div>';
                    });
                    content += '</div>';
                }

                // 工作经历
                if (data.work.length > 0) {
                    content += '<div class="main-section"><h3>工作经历</h3>';
                    data.work.forEach(work => {
                        content += '<div class="item">';
                        content += `<h3>${work.company || ''} · ${work.position || ''}</h3>`;
                        content += `<p class="time-period">${work.startDate || ''} - ${work.endDate || ''}</p>`;
                        if (work.description) {
                            content += `<p class="description">${work.description}</p>`;
                        }
                        content += '</div>';
                    });
                    content += '</div>';
                }

                // 项目经历
                if (data.projects.length > 0) {
                    content += '<div class="main-section"><h3>项目经历</h3>';
                    data.projects.forEach(project => {
                        content += '<div class="item">';
                        content += `<h3>${project.name || ''}${project.role ? ` · ${project.role}` : ''}</h3>`;
                        content += `<p class="time-period">${project.time || ''}</p>`;
                        if (project.description) {
                            content += `<p class="description">${project.description}</p>`;
                        }
                        content += '</div>';
                    });
                    content += '</div>';
                }

                content += '</div>'; // 结束右侧栏
                content += '</div>'; // 结束容器
                return content;
            },
            daochuResume: function () {
                const resumeData = this.getResumeData();
                const jsonData = JSON.stringify(resumeData, null, 2);
                const blob = new Blob([jsonData], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `resume-${resumeData.personalInfo.name || '未命名'}-${new Date().toISOString().slice(0, 10)}.json`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            },
            daoruResume: function () {
                document.getElementById('daoru-file').click();
            },
            handleFileImport: function (event) {
                const file = event.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const resumeData = JSON.parse(e.target.result);
                        this.loadResumeData(resumeData);
                        alert('简历导入成功！');
                    } catch (error) {
                        alert('导入失败：请确保文件是有效的JSON格式');
                        console.error('Import error:', error);
                    }
                };
                reader.readAsText(file);

                // 清空文件输入框，允许重复导入相同文件
                event.target.value = '';
            },
            loadResumeData: function (data) {
                // 加载个人信息
                if (data.personalInfo) {
                    document.getElementById('name').value = data.personalInfo.name || '';
                    document.getElementById('position').value = data.personalInfo.position || '';
                    document.getElementById('phone').value = data.personalInfo.phone || '';
                    document.getElementById('email').value = data.personalInfo.email || '';
                    document.getElementById('website').value = data.personalInfo.website || '';
                    document.getElementById('summary').value = data.personalInfo.summary || '';

                    // 更新resumeData中的个人信息
                    resumeData.personalInfo = {
                        name: data.personalInfo.name || '',
                        position: data.personalInfo.position || '',
                        phone: data.personalInfo.phone || '',
                        email: data.personalInfo.email || '',
                        website: data.personalInfo.website || '',
                        summary: data.personalInfo.summary || ''
                    };
                }

                // 清空现有的动态内容
                resumeData.education = [];
                resumeData.work = [];
                resumeData.skills = [];
                resumeData.projects = [];

                document.getElementById('education-list').innerHTML = '';
                document.getElementById('work-list').innerHTML = '';
                document.getElementById('skill-list').innerHTML = '';
                document.getElementById('project-list').innerHTML = '';

                // 加载教育经历
                if (data.education && Array.isArray(data.education)) {
                    data.education.forEach(edu => {
                        this.addEducationItem(edu);
                    });
                }

                // 加载工作经历
                if (data.work && Array.isArray(data.work)) {
                    data.work.forEach(work => {
                        this.addWorkItem(work);
                    });
                }

                // 加载技能
                if (data.skills && Array.isArray(data.skills)) {
                    data.skills.forEach(skill => {
                        this.addSkillItem(skill);
                    });
                }

                // 加载项目经历
                if (data.projects && Array.isArray(data.projects)) {
                    data.projects.forEach(project => {
                        this.addProjectItem(project);
                    });
                }

                // 更新预览
                this.updatePreview();
            },
            addEducationItem: function (eduData) {
                const educationList = document.getElementById('education-list');
                const educationId = eduData.id || `education-${Date.now()}`;

                const educationItem = {
                    id: educationId,
                    school: eduData.school || '',
                    degree: eduData.degree || '',
                    major: eduData.major || '',
                    startDate: eduData.startDate || '',
                    endDate: eduData.endDate || '',
                    description: eduData.description || ''
                };

                resumeData.education.push(educationItem);

                const educationDiv = document.createElement('div');
                educationDiv.className = 'item-card';
                educationDiv.id = educationId;
                educationDiv.innerHTML = `
                    <button class="remove-btn" onclick="this.parentElement.remove()">×</button>
                    <div class="form-group">
                        <label>学校</label>
                        <input type="text" placeholder="请输入学校名称" data-field="school" value="${educationItem.school}">
                    </div>
                    <div class="form-group">
                        <label>学历</label>
                        <input type="text" placeholder="请输入学历" data-field="degree" value="${educationItem.degree}">
                    </div>
                    <div class="form-group">
                        <label>专业</label>
                        <input type="text" placeholder="请输入专业" data-field="major" value="${educationItem.major}">
                    </div>
                    <div class="form-group">
                        <label>开始时间</label>
                        <input type="text" placeholder="如：2015年9月" data-field="startDate" value="${educationItem.startDate}">
                    </div>
                    <div class="form-group">
                        <label>结束时间</label>
                        <input type="text" placeholder="如：2019年6月" data-field="endDate" value="${educationItem.endDate}">
                    </div>
                    <div class="form-group">
                        <label>描述</label>
                        <textarea placeholder="请输入教育经历描述" data-field="description">${educationItem.description}</textarea>
                    </div>
                `;

                educationList.appendChild(educationDiv);

                // 添加事件监听
                const inputs = educationDiv.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.addEventListener('input', (e) => {
                        const field = e.target.getAttribute('data-field');
                        const index = resumeData.education.findIndex(item => item.id === educationId);
                        if (index !== -1) {
                            resumeData.education[index][field] = e.target.value;
                            this.updateEducationPreview();
                        }
                    });
                });

                // 添加删除按钮事件
                const removeBtn = educationDiv.querySelector('.remove-btn');
                removeBtn.addEventListener('click', () => {
                    const index = resumeData.education.findIndex(item => item.id === educationId);
                    if (index !== -1) {
                        resumeData.education.splice(index, 1);
                        this.updateEducationPreview();
                    }
                    educationDiv.remove();
                });
            },
            addWorkItem: function (workData) {
                const workList = document.getElementById('work-list');
                const workId = workData.id || `work-${Date.now()}`;

                const workItem = {
                    id: workId,
                    company: workData.company || '',
                    position: workData.position || '',
                    startDate: workData.startDate || '',
                    endDate: workData.endDate || '',
                    description: workData.description || ''
                };

                resumeData.work.push(workItem);

                const workDiv = document.createElement('div');
                workDiv.className = 'item-card';
                workDiv.id = workId;
                workDiv.innerHTML = `
                    <button class="remove-btn" onclick="this.parentElement.remove()">×</button>
                    <div class="form-group">
                        <label>公司</label>
                        <input type="text" placeholder="请输入公司名称" data-field="company" value="${workItem.company}">
                    </div>
                    <div class="form-group">
                        <label>职位</label>
                        <input type="text" placeholder="请输入职位" data-field="position" value="${workItem.position}">
                    </div>
                    <div class="form-group">
                        <label>开始时间</label>
                        <input type="text" placeholder="如：2019年7月" data-field="startDate" value="${workItem.startDate}">
                    </div>
                    <div class="form-group">
                        <label>结束时间</label>
                        <input type="text" placeholder="如：2022年8月" data-field="endDate" value="${workItem.endDate}">
                    </div>
                    <div class="form-group">
                        <label>工作描述</label>
                        <textarea placeholder="请输入工作描述" data-field="description">${workItem.description}</textarea>
                    </div>
                `;

                workList.appendChild(workDiv);

                // 添加事件监听
                const inputs = workDiv.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.addEventListener('input', (e) => {
                        const field = e.target.getAttribute('data-field');
                        const index = resumeData.work.findIndex(item => item.id === workId);
                        if (index !== -1) {
                            resumeData.work[index][field] = e.target.value;
                            this.updateWorkPreview();
                        }
                    });
                });

                // 添加删除按钮事件
                const removeBtn = workDiv.querySelector('.remove-btn');
                removeBtn.addEventListener('click', () => {
                    const index = resumeData.work.findIndex(item => item.id === workId);
                    if (index !== -1) {
                        resumeData.work.splice(index, 1);
                        this.updateWorkPreview();
                    }
                    workDiv.remove();
                });
            },
            addSkillItem: function (skillData) {
                const skillList = document.getElementById('skill-list');
                const skillId = skillData.id || `skill-${Date.now()}`;

                const skillItem = {
                    id: skillId,
                    name: skillData.name || '',
                    level: skillData.level || ''
                };

                resumeData.skills.push(skillItem);

                const skillDiv = document.createElement('div');
                skillDiv.className = 'item-card';
                skillDiv.id = skillId;
                skillDiv.innerHTML = `
                    <button class="remove-btn" onclick="this.parentElement.remove()">×</button>
                    <div class="form-group">
                        <label>技能名称</label>
                        <input type="text" placeholder="请输入技能名称" data-field="name" value="${skillItem.name}">
                    </div>
                    <div class="form-group">
                        <label>熟练程度</label>
                        <input type="text" placeholder="如：精通、熟练、了解" data-field="level" value="${skillItem.level}">
                    </div>
                `;

                skillList.appendChild(skillDiv);

                // 添加事件监听
                const inputs = skillDiv.querySelectorAll('input');
                inputs.forEach(input => {
                    input.addEventListener('input', (e) => {
                        const field = e.target.getAttribute('data-field');
                        const index = resumeData.skills.findIndex(item => item.id === skillId);
                        if (index !== -1) {
                            resumeData.skills[index][field] = e.target.value;
                            this.updateSkillsPreview();
                        }
                    });
                });

                // 添加删除按钮事件
                const removeBtn = skillDiv.querySelector('.remove-btn');
                removeBtn.addEventListener('click', () => {
                    const index = resumeData.skills.findIndex(item => item.id === skillId);
                    if (index !== -1) {
                        resumeData.skills.splice(index, 1);
                        this.updateSkillsPreview();
                    }
                    skillDiv.remove();
                });
            },
            addProjectItem: function (projectData) {
                const projectList = document.getElementById('project-list');
                const projectId = projectData.id || `project-${Date.now()}`;

                const projectItem = {
                    id: projectId,
                    name: projectData.name || '',
                    role: projectData.role || '',
                    time: projectData.time || '',
                    description: projectData.description || ''
                };

                resumeData.projects.push(projectItem);

                const projectDiv = document.createElement('div');
                projectDiv.className = 'item-card';
                projectDiv.id = projectId;
                projectDiv.innerHTML = `
                    <button class="remove-btn" onclick="this.parentElement.remove()">×</button>
                    <div class="form-group">
                        <label>项目名称</label>
                        <input type="text" placeholder="请输入项目名称" data-field="name" value="${projectItem.name}">
                    </div>
                    <div class="form-group">
                        <label>担任角色</label>
                        <input type="text" placeholder="请输入担任角色" data-field="role" value="${projectItem.role}">
                    </div>
                    <div class="form-group">
                        <label>项目时间</label>
                        <input type="text" placeholder="如：2021年3月 - 2021年8月" data-field="time" value="${projectItem.time}">
                    </div>
                    <div class="form-group">
                        <label>项目描述</label>
                        <textarea placeholder="请输入项目描述" data-field="description">${projectItem.description}</textarea>
                    </div>
                `;

                projectList.appendChild(projectDiv);

                // 添加事件监听
                const inputs = projectDiv.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.addEventListener('input', (e) => {
                        const field = e.target.getAttribute('data-field');
                        const index = resumeData.projects.findIndex(item => item.id === projectId);
                        if (index !== -1) {
                            resumeData.projects[index][field] = e.target.value;
                            this.updateProjectsPreview();
                        }
                    });
                });

                // 添加删除按钮事件
                const removeBtn = projectDiv.querySelector('.remove-btn');
                removeBtn.addEventListener('click', () => {
                    const index = resumeData.projects.findIndex(item => item.id === projectId);
                    if (index !== -1) {
                        resumeData.projects.splice(index, 1);
                        this.updateProjectsPreview();
                    }
                    projectDiv.remove();
                });
            }
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/job-resume/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['337']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,9]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,7]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[3,5]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[4]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[6]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"h2","attrs":{},"childNodes":[8]},{"type":"text","content":"简历制作","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"resume-container"},"childNodes":[10,62]},{"type":"tag","name":"div","attrs":{"class":"resume-editor"},"childNodes":[11,38,44,50,56]},{"type":"tag","name":"div","attrs":{"class":"editor-section"},"childNodes":[12,14,18,22,26,30,34]},{"type":"tag","name":"h3","attrs":{},"childNodes":[13]},{"type":"text","content":"个人信息","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"form-group"},"childNodes":[15,17]},{"type":"tag","name":"label","attrs":{},"childNodes":[16]},{"type":"text","content":"姓名","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","id":"name","placeholder":"请输入姓名"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"form-group"},"childNodes":[19,21]},{"type":"tag","name":"label","attrs":{},"childNodes":[20]},{"type":"text","content":"职位","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","id":"position","placeholder":"请输入应聘职位"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"form-group"},"childNodes":[23,25]},{"type":"tag","name":"label","attrs":{},"childNodes":[24]},{"type":"text","content":"电话","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","id":"phone","placeholder":"请输入联系电话"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"form-group"},"childNodes":[27,29]},{"type":"tag","name":"label","attrs":{},"childNodes":[28]},{"type":"text","content":"邮箱","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"email","id":"email","placeholder":"请输入邮箱地址"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"form-group"},"childNodes":[31,33]},{"type":"tag","name":"label","attrs":{},"childNodes":[32]},{"type":"text","content":"WebSite","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","id":"website","placeholder":"请输入WebSite链接"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"form-group"},"childNodes":[35,37]},{"type":"tag","name":"label","attrs":{},"childNodes":[36]},{"type":"text","content":"个人简介","childNodes":[]},{"type":"tag","name":"textarea","attrs":{"id":"summary","placeholder":"请输入个人简介"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"editor-section"},"childNodes":[39,43]},{"type":"tag","name":"h3","attrs":{},"childNodes":[40,41]},{"type":"text","content":"教育经历","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"add-btn","id":"add-education"},"childNodes":[42]},{"type":"text","content":"+ 添加","childNodes":[]},{"type":"tag","name":"div","attrs":{"id":"education-list"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"editor-section"},"childNodes":[45,49]},{"type":"tag","name":"h3","attrs":{},"childNodes":[46,47]},{"type":"text","content":"工作经历","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"add-btn","id":"add-work"},"childNodes":[48]},{"type":"text","content":"+ 添加","childNodes":[]},{"type":"tag","name":"div","attrs":{"id":"work-list"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"editor-section"},"childNodes":[51,55]},{"type":"tag","name":"h3","attrs":{},"childNodes":[52,53]},{"type":"text","content":"技能展示","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"add-btn","id":"add-skill"},"childNodes":[54]},{"type":"text","content":"+ 添加","childNodes":[]},{"type":"tag","name":"div","attrs":{"id":"skill-list"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"editor-section"},"childNodes":[57,61]},{"type":"tag","name":"h3","attrs":{},"childNodes":[58,59]},{"type":"text","content":"项目经历","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"add-btn","id":"add-project"},"childNodes":[60]},{"type":"text","content":"+ 添加","childNodes":[]},{"type":"tag","name":"div","attrs":{"id":"project-list"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"resume-preview"},"childNodes":[63,109,110]},{"type":"tag","name":"div","attrs":{"class":"preview-content","id":"resume-preview"},"childNodes":[64]},{"type":"tag","name":"div","attrs":{"class":"resume-layout"},"childNodes":[65,96]},{"type":"tag","name":"div","attrs":{"class":"resume-sidebar"},"childNodes":[66,87,92]},{"type":"tag","name":"div","attrs":{"class":"sidebar-header"},"childNodes":[67,69,71]},{"type":"tag","name":"h1","attrs":{"id":"preview-name"},"childNodes":[68]},{"type":"text","content":"姓名","childNodes":[]},{"type":"tag","name":"p","attrs":{"id":"preview-position"},"childNodes":[70]},{"type":"text","content":"应聘职位","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"contact-info"},"childNodes":[72,77,82]},{"type":"tag","name":"div","attrs":{"class":"contact-item"},"childNodes":[73,75]},{"type":"tag","name":"span","attrs":{},"childNodes":[74]},{"type":"text","content":"📞","childNodes":[]},{"type":"tag","name":"span","attrs":{"id":"preview-phone"},"childNodes":[76]},{"type":"text","content":"电话","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"contact-item"},"childNodes":[78,80]},{"type":"tag","name":"span","attrs":{},"childNodes":[79]},{"type":"text","content":"✉️","childNodes":[]},{"type":"tag","name":"span","attrs":{"id":"preview-email"},"childNodes":[81]},{"type":"text","content":"邮箱","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"contact-item"},"childNodes":[83,85]},{"type":"tag","name":"span","attrs":{},"childNodes":[84]},{"type":"text","content":"🔗","childNodes":[]},{"type":"tag","name":"span","attrs":{"id":"preview-website"},"childNodes":[86]},{"type":"text","content":"WebSite","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"sidebar-section"},"childNodes":[88,90]},{"type":"tag","name":"h3","attrs":{},"childNodes":[89]},{"type":"text","content":"个人简介","childNodes":[]},{"type":"tag","name":"p","attrs":{"id":"preview-summary"},"childNodes":[91]},{"type":"text","content":"个人简介内容...","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"sidebar-section"},"childNodes":[93,95]},{"type":"tag","name":"h3","attrs":{},"childNodes":[94]},{"type":"text","content":"技能展示","childNodes":[]},{"type":"tag","name":"div","attrs":{"id":"preview-skills"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"resume-main"},"childNodes":[97,101,105]},{"type":"tag","name":"div","attrs":{"class":"main-section experience-section"},"childNodes":[98,100]},{"type":"tag","name":"h3","attrs":{},"childNodes":[99]},{"type":"text","content":"教育经历","childNodes":[]},{"type":"tag","name":"div","attrs":{"id":"preview-education","class":"experience-list"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"main-section experience-section"},"childNodes":[102,104]},{"type":"tag","name":"h3","attrs":{},"childNodes":[103]},{"type":"text","content":"工作经历","childNodes":[]},{"type":"tag","name":"div","attrs":{"id":"preview-work","class":"experience-list"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"main-section experience-section"},"childNodes":[106,108]},{"type":"tag","name":"h3","attrs":{},"childNodes":[107]},{"type":"text","content":"项目经历","childNodes":[]},{"type":"tag","name":"div","attrs":{"id":"preview-projects","class":"experience-list"},"childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"file","id":"daoru-file","accept":".json","style":"display: none;"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"daochu-buttons"},"childNodes":[111,113,115]},{"type":"tag","name":"button","attrs":{"class":"daochu-pdf-btn","id":"daochu-pdf-resume"},"childNodes":[112]},{"type":"text","content":"导出PDF","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"daoru-btn","id":"daoru-resume"},"childNodes":[114]},{"type":"text","content":"导入简历","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"daochu-btn","id":"daochu-resume"},"childNodes":[116]},{"type":"text","content":"导出简历","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/job-resume/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['338']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"job-resume\"]{\n\nwidth: calc(100vw - 100px);\n\nleft: 50px;\n\ntop: 20px;\n\n}\n\n [page-view=\"job-resume\"][focus=\"no\"]>header{\n\nbackground-color: #fafafa;\n\n}\n\n [page-view=\"job-resume\"]>header{\n\ntext-align: left;\n\nline-height: 50px;\n\nbackground-color: #ffffff;\n\nbox-shadow: -3px 3px 20px #d2d2db;\n\n}\n\n [page-view=\"job-resume\"]>header>h2{\n\ncolor: #000000;\n\nfont-size: 20px;\n\npadding-left: 50px;\n\nbackground-image: url(\"./job-resume.png\");\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\nfont-family: cursive;\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"job-resume\"] .resume-container{\n\ndisplay: flex;\n\nheight: calc(100vh - 120px);\n\noverflow: hidden;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor{\n\nwidth: 40%;\n\npadding: 20px;\n\noverflow-y: auto;\n\nbackground-color: #f8f9fa;\n\nborder-right: 1px solid #e9ecef;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section{\n\nbackground: white;\n\nborder-radius: 12px;\n\npadding: 25px;\n\nmargin-bottom: 20px;\n\nbox-shadow: 0 4px 15px rgba(0,0,0,0.08);\n\ntransition: all 0.3s ease;\n\nborder: 1px solid rgba(0,0,0,0.05);\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section:hover{\n\nbox-shadow: 0 8px 25px rgba(0,0,0,0.12);\n\ntransform: translateY(-2px);\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section h3{\n\nmargin-top: 0;\n\nmargin-bottom: 20px;\n\ncolor: #2c3e50;\n\nborder-bottom: 2px solid #3498db;\n\npadding-bottom: 12px;\n\ndisplay: flex;\n\njustify-content: space-between;\n\nalign-items: center;\n\nfont-size: 20px;\n\nfont-weight: 700;\n\nposition: relative;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section h3::after{\n\ncontent: '';\n\nposition: absolute;\n\nbottom: -2px;\n\nleft: 0;\n\nwidth: 50px;\n\nheight: 2px;\n\nbackground: linear-gradient(90deg, #3498db, #2c3e50);\n\nborder-radius: 2px;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .form-group{\n\nmargin-bottom: 15px;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .form-group label{\n\ndisplay: block;\n\nmargin-bottom: 5px;\n\nfont-weight: 600;\n\ncolor: #555;\n\nfont-size: 14px;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .form-group input, [page-view=\"job-resume\"] .resume-editor .editor-section .form-group textarea{\n\nwidth: 100%;\n\npadding: 10px 12px;\n\nborder: 1px solid #ddd;\n\nborder-radius: 6px;\n\nfont-size: 14px;\n\ntransition: all 0.2s ease;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .form-group input:focus, [page-view=\"job-resume\"] .resume-editor .editor-section .form-group textarea:focus{\n\noutline: none;\n\nborder-color: #007bff;\n\nbox-shadow: 0 0 0 3px rgba(0,123,255,0.25);\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .form-group input::placeholder, [page-view=\"job-resume\"] .resume-editor .editor-section .form-group textarea::placeholder{\n\ncolor: #aaa;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .form-group textarea{\n\nmin-height: 80px;\n\nresize: vertical;\n\nline-height: 1.5;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .item-card{\n\nbackground: #f8f9fa;\n\nborder: 1px solid #e9ecef;\n\nborder-radius: 6px;\n\npadding: 15px;\n\nmargin-bottom: 15px;\n\nposition: relative;\n\ntransition: all 0.2s ease;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .item-card:hover{\n\nbox-shadow: 0 2px 6px rgba(0,0,0,0.1);\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .item-card .form-group{\n\nmargin-bottom: 10px;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .item-card .remove-btn{\n\nposition: absolute;\n\ntop: 10px;\n\nright: 10px;\n\nbackground: #dc3545;\n\ncolor: white;\n\nborder: none;\n\nborder-radius: 50%;\n\nwidth: 24px;\n\nheight: 24px;\n\nfont-size: 12px;\n\ncursor: pointer;\n\ndisplay: flex;\n\nalign-items: center;\n\njustify-content: center;\n\ntransition: all 0.2s ease;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .item-card .remove-btn:hover{\n\nbackground: #c82333;\n\ntransform: scale(1.1);\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .add-btn{\n\nbackground: linear-gradient(135deg, #007bff, #0056b3);\n\ncolor: white;\n\nborder: none;\n\nborder-radius: 6px;\n\npadding: 6px 12px;\n\nfont-size: 13px;\n\ncursor: pointer;\n\ntransition: all 0.2s ease;\n\nfont-weight: 500;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .add-btn:hover{\n\nbackground: linear-gradient(135deg, #0056b3, #004085);\n\ntransform: translateY(-1px);\n\nbox-shadow: 0 2px 4px rgba(0,0,0,0.2);\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .add-btn:active{\n\ntransform: translateY(0);\n\n}\n\n [page-view=\"job-resume\"] .resume-preview{\n\nwidth: 60%;\n\npadding: 20px;\n\noverflow-y: auto;\n\nbackground-color: #f5f7fa;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .preview-content{\n\nbackground: white;\n\nborder-radius: 12px;\n\nbox-shadow: 0 8px 30px rgba(0,0,0,0.12);\n\nmin-height: 500px;\n\noverflow: hidden;\n\nfont-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-layout{\n\ndisplay: flex;\n\nmin-height: 100%;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-sidebar{\n\nwidth: 35%;\n\nbackground: linear-gradient(135deg, #2c3e50, #1a2530);\n\ncolor: white;\n\npadding: 40px 30px;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-sidebar .sidebar-header{\n\ntext-align: center;\n\nmargin-bottom: 30px;\n\npadding-bottom: 25px;\n\nborder-bottom: 1px solid rgba(255,255,255,0.2);\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-sidebar .sidebar-header h1{\n\nmargin: 0 0 10px 0;\n\nfont-size: 32px;\n\nfont-weight: 700;\n\ncolor: white;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-sidebar .sidebar-header #preview-position{\n\nfont-size: 18px;\n\ncolor: #3498db;\n\nmargin: 0 0 20px 0;\n\nfont-weight: 500;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-sidebar .sidebar-header .contact-info{\n\ndisplay: flex;\n\nflex-direction: column;\n\ngap: 12px;\n\nfont-size: 14px;\n\ncolor: rgba(255,255,255,0.9);\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-sidebar .sidebar-header .contact-info .contact-item{\n\ndisplay: flex;\n\nalign-items: center;\n\ngap: 8px;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-sidebar .sidebar-header .contact-info .contact-item i{\n\nwidth: 16px;\n\nheight: 16px;\n\nbackground-color: #3498db;\n\nborder-radius: 50%;\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-sidebar .sidebar-section{\n\nmargin-bottom: 30px;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-sidebar .sidebar-section h3{\n\ncolor: #3498db;\n\nfont-size: 18px;\n\nmargin: 0 0 15px 0;\n\npadding-bottom: 8px;\n\nborder-bottom: 1px solid rgba(255,255,255,0.2);\n\nfont-weight: 600;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-sidebar .sidebar-section p{\n\nline-height: 1.7;\n\ncolor: rgba(255,255,255,0.9);\n\nmargin-bottom: 15px;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-sidebar .sidebar-section #preview-skills ul{\n\npadding: 0;\n\nlist-style: none;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-sidebar .sidebar-section #preview-skills ul li{\n\nbackground: rgba(52,152,219,0.2);\n\npadding: 8px 12px;\n\nmargin-bottom: 8px;\n\nborder-radius: 6px;\n\nfont-size: 14px;\n\ncolor: white;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-main{\n\nwidth: 65%;\n\npadding: 40px;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section{\n\nmargin-bottom: 35px;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section h3{\n\ncolor: #2c3e50;\n\nfont-size: 22px;\n\nmargin: 0 0 20px 0;\n\npadding-bottom: 10px;\n\nborder-bottom: 2px solid #3498db;\n\nfont-weight: 700;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section .experience-list{\n\nposition: relative;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section .education-item, [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section .work-item, [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section .project-item{\n\nmargin-bottom: 25px;\n\npadding: 25px;\n\nbackground: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,249,250,0.95));\n\nborder-radius: 16px;\n\nposition: relative;\n\nborder: 1px solid #dfdfdf;\n\ntransition: all 0.3s ease;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section .education-item::after, [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section .work-item::after, [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section .project-item::after{\n\ncontent: '';\n\nposition: absolute;\n\ntop: 0;\n\nleft: 0;\n\nright: 0;\n\nbottom: 0;\n\nbackground: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"60\" height=\"60\" viewBox=\"0 0 60 60\"><rect width=\"60\" height=\"60\" fill=\"none\"/><path d=\"M10,10 L50,10 L50,50 L10,50 Z\" fill=\"none\" stroke=\"rgba(52,152,219,0.03)\" stroke-width=\"0.5\"/></svg>');\n\nopacity: 0.4;\n\nborder-radius: 16px;\n\npointer-events: none;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section .education-item h4, [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section .work-item h4, [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section .project-item h4{\n\ncolor: #2c3e50;\n\nfont-size: 18px;\n\nmargin: 0 0 10px 0;\n\nfont-weight: 600;\n\nposition: relative;\n\nz-index: 1;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section .education-item p, [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section .work-item p, [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section .project-item p{\n\nmargin: 8px 0;\n\ncolor: #555;\n\nline-height: 1.6;\n\nposition: relative;\n\nz-index: 1;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section .education-item strong, [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section .work-item strong, [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section .project-item strong{\n\ncolor: #333;\n\nfont-weight: 600;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section .education-item:hover, [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section .work-item:hover, [page-view=\"job-resume\"] .resume-preview .resume-main .experience-section .project-item:hover{\n\ntransform: translateY(-3px);\n\nbox-shadow: 0 8px 25px rgba(0,0,0,0.15);\n\ntransition: all 0.3s ease;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .daochu-buttons{\n\ndisplay: flex;\n\ngap: 15px;\n\nmargin-top: 30px;\n\nalign-items: center;\n\nanimation: fadeInUp 0.6s ease-out;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview @keyframes fadeInUp from{\n\nopacity: 0;\n\ntransform: translateY(20px);\n\n}\n\n [page-view=\"job-resume\"] .resume-preview @keyframes fadeInUp to{\n\nopacity: 1;\n\ntransform: translateY(0);\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .daochu-pdf-btn{\n\nbackground: linear-gradient(135deg, #28a745, #1e7e34);\n\ncolor: white;\n\nborder: none;\n\nborder-radius: 12px;\n\npadding: 14px 28px;\n\nfont-size: 16px;\n\ncursor: pointer;\n\nwidth: 200px;\n\ntransition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n\nfont-weight: 600;\n\nbox-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);\n\nletter-spacing: 0.5px;\n\nposition: relative;\n\noverflow: hidden;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .daochu-pdf-btn:hover{\n\nbackground: linear-gradient(135deg, #1e7e34, #155724);\n\ntransform: translateY(-3px);\n\nbox-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .daochu-pdf-btn:active{\n\ntransform: translateY(-1px);\n\nbox-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .daochu-pdf-btn::before{\n\ncontent: '';\n\nposition: absolute;\n\ntop: 0;\n\nleft: -100%;\n\nwidth: 100%;\n\nheight: 100%;\n\nbackground: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);\n\ntransition: left 0.5s;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .daochu-pdf-btn:hover::before{\n\nleft: 100%;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .daochu-btn{\n\nbackground: linear-gradient(135deg, #17a2b8, #138496);\n\ncolor: white;\n\nborder: none;\n\nborder-radius: 12px;\n\npadding: 14px 28px;\n\nfont-size: 16px;\n\ncursor: pointer;\n\nwidth: 200px;\n\ntransition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n\nfont-weight: 600;\n\nbox-shadow: 0 4px 15px rgba(23, 162, 184, 0.3);\n\nletter-spacing: 0.5px;\n\nposition: relative;\n\noverflow: hidden;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .daochu-btn:hover{\n\nbackground: linear-gradient(135deg, #138496, #0c6c77);\n\ntransform: translateY(-3px);\n\nbox-shadow: 0 8px 25px rgba(23, 162, 184, 0.4);\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .daochu-btn:active{\n\ntransform: translateY(-1px);\n\nbox-shadow: 0 4px 15px rgba(23, 162, 184, 0.3);\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .daochu-btn::before{\n\ncontent: '';\n\nposition: absolute;\n\ntop: 0;\n\nleft: -100%;\n\nwidth: 100%;\n\nheight: 100%;\n\nbackground: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);\n\ntransition: left 0.5s;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .daochu-btn:hover::before{\n\nleft: 100%;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .daoru-btn{\n\nbackground: linear-gradient(135deg, #ffc107, #e0a800);\n\ncolor: #212529;\n\nborder: none;\n\nborder-radius: 12px;\n\npadding: 14px 28px;\n\nfont-size: 16px;\n\ncursor: pointer;\n\nwidth: 200px;\n\ntransition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n\nfont-weight: 600;\n\nbox-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);\n\nletter-spacing: 0.5px;\n\nposition: relative;\n\noverflow: hidden;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .daoru-btn:hover{\n\nbackground: linear-gradient(135deg, #e0a800, #c69500);\n\ntransform: translateY(-3px);\n\nbox-shadow: 0 8px 25px rgba(255, 193, 7, 0.4);\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .daoru-btn:active{\n\ntransform: translateY(-1px);\n\nbox-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .daoru-btn::before{\n\ncontent: '';\n\nposition: absolute;\n\ntop: 0;\n\nleft: -100%;\n\nwidth: 100%;\n\nheight: 100%;\n\nbackground: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);\n\ntransition: left 0.5s;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .daoru-btn:hover::before{\n\nleft: 100%;\n\n}\n\n/* // 添加图标样式\r */\n\n [page-view=\"job-resume\"] .icon-phone, [page-view=\"job-resume\"] .icon-email{\n\ndisplay: inline-block;\n\nwidth: 16px;\n\nheight: 16px;\n\nbackground-color: #3498db;\n\nborder-radius: 50%;\n\nmargin-right: 8px;\n\n}\n\n [page-view=\"job-resume\"] .icon-phone::before{\n\ncontent: \"📞\";\n\nfont-size: 10px;\n\ncolor: white;\n\n}\n\n [page-view=\"job-resume\"] .icon-email::before{\n\ncontent: \"✉️\";\n\nfont-size: 10px;\n\ncolor: white;\n\n}\n\n/* // 响应式设计\r */\n\n [page-view=\"job-resume\"] @media (max-width: 768px) .resume-container{\n\nflex-direction: column;\n\nheight: auto;\n\n}\n\n [page-view=\"job-resume\"] @media (max-width: 768px) .resume-editor, [page-view=\"job-resume\"] @media (max-width: 768px) .resume-preview{\n\nwidth: 100%;\n\nheight: auto;\n\n}\n\n [page-view=\"job-resume\"] @media (max-width: 768px) .resume-editor{\n\nborder-right: none;\n\nborder-bottom: 1px solid #e9ecef;\n\n}\n\n [page-view=\"job-resume\"] @media (max-width: 768px) .resume-preview .resume-layout{\n\nflex-direction: column;\n\n}\n\n [page-view=\"job-resume\"] @media (max-width: 768px) .resume-preview .resume-sidebar{\n\nwidth: 100%;\n\npadding: 20px;\n\n}\n\n [page-view=\"job-resume\"] @media (max-width: 768px) .resume-preview .resume-main{\n\nwidth: 100%;\n\npadding: 20px;\n\n}\n\n [page-view=\"job-resume\"] @media (max-width: 480px) .resume-preview .resume-sidebar{\n\npadding: 15px;\n\n}\n\n [page-view=\"job-resume\"] @media (max-width: 480px) .resume-preview .resume-sidebar .sidebar-header h1{\n\nfont-size: 24px;\n\n}\n\n [page-view=\"job-resume\"] @media (max-width: 480px) .resume-preview .resume-sidebar .sidebar-header .position{\n\nfont-size: 16px;\n\n}\n\n [page-view=\"job-resume\"] @media (max-width: 480px) .resume-preview .resume-main{\n\npadding: 15px;\n\n}\n\n [page-view=\"job-resume\"] @media (max-width: 480px) .resume-preview .resume-main .main-section h3{\n\nfont-size: 18px;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

import template from './index.html';
import './index.scss';

export default function (obj) {
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
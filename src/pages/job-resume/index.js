import template from './index.html';
import './index.scss';

export default function (obj) {
    let resumeData = {
        personalInfo: {
            name: '',
            position: '',
            phone: '',
            email: '',
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
            initEventListeners: function() {
                // 个人信息输入监听
                const personalInputs = ['name', 'position', 'phone', 'email', 'summary'];
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
                document.getElementById('export-resume').addEventListener('click', () => this.exportResume());
            },
            updatePreview: function() {
                // 更新个人信息预览
                document.getElementById('preview-name').textContent = resumeData.personalInfo.name || '姓名';
                document.getElementById('preview-position').textContent = resumeData.personalInfo.position || '应聘职位';
                document.getElementById('preview-phone').textContent = resumeData.personalInfo.phone || '电话';
                document.getElementById('preview-email').textContent = resumeData.personalInfo.email || '邮箱';
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
            addEducation: function() {
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
            updateEducationPreview: function() {
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
                        <h4>${edu.school || '学校名称'} - ${edu.degree || '学历'}</h4>
                        <p><strong>专业：</strong>${edu.major || '专业'}</p>
                        <p><strong>时间：</strong>${edu.startDate || '开始时间'} - ${edu.endDate || '结束时间'}</p>
                        <p>${edu.description || '教育经历描述'}</p>
                    `;
                    previewEducation.appendChild(eduDiv);
                });
            },
            addWork: function() {
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
            updateWorkPreview: function() {
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
                        <h4>${work.company || '公司名称'} - ${work.position || '职位'}</h4>
                        <p><strong>时间：</strong>${work.startDate || '开始时间'} - ${work.endDate || '结束时间'}</p>
                        <p>${work.description || '工作描述'}</p>
                    `;
                    previewWork.appendChild(workDiv);
                });
            },
            addSkill: function() {
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
            updateSkillsPreview: function() {
                const previewSkills = document.getElementById('preview-skills');
                previewSkills.innerHTML = '';
                
                if (resumeData.skills.length === 0) {
                    previewSkills.innerHTML = '<p>暂无技能展示</p>';
                    return;
                }
                
                const ul = document.createElement('ul');
                resumeData.skills.forEach(skill => {
                    const li = document.createElement('li');
                    li.textContent = `${skill.name || '技能名称'} - ${skill.level || '熟练程度'}`;
                    ul.appendChild(li);
                });
                previewSkills.appendChild(ul);
            },
            addProject: function() {
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
            updateProjectsPreview: function() {
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
                        <h4>${project.name || '项目名称'} - ${project.role || '担任角色'}</h4>
                        <p><strong>时间：</strong>${project.time || '项目时间'}</p>
                        <p>${project.description || '项目描述'}</p>
                    `;
                    previewProjects.appendChild(projectDiv);
                });
            },
            exportResume: function() {
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
                                margin: 20px;
                                padding: 0;
                                font-family: 'Microsoft YaHei', Arial, sans-serif;
                                line-height: 1.6;
                                color: #333;
                            }
                            .resume-container {
                                max-width: 800px;
                                margin: 0 auto;
                                background: white;
                            }
                            .resume-header {
                                text-align: center;
                                margin-bottom: 30px;
                                padding-bottom: 20px;
                                border-bottom: 2px solid #007bff;
                            }
                            .resume-header h1 {
                                margin: 0 0 10px 0;
                                color: #333;
                                font-size: 28px;
                            }
                            .contact-info {
                                color: #666;
                                font-size: 14px;
                            }
                            .section {
                                margin-bottom: 25px;
                            }
                            .section h2 {
                                color: #007bff;
                                border-bottom: 1px solid #eee;
                                padding-bottom: 8px;
                                margin-bottom: 15px;
                                font-size: 18px;
                            }
                            .item {
                                margin-bottom: 15px;
                            }
                            .item h3 {
                                margin: 0 0 5px 0;
                                color: #333;
                                font-size: 16px;
                            }
                            .item p {
                                margin: 3px 0;
                                color: #555;
                            }
                            .skills-list {
                                display: flex;
                                flex-wrap: wrap;
                                gap: 10px;
                            }
                            .skill-item {
                                background: #f0f8ff;
                                padding: 5px 10px;
                                border-radius: 15px;
                                font-size: 14px;
                            }
                            @media print {
                                body {
                                    margin: 10px;
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
            getResumeData: function() {
                return {
                    personalInfo: {
                        name: document.getElementById('name').value,
                        position: document.getElementById('position').value,
                        phone: document.getElementById('phone').value,
                        email: document.getElementById('email').value,
                        summary: document.getElementById('summary').value
                    },
                    education: resumeData.education.filter(edu => edu.school),
                    work: resumeData.work.filter(work => work.company),
                    skills: resumeData.skills.filter(skill => skill.name),
                    projects: resumeData.projects.filter(project => project.name)
                };
            },
            generatePrintContent: function(data) {
                let content = '<div class="resume-container">';
                
                // 个人信息
                if (data.personalInfo.name || data.personalInfo.position) {
                    content += '<div class="resume-header">';
                    if (data.personalInfo.name) {
                        content += `<h1>${data.personalInfo.name}</h1>`;
                    }
                    if (data.personalInfo.position) {
                        content += `<p><strong>${data.personalInfo.position}</strong></p>`;
                    }
                    
                    const contacts = [];
                    if (data.personalInfo.phone) contacts.push(data.personalInfo.phone);
                    if (data.personalInfo.email) contacts.push(data.personalInfo.email);
                    
                    if (contacts.length > 0) {
                        content += `<p class="contact-info">${contacts.join(' | ')}</p>`;
                    }
                    content += '</div>';
                }
                
                // 个人简介
                if (data.personalInfo.summary) {
                    content += `
                        <div class="section">
                            <h2>个人简介</h2>
                            <p>${data.personalInfo.summary}</p>
                        </div>
                    `;
                }
                
                // 教育经历
                if (data.education.length > 0) {
                    content += '<div class="section"><h2>教育经历</h2>';
                    data.education.forEach(edu => {
                        content += '<div class="item">';
                        content += `<h3>${edu.school || ''} - ${edu.degree || ''}</h3>`;
                        if (edu.major) {
                            content += `<p><strong>专业：</strong>${edu.major}</p>`;
                        }
                        if (edu.startDate || edu.endDate) {
                            content += `<p><strong>时间：</strong>${edu.startDate || ''} - ${edu.endDate || ''}</p>`;
                        }
                        if (edu.description) {
                            content += `<p>${edu.description}</p>`;
                        }
                        content += '</div>';
                    });
                    content += '</div>';
                }
                
                // 工作经历
                if (data.work.length > 0) {
                    content += '<div class="section"><h2>工作经历</h2>';
                    data.work.forEach(work => {
                        content += '<div class="item">';
                        content += `<h3>${work.company || ''} - ${work.position || ''}</h3>`;
                        if (work.startDate || work.endDate) {
                            content += `<p><strong>时间：</strong>${work.startDate || ''} - ${work.endDate || ''}</p>`;
                        }
                        if (work.description) {
                            content += `<p>${work.description}</p>`;
                        }
                        content += '</div>';
                    });
                    content += '</div>';
                }
                
                // 技能展示
                if (data.skills.length > 0) {
                    content += '<div class="section"><h2>技能展示</h2>';
                    content += '<div class="skills-list">';
                    data.skills.forEach(skill => {
                        if (skill.name) {
                            content += `<span class="skill-item">${skill.name}${skill.level ? ` - ${skill.level}` : ''}</span>`;
                        }
                    });
                    content += '</div></div>';
                }
                
                // 项目经历
                if (data.projects.length > 0) {
                    content += '<div class="section"><h2>项目经历</h2>';
                    data.projects.forEach(project => {
                        content += '<div class="item">';
                        content += `<h3>${project.name || ''}${project.role ? ` - ${project.role}` : ''}</h3>`;
                        if (project.time) {
                            content += `<p><strong>时间：</strong>${project.time}</p>`;
                        }
                        if (project.description) {
                            content += `<p>${project.description}</p>`;
                        }
                        content += '</div>';
                    });
                    content += '</div>';
                }
                
                content += '</div>';
                return content;
            }
        }
    };
};
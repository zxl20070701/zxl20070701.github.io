
/*************************** [bundle] ****************************/
// Original file:./src/pages/job-resume/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['90']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('330');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('331');


__pkg__scope_bundle__.default= function (obj) {
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

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/job-resume/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['330']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,9]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,7]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[3,5]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[4]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[6]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"h2","attrs":{},"childNodes":[8]},{"type":"text","content":"简历制作","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"resume-container"},"childNodes":[10,58]},{"type":"tag","name":"div","attrs":{"class":"resume-editor"},"childNodes":[11,34,40,46,52]},{"type":"tag","name":"div","attrs":{"class":"editor-section"},"childNodes":[12,14,18,22,26,30]},{"type":"tag","name":"h3","attrs":{},"childNodes":[13]},{"type":"text","content":"个人信息","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"form-group"},"childNodes":[15,17]},{"type":"tag","name":"label","attrs":{},"childNodes":[16]},{"type":"text","content":"姓名","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","id":"name","placeholder":"请输入姓名"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"form-group"},"childNodes":[19,21]},{"type":"tag","name":"label","attrs":{},"childNodes":[20]},{"type":"text","content":"职位","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","id":"position","placeholder":"请输入应聘职位"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"form-group"},"childNodes":[23,25]},{"type":"tag","name":"label","attrs":{},"childNodes":[24]},{"type":"text","content":"电话","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","id":"phone","placeholder":"请输入联系电话"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"form-group"},"childNodes":[27,29]},{"type":"tag","name":"label","attrs":{},"childNodes":[28]},{"type":"text","content":"邮箱","childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"email","id":"email","placeholder":"请输入邮箱地址"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"form-group"},"childNodes":[31,33]},{"type":"tag","name":"label","attrs":{},"childNodes":[32]},{"type":"text","content":"个人简介","childNodes":[]},{"type":"tag","name":"textarea","attrs":{"id":"summary","placeholder":"请输入个人简介"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"editor-section"},"childNodes":[35,39]},{"type":"tag","name":"h3","attrs":{},"childNodes":[36,37]},{"type":"text","content":"教育经历","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"add-btn","id":"add-education"},"childNodes":[38]},{"type":"text","content":"+ 添加","childNodes":[]},{"type":"tag","name":"div","attrs":{"id":"education-list"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"editor-section"},"childNodes":[41,45]},{"type":"tag","name":"h3","attrs":{},"childNodes":[42,43]},{"type":"text","content":"工作经历","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"add-btn","id":"add-work"},"childNodes":[44]},{"type":"text","content":"+ 添加","childNodes":[]},{"type":"tag","name":"div","attrs":{"id":"work-list"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"editor-section"},"childNodes":[47,51]},{"type":"tag","name":"h3","attrs":{},"childNodes":[48,49]},{"type":"text","content":"技能展示","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"add-btn","id":"add-skill"},"childNodes":[50]},{"type":"text","content":"+ 添加","childNodes":[]},{"type":"tag","name":"div","attrs":{"id":"skill-list"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"editor-section"},"childNodes":[53,57]},{"type":"tag","name":"h3","attrs":{},"childNodes":[54,55]},{"type":"text","content":"项目经历","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"add-btn","id":"add-project"},"childNodes":[56]},{"type":"text","content":"+ 添加","childNodes":[]},{"type":"tag","name":"div","attrs":{"id":"project-list"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"resume-preview"},"childNodes":[59,61,94]},{"type":"tag","name":"h3","attrs":{},"childNodes":[60]},{"type":"text","content":"简历预览","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"preview-content","id":"resume-preview"},"childNodes":[62,73,78,82,86,90]},{"type":"tag","name":"div","attrs":{"class":"preview-header"},"childNodes":[63,65,67]},{"type":"tag","name":"h1","attrs":{"id":"preview-name"},"childNodes":[64]},{"type":"text","content":"姓名","childNodes":[]},{"type":"tag","name":"p","attrs":{"id":"preview-position"},"childNodes":[66]},{"type":"text","content":"应聘职位","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"contact-info"},"childNodes":[68,70,71]},{"type":"tag","name":"span","attrs":{"id":"preview-phone"},"childNodes":[69]},{"type":"text","content":"电话","childNodes":[]},{"type":"text","content":"|","childNodes":[]},{"type":"tag","name":"span","attrs":{"id":"preview-email"},"childNodes":[72]},{"type":"text","content":"邮箱","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"preview-section"},"childNodes":[74,76]},{"type":"tag","name":"h3","attrs":{},"childNodes":[75]},{"type":"text","content":"个人简介","childNodes":[]},{"type":"tag","name":"p","attrs":{"id":"preview-summary"},"childNodes":[77]},{"type":"text","content":"个人简介内容...","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"preview-section"},"childNodes":[79,81]},{"type":"tag","name":"h3","attrs":{},"childNodes":[80]},{"type":"text","content":"教育经历","childNodes":[]},{"type":"tag","name":"div","attrs":{"id":"preview-education"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"preview-section"},"childNodes":[83,85]},{"type":"tag","name":"h3","attrs":{},"childNodes":[84]},{"type":"text","content":"工作经历","childNodes":[]},{"type":"tag","name":"div","attrs":{"id":"preview-work"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"preview-section"},"childNodes":[87,89]},{"type":"tag","name":"h3","attrs":{},"childNodes":[88]},{"type":"text","content":"技能展示","childNodes":[]},{"type":"tag","name":"div","attrs":{"id":"preview-skills"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"preview-section"},"childNodes":[91,93]},{"type":"tag","name":"h3","attrs":{},"childNodes":[92]},{"type":"text","content":"项目经历","childNodes":[]},{"type":"tag","name":"div","attrs":{"id":"preview-projects"},"childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"export-btn","id":"export-resume"},"childNodes":[95]},{"type":"text","content":"导出PDF","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/job-resume/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['331']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"job-resume\"]{\n\nwidth: calc(100vw - 100px);\n\nleft: 50px;\n\ntop: 20px;\n\n}\n\n [page-view=\"job-resume\"][focus=\"no\"]>header{\n\nbackground-color: #fafafa;\n\n}\n\n [page-view=\"job-resume\"]>header{\n\ntext-align: left;\n\nline-height: 50px;\n\nbackground-color: #ffffff;\n\nbox-shadow: -3px 3px 20px #d2d2db;\n\n}\n\n [page-view=\"job-resume\"]>header>h2{\n\ncolor: #000000;\n\nfont-size: 20px;\n\npadding-left: 50px;\n\nbackground-image: url(\"./job-resume.png\");\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\nfont-family: cursive;\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"job-resume\"] .resume-container{\n\ndisplay: flex;\n\nheight: calc(100vh - 120px);\n\noverflow: hidden;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor{\n\nwidth: 40%;\n\npadding: 20px;\n\noverflow-y: auto;\n\nbackground-color: #f8f9fa;\n\nborder-right: 1px solid #e9ecef;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section{\n\nbackground: white;\n\nborder-radius: 8px;\n\npadding: 20px;\n\nmargin-bottom: 20px;\n\nbox-shadow: 0 2px 8px rgba(0,0,0,0.1);\n\ntransition: all 0.3s ease;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section:hover{\n\nbox-shadow: 0 4px 12px rgba(0,0,0,0.15);\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section h3{\n\nmargin-top: 0;\n\nmargin-bottom: 15px;\n\ncolor: #333;\n\nborder-bottom: 1px solid #eee;\n\npadding-bottom: 10px;\n\ndisplay: flex;\n\njustify-content: space-between;\n\nalign-items: center;\n\nfont-size: 18px;\n\nfont-weight: 600;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .form-group{\n\nmargin-bottom: 15px;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .form-group label{\n\ndisplay: block;\n\nmargin-bottom: 5px;\n\nfont-weight: 600;\n\ncolor: #555;\n\nfont-size: 14px;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .form-group input, [page-view=\"job-resume\"] .resume-editor .editor-section .form-group textarea{\n\nwidth: 100%;\n\npadding: 10px 12px;\n\nborder: 1px solid #ddd;\n\nborder-radius: 6px;\n\nfont-size: 14px;\n\ntransition: all 0.2s ease;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .form-group input:focus, [page-view=\"job-resume\"] .resume-editor .editor-section .form-group textarea:focus{\n\noutline: none;\n\nborder-color: #007bff;\n\nbox-shadow: 0 0 0 3px rgba(0,123,255,0.25);\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .form-group input::placeholder, [page-view=\"job-resume\"] .resume-editor .editor-section .form-group textarea::placeholder{\n\ncolor: #aaa;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .form-group textarea{\n\nmin-height: 80px;\n\nresize: vertical;\n\nline-height: 1.5;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .item-card{\n\nbackground: #f8f9fa;\n\nborder: 1px solid #e9ecef;\n\nborder-radius: 6px;\n\npadding: 15px;\n\nmargin-bottom: 15px;\n\nposition: relative;\n\ntransition: all 0.2s ease;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .item-card:hover{\n\nbox-shadow: 0 2px 6px rgba(0,0,0,0.1);\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .item-card .form-group{\n\nmargin-bottom: 10px;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .item-card .remove-btn{\n\nposition: absolute;\n\ntop: 10px;\n\nright: 10px;\n\nbackground: #dc3545;\n\ncolor: white;\n\nborder: none;\n\nborder-radius: 50%;\n\nwidth: 24px;\n\nheight: 24px;\n\nfont-size: 12px;\n\ncursor: pointer;\n\ndisplay: flex;\n\nalign-items: center;\n\njustify-content: center;\n\ntransition: all 0.2s ease;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .editor-section .item-card .remove-btn:hover{\n\nbackground: #c82333;\n\ntransform: scale(1.1);\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .add-btn{\n\nbackground: linear-gradient(135deg, #007bff, #0056b3);\n\ncolor: white;\n\nborder: none;\n\nborder-radius: 6px;\n\npadding: 6px 12px;\n\nfont-size: 13px;\n\ncursor: pointer;\n\ntransition: all 0.2s ease;\n\nfont-weight: 500;\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .add-btn:hover{\n\nbackground: linear-gradient(135deg, #0056b3, #004085);\n\ntransform: translateY(-1px);\n\nbox-shadow: 0 2px 4px rgba(0,0,0,0.2);\n\n}\n\n [page-view=\"job-resume\"] .resume-editor .add-btn:active{\n\ntransform: translateY(0);\n\n}\n\n [page-view=\"job-resume\"] .resume-preview{\n\nwidth: 60%;\n\npadding: 20px;\n\noverflow-y: auto;\n\nbackground-color: white;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview h3{\n\nmargin-top: 0;\n\nmargin-bottom: 20px;\n\ncolor: #333;\n\nborder-bottom: 1px solid #eee;\n\npadding-bottom: 10px;\n\nfont-size: 20px;\n\nfont-weight: 600;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .preview-content{\n\nbackground: white;\n\nborder: 1px solid #ddd;\n\nborder-radius: 8px;\n\npadding: 40px;\n\nbox-shadow: 0 4px 12px rgba(0,0,0,0.1);\n\nmin-height: 500px;\n\nposition: relative;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .preview-content::before{\n\ncontent: '';\n\nposition: absolute;\n\ntop: 0;\n\nleft: 0;\n\nright: 0;\n\nheight: 4px;\n\nbackground: linear-gradient(90deg, #007bff, #00c6ff);\n\nborder-radius: 8px 8px 0 0;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .preview-header{\n\ntext-align: center;\n\nmargin-bottom: 30px;\n\npadding-bottom: 20px;\n\nborder-bottom: 2px solid #007bff;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .preview-header h1{\n\nmargin: 0 0 10px 0;\n\ncolor: #333;\n\nfont-size: 32px;\n\nfont-weight: 700;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .preview-header .contact-info{\n\ncolor: #666;\n\nfont-size: 16px;\n\nmargin-top: 10px;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .preview-section{\n\nmargin-bottom: 30px;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .preview-section h3{\n\ncolor: #007bff;\n\nborder-bottom: 1px solid #eee;\n\npadding-bottom: 8px;\n\nmargin-bottom: 15px;\n\nfont-size: 20px;\n\nfont-weight: 600;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .preview-section p, [page-view=\"job-resume\"] .resume-preview .preview-section li{\n\nline-height: 1.7;\n\ncolor: #333;\n\nmargin-bottom: 8px;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .preview-section ul{\n\npadding-left: 20px;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .preview-section .education-item, [page-view=\"job-resume\"] .resume-preview .preview-section .work-item, [page-view=\"job-resume\"] .resume-preview .preview-section .project-item{\n\nmargin-bottom: 20px;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .preview-section .education-item h4, [page-view=\"job-resume\"] .resume-preview .preview-section .work-item h4, [page-view=\"job-resume\"] .resume-preview .preview-section .project-item h4{\n\ncolor: #333;\n\nfont-size: 18px;\n\nmargin: 0 0 8px 0;\n\nfont-weight: 600;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .preview-section .education-item p, [page-view=\"job-resume\"] .resume-preview .preview-section .work-item p, [page-view=\"job-resume\"] .resume-preview .preview-section .project-item p{\n\nmargin: 5px 0;\n\ncolor: #555;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .preview-section .education-item strong, [page-view=\"job-resume\"] .resume-preview .preview-section .work-item strong, [page-view=\"job-resume\"] .resume-preview .preview-section .project-item strong{\n\ncolor: #444;\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .export-btn{\n\nbackground: linear-gradient(135deg, #28a745, #1e7e34);\n\ncolor: white;\n\nborder: none;\n\nborder-radius: 6px;\n\npadding: 12px 24px;\n\nfont-size: 16px;\n\ncursor: pointer;\n\nmargin-top: 20px;\n\ntransition: all 0.2s ease;\n\nfont-weight: 500;\n\nbox-shadow: 0 2px 4px rgba(0,0,0,0.1);\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .export-btn:hover{\n\nbackground: linear-gradient(135deg, #1e7e34, #155724);\n\ntransform: translateY(-2px);\n\nbox-shadow: 0 4px 8px rgba(0,0,0,0.2);\n\n}\n\n [page-view=\"job-resume\"] .resume-preview .export-btn:active{\n\ntransform: translateY(0);\n\n}\n\n/* // 响应式设计\r */\n\n [page-view=\"job-resume\"] @media (max-width: 768px) .resume-container{\n\nflex-direction: column;\n\nheight: auto;\n\n}\n\n [page-view=\"job-resume\"] @media (max-width: 768px) .resume-editor, [page-view=\"job-resume\"] @media (max-width: 768px) .resume-preview{\n\nwidth: 100%;\n\nheight: auto;\n\n}\n\n [page-view=\"job-resume\"] @media (max-width: 768px) .resume-editor{\n\nborder-right: none;\n\nborder-bottom: 1px solid #e9ecef;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

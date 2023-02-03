const projectInfo = require('../package.json');

module.exports = `<script>
    /* 
     * 统一全局信息注入
     */
    window._project_ = {

        // 应用名称
        name:"${projectInfo.name}",

        // 版本号
        version:"${projectInfo.version}",

        // 代码仓库地址
        repository:"${projectInfo.repository}",

        // 提bug地址
        bugs:"${projectInfo.bugs.url}",

        // 作者信息
        author:${JSON.stringify(projectInfo.author)}
    };
</script>`;
const projectInfo = require('../package.json');

module.exports = config => {
    return `<script>

    window.process = {
        "env" : {
            "NODE_ENV" : "${config.mode}"
        }
    };

    /* 
     * 统一全局信息注入
     */
    window._project_ = {

        // 应用名称
        "name":"${projectInfo.name}",

        // 代码仓库地址
        "repository":"${projectInfo.repository}",

        // 提bug地址
        "bugs":"${projectInfo.bugs.url}",

        // 作者信息
        "author":${JSON.stringify(projectInfo.author)}
    };
</script>`;
};
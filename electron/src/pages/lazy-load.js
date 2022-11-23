export default {

    // 首页
    home: () => import('./home/index.js'),

    // 聊天工具
    talker: () => import('./talker/index.js'),

    // 浏览器
    browser: () => import('./browser/index.js'),

    // 命令行
    terminal: () => import('./terminal/index.js'),
};
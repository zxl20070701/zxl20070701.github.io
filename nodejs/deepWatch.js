const { watch } = require("fs");

let willNotifyPaths = {};
module.exports = function (targetPath, doback) {
    watch(targetPath, {
        recursive: true
    }, function (eventType, filepath) {

        // 如果在很短时间内同一个任务需要执行，只执行一次即可
        if (!willNotifyPaths[targetPath]) {

            // 记录有未完成任务
            willNotifyPaths[targetPath] = true;
            setTimeout(function () {

                // 执行回调
                doback(eventType, filepath);

                // 标记任务完成
                delete willNotifyPaths[targetPath];
            }, 1000);
        }
    });
};
/**
 * 
 * 命令行参数解析
 * 
 * @param {JSON} config 命令参数缩小到全写的映射
 * @param {Array} argv 需要判断类型的值
 * 
 * @returns {JSON} 返回整理后的参数
 * 
 */
module.exports = function (config, argv) {

  let resultConfig = {
    __terminal__: []
  }, flag = null;
  for (let i = 2; i < argv.length; i++) {

    // 如果是新的配置
    if (/^--[0-9a-zA-Z]+$/.test(argv[i]) || /^-[0-9a-zA-Z]$/.test(argv[i])) {
      let key = argv[i];

      // 如果是缩写，需要映射
      if (key.length == 2) {
        key = config[key];

        // 如果是错误缩写
        if (!key) {
          flag = null;
          continue;
        }
      }

      flag = key.replace(/^--/, "");
      resultConfig[flag] = [];
    }

    // 如果是普通的参数
    else if (flag != null) {
      resultConfig[flag].push(argv[i]);
    }

    else {
      resultConfig.__terminal__.push(argv[i]);
    }

  }

  return resultConfig;
};
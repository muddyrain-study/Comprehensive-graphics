// 该文件是包的入口文件，所以需要导出一个对象

module.exports = {
  rules: {
    'no-console-log': require('./rules/no-console-log'),
    'no-alert': require('./rules/no-alert'),
  },
};

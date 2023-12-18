/**
 * a => {...}
 * function (a){...}
 * 箭头函数转换为普通函数
 */

module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: 'ast-transform-arrow-to-function', // 插件名称
    visitor: {
      // 当节点为箭头函数的时候
      ArrowFunctionExpression(path) {
        // 存储函数体
        let body;
        // 获取节点
        const { node } = path;
        // 如果箭头函数的函数体不是块级语句
        if (node.body.type !== 'BlockStatement') {
          body = t.blockStatement([t.returnStatement(node.body)]);
        } else {
          // 直接使用箭头函数的函数体
          body = node.body;
        }
        // 生成函数
        const func = t.functionExpression(
          null, // 函数名
          node.params, // 函数参数
          body, // 函数体
          false, // 是否是生成器函数
          node.async // 是否是异步函数
        );
        // 替换箭头函数
        path.replaceWith(func);
      },
    },
  };
};

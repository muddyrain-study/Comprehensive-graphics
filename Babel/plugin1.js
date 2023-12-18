/**
 * 2 ** 3 --> Math.pow(2, 3)
 */

module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: 'ast-transform-pow', // 插件名称
    visitor: {
      // 遍历到二元表达式的时候
      BinaryExpression(path) {
        // 获取二元表达式的节点
        const { node } = path;
        if (node.operator !== '**') return;
        // 生成Math.pow
        const pow = t.memberExpression(
          t.identifier('Math'),
          t.identifier('pow')
        );
        const callPow = t.callExpression(pow, [node.left, node.right]);
        // 替换二元表达式
        path.replaceWith(callPow);
      },
    },
  };
};

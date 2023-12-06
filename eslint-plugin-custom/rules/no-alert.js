/**
 * 不允许使用alert
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow the use of alert',
      category: 'Best Practices',
    },
    fixable: null,
  },
  create(context) {
    return {
      // 这个方法会在遍历到一个函数调用时调用
      CallExpression(node) {
        if (node.callee.name === 'alert') {
          // 说明调用了alert
          context.report({
            node,
            message: 'Using alert is not allowed',
          });
        }
      },
    };
  },
};

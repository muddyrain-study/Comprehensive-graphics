/**
 * Rule to flag use of console-log object
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow the use of console.log',
      category: 'Best Practices',
    },
    fixable: null,
  },
  create(context) {
    return {
      // 这个方法会在遍历到一个函数调用时调用
      CallExpression(node) {
        if (
          node.callee.object &&
          node.callee.object.name === 'console' &&
          node.callee.property.name === 'log'
        ) {
          // 说明调用了alert
          context.report({
            node,
            message: 'Using console.log is not allowed',
          });
        }
      },
    };
  },
};

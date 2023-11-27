const Color = require('color');

module.exports = (opts = {}) => {
  // Plugin creator to check options or prepare caches
  return {
    postcssPlugin: 'PLUGIN NAME',
    // Plugin listeners
    Declaration(decl) {
      const colorRegex = /(^color)|(^background(-color)?)/;
      if (colorRegex.test(decl.prop)) {
        try {
          // 将颜色值转为 Color 对象，因为这个 Color 对象对应了一系列的方法
          // 方便我们进行转换
          const color = Color(decl.value);
          // 将颜色值转换为十六进制
          const hex = color.hex();
          // 更新属性值
          decl.value = hex;
        } catch (err) {
          console.error(
            `[convertColorsToHex] Error processing ${decl.prop}: ${error.message}`
          );
        }
      }
    },
  };
};
module.exports.postcss = true;

var swc = require("@swc/core");
var _require = require("fs"), readFileSync = _require.readFileSync, writeFileSync = _require.writeFileSync, existsSync = _require.existsSync, mkdirSync = _require.mkdirSync;
var input = readFileSync("./src/index.js", "utf8");
var output = swc.transformSync(input, {
    jsc: {
        target: "es5",
        parser: {
            syntax: "ecmascript"
        }
    }
});
console.log(output.code);
// 如果没有 dist 目录，自动创建
if (!existsSync("./dist")) {
    mkdirSync("./dist");
}
writeFileSync("./dist/index.js", output.code);

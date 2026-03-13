const fs = require('fs');
const { VM, VMScript } = require('vm2');
const fakeName = require('./tools/fakeName.js');
const targetName = "ouyeel"

// 1. 获取核心框架代码
function getFrameworkCode() {
    const configCode = require('./tools/tools.node.js').getCode();
    const browserCode = require('./browser/rayEnv.node.js').getCode();
    return configCode + "\n" + browserCode;
}

// 2. 导出给 server.js 使用的构建函数
function getBundledCode(meta_content, ts_js, auto_script_js) {
    const frameworkCode = getFrameworkCode();
    
    // 加载目标配置并替换 meta_content
    const configPath = `${__dirname}/target/${targetName}.config.js`;
    let targetConfigCode = fs.readFileSync(configPath, 'utf-8');
    // 使用更健壮的替换方式，兼容多种引号和空格
    targetConfigCode = targetConfigCode.replace(/(var|let|const)\s+meta_content\s*=\s*["'].*?["'];?/, `$1 meta_content = "${meta_content}";`);

    // 加载 hook 模板
    const hookPath = `${__dirname}/target/${targetName}.hook.js`;
    let hookCode = fs.readFileSync(hookPath, 'utf-8');
    
    // 替换三件套：使用 split().join() 替换以避免 replace 中的 $ 特殊字符处理问题
    hookCode = hookCode.split("'ts_js'").join(ts_js);
    hookCode = hookCode.split("'auto_script_js'").join(auto_script_js);

    let fullCode = frameworkCode + "\n" + targetConfigCode + "\n" + hookCode;

    // 随机化环境名
    const randomName = fakeName.generateRandomWords(1) + "Env";
    fullCode = fullCode.split('rayEnv').join(randomName);
    
    // 确保最后执行 get_cookies 并返回结果
    fullCode += "\nget_cookies();";
    
    return fullCode;
}

// 3. 调试模式：判断是否为主程序
if (require.main === module) {
    console.log("Running in DEBUG mode...");
    const frameworkCode = getFrameworkCode();
    
    // 加载目标配置
    const configPath = `${__dirname}/target/${targetName}.config.js`;
    const targetConfigCode = fs.readFileSync(configPath, 'utf-8');

    // 加载目标代码 (ouyeel.js)
    const targetCode = fs.readFileSync(`${__dirname}/target/${targetName}.js`, 'utf-8');

    let fullCode = frameworkCode + "\n" + targetConfigCode + "\n" + targetCode;

    // 随机化环境名
    const randomName = fakeName.generateRandomWords(1) + "Env";
    fullCode = fullCode.replace(/rayEnv/g, randomName);

    const vm = new VM();
    const script = new VMScript(fullCode, "debug.js");
    try {
        vm.run(script);
        console.log("Debug execution finished.");
    } catch (err) {
        console.error('Environment Error:', err.stack);
    }
}

module.exports = {
    getBundledCode
};
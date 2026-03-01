// tools/inject.js
// 配置注入模块：将目标网站配置注入到对应全局对象

rayEnv.inject = function (config) {
    if (!config) return;

    for (var objName in config) {
        var target;

        // 尝试获取全局对象，不存在则自动创建
        try {
            target = eval(objName);
        } catch (e) {
            // 全局对象不存在，创建一个空对象并挂到全局
            target = {};
            eval(objName + " = target");
            rayEnv.print(`[inject] 🆕 创建全局对象: ${objName}`);
        }

        var props = config[objName];
        for (var prop in props) {
            var val = props[prop];

            // 特殊标记: "self" 表示指向自身 (用于 window.top = window)
            if (val === "self") {
                target[prop] = target;
                rayEnv.print(`[inject] ${objName}.${prop} = [self]`);
            } else {
                target[prop] = val;
                rayEnv.print(`[inject] ${objName}.${prop} = ${val}`);
            }
        }
    }

    rayEnv.print(`[inject] ✅ 配置注入完成`);
};

// tools/proxy.js
// Proxy 代理监控模块

rayEnv.proxy = function (obj) {
    if (!rayEnv.button.proxy) return obj;

    return new Proxy(obj, {
        get(target, property, receiver) {
            if (typeof property === "symbol") return target[property];

            const value = target[property];

            if (rayEnv.button.print) {
                const targetName = Object.prototype.toString.call(target);
                rayEnv.print(`[get] <= target: ${targetName}, prop: ${property.toString()}, value: ${value}`);
            }

            // 自动检测漏补环境
            if (value === undefined && !(property in target)) {
                const targetName = Object.prototype.toString.call(target);
                console.warn(`[!] ⚠️  检测到漏补环境: ${targetName} 访问了未定义的属性 👉 "${property.toString()}"`);
            }

            return value;
        },
        set(target, property, value, receiver) {
            if (rayEnv.button.print) {
                const targetName = Object.prototype.toString.call(target);
                rayEnv.print(`[set] => target: ${targetName}, prop: ${property.toString()}, value: ${value}`);
            }
            return Reflect.set(target, property, value);
        }
    });
};

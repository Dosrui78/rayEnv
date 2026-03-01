// tools/config.js
// 框架全局配置与内存管理

// 初始化全局对象 rayEnv
var rayEnv = {};

// 框架开关控制
rayEnv.button = {
    proxy: true,   // 是否开启 Proxy 代理监控
    print: true,   // 是否开启日志打印
};

// 框架内部内存，用于存储环境状态
rayEnv.memory = {
    logs: [],      // 日志记录
    listeners: {}, // 事件监听器缓存
    htmlelements: {}, // DOM 元素工厂映射
    async_tasks: [], // 异步任务队列
    config: {},     // 运行时注入的配置
    targetConfig: {}, // 目标网站专有配置
    navigator: {
        temp: {},
    }, // Navigator 身份模拟
    Plugin: {}, // Plugin 模拟
    PluginArray: {}, // PluginArray 模拟
};

// tools/print.js
// 日志打印工具
rayEnv.print = function (msg) {
    if (rayEnv.button.print) {
        console.log(msg);
        rayEnv.memory.logs.push(msg);
    }
};

rayEnv.printAll = function () {
    console.table(rayEnv.memory.logs);
};

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

// tools/safety.js
// 抗检测与属性保护模块

(function () {
    'use strict';

    const symbol = Symbol("rayEnv_native_code");
    const oldToString = Function.prototype.toString;

    // 伪造 toString
    const newToString = function toString() {
        return (typeof this === 'function' && this[symbol]) || oldToString.call(this);
    };

    // 保护属性不被轻易枚举或修改
    Object.defineProperty(Function.prototype, 'toString', {
        value: newToString,
        enumerable: false,
        configurable: true,
        writable: true
    });

    // 保护函数：使其 toString 返回 [native code]
    rayEnv.protect = function (func) {
        Object.defineProperty(func, symbol, {
            value: `function ${func.name || ""}() { [native code] }`,
            enumerable: false,
            configurable: true
        });
    };

})();

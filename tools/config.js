// tools/config.js
// 框架全局配置与内存管理

// 初始化全局对象 rayEnv
var rayEnv = {};

// 网站控制
rayEnv.target = [
    "ouyeel"
];

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

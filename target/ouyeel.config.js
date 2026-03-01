// target/ouyeel.config.js
// 欧冶云商 目标网站专有配置

var rayEnv_target_config = {
    window: {
        top: "self",
        self: "self",
        parent: "self",
        $_ts: {},
    }
};

// 注入配置
rayEnv.inject(rayEnv_target_config);
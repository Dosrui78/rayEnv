// target/ouyeel.config.js
// 欧冶云商 目标网站专有配置

var rayEnv_target_config = {
    window: {
        top: "self",
        self: "self",
        parent: "self",
        $_ts: {},
        execScript: undefined,
        setTimeout: function() {},
        setInterval: function() {},
        clearInterval: function() {},
    },
    location: {
        href: "https://www.ouyeel.com/steel/search?pageIndex=1&pageSize=50",
        protocol: "https:",
        host: "www.ouyeel.com",
        hostname: "www.ouyeel.com",
        port: "",
        pathname: "/steel/search",
        search: "?pageIndex=1&pageSize=50",
        hash: "",
        origin: "https://www.ouyeel.com",
    },
};

// 注入配置
rayEnv.inject(rayEnv_target_config);
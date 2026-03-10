// target/ouyeel.config.js
// 欧冶云商 目标网站专有配置
var meta_content = "CsZ1Wi7z1dSOCPCYEJJUBtB0g0IURYzge8E.XI0XvjDVfJHRZOutMG";

var rayEnv_target_config = {
    window: {
        top: "self",
        self: "self",
    }
};

// 注入配置
rayEnv.inject(rayEnv_target_config);

// 保护
rayEnv.protect(window["eval"]);

for (let key in rayEnv_target_config) {
    for (let prop in rayEnv_target_config[key]) {
        if (typeof rayEnv_target_config[key][prop] === "function") {
            rayEnv.protect(rayEnv_target_config[key][prop]);
        }
    }
}
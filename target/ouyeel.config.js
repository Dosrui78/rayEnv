// target/ouyeel.config.js
// 欧冶云商 目标网站专有配置
var div = {};
var meta_content = "CsZ1Wi7z1dSOCPCYEJJUBtB0g0IURYzge8E.XI0XvjDVfJHRZOutMG"
var rayEnv_target_config = {
    window: {
        top: "self",
        self: "self",
        parent: "self",
        $_ts: {},
        execScript: undefined,
        ActiveXObject: undefined,
        // CollectGarbage: undefined,
        setTimeout: function () { },
        setInterval: function () { },
        clearInterval: function () { },
        DOMParser: function DOMParser() { }
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
    document: {
        createElement: function createElement(ele) {
            rayEnv.print("document createElement", ele);
            if (ele == "div") {
                return div;
            }
            else {
                return {};
            }
        },
        appendChild: function appendChild() {

        },
        removeChild: function removeChild() {

        },
        getElementsByTagName: function getElementsByTagName() {
            
        }
    }
};

// 注入配置
rayEnv.inject(rayEnv_target_config);
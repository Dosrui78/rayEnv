// target/ouyeel.config.js
// 欧冶云商 目标网站专有配置
var meta_content = "vvQtGb_CF.G94LcJREa6Pn0M2yn6Fi5Yu4vILzM0sSs1NSALrsQ2J7qjCJKYj5CcXvzpH0n0Q9TuRztaDZEmU7nqXN2IC0Saox7dckjxnAZ"
var _div = rayEnv.proxy({
    getElementsByTagName: function getElementsByTagName(tag) {
        rayEnv.print(`_div getElementsByTagName ${tag}`);
        if (tag === "i") {
            return [];
        }
    }
});
var _meta = rayEnv.proxy({
    getAttribute: function getAttribute(name) {
        rayEnv.print(`_meta getAttribute ${name}`);
        if (name === "r"){
            return "m";
        }
    },
    content: meta_content,
}); rayEnv.protect(_meta["getAttribute"]);
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
        DOMParser: function DOMParser() { },
        name: "$_YWTU=AhcSJm6JKIkrpC5tSlIWCJBr7fxz_RBO0kgfFXAJl3a&$_YVTX=iA&vdFm=",
        globalStorage: undefined,
        msCrypto: undefined,
        CollectGarbage: undefined,
        indexedDB: rayEnv.proxy({}),
        addEventListener: function addEventListener() { },
        attachEvent: function attachEvent() { },
        XMLHttpRequest: function XMLHttpRequest() { },
        Request: function Request() { },
        Response: function Response() { },
        fetch: function Response() { },  
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
        visibilityState: "visible",
        createElement: function createElement(ele) {
            rayEnv.print(`document createElement ${ele}`);
            if (ele === "div") {
                return _div;
            }
            else {
                return {};
            }
        },
        appendChild: function appendChild() {

        },
        removeChild: function removeChild() {

        },
        getElementsByTagName: function getElementsByTagName(tag) {
            rayEnv.print(`document getElementsByTagName ${tag}`);
            if (tag === "meta"){
                return [_meta];
            }
            else {
                return [];
            }
        }
    },
    localStorage: {
        "_$rc": "zS6OepagErwsQALqbzc5lmOHZUQBMaeDm826J6mx.6luXYCznW6T3fkKTta",
        "__ETAG__CNA__ID__": "undefined_4c812632d43f4eb8ad143e5275b6a57a",
        "ADD_CART": "1",
        "__#classType": "localStorage",
        "SHOW_DRAGGER_TOOLTIP": "true",
        "imprint": "eyJpbnN0YWxsX2NhbXBhaWduIjoidW5rbm93biIsImluc3RhbGxfY2hhbm5lbCI6InVua25vd24iLCJpbnN0YWxsX3JlZmVyZXJfZG9tYWluIjoiY24uYmluZy5jb20iLCJpbnN0YWxsX2RhdGV0aW1lIjoiMjAyNi0wMi0yMyAxMzozODozOSJ9",
        "FLOAT_BUTTON_MENUS_POSITION_NEW": "{\"left\":0,\"top\":0,\"cached\":true}",
        "$_YWTU": "AhcSJm6JKIkrpC5tSlIWCJBr7fxz_RBO0kgfFXAJl3a",
        "SHOW_FLOAT_MENUS": "true",
        "package": "{}",
        "$_YVTX": "iA"
    }
};

// 注入配置
rayEnv.inject(rayEnv_target_config);
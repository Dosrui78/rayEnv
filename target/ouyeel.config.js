// target/ouyeel.config.js
// 欧冶云商 目标网站专有配置
var meta_content = "CsZ1Wi7z1dSOCPCYEJJUBtB0g0IURYzge8E.XI0XvjDVfJHRZOutMG";
var _open = function open() { }; rayEnv.protect(_open);
var _head = {
    removeChild: function removeChild(){ }
}; rayEnv.protect(_head["removeChild"]);
var _div = rayEnv.proxy({
    getElementsByTagName: function getElementsByTagName(tag) {
        rayEnv.print(`_div getElementsByTagName ${tag}`);
        if (tag === "i") {
            return [];
        }
    },
    addBehavior: function addBehavior() { },
    getAttribute: function getAttribute(name) {
        if (name === "$_YWTU") {
            return "AhcSJm6JKIkrpC5tSlIWCJBr7fxz_RBO0kgfFXAJl3a";
        }
    },
    setAttribute: function setAttribute() { },
    open: _open,
    save: function save() { },
    load: function load() { },
    style: rayEnv.proxy({}),
});
rayEnv.protect(_div["getElementsByTagName"]); 
rayEnv.protect(_div["setAttribute"]);
rayEnv.protect(_div["addBehavior"]);
rayEnv.protect(_div["save"]);
rayEnv.protect(_div["load"]);
rayEnv.protect(_div["getAttribute"]);
var script= {
    getAttribute: function (ele) {
        rayEnv.print(`script getAttribute ${ele}`);
        if (ele === 'r') {
            return 'm'
        }
    },
    parentElement: _head
}; rayEnv.protect(script["getAttribute"]);
var _meta = rayEnv.proxy({
    getAttribute: function getAttribute(name) {
        rayEnv.print(`_meta getAttribute ${name}`);
        if (name === "r"){
            return "m";
        }
    },
    content: meta_content,
    parentNode: _head,
    open: _open,
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
        setTimeout: function setTimeout() { },
        setInterval: function setInterval() { },
        clearInterval: function clearInterval() { },
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
        HTMLFormElement: function HTMLFormElement() { },
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
                return [_meta, _meta];
            }
            else if (tag === "script"){
                return [script]
            }
            else {
                return [];
            }
        },
        addEventListener: function addEventListener() { },
        getElementById: function getElementById(id) {
            rayEnv.print(`document getElementById ${id}`);
        },
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
    },
    navigator: {
        battery: undefined,
        platform: "Win32",
        connection: rayEnv.proxy({
            downlink: 10,
            effectiveType: "4g",
        }),
        getBattery: function getBattery() { },
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0",
    },
};

// 注入配置
rayEnv.inject(rayEnv_target_config);

// 保护
for (let key in rayEnv_target_config) {
    for (let prop in rayEnv_target_config[key]) {
        if (typeof rayEnv_target_config[key][prop] === "function") {
            rayEnv.protect(rayEnv_target_config[key][prop]);
        }
    }
}
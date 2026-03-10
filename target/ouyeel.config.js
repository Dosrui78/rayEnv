// target/ouyeel.config.js
// 欧冶云商 目标网站专有配置

var meta_content = "vvQtGb_CF.G94LcJREa6Pn0M2yn6Fi5Yu4vILzM0sSs1NSALrsQ2J7qjCJKYj5CcXvzpH0n0Q9TuRztaDZEmU7nqXN2IC0Saox7dckjxnAZ";
var _i = rayEnv.proxy([]);
var _div_getElementsByTagName = function getElementsByTagName(tagName) {
    rayEnv.print(`[getElementsByTagName] => ${this}, tagName:${tagName}`);
    if (tagName === "i") {
        return _i;
    }
    return [];
}; rayEnv.protect(_div_getElementsByTagName);

var _divRaw = rayEnv.proxy({
    [Symbol.toStringTag]: "div",
    getElementsByTagName: _div_getElementsByTagName
});
var _head_removeChild = function removeChild(child) {
    rayEnv.print(`[head.removeChild] => ${child}`);
}; rayEnv.protect(_head_removeChild);

var _head_appendChild = function appendChild(child) {
    rayEnv.print(`[head.appendChild] => ${child}`);
}; rayEnv.protect(_head_appendChild);

var _headRaw = rayEnv.proxy({
    [Symbol.toStringTag]: "head",
    removeChild: _head_removeChild,
    appendChild: _head_appendChild,
});
var _script_getElementsByTagName = function getElementsByTagName(tagName) {
    rayEnv.print(`[getElementsByTagName] => ${this}, tagName:${tagName}`);
    if (tagName === "i") {
        return _i;
    }
    return [];
}; rayEnv.protect(_script_getElementsByTagName);

var _script_getAttribute = function getAttribute (name) {
    rayEnv.print(`[getAttribute] => ${this}, name: ${name}`);
    if (name === "r") {
        return "m";
    }
    return null;
}; rayEnv.protect(_script_getAttribute);

var _scriptRaw = rayEnv.proxy({
    [Symbol.toStringTag]: "script",
    getElementsByTagName: _script_getElementsByTagName,
    getAttribute: _script_getAttribute,
    parentElement: _headRaw
});

var _meta_getAttribute = function getAttribute (name) {
    rayEnv.print(`[getAttribute] => ${this}, name: ${name}`);
    if (name === "r") {
        return "m";
    }
    return null;
}; rayEnv.protect(_meta_getAttribute);

var _metaRaw = rayEnv.proxy({
    [Symbol.toStringTag]: "meta",
    getAttribute: _meta_getAttribute,
    content: meta_content,
    parentNode: _headRaw
}); 
// 已在上面手动保护，以下重复保护可保留或移除。
rayEnv.protect(_divRaw.getElementsByTagName);
rayEnv.protect(_metaRaw.getAttribute);
rayEnv.protect(_scriptRaw.getAttribute);
rayEnv.protect(_headRaw.removeChild);
rayEnv.protect(_headRaw.appendChild);

var rayEnv_target_config = {
    window: {
        top: "self",
        self: "self",
        ActiveXObject: undefined,
        setInterval: function () { },
        setTimeout: function () { },
        clearInterval: function () { },
        addEventListener: function (event, handler) {
            rayEnv.print(`[addEventListener] => ${this}, event: ${event}, handler: ${handler}`);
        },
        XMLHttpRequest: function () { },
    },
    document: {
        appendChild: function (tagName) {
            rayEnv.print(`[appendChild] => ${this}, tagName: ${tagName}`);
        },
        removeChild: function (child) {
            rayEnv.print(`[removeChild] => ${this}, tagName: ${child}`);
        },
        createElement: function (tagName) {
            rayEnv.print(`[createElement] => ${this}, tagName: ${tagName}`);
            if (tagName === "div") {
                return _divRaw;
            }
        },
        getElementsByTagName: function getElementsByTagName(tagName) {
            rayEnv.print(`[getElementsByTagName] => ${this}, tagName: ${tagName}`);
            if (tagName === "script") {
                return [_scriptRaw, _scriptRaw];
            }
            else if (tagName === "meta") {
                return [_metaRaw, _metaRaw];
            }
            else {
                return [];
            }
        },
        getElementById: function getElementById(id) {
            rayEnv.print(`[getElementById] => ${this}, id: ${id}`);
        },
        addEventListener: function (event, handler) {
            rayEnv.print(`[addEventListener] => ${this}, event: ${event}, handler: ${handler}`);
        },
        visibilityState: "visible"
    },
    location: {
        "ancestorOrigins": {},
        "href": "https://www.ouyeel.com/steel/search?pageIndex=0&pageSize=50",
        "origin": "https://www.ouyeel.com",
        "protocol": "https:",
        "host": "www.ouyeel.com",
        "hostname": "www.ouyeel.com",
        "port": "",
        "pathname": "/steel/search",
        "search": "?pageIndex=0&pageSize=50",
        "hash": ""
    },
    navigator: {
        languages: ['zh-CN'],
        platform: 'Win32',
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0"
    }
};


// 注入配置
rayEnv.inject(rayEnv_target_config);
window.XMLHttpRequest.prototype.open = function () { }
window.XMLHttpRequest.prototype.send = function () { }
window.XMLHttpRequest.prototype.setRequestHeader = function () { }
// 保护
rayEnv.protect(window["eval"]);

for (let key in rayEnv_target_config) {
    for (let prop in rayEnv_target_config[key]) {
        if (typeof rayEnv_target_config[key][prop] === "function") {
            rayEnv.protect(rayEnv_target_config[key][prop]);
        }
    }
}
// 1.定义Storage对象
var Storage = function Storage() {
}; rayEnv.protect(Storage);
var localStorage = {}; rayEnv.protect(localStorage);
var sessionStorage = {}; rayEnv.protect(sessionStorage);

// 2.定义Storage的Symbol.ToStringTag
Object.defineProperties(Storage.prototype, {
    [Symbol.toStringTag]: {
        value: "Storage",
        configurable: true,
    }
})

// 3.定义Storage的属性
//////////////////////////////////////////////
Storage.prototype.getItem = function getItem(key) {
    return this[key];
}; rayEnv.protect(Storage.prototype.getItem);
Storage.prototype.setItem = function setItem(key, value) {
    this[key] = value;
}; rayEnv.protect(Storage.prototype.setItem);
Storage.prototype.removeItem = function removeItem(key) {
    delete this[key];
}; rayEnv.protect(Storage.prototype.removeItem);
Storage.prototype.clear = function clear() {
    for (var key in Object.keys(this)) {
        delete this[key];
    }
}; rayEnv.protect(Storage.prototype.clear);
Storage.prototype.key = function key(index) {
    return Object.keys(this)[index];
}; rayEnv.protect(Storage.prototype.key);
Storage.prototype.__defineGetter__("length", function length() {
    debugger;
    return Object.keys(this).length;
});
//////////////////////////////////////////////


// 4.定义原型链
localStorage.__proto__ = Storage.prototype;
sessionStorage.__proto__ = Storage.prototype;

// 5.代理Storage的属性
Storage = rayEnv.proxy(Storage);
localStorage = rayEnv.proxy(localStorage);
sessionStorage = rayEnv.proxy(sessionStorage);
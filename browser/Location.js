// 1.定义Location对象
var Location = function Location() {
}; rayEnv.protect(Location);
var location = {}; rayEnv.protect(location);

// 2.定义Location的Symbol.ToStringTag
Object.defineProperties(Location.prototype, {
    [Symbol.toStringTag]: {
        value: "Location",
        configurable: true,
    }
})

// 3.定义Document的属性
//////////////////////////////////////////////
Object.defineProperty(location, "port", {
    value: "",
    enumerable: true,
})
Object.defineProperty(location, "protocol", {
    value: "https:",
    enumerable: true,
})
//////////////////////////////////////////////


// 4.定义原型链
location.__proto__ = Location.prototype;

// 5.代理Document的属性
Location = rayEnv.proxy(Location);
location = rayEnv.proxy(location);
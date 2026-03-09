// 1.定义Navigator对象
var Navigator = function Navigator() {
}; rayEnv.protect(Navigator);
var navigator = {}; rayEnv.protect(navigator);

// 2.定义Navigator的Symbol.ToStringTag
Object.defineProperties(Navigator.prototype, {
    [Symbol.toStringTag]: {
        value: "Navigator",
        configurable: true,
    }
})

// 3.定义Navigator的属性
//////////////////////////////////////////////
//////////////////////////////////////////////


// 4.定义原型链
navigator.__proto__ = Navigator.prototype;

// 5.代理Navigator的属性
Navigator = rayEnv.proxy(Navigator);
navigator = rayEnv.proxy(navigator);

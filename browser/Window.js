// 1.定义Window对象
var Window = function Window() {
    throw new Error("Illegal Constructor");
}; rayEnv.protect(Window);
var window = this; rayEnv.protect(window);

// 2.定义Window的Symbol.ToStringTag
Object.defineProperties(Window.prototype, {
    [Symbol.toStringTag]: {
        value: "Window",
        configurable: true,
    }
})

// 3.定义Window的属性
//////////////////////
//////////////////////

// 4.定义原型链
window.__proto__ = Window.prototype;

// 5.代理Window的属性
Window = rayEnv.proxy(Window);
window = rayEnv.proxy(window);
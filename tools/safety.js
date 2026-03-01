// tools/safety.js
// 抗检测与属性保护模块
const setObj = function setObj(obj, prop, val) {
    Object.defineProperty(obj, prop, {
        value: val,
        enumerable: false,
        configurable: true,
        writable: true
    })
};

(function () {
    'use strict';

    const symbol = Symbol(Math.random()).toString(16);
    const oldToString = Function.prototype.toString;

    // 伪造 toString
    const newToString = function toString() {
        return (typeof this === 'function' && this[symbol]) || oldToString.call(this);
    };

    delete Function.prototype.toString;
    // 保护属性不被轻易枚举或修改
    setObj(Function.prototype, 'toString', newToString);

    // 保护属性不被轻易枚举或修改
    setObj(newToString, symbol, `function toString() { [native code] }`);

    // 保护函数：使其 toString 返回 [native code]
    rayEnv.protect = function (func) {
        Object.defineProperty(func, symbol, {
            value: `function ${func.name || ""}() { [native code] }`,
            enumerable: false,
            configurable: true
        });
    };

})();

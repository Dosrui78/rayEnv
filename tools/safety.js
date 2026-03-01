// tools/safety.js
// 抗检测与属性保护模块

(function () {
    'use strict';

    const symbol = Symbol("rayEnv_native_code");
    const oldToString = Function.prototype.toString;

    // 伪造 toString
    const newToString = function toString() {
        return (typeof this === 'function' && this[symbol]) || oldToString.call(this);
    };

    // 保护属性不被轻易枚举或修改
    Object.defineProperty(Function.prototype, 'toString', {
        value: newToString,
        enumerable: false,
        configurable: true,
        writable: true
    });

    // 保护函数：使其 toString 返回 [native code]
    rayEnv.protect = function (func) {
        Object.defineProperty(func, symbol, {
            value: `function ${func.name || ""}() { [native code] }`,
            enumerable: false,
            configurable: true
        });
    };

})();

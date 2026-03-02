// 1.定义Document对象
var Document = function Document() {
}; rayEnv.protect(Document);
var document = {}; rayEnv.protect(document);

// 2.定义Document的Symbol.ToStringTag
Object.defineProperties(Document.prototype, {
    [Symbol.toStringTag]: {
        value: "Document",
        configurable: true,
    }
})

// 3.定义Document的属性
//////////////////////////////////////////////
//////////////////////////////////////////////


// 4.定义原型链
document.__proto__ = Document.prototype;

// 5.代理Document的属性
Document = rayEnv.proxy(Document);
document = rayEnv.proxy(document);
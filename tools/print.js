// tools/print.js
// 日志打印工具
rayEnv.print = function (msg) {
    if (rayEnv.button.print) {
        console.log(msg);
        rayEnv.memory.logs.push(msg);
    }
};

rayEnv.printAll = function () {
    console.table(rayEnv.memory.logs);
};

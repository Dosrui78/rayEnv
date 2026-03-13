const http = require('http');
const { VM, VMScript } = require('vm2');
const index = require('./index.js');

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/gen_cookie') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const bodyJson = JSON.parse(body);
                const { meta_content, ts_js, auto_script_js } = bodyJson;
                
                console.log(`[${new Date().toLocaleTimeString()}] Request received. meta: ${meta_content?.length}, ts: ${ts_js?.length}, script: ${auto_script_js?.length}`);

                // 使用 index.js 提供的构建逻辑
                const fullCode = index.getBundledCode(meta_content, ts_js, auto_script_js);

                // 在 VM 中执行
                const vm = new VM();
                const script = new VMScript(fullCode, 'ouyeel_service_bundle.js');
                const cookie = vm.run(script);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ cookie: cookie || "" }));
                console.log(`[${new Date().toLocaleTimeString()}] SUCCESS: Cookie sent.`);
            } catch (err) {
                console.error('SERVER ERROR:', err.message);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message, stack: err.stack }));
            }
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`rayEnv HTTP Server running at http://localhost:${PORT}`);
});

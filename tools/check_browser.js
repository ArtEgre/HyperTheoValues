// Uses an installed Chrome/Edge: node --experimental-websocket tools/check_browser.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const http = require('node:http');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const browserPath = process.env.BROWSER_PATH || [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
].find(file => fs.existsSync(file));
assert(browserPath, 'Set BROWSER_PATH to an installed Chromium browser');
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'hypertheovalues-browser-'));
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const server = http.createServer((req, res) => {
    const file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
        res.writeHead(404).end(); return;
    }
    const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.svg': 'image/svg+xml' };
    res.setHeader('Content-Type', types[path.extname(file)] || 'text/plain');
    res.end(fs.readFileSync(file));
});
let browser, socket;
(async () => {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const base = `http://127.0.0.1:${server.address().port}`;
    browser = spawn(browserPath, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true, stdio: 'ignore' });
    const activePort = path.join(profile, 'DevToolsActivePort');
    for (let i = 0; i < 100 && !fs.existsSync(activePort); i++) await pause(100);
    assert(fs.existsSync(activePort), 'Browser did not start');
    const port = fs.readFileSync(activePort, 'utf8').split('\n')[0];
    const tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    socket = new WebSocket(tabs.find(tab => tab.type === 'page').webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
    let serial = 0;
    const waiting = new Map(), exceptions = [], missing = [];
    socket.onmessage = event => {
        const message = JSON.parse(event.data);
        if (message.id) {
            const pending = waiting.get(message.id);
            if (!pending) return;
            waiting.delete(message.id); clearTimeout(pending.timer);
            message.error ? pending.reject(Error(JSON.stringify(message.error))) : pending.resolve(message.result);
        }
        if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails);
        if (message.method === 'Network.responseReceived' && message.params.response.url.startsWith(base) && message.params.response.status >= 400) missing.push(message.params.response.url);
    };
    const send = (method, params = {}) => new Promise((resolve, reject) => {
        const id = ++serial;
        const timer = setTimeout(() => { waiting.delete(id); reject(Error(`CDP timeout: ${method}`)); }, 15000);
        waiting.set(id, { resolve, reject, timer });
        socket.send(JSON.stringify({ id, method, params }));
    });
    const evaluate = async expression => {
        const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
        if (result.exceptionDetails) throw Error(JSON.stringify(result.exceptionDetails));
        return result.result.value;
    };
    const until = async expression => {
        for (let i = 0; i < 100; i++) {
            try { if (await evaluate(expression)) return; } catch (e) { if (i === 99) throw e; }
            await pause(100);
        }
        throw Error('Timed out waiting for ' + expression);
    };
    const navigate = async file => {
        const url = new URL(`${base}/${file}`).href;
        await send('Page.navigate', { url });
        await until(`location.href === ${JSON.stringify(url)} && document.readyState === 'complete'`);
    };
    await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
    await navigate('index.html');
    assert.equal(await evaluate('document.querySelector("h1").textContent'), 'HyperTheoValues');
    await evaluate('localStorage.setItem("quizAnswers", "original-project-data")');
    await navigate('Instruction.html');
    await evaluate('startQuiz()');
    await until('location.pathname.endsWith("results.html") && document.querySelectorAll(".category-section").length === 9');
    assert.equal(await evaluate('document.getElementById("results-panel").style.display'), 'none');
    await navigate('quiz.html?cat=theology_proper');
    await until('document.querySelectorAll("#buttons button").length > 1');
    const originalQuestion = await evaluate('document.getElementById("question").textContent');
    await evaluate('document.querySelector("#buttons button").click()');
    await until('location.pathname.endsWith("results.html") || document.getElementById("question").textContent !== ' + JSON.stringify(originalQuestion));
    if (await evaluate('location.pathname.endsWith("quiz.html")')) {
        await evaluate('previousQuestion()');
        assert.equal(await evaluate('document.getElementById("question").textContent'), originalQuestion);
    }
    // Complete every category through the actual quiz navigation.
    for (const cat of ['theology_proper','christology','bibliology','pneumatology','hamartiology','sacramentology','soteriology','ecclesiology','eschatology']) {
        await navigate(`quiz.html?cat=${cat}`);
        await until('document.querySelectorAll("#buttons button").length > 1');
        for (let step = 0; step < 30; step++) {
            await evaluate('document.querySelector("#buttons button").click()');
            await pause(100);
            if (await evaluate('location.pathname.endsWith("results.html")')) break;
        }
        await until('location.pathname.endsWith("results.html") && document.querySelectorAll(".category-section").length === 9');
    }
    assert.equal(await evaluate('Object.keys(HV.loadAnswers()).length'), 9);
    assert(await evaluate('document.querySelector("#label a").textContent.length > 0'));
    // Exercise multiple values, agreement editing and removal.
    await navigate('quiz.html?cat=theology_proper');
    await until('document.querySelectorAll("#buttons button").length > 1');
    await evaluate('addValue("monarchical_trinitarianism")');
    await until('location.pathname.endsWith("results.html") && document.querySelectorAll(".category-section").length === 9');
    assert.equal(await evaluate('HV.loadAnswers().theology_proper.length'), 2);
    await navigate('description.html?id=monarchical_trinitarianism&cat=theology_proper&edit=1');
    await evaluate('const input = document.querySelector("input[type=range]"); input.value = -50; input.dispatchEvent(new Event("input"));');
    assert.equal(await evaluate('HV.loadAnswers().theology_proper.find(item=>item.value==="monarchical_trinitarianism").agree'), -0.5);
    await evaluate('document.getElementById("remove-value-btn").click()');
    await until('location.pathname.endsWith("results.html") && document.querySelectorAll(".category-section").length === 9');
    assert.equal(await evaluate('HV.loadAnswers().theology_proper.length'), 1);
    const rendered = await evaluate(`(() => {
        const answers = HV.loadAnswers(), ranked = HV.closestDenominations(answers, null, 4);
        return ['phone','computer'].map(kind => {
            const canvas = HVImage.draw(kind, answers, ranked, {}, (w,h)=>Object.assign(document.createElement('canvas'),{width:w,height:h}), 1);
            return [canvas.width, canvas.height, canvas.toDataURL().startsWith('data:image/png')];
        });
    })()`);
    assert.deepEqual(rendered, [[1080,1920,true],[1920,1080,true]]);
    await navigate('description.html?id=Eastern%20Orthodoxy&type=denomination&compare=1');
    assert.equal(await evaluate('document.querySelectorAll("#denomination-viewer .category-section").length'), 9);
    await navigate('denominations.html');
    assert.equal(await evaluate('document.querySelectorAll(".label-bubble").length'), 18);
    // Browse every profile and verify that its defined values render.
    const profileNames = await evaluate('Object.values(denominationMapping)');
    for (const name of profileNames) {
        await navigate(`description.html?id=${encodeURIComponent(name)}&type=denomination`);
        assert.equal(await evaluate('document.querySelector("h1").textContent'), name.toUpperCase());
        assert(await evaluate('document.getElementById("denomination-viewer").children.length > 0'));
    }
    await navigate('values.html');
    assert.equal(await evaluate('document.querySelectorAll(".result-item").length'), 68);
    assert.equal(await evaluate('[...document.images].filter(img=>!img.complete || img.naturalWidth===0).length'), 0);
    await navigate('results.html');
    // Equally supported Orthodox profiles use the requested joint label with equal shares.
    await evaluate(`(() => {
        const key = Object.keys(denominationMapping).find(key => denominationMapping[key] === 'Eastern Orthodoxy');
        const answers = {};
        for (const value of key.split('|').filter(value => value !== 'chalcedonian_dyophysitism')) {
            (answers[HV.categoryOf[value]] ||= []).push({value, agree:1});
        }
        answers.christology = [{value:'chalcedonian_dyophysitism',agree:1},{value:'miaphysitism',agree:1}];
        HV.saveAnswers(answers);
    })()`);
    await navigate('results.html');
    assert(await evaluate(`(() => {
        const ranked=HV.rankDenominations(HV.loadAnswers());
        const pair=ranked.filter(item=>item.label==='Eastern Orthodoxy'||item.label==='Oriental Orthodoxy');
        return Math.abs(pair[0].probability-pair[1].probability)<1e-12 && HV.percent(pair[0].probability)==='50.0%';
    })()`));
    assert.equal(await evaluate('document.querySelector("#label [data-name]").dataset.name'), "Eastern Orthodox/Oriental Orthodox");
    assert.equal(await evaluate('document.getElementById("joint-match").hidden'), false);
    assert(await evaluate('document.querySelector("#label .label-score").textContent.includes(">99.9%")'));
    assert.equal(await evaluate('[...document.querySelectorAll("#closest-list a")].some(a=>a.textContent.includes("Orthodoxy"))'), false);
    await send('Emulation.setDeviceMetricsOverride', { width:390, height:844, deviceScaleFactor:1, mobile:true });
    for (const file of ['index.html','results.html','values.html','denominations.html']) {
        await navigate(file);
        assert(await evaluate('document.documentElement.scrollWidth <= innerWidth'), `Horizontal overflow on ${file}`);
    }
    await navigate('results.html');
    await evaluate(`answers.christology = [{value:'miaphysitism',agree:1}]; HV.saveAnswers(answers); render()`);
    assert(await evaluate('document.querySelector("#label a").textContent.includes("Oriental Orthodoxy")'));
    assert.equal(await evaluate('document.getElementById("joint-match").hidden'), true);
    await evaluate(`answers.christology = [{value:'chalcedonian_dyophysitism',agree:1}]; HV.saveAnswers(answers); render()`);
    assert(await evaluate('document.querySelector("#label a").textContent.includes("Eastern Orthodoxy")'));
    await evaluate(`answers.christology.push({value:'miaphysitism',agree:0.5}); HV.saveAnswers(answers); render()`);
    assert.equal(await evaluate('document.querySelector("#label [data-name]").dataset.name'), 'Eastern Orthodox/Oriental Orthodox');
    await navigate('description.html?id=Eastern%20Orthodox%2FOriental%20Orthodox&type=denomination&compare=1');
    assert.equal(await evaluate('document.querySelectorAll(".description-box a").length'), 2);
    // Traverse the actual question branches to both new values.
    for (const [category, value, expected] of [
        ['theology_proper', 'palamite_panentheism', 'Eastern Orthodoxy'],
        ['christology', 'eastern_syriac_christology', 'Assyrian Church of the East']
    ]) {
        await evaluate('HV.saveAnswers({})');
        await navigate(`quiz.html?cat=${category}`);
        await until('document.querySelectorAll("#buttons button").length > 1');
        await evaluate(`(() => {
            const target = ${JSON.stringify(value)};
            function route(id) {
                if (id === target) return [];
                for (const option of currentQuestions[id].options || []) {
                    const rest = route(option.next);
                    if (rest) return [option.next, ...rest];
                }
                return null;
            }
            const steps = route(Object.keys(currentQuestions)[0]);
            if (!steps) throw Error('New value is unreachable');
            steps.forEach(selectOption);
        })()`);
        await until('location.pathname.endsWith("results.html") && document.querySelectorAll(".category-section").length === 9');
        assert(await evaluate(`document.querySelector('#label a').textContent.includes(${JSON.stringify(expected)})`));
        await navigate(`description.html?id=${value}&cat=${category}&edit=1`);
        assert(await evaluate('document.querySelector(".description-box").textContent.includes("Sources:")'));
        assert(await evaluate('document.querySelector("input[type=range]") !== null'));
    }
    await navigate('description.html?id=Assyrian%20Church%20of%20the%20East&type=denomination');
    assert.equal(await evaluate('document.querySelectorAll("#denomination-viewer .category-section").length'), 9);
    assert(await evaluate('document.getElementById("denomination-viewer").textContent.includes("universal need for redemption")'));
    await navigate('description.html?id=Quaker%20(unprogrammed)&type=denomination');
    assert(await evaluate('document.getElementById("denomination-viewer").textContent.includes("do not impose one creed")'));
    await evaluate('toggleTheme()');
    const theme = await evaluate('document.documentElement.dataset.theme');
    await navigate('index.html');
    assert.equal(await evaluate('document.documentElement.dataset.theme'), theme);
    assert.equal(await evaluate('localStorage.getItem("quizAnswers")'), 'original-project-data');
    assert.deepEqual(exceptions, [], 'No browser script errors');
    assert.deepEqual(missing, [], 'No missing local resources');
    console.log('Browser checks passed: full quiz, previous question, multiple values, slider persistence, removal, denomination comparison, 68 icons, both new question paths, source links, phone/desktop image rendering, mobile layout, themes and storage isolation.');
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => {
    if (socket) socket.close();
    if (browser) {
        // Close the headless browser tree; no user browser session uses this temporary profile.
        if (process.platform === 'win32') await new Promise(resolve => {
            const stop = spawn('taskkill', ['/PID', String(browser.pid), '/T', '/F'], { windowsHide:true, stdio:'ignore' });
            stop.on('exit', resolve);
        });
        else browser.kill();
    }
    server.closeAllConnections(); server.close();
    if (path.resolve(profile).startsWith(path.resolve(os.tmpdir()) + path.sep) && path.basename(profile).startsWith('hypertheovalues-browser-')) {
        try { fs.rmSync(profile, { recursive:true, force:true, maxRetries:5, retryDelay:200 }); } catch {}
    }
});

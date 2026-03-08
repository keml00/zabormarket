const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const imageMap = JSON.parse(fs.readFileSync('image-map.json', 'utf8'));

function download(url, filePath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
        const client = url.startsWith('https') ? https : http;
        client.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://centermk.ru/'
            }
        }, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                file.close();
                fs.unlink(filePath, () => { });
                download(res.headers.location, filePath).then(resolve).catch(reject);
                return;
            }
            if (res.statusCode !== 200) {
                file.close();
                fs.unlink(filePath, () => { });
                reject(new Error(`HTTP ${res.statusCode} for ${url}`));
                return;
            }
            res.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
        }).on('error', (err) => {
            fs.unlink(filePath, () => { });
            reject(err);
        });
    });
}

async function run() {
    let total = 0;
    let success = 0;
    let skipped = 0;

    for (const [modelId, colors] of Object.entries(imageMap)) {
        for (const [colorFolder, url] of Object.entries(colors)) {
            const dir = path.join(__dirname, 'img', 'products', modelId, colorFolder);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            const filePath = path.join(dir, '1.jpg');
            if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
                console.log(`[SKIP] ${modelId}/${colorFolder} (already exists)`);
                skipped++;
                continue;
            }
            total++;
            process.stdout.write(`[DL]   ${modelId}/${colorFolder} ... `);
            try {
                await download(url, filePath);
                console.log('OK');
                success++;
            } catch (err) {
                console.log(`FAIL: ${err.message}`);
            }
        }
    }
    console.log(`\nDone. Downloaded: ${success}, Skipped: ${skipped}, Failed: ${total - success}`);
}

run();

const fs = require('fs');

const filename = 'testcase2.json';

function decodeValue(value, base) {
    
    return parseInt(value, parseInt(base, 10));
}

function lagrangeInterpolation(x, y, x_point) {
    let n = x.length;
    let result = 0;

    for (let i = 0; i < n; i++) {
        let term = y[i];
        for (let j = 0; j < n; j++) {
            if (j !== i) {
                term *= (x_point - x[j]) / (x[i] - x[j]);
            }
        }
        result += term;
    }
    return result;
}

function main() {
    const data = JSON.parse(fs.readFileSync(filename));
    const n = data.keys.n;
    const roots = [];
    const values = [];

    
    const k = data.keys.k;
    let usedRoots = 0;
    for (let key in data) {
        if (key === "keys" || usedRoots >= k) continue;
        const root = parseInt(key, 10);
        const base = data[key].base;
        const value = data[key].value;

        roots.push(root);
        values.push(decodeValue(value, base));
        usedRoots += 1;
    }

    
    const c = lagrangeInterpolation(roots, values, 0);
    console.log('Constant term (c):', c);
}

main();
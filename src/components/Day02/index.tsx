import React from 'react';
import input from './assets/input.txt?raw';
// import input from './assets/input.example.txt?raw';


const data = input.trim().split(',').flatMap(minMax => {
    const [min, max] = minMax.split('-').map(n => parseInt(n, 10));
    return [...Array(max - min + 1).keys()].map(i => min + i);
});

const invalidP1: Set<number> = new Set();
data.forEach(n => {
    const str = n.toString();
    if (str.length % 2 !== 0) {
        return;
    }
    if (str.startsWith('0')) {
        return invalidP1.add(n);
    }
    const p1 = str.slice(0, str.length / 2);
    const p2 = str.slice(str.length / 2);
    if (p1 === p2) {
        return invalidP1.add(n);
    }
});
const invalidP2: Set<number> = new Set();

data.forEach(n => {
    const str = n.toString();
    if (str.startsWith('0')) {
        return invalidP2.add(n);
    }
    const len = str.length;
    for (let splits = 2; splits <= len; splits++) {
        if (len % splits !== 0) {
            continue;
        }
        const chunkSize = len / splits;
        const checks = [...Array(splits - 1).keys()].map(i => {
            return (i + 1) * chunkSize;
        });
        const invalid = checks.every((end) => {
            const p1 = str.slice(0, chunkSize);
            const p2 = str.slice(end, end + chunkSize);
            return p1 === p2;
        });
        if (invalid) {
            return invalidP2.add(n);
        }
    }
});
const resultP1 = [...invalidP1].reduce((acc, val) => acc + val, 0);
const resultP2 = [...invalidP2].reduce((acc, val) => acc + val, 0);

const Day02 = () => {

    return (
        <main>
            <h1>Day 02</h1>
            <div>Result: {resultP1}</div>
            <div>Result P2: {resultP2}</div>
            <details>
                <summary>Part 1</summary>
                <pre><code>{JSON.stringify([...invalidP1], null, 2)}</code></pre>
            </details>
            <details>
                <summary>Part 2</summary>
                <pre><code>{JSON.stringify([...invalidP2], null, 2)}</code></pre>
            </details>
        </main>
    )
}

export default Day02

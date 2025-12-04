import React from 'react';
import input from './assets/input.txt?raw';
// import input from './assets/input.example.txt?raw';


const data = input.trim().split(',').flatMap(minMax => {
    const [min, max] = minMax.split('-').map(n => parseInt(n, 10));
    return [...Array(max - min + 1).keys()].map(i => min + i);
});

const invalid: Set<number> = new Set();
data.forEach(n => {
    const str = n.toString();
    if (str.length % 2 !== 0) {
        return;
    }
    if (str.startsWith('0')) {
        return invalid.add(n);
    }
    const p1 = str.slice(0, str.length / 2);
    const p2 = str.slice(str.length / 2);
    if (p1 === p2) {
        return invalid.add(n);
    }
});
const result = [...invalid].reduce((acc, val) => acc + val, 0);


// const result = data.reduce((acc, val) => {
//     const dir = val > 0 ? 1 : -1;
//     const zeros = [...Array(Math.abs(val)).keys()].map((_, i) => (acc.num + dir * (i + 1) + 100) % 100);
//     acc.passByZero += zeros.filter(v => v === 0).length;
//     acc.num = (acc.num + val + 100) % 100;
//     if (acc.num === 0) {
//         acc.zeros += 1;
//     }
//     return acc;
// }, { num: 50, zeros: 0, passByZero: 0 });

const Day02 = () => {

    return (
        <main>
            <h1>Day 02</h1>
            <div>Result: {result}</div>
            <pre><code>{JSON.stringify([...invalid], null, 2)}</code></pre>
        </main>
    )
}

export default Day02

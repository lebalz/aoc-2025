import input from './assets/input.txt?raw';
// import input from './assets/input.example.txt?raw';
const lines = input.split('\n').map(line => line);
const rows = lines.length - 1;
const RI = [...Array(rows).keys()];

// Part 1
const data = input.split('\n').map(line => line.trim().split(/\s+/));
const calculationsP1 = data[0].map((_, idx) => RI.map((_, r) => Number.parseInt(data[r][idx], 10)));

// Part 2
const CELL_SIZES = lines[rows].split(/(\+|\*)/).filter(l => l.length > 0 && !/(\+|\*)/.test(l)).map(s => s.length);
CELL_SIZES[CELL_SIZES.length - 1] += 1; // account for newline
const calculationsP2 = CELL_SIZES.map((sz, idx) => {
    // starting index
    const sIdx = CELL_SIZES.slice(0, idx).reduce((a, b) => a + b + 1, 0);
    // map from each row the correct char positions, parse to number and return flat array 
    return [...Array(sz).keys()].map(i => sIdx + i).flatMap(pos => Number.parseInt(RI.map((_, r) => lines[r][pos]).join('').trim(), 10))
});
const OPs = data[rows] as ('+' | '*')[];
const op = {
    '+': (a: number, b: number) => a + b,
    '*': (a: number, b: number) => a * b,
}
const neutral = {
    '+': 0,
    '*': 1,
}

const resultsP1 = calculationsP1.map((nums, idx) => {
    const operation = op[OPs[idx]];
    return nums.reduce((acc, n) => operation(acc, n), neutral[OPs[idx]]);
});

const resultsP2 = calculationsP2.map((nums, idx) => {
    const operation = op[OPs[idx]];
    return nums.reduce((acc, n) => operation(acc, n), neutral[OPs[idx]]);
});


const Day06 = () => {
    return (
        <main>
            <h1>Day 06</h1>
            <div>Result P1: {resultsP1.reduce((a, b) => a + b, 0)}</div>
            <div>Result P2: {resultsP2.reduce((a, b) => a + b, 0)}</div>
            <details>
                <summary>Part 2</summary>
                <pre><code>{JSON.stringify(calculationsP2)}</code></pre>
            </details>
        </main>
    )
}

export default Day06

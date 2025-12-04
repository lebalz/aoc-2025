import input from './assets/input.txt?raw';
// import input from './assets/input.example.txt?raw';


const data = input.trim().split('\n').map(bank => {
    const batteries = bank.split('').map(n => parseInt(n, 10));
    return batteries;
});
const joltagesP1 = data.map(bank => {
    const max1 = Math.max(...bank.slice(0, -1));
    const idx = bank.indexOf(max1);
    const max2 = Math.max(...bank.slice(idx + 1));
    return parseInt(`${max1}${max2}`, 10);
});
const joltagesP2 = data.map(bank => {
    const joltageIndices: number[] = [];
    for (let i = 0; i < 12; i++) {
        const startIdx = joltageIndices.length > 0 ? joltageIndices[joltageIndices.length - 1] + 1 : 0;
        const toConsider = bank.slice(startIdx, (i - 11) < 0 ? (i - 11) : undefined);
        const max = Math.max(...toConsider);
        joltageIndices.push(startIdx + toConsider.indexOf(max));
    }
    const joltages = joltageIndices.map(idx => bank[idx]);
    return parseInt(joltages.join(''), 10);
});


const Day03 = () => {

    return (
        <main>
            <h1>Day 03</h1>
            <div>Result P1: {joltagesP1.reduce((acc, val) => acc + val, 0)}</div>
            <div>Result P2: {joltagesP2.reduce((acc, val) => acc + val, 0)}</div>
            <details>
                <summary>Part 1</summary>
                <pre><code>{JSON.stringify(joltagesP1, null, 2)}</code></pre>
            </details>
            <details>
                <summary>Part 2</summary>
                <pre><code>{JSON.stringify(joltagesP2, null, 2)}</code></pre>
            </details>
        </main>
    )
}

export default Day03

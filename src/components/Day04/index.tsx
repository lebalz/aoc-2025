import input from './assets/input.txt?raw';
// import input from './assets/input.example.txt?raw';


const data = input.trim().split('\n').map(row => {
    const rolls = row.split('').map(n => n === '@' ? 1 : 0);
    return rolls;
});

const accessable = data.map((row, y) => {
    return row.map((cell, x) => {
        if (cell < 1) {
            return 0;
        }
        const top = y > 0 ? data[y - 1][x] : 0;
        const topLeft = y > 0 && x > 0 ? data[y - 1][x - 1] : 0;
        const left = x > 0 ? data[y][x - 1] : 0;
        const bottomLeft = y < data.length - 1 && x > 0 ? data[y + 1][x - 1] : 0;
        const bottom = y < data.length - 1 ? data[y + 1][x] : 0;
        const bottomRight = y < data.length - 1 && x < row.length - 1 ? data[y + 1][x + 1] : 0;
        const right = x < row.length - 1 ? data[y][x + 1] : 0;
        const topRight = y > 0 && x < row.length - 1 ? data[y - 1][x + 1] : 0;
        return (top + bottom + left + right + topLeft + bottomLeft + bottomRight + topRight) < 4 ? 1 : 0;
    });
})

const Day04 = () => {

    return (
        <main>
            <h1>Day 03</h1>
            <div>Result P1: {accessable.flatMap(row => row).reduce((acc, val) => acc + val, 0 as number)}</div>
            <details>
                <summary>Part 1</summary>
                <pre><code>{JSON.stringify(accessable, null, 2)}</code></pre>
            </details>
        </main>
    )
}

export default Day04

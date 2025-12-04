import input from './assets/input.txt?raw';
// import input from './assets/input.example.txt?raw';


const data = input.trim().split('\n').map(row => {
    const rolls = row.split('').map(n => n === '@' ? 1 : 0);
    return rolls;
});

const isAccessable = (grid: number[][], x: number, y: number) => {
    const cell = grid[y]?.[x];
    if (cell === undefined || cell < 1) {
        return false;
    }
    const dimY = grid.length - 1;
    const dimX = grid[0].length - 1;
    const top = y > 0 ? grid[y - 1][x] : 0;
    const topLeft = y > 0 && x > 0 ? grid[y - 1][x - 1] : 0;
    const left = x > 0 ? grid[y][x - 1] : 0;
    const bottomLeft = y < dimY && x > 0 ? grid[y + 1][x - 1] : 0;
    const bottom = y < dimY ? grid[y + 1][x] : 0;
    const bottomRight = y < dimY && x < dimX ? grid[y + 1][x + 1] : 0;
    const right = x < dimX ? grid[y][x + 1] : 0;
    const topRight = y > 0 && x < dimX ? grid[y - 1][x + 1] : 0;
    return (top + bottom + left + right + topLeft + bottomLeft + bottomRight + topRight) < 4;
};

const accessableP1 = data.map((row, y) => {
    return row.map((_, x) => {
        return isAccessable(data, x, y) ? 1 : 0;
    });
});
const gridP2 = data.map((row) => row.map((c) => c));
const removeAccessable = () => {
    let count = 0;
    gridP2.forEach((row, y) => {
        row.forEach((_, x) => {
            if (isAccessable(gridP2, x, y)) {
                gridP2[y][x] = 0;
                count++;
            }
        });
    });
    return count;
};

const accessableP2: number[] = [];

while (true) {
    const removed = removeAccessable();
    if (removed === 0) {
        break;
    }
    accessableP2.push(removed);
}


const Day04 = () => {

    return (
        <main>
            <h1>Day 03</h1>
            <div>Result P1: {accessableP1.flatMap(row => row).reduce((acc, val) => acc + val, 0 as number)}</div>
            <div>Result P2: {accessableP2.reduce((acc, val) => acc + val, 0)}</div>
            <details>
                <summary>Part 1</summary>
                <pre><code>{JSON.stringify(accessableP1, null, 2)}</code></pre>
            </details>
        </main>
    )
}

export default Day04

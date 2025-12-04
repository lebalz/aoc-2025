import React from 'react';
import input from './assets/input.txt?raw';
import clsx from 'clsx';
import styles from './styles.module.css';


const data = input.trim().split('\n').map(row => {
    const rolls = row.split('').map(n => n === '@' ? 1 : 0);
    return rolls;
});

const DIM_X = data[0]!.length;
const DIM_Y = data.length;

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
const removeAccessable = (grid: number[][]) => {
    let count = 0;
    grid.forEach((row, y) => {
        row.forEach((_, x) => {
            if (isAccessable(grid, x, y)) {
                grid[y][x] = 0;
                count++;
            }
        });
    });
    return count;
};

const processAccessable = (flatGrid: number[]) => {
    const flat = flatGrid.map((c) => c);
    const newGrid: number[][] = [...Array(DIM_Y).keys()].map((y) => {
        return flat.slice(y * DIM_X, (y + 1) * DIM_X);
    });
    removeAccessable(newGrid);
    return newGrid.flat();
};

const accessableP2: number[] = [];

while (true) {
    const removed = removeAccessable(gridP2);
    if (removed === 0) {
        break;
    }
    accessableP2.push(removed);
}

const MAX_SPEED = 2000;
const initialPresent = data.flatMap(r => r).reduce((acc, val) => acc + val, 0 as number);

const Cell = React.memo(
    ({ active, style, cellKey }: { active: boolean; style: React.CSSProperties; cellKey: string }) => (
        <div
            key={cellKey}
            className={clsx(styles.cell, active && styles.active)}
            style={style}
        ></div>
    ),
    (prev, next) =>
        prev.active === next.active &&
        prev.style.transitionDuration === next.style.transitionDuration &&
        prev.cellKey === next.cellKey
);


const Day04 = () => {
    const [speed, setSpeed] = React.useState(MAX_SPEED / 2);
    const [iteration, setIteration] = React.useState(0);
    const [presentRolls, setPresentRolls] = React.useState<number[]>([initialPresent]);
    const [isRunning, setIsRunning] = React.useState(true);
    const [grid, setGrid] = React.useState<number[]>(data.flatMap(r => r.map(c => c)));
    const iterationSpeed = MAX_SPEED - speed;
    React.useEffect(() => {
        if (!isRunning) {
            return;
        }
        const timeout = setTimeout(() => {
            setGrid((g) => processAccessable(g));
            setIteration((i) => i + 1);
        }, MAX_SPEED - speed);
        return () => clearTimeout(timeout);
    }, [isRunning, speed, iteration]);

    React.useEffect(() => {
        const presentThisRound = grid.flatMap(r => r).reduce((acc, val) => acc + val, 0);
        if (presentThisRound === initialPresent) {
            return;
        }
        setPresentRolls((prs) => [...prs, presentThisRound]);
    }, [grid]);
    React.useEffect(() => {
        if (presentRolls.length < 2) {
            return;
        }
        const last = presentRolls[presentRolls.length - 1];
        const secondLast = presentRolls[presentRolls.length - 2];
        if (last === secondLast) {
            setIsRunning(false);
        }
    }, [presentRolls]);
    return (
        <main>
            <h1>Day 04</h1>
            <div>Iteration: {iteration}</div>
            <div className={clsx(styles.grid)} style={{ gridTemplateColumns: `repeat(${DIM_X}, 1fr)` }}>
                {grid.map((cell, idx) => (
                    <Cell
                        key={`cell-${idx}`}
                        cellKey={`cell-${idx}`}
                        active={cell > 0}
                        style={{ transitionDuration: iteration > 0 ? `${3 * iterationSpeed}ms` : undefined }}
                    />
                ))}
            </div>
            <div>
                <input type="range" min={0} max={MAX_SPEED} value={speed} onChange={(e) => setSpeed(parseInt(e.target.value, 10))} />
            </div>

            <button
                onClick={() => {
                    setGrid(data.flatMap(r => r.map(c => c)));
                    setPresentRolls([initialPresent]);
                    setIteration(0);
                    setIsRunning(true);
                }}
            >
                Reset
            </button>
            <div>Result P1: {accessableP1.flatMap(row => row).reduce((acc, val) => acc + val, 0 as number)}</div>
            <div>Result P2: {presentRolls.reduce((acc, val, idx) => idx > 0 ? acc + presentRolls[idx - 1] - val : acc, 0)} [{accessableP2.reduce((acc, val) => acc + val, 0)}]</div>
            <details>
                <summary>Part 1</summary>
                <pre><code>{JSON.stringify(accessableP1, null, 2)}</code></pre>
            </details>
        </main>
    )
}

export default Day04

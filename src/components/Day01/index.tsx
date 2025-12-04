import React from 'react';
import input from './assets/input.txt?raw';

import Dial from './Dial';

/**
 * dial: 0-99
 *  start at 50
 * rotations:
 *  L: left
 *  R: right
 * distance:
 *  number of ticks to move left or right
 * password: the number of 
 */
const MAX_SPEED = 1500;


const data = input.trim().split('\n').map(line => {
    const dir = line[0] === 'L' ? -1 : 1;
    return dir * parseInt(line.slice(1), 10)
});
const result = data.reduce((acc, val) => {
    const dir = val > 0 ? 1 : -1;
    const zeros = [...Array(Math.abs(val)).keys()].map((_, i) => (acc.num + dir * (i + 1) + 100) % 100);
    acc.passByZero += zeros.filter(v => v === 0).length;
    acc.num = (acc.num + val + 100) % 100;
    if (acc.num === 0) {
        acc.zeros += 1;
    }
    return acc;
}, { num: 50, zeros: 0, passByZero: 0 });

const Day01 = () => {
    const [speed, setSpeed] = React.useState(MAX_SPEED / 2);
    const [countZero, setCountZero] = React.useState(0);
    const [num, setNum] = React.useState(50);
    const [idx, setIdx] = React.useState(0);
    React.useEffect(() => {
        if (idx >= data.length) {
            return;
        }
        const timeout = setTimeout(() => {
            setNum((n) => (n + data[idx] + 100) % 100);
            setIdx((i) => i + 1);
        }, MAX_SPEED - speed);
        return () => clearTimeout(timeout);
    }, [idx, speed]);
    React.useEffect(() => {
        if (num === 0) {
            setCountZero((c) => c + 1);
        }
    }, [num]);
    return (
        <main>
            <h1>Day 01</h1>
            <Dial value={num} speed={MAX_SPEED - speed} />
            <div style={{ marginTop: '10em' }}>Position: {idx}/{data.length}</div>
            <input type="range" min={0} max={MAX_SPEED} value={speed} onChange={(e) => setSpeed(parseInt(e.target.value, 10))} />
            <div>Speed: {MAX_SPEED - speed}ms</div>
            <div>Count of Zeros: {countZero} [{result.zeros}]</div>
            <details>
                <summary>Stage 2</summary>
                <div>Stage 2: Total Zero Ticks: {result.passByZero}</div>
            </details>
            <button
                onClick={() => {
                    setNum(50);
                    setIdx(0);
                    setCountZero(0);
                }}
            >
                Reset
            </button>
        </main>
    )
}

export default Day01

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

const data = input.trim().split('\n').map(line => {
    const dir = line[0] === 'L' ? -1 : 1;
    return dir * parseInt(line.slice(1), 10)
});

const Day01 = () => {
    const [speed, setSpeed] = React.useState(10);
    const [countZero, setCountZero] = React.useState(0);
    const [num, setNum] = React.useState(50);
    const [idx, setIdx] = React.useState(0);
    React.useEffect(() => {
        if (idx >= data.length) {
            return;
        }
        const timeout = setTimeout(() => {
            setNum((n) => (n + data[idx]) % 100);
            setIdx((i) => i + 1);
        }, 2000 - speed);
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
            <Dial value={num} speed={2000 - speed} />
            <div style={{ marginTop: '10em' }}>Position: {idx}</div>
            <input type="range" min="10" max="2000" value={speed} onChange={(e) => setSpeed(parseInt(e.target.value, 10))} />
            <button
                onClick={() => {
                    setNum(50);
                    setIdx(0);
                    setCountZero(0);
                }}
                style={{ display: 'block' }}
            >
                Reset
            </button>
            <div>Speed: {2000 - speed}ms</div>
            <div>Count of 0: {countZero}</div>
        </main>
    )
}

export default Day01

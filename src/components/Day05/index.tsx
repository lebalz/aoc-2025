import input from './assets/input.txt?raw';
// import input from './assets/input.example.txt?raw';


const [ranges, pid] = input.trim().split('\n\n').map((part, idx) => {
    if (idx === 0) {
        return part.split('\n').map(line => {
            return line.split('-').map(n => Number.parseInt(n, 10));
        });
    }
    return part.split('\n').map(pid => Number.parseInt(pid, 10));
}) as [[number, number][], number[]];


const mergeRanges: [number, number][] = [];

ranges.forEach(([start, end]) => {
    const fullOverlap = mergeRanges.filter(([s, e]) => (start >= s && end <= e));
    if (fullOverlap.length > 0) {
        return;
    }
    const fullContain = mergeRanges.filter(([s, e]) => (start <= s && end >= e));
    if (fullContain.length > 0) {
        fullContain.forEach((range) => {
            range[0] = -1;
            range[1] = -1;
        });
    }
    const overlapping = mergeRanges.filter(([s, e]) => (start <= e && start >= s) || (end >= s && end <= e));
    if (overlapping.length === 0) {
        mergeRanges.push([start, end]);
        return;
    }
    if (overlapping.length === 1) {
        if (start < overlapping[0]![0]) {
            overlapping[0]![0] = start;
        }
        if (end > overlapping[0]![1]) {
            overlapping[0]![1] = end;
        }
        return;
    }
    if (start < overlapping[0]![0]) {
        overlapping[0]![0] = start;
    }
    if (end > overlapping[0]![1]) {
        overlapping[0]![1] = end;
    }
    overlapping.slice(1).forEach((range) => {
        if (range[0] < overlapping[0]![0] && range[1] >= overlapping[0]![0]) {
            // This range overlaps the start of the merged range - adjust it!
            overlapping[0]![0] = range[0];
        }
        if (range[1] > overlapping[0]![1] && range[0] <= overlapping[0]![1]) {
            // This range overlaps the end of the merged range - adjust it!
            overlapping[0]![1] = range[1];
        }
        range[0] = -1;
        range[1] = -1;
    });
});


const Day05 = () => {
    return (
        <main>
            <h1>Day 05</h1>
            <div>Result P1: {pid.filter(p => ranges.some(r => r[0] <= p && p <= r[1])).length}</div>
            <div>Result P2: {mergeRanges.map(([s, e]) => e === -1 ? 0 : s === e ? 1 : e - s + 1).reduce((a, b) => a + b, 0)}</div>
            <details>
                <summary>Part 2</summary>
                <pre><code>{mergeRanges.map(r => JSON.stringify(r)).join('\n')}</code></pre>
            </details>
        </main>
    )
}

export default Day05

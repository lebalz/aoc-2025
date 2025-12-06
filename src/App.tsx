import { NavLink } from 'react-router'
import './App.css'

function App() {
    return (
        <>
            <h1>Advent of Code 2025</h1>
            <ul>
                <li><NavLink to="/days/01">Day 01</NavLink></li>
                <li><NavLink to="/days/02">Day 02</NavLink></li>
                <li><NavLink to="/days/03">Day 03</NavLink></li>
                <li><NavLink to="/days/04">Day 04</NavLink></li>
                <li><NavLink to="/days/05">Day 05</NavLink></li>
            </ul>
        </>
    )
}

export default App

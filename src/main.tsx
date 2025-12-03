import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import App from './App.tsx'
import Day01 from './components/Day01/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="days">
          <Route path="01" element={<Day01 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

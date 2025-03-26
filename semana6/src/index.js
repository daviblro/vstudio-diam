import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import FormVoluntario from './FormVoluntario';
import Inquerito from './Inquerito'
import RespostaInquerito from './RespostaInquerito';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/FormVoluntario" element={<FormVoluntario/>} />
      <Route path="/Inquerito" element={<Inquerito/>} />
      <Route path="/RespostaInquerito" element={<RespostaInquerito/>} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

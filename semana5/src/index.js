import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppSemana4 from "./AppSemana4";
import AppSemana5 from "./AppSemana5";
import reportWebVitals from "./reportWebVitals";
import FormVoluntario from "./FormVoluntario";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppSemana5/>} />
      <Route path="/FormVoluntario" element={<FormVoluntario/>} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from './LoginForm';
import HomePage from './HomePage';
import SignUp from './SignUp';
import Ajuda from './Ajuda';
import Novidades from './Novidades';
import MaisVendidos from './MaisVendidos';
import Promocoes from './Promocoes';
import Lojas from './Lojas';
import Contactos from './Contactos';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/LoginForm" element={<LoginForm />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/Ajuda" element={<Ajuda />} />
      <Route path="/Novidades" element={<Novidades />} />
      <Route path="/MaisVendidos" element={<MaisVendidos />} /> 
      <Route path="/Promocoes" element={<Promocoes />} />
      <Route path="/Lojas" element={<Lojas />} />
      <Route path="/Contactos" element={<Contactos />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

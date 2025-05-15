import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './HomePage';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import SobreNos from './SobreNos';
import Novidades from './Novidades';
import MaisVendidos from './MaisVendidos';
import Promocoes from './Promocoes';
import Lojas from './Lojas';
import Contactos from './Contactos';
import Conta from './Conta';
import Produtos from './Produtos';
import Compras from './Compras';
import Header from './Header';

function App() {
  const location = useLocation();

  // Lista de rotas que não devem exibir o Header
  const hideHeaderRoutes = ["/login", "/cadastro"];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SobreNos" element={<SobreNos />} />
        <Route path="/Novidades" element={<Novidades />} />
        <Route path="/MaisVendidos" element={<MaisVendidos />} />
        <Route path="/Promocoes" element={<Promocoes />} />
        <Route path="/Lojas" element={<Lojas />} />
        <Route path="/Contactos" element={<Contactos />} />
        <Route path="/Conta" element={<Conta />} />
        <Route path="/Produtos" element={<Produtos />} />
        <Route path="/Compras" element={<Compras />} />
      </Routes>
    </>
  );
}

export default App;

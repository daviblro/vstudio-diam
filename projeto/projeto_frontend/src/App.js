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
        <Route path="/login" element={<LoginForm />} />
        <Route path="/cadastro" element={<SignUp />} />
        <Route path="/sobre-nos" element={<SobreNos />} />
        <Route path="/novidades" element={<Novidades />} />
        <Route path="/mais-vendidos" element={<MaisVendidos />} />
        <Route path="/promocoes" element={<Promocoes />} />
        <Route path="/lojas" element={<Lojas />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/conta" element={<Conta />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/compras" element={<Compras />} />
      </Routes>
    </>
  );
}

export default App;

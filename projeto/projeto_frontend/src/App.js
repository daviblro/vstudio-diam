import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './PrivateRoute';
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
import GerirProdutos from './GerirProdutos';
import MinhasCompras from './MinhasCompras';
import CriarProduto from './CriarProduto';
import EditarProduto from './EditarProduto';
import DetalhesProduto from "./DetalhesProduto";
import Carrinho from "./Carrinho"
import Header from './Header';

function App() {
  const location = useLocation();

  // Lista de rotas que não devem exibir o Header
  const hideHeaderRoutes = ["/login", "/cadastro"];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
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
        <Route path="/produto/:id/:slug" element={<DetalhesProduto />} />
        <Route
          path="/conta"
          element={
            <PrivateRoute>
              <Conta />
            </PrivateRoute>
          }
        />
        <Route
          path="/minhas-compras"
          element={
            <PrivateRoute>
              <MinhasCompras />
            </PrivateRoute>
          }
        />
        <Route
          path="/gerir-produtos"
          element={
            <PrivateRoute>
              <GerirProdutos />
            </PrivateRoute>
          }
        />
        <Route
          path="/criar-produto"
          element={
            <PrivateRoute>
              <CriarProduto />
            </PrivateRoute>
          }
        />
        <Route
          path="/editar-produto/:id"
          element={
            <PrivateRoute>
              <EditarProduto />
            </PrivateRoute>
          }
        />
        <Route
          path="/carrinho"
          element={
            <PrivateRoute>
              <Carrinho />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

// Header.js (atualizado com layout central de 80vw)
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useState, useEffect } from "react";

import {
  FaUser,
  FaShoppingCart,
  FaSearch,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showMenuBar, setShowMenuBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/api/logout/", {
        withCredentials: true,
      });
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 0) {
        setShowMenuBar(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowMenuBar(false);
      } else if (currentScrollY < lastScrollY) {
        setShowMenuBar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div className="Header">
        <div className="HeaderContent">
          <img
            src={require("./img/monopoleo80x80.png")}
            alt="Erro ao carregar logo."
            className="logo"
            onClick={() => navigate("/")}
          />

          <div className="searchBar">
            <FaSearch className="searchIcon" />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="searchInput"
            />
          </div>

          <div className="userSection">
            <FaUser color="white" size={24} style={{ marginRight: "8px" }} />
            {user ? (
              <div className="dropdown">
                <button className="btn dropdown-toggle" onClick={() => setShowDropdown(prev => !prev)}>
                  Olá, {user.username}
                </button>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={() => navigate('/minhas-compras')}>Compras</button>
                    <button className="dropdown-item" onClick={() => navigate('/gerir-produtos')}>Gerir Produtos</button>
                    <button className="dropdown-item" onClick={() => navigate('/minha-conta')}>Conta</button>
                    <button className="dropdown-item" onClick={handleLogout}>Terminar Sessão</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/LoginForm">
                <button className="btn">Iniciar Sessão</button>
              </Link>
            )}
            <Link to="/">
              <button className="btn">
                <FaShoppingCart style={{ marginRight: "8px" }} />
                Carrinho
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className={`menuBar ${showMenuBar ? "show" : ""}`}>

        <div className="menuBarContent">
          <nav className="menuBarLeft">
            <Link to="/Menu" className="menuLinkMenu"><FaBars style={{ marginRight: "8px" }} />Menu</Link>
          </nav>
          <nav className="menuNav">
            <Link to="/Novidades" className="menuLink">Novidades</Link>
            <Link to="/Promocoes" className="menuLink">Promoções</Link>
            <Link to="/MaisVendidos" className="menuLink">Mais Vendidos</Link>
            <Link to="/Contactos" className="menuLink">Contactos</Link>
            <Link to="/Lojas" className="menuLink">Lojas</Link>
            <Link to="/SobreNos" className="menuLink">Sobre nós</Link>
          </nav>
        </div>

      </div>


    </>
  );
}

export default Header;

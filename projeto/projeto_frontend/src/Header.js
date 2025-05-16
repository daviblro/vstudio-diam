// Header.js (atualizado com layout central de 80vw)
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useState, useEffect, useRef } from "react";

import {
  FaUser,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showMenuBar, setShowMenuBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <>
      <div className="Header">
        <div className="HeaderContent">
          <div className="logo">
            <img
              src={require("./img/monopoleo80x80.png")}
              alt="Erro ao carregar logo."
              onClick={() => navigate("/")}
            />
          </div>

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
                    <button className="dropdown-item" onClick={() => { setShowDropdown(false); navigate('/minhas-compras') }}>Compras</button>
                    <button className="dropdown-item" onClick={() => { setShowDropdown(false); navigate('/gerir-produtos') }}>Gerir Produtos</button>
                    <button className="dropdown-item" onClick={() => { setShowDropdown(false); navigate('/conta') }}>Conta</button>
                    <button className="dropdown-item" onClick={handleLogout}>Terminar Sessão</button>
                  </div>
                )}
              </div>
            ) : (
              <button className="btn" onClick={() => navigate('/login')}>Iniciar Sessão</button>
            )}
            <button className="btn" onClick={() => navigate('/carrinho')}>
              <FaShoppingCart style={{ marginRight: "8px" }} />
              Carrinho
            </button>
          </div>
        </div>
      </div>

      <div className={`menuBar ${showMenuBar ? "show" : ""}`}>
        <div className="menuBarContent">
          <nav className="menuNav">
            <Link to="/novidades" className="menuLink">Novidades</Link>
            <Link to="/promocoes" className="menuLink">Promoções</Link>
            <Link to="/mais-vendidos" className="menuLink">Mais Vendidos</Link>
            <Link to="/contactos" className="menuLink">Contactos</Link>
            <Link to="/lojas" className="menuLink">Lojas</Link>
            <Link to="/sobre-nos" className="menuLink">Sobre nós</Link>
          </nav>
        </div>

      </div>


    </>
  );
}

export default Header;

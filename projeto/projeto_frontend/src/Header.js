import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { FaUser, FaShoppingCart, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Tenta obter o utilizador armazenado localmente
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/api/logout/", { withCredentials: true });
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <header className="Header">
      <Link to="/HomePage" className="logo">
        <button className="logo">Logo</button>
      </Link>

      <div className="searchBar">
        <FaSearch color="gray" className="searchIcon" />
        <input type="text" placeholder="Pesquisar..." className="searchInput" />
      </div>

      <div className="userSection">
        <FaUser color="white" size={24} style={{ marginRight: "8px" }} />
        {user ? (
          <>
            <span className="welcome">Olá, {user.username}</span>
            <button className="btn" onClick={handleLogout}>
              <FaSignOutAlt style={{ marginRight: "4px" }} />
              Sair
            </button>
          </>
        ) : (
          <Link to="/Login">
            <button className="btn">Iniciar Sessão</button>
          </Link>
        )}
      </div>

      <Link to="/Carrinho">
        <button className="btn">
          <FaShoppingCart style={{ marginRight: "8px" }} />
          Carrinho
        </button>
      </Link>
    </header>
  );
}

export default Header;

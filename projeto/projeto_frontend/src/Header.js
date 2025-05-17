import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);
  const [showMenuBar, setShowMenuBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/api/logout/", {
        withCredentials: true,
      });
      updateUser(null);
      toast.success("Logout bem-sucedido!");
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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

  useEffect(() => {
    if (searchText.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/search-products/?q=${searchText}`, {
          withCredentials: true,
        });
        setSuggestions(res.data.slice(0, 5)); // Limita no frontend
        setShowSearchDropdown(true);
      } catch (error) {
        console.error("Erro ao buscar sugestões:", error);
      }
    };

    fetchSuggestions();
  }, [searchText]);

  function slugify(text) {
    return text
      .toString()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .toLowerCase()
      .replace(/\s+/g, '-')           // Espaços para hífens
      .replace(/[^\w\-]+/g, '')       // Remove caracteres especiais
      .replace(/\-\-+/g, '-')         // Hífens duplos para simples
      .replace(/^-+/, '')             // Remove hífens do início
      .replace(/-+$/, '');            // Remove hífens do fim
  }

  return (
    <>
      <div className="Header">
        <div className="HeaderContent">
          <div className="logo">
            <img
              src={require("./img/monopoleo80.png")}
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
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/resultados-pesquisa/?q=${searchText}`, {
                    state: { searchText },
                  });
                  setShowSearchDropdown(false);
                }
              }}
            />
            {showSearchDropdown && suggestions.length > 0 && (
              <div className="searchDropdown">
                {suggestions.map((product) => (
                  <div
                    key={product.id}
                    className="searchItem"
                    onClick={() => {
                      navigate(`/produto/${product.id}/${slugify(product.name)}`);
                      setSearchText("");
                      setShowSearchDropdown(false);
                    }}
                  >
                    {product.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="userSection">
            {user ? (
              <div className="dropdown"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <button className="btn dropdown-toggle">
                  <FaUser color="white" size={24} style={{ marginRight: "8px" }} />
                  Olá, {user.username}
                </button>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setShowDropdown(false);
                        navigate("/minhas-compras");
                      }}
                    >
                      Compras
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setShowDropdown(false);
                        navigate("/gerir-produtos");
                      }}
                    >
                      Gerir Produtos
                    </button>
                    {user && user.is_staff && (
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/gerir-usuarios")}
                      >
                        Gerir Usuários
                      </button>
                    )}
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setShowDropdown(false);
                        navigate("/conta");
                      }}
                    >
                      Conta
                    </button>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Terminar Sessão
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="btn" onClick={() => navigate("/login")}>
                Iniciar Sessão
              </button>
            )}
            <button className="btn" onClick={() => navigate("/carrinho")}>
              <FaShoppingCart style={{ marginRight: "8px" }} />
              Carrinho
            </button>
          </div>
        </div>
      </div>

      <div className={`menuBar ${showMenuBar ? "show" : ""}`}>
        <div className="menuBarContent">
          <nav className="menuNav">
            <Link to="/novidades" className="menuLink">
              Novidades
            </Link>
            <Link to="/promocoes" className="menuLink">
              Promoções
            </Link>
            <Link to="/mais-vendidos" className="menuLink">
              Mais Vendidos
            </Link>
            <Link to="/contactos" className="menuLink">
              Contactos
            </Link>
            <Link to="/lojas" className="menuLink">
              Lojas
            </Link>
            <Link to="/sobre-nos" className="menuLink">
              Sobre nós
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;

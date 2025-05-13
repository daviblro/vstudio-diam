import { Link } from "react-router-dom";
import "./Header.css";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from 'react-icons/fa';  // 🛒 clássico
import { FaSearch } from 'react-icons/fa';  // 🛒 clássico


function Header() {
  return (
    <>
      <div className="Header">
        <Link to="/HomePage">
          <button className="logo">Our Store Logo</button>
        </Link>
        <div className="searchBar">
                      <FaSearch color="gray" className="searchIcon" />

          <input
            type="text"
            placeholder="Pesquisar..."
            className="searchInput"
          >
            </input>
        </div>
        <div className="userIcon">
          <FaUser color="white" size={24}/>
          <button className="btn">
            Olá!<br/>Inicie sessão
          </button>
        </div>
        <Link to="/">
          <button className="btn">
            <FaShoppingCart style={{ marginRight: '8px' }} />
                Carrinho
          </button>
        </Link>
      </div>
    </>
  );
}

export default Header;

  import { Link } from "react-router-dom";
  import "./Header.css";
  import { FaUser } from "react-icons/fa";
  import { FaShoppingCart } from "react-icons/fa"; // 🛒 clássico
  import { FaSearch } from "react-icons/fa"; // 🛒 clássico
  import{ FaBars } from "react-icons/fa"; // 🛒 clássico
  import { useState, useEffect } from "react";
  import Artistas from "./Artistas";
  import Artista from "./Artista"; // Importa o componente Artista


  function Header() {
    const [showMenuBar, setShowMenuBar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY <= 0) {
          setShowMenuBar(true); // Está no topo
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setShowMenuBar(false); // Rolar para baixo
        } else if (currentScrollY < lastScrollY) {
          setShowMenuBar(true); // Rolar para cima
        }
        setLastScrollY(currentScrollY);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
      <>
        <div className="Header">
          <Link to="/HomePage">
            <button className="logo">Our Store Logo</button>
          </Link>
          <div className="searchBar">
            <FaSearch className="searchIcon" />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="searchInput"
            />
          </div>
          <div className="userIcon">
            <FaUser color="white" size={24} />
            <button className="btn">
              Olá!
              <br />
              Inicie sessão
            </button>
          </div>
          <Link to="/">
            <button className="btn">
              <FaShoppingCart style={{ marginRight: "8px" }} />
              Carrinho
            </button>
          </Link>
        </div>
        <div className={`menuBar ${showMenuBar ? "show" : ""}`}>
          
          <nav className="menuNavMenu">
            <Link to="/Menu" className="menuLinkMenu">
              <FaBars style={{ marginRight: "8px" }} />
              Menu
            </Link>
          </nav>
          
          <nav className="menuNav">            
            <Link to="/novidades" className="menuLink">
              Novidades
            </Link>
            <Link to="/promocoes" className="menuLink">
              Promoções
            </Link>
            <Link to="/maisVendidos" className="menuLink">
              maisVendidos
            </Link>
            <Link to="/Contactos" className="menuLink">
              Contactos
            </Link>
            <Link to="/Lojas" className="menuLink">
              Lojas
            </Link>
            <Link to="/Ajuda" className="menuLink">
              Ajuda
            </Link>
          </nav>
        </div>

        {Artistas.map((artista) => (
          <Artista
            nome={artista.nome}
            imagem={artista.imagem}
            estilo={artista.estilo}
            descricao={artista.descricao}
            data={artista.data}
            hora={artista.hora}
            urlvideo={artista.urlvideo}
            id={artista.id}
            key={artista.id}
            length={Artistas.length - 1}
          />
        ))}
      </>
    );
  }

  export default Header;

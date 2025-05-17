import "./HomePage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import MainImages from "./MainImages";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [destaques, setDestaques] = useState([]);
  const [novidades, setNovidades] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/api/destaques/", { withCredentials: true })
      .then((res) => {
        setDestaques(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar produtos:", err);
      });
    axios.get("http://localhost:8000/api/novidades/", { withCredentials: true })
      .then((res) => {
        setNovidades(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar produtos:", err);
      });
  }, []);

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
    <div className="ajustarTopHomePage">
      <div className="HomePage">
        <div className="SeparatorTopPage"></div>
        <div className="MainImages">
          <MainImages />
        </div>
        <div className="Separator"></div>

        <div className="DestaqueSection">
          <div className="productSection">
            <h2>EM DESTAQUE</h2>
            <div className="productGrid">
              {destaques.length === 0 ? (
                <p>Não existem produtos disponíveis.</p>
              ) : (
                destaques.map((product) => (
                  <div
                    key={product.id}
                    className="productCard"
                    onClick={() => navigate(`/produto/${product.id}/${slugify(product.name)}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={product.image} alt={product.name} />
                    <p className="card-price">€{product.price}</p>
                    <h1 className="card-title">{product.name}</h1>
                    <div className="add-button">
                      <button>Adicionar ao Carrinho</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="NovosSection">
          <div className="productSection">
            <h2>NOVIDADES</h2>
            <div className="productGrid">
              {novidades.length === 0 ? (
                <p>Não existem produtos disponíveis.</p>
              ) : (
                novidades.map((product) => (
                  <div
                    key={product.id}
                    className="productCard"
                    onClick={() => navigate(`/produto/${product.id}/${slugify(product.name)}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={product.image} alt={product.name} />
                    <p className="card-price">€{product.price}</p>
                    <h1 className="card-title">{product.name}</h1>
                    <div className="add-button">
                      <button>Adicionar ao Carrinho</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HomePage;

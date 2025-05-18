import "./Novidades.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function Novidades() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/novidades/", { withCredentials: true })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar produtos:", err);
      });
  }, []);

  function slugify(text) {
    return text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .toLowerCase()
      .replace(/\s+/g, "-") // Espaços para hífens
      .replace(/[^\w\-]+/g, "") // Remove caracteres especiais
      .replace(/\-\-+/g, "-") // Hífens duplos para simples
      .replace(/^-+/, "") // Remove hífens do início
      .replace(/-+$/, ""); // Remove hífens do fim
  }

  return (
    <div className="Novidades">
      <div className="ajustarTopNovidades">
        <div className="titleNovidades">NOVIDADES</div>
        <div className="productSection">
          <h2>Dá uma olhada nas nossas mais recentes novidades!</h2>
          <div className="productGrid">
            {products.length === 0 ? (
              <p>Não existem produtos disponíveis.</p>
            ) : (
              products.map((product) => {
                const temPromocao = product.promotion_percentage > 0;
                return (
                  <div
                    key={product.id}
                    className="productCard"
                    onClick={() =>
                      navigate(
                        `/produto/${product.id}/${slugify(product.name)}`
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img src={product.image} alt={product.name} />
                    {temPromocao ? (
                      <>
                        <p
                          style={{ textDecoration: "line-through" }}
                          className="card-price"
                        >
                          €{product.price}
                        </p>
                        <p className="card-price-newPrice">
                          €
                          {(
                            product.price -
                            (product.price * product.promotion_percentage) / 100
                          ).toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <>
                        <p
                          style={{ color: "transparent" }}
                          className="card-price"
                        >
                          €{product.price}
                        </p>
                        <p className="card-price-newPrice">€{product.price}</p>
                      </>
                    )}
                    <h1 className="card-title">{product.name}</h1>
                    <div className="add-button">
                      <button>Adicionar ao carrinho</button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Novidades;

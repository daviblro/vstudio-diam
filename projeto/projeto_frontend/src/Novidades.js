import { use } from "react";
import "./Novidades.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";

 function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
  }

function Novidades() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/novidades/",
          {
            withCredentials: true,
            headers: {
              "X-CSRFToken": getCookie("csrftoken"),
            },
          }
        );
        setProducts(response.data); // guarda os produtos no state
      } catch (error) {
        console.error(error);
      }
    };

    fetchProdutos(); // chama a função ao carregar a página
  }, []);

  return (
    <>
      <Header />
      <div className="ajustarTop">
        <div className="Novidades">
          <div className="BGCinzento">
            <div className="produtosEmDestaque">
              <h2>EM DESTAQUE</h2>
              <div className="grid">
                {products.map((product) => (
                  <div key={product.id} className="card">
                    <img src={product.image} alt={product.name} />
                    <p className="card-price">{product.price}</p>
                    <h1 className="card-title">{product.name}</h1>
                    <div className="add-button">
                      <button>Add to Cart</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Novidades;

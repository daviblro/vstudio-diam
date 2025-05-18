import "./MaisVendidos.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function MaisVendidos() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/mais-vendidos/", {
        withCredentials: true,
      })
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
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }

  const addToCart = async (product, e) => {
    e.stopPropagation();

    const csrfToken = getCookie("csrftoken");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/cart-items/",
        {
          quantity: 1,
          product_id: product.id,
        },
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );

      toast.success(response.data.message); // Mensagem vinda do backend
    } catch (error) {
      console.error("Erro ao adicionar os produtos:", error);
      toast.error("Erro ao adicionar o produto ao carrinho.");
    }
  };

  return (
    <div className="MaisVendidos">
      <div className="ajustarTop">
        <div className="title">MAIS VENDIDOS</div>
        <div className="productSection">
          <h2>Estes são os produtos preferidos dos nossos clientes!</h2>
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
                      <button onClick={(e) => addToCart(product, e)}>Adicionar ao Carrinho</button>
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

export default MaisVendidos;

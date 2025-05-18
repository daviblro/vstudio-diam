import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Range } from "react-range";
import { useLocation } from "react-router-dom";
import "./ResultadosPesquisa.css"; // Importando o CSS para ResultadosPesquisa
import { toast } from "react-toastify";

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function ResultadosPesquisa() {
  const [products, setProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [maxPriceValue, setMaxPriceValue] = useState(10000); // valor padrão inicial
  const location = useLocation();
  const searchText = location.state?.searchText || "";
  const navigate = useNavigate();

  const handleCategoryChange = (categoriaId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoriaId)
        ? prevSelected.filter((id) => id !== categoriaId)
        : [...prevSelected, categoriaId]
    );
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.category)) &&
      product.name.toLowerCase().includes(searchText.toLowerCase()) &&
      product.price >= minPrice &&
      product.price <= maxPrice
  );

  useEffect(() => {

    axios
      .get(`http://localhost:8000/api/search-products/?q=${searchText}`, {
        withCredentials: true
      })
      .then((res) => {
        setProducts(res.data);
        if (res.data.length > 0) {
          const max = Math.max(...res.data.map((product) => product.price));
          setMaxPriceValue(max);
          setMaxPrice(max); // ajusta também o maxPrice para o limite inicial
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar produtos:", err);
      });

    axios
      .get("http://localhost:8000/api/categories/", { withCredentials: true })
      .then((res) => setCategorias(res.data))
      .catch((err) => console.error("Erro ao buscar categorias:", err));

  }, [searchText]);

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
    <div className="ResultadosPesquisa">
      <div className="ajustarTopo">
        <div className="titleResultadosPesquisa">Resultados</div>
        <div className="ResultadosPesquisaSection">
          <div className="content">
            <aside className="filters">
              <h2>Filtros</h2>
              <div>
                {categorias.length === 0 ? (
                  <p>Não existem categorias disponíveis.</p>
                ) : (
                  categorias.map((categoria) => (
                    <label
                      key={categoria.id}
                      htmlFor={`cat-${categoria.id}`}
                      className="clickableFilter"
                    >
                      <input
                        type="checkbox"
                        id={`cat-${categoria.id}`}
                        name={categoria.name}
                        checked={selectedCategories.includes(categoria.id)}
                        onChange={() => handleCategoryChange(categoria.id)}
                        className="checkboxFilter"
                      />
                      <span className="labelFilter">{categoria.name}</span>
                    </label>
                  ))
                )}
              </div>
              <div className="filterPrice">
                <div className="filterPriceContent">
                  <label className="labelRangePrice" htmlFor="priceRange">
                    Faixa de Preço
                  </label>
                  <div className="price-range-container">
                    <Range
                      step={10}
                      min={0}
                      max={maxPriceValue}
                      values={[minPrice, maxPrice]}
                      onChange={([newMin, newMax]) => {
                        setMinPrice(newMin);
                        setMaxPrice(newMax);
                      }}
                      renderTrack={({ props, children }) => (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: "6px",
                            width: "100%",
                            background: `linear-gradient(to right,
                              #ccc ${(minPrice / maxPriceValue) * 100}%,
                              #22c5e1 ${(minPrice / maxPriceValue) * 100}%,
                              #22c5e1 ${(maxPrice / maxPriceValue) * 100}%,
                              #ccc ${(maxPrice / maxPriceValue) * 100}%)`,
                            borderRadius: "4px",
                          }}
                        >
                          {children}
                        </div>
                      )}
                      renderThumb={({ props, index }) => (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: "16px",
                            width: "16px",
                            backgroundColor: "#22c5e1",
                            borderRadius: "50%",
                            outline: "none",
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="price-values">
                    <span>€{minPrice}</span> - <span>€{maxPrice}</span>
                  </div>
                </div>
              </div>
            </aside>
            <div className="productSection">
              <div className="productGrid">
                {filteredProducts.length === 0 ? (
                  <p>Não existem produtos disponíveis.</p>
                ) : (
                  filteredProducts.map((product) => {
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
                              €{" "}
                              {(
                                product.price -
                                (product.price * product.promotion_percentage) /
                                100
                              ).toFixed(2)}
                            </p>
                          </>
                        ) : (
                          <>
                            <p style={{ color: "transparent" }} className="card-price">€{product.price}</p>
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
      </div>
    </div>
  );
}

export default ResultadosPesquisa;

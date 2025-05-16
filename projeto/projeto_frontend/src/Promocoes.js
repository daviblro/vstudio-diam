import Header from "./Header";
import "./Promocoes.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Range } from "react-range";

function Promocoes() {
  const [products, setProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

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
      product.price >= minPrice &&
      product.price <= maxPrice
  );

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/novidades/", { withCredentials: true })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories/", { withCredentials: true })
      .then((res) => setCategorias(res.data))
      .catch((err) => console.error("Erro ao buscar categorias:", err));
  }, []);

  return (
    <>
      <Header />
      <div className="ajustarTopo">
        <div className="titlePromocoes">PROMOÇÕES</div>
        <div className="PromocoesBG">
          <div className="NovosSection">
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
                          style={{ width: "16px", height: "16px" }}
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
                        max={10000}
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
                              background: `linear-gradient(to right, #ccc ${
                                (minPrice / 10000) * 100
                              }%, #22c5e1 ${
                                (minPrice / 10000) * 100
                              }%, #22c5e1 ${(maxPrice / 10000) * 100}%, #ccc ${
                                (maxPrice / 10000) * 100
                              }%)`,
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
                <h2>
                  Não vais querer perder, só de 16/05/2025 até 31/05/2025.{" "}
                </h2>
                <h2>30% DESCONTO DIRETO, em artigos listados.</h2>
                <div className="productGrid">
                  {filteredProducts.length === 0 ? (
                    <p>Não existem produtos disponíveis.</p>
                  ) : (
                    filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="productCard"
                        onClick={() => navigate(`/produto/${product.id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <img src={product.image} alt={product.name} />
                        <p className="card-price">€{product.price}</p>
                        <p className="card-price-newPrice">
                          € {(product.price * 0.7).toFixed(2)}
                        </p>
                        <h1 className="card-title">{product.name}</h1>
                        <div className="add-button">
                          <button>Add to Cart</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Promocoes;

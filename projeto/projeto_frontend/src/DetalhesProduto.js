import { useEffect, useState } from "react";
import { useParams, useNavigate, data } from "react-router-dom";
import axios from "axios";
import "./DetalhesProduto.css";
import { toast } from "react-toastify";
import StarRating from "./StarRating";

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function DetalhesProduto() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const navigate = useNavigate();
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products-public/${id}/`, {
        withCredentials: true,
      })
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar produto:", err);
        navigate("/"); // volta à homepage se erro
      });
    axios
      .get(`http://localhost:8000/api/reviews/?product=${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setReviews(res.data);
        let sum = 0;
        reviews.map(item => sum += item.rating); 
        setAvgRating((sum / reviews.length).toFixed(2));
      })
      .catch((err) => {
        console.error("Erro ao buscar produto:", err);
        navigate("/"); // volta à homepage se erro
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getCookie("csrftoken");
    try {
      await axios.post(
        "http://localhost:8000/api/reviews/",
        {
          product: Number(id),
          rating,
          comment,
        },
        {
          headers: {
            "X-CSRFToken": token,
          },
          withCredentials: true,
        }
      );
      toast.success("Comentário enviado com sucesso!");
      setComment("");
      setRating(5);
      // Atualizar lista de comentários
      const res = await axios.get(
        `http://localhost:8000/api/reviews/?product=${id}`
      );
      setReviews(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar comentário: " + err.response.data.error);
    }
  };
  
  const addToCart = async (e) => {
    e.preventDefault();

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

  if (!product)
    return <div className="ProductDetail">Carregando produto...</div>;

  return (
    <div className="ProductDetail">
      <div className="ProductDetailContainer">
        <div className="ProductLeft">
          <div
            key={product.id}
            className="productCard"
            style={{ cursor: "pointer" }}
          >
            <img src={product.image} alt={product.name} />
            <h1 className="card-title">{product.name}</h1>

            {(product.promotion_percentage>0) ? (
              <>
                <p
                  style={{ textDecoration: "line-through"}}
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
                <p style={{ color: "transparent" }} className="card-price">
                  €{product.price}
                </p>
                <p className="card-price-newPrice">€{product.price}</p>
              </>
            )}
            <p>{avgRating} / 5.00</p>
            <StarRating rating={avgRating} />
            <p className="card-stock">
              {product.stock > 0 ? `${product.stock} em stock` : "Esgotado"}
            </p>
            <p className="card-description">{product.description}</p>
            <button className="AddToCartButton" onClick={addToCart}>
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
        <div className="ProductRight">
          <div className="ReviewSection">
            <h3>Avaliações</h3>
            {reviews.length === 0 ? (
              <p>Este produto ainda não foi avaliado.</p>
            ) : (
              reviews.map((review, index) => (
                <div key={index} className="ReviewItem">
                  <strong>{review.user.username}</strong> — {review.rating}★
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "#555",
                      marginLeft: "10px",
                    }}
                  >
                    ({new Date(review.created_at).toLocaleDateString("pt-PT")})
                  </span>
                  {review.comment && <p>{review.comment}</p>}
                </div>
              ))
            )}
          </div>

          {/* Formulário de avaliação */}
          <div className="ReviewForm">
            <h3>Deixe sua avaliação</h3>
            <form onSubmit={handleSubmit}>
              <label>Nota (1 a 5):</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <label>Comentário (opcional):</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button type="submit">Enviar Avaliação</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesProduto;

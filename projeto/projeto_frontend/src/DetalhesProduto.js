import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DetalhesProduto.css";
import { toast } from "react-toastify";

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

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products-public/${id}/`, {
            withCredentials: true,
        })
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.error("Erro ao buscar produto:", err);
                navigate("/"); // volta à homepage se erro
            });
        axios.get(`http://localhost:8000/api/reviews/?product=${id}/`, {
            withCredentials: true,
        })
            .then((res) => {
                setReviews(res.data);
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
                    product: id,
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
            const res = await axios.get(`http://localhost:8000/api/reviews/?product=${id}`);
            setReviews(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Erro ao enviar comentário.");
        }
    };

    const addToCart = async (e) => {
        e.preventDefault();

        const csrfToken = getCookie("csrftoken");

        try {
            const response = await axios.post("http://localhost:8000/api/cart-items/", {
                quantity: 1,
                product_id: product.id,
            }, {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": csrfToken,
                },
            });

            toast.success(response.data.message); // Mensagem vinda do backend
        } catch (error) {
            console.error("Erro ao adicionar os produtos:", error);
            toast.error("Erro ao adicionar o produto ao carrinho.");
        }
    };

    if (!product) return <div className="ProductDetail">Carregando produto...</div>;

    return (
        <div className="ProductDetail">
            <div className="ProductDetailContainer">
                <img
                    src={product.image}
                    alt={product.name}
                    className="ProductImage"
                />
                <div className="ProductInfo">
                    <h2>{product.name}</h2>
                    <p className="ProductPrice">€{product.price}</p>
                    <p className="ProductStock">
                        {product.stock > 0 ? `${product.stock} em stock` : "Esgotado"}
                    </p>
                    <p className="ProductDescription">{product.description}</p>
                    <button className="AddToCartButton" onClick={addToCart}>Adicionar ao Carrinho</button>
                </div>
            </div>
        </div>
    );
}

export default DetalhesProduto;

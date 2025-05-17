import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CriarProduto.css";

function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
}

function EditarProduto() {
    const { id } = useParams(); // ID do produto
    const navigate = useNavigate();
    const [mensagem, setMensagem] = useState("");
    const [categorias, setCategorias] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        promotion_percentage: 0,
        stock: "",
        category: "",
        image: null,
    });

    // Carregar dados do produto e categorias
    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}/`, { withCredentials: true })
            .then((res) => {
                const prod = res.data;
                setFormData({
                    name: prod.name,
                    description: prod.description,
                    price: prod.price,
                    promotion_percentage: prod.promotion_percentage,
                    stock: prod.stock,
                    category: prod.category, // se for ID
                    image: null, // não trazemos imagem como file
                });
            })
            .catch((err) => console.error("Erro ao carregar produto:", err));

        axios.get("http://localhost:8000/api/categories/", { withCredentials: true })
            .then((res) => setCategorias(res.data))
            .catch((err) => console.error("Erro ao carregar categorias:", err));
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const csrfToken = getCookie("csrftoken");

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && value !== "") data.append(key, value);
        });

        try {
            await axios.put(`http://localhost:8000/api/products/${id}/`, data, {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": csrfToken,
                    "Content-Type": "multipart/form-data",
                },
            });
            setMensagem("Produto atualizado com sucesso!");
            setTimeout(() => navigate("/gerir-produtos"), 1000);
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            setMensagem("Erro ao atualizar produto.");
        }
    };

    return (
        <div className="CriarProduto">
            <div className="CriarProdutoContainer">
                <h2>Editar Produto</h2>
                {mensagem && <p className="mensagem">{mensagem}</p>}
                <form onSubmit={handleSubmit} className="formulario-produto">
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Descrição:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <label>Preço (€):</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        step="0.01"
                        onChange={handleChange}
                        required
                    />

                    <label>Promoção (%):</label>
                    <input
                        type="number"
                        name="promotion_percentage"
                        value={formData.promotion_percentage}
                        onChange={handleChange}
                        min="0"
                        max="100"
                    />

                    <label>Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    />

                    <label>Categoria:</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione uma categoria</option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <label>Alterar Imagem:</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                    />

                    <button type="submit">Salvar Alterações</button>
                </form>
            </div>
        </div>
    );
}

export default EditarProduto;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CriarProduto.css";

function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
}

function CriarProduto() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        promotion_percentage: 0,
        stock: "",
        category: "", // ID da categoria
        image: null,
    });

    const [mensagem, setMensagem] = useState("");
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Carrega categorias do backend
        axios
            .get("http://localhost:8000/api/categories/", { withCredentials: true })
            .then((res) => setCategorias(res.data))
            .catch((err) => console.error("Erro ao carregar categorias:", err));
    }, []);

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
            await axios.post("http://localhost:8000/api/products/", data, {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": csrfToken,
                    "Content-Type": "multipart/form-data",
                },
            });

            setMensagem("Produto criado com sucesso!");
            navigate("/gerir-produtos");
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            setMensagem("Erro ao criar produto.");
        }
    };

    return (
        <div className="CriarProduto">
            <div className="CriarProdutoContainer">
                <h2>Criar Novo Produto</h2>
                {mensagem && <p className="mensagem">{mensagem}</p>}
                <form onSubmit={handleSubmit} className="formulario-produto">
                    <label>Nome:</label>
                    <input type="text" name="name" onChange={handleChange} required />

                    <label>Descrição:</label>
                    <textarea name="description" onChange={handleChange} required />

                    <label>Preço (€):</label>
                    <input type="number" name="price" step="0.01" onChange={handleChange} required />
                    
                    <label>Promoção (%):</label>
                    <input
                        type="number"
                        name="promotion_percentage"
                        onChange={handleChange}
                        min="0"
                        max="100"
                    />

                    <label>Stock:</label>
                    <input type="number" name="stock" onChange={handleChange} required />

                    <label>Categoria:</label>
                    <select name="category" onChange={handleChange} required>
                        <option value="">Selecione uma categoria</option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <label>Imagem do produto:</label>
                    <input type="file" name="image" accept="image/*" onChange={handleChange} />

                    <button type="submit">Criar Produto</button>
                </form>
            </div>
        </div>
    );
}

export default CriarProduto;

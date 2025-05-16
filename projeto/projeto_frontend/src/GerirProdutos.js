import { useEffect, useState } from "react";
import axios from "axios";
import "./GerirProdutos.css";
import { useNavigate } from "react-router-dom";

function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
}

function GerirProdutos() {
    const [produtos, setProdutos] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/products/", { withCredentials: true })
            .then((res) => {
                setProdutos(res.data);
            })
            .catch((err) => {
                console.error("Erro ao carregar produtos:", err);
                setMensagem("Erro ao carregar produtos.");
            });
    }, []);

    const deletarProduto = async (id) => {
        const confirm = window.confirm("Tem certeza que deseja excluir este produto?");
        if (!confirm) return;

        try {
            await axios.delete(`http://localhost:8000/api/products/${id}/`, {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                },
            });
            setProdutos(produtos.filter((p) => p.id !== id));
            setMensagem("Produto removido com sucesso.");
        } catch (err) {
            console.error("Erro ao deletar:", err);
            setMensagem("Erro ao excluir produto.");
        }
    };

    return (
        <div className="GerirProdutos">
            <div className="GerirProdutosContainer">
                <h2>Meus Produtos</h2>
                <button onClick={() => navigate("/criar-produto")} className="btn-criar-produto">
                    + Criar Novo Produto
                </button>
                {mensagem && <p className="mensagem">{mensagem}</p>}

                <div className="produtos-grid">
                    {produtos.length === 0 ? (
                        <p>Você ainda não tem produtos cadastrados.</p>
                    ) : (
                        produtos.map((produto) => (
                            <div key={produto.id} className="produto-card">
                                <img className="produto-card img" src={produto.image} alt={produto.name} />
                                <h3>{produto.name}</h3>
                                <p><strong>Preço:</strong> €{produto.price}</p>
                                <p><strong>Stock:</strong> {produto.stock}</p>

                                <div className="botoes">
                                    <button onClick={() => navigate(`/editar-produto/${produto.id}`)}>Editar</button>
                                    <button onClick={() => deletarProduto(produto.id)} className="btn-danger">Eliminar</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default GerirProdutos;

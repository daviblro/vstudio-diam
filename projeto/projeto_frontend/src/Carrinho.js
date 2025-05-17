import { useEffect, useState } from "react";
import axios from "axios";
import "./Carrinho.css";
import { toast } from "react-toastify";

function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
}

function Carrinho() {
    const [itens, setItens] = useState([]);
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/cart/", { withCredentials: true })
            .then((res) => {
                if (res.data.length > 0) {
                    setItens(res.data[0].items);
                } else {
                    setItens([]);
                }
            })
            .catch((err) => {
                console.error("Erro ao carregar o carrinho:", err);
                setMensagem("Erro ao carregar o carrinho.");
            });
    }, []);

    const removerItem = async (id) => {
        const confirmar = window.confirm("Deseja remover este item do carrinho?");
        if (!confirmar) return;

        try {
            await axios.delete(`http://localhost:8000/api/cart-items/${id}/`, {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                },
            });
            setItens(itens.filter((item) => item.id !== id));
            toast.success("Item removido com sucesso.");
        } catch (err) {
            console.error("Erro ao remover item:", err);
            toast.error("Erro ao remover item.");
        }
    };

    const diminuirQuantidade = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/cart-items/${id}/decrement/`, {}, {
                withCredentials: true,
                headers: { "X-CSRFToken": getCookie("csrftoken") }
            });
            // Atualiza o estado com a nova quantidade ou remove o item se deletado
            if (response.status === 200) {
                setItens((prevItens) =>
                    prevItens.map(item => item.id === id ? response.data : item)
                );
            } else if (response.status === 204) {
                setItens((prevItens) => prevItens.filter(item => item.id !== id));
            }
            toast.success("Item removido com sucesso.");
        } catch (error) {
            console.error("Erro ao diminuir quantidade:", error);
            toast.error("Erro ao remover item.");
        }
    };

    const finalizarCompra = async () => {
        const confirmar = window.confirm("Deseja finalizar a compra?");
        if (!confirmar) return;

        try {
            await axios.post("http://localhost:8000/api/checkout/", {}, {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                },
            });

            setItens([]);  // Esvazia o frontend também
            toast.success("Compra finalizada com sucesso!");
        } catch (err) {
            console.error("Erro ao finalizar compra:", err);
            if (err.response?.data?.error) {
                toast.error(err.response.data.error);
            } else {
                toast.error("Erro ao finalizar a compra.");
            }
        }
    };


    return (
        <div className="Carrinho">
            <div className="CarrinhoContainer">
                <h2>Meu Carrinho</h2>
                {mensagem && <p className="mensagem">{mensagem}</p>}

                {itens.length === 0 ? (
                    <p>O carrinho está vazio.</p>
                ) : (
                    itens.map((item) => (
                        <div key={item.id} className="item-card">
                            <img src={item.product.image} alt={item.product.name} />
                            <h3>{item.product.name}</h3>
                            <p><strong>Preço:</strong> €{item.product.price}</p>
                            <p><strong>Quantidade:</strong> {item.quantity}</p>
                            <div className="buttonLine">
                                <button onClick={() => removerItem(item.id)} className="btn-danger">
                                    Remover tudo
                                </button>
                                <button onClick={() => diminuirQuantidade(item.id)} className="btn-danger">Remover um</button>
                            </div>
                        </div>
                    ))
                )}

                {itens.length > 0 && (
                    <button className="btn-finalizar" onClick={finalizarCompra}>
                        Finalizar Compra
                    </button>
                )}
            </div>
        </div>
    );
}

export default Carrinho;

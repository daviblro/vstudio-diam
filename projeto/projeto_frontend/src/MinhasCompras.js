import { useEffect, useState } from "react";
import axios from "axios";
import "./MinhasCompras.css";

function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
}

function MinhasCompras() {
    const [compras, setCompras] = useState([]);
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/orders/", { withCredentials: true })
            .then((res) => {
                setCompras(res.data);
            })
            .catch((err) => {
                console.error("Erro ao carregar as compras:", err);
                setMensagem("Erro ao carregar as compras.");
            });
    }, []);

    return (
        <div className="MinhasCompras">
            <div className="MinhasComprasContainer">
                <h2>Minhas Compras</h2>
                {mensagem && <p className="mensagem">{mensagem}</p>}
                {compras.length === 0 ? (
                    <p>Você ainda não realizou nenhuma compra.</p>
                ) : (
                    compras.map((compra) => {
                        const total = compra.items.reduce(
                            (acc, item) => acc + item.price * item.quantity,
                            0
                        );

                        return (
                            <div key={compra.id} className="compra-card">
                                <h3>Pedido #{compra.id}</h3>
                                <p>Status: <strong>{compra.status}</strong></p>
                                <p>Data: {new Date(compra.created_at).toLocaleDateString()}</p>
                                <p className="total-compra">Total: €{total.toFixed(2)}</p>

                                <div className="itens-compra">
                                    {compra.items.map((item) => (
                                        <div key={item.id} className="item-compra">
                                            <img src={item.product.image} alt={item.product.name} />
                                            <div>
                                                <p><strong>{item.product.name}</strong></p>
                                                <p>Quantidade: {item.quantity}</p>
                                                <p>Preço unitário: €{Number(item.price).toFixed(2)}</p>
                                                <p>Subtotal: €{(Number(item.price) * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default MinhasCompras;

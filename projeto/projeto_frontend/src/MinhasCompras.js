import { useEffect, useState } from "react";
import axios from "axios";
import "./MinhasCompras.css";
import { toast } from "react-toastify";

function MinhasCompras() {
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/orders/", { withCredentials: true })
            .then((res) => {
                setCompras(res.data);
            })
            .catch((err) => {
                console.error("Erro ao carregar as compras:", err);
                toast.error("Erro ao carregar as compras.");
            });
    }, []);

    return (
        <div className="MinhasCompras">
            <div className="MinhasComprasContainer">
                <h2>Minhas Compras</h2>
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
                                                <p>Preço unitário: €{Number(item.price * ((100 - item.product.promotion_percentage)/100)).toFixed(2)}</p>
                                                <p>Subtotal: €{(Number(item.price * ((100 - item.product.promotion_percentage)/100)) * item.quantity).toFixed(2)}</p>
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

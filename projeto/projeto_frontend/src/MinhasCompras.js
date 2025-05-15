import { useEffect, useState } from "react";
import axios from "axios";

function MinhasCompras() {
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/orders/", { withCredentials: true })
            .then(res => setCompras(res.data))
            .catch(err => console.error("Erro ao buscar compras:", err));
    }, []);

    return (
        <div className="container">
            <h2>Minhas Compras</h2>
            {compras.length === 0 ? (
                <p>Você ainda não fez compras.</p>
            ) : (
                <ul>
                    {compras.map(order => (
                        <li key={order.id}>
                            Pedido #{order.id} - {order.status} - {new Date(order.created_at).toLocaleDateString()}
                            <ul>
                                {order.items.map(item => (
                                    <li key={item.id}>
                                        {item.product.name} — {item.quantity} x €{item.price}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MinhasCompras;

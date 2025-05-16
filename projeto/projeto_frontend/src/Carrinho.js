import { useEffect, useState } from "react";
import axios from "axios";

function Carrinho() {
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/cart/", { withCredentials: true })
            .then(res => setCompras(res.data))
            .catch(err => console.error("Erro ao buscar compras:", err));
    }, []);

    return (
        
        <div className="container">
            <h1>oi</h1> 
            <h1></h1>

            <h2>O meu carrinho</h2>
            {compras.length === 0 ? (
                <p>Você ainda não fez compras.</p>
            ) : (
                <ul>
                    {compras.map(cart => (
                        <li key={cart.id}>
                            Carrinho #{cart.id} de {cart.user.id} - {new Date(cart.created_at).toLocaleDateString()}
                            <ul>
                                {cart.items.map(item => (
                                    <li key={item.id}>
                                        {item.product.name} — {item.quantity} x €{item.product.price}
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

export default Carrinho;

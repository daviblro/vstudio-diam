import { useEffect, useState } from "react";
import axios from "axios";

function GerirProdutos() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/products/", { withCredentials: true })
            .then(res => {
                const user = JSON.parse(localStorage.getItem("user"));
                const meusProdutos = res.data.filter(p => p.owner?.id === user.id);
                setProdutos(meusProdutos);
            })
            .catch(err => console.error("Erro ao buscar produtos:", err));
    }, []);

    return (
        <div className="container">
            <h2>Gerir Meus Produtos</h2>
            {produtos.length === 0 ? (
                <p>Você ainda não tem produtos criados.</p>
            ) : (
                <ul>
                    {produtos.map(p => (
                        <li key={p.id}>
                            <strong>{p.name}</strong> — €{p.price}
                            {/* Aqui pode haver botões para editar/apagar */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default GerirProdutos;

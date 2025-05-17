import { useEffect, useState } from "react";
import axios from "axios";
import "./GerirUsuarios.css";
import { toast } from "react-toastify";

function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
}

function GerirUsuarios() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/users-management/", { withCredentials: true })
            .then((res) => {
                setUsuarios(res.data);
            })
            .catch((err) => {
                console.error("Erro ao carregar usuários:", err);
                toast.error("Erro ao carregar usuários.");
            });
    }, []);

    const deletarUsuario = async (id) => {
        const confirm = window.confirm("Tem certeza que deseja excluir este usuário?");
        if (!confirm) return;

        try {
            await axios.delete(`http://localhost:8000/api/users-management/${id}/`, {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                },
            });
            setUsuarios(usuarios.filter((u) => u.id !== id));
            toast.success("Usuário removido com sucesso.");
        } catch (err) {
            console.error("Erro ao deletar usuário:", err);
            toast.error("Erro ao excluir usuário.");
        }
    };

    return (
        <div className="GerirUsuarios">
            <div className="GerirUsuariosContainer">
                <h2>Gerenciamento de Usuários</h2>
                <div className="usuarios-grid">
                    {usuarios.length === 0 ? (
                        <p>Não há usuários cadastrados.</p>
                    ) : (
                        usuarios.map((usuario) => (
                            <div key={usuario.id} className="usuario-card">
                                <h3>{usuario.username}</h3>
                                <p><strong>Email:</strong> {usuario.email}</p>
                                <p><strong>Nome:</strong> {usuario.first_name} {usuario.last_name}</p>

                                <div className="botoes">
                                    {/* Se quiser pode criar uma página de editar usuário */}
                                    {/* <button onClick={() => navigate(`/editar-usuario/${usuario.id}`)}>Editar</button> */}
                                    <button onClick={() => deletarUsuario(usuario.id)} className="btn-danger">Excluir</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default GerirUsuarios;

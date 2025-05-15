import { useState } from "react";
import axios from "axios";
import "./Conta.css";

function Conta() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [username, setUsername] = useState(storedUser.username);
    const [firstName, setFirstName] = useState(storedUser.first_name || "");
    const [lastName, setLastName] = useState(storedUser.last_name || "");
    const [editMode, setEditMode] = useState(false);
    const [message, setMessage] = useState("");
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    function getCookie(name) {
        const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
        return match ? match[2] : null;
    }

    const handleSave = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/users/${storedUser.id}/`,
                {
                    username,
                    first_name: firstName,
                    last_name: lastName,
                    email: storedUser.email,
                },
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            );
            setMessage("Dados atualizados com sucesso.");
            localStorage.setItem("user", JSON.stringify(response.data));
            setEditMode(false);
        } catch (err) {
            setMessage("Erro ao atualizar dados.");
            console.error(err);
        }
    };

    const handlePasswordChange = async () => {
        if (newPassword !== confirmNewPassword) {
            setMessage("A nova senha e a confirmação não coincidem.");
            return;
        }

        try {
            console.log("Cookies enviados:", document.cookie);

            const response = await axios.post(
                "http://localhost:8000/api/change-password/",
                {
                    old_password: currentPassword,
                    new_password: newPassword,
                },
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            );

            setMessage(response.data.message);
            setShowPasswordForm(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
        } catch (err) {
            if (err.response && err.response.data) {
                const data = err.response.data;
                let msg = "";
                if (typeof data.error === "string") {
                    msg = data.error;
                } else if (typeof data.message === "string") {
                    msg = data.message;
                } else {
                    msg = Object.values(data).flat().join(" ");
                }
                setMessage("Erro ao alterar senha: " + msg);
            } else {
                setMessage("Erro na comunicação com o servidor.");
            }
            console.error(err);
        }
    };


    return (
        <div className="Conta">
            <div className="ContaContainer">
                <h2>Minha Conta</h2>
                {editMode ? (
                    <>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nome de usuário"
                        />
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Primeiro nome"
                        />
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Último nome"
                        />
                        <input value={storedUser.email} disabled />
                        <div className="buttonLine">
                            <button className="editarButton" onClick={handleSave}>Salvar</button>
                            <button className="editarButton" onClick={() => setEditMode(false)}>Cancelar</button>
                        </div>
                    </>
                ) : (
                    <>
                        <ul>
                            <li><strong>Nome de usuário:</strong> {username}</li>
                            <li><strong>Primeiro nome:</strong> {firstName}</li>
                            <li><strong>Último nome:</strong> {lastName}</li>
                            <li><strong>Email:</strong> {storedUser.email}</li>
                        </ul>
                        <div className="buttonLine">
                            <button className="editarButton" onClick={() => setEditMode(true)}>Editar Dados</button>
                            <button
                                className="editarButton"
                                onClick={() => setShowPasswordForm(!showPasswordForm)}
                            >
                                {showPasswordForm ? "Cancelar" : "Alterar Senha"}
                            </button>
                        </div>
                    </>
                )}



                {showPasswordForm && (
                    <div className="changePasswordForm">
                        <input
                            type="password"
                            placeholder="Senha atual"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Nova senha"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirmar nova senha"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                        <button className="editarButton" onClick={handlePasswordChange}>
                            Salvar Senha
                        </button>
                    </div>
                )}
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default Conta;

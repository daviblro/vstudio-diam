import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css"
import { toast } from "react-toastify";

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const navigate = useNavigate();

    function getCookie(name) {
        const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
        return match ? match[2] : null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            toast.error("As senhas não coincidem.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/signup/", { username, email, password },
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                });

            if (response.data.success) {
                toast.success("Conta criada com sucesso!");
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/login", { state: { email, password } });
            } else {
                toast.error("Erro: " + response.data.message);
            }
        } catch (error) {
            toast.error("Erro ao comunicar com o servidor.");
            console.error(error);
        }
    };

    return (
        <div className="signUp">
            <div className="SignUpContainer">
                <h2>Cadastro</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="labelLogin" htmlFor="username">Nome:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="labelLogin" htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="labelLogin" htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="labelLogin" htmlFor="passwordConfirm">Confirmar Senha:</label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            required
                        />
                    </div>
                    <div className="buttonLine">
                        <button onClick={() => navigate("/login")}>Voltar</button>
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;

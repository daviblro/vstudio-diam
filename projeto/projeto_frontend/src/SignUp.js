import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css"

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [csrfToken, setCsrfToken] = useState("");

    useEffect(() => {
        // Busca o CSRF token do endpoint backend
        axios
            .get("http://localhost:8000/api/csrf/", { withCredentials: true })
            .then((response) => {
                setCsrfToken(response.data.csrfToken);
            })
            .catch((error) => {
                console.error("Erro ao buscar CSRF token:", error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            setMessage("As senhas não coincidem.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/signup/", { username, email, password },
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": csrfToken,
                    },
                });

            if (response.data.success) {
                setMessage("Conta criada com sucesso!");
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/", { state: { email, password } });
            } else {
                setMessage("Erro: " + response.data.message);
            }
        } catch (error) {
            setMessage("Erro ao comunicar com o servidor.");
            console.error(error);
        }
    };

    return (
        <div className="signUp">
            <div className="SignUpContainer">
                <h2>Login</h2>
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
                    <button onClick={() => navigate("/")}>Voltar</button>
                    <button type="submit">Sign Up</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default SignUp;

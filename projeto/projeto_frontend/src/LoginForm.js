import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    if (location.state) {
      const { email: emailFromSignup, password: passwordFromSignup } = location.state;
      if (emailFromSignup) setEmail(emailFromSignup);
      if (passwordFromSignup) setPassword(passwordFromSignup);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login/",
        { email, password },
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );

      if (response.data.success) {
        setMessage("Login bem-sucedido!");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/HomePage", { state: { user: response.data.user } });
      } else {
        setMessage("Login falhou: " + response.data.message);
      }
    } catch (error) {
      setMessage("Erro na comunicação com o servidor.");
      console.error(error);
    }
  };

  return (
    <body className="loginForm">
      <div className="loginContainer">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="labelLogin" htmlFor="email">
              Email:
            </label>
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
            <label className="labelLogin" htmlFor="password">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Log In</button>
          <button onClick={() => navigate("/SignUp")}>Sign Up</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </body>
  );
}

export default LoginForm;

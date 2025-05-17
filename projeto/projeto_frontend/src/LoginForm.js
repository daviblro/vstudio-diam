import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginForm.css";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "./UserContext";

function LoginForm() {
  const { updateUser } = useContext(UserContext);
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      const { email: emailFromSignup, password: passwordFromSignup } = location.state;
      if (emailFromSignup) setEmail(emailFromSignup);
      if (passwordFromSignup) setPassword(passwordFromSignup);
    }
  }, [location.state]);

  function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login/",
        { email, password },
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": getCookie("csrftoken"),
          },
        }
      );

      if (response.data.success) {
        toast.success("Login bem-sucedido!");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        updateUser(response.data.user); // Atualiza o estado global do user
        navigate("/", { state: { user: response.data.user } });
      } else {
        toast.error("Login falhou: " + response.data.message);
      }
    } catch (error) {
      // aqui cai quando status >=300 ou rede falhou
      if (error.response) {
        // recebemos resposta do servidor (p.ex. status 400)
        const data = error.response.data;
        // pode ser que message venha como objecto
        let msg = "";
        if (typeof data.message === "string") {
          msg = data.message;
        } else {
          // por exemplo { non_field_errors: ["Credenciais inválidas."] }
          msg = Object.values(data.message)
            .flat()
            .join(" ");
        }
        toast.error("Login falhou: " + msg);
      } else {
        // erro de rede mesmo
        toast.error("Erro na comunicação com o servidor.");
      }
      console.error(error);
    }
  };

  return (
    <div className="loginForm">
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
          <div className="buttonLine">
            <button type="submit">Log In</button>
            <button onClick={() => navigate("/cadastro")}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

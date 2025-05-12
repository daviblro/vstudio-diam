import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./LoginForm.css"

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {username, password}, {withCredentials: true});

            if (response.data.message === 'Logged in successfully') {
                setMessage('Login bem-sucedido!');
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/HomePage', { state: { user: response.data.user } });
            } else {
                setMessage('Login falhou: ' + response.data.message);
            }
        } catch (error) {
            setMessage('Erro na comunicação com o servidor.');
            console.error(error);
        }
    };

    return (
        <div className="loginContainer">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="labelLogin" htmlFor="username">Email:</label>
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
                <button type="submit">Log In</button>
                <button onClick={() => navigate('/SignUp')}>Sign Up</button>

            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default LoginForm;

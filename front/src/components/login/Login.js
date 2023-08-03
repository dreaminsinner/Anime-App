import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

import './Login.css';
import {saveIsAuthenticatedToSessionStorage} from "../../utils/auth-helper";
import {useDispatch} from "react-redux";
import {setAuthenticated, setId, setRole, setToken} from "../../Redux/actions";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', {username, password});
            const token = response.data.token;
            const role = response.data.role;
            const id = response.data.id;
            saveIsAuthenticatedToSessionStorage(true, token, role, id);
            dispatch(setAuthenticated(true));
            dispatch(setRole(role));
            dispatch(setToken(token));
            dispatch(setId(id));
            navigate('/');
        } catch (error) {
            setError(error.response.data);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="login-button">Login</button>
                <div className="register-link">
                    Don't have an account? <Link to="/registration">Register here</Link>
                </div>
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
};

export default Login;
import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import './Register.css';
import {saveIsAuthenticatedToSessionStorage} from "../../utils/auth-helper";
import {setAuthenticated, setId, setRole, setToken} from "../../Redux/actions";
import {useDispatch} from "react-redux";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/registration', {
                username,
                password,
                passwordConfirmation,
                email
            });
            const token = response.data.token;
            const role = response.data.role;
            const id = response.data.id;
            saveIsAuthenticatedToSessionStorage(true, token, role, id);
            dispatch(setAuthenticated(true));
            dispatch(setRole(role));
            dispatch(setId(id));
            dispatch(setToken(token));
            navigate('/');
        } catch (error) {
            setError(error.response.data);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="passwordConfirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Register</button>
                {error && <div className="error-message">{error}</div>}
                <p>Already have an account? <Link to="/login">Log in here</Link></p>
            </form>
        </div>
    );
};

export default Register;

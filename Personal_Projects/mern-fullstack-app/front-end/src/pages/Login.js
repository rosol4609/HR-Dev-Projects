import React, { useState } from 'react';
import FormContainer from '../components/Form/FormContainer';
import Input from '../components/Form/Input';
import Button from '../components/Form/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);  

        try {
            await login(identifier, password);
            navigate('/welcome');
            setMessage('Login successful');  
        } catch (error) {
            setError(error); 
            console.log('Error logging in:', error);
        }
    };

    return (
        <FormContainer>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Username or Email"
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button type="submit">Login</Button>
                {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
                <p>Don't have an account? <a href="/register">Register</a></p>
            </form>
            {message && <p>{message}</p>}
        </FormContainer>
    );
}

export default Login;

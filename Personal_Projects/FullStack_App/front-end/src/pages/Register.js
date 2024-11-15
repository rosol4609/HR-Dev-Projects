import React, { useState } from 'react';
import FormContainer from '../components/Form/FormContainer';
import Input from '../components/Form/Input';
import Button from '../components/Form/Button';

function Register() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, username, email, password , phone_number}),
            });
            if(!response.ok) {
                throw new Error('Failed to register user');
            }
            setName('');
            setSurname('');
            setUsername('');
            setPassword('');
            setEmail('');
            setPhone_number('');
            setMessage('User registered successfully');
        } catch (error) {
            console.log('Error registering user:', error);
            setError(error);
        }
    };

    return (
        <FormContainer>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder={'Name'}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder={'Surname'}
                    value={surname}
                    onChange={e => setSurname(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder={'Username'}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder={'Password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Input
                    type="email"
                    placeholder={'Email'}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input
                    type="tel"
                    placeholder={'Phone Number'}
                    value={phone_number}
                    onChange={e => setPhone_number(e.target.value)}
                />
                <Button type="submit">Register</Button>
                {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
            </form>
            {message && <p style={{ color: '#28a745'}}>{message}</p>}
        </FormContainer>
    );
}

export default Register;
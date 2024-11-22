import React, { useEffect , useState } from 'react';
import FormContainer from '../components/Form/FormContainer';
import '../components/Form/formStyles.css';

function Welcome() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user);
    }, []);

    if (!user) {
        return <p>Loading...</p>
    }

    const { name, email } = user;

    return (
        <FormContainer title="Welcome!">
            <h5>{email || 'No email avalible'}</h5>
            <h2>Welcome to the App</h2>
            <p style={{ textAlign: 'center', color: '#555', fontSize: '1rem' }}>
                Hello, {name || 'User'}! Explore our app using the navigation. We’re excited to have you on board!
            </p>
        </FormContainer>

    );
}

export default Welcome;

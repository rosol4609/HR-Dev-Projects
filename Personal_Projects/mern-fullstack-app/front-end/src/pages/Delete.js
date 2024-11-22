import React, { useState } from 'react';
import FormContainer from '../components/Form/FormContainer';
import Input from '../components/Form/Input';
import Button from '../components/Form/Button';

function Delete() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/delete_user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsername('');
      setMessage('User deleted successfully');
      setError(null);
    } catch (error) {
      console.log('Error deleting user:', error);
      setError(error);
    }
  };

  return (
    <FormContainer title="Delete User">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button>Delete</Button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {message && <p style={{ color: '#28a745'}}>{message}</p>}
    </FormContainer>
  );
}

export default Delete;

import React, { useEffect, useState } from 'react';
import FormContainer from '../components/Form/FormContainer';
import '../components/Form/formStyles.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect( () => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <FormContainer title="Registered Users">
    {error ? (
      <p style={{ color: 'red' }}>Error: {error.message}</p>
    ) : (
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f1f1' }}>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </FormContainer>
  );
}

export default UserList;


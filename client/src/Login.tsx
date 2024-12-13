import { useState, useEffect } from 'react';
import './index.css';

function Login() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users') // Dodajte '/' ispred API rute
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                return response.json();
            })
            .then(data => setUsers(data))
            .catch(err => console.error('Error:', err));
    }, []);

    return (
        <div>
            <h2>List of Users:</h2>
            <div id="listUsers">
                {users.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <ul>
                        {users.map((user) => (
                            <li key={user.actorID}>
                                <p><strong>ID:</strong> {user.actorID}</p>
                                <p><strong>Name:</strong> {user.actorName}</p>
                                <p><strong>Surname:</strong> {user.actorSurname}</p>
                                <p><strong>Email:</strong> {user.actorEmail}</p>
                                <p><strong>Role:</strong> {user.actorRole}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    );
}

export default Login;

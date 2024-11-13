// src/pages/SignIn.tsx
import React, { useState } from 'react';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = () => {
    // Ovdje možete dodati logiku za autentifikaciju
    console.log('Korisničko ime:', username);
    console.log('Lozinka:', password);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Sign In</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>Prijavi se</button>
      </form>
    </div>
  );
};

export default SignIn;

// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>AI Research Lab Management</h1>
      <Link to="/signin">
        <button style={{ padding: '10px 20px', fontSize: '16px' }}>SIGN IN</button>
      </Link>
    </div>
  );
};

export default Home;

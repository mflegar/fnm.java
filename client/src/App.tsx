import { Route, Routes } from 'react-router-dom';
import UserForm from './UserForm';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';
import './App.css';
import Login from './Login'
import Header from './Header';
import SessionChecker from './SessionChecker';
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<ProtectedRoute><UserForm /></ProtectedRoute>} />
        <Route path="/researcher" element={<ProtectedRoute><h2>Researcher!</h2></ProtectedRoute>} />
        <Route path="/institution-manager" element={<ProtectedRoute><h2>Institution!</h2></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Login /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App;

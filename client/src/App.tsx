import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './UserForm';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';
import './App.css';  // Importiraj CSS za App
import ArxivSearch from './Arxiv';
const App = () => {
    return (
        <Router>
            <Routes>
                {/* Starting page */}
                <Route path="/" element={<Home />} />  {/* Početna stranica */}

                {/* Protected routes (need to be signed in to github) */}
                <Route path="/form" element={<ProtectedRoute><UserForm /></ProtectedRoute>} />
                <Route path="/researcher" element={<ProtectedRoute><h2>Researcher!</h2></ProtectedRoute>} />
                <Route path="/institution-manager" element={<ProtectedRoute><h2>Institution!</h2></ProtectedRoute>} />
          <Route path="/form" element={<ProtectedRoute><ArxivSearch /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

export default App;

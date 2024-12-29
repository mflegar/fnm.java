import './init.tsx';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './UserForm';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';
import './App.css';
import ArxivSearch from './Arxiv';
import InstitutionForm from "./InstitutionForm.tsx";
import Researcher from './Researcher.tsx';
import InstitutionManager from './InstitutionManager.tsx';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Starting page */}
                <Route path="/" element={<Home />} />  {/* Početna stranica */}

                {/* Protected routes (need to be signed in to github) */}
                <Route path="/form" element={<ProtectedRoute><UserForm /></ProtectedRoute>} />
                <Route path="/researcher" element={<ProtectedRoute><h2><Researcher /></h2></ProtectedRoute>} />
                <Route path="/institution-form" element={<ProtectedRoute><h2><InstitutionForm /></h2></ProtectedRoute>} />
                <Route path="/institution-manager" element={<ProtectedRoute><h2><InstitutionManager /></h2></ProtectedRoute>} />
                <Route path="/search" element={<ProtectedRoute><ArxivSearch /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

export default App;

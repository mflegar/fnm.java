import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './UserForm';
import Researcher from './Researcher';
import InstitutionManager from './InstitutionManager';
import './App.css';  // Importiraj CSS za App

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h2>Home Page</h2>} />  {/* Početna stranica */}
                <Route path="/form" element={<UserForm />} />  {/* Forma na /form */}
                <Route path="/researcher" element={<Researcher />} />  {/* Stranica za Researcher */}
                <Route path="/institution-manager" element={<InstitutionManager />} />  {/* Stranica za Institution Manager */}
            </Routes>
        </Router>
    );
};

export default App;

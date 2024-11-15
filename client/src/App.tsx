import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './UserForm';
import './App.css';  // Importiraj CSS za App

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h2>Home Page</h2>} />  {/* Pocetna stranica */}
                <Route path="/form" element={<UserForm />} />  {/* Forma na /form */}
                <Route path="/researcher" element={<h2>Researcher!</h2>} />  {/* Stranica za Researcher */}
                <Route path="/institution-manager" element={<h2>Institution!</h2>}/> {/* Stranica za Institution Manager */}
            </Routes>
        </Router>
    );
};

export default App;

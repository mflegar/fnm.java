import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';     //Dohvati glavnu stranicu. Naslov i SIGN IN.
import SignIn from './pages/SignIn';
import Researcher from './pages/Reseacrher';
import Institution from './pages/Institution';



//Ovdje definiram odlazak do Home page-a i do sign in-a.

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/researcher"  element={<Researcher />} />
      <Route path="/institution" element={<Institution/>}/>

    </Routes>
  );
};

export default App;

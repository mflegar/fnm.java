import { Link } from 'react-router-dom';
import '../index.css';
//Ovo je glavna stranica. Tu nam je cilj samo prikazati naslov i gumb SIGN IN.
//To sve ide u jedan div samo.
//Gumb sign in nas vodi do rute za prijavu. Tu korisnik dalje bira hoće li biti researcher ili institution leader.

function Home(){
  return (
    <div>
      <h1>AI Research Lab Management</h1>
      <Link to="/signin">
        <button>SIGN IN</button> 
      </Link>
    </div>
  );
};

export default Home;

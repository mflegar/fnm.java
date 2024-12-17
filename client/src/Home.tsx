import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const navigate = useNavigate();

    // Provjera autentifikacije korisnika
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch("/api/user-info", { credentials: "include" });
                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch {
                setIsAuthenticated(false);
            }
        };

        checkAuthentication();
    }, []);

    // Preusmjerivanje korisnika nakon autentifikacije
    useEffect(() => {
        if (isAuthenticated) {
            const fromPage = sessionStorage.getItem('from') || '/form';
            sessionStorage.removeItem('from');
            navigate(fromPage, { replace: true });
        }
    }, [isAuthenticated, navigate]);

    // Prikaz loadera dok traje provjera autentifikacije
    if (isAuthenticated === null) {
        return <div className="loader">Loading...</div>;
    }

    // Ako korisnik nije prijavljen, ponudi opciju za prijavu
    const handleGitHubLogin = () => {
        window.location.href = 'http://localhost:8780/oauth2/authorization/github';
    };

    return (
        <div className="home-container" style={{backgroundImage:`url()`}}>
            <h1>AI Research Lab Managment</h1>
            <button onClick={handleGitHubLogin} className="login-button">
               LOGIN WITH GITHUB
            </button>
        </div>
    );
};

export default Home;

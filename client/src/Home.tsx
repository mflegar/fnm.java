import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Home.css";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  // Provjera autentifikacije korisnika
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("/api/user-info", {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          // Spremanje korisničkih podataka (bez tokena) u LocalStorage
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: userData.id,
              email: userData.email,
              username: userData.username,
            })
          );

          // Spremanje tokena zasebno u LocalStorage
          localStorage.setItem("token", userData.token);

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
      //const fromPage = sessionStorage.getItem('from') || '/form';
      sessionStorage.removeItem("from");
      //navigate(fromPage, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Prikaz loadera dok traje provjera autentifikacije
  if (isAuthenticated === null) {
    return <div className="loader">Loading...</div>;
  }

  // Ako korisnik nije prijavljen, ponudi opciju za prijavu
  const handleGitHubLogin = () => {
    window.location.href = "http://localhost:8780/oauth2/authorization/github";
  };

  return (
    <>
      <div className="home-container">
        <img src="/images/Logo.png"></img>
        <p id="text">
          AIReLM is an application that enables good organization and monitoring
          of the flow while working on a specific project. To get started, you
          have to login!
        </p>
        <button onClick={handleGitHubLogin} className="login-button">
          Login with GitHub
        </button>
      </div>
    </>
  );
};

export default Home;

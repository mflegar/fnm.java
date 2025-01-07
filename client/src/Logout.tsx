import "./Logout.css";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token"); // Dohvati token iz localStorage
    console.log(userData);
    console.log(token);

    try {
      // Pošalji zahtjev za odjavu prema backendu
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include", // Uključi kolačiće
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Dodaj Bearer token u zaglavlje
        },
      });

      if (response.ok) {
        console.log("Session and cookies cleared!");
      } else {
        console.error("Logout failed on the backend.");
      }

      // Ukloni korisničke podatke iz localStorage bez obzira na odgovor
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      console.log("Deleted!");
      console.log(localStorage);
    } catch (error) {
      console.error("Error during logout:", error);
    }

    // Navigiraj korisnika na početnu stranicu
    navigate("/");
  };

  return (
    <>
      <div className="logout-container">
        <img src="/images/Logo.png" alt="Logo" />
        <p id="text">Thank you for using our application. Hope you are pleased!</p>
        <button className="login-button" onClick={handleLogout} >Logout</button>
      </div>
    </>
  );
};

export default Logout;

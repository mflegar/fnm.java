import "./Logout.css";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token"); // Dohvati token iz localStorage

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
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

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Error during logout:", error);
    }

    navigate("/");
  };

  return (
    <>
      <div className="logout-container">
        <img src="/images/Logo.png" alt="Logo" />
        <p id="text">
          Thank you for using our application. Hope you are pleased!
        </p>
        <button className="login-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Logout;

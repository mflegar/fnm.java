import { Button } from "@/components/ui/button"
import "./Logout.css";
import { useNavigate } from "react-router";



 
//Ova funkcija trenutno samo vraća korinsika na početnu rutu.
const Logout=()=>{

   const navigate=useNavigate();
   const handleLogout=()=>{
     navigate("/");
     
  }

return (
    <>
    <div className="logout-container">
    <img src="/images/Logo.png"></img>
    <p id="text">Thank you for using our application. Hope you are pleased!</p>
    <Button onClick={handleLogout}>Logout</Button>
    </div>
  </>
)
};

export default Logout;


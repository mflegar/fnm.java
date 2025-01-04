import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Logout.css";

function Logout(){

return (
    <>
   
    <div className="logout-container">
    <img src="/images/LogoApp.png" id="slika"></img>
      <p>Thank you for using our application! Hope you are pleased!</p>
      <button type="submit">
       Logout
      </button>
    </div>
    </>
  );
};

export default Logout;
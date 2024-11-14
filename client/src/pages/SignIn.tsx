// src/pages/SignIn.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

//Ovdje imamo formu za unos imena, prezimena i odabir uloge koju korisnik želi odabrati.

function SignIn(){
  return(
    <>
   <h1>Choose your role!</h1>
   <div id="registrationDiv">
   <form>
   <div> 
   <input type="text" name="userName" placeholder="Enter your name"></input>
   </div>
   <div>
   <input type="text" name="userSurname" placeholder="Enter your surname"></input>
   </div>
   <div>
   <input type="text" name="email" placeholder="Enter your email"></input>
   </div>
   </form> 
   </div>
   <Link to="/institution"><button>Institution leader</button></Link>
   <Link to="/researcher"><button>Researcher</button></Link>
   </>
   

  );

}

export default SignIn;

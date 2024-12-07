// src/pages/SignIn.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useEffect} from 'react'
import '../index.css';



function Login(){ //Dohvaća korisnike iz baze.
  const [users, setUser]=useState([])

  useEffect(()=>{
    fetch('api/users')
    .then(response=>response.json())
    .then(data=>setUser(data))
    .catch(err=>console.log(err))
   
  },[])


  return(
    <>
    <div id="listUsers">
      <p>List of users:</p>
      <ul>
        {users.map((list,index)=> (
          <li></li>

        ))}
      </ul>
    </div>
      <button>LOG OUT</button> 
    </>
   

  );

}

export default Login;

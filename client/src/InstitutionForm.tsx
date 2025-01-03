import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./InstitutionForm.css";

const InstitutionForm = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  //const id = Number(sessionStorage.getItem('userID'));
  const id = 1;

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", { name, link, id });

    const institutionData = {
      name,
      link,
      id,
    };

    console.log("Institution data being sent:", institutionData);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("/api/institution/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(institutionData), // Institution data
      });

      if (response.ok) {
        console.log("Institution data successfully sent to backend");
        const data = await response.text();
        console.log("Response from backend:", data);
        navigate("/institution-manager");
      } else {
        console.error("Error sending data to backend");
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="center">
      <form onSubmit={handleSubmit}>
        <div className="inputbox">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span>Institution Name</span>
        </div>
        <div className="inputbox">
          <input
            type="text"
            required
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <span>Website link</span>
        </div>
        <button type="submit">Create Institution</button>
      </form>
    </div>
  );
};

export default InstitutionForm;

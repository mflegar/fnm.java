import React, { useState } from "react";
import { useNavigate } from "react-router";

import "./ProjectForm.css";

const ProjectForm = () => {
  const [name, setName] = useState("");
  const [attachment, setAttachment] = useState("");

  const institution = 1;
  const actor = 1;
  // These 2 will change once database gets updated

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", { name, attachment, institution, actor });

    const projectData = {
      name,
      attachment,
      institution,
      actor,
    };

    console.log("Project data being sent:", projectData);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("/api/project/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        console.log("Project data successfully sent to backend");
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
          <span>Project Name</span>
        </div>
        <div className="inputbox">
          <textarea
            required
            value={attachment}
            onChange={(e) => setAttachment(e.target.value)}
            rows={6} // You can adjust the height here
            placeholder="Provide project details or attach relevant information"
          />
          <span>Description</span>
        </div>
        <button type="submit">Submit project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
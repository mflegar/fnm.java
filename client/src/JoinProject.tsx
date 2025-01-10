'use client'

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface Project {
  projectID: number
  projectName: string
  start: string
  attachment: string
  institutionID: number
  actorID: number
  state: string
}

const CustomSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectTrigger>,
  React.ComponentPropsWithoutRef<typeof SelectTrigger>
>(({ className, children, ...props }, ref) => (
  <SelectTrigger
    ref={ref}
    className={cn(
      "transition-all duration-200 ease-in-out",
      "hover:ring-2 hover:ring-primary hover:ring-opacity-50",
      className
    )}
    {...props}
  >
    {children}
  </SelectTrigger>
))
CustomSelectTrigger.displayName = "CustomSelectTrigger"

export default function JoinProject() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [institutionName, setInstitutionName] = useState<string>('')
  const [projects, setProjects] = useState<Project[]>([])
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Uzmi institutionName i Bearer token iz localStorage
    const storedInstitutionName = localStorage.getItem('institutionName');
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
  
    if (storedInstitutionName && token && user) {
      const parsedUser = JSON.parse(user); // Parsiramo user JSON string
      const actorID = parsedUser.id;
  
      setInstitutionName(storedInstitutionName);
  
      fetch(`/api/institution/name/${storedInstitutionName}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch institution data');
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            // Fetch all projects for the institution
            fetch(`/api/project/institution/${data.institutionID}`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Failed to fetch project data');
                }
                return response.json();
              })
              .then((projectsData) => {
                // Fetch projects where the actor is already a member
                fetch(`/api/project/${actorID}/inside/${data.institutionID}`, {
                  method: 'GET',
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                })
                  .then((response) => {
                    if (response.status === 404) {
                      // Ignore 404 Not Found
                      return [];
                    }
                    if (!response.ok) {
                      throw new Error('Failed to fetch user project data');
                    }
                    return response.json();
                  })
                  .then((userProjects) => {
                    const userProjectIDs = userProjects.map((project: Project) => project.projectID);
                    const filteredProjects = projectsData.filter(
                      (project: Project) => !userProjectIDs.includes(project.projectID)
                    );
                    setProjects(filteredProjects);
                  })
                  .catch((error) => {
                    console.error('Error fetching user projects:', error);
                    setProjects(projectsData); // Ako fetch user projekata ne uspe, prikazujemo sve projekte
                  });
              })
              .catch((error) => {
                console.error('Error fetching projects:', error);
              });
          }
        })
        .catch((error) => {
          console.error('Error fetching institution:', error);
        });
    }
  }, []);
  

  const handleGoingBack = () => {
    localStorage.removeItem("institutionName");
    navigate(-1); // Vrati se nazad
  }

  const handleJoinProject = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
  
    if (!token || !user) {
      setNotification({ type: 'error', message: "User is not authenticated. Please log in again." });
      return;
    }
  
    const parsedUser = JSON.parse(user);
    const actorID = parsedUser.id;
  
    if (selectedProject) {
      fetch(`/api/project/requestJoin`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          actorID: actorID,
          projectID: selectedProject,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to submit join request');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Join request submitted successfully:', data);
          setNotification({ type: 'success', message: "You've successfully submitted to join the project." });
          localStorage.removeItem("institutionName");
          setTimeout(() => navigate(-1), 2000);
        })
        .catch((error) => {
          console.error('Error submitting join request:', error);
          setNotification({ type: 'error', message: "Failed to submit join request. Please try again later." });
        });
    } else {
      setNotification({ type: 'error', message: "Please select a project before submitting." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Join a Project</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              Institution: {institutionName}
            </div>
            <Select onValueChange={(value) => setSelectedProject(Number(value))}>
              <CustomSelectTrigger className="w-full">
                <SelectValue placeholder="Select a project" />
              </CustomSelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem 
                    key={project.projectID} 
                    value={project.projectID.toString()}
                    className="transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {project.projectName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedProject && (
              <div className="text-sm">
                <p><strong>Start Date:</strong> {projects.find(p => p.projectID === selectedProject)?.start}</p>
                <p><strong>State:</strong> {projects.find(p => p.projectID === selectedProject)?.state}</p>
              </div>
            )}
            {notification && (
              <div className={`p-2 rounded ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {notification.message}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleGoingBack}>Go Back</Button>
          <Button onClick={handleJoinProject}>Submit to Join</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
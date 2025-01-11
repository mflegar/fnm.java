"use client";

import * as React from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Notification {
  type: "success" | "error";
  message: string;
}

export function InstitutionForm() {
  const [institutionName, setinstitutionName] = useState("");
  const [link, setLink] = useState("");
  const [notification, setNotification] = React.useState<Notification | null>(null);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();

  //Gumb za povratak nazad.
  const handleGoBack = () => {
    navigate("/dashboard");
  };

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000); // Hide notification after 5 seconds
  };

  const handleSubmit = async (event: React.FormEvent) => { //Dakle, ova funkcija se zatvara prije return dijela.
      event.preventDefault();
      setIsSubmitting(true);

      if (!institutionName.trim() || !link.trim()) {
        showNotification("error", "Please fill in all fields");
        setIsSubmitting(false);
        return;
      }

   const userData = localStorage.getItem("user");
   
   if (!userData) {
    showNotification("error", "User data or institution name not found");
    setIsSubmitting(false);
    return;
  }

    const parsedUser = JSON.parse(userData);
    const ownerID = parsedUser.id;
    const token = localStorage.getItem("token"); 


    if (!token) {
      showNotification("error", "Authentication token not found");
      console.log("No token!");
      setIsSubmitting(false);
      return;
    }

    const institutionData = {
      institutionName,
      link,
      ownerID,
    };

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
        navigate("/dashboard");
      } else {
        console.error("Error sending data to backend");
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return(
  
     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
          <Card className="w-full max-w-md">
             <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                        Create new institution
                </CardTitle>
              </CardHeader>
               <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                       <div className="space-y-2">
                         <Label htmlFor="name">Institution name</Label>
                              <Input
                                   id="institutionName" 
                                   placeholder="Enter the institution name:"
                                   value={institutionName}
                                   onChange={(e) => setinstitutionName(e.target.value)}
                                   required
                                />
                        </div>
                         <div className="space-y-2">
                           <Label htmlFor="link">Institution link</Label>
                                  <Textarea
                                    id="link"
                                    placeholder="Enter the institution link:"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    required
                                  />
                           </div>
                                {notification && (
                                  <div
                                    className={`p-3 rounded-md ${
                                      notification.type === "success"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {notification.message}
                                  </div>
                                )}
                              </form>
                            </CardContent>
                             <CardFooter className="flex justify-between">
                                  <Button
                                        variant="outline"
                                        onClick={handleGoBack}
                                        disabled={isSubmitting}
                                    >
                                        Go back
                                      </Button>
                                      <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                                        {isSubmitting ? "Submitting..." : "Create new institution"}
                                      </Button>
                                    </CardFooter>
          </Card>
   </div> 

  );
}

export default InstitutionForm;
   
"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Institution {
  institutionID: number;
  institutionName: string;
  link: string;
  ownerID: number;
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
));
CustomSelectTrigger.displayName = "CustomSelectTrigger";

export default function JoinInstitution() {
  const [institutionID, setInstitutionID] = useState<number | null>(
    null
  );
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch institutions and filter out the ones the user is already a member of
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      const parsedUser = JSON.parse(user); // Parse user from LocalStorage
      const actorID = parsedUser.id;

      // Fetch all institutions
      fetch(`/api/institution/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch all institutions");
          }
          return response.json();
        })
        .then((allInstitutions) => {
          // Fetch institutions the user is already a part of
          fetch(`/api/institution/actor/${actorID}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (response.status === 404) {
                // Ignore 404 Not Found
                return [];
              }
              if (!response.ok) {
                throw new Error("Failed to fetch user's institutions");
              }
              return response.json();
            })
            .then((userInstitutions) => {
              const userInstitutionIDs = userInstitutions.map(
                (institution: Institution) => institution.institutionID
              );
              const filteredInstitutions = allInstitutions.filter(
                (institution: Institution) =>
                  !userInstitutionIDs.includes(institution.institutionID)
              );
              setInstitutions(filteredInstitutions);
            })
            .catch((error) => {
              console.error("Error fetching user's institutions:", error);
              setInstitutions(allInstitutions); // Fallback to showing all institutions
            });
        })
        .catch((error) => {
          console.error("Error fetching all institutions:", error);
        });
    }
  }, []);

  const handleGoingBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleJoinInstitution = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
  
    if (!token || !user) {
      setNotification({
        type: "error",
        message: "User is not authenticated. Please log in again.",
      });
      return;
    }
  
    const parsedUser = JSON.parse(user);
    const actorID = parsedUser.id;
  
    if (institutionID) {
      // Create the request payload
      const requestBody = { actorID, institutionID };
  
      fetch(`/api/notification/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody), // Pass both actorID and institutionID
      })
        .then(async (response) => {
          const text = await response.text(); // Parse response as text
          if (!response.ok) {
            throw new Error(text); // Throw error with raw response text
          }
          try {
            return JSON.parse(text); // Try to parse JSON if valid
          } catch {
            return text; // Return raw text if not valid JSON
          }
        })
        .then((data) => {
          console.log("Join request submitted successfully:", data);
          setNotification({
            type: "success",
            message: "You've successfully submitted to join the institution.",
          });
          setTimeout(() => navigate(-1), 2000); // Navigate back after success
        })
        .catch((error) => {
          console.error("Error submitting join request:", error);
          setNotification({
            type: "error",
            message: error.message || "Failed to submit join request.",
          });
        });
    } else {
      setNotification({
        type: "error",
        message: "Please select an institution before submitting.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Join an Institution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select
              onValueChange={(value) => setInstitutionID(Number(value))}
            >
              <CustomSelectTrigger className="w-full">
                <SelectValue placeholder="Select an institution" />
              </CustomSelectTrigger>
              <SelectContent>
                {institutions.map((institution) => (
                  <SelectItem
                    key={institution.institutionID}
                    value={institution.institutionID.toString()}
                    className="transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {institution.institutionName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {notification && (
              <div
                className={`p-2 rounded ${
                  notification.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {notification.message}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleGoingBack}>
            Go Back
          </Button>
          <Button onClick={handleJoinInstitution}>Submit to Join</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
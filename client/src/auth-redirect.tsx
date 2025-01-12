'use client';

import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Loader2 } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AuthRedirect = () => {
  const router = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Check authentication via API
        const response = await fetch("/api/user-info", {
          credentials: "include",
        });

        if (response.ok) {
          const userData = await response.json();

          // Store user data and token in localStorage
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: userData.id,
              email: userData.email,
              username: userData.username,
            })
          );
          localStorage.setItem("token", userData.token);

          // Add a timeout before navigating
          setTimeout(() => {
            router("/dashboard");
          }, 500); // 500ms timeout
        } else {
          // Add a timeout before navigating
          setTimeout(() => {
            router("/");
          }, 500); // 500ms timeout
        }
      } catch (error) {
        console.error("Authentication check failed:", error);

        // Add a timeout before navigating
        setTimeout(() => {
          router("/");
        }, 500); // 500ms timeout
      }
    };

    checkAuthentication();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Authenticating</CardTitle>
          <CardDescription>Please wait while we verify your credentials.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthRedirect;
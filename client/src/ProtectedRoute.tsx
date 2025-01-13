import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { useUser } from "./useUser";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      // Add a delay before checking authentication
      await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay
      const loggedIn = await isLoggedIn();
      setIsAuthenticated(loggedIn);
    };

    checkLoginStatus();
  }, [isLoggedIn]);

  if (isAuthenticated === null) {
    // Optionally display a loading state
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
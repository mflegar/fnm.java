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
      const loggedIn = await isLoggedIn();
      setIsAuthenticated(loggedIn);
    };

    checkLoginStatus();
  }, [isLoggedIn]);

  if (isAuthenticated === null) {
    // Optionally, you can show a loading state here while checking the authentication
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
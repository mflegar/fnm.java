// Sluzi da efikasno gledamo na svakoj stranici da li je korisnik prijavljen na github te
// da ne moramo ponavljati kod na vise razlicitih stranica

import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const location = useLocation(); // Trenutna ruta

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch("/api/user-info", { credentials: "include" });

                if (response.ok) {
                    setIsAuthenticated(true);
                    if (sessionStorage.getItem('from')){
                        sessionStorage.removeItem('from');  // Clean local storage
                    }
                } else {
                    setIsAuthenticated(false);
                    sessionStorage.setItem('from', location.pathname);  // Save current path
                }
            } catch {
                setIsAuthenticated(false);
                sessionStorage.setItem('from', location.pathname);  // Save current path if error
            }
        };

        checkAuthentication();

    }, [location.pathname]);

    if (isAuthenticated === null) {
        return <p>Loading...</p>;
    }

    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate to="/" replace /> // Go to home page for github login
    );
};

export default ProtectedRoute;
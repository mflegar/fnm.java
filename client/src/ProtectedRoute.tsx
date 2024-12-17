import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [redirectPath, setRedirectPath] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                // Provjeri je li korisnik autentificiran
                const response = await fetch("/api/user-info", { credentials: "include" });

                if (response.ok) {
                    const userInfo = await response.json();
                    console.log("User authenticated");

                    // Provjeri da li korisnik postoji u bazi
                    const dbResponse = await fetch(`/api/users/${userInfo.id}`, { credentials: "include" });

                    if (dbResponse.ok) {
                        console.log('User found in database');
                        const user = await dbResponse.json();
                        console.log(user);
                        setRedirectPath(null);  // Sve provjere su uspješne

                        if (location.pathname === '/form') {
                            if (user.actorRole === "Institution Manager") {
                                setRedirectPath('/institution-form');
                            } else if (user.actorRole === "Researcher") {
                                setRedirectPath('/researcher');
                            }
                        } else {
                            setRedirectPath(null); // Korisnik ima pravo pristupa trenutnoj stranici
                        }

                    } else {
                        console.log('User not found in database');

                        if (location.pathname !== '/form') {
                            setRedirectPath('/form');
                        }
                        else {
                            // This means we are already at /form , no need to redirect
                            setRedirectPath(null);
                        }
                    }
                } else {
                    console.log('Authentication failed');
                    setRedirectPath('/');
                }
            } catch (error) {
                console.error('Error during authentication:', error);
                setRedirectPath('/');
            }
        };

        checkAuthentication();
    }, [location.pathname]);

    if (redirectPath) {
        return <Navigate to={redirectPath} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;

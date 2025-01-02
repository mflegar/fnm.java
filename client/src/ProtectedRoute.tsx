import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "./useUser";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
    const location = useLocation();
    const { isLoggedIn } = useUser();

    return isLoggedIn() ? (
        <>{children}</>
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;

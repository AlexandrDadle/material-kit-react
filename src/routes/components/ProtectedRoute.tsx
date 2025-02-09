import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

interface ProtectedRouteProps {
    requiredRoles?: string[];
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles }) => {
    console.log('ProtectedRoute component called'); // Debug log
    const { isAuthenticated, user, getRole } = useAuth();
    const location = useLocation();

    console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
    console.log('ProtectedRoute - user:', user);
    console.log('ProtectedRoute - requiredRoles:', requiredRoles);

    const userRole = getRole();
    const hasRequiredRole = requiredRoles?.some((role) => role === userRole);

    console.log('ProtectedRoute - userRole:', userRole); // Debug log
    console.log('ProtectedRoute - hasRequiredRole:', hasRequiredRole); // Debug log

    if (!isAuthenticated) {
        console.log('ProtectedRoute - Redirecting to /sign-in');
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    if (!hasRequiredRole) {
        console.log('ProtectedRoute - User does not have required role, redirecting to /404');
        return <Navigate to="/404" replace />;
    }

    return children;
}

export default ProtectedRoute;
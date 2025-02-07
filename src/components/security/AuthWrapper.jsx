import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUserRole } from "../../services/AuthService.jsx";  // Import role function

const AuthWrapper = ({ allowedRoles }) => {
    const token = localStorage.getItem("token");
    const role = getCurrentUserRole();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(role)) {
        console.log(role);
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

export default AuthWrapper;

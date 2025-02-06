import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-red-600">403 - Unauthorized</h1>
            <p className="text-gray-700 mt-2">You do not have permission to view this page.</p>
            <button
                onClick={() => navigate("/")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Go to Home
            </button>
        </div>
    );
};

export default Unauthorized;

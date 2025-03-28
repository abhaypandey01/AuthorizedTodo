import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import authService from "../appwrite/services/authService";
import Button from "./index";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogout = async () => {
        setLoading(true);
        setError(null);
        try {
            await authService.logout();
            dispatch(logout()); // Update Redux store
            navigate("/login", { replace: true }); // Redirect to login
        } catch (err) {
            setError("Logout failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <Button
                onClick={handleLogout}
                bgColor="bg-red-600 hover:bg-red-700"
                className="w-full"
                disabled={loading}
            >
                {loading ? "Logging Out..." : "Logout"}
            </Button>

            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
    );
}

import React from "react";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";
import useAuth from "@/Hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const AppNavbar = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const decodedToken = token ? jwtDecode(token) : null;

  return (
    <header className="px-20 py-6 flex items-center justify-between bg-transparent">
      {/* left part */}

      <div>
        <h1 className="text-4xl font-semibold ">GlobalTour</h1>
      </div>

      {/* right part */}

      <div className="flex items-center gap-15">
        <nav className="space-x-5 text-lg text-gray-700 font-medium [&>a]:hover:text-blue-600 [&>a]:hover:underline">
          {decodedToken.role === "admin" ? (
            <>
              <a href="/dashboard">Dashboard</a>
              <a href="/trips">Trips</a>
              <a href="/bookings">Bookings</a>
              <a href="/contact-list">Contact List</a>
              <a href="/blogs">Blogs</a>
            </>
          ) : (
            <>
              <a href="/client/dashboard">Dashboard</a>
              <a href="/client/trips">Trips</a>
              <a href="/client/bookings">Bookings</a>
              <a href="/client/blogs">Blogs</a>
            </>
          )}
        </nav>
        <div onClick={handleLogout}>
          <CustomButton text="Logout" />
        </div>
      </div>
    </header>
  );
};

export default AppNavbar;

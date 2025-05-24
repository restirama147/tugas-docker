// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import LoginPage from "../components/Login"; 
import RegisterPage from "../components/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import NoteList from "../components/NoteList.js";

function RouterApp() {
    return (
        <Router>
        <Routes>
            {/* Pass setIsAuthenticated as prop to LoginPage */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
            path="/notes"
            element={
                <ProtectedRoute>
                    <NoteList />
                </ProtectedRoute>
            }
            />
        </Routes>
        </Router>
    );
}

export default RouterApp;

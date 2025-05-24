// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import LoginPage from "../components/LoginPage"; 
import RegisterPage from "../components/RegisterPage";
import note from "../components/NoteList.js";
import ProtectedRoute from "../components/ProtectedRoute";
import note from "../components/AddNote.js";
import note from "../components/EditNote.js";
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
                <note />
                </ProtectedRoute>
            }
            />
        </Routes>
        </Router>
    );
}

export default RouterApp;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import LoginPage from "../components/Login"; 
import RegisterPage from "../components/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import NoteList from "../components/NoteList.js";

function RouterApp() {
    return (
        <Router>
        <Routes>
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
            <Route
                path="/buat-catatan"
                element={
                    <ProtectedRoute>
                        <AddNote />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/edit-catatan/:id"
                element={
                    <ProtectedRoute>
                        <EditNote />
                    </ProtectedRoute>
                }
            />
        </Routes>
        </Router>
    );
}

export default RouterApp;

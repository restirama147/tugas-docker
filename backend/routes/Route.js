import express from "express";
import {createNote, getNotes, updateNote, deleteNote} from "../controller/NoteController.js";
import { Register, Login, refreshToken, logout } from "../controller/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
const router = express.Router();

//endpoint get semua data note
router.get("/notes", verifyToken, getNotes);

//endpoint get by id
router.get("/notes/:id", verifyToken, getNotes);

//endpoint create data note
router.post('/buat-catatan', verifyToken, createNote);

//endpoint update data 
router.put("/edit-catatan/:id", verifyToken, updateNote)

//endpoint delete data
router.delete('/hapus-catatan/:id', verifyToken, deleteNote)

//Routes untuk User
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", logout);

export default router;


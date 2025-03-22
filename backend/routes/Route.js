import express from "express";
import * as NoteController from "../controller/NoteController.js";

const router = express.Router();

//endpoint get semua data user
router.get("/notes", NoteController.getNotes);

//endpoint get by id
router.get("/notes/:id", NoteController.getNotesById);

//endpoint create data user
router.post('/buat-catatan', NoteController.createNote);

//endpoint update data 
router.put("/edit-catatan/:id", NoteController.updateNote)

//endpoint delete data
router.delete('/hapus-catatan/:id', NoteController.deleteNote)


export default router;
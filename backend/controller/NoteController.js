import {where} from "sequelize";
import Note from "../model/NoteModel.js";

export const getNotes = async(req, res)=>{
    try {
        const response = await Note.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message); 
    }
}

export const getNotesById = async(req, res) =>{
    try {
        const response = await Note.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}


//Buat Catatan
export const createNote = async(req, res)=>{
    try {
        await Note.create(req.body);
        res.status(201).json({msg: "Berhasil membuat catatan baru....."});
    } catch (error) {
        console.log(error.message);
    }
}

//Mengedit Catatan
export const updateNote = async (req, res) => {
    try {
        const inputData = req.body 
        const id = req.params.id

        await Note.update(inputData, {
            where: {
                id: id
            }
        });
            res.status(200).json({
                msg: "Berhasil mengupdate catatan",
            })
    } catch (error) {
        console.log(error.message)
    }
}

//Hapus Catatan
export const deleteNote = async (req, res) => {
    try {
        const id = req.params.id
        await Note.destroy({
            where: {
                id,
            },
        });
        res.status(200).json({
            message:"Berhasil dihapus",
        })
    } catch (error) {
        console.log(error.message)
    }
};

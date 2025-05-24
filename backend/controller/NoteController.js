import { where } from "sequelize";
import note from "../model/NoteModel.js";

export const getNotes = async(req, res)=>{
    const id = req.user.id;
    try {
        const notes = await note.findAll({where:{userId: id}}); 
        
        res.status(200).json({
            message: "Berhasil mengambil catatan",
            userId: id,
            data: notes,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// export const getNotesById = async (req, res) => {
//     try {
//         const response = await note.findOne({
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

//Buat Catatan
export const createNote = async(req, res)=>{
    const { judul, isi, kategori } = req.body;
    const id = req.user.id;
    try {
        const notes = await note.create({
            judul,
            isi,
            kategori,
            userId: id,
        });
            res.status(201).json({msg: "Berhasil membuat catatan baru.....",
                userId: id,
                data: notes,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Mengedit Catatan
export const updateNote = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const { judul, isi, kategori } = req.body;
    try {
        const notes = await note.update({
            judul,
            isi,
            kategori,
        },
        {
            where: {
                id,
            },
        });
        res.status(201).json({msg: "Berhasil membuat catatan baru.....",
            userId: id,
            data: notes,
    });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Hapus Catatan
export const deleteNote = async (req, res) => {
    const { id } = req.params;
    console.log("ID NOTES = ", id);

    const userId = req.user.id;
    try {
        const notes = await note.destroy({
            where: {
                id,
        },
    });
    res.status(200).json({
        message: "Notes berhasil dihapus",
        userId,
        data: notes,
    });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils';

const NoteList = () => {
const [notes, setNote] = useState ([]);

useEffect (() =>{
    getNotes();

},[]);

const getNotes = async () =>{
    const response = await axios.get(`${BASE_URL}/notes`);
    setNote(response.data);
}

const deleteNote = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/hapus-catatan/${id}`);
        getNotes();
    } catch (error) {
        console.log(error);
    }
}
    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <h1 className="title has-text-centered has-text-info">
                    Catatan
                </h1>
                <Link to={`add`} className='button is-success mb-3'>Buat Catatan Baru</Link>
                <table className='table is-striped is-fullwidth'>
                    <thead className="has-background-info has-text-white">
                        <tr>
                            <th>No</th>
                            <th>Judul</th>
                            <th>Isi</th>
                            <th>Kategori</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.map((note,index) => (
                        <tr key = {note.id}>
                            <td>{index+1}</td>
                            <td>{note.judul}</td>
                            <td>{note.isi}</td>
                            <td>{note.kategori}</td>
                            <td>
                                <div className="is-flex is-justify-content-space-between gap-2" style={{ width: "110px" }}>
                                    <Link to={`edit/${note.id}`} className="button is-small is-info">Edit</Link>
                                    <button onClick={() => deleteNote(note.id)} className="button is-small is-warning">Hapus</button>
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>  
            </div>
        </div>
    )
}

export default NoteList

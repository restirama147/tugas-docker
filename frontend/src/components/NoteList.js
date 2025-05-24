import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils';
import useAuth from "../auth/useAuth";

const NoteList = () => {
    const [notes, setNote] = useState([]);
    const { accessToken } = useAuth();

    useEffect(() => {
        const getNotes = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/notes`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setNote(response.data);
            } catch (error) {
                console.error("Gagal mengambil catatan:", error);
                setNote([]); // Pastikan tetap array agar tidak error
            }
        };

        if (accessToken) {
            getNotes();
        }
    }, [accessToken]);

    const deleteNote = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/hapus-catatan/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            // Ambil ulang data setelah penghapusan
            const response = await axios.get(`${BASE_URL}/notes`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setNote(response.data);
        } catch (error) {
            console.log("Gagal menghapus:", error);
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <h1 className="title has-text-centered has-text-info">
                    Catatan
                </h1>
                <Link to={`/buat-catatan`} className='button is-success mb-3'>Buat Catatan Baru</Link>
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
                        {Array.isArray(notes) && notes.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="has-text-centered has-text-grey">
                                    Belum ada catatan. Silakan buat catatan baru.
                                </td>
                            </tr>
                        ) : (
                            notes.map((note, index) => (
                                <tr key={note.id}>
                                    <td>{index + 1}</td>
                                    <td>{note.judul}</td>
                                    <td>{note.isi}</td>
                                    <td>{note.kategori}</td>
                                    <td>
                                        <div className="is-flex is-justify-content-space-between gap-2" style={{ width: "110px" }}>
                                            <Link to={`/edit-catatan/${note.id}`} className="button is-small is-info">Edit</Link>
                                            <button onClick={() => deleteNote(note.id)} className="button is-small is-warning">Hapus</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NoteList;

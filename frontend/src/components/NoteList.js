import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils';
import useAuth from "../auth/useAuth";

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const { accessToken } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getNotes = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(`${BASE_URL}/notes`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });

                console.log("📦 Response dari backend:", response.data);

                // Ambil data catatan dari berbagai kemungkinan struktur response
                const dataNotes = response.data?.data ?? response.data?.notes ?? response.data ?? [];
                setNotes(Array.isArray(dataNotes) ? dataNotes : []);
            } catch (err) {
                console.error("Gagal mengambil catatan:", err);
                setError("Gagal memuat catatan.");
                setNotes([]);
            } finally {
                setLoading(false);
            }
        };

        if (accessToken) {
            getNotes();
        }
    }, [accessToken]);

    const deleteNote = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/hapus-catatan/${id}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            // Refresh catatan setelah hapus
            const response = await axios.get(`${BASE_URL}/notes`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            const dataNotes = response.data?.data ?? response.data?.notes ?? response.data ?? [];
            setNotes(Array.isArray(dataNotes) ? dataNotes : []);
        } catch (error) {
            console.log("Gagal menghapus:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <h1 className="title has-text-centered has-text-info">Catatan</h1>
                <Link to={`/buat-catatan`} className='button is-success mb-3'>Buat Catatan Baru</Link>

                {notes.length === 0 ? (
                    <p>Belum ada catatan. Silakan buat catatan baru.</p>
                ) : (
                    <table className='table is-striped is-fullwidth'>
                        <thead className="has-background-info has-text-white">
                            <tr>
                                <th>No</th>
                                <th>Judul</th>
                                <th>Isi</th>
                                <th>Kategori</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((note, index) => (
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
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default NoteList;

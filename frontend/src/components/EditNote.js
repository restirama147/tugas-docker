import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../utils';
import useAuth from "../auth/useAuth";

const EditNote = () => {
    const [judul, setJudul] = useState("");
    const [isi, setIsi] = useState("");
    const [kategori, setKategori] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    const { accessToken } = useAuth();
    const inputWidth = "600px";

    useEffect(() => {
        getNoteById();
    }, [getNoteById]);

    const getNoteById = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setJudul(response.data.judul);
            setIsi(response.data.isi);
            setKategori(response.data.kategori);
        } catch (error) {
            console.error("Gagal mengambil data catatan:", error);
            alert("Catatan tidak ditemukan.");
            navigate("/notes");
        } finally {
            setLoading(false);
        }
    }, [id, accessToken, navigate]);

    const updateNote = async (e) => {
        e.preventDefault();

        if (!judul || !isi || !kategori) {
            alert("Semua kolom wajib diisi.");
            return;
        }

        try {
            await axios.put(`${BASE_URL}/edit-catatan/${id}`, {
                judul, isi, kategori
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}` // ✅ Sertakan token
                }
            });
            navigate("/notes"); // ✅ Arahkan ke daftar catatan
        } catch (error) {
            console.error("Gagal update catatan:", error);
            alert("Gagal memperbarui catatan.");
        }
    };

    if (loading) return <p className="has-text-centered mt-5">Memuat data catatan...</p>;

    return (
        <div className='columns mt-5 is-centered'>
            <div className='column is-half'>
                <h1 className="title has-text-centered has-text-info">Edit Catatan</h1>
                <form onSubmit={updateNote}>
                    <div className='field'>
                        <label className="label">Judul</label>
                        <div className='control'>
                            <input
                                type="text"
                                className='input'
                                style={{ width: inputWidth }}
                                value={judul}
                                onChange={(e) => setJudul(e.target.value)}
                                placeholder='Judul'
                            />
                        </div>
                    </div>
                    <div className='field'>
                        <label className="label">Isi</label>
                        <div className='control'>
                            <textarea
                                className='textarea'
                                style={{ width: inputWidth }}
                                rows="4"
                                value={isi}
                                onChange={(e) => setIsi(e.target.value)}
                                placeholder='Isi'
                            />
                        </div>
                    </div>
                    <div className='field'>
                        <label className="label">Kategori</label>
                        <div className='control'>
                            <input
                                type="text"
                                className='input'
                                style={{ width: inputWidth }}
                                value={kategori}
                                onChange={(e) => setKategori(e.target.value)}
                                placeholder='Kategori'
                            />
                        </div>
                    </div>
                    <div className='field'>
                        <button type='submit' className='button is-success'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditNote;

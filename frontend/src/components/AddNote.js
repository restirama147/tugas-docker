import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils';

const AddNote = () => {
    const [judul, setJudul] = useState("");
    const [isi, setIsi] = useState("");
    const [kategori, setKategori] = useState("");
    const navigate = useNavigate();
    const inputWidth = "600px";

    const saveNote = async (e) => {
        e.preventDefault();

        if (!judul || !isi || !kategori) {
            alert("Semua kolom wajib diisi.");
            return;
        }

        try {
            await axios.post(`${BASE_URL}/buat-catatan`, {
                judul,
                isi,
                kategori
            });
            navigate("/");
        } catch (error) {
            console.error("Gagal menyimpan catatan:", error);
            alert("Terjadi kesalahan saat menyimpan.");
        }
    };

    return (
        <div className='columns mt-5 is-centered'>
            <div className='column is-half'>
                <h1 className="title has-text-centered has-text-info">Buat Catatan</h1>
                <form onSubmit={saveNote}>
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
                                rows="4"
                                style={{ width: inputWidth }}
                                value={isi}
                                onChange={(e) => setIsi(e.target.value)}
                                placeholder='Isi catatan'
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
                        <button type='submit' className='button is-success'>Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNote;

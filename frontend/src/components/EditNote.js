import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../utils';

const EditNote = () => {
const [judul, setJudul] = useState("");
const [isi, setIsi] = useState("");
const [kategori, setKategori] = useState("");
const navigate = useNavigate();
const {id} = useParams();
const inputWidth = "600px"; 

useEffect(() => {
    getNotesById();
}, []);

const updateNote = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`${BASE_URL}/edit-catatan/${id}`, {
            judul,
            isi,
            kategori
        });
        navigate("/");
    } catch (error) {
        console.log(error);
    }
}

const getNotesById = async () => {
    const response = await axios.get(`${BASE_URL}/notes/${id}`);
    setJudul(response.data.judul);
    setIsi(response.data.isi);
    setKategori(response.data.kategori);
}


    return (
        <div className='columns mt-5 is-centered'>
            <div className='columnis is-half'>
                <h1 className="title has-text-centered has-text-info">
                    Edit
                </h1>
                <form onSubmit={updateNote}>
                    <div className='field'>
                        <label className="label">Judul</label>
                        <div className='control'>
                            <input type="text" className='input' style={{ width: inputWidth }} value={judul} onChange={(e) => setJudul(e.target.value)} placeholder='judul'/>
                        </div>
                    </div>
                    <div className='field'>
                        <label className="label">Isi</label>
                        <div className='control'>
                            <input type="text" className='input' style={{ width: inputWidth }} value={isi} onChange={(e) => setIsi(e.target.value)} placeholder='isi'/>
                        </div>
                    </div>
                    <div className='field'>
                        <label className="label">Kategori</label>
                        <div className='control'>
                            <input type="text" className='input' style={{ width: inputWidth }} value={kategori} onChange={(e) => setKategori(e.target.value)} placeholder='kategori'/>
                        </div>
                    </div>
                    <div className='field'>
                        <button type='submit' className='button is-success'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditNote

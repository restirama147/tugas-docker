import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils.js";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Password dan konfirmasi tidak cocok!");
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/register`, {
                username,
                password,
                confirm_password: confirmPassword,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.data) {
                navigate("/ ");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Terjadi kesalahan saat registrasi.");
        }
    };

    return (
        <section style={{ backgroundColor: "#f9f9f9", minHeight: "100vh", paddingTop: "4rem" }}>
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-5">
                        <div className="box" style={{ borderTop: "6px solid #00C4CC", borderRadius: "12px" }}>
                            <h2 className="title has-text-centered" style={{ color: "#00C4CC", fontWeight: "700" }}>
                                Buat Akun
                            </h2>
                            <form onSubmit={handleRegister}>
                                <div className="field">
                                    <label className="label">Username</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Masukkan username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="password"
                                            placeholder="Masukkan password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Konfirmasi Password</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="password"
                                            placeholder="Ulangi password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="field mt-4">
                                    <div className="control">
                                        <button
                                            type="submit"
                                            className="button is-fullwidth"
                                            style={{
                                                backgroundColor: "#00C853",
                                                color: "#fff",
                                                fontWeight: "bold",
                                                borderRadius: "6px"
                                            }}
                                        >
                                            Daftar
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <p className="has-text-centered is-size-7 mt-4">
                                Sudah punya akun?{" "}
                                <Link to="/ " style={{ color: "#2196F3", fontWeight: "bold" }}>
                                    Masuk di sini
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;

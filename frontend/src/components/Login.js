import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";


const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const result = await login(username, password);
            if (result) {
                navigate("/notes");
            } else {
                alert("Login gagal");
            }
        } catch (error) {
            console.error("Login Error:", error.response ? error.response.data : error.message);
            setError("Login gagal: " + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <section style={{ backgroundColor: "#f9f9f9", minHeight: "100vh", paddingTop: "4rem" }}>
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-5">
                        <div className="box" style={{ borderTop: "6px solid #00C4CC", borderRadius: "12px" }}>
                            <h2 className="title has-text-centered" style={{ color: "#00C4CC", fontWeight: "700" }}>
                                Login
                            </h2>
                            <form onSubmit={handleLogin}>
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
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {error && (
                                <p className="has-text-centered has-text-danger is-size-7 mt-3">
                                    {error}
                                </p>
                            )}

                            <p className="has-text-centered is-size-7 mt-4">
                                Belum punya akun?{" "}
                                <Link to="/register" style={{ color: "#2196F3", fontWeight: "bold" }}>
                                    Daftar di sini
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;

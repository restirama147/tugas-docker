import Users from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const Register = async (req, res) => {
    const { username, password, confirm_password } = req.body;

    // Validasi input kosong
    if (!username || !password || !confirm_password) {
        return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    // Validasi password sama
    if (password !== confirm_password) {
        return res.status(400).json({ message: "Password tidak sama" });
    }

    // Cek jika username sudah digunakan
    const existingUser = await Users.findOne({ where: { username } });
    if (existingUser) {
        return res.status(409).json({ message: "Username sudah digunakan" });
    }

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const data = await Users.create({
        username,
        password: hashPassword,
        });

        res.status(201).json({
        message: "User berhasil dibuat",
        data,
        });
    } catch (error) {
        res.status(500).json({
        message: "Terjadi Kesalahan",
        error: error.message,
        });
    }
    };

    export const Login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
        .status(400)
        .json({ message: "Username dan password wajib diisi" });
    }

    try {
        const user = await Users.findOne({ where: { username } });

        if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid)
        return res.status(401).json({ message: "Password salah" });

        // JWT Sign
        const accessToken = jwt.sign(
        { id: user.id, username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
        );
        const refreshToken = jwt.sign(
        { id: user.id, username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
        );

        await Users.update(
        { refresh_token: refreshToken },
        { where: { id: user.id } }
        );

        // Set Cookie
        res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        return res.status(200).json({
        accessToken,
        message: "Login berhasil",
        });
    } catch (error) {
        res.status(500).json({
        message: "Terjadi Kesalahan",
        error: error.message,
        });
    }
    };

    export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);

        const user = await Users.findOne({
        where: { refresh_token: refreshToken },
        });
        if (!user) return res.status(403).json({ message: "User tidak ditemukan" });

        jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err)
            return res.status(403).json({ message: "Invalid refresh token" });

            const accessToken = jwt.sign(
                { id: user.id, username: user.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            );

            res.json({ accessToken });
        }
        );
    } catch (error) {
        res.status(500).json({
            message: "Terjadi Kesalahan",
            error: error.message,
        });
    }
    };

    export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(204);

        const user = await Users.findOne({
            where: { refresh_token: refreshToken },
        });
        if (!user) return res.sendStatus(204);

        await Users.update({ refresh_token: null }, { where: { id: user.id } });

        res.clearCookie("refreshToken");

        return res.status(200).json({
        message: "Logout berhasil",
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi Kesalahan",
            error: error.message,
        });
    }
};

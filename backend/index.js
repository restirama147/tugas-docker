import express from "express";
import cors from "cors";
import route from "./routes/Route.js";
import "./model/index.js";
import cookieParser from "cookie-parser";
import "dotenv/config"

const app = express();
const port = process.env.PORT || 5000;

// Konfigurasi CORS agar mengizinkan domain frontend terdeploy
const corsOptions = {
    origin: [
        "https://notes-resti-fe-dot-a-06-new.uc.r.appspot.com", 
        "https://localhost:3000"
        // Tambahkan localhost untuk pengembangan lokal
    ],  
    credentials: true, // Memungkinkan penggunaan cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions)); // Menggunakan opsi CORS

// Menambahkan penanganan preflight request (OPTIONS)
app.options("*", cors(corsOptions)); // Menanggapi preflight requests

app.use(express.json());
app.use(cookieParser());
app.use(route);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

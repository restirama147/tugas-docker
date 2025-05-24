import db from "../config/Database.js";
import Users from "./UserModel.js";
import note from "./NoteModel.js";

//Korelasi
Users.hasMany(note, { foreignKey: "userId", onDelete: "CASCADE" });
note.belongsTo(Users, { foreignKey: "userId" });

// Sinkronisasi semua tabel
(async () => {
    try {
        await db.authenticate();
        console.log("Koneksi database berhasil!");

        await db.sync();
        console.log("Semua tabel berhasil disinkronisasi.");
    } catch (err) {
        console.error("Gagal konek DB:", err);
    }
})();

export { Users, note };

import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const note = db.define(
    "notes",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        judul: { type: DataTypes.STRING, allowNull: false },
        isi: { type: DataTypes.STRING, allowNull: false },
        kategori: { type: DataTypes.STRING, allowNull: false },
        userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: "Tanggal_dibuat",
        updatedAt: "Tanggal_diupdate",
    }
);

export default note;

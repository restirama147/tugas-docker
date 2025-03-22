import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import { title } from "process";
import sequelize from "sequelize";

const note = db.define('notes',{
    judul:{type: Sequelize.STRING, allowNull:false},
    isi: Sequelize.STRING,
    kategori: Sequelize.STRING},{
        freezeTableName: true,
        createdAt :'Tanggal_dibuat',
        updatedAt: 'Tanggal_diupdate'
    }
);

export default note;

(async()=>{
    await db.sync();})();
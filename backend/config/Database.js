import {Sequelize} from "sequelize";

const db = new Sequelize('catatan', 'root','inipassword',{
    host: '34.45.139.50',
    dialect: 'mysql'
})

export default db;

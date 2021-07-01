const Sequelize = require('sequelize');
const db = require('../config/database');

const Kecamatan = db.define('kecamatan', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nama: {
        type: Sequelize.STRING(50),
        unique: {
            msg: "Kecamatan Telah Terdaftar!"
        },
        allowNull: false,
        validate: {
            notNull: {
                msg: "Nama Kecamatan Tidak Boleh Kosong!"
            }
        }
    },
    nickname: Sequelize.STRING(10),
    kodePos: Sequelize.STRING(10),
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },

});

// (async () => {
//     try{
//         await db.sync({alter: true});
//     }catch(err){
//         console.log(err);
//     }
// })();

module.exports = Kecamatan;
const Sequelize = require('sequelize');
const Kec = require('../models/Kecamatan');
const db = require('../config/database');

const Kelurahan = db.define('kelurahan', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: {
            msg: "Kelurahan Telah Terdaftar!"
        },
        validate: {
            notNull: {
                msg: "Nama Kelurahan Tidak Boleh Kosong!"
            }
        }
    },
    nickname: Sequelize.STRING(30),
    kodePos: Sequelize.STRING(10),
    kecamatanId: {
        type: Sequelize.INTEGER(11),
        
    },
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
//     try{  await db.sync({alter: true}) }
//     catch(err){ console.log(err) }
// })();

module.exports = Kelurahan;
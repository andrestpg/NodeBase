const Sequelize = require("sequelize");

const db = require('../config/database');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            isAlphanumeric: {
                msg: "Nama tidak boleh mengandung simbol!"
            }
        }
    },
    username: {
        type: Sequelize.STRING(20),
        unique: {
            msg: "Username telah terdaftar!"
        },
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            isAlphanumeric: {
                msg: "Username tidak boleh mengandung simbol!"
            }
        }
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        }
    },
});


(async () => {
    await db.sync();
})();

module.exports = User;
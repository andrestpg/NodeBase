const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: "127.0.0.1",
        operatorAliases: "false",
        dialect: "mysql",
        dialectOptions: {
            dateStrings: true,
            typeCast: function (field, next) { // for reading from database
                if (field.type === 'DATETIME') {
                return field.string()
                }
                return next()
            },
        },
        timezone: '+07:00'
    }
);

module.exports = sequelize;
global.sequelize = sequelize;
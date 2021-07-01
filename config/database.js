const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("db_basis","root","",{
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
});

module.exports = sequelize;
global.sequelize = sequelize;
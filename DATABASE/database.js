const sequelize =  require('sequelize');

const connection = new sequelize('guia_perguntas', 'root', 'root',{
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = connection;

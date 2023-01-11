const sequelize =  require('sequelize');

const connection = new sequelize('guia_perguntas', 'root', 'Gu@650300',{
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = connection;
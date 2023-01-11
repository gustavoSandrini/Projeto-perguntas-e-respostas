const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");
const connection = require("./database");


const Pergunta = connection.define('perguntas', {
    titulo:{
        type: Sequelize.STRING,
        allowfull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowfull: false
    }
});

Pergunta.sync({force: false}).then(() =>{});



module.exports = Pergunta;
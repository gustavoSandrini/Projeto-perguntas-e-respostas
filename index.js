const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./DATABASE/database");
const Pergunta = require("./DATABASE/Pergunta");
const Resposta = require("./DATABASE/Resposta");



//DATABASE
connection
    .authenticate()
    .then(() =>{
        console.log("Conexão feito com o banco de dados com suscesso!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas

//Pagina principal
app.get("/",(req, res) =>{
    Pergunta.findAll({raw: true, order:[
        ['id', 'DESC']
    ]}).then(perguntas =>{
        res.render("index", {
            perguntas: perguntas
        })
    });
}); 
//Pagina de pergunta
app.get("/perguntar",(req, res) =>{
    res.render("perguntar");
});

//Rota de salvamamento.
app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){
            
            Resposta.findAll({
                where: {perguntaid: pergunta.id},
                order:[
                    ['id', 'DESC']
            ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });  
            });
        }else{
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res) =>{
    var corpo = req.body.corpo;
    var perguntaid = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaid: perguntaid
    }).then(() =>{
        res.redirect("/pergunta/" + perguntaid);
    });
});

app.listen(8080, ()=>{console.log("App Rodando");});
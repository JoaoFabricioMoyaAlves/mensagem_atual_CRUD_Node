
const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"",
    database: "mensagem_fixa"
});

conexao.connect((erro)=>{
    if(erro){
        console.error("Deu ruim com o banco de dados", erro);
        return;
    }
    console.log("conectado com sucesso Brother!!!");

})

module.exports = conexao;
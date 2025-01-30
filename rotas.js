const conexao = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');


const app = express();
app.use(express.static('public'));
app.use(express.json());
const port = 3000;

//app.use(bodyParser.json());
app.use(express.json());
// rota q envia os dados Pro Banco 
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));


});

app.get('/style.css',(req,res)=>{
    res.sendFile(path.join(__dirname, 'style.css'));
});

app.get('/index.js',(req,res)=>{
    res.sendFile(path.join(__dirname, 'index.js'));
});

app.get('/atualizar', (req, res)=>{
   
    const query = 'SELECT * FROM textos';

    conexao.query(query, (error, result) => {
        if (error) {
            console.error('Erro ao selecionar mensagem:', error);
            return res.status(500).json({ error: 'Erro ao selecionar mensagem.' });
        }

        res.status(200).json({result});
    });


});



app.delete('/salvar', (req, res)=>{
    const { texto } = req.body;
    if(!texto){
        return res.status(400).json({ error: 'Texto não fornecido.' });
    }

    const query = 'DELETE FROM textos WHERE id > 0';

    conexao.query(query, [texto], (error, result) => {
        if (error) {
            console.error('Erro ao deletar no banco:', error);
            return res.status(500).json({ error: 'Erro ao deletar no banco de dados.' });
        }

        res.status(200).json({ message: 'Texto deletado com sucesso!'});
    });

});


app.post('/salvar', (req, res) => { // Endpoint corrigido
    const { texto } = req.body; // Pegando o texto do corpo da requisição

    if (!texto) {
        return res.status(400).json({ error: 'Texto não fornecido.' });
    }

    const query = 'INSERT INTO textos (conteudo) VALUES(?)';

    conexao.query(query, [texto], (error, result) => {
        if (error) {
            console.error('Erro ao inserir no banco:', error);
            return res.status(500).json({ error: 'Erro ao salvar no banco de dados.' });
        }

        res.status(200).json({ message: 'Texto salvo com sucesso!', id: result.insertId });
    });
});


// inicia o servidor ai man

app.listen(port, ()=>{
    console.log(`Servidor ta na url: http://localhost:${port}`);
})
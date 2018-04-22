const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'usuarioZ',
        database: 'db_olympicus',
    });

    connection.query(sqlQry, function(error, results, fields) {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executou!');
    });
}



// CRUD

router.get('/tbl_funcionario', (req, res) => {
    execSQLQuery('SELECT * FROM tbl_funcionario', res);
});

router.get('/tbl_funcionario/:id?', (req, res) => {
    let filter = '';
    if (req.params.id) filter = ' WHERE id_funcionario=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM tbl_funcionario' + filter, res);
});


// DELETA
router.delete('/tbl_funcionario/:id', (req, res) => {
    execSQLQuery('DELETE FROM tbl_funcionario WHERE id_funcionario=' + parseInt(req.params.id), res);
});


// INSERE
router.post('/tbl_funcionario', (req, res) => {
    const id_funcionario = req.body.id_funcionario.substring(0, 150);
    const nome_funcionario = req.body.nome_funcionario.substring(0, 150);
    const senha_funcionario = req.body.senha_funcionario.substring(0, 150);
    const nome_loja = req.body.nome_loja.substring(0, 11);
    const nome_cidade = req.body.nome_cidade.substring(0, 11);
    const nivel_acesso = req.body.nivel_acesso.substring(0, 11);
    const id_postagens = req.body.id_postagens.substring(0, 150);
    execSQLQuery(`INSERT INTO tbl_funcionario(id_funcionario,nome_funcionario,senha_funcionario,nome_loja,nome_cidade,
        nivel_acesso, id_postagens) 
        VALUES('${id_funcionario}','${nome_funcionario}','${senha_funcionario}','${nome_loja}','${nome_cidade}','${nivel_acesso}','${id_postagens}')`, res);
});

// ALTERA
router.patch('/tbl_funcionario/:id', (req, res) => {
    const id_funcionario = parseInt(req.params.id);
    // const id_funcionario = req.body.id_funcionario.substring(0, 150);
    const nome_funcionario = req.body.nome_funcionario.substring(0, 150);
    const senha_funcionario = req.body.senha_funcionario.substring(0, 150);
    const nome_loja = req.body.nome_loja.substring(0, 11);
    const nome_cidade = req.body.nome_cidade.substring(0, 11);
    const nivel_acesso = req.body.nivel_acesso.substring(0, 11);
    const id_postagens = req.body.id_postagens.substring(0, 150);
    execSQLQuery(`UPDATE tbl_funcionario SET nome_funcionario='${nome_funcionario}', senha_funcionario='${senha_funcionario}', 
    nome_loja='${nome_loja}', nome_cidade='${nome_cidade}', nivel_acesso='${nivel_acesso}', id_postagens='${id_postagens}' WHERE id_funcionario=${id_funcionario}`, res)
});
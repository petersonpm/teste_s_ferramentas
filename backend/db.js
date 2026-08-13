const mysql = require('mysql2');

// Cria a conexão com o banco de dados MySQL com as credenciais de acesso
const connection = mysql.createConnection({
    host: 'localhost',      // Endereço do servidor MySQL (local)
    user: 'root',           // Usuário padrão do MySQL
    password: 'root',       // Senha do MySQL (ajuste se a sua senha for diferente)
    database: 'saep_db_praticando' // Nome do banco de dados criado no script SQL
});

// Tenta realizar a conexão com o banco
connection.connect((erro) => {
    if (erro) {
        // Exibe mensagem no terminal se houver erro ao conectar
        console.log('Erro ao conectar ao Banco de Dados:', erro);
        return;
    }
    // Mensagem de confirmação quando a conexão for bem-sucedida
    console.log('Banco de Dados saep_db conectado com sucesso!');
});

// Exporta a variável connection para ser usada no app.js
module.exports = connection;
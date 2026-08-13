// Importa os pacotes principais do Node.js
const express = require('express'); // Framework web para criação de rotas e APIs HTTP
const cors = require('cors');       // Middleware para permitir requisições de origens diferentes (Front-end acessando o Back-end)
const connection = require('./db'); // Importa a conexão com o banco de dados MySQL configurada no db.js

// Inicializa a aplicação Express
const server = express();

// Habilita o CORS para que páginas web (front-end) consigam fazer chamadas fetch() para este servidor
server.use(cors());

// Configura o Express para interpretar requisições enviadas com formato JSON (req.body)
server.use(express.json());

/**
 * ROTA: GET /produtos
 * OBJETIVO: Listar todos os produtos cadastrados no banco de dados.
 * ATENDE: RF04 (Listagem de Produtos).
 */
server.get('/produtos', (req, res) => {
    // Comando SQL para selecionar todos os registros da tabela 'produtos'
    const sql = 'SELECT * FROM produtos';

    // Executa a consulta no MySQL
    connection.query(sql, (erro, resultados) => {
        // Se der erro na consulta SQL, retorna código 500 (Erro Interno) com a mensagem de erro
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        // Retorna a lista de produtos em formato JSON com status 200 (OK)
        return res.json(resultados);
    });
});

/**
 * ROTA: GET /produtos/busca/:nome
 * OBJETIVO: Pesquisar produtos pelo nome (busca parcial/filtro).
 * ATENDE: RF05 (Pesquisa de Produtos).
 */
server.get('/produtos/busca/:nome', (req, res) => {
    // O operador LIKE '%termo%' no SQL busca qualquer registro que contenha a palavra em qualquer parte do nome
    const sql = 'SELECT * FROM produtos WHERE nome LIKE ?';

    // Monta o termo de busca adicionando os curingas '%' antes e depois do nome pesquisado
    const termoBusca = '%' + req.params.nome + '%';

    connection.query(sql, [termoBusca], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        res.json(resultados);
    });
});

// Definindo a porta em que a API ficará rodando (Porta 3025)
const PORT = 3026;

// Inicializa o servidor HTTP para escutar as requisições na porta configurada
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});


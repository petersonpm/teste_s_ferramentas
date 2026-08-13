

listarProdutos();

async function listarProdutos() {
    const resposta = await fetch('http://localhost:3026/produtos');
    const produtos = await resposta.json();
    montarTabela(produtos);
}

function montarTabela(produtos) {
    const tabela = document.getElementById('tabelaProdutos');
    tabela.innerHTML = '';

    produtos.forEach(produto => {
        tabela.innerHTML += `
        <tr>
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>${produto.marca} h</td>
            <td>${produto.estoque}</td>
            <td>${produto.estoque_minimo}</td>
            <td>
                <button onclick="editarProduto(${produto.id})">Editar</button>
                <button onclick="excluirProduto(${produto.id})">Excluir</button>
            </td>
        </tr>
        `;
    });
}

async function pesquisarProduto() {
    const termo = document.getElementById('busca').value;
    if (termo.trim() === '') {
        listarProdutos();
        return;
    }

    const resposta = await fetch(`http://localhost:3026/produtos/busca/${encodeURIComponent(termo)}`);
    const produtos = await resposta.json();
    montarTabela(produtos);
}


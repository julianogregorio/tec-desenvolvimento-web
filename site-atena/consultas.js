function carregarDoStorage() {
    return JSON.parse(localStorage.getItem("dadosLivraria")) || {
        livros: [],
        edicoes: [],
        autores: []
    };
}

function salvarNoStorage(dados) {
    localStorage.setItem("dadosLivraria", JSON.stringify(dados));
}

function excluirRegistro(tipo, id) {
    let dados = carregarDoStorage();
    dados[tipo] = dados[tipo].filter(item => item.id !== id);
    salvarNoStorage(dados);
    alert("Registro excluído com sucesso!");
    location.reload();
}

function preencherTabela(dados, idTabela, campos, tipo) {
    const tabela = document.getElementById(idTabela);
    tabela.innerHTML = "";

    if (!dados.length) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");
        celula.colSpan = campos.length + 1;
        celula.textContent = "Nenhum registro encontrado.";
        celula.style.textAlign = "center";
        linha.appendChild(celula);
        tabela.appendChild(linha);
        return;
    }

    dados.forEach(item => {
        const linha = document.createElement("tr");
        campos.forEach(campo => {
            const celula = document.createElement("td");
            celula.textContent = item[campo] || "-";
            linha.appendChild(celula);
        });

        const celulaExcluir = document.createElement("td");
        const botao = document.createElement("button");
        botao.textContent = "Exlcuir Registro";
        botao.className = "btn-excluir";
        botao.onclick = () => excluirRegistro(tipo, item.id);
        celulaExcluir.appendChild(botao);
        linha.appendChild(celulaExcluir);

        tabela.appendChild(linha);
    });
}

const dados = carregarDoStorage();

if (document.getElementById("tabela-livros")) {
    preencherTabela(dados.livros, "tabela-livros", ["id", "titulo", "isbn", "autor"], "livros");
}

if (document.getElementById("tabela-autores")) {
    preencherTabela(dados.autores, "tabela-autores", ["id", "nome", "nacionalidade"], "autores");
}

if (document.getElementById("tabela-edicoes")) {
    preencherTabela(dados.edicoes, "tabela-edicoes", ["id", "livro", "ano", "editora", "numeroEdicao"], "edicoes");
}

function logout() {
    window.location.href = "index.html";
}
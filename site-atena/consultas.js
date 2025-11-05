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
    botao.textContent = "Excluir";
    botao.className = "btn-excluir";
    botao.onclick = () => excluirRegistro(tipo, item.id);
    celulaExcluir.appendChild(botao);
    linha.appendChild(celulaExcluir);
    tabela.appendChild(linha);
  });
}

/* ==== INÍCIO DO SCRIPT ==== */

const dados = carregarDoStorage();

/* ---- LISTAGEM DE AUTORES ---- */
if (document.getElementById("tabela-autores")) {
  preencherTabela(dados.autores, "tabela-autores", ["id", "nome", "nacionalidade"], "autores");
}

/* ---- LISTAGEM DE LIVROS ---- */
if (document.getElementById("tabela-livros")) {
  const livrosComAutores = dados.livros.map(l => {
    const autor = dados.autores.find(a => a.id === l.id_autor);
    return {
      id: l.id,
      titulo: l.titulo,
      isbn: l.isbn,
      autor: autor ? autor.nome : "Autor não encontrado"
    };
  });
  preencherTabela(livrosComAutores, "tabela-livros", ["id", "titulo", "isbn", "autor"], "livros");
}

/* ---- LISTAGEM DE EDIÇÕES ---- */
if (document.getElementById("tabela-edicoes")) {
  const edicoesComLivros = dados.edicoes.map(e => {
    const livro = dados.livros.find(l => l.id === e.id_livro);
    return {
      id: e.id,
      livro: livro ? livro.titulo : "Livro não encontrado",
      ano: e.ano,
      editora: e.editora,
      numeroEdicao: e.numeroEdicao
    };
  });
  preencherTabela(edicoesComLivros, "tabela-edicoes", ["id", "livro", "ano", "editora", "numeroEdicao"], "edicoes");
}

function logout() {
  window.location.href = "index.html";
}

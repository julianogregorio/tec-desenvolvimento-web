// ==============================
// LIVRARIA PALAS ATENA - SISTEMA
// ==============================

//Armazenamento local (localStorage)
function salvarNoStorage(dados) {
  localStorage.setItem("dadosLivraria", JSON.stringify(dados));
}

function carregarDoStorage() {
  return JSON.parse(localStorage.getItem("dadosLivraria")) || {
    livros: [],
    edicoes: [],
    autores: []
  };
}

// Carrega os dados existentes (ou cria novos)
let dados = carregarDoStorage();

// ==============================
// MONITORAMENTO DE FORMULÁRIOS
// ==============================
document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", validarFormulario);
});

// ==============================
// FUNÇÃO PRINCIPAL DE VALIDAÇÃO
// ==============================
function validarFormulario(event) {
  event.preventDefault();

  // Campos genéricos: verificar se estão vazios
  const campos = event.target.querySelectorAll("input");
  let formularioValido = true;

  campos.forEach(campo => {
    if (campo.value.trim() === "") {
      formularioValido = false;
    }
  });

  if (!formularioValido) {
    alert("Por favor, preencha todos os campos antes de continuar.");
    return;
  }

  // ==========================
  // FORMULÁRIO DE LOGIN
  // ==========================
  if (event.target.id === "form-login") {
    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!/^\d+$/.test(usuario)) {
      alert("O campo Usuário deve conter apenas números (sem pontos, traços ou letras).");
      return;
    }

    if (usuario.length !== 11) {
      alert("O campo Usuário deve conter exatamente 11 números.");
      return;
    }

    if (senha.length < 4) {
      alert("A senha deve conter no mínimo 4 caracteres.");
      return;
    }

    alert("Login realizado com sucesso!");
    event.target.submit();
    return;
  }

  // ==========================
  // FORMULÁRIO DE LIVROS
  // ==========================
  if (event.target.id === "form-livros") {
    const titulo = document.getElementById("titulo").value.trim();
    const isbn = document.getElementById("isbn").value.trim();
    const autor = document.getElementById("autor").value.trim();

    if (!/^\d+$/.test(isbn)) {
      alert("O campo ISBN deve conter apenas números.");
      return;
    }

    const novoLivro = {
      id: dados.livros.length + 1,
      titulo: titulo,
      isbn: isbn,
      autor: autor
    };

    dados.livros.push(novoLivro);
    salvarNoStorage(dados);
    alert("Livro cadastrado com sucesso!");
    event.target.reset();
    return;
  }

  // ==========================
  // FORMULÁRIO DE EDIÇÕES
  // ==========================
  if (event.target.id === "form-edicoes") {
    const livro = document.getElementById("livro").value.trim();
    const ano = document.getElementById("ano").value.trim();
    const editora = document.getElementById("editora").value.trim();
    const numeroEdicao = document.getElementById("numero_edicao").value.trim();

    if (!/^\d+$/.test(ano) || parseInt(ano) < 1) {
      alert("O campo Ano deve conter apenas números maiores ou iguais a 1.");
      return;
    }

    if (!/^\d+$/.test(numeroEdicao) || parseInt(numeroEdicao) < 1) {
      alert("O campo Número da Edição deve conter apenas números maiores ou iguais a 1.");
      return;
    }

    const novaEdicao = {
      id: dados.edicoes.length + 1,
      livro: livro,
      ano: ano,
      editora: editora,
      numeroEdicao: numeroEdicao
    };

    dados.edicoes.push(novaEdicao);
    salvarNoStorage(dados);
    alert(" Edição cadastrada com sucesso!");
    event.target.reset();
    return;
  }

  // ==========================
  // FORMULÁRIO DE AUTORES
  // ==========================
  if (event.target.id === "form-autores") {
    const nome = document.getElementById("nome").value.trim();
    const nacionalidade = document.getElementById("nacionalidade").value.trim();

    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nacionalidade)) {
      alert("O campo Nacionalidade deve conter apenas letras.");
      return;
    }

    if (nacionalidade.length < 3) {
      alert("O campo Nacionalidade deve ter pelo menos 3 caracteres.");
      return;
    }

    const novoAutor = {
      id: dados.autores.length + 1,
      nome: nome,
      nacionalidade: nacionalidade
    };

    dados.autores.push(novoAutor);
    salvarNoStorage(dados);
    alert("Autor cadastrado com sucesso!");
    event.target.reset();
    return;
  }

  // Se tudo estiver certo e não for formulário especial
  event.target.submit();
}

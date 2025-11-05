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

let dados = carregarDoStorage();

document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", validarFormulario);
});

function validarFormulario(event) {
  event.preventDefault();
  const campos = event.target.querySelectorAll("input, select");
  let formularioValido = true;

  campos.forEach(campo => {
    if (campo.value.trim() === "") formularioValido = false;
  });

  if (!formularioValido) {
    alert("Por favor, preencha todos os campos antes de continuar.");
    return;
  }

  // LOGIN
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

  // CADASTRO DE AUTORES
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
      nome,
      nacionalidade
    };

    dados.autores.push(novoAutor);
    salvarNoStorage(dados);
    alert("Autor cadastrado com sucesso!");
    event.target.reset();
    atualizarSelectAutores();
    return;
  }

  // CADASTRO DE LIVROS
  if (event.target.id === "form-livros") {
    const titulo = document.getElementById("titulo").value.trim();
    const isbn = document.getElementById("isbn").value.trim();
    const idAutor = parseInt(document.getElementById("autor").value);

    if (!/^\d+$/.test(isbn)) {
      alert("O campo ISBN deve conter apenas números.");
      return;
    }

    const novoLivro = {
      id: dados.livros.length + 1,
      titulo,
      isbn,
      id_autor: idAutor
    };

    dados.livros.push(novoLivro);
    salvarNoStorage(dados);
    alert("Livro cadastrado com sucesso!");
    event.target.reset();
    atualizarSelectLivros();
    return;
  }

  // CADASTRO DE EDIÇÕES
  if (event.target.id === "form-edicoes") {
    const idLivro = parseInt(document.getElementById("livro").value);
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
      id_livro: idLivro,
      ano,
      editora,
      numeroEdicao
    };

    dados.edicoes.push(novaEdicao);
    salvarNoStorage(dados);
    alert("Edição cadastrada com sucesso!");
    event.target.reset();
    return;
  }
}

/* ==== FUNÇÕES PARA POPULAR SELECTS ==== */

function atualizarSelectAutores() {
  const dados = carregarDoStorage();
  const selectAutor = document.getElementById("autor");
  if (!selectAutor) return;

  selectAutor.innerHTML = "";
  if (dados.autores.length === 0) {
    const opt = document.createElement("option");
    opt.textContent = "Nenhum autor cadastrado";
    opt.disabled = true;
    opt.selected = true;
    selectAutor.appendChild(opt);
    return;
  }

  dados.autores.forEach(autor => {
    const opt = document.createElement("option");
    opt.value = autor.id;
    opt.textContent = `${autor.nome} (ID: ${autor.id})`;
    selectAutor.appendChild(opt);
  });
}

function atualizarSelectLivros() {
  const dados = carregarDoStorage();
  const selectLivro = document.getElementById("livro");
  if (!selectLivro) return;

  selectLivro.innerHTML = "";
  if (dados.livros.length === 0) {
    const opt = document.createElement("option");
    opt.textContent = "Nenhum livro cadastrado";
    opt.disabled = true;
    opt.selected = true;
    selectLivro.appendChild(opt);
    return;
  }

  dados.livros.forEach(livro => {
    const opt = document.createElement("option");
    opt.value = livro.id;
    opt.textContent = `${livro.titulo} (ID: ${livro.id})`;
    selectLivro.appendChild(opt);
  });
}

/* ==== CHAMAR AO CARREGAR ==== */
window.onload = function () {
  atualizarSelectAutores();
  atualizarSelectLivros();
};

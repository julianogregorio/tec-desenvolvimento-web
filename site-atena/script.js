// Escuta todos os formulários e aplica a função de validação
document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", validarFormulario);
});

// Função de validação
function validarFormulario(event) {
    event.preventDefault(); // impede o envio automático

    // Seleciona todos os campos do formulário atual
    const campos = event.target.querySelectorAll("input");
    let formularioValido = true;

    // Verifica se há algum campo vazio
    campos.forEach(campo => {
        if (campo.value.trim() === "") {
            formularioValido = false;
        }
    });

    // Se encontrar campo vazio, mostra alerta
    if (!formularioValido) {
        alert("Por favor, preencha todos os campos antes de continuar.");
        return; // interrompe a função
    }

    // Se tudo estiver ok, envia o formulário normalmente
    event.target.submit();
}

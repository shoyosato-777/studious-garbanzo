criar_mesa.js
function criarMesa() {
    const nomeMesa = document.getElementById("nomeMesa").value;
    const codigoMesa = document.getElementById("codigoMesa").value;
    const mensagem = document.getElementById("mensagem");
    
    if (!nomeMesa || !codigoMesa) {
        mensagem.innerHTML = "<span style='color: red;'>Preencha todos os campos!</span>";
        return;
    }
    
    const mesas = JSON.parse(localStorage.getItem("mesas")) || [];
    
    if (mesas.some(mesa => mesa.codigo === codigoMesa)) {
        mensagem.innerHTML = "<span style='color: orange;'>Este código já está em uso!</span>";
        return;
    }
    
    const novaMesa = { nome: nomeMesa, codigo: codigoMesa };
    mesas.push(novaMesa);
    localStorage.setItem("mesas", JSON.stringify(mesas));
    
    mensagem.innerHTML = `<span style='color: lightgreen;'>Mesa criada com sucesso! Código: <b>${codigoMesa}</b></span>`;
    document.getElementById("nomeMesa").value = "";
    document.getElementById("codigoMesa").value = "";
}
function criarMesa() {
    const nomeMesa = document.getElementById("nomeMesa").value.trim();
    const codigoMesa = document.getElementById("codigoMesa").value.trim();
    
    if (!nomeMesa || !codigoMesa) {
        document.getElementById("mensagem").innerText = "Preencha todos os campos!";
        return;
    }

    // Verifica se o código já existe
    let mesas = JSON.parse(localStorage.getItem("mesas")) || {};

    if (mesas[codigoMesa]) {
        document.getElementById("mensagem").innerText = "Código já está em uso. Escolha outro.";
        return;
    }

    // Cria a mesa e define o mestre
    mesas[codigoMesa] = {
        nome: nomeMesa,
        mestre: true, // Define o criador como mestre
        jogadores: []
    };

    localStorage.setItem("mesas", JSON.stringify(mesas));

    // Redireciona para a página da mesa, incluindo o código na URL
    window.location.href = `mesa.html?codigo=${codigoMesa}&mestre=true`;
}

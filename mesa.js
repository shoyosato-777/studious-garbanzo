mesa.js
// Função para capturar parâmetros da URL
function getParametroURL(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

// Pega o código da mesa e verifica se o usuário é o mestre
const codigoMesa = getParametroURL("codigo");
const isMestre = getParametroURL("mestre") === "true";

if (!codigoMesa) {
    document.getElementById("mesaConteudo").innerHTML = "<p>Erro: Código da mesa não encontrado.</p>";
} else {
    // Atualiza o título e define se o usuário é mestre ou jogador
    document.getElementById("tituloMesa").innerText = `Mesa: ${codigoMesa}`;
    document.getElementById("tipoUsuario").innerText = isMestre ? "Você é o Mestre desta mesa." : "Você é um Jogador.";

    // Carregar informações da mesa do localStorage
    let mesas = JSON.parse(localStorage.getItem("mesas")) || {};
    let mesa = mesas[codigoMesa];

    if (!mesa) {
        document.getElementById("mesaConteudo").innerHTML = "<p>Essa mesa não existe.</p>";
    } else {
        document.getElementById("mesaConteudo").innerHTML = `
            <h2>${mesa.nome}</h2>
            <p>Jogadores na mesa: ${mesa.jogadores.length}</p>
            ${isMestre ? "<button onclick='editarMesa()'>Editar Fichas</button>" : ""}
        `;
    }
}

// Função para sair da mesa
function sairMesa() {
    window.location.href = "index.html"; // Ou qualquer página inicial
}

// Busca as mesas salvas no LocalStorage
let mesas = JSON.parse(localStorage.getItem("mesas")) || {};
let mesa = mesas[codigoMesa];

// Se a mesa não existir, mostra um erro
if (!mesa) {
    document.getElementById("mesaConteudo").innerHTML = "<p>Essa mesa não existe.</p>";
} else {
    document.getElementById("tituloMesa").innerText = `Mesa: ${mesa.nome}`;
    document.getElementById("tipoUsuario").innerText = isMestre ? "Você é o Mestre." : "Você é um Jogador.";

    // Se for um jogador, adiciona ele à lista da mesa
    if (!isMestre) {
        const jogadorNome = prompt("Digite seu nome de jogador:");
        if (jogadorNome) {
            mesa.jogadores.push({ nome: jogadorNome, vida: 100, mana: 50 });
            localStorage.setItem("mesas", JSON.stringify(mesas));
        }
    }

    atualizarMesa();
}

// Atualiza a interface da mesa
function atualizarMesa() {
    let conteudo = `
        <h2>${mesa.nome}</h2>
        <h3>Jogadores:</h3>
        <ul id="listaJogadores">
    `;

    mesa.jogadores.forEach((jogador, index) => {
        conteudo += `
            <li>
                ${jogador.nome} - HP: ${jogador.vida}, Mana: ${jogador.mana}
                ${isMestre ? `<button onclick="editarFicha(${index})">✏️ Editar</button>` : ""}
            </li>
        `;
    });

    conteudo += "</ul>";

    document.getElementById("mesaConteudo").innerHTML = conteudo;
}

const fichasContainer = document.getElementById("lista-fichas");

// Exemplo de fichas iniciais (pode ser substituído por um banco de dados futuramente)
let fichasJogadores = [
    { nome: "Arthur", idade: 25, genero: "Masculino", vida: 100, sanidade: 80 },
    { nome: "Elena", idade: 23, genero: "Feminino", vida: 90, sanidade: 95 }
];

// Função para exibir as fichas na tela
function atualizarFichas() {
    fichasContainer.innerHTML = "";
    fichasJogadores.forEach((ficha, index) => {
        const fichaDiv = document.createElement("div");
        fichaDiv.classList.add("ficha");
        fichaDiv.innerHTML = `
            <h3>${ficha.nome}</h3>
            <p>Idade: ${ficha.idade}</p>
            <p>Gênero: ${ficha.genero}</p>
            <p>Vida: <span id="vida-${index}">${ficha.vida}</span></p>
            <p>Sanidade: <span id="sanidade-${index}">${ficha.sanidade}</span></p>
            <button class="editarFicha" onclick="editarFicha(${index})">✏️ Editar</button>
        `;
        fichasContainer.appendChild(fichaDiv);
    });
}

// Permitir que o mestre edite as fichas
function editarFicha(index) {
    let novaVida = prompt("Nova Vida:", fichasJogadores[index].vida);
    let novaSanidade = prompt("Nova Sanidade:", fichasJogadores[index].sanidade);

    if (novaVida !== null) fichasJogadores[index].vida = parseInt(novaVida);
    if (novaSanidade !== null) fichasJogadores[index].sanidade = parseInt(novaSanidade);

    atualizarFichas();
}

// Inicia a exibição das fichas ao carregar a página
atualizarFichas();

// Função para exibir as fichas na tela
function atualizarFichas() {
    fichasContainer.innerHTML = "";
    fichasJogadores.forEach((ficha, index) => {
        const fichaDiv = document.createElement("div");
        fichaDiv.classList.add("ficha");
        fichaDiv.innerHTML = `
            <h3>${ficha.nome}</h3>
            <p>Vida: <span id="vida-${index}">${ficha.vida}</span></p>
            <p>Mana: <span id="mana-${index}">${ficha.mana}</span></p>
            <button class="editarFicha" onclick="editarFicha(${index})">✏️ Editar</button>
        `;
        fichasContainer.appendChild(fichaDiv);
    });
}
// Inicia a exibição das fichas ao carregar a página
atualizarFichas();

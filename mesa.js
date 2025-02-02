mesa.js
document.addEventListener("DOMContentLoaded", () => {
    const listaFichas = document.getElementById("lista-fichas");

    if (!listaFichas) {
        console.error("Erro: Elemento #lista-fichas não encontrado.");
        return;
    }

    // Dados de exemplo (poderiam vir de um banco de dados)
    let fichas = JSON.parse(localStorage.getItem("fichas")) || [
        { nome: "Alduin", idade: 32, genero: "Masculino", vida: 100, sanidade: 80 },
        { nome: "Lilith", idade: 25, genero: "Feminino", vida: 85, sanidade: 90 }
    ];

    function salvarFichas() {
        localStorage.setItem("fichas", JSON.stringify(fichas));
    }

    function atualizarLista() {
        listaFichas.innerHTML = ""; // Limpa antes de renderizar

        fichas.forEach((ficha, index) => {
            const fichaElemento = document.createElement("div");
            fichaElemento.classList.add("ficha");

            fichaElemento.innerHTML = `
                <h3>${ficha.nome}</h3>
                <p>Idade: ${ficha.idade}</p>
                <p>Gênero: ${ficha.genero}</p>
                <label>Vida: <input type="number" min="0" max="100" value="${ficha.vida}" data-index="${index}" class="input-vida"></label>
                <label>Sanidade: <input type="number" min="0" max="100" value="${ficha.sanidade}" data-index="${index}" class="input-sanidade"></label>
                <button class="btn-remover" data-index="${index}">Remover</button>
            `;

            listaFichas.appendChild(fichaElemento);
        });

        // Eventos para editar vida e sanidade
        document.querySelectorAll(".input-vida").forEach(input => {
            input.addEventListener("input", (e) => {
                let index = e.target.dataset.index;
                fichas[index].vida = parseInt(e.target.value);
                salvarFichas();
            });
        });

        document.querySelectorAll(".input-sanidade").forEach(input => {
            input.addEventListener("input", (e) => {
                let index = e.target.dataset.index;
                fichas[index].sanidade = parseInt(e.target.value);
                salvarFichas();
            });
        });

        // Evento para remover ficha
        document.querySelectorAll(".btn-remover").forEach(button => {
            button.addEventListener("click", (e) => {
                let index = e.target.dataset.index;
                fichas.splice(index, 1);
                salvarFichas();
                atualizarLista();
            });
        });
    }

    atualizarLista();

    // Função para sair da mesa
    window.sairMesa = function () {
        localStorage.removeItem("fichas");
        alert("Você saiu da mesa!");
        window.location.href = "index.html"; // Redirecionar para a página inicial (altere se necessário)
    };
});

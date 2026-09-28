// Número da próxima nota
let numeroNota = 3;


// Adiciona uma nova nota
function adicionarNota() {

    const container = document.getElementById("notasContainer");

    const notaItem = document.createElement("div");

    notaItem.classList.add("nota-item");

    notaItem.innerHTML = `
        <label>Nota ${numeroNota}</label>

        <input
            type="number"
            class="nota"
            min="0"
            max="10"
            step="0.01"
            placeholder="Ex.: 7.5"
        >

        <button
            type="button"
            class="btn-remover"
            onclick="removerNota(this)"
            title="Remover nota"
        >
            ×
        </button>
    `;

    container.appendChild(notaItem);

    numeroNota++;

    atualizarNumeracao();
}


// Remove uma nota
function removerNota(botao) {

    const container = document.getElementById("notasContainer");

    const notas = container.querySelectorAll(".nota-item");

    // Não permite remover todas as notas
    if (notas.length <= 1) {

        alert("É necessário ter pelo menos uma nota.");

        return;
    }

    botao.parentElement.remove();

    atualizarNumeracao();
}


// Atualiza a numeração das notas
function atualizarNumeracao() {

    const itens = document.querySelectorAll(".nota-item");

    itens.forEach((item, index) => {

        const label = item.querySelector("label");

        label.textContent = `Nota ${index + 1}`;

    });

    numeroNota = itens.length + 1;
}


// Calcula a média
function calcularMedia() {

    const campos = document.querySelectorAll(".nota");

    const resultado = document.getElementById("resultado");

    let notas = [];

    // Percorre os campos
    campos.forEach(campo => {

        const valor = campo.value.trim();

        // Ignora campos vazios
        if (valor !== "") {

            const nota = Number(valor);

            // Verifica se a nota é válida
            if (isNaN(nota) || nota < 0 || nota > 10) {

                alert(
                    "Digite apenas notas entre 0 e 10."
                );

                campo.focus();

                return;
            }

            notas.push(nota);
        }

    });


    // Verifica se existe alguma nota
    if (notas.length === 0) {

        resultado.className = "resultado";

        resultado.innerHTML = `
            <span class="resultado-titulo">
                Digite pelo menos uma nota.
            </span>
        `;

        return;
    }


    // Soma as notas
    const soma = notas.reduce(
        (total, nota) => total + nota,
        0
    );


    // Calcula a média
    const media = soma / notas.length;


    // Arredonda para duas casas
    const mediaFormatada = media.toFixed(2);


    let status;
    let classe;


    /*
        Regra utilizada:

        Média >= 7:
        Aprovado

        Média >= 5 e < 7:
        Recuperação

        Média < 5:
        Reprovado
    */

    if (media >= 7) {

        status = "Aprovado! 🎉";

        classe = "aprovado";

    } else if (media >= 5) {

        status = "Recuperação";

        classe = "recuperacao";

    } else {

        status = "Reprovado";

        classe = "reprovado";

    }


    // Exibe o resultado
    resultado.className = `resultado ${classe}`;

    resultado.innerHTML = `
        <div class="media">
            ${mediaFormatada}
        </div>

        <div class="status">
            ${status}
        </div>

        <div style="margin-top: 8px;">
            ${notas.length} nota(s) calculada(s)
        </div>
    `;
}


// Limpa todas as notas
function limparTudo() {

    const container = document.getElementById("notasContainer");

    const resultado = document.getElementById("resultado");


    // Mantém apenas duas notas iniciais
    container.innerHTML = `

        <div class="nota-item">

            <label>Nota 1</label>

            <input
                type="number"
                class="nota"
                min="0"
                max="10"
                step="0.01"
                placeholder="Ex.: 7.5"
            >

            <button
                type="button"
                class="btn-remover"
                onclick="removerNota(this)"
                title="Remover nota"
            >
                ×
            </button>

        </div>


        <div class="nota-item">

            <label>Nota 2</label>

            <input
                type="number"
                class="nota"
                min="0"
                max="10"
                step="0.01"
                placeholder="Ex.: 8.0"
            >

            <button
                type="button"
                class="btn-remover"
                onclick="removerNota(this)"
                title="Remover nota"
            >
                ×
            </button>

        </div>

    `;


    numeroNota = 3;


    // Restaura o resultado
    resultado.className = "resultado";

    resultado.innerHTML = `
        <span class="resultado-titulo">
            Sua média aparecerá aqui
        </span>
    `;
}

// Variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função para reiniciar o jogo
function reiniciar() {
    desempenho = 0;
    tentativas = 0;
    acertos = 0;
    jogar = true;
    btnJogarNovamente.className = 'visivel btn btn-primary';
    btnReiniciar.className = 'invisivel btn btn-danger';
    jogarNovamente();
    atualizaPlacar(0, 0);
}
  
// Função para jogar novamente
function jogarNovamente() {
    jogar = true;
    let divis = document.getElementsByTagName("div");
    for (let i = 0; i < divis.length; i++) {
        if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3) {
            divis[i].className = "inicial";
            divis[i].innerHTML = divis[i].id; // Reseta o conteúdo para o ponto de interrogação
        }
    }
    let imagem = document.getElementById("imagem");
    let imagem2 = document.getElementById("imagem2");
    if (imagem != "") {
        imagem.remove();
        imagem2.remove();
    }
}

// Função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
    desempenho = (acertos / tentativas) * 100;
    document.getElementById("resposta").innerHTML = `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

// Função quando o jogador acerta
function acertou(obj) {
    obj.className = "acertou";
    const img = new Image(80);
    img.id = "imagem";
    img.src = "https://thumbs.dreamstime.com/b/emoticon-grande-do-sorriso-26256350.jpg"; // Imagem de smile
    obj.innerHTML = ""; // Limpa o texto da div
    obj.appendChild(img);
}

// Função que verifica o palpite
function verifica(obj) {
    if (jogar) {
        jogar = false;
        tentativas++;
        if (tentativas == 4) {
            btnJogarNovamente.className = 'invisivel btn btn-primary';
            btnReiniciar.className = 'visivel btn btn-danger';
        }

        let sorteado = Math.floor(Math.random() * 4);
        if (obj.id == sorteado) {
            acertou(obj);
            acertos++;
        } else {
            obj.className = "errou";
            const img = new Image(80);
            img.id = "imagem2";
            img.src = "https://st.depositphotos.com/1001911/57436/v/1600/depositphotos_574367430-stock-illustration-unsatisfied-emoji-emoticon-showing-thumb.jpg"; // Emoji com dedo para baixo
            obj.innerHTML = ""; // Limpa o texto da div
            obj.appendChild(img);

            const objSorteado = document.getElementById(sorteado);
            acertou(objSorteado);
        }
        atualizaPlacar(acertos, tentativas);
    } else {
        alert('Clique em "Jogar novamente"');
    }
}

// Eventos dos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);

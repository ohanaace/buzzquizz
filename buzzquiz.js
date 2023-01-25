function abrirCriarQuizzInfo() { // executada ao clicar em criar quizz 

    const main = document.querySelector("main");
    const info = document.querySelector(".info");

    main.classList.add("escondido"); // adiciona display none na tela inicial
    info.classList.remove("escondido"); // remove display none na criação de quizz etapa informações
}

function urlEhValida(possivelUrl) {
    try {
        testeUrl = new URL(possivelUrl); // se for possivel executar, então é url
        return true;
    } catch {
        return false; // se não for possivel, então não é url
    }
}

function criarQuizzInfo() { // executada o clicar em "Prosseguir pra criar perguntas"

    let inputs = document.querySelectorAll(".info input"); // array com inputs

    const titulo = inputs[0].value;
    const imagemUrl = inputs[1].value;
    const quantidadePerguntas = inputs[2].value;
    const quantidadeNiveis = inputs[3].value;


    const tituloValido = titulo.length >= 20 && titulo.length <= 65;
    const imagemUrlValida = urlEhValida(imagemUrl);
    const quantidadePerguntasValida = quantidadePerguntas >= 3;
    const quantidadeNiveisValida = quantidadeNiveis >= 2;

    if (!tituloValido) {
        alert("Título do quizz: deve ter no mínimo 20 e no máximo 65 caracteres.");
    }
    if (!imagemUrlValida) {
        alert("URL da Imagem: deve ter formato de URL.");
    }
    if (!quantidadePerguntasValida) {
        alert("Quantidade de perguntas: no mínimo 3 perguntas.");
    }
    if (!quantidadeNiveisValida) {
        alert("Quantidade de níveis: no mínimo 2 níveis.");
    }


    const preenchidoCorretamente = tituloValido && imagemUrlValida && quantidadePerguntasValida && quantidadeNiveisValida;

    if (preenchidoCorretamente) {
        alert("em breve criação de perguntas");
    }
    console.log(titulo);
} 
function scrollUp(){
    window.scrollTo(0, 0);
}
function reiniciaQuizz(){
    scrollUp();
    const respostasAnteriores = document.querySelectorAll('.resposta');
   console.log(respostasAnteriores);

for(let i = 0; i < respostasAnteriores.length; i++){
    if(respostasAnteriores[i].classList.contains('nao-marcada')){
        respostasAnteriores[i].classList.remove('nao-marcada');
        }
    if(respostasAnteriores[i].children[1].classList.contains('correta')){
        respostasAnteriores[i].children[1].classList.remove('correta');
        }
    if(respostasAnteriores[i].children[1].classList.contains('errada')){
        respostasAnteriores[i].children[1].classList.remove('errada');
        }
    }

    const caixaDeResultado = document.querySelector('.resultado');
    caixaDeResultado.classList.add('escondido')
}
function voltaParaHome(){
    const quizzPage = document.querySelector('.container');
    quizzPage.classList.add('escondido');

    const homePage = document.querySelector('main');
    homePage.classList.remove('escondido');
}
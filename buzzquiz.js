const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';
let idQuizzes = [];
const novoQuizz = {
    title: "Título do quizz",
    image: "https://http.cat/411.jpg",
    questions: [
        {
            title: "Título da pergunta 1",
            color: "#123456",
            answers: [
                {
                    text: "Texto da resposta 1",
                    image: "https://http.cat/411.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Texto da resposta 2",
                    image: "https://http.cat/412.jpg",
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Título da pergunta 2",
            color: "#123456",
            answers: [
                {
                    text: "Texto da resposta 1",
                    image: "https://http.cat/411.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Texto da resposta 2",
                    image: "https://http.cat/412.jpg",
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Título da pergunta 3",
            color: "#123456",
            answers: [
                {
                    text: "Texto da resposta 1",
                    image: "https://http.cat/411.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Texto da resposta 2",
                    image: "https://http.cat/412.jpg",
                    isCorrectAnswer: false
                }
            ]
        }
    ],
    levels: [
        {
            title: "Título do nível 1",
            image: "https://http.cat/411.jpg",
            text: "Descrição do nível 1",
            minValue: 0
        },
        {
            title: "Título do nível 2",
            image: "https://http.cat/412.jpg",
            text: "Descrição do nível 2",
            minValue: 50
        }
    ]
};

function abrirFechartela(telaFechar, telaAbrir) { // fecha uma tela e abre outra - Pedro

    telaFechar.classList.add("escondido"); // fecha o primeiro parâmetro
    telaAbrir.classList.remove("escondido"); // abre o segundo parâmetro
}

function urlEhValida(possivelUrl) { // retorna true para url e false caso não seja - Pedro
    try { // tenta executar uma operação restrita a url's
        testeUrl = new URL(possivelUrl);
        return true; // caso consiga retorna true
    } catch {
        return false; // se não for possivel, não é url, logo retorna false;
    }
}

function corValida(codigoCor) { // verifica se é um codigo de cor valido - Pedro

    if (codigoCor === "") { // se o codigo for string vazia
        return false;
    }

    const hexadecimais = "0123456789abcdefghijklmnopkrstuvwxyz"; // string que contem todos caracteres hexadecimais minusculos

    const contem7Caracteres = codigoCor.length === 7; // deve conter 7 caracteres "#" + 6 hexadecimais
    const começaCorretamente = codigoCor[0] === "#"; // primeiro caracter deve ser "#"

    let caracteresHexadecimais; // pode receber true ou false

    for (let i = 1; i < 7; i++) { // percorre o código da cor exeto o primeiro caracter, que deve ser "#"
        if (!hexadecimais.includes(codigoCor[i].toLowerCase())) { // se o caracter, em letra minuscula está contido na string de hexadecimais
            caracteresHexadecimais = false;
            break;
        }
        caracteresHexadecimais = true;
    }

    if (contem7Caracteres && começaCorretamente && caracteresHexadecimais) { // se cumprir todos requisitos para um cogigo de cor
        return true;
    } else {
        return false;
    }
}

function selecionaChild(divPai, qualFilho) { // seleciona um filho - Pedro
    return divPai.querySelector(`:nth-child(${qualFilho})`);
}

function abrirCriarQuizzInfo() { // fecha tela 1 abre tela 3.1 - Pedro

    const main = document.querySelector("main");
    const info = document.querySelector(".criação-info");

    abrirFechartela(main, info);
}

function criarQuizzInfo() { // verifica se inputs foram preenchidos corretamente, se sim executa a próxima função - Pedro

    let inputs = document.querySelectorAll(".criação-info input"); // array com inputs de criação de perguntas (info)

    const titulo = inputs[0].value;
    const imagemUrl = inputs[1].value;
    const quantidadePerguntas = inputs[2].value;
    const quantidadeNiveis = inputs[3].value;


    const tituloValido = titulo.length >= 20 && titulo.length <= 65; // titulo deve conter entre 20 e 65 caracteres
    const imagemUrlValida = urlEhValida(imagemUrl); // url deve ser valida
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
        abrirCriarQuizzPerguntas(quantidadePerguntas);
    }
}

function abrirCriarQuizzPerguntas(quantidaDePerguntas) { // fecha tela 3.1 abre tela 3.2 - Pedro

    const info = document.querySelector(".criação-info");
    const perguntas = document.querySelector(".criação-perguntas");

    abrirFechartela(info, perguntas);


    let divsPerguntas = "";

    for (let i = 1; i <= quantidaDePerguntas; i++) { // executa quantidadeDePerguntas vezes, para cada execução adiciona uma div para criar pergunta
        divsPerguntas += `
        <div class="perguntas-respostas">
            <div>
                <span>pergunta ${i}</span>
                <ion-icon onclick="abrirInputPerguntas(this)" name="create-outline"></ion-icon>
            </div>
        </div>
        `
    }

    perguntas.innerHTML = ` 
        <div>
            Crie suas perguntas
        </div>
        ${divsPerguntas}
        <button onclick="criarQuizzPerguntas(this)">Prosseguir pra criar niveis</button>
    ` // todo o conteudo que será exibido
}

function abrirInputPerguntas(ionIcon) { // abre a div exibindo inputs, ocorre na tela 3.2 - Pedro

    const div = ionIcon.parentNode.parentNode; // div que será alterada
    const pergunta = ionIcon.parentNode.querySelector("span").innerHTML; // Pergunta "x" irmã do ionIcon clicado

    div.innerHTML = ` 

        <span>${pergunta}</span>
        <input type="text" placeholder="Texto da pergunta">
        <input type="text" placeholder="Cor de fundo da pergunta">
        <span>Resposta correta</span>
        <input type="text" placeholder="Resposta correta">
        <input type="text" placeholder="URL da imagem">
        <span>Respostas incorretas</span>
        <input type="text" placeholder="Resposta incorreta 1">
        <input type="text" placeholder="URL da imagem 1">
        <input type="text" placeholder="Resposta incorreta 2">
        <input type="text" placeholder="URL da imagem 2">
        <input type="text" placeholder="Resposta incorreta 3">
        <input type="text" placeholder="URL da imagem 3">
    ` // altera a div exibindo seus inputs
}

function criarQuizzPerguntas(button) { // verifica se inputs foram preenchidos corretamente, se sim executa a próxima função - Pedro

    const divPai = button.parentNode; // div que contem titulo, pergutas para criar e botão
    const divs = divPai.querySelectorAll(".perguntas-respostas"); //  array com divs de criação de perguntas

    let perguntasPreenchidasCorretamente = true; // poderá receber false ao falhar com algum requisito


    for (let i = 0; i < divs.length; i++) { // percorre todas as divs de criação de perguntas

        const perguntaDiv = divs[i];

        const divFoiAberta = perguntaDiv.innerHTML.includes("input"); // caso a string "input" esteja no innerHTML da div de criação de pergunta, significa que ela foi aberta

        if (!divFoiAberta) {
            alert(`Se esqueceu da pergunta ${i + 1}`);
            perguntasPreenchidasCorretamente = false;
            break; // como descumpriu um requisito finaliza o loop
        }


        const textoDaPergunta = selecionaChild(perguntaDiv, 2).value;
        const codigoCor = selecionaChild(perguntaDiv, 3).value;
        const respostaCorreta = selecionaChild(perguntaDiv, 5).value;
        const urlDaImagem = selecionaChild(perguntaDiv, 6).value;
        const respostaIncorreta1 = selecionaChild(perguntaDiv, 8).value;
        const urlDaImagem1 = selecionaChild(perguntaDiv, 9).value;
        const respostaIncorreta2 = selecionaChild(perguntaDiv, 10).value;
        const urlDaImagem2 = selecionaChild(perguntaDiv, 11).value;
        const respostaIncorreta3 = selecionaChild(perguntaDiv, 12).value;
        const urlDaImagem3 = selecionaChild(perguntaDiv, 13).value;

        const textoDaPerguntaValido = textoDaPergunta.length >= 20; // contem no minimo 20 caracteres
        const CorDeFundoDaPerguntaValida = corValida(codigoCor);
        const respostaCorretaValida = respostaCorreta !== ""; // não pode estar vazia
        const urlDaImagemValida = urlEhValida(urlDaImagem);
        const respostasIncorretasValidas = respostaIncorreta1 !== "" || respostaIncorreta2 !== "" || respostaIncorreta3 !== ""; // deve ter ao menos uma resposta errada
        const urlDaImagem1Valida = (respostaIncorreta1 !== "" && urlEhValida(urlDaImagem1)) || respostaIncorreta1 === ""; // caso a resposta errada tenha sido preenchida, a url deve ser valida
        const urlDaImagem2Valida = (respostaIncorreta2 !== "" && urlEhValida(urlDaImagem2)) || respostaIncorreta2 === ""; // analogo ao de cima
        const urlDaImagem3Valida = (respostaIncorreta3 !== "" && urlEhValida(urlDaImagem3)) || respostaIncorreta3 === ""; // analogo ao de cima


        const perguntaDivValida = textoDaPerguntaValido && CorDeFundoDaPerguntaValida && respostaCorretaValida && urlDaImagemValida && respostasIncorretasValidas && urlDaImagem1Valida && urlDaImagem2Valida && urlDaImagem3Valida;

        if (!perguntaDivValida) { // se algum requisito foi descumprido
            alert(`Tem algo de errado na criação de pergunta ${i + 1}`);
            perguntasPreenchidasCorretamente = false;
        }
    }

    if (perguntasPreenchidasCorretamente) {
        alert("em breve criação de niveis");
    }
}

//                            ------Bugada------
// function erro(){//pode ter argumentos, erro('codigo do erro: 42') ou erro(42, 25)
//     let errorTree='';
//     let prevCaller=erro.caller;
//     while(prevCaller!==null){
//         errorTree+=` <= ${prevCaller.name}`;
//         prevCaller=prevCaller.caller;
//     }
//     console.log(`Erro\nCaller: ${errorTree}`);
//     console.log(Object.values(arguments));
// }

function enviarQuizz() {
    const promess = axios.post(url, novoQuizz);
    promess.then(resp => {
        console.log('envio bem sucedido');
        const tempIdQuizzes = localStorage.getItem('idQuizzes');
        if (tempIdQuizzes !== null) idQuizzes = tempIdQuizzes;
        idQuizzes.push(resp.data);
    });
    promess.catch(resp => console.log(resp.response.status));
}

function scrollUp() {
    window.scrollTo(0, 0);
}
function reiniciaQuizz() {
    scrollUp();
    const respostasAnteriores = document.querySelectorAll('.resposta');
    for (let i = 0; i < respostasAnteriores.length; i++) {
        if (respostasAnteriores[i].classList.contains('nao-marcada')) {
            respostasAnteriores[i].classList.remove('nao-marcada');
        }
        if (respostasAnteriores[i].children[1].classList.contains('correta')) {
            respostasAnteriores[i].children[1].classList.remove('correta');
        }
        if (respostasAnteriores[i].children[1].classList.contains('errada')) {
            respostasAnteriores[i].children[1].classList.remove('errada');
        }
    }

    const caixaDeResultado = document.querySelector('.resultado');
    caixaDeResultado.classList.add('escondido')
}
function voltaParaHome() {
    const quizzPage = document.querySelector('.container');
    quizzPage.classList.add('escondido');

    const homePage = document.querySelector('main');
    homePage.classList.remove('escondido');
}

function respostaEscolhida(meuPalpite){
    const respostasPossiveis = document.querySelector('.caixa-de-resposta').children;
    console.log(meuPalpite);
    console.log(respostasPossiveis);
    for(let i = 0; i < respostasPossiveis.length; i++){
        const elementoAnalisado = respostasPossiveis[i];
        elementoAnalisado.classList.add('nao-marcada');
        if(elementoAnalisado.innerHTML === meuPalpite.innerHTML){
            elementoAnalisado.classList.remove('nao-marcada');
        }
    }
}

function renderizarQuizzes(quizzes) {
    const elementSeusQuizzes = document.querySelector('.seu-quizzes .container-cards');
    const elementOutrosQuizzes = document.querySelector('.outros-quizzes .container-cards');
    elementSeusQuizzes.innerHTML = '';
    elementOutrosQuizzes.innerHTML = '';
    elementSeusQuizzes.parentNode.classList.add('escondido');
    elementOutrosQuizzes.parentNode.classList.add('escondido');
    console.log(quizzes);
    for (let i = 0; i < quizzes.length; i++) {
        let jaAdicionado = false;
        for (let j = 0; j < idQuizzes.length; j++) {
            if (quizzes[i].id === idQuizzes[j]) {
                elementSeusQuizzes += `
                <div class="cards">
                    <img src="${quizzes[i].image}" alt="${quizzes[i].title}">
                    <span>${quizzes[i].title}</span>
                </div>
                `;
                jaAdicionado = true;
                elementSeusQuizzes.parentNode.classList.remove('escondido');
                document.querySelector('.criar-quiz').classList.add('escondido');
                break;
            }
        }
        if (jaAdicionado === false) {
            elementOutrosQuizzes.innerHTML += `
            <div class="cards">
            <img src="${quizzes[i].image}" alt="${quizzes[i].title}">
            <span>${quizzes[i].title}</span>
            </div>
            `;
            elementOutrosQuizzes.parentNode.classList.remove('escondido');
        }
    }
}

function pegarQuizzes() {
    const promess = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promess.then(resp => renderizarQuizzes(resp.data));
    promess.catch(resp => {
        console.log('Erro ao pegar quizzes');
        console.log(resp.response.status)
    });
}

pegarQuizzes()






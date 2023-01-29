const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';
let idSeusQuizzes = [];
let todosQuizzes=[];
let respostasCorretasQuizzSelecionado=[];
let quantidadeDeAcertosDoUsuario = 0;
let cliqueParaScroll = 0;
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

function construirQuizzNiveis(quantidaDeNiveis) { // cria tela de criação de níveis - Pedro

    const niveis = document.querySelector(".criação-niveis");


    let divsNiveis = "";

    for (let i = 1; i <= quantidaDeNiveis; i++) { // executa quantidaDeNiveis vezes, para cada execução adiciona uma div para criar um nivel
        divsNiveis += `
        <div class="nives-acertos">
            <div>
                <span>Nível ${i}</span>
                <ion-icon onclick="abrirInputNiveis(this)" name="create-outline"></ion-icon>
            </div>
        </div>
        `
    }

    niveis.innerHTML = ` 
        <div onclick='tempTest(this)'>
            Agora, decida os níveis!
        </div>
        ${divsNiveis}
        <button onclick="finalizarQuizz(this)">Finalizar Quizz</button>
    ` // todo o conteudo que será exibido
}

function criarQuizzInfo() { // verifica se inputs foram preenchidos corretamente, se sim executa a próxima função - Pedro

    let inputs = document.querySelectorAll(".criação-info input"); // array com inputs de criação de perguntas (info)

    const titulo = inputs[0].value;
    const imagemUrl = inputs[1].value;
    const quantidadePerguntas = inputs[2].value;
    const quantidadeNiveis = inputs[3].value;

    novoQuizz.title = titulo; // API
    novoQuizz.image = imagemUrl; // API

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
        construirQuizzNiveis(quantidadeNiveis);
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
        <div onclick="tempTest(this)">
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

    novoQuizz.questions = []; // zera o array de questions da API


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


        const respostas = [ // cria array de respostas que fica dentro de cada pergunta da API, considerando que todas foram preenchidas
            {
                text: respostaCorreta,
                image: urlDaImagem,
                isCorrectAnswer: true
            },
            {
                text: respostaIncorreta1,
                image: urlDaImagem1,
                isCorrectAnswer: false
            },
            {
                text: respostaIncorreta2,
                image: urlDaImagem2,
                isCorrectAnswer: false
            },
            {
                text: respostaIncorreta3,
                image: urlDaImagem3,
                isCorrectAnswer: false
            }
        ]

        for (let j = 1; j <= respostas.length - 1;) { // caso alguma resposta esteja vazia é removido do array de respostas 
            if (respostas[j].text === "") {
                respostas.splice(j, 1);
            } else {
                j++;
            }
        }

        const pergunta = { // cria cria pergunta completa no formato da API
            title: textoDaPergunta,
            color: codigoCor,
            answers: respostas
        }

        novoQuizz.questions.push(pergunta); // adiciona ao array da API


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
            console.log(`${textoDaPerguntaValido} ${CorDeFundoDaPerguntaValida} ${respostaCorretaValida} ${urlDaImagemValida} ${respostasIncorretasValidas} ${urlDaImagem1Valida} ${urlDaImagem2Valida} ${urlDaImagem3Valida}`);
            perguntasPreenchidasCorretamente = false;
        }
    }

    if (perguntasPreenchidasCorretamente) {
        abrirCriarQuizzNiveis();
        console.log(novoQuizz); // deixei para testes
    }
}

function abrirCriarQuizzNiveis() { // fecha tela 3.2 abre tela 3.3 - Pedro

    const niveis = document.querySelector(".criação-niveis");
    const perguntas = document.querySelector(".criação-perguntas");

    abrirFechartela(perguntas, niveis);
}

function abrirInputNiveis(ionIcon) { // abre a div exivindo inputs, ocorre na tela 3.3 - Pedro

    const div = ionIcon.parentNode.parentNode; // div que será alterada
    const nivel = ionIcon.parentNode.querySelector("span").innerHTML; // nivel "x" irmã do ionIcon clicado

    div.innerHTML = ` 
        <span>${nivel}</span>
        <input type="text" placeholder="Título do nível">
        <input type="number" placeholder="% de acerto mínima">
        <input type="text" placeholder="URL da imagem do nível">
        <input type="text" placeholder="Descrição do nível">
    ` // altera a div exibindo seus inputs
}

function finalizarQuizz(button) { // verifica se inputs foram preenchidos corretamente, se sim deverá ir para tela de sucesso - Pedro

    novoQuizz.levels = []; // zera niveis da API

    const divPai = button.parentNode; // div que contem titulo, niveis para criar e botão
    const divs = divPai.querySelectorAll(".nives-acertos"); //  array com divs de criação de niveis

    let niveisPreenchidosCorretamente = true; // poderá receber false ao falhar com algum requisito
    let existeAcertoMinimo0 = false; // recebe true caso algum acerto minimo seja igual a 0

    for (let i = 0; i < divs.length; i++) { // percorre todas as divs de criação de niveis

        const nivelDiv = divs[i];

        const divFoiAberta = nivelDiv.innerHTML.includes("input"); // caso a string "input" esteja no innerHTML da div de criação de nivel, significa que ela foi aberta

        if (!divFoiAberta) {
            alert(`Se esqueceu do nivel ${i + 1}`);
            niveisPreenchidosCorretamente = false;
            break; // como descumpriu um requisito finaliza o loop
        }

        const tituloDoNivel = selecionaChild(nivelDiv, 2).value;
        const acertoMinimo = +selecionaChild(nivelDiv, 3).value;
        const urlDaImagem = selecionaChild(nivelDiv, 4).value;
        const descriçãoDoNivel = selecionaChild(nivelDiv, 5).value;

        const levelApi = { // cria nivel no formato da API
            title: tituloDoNivel,
            image: urlDaImagem,
            text: descriçãoDoNivel,
            minValue: acertoMinimo
        }

        novoQuizz.levels.push(levelApi); // adiciona no array de niveis da API

        if (acertoMinimo === 0) {
            existeAcertoMinimo0 = true;
        }

        const tituloDoNivelValido = tituloDoNivel.length >= 10; // contem no minimo 10 caracteres
        const acertoMinimoValido = acertoMinimo >= 0 && acertoMinimo <= 100; // entre 0 e 100
        const urlDaImagemValida = urlEhValida(urlDaImagem);
        const descriçãoDoNivelValida = descriçãoDoNivel.length >= 30 // minimo 30 caracteres


        const nivelDivValido = tituloDoNivelValido && acertoMinimoValido && urlDaImagemValida && descriçãoDoNivelValida;

        if (!nivelDivValido) { // se algum requisito foi descumprido
            alert(`Tem algo de errado na criação de nivel ${i + 1}`);
            niveisPreenchidosCorretamente = false;
        }
    }

    if (niveisPreenchidosCorretamente && existeAcertoMinimo0) {
        //alert("em breve tela de quizz pronto");
        enviarQuizz()
        console.log(novoQuizz); // para testes
    } else (alert("no minimo um nivel deve conter acerto mínimo igual a 0"));
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
        const tempIdQuizzes = JSON.parse(localStorage.getItem('idQuizzes'));
        if (tempIdQuizzes !== null) idSeusQuizzes = tempIdQuizzes;
        idSeusQuizzes.push(resp.data.id);
        localStorage.setItem('idQuizzes',JSON.stringify(idSeusQuizzes));
        voltaParaHome()
    });
    promess.catch(resp => console.log('Erro ao enviar quiz\ncode:'+resp.response.status));
}

function scrollUp() {
    window.scrollTo(0, 0);
}
function reiniciaQuizz() {
    scrollUp();
    cliqueParaScroll = 0;
    quantidadeDeAcertosDoUsuario = 0;
    console.log(quantidadeDeAcertosDoUsuario);
    const respostasAnteriores = document.querySelectorAll('.resposta');
    for (let i = 0; i < respostasAnteriores.length; i++) {
        if (respostasAnteriores[i].classList.contains('nao-marcada')) {
            respostasAnteriores[i].classList.remove('nao-marcada');
        }
        if (respostasAnteriores[i].classList.contains('marcada')) {
            respostasAnteriores[i].classList.remove('marcada');
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
    cliqueParaScroll = 0;
    quantidadeDeAcertosDoUsuario = 0;
    console.log(quantidadeDeAcertosDoUsuario);
    const quizzPage = document.querySelector('.container');
    quizzPage.classList.add('escondido');

    const homePage = document.querySelector('main');
    homePage.classList.remove('escondido');

    const criarNiveis = document.querySelector('.criação-niveis');
    criarNiveis.classList.add('escondido');
    //-Rafael

    pegarQuizzes()//atualizar os quizzes -Rafael
}


function checkRespostas(){
    const marcadas=document.querySelectorAll('#tela2 .pergunta .marcada');
    console.log()
    if(marcadas.length>=document.querySelectorAll('#tela2 .pergunta').length){
        alert('Todas as perguntas respondidas')
    }
}



function respostaEscolhida(meuPalpite, pergunta) {


    if(meuPalpite.classList.contains('nao-marcada') || meuPalpite.classList.contains('marcada')){
        return;
    }
    const respostasPossiveis = meuPalpite.parentNode.children;
    for(let i = 0; i< respostasPossiveis.length; i++){
        if(respostasCorretasQuizzSelecionado[pergunta]===i){
            respostasPossiveis[i].children[1].classList.add('correta');
          }
          else{
            respostasPossiveis[i].children[1].classList.add('errada');
          }
    }
    if(meuPalpite.children[1].classList.contains('correta')){
        quantidadeDeAcertosDoUsuario++
    }
    console.log(quantidadeDeAcertosDoUsuario);
    console.log(meuPalpite);
    console.log(respostasPossiveis);
    for (let i = 0; i < respostasPossiveis.length; i++) {
        const elementoAnalisado = respostasPossiveis[i];
        elementoAnalisado.classList.add('nao-marcada');

        //↓retirei os .innerHTML para que msm que as duas respostas sejam exatamente iguais funcione↓ -Rafael
        //elementoAnalisado.innerHTML === meuPalpite.innerHTML
        if (elementoAnalisado === meuPalpite) {
            elementoAnalisado.classList.remove('nao-marcada');
            elementoAnalisado.classList.add('marcada');
        }
    }
    cliqueParaScroll++
    checkRespostas()
    setTimeout(proximaPergunta, 2000);
}
function proximaPergunta(){
    const proximaPergunta = document.querySelector('.quiz').children;
    const scrollaParaProxima = proximaPergunta[cliqueParaScroll];
    scrollaParaProxima.scrollIntoView()
}
//criado para embaralhar as respostas - Suelen

//const respostasEmbaralhadas = document.querySelectorAll('.minha-resposta').sort(embaralhaRespostas);
function embaralhaRespostas(){return Math.random() - 0.5;}; //↓usando na função entrarNoQuizz()↓


function entrarNoQuizz(quizzIndex){
    const quizzSelecionado=todosQuizzes[quizzIndex];
    console.log(quizzSelecionado);
    document.querySelector('main').classList.add('escondido');
    let elemento=document.querySelector('#tela2');
    elemento.classList.remove('escondido');
    elemento.querySelector('.titulo-quiz').innerHTML=quizzSelecionado.title;
    elemento.querySelector('.banner img').src=quizzSelecionado.image;
    elemento=elemento.querySelector('.quiz');
    elemento.innerHTML='';
    
    for(let i=0; i<quizzSelecionado.questions.length;i++){
        const tempPergunta=quizzSelecionado.questions[i];
        elemento.innerHTML+=`
            <div class="pergunta">
                <div style="background-color: ${tempPergunta.color}" class="caixa-de-pergunta">
                    <p class="minha-pergunta">${tempPergunta.title}</p>
                </div>
                <div class="caixa-de-resposta">
                </div>
            </div>
        `;
        
        const tempResposta=tempPergunta.answers.sort(embaralhaRespostas);//embaralhar respostas
        
        for(let i=0;i<tempResposta.length;i++){//guardar a resposta correta em respostasCorretasQuizzSelecionado
            if(tempResposta[i].isCorrectAnswer===true){
                respostasCorretasQuizzSelecionado.push(i);
                break;
            } 
        }
        
        const caixaResposta=elemento.querySelectorAll('.pergunta')[i].querySelector('.caixa-de-resposta');
        
        for(let j=0;j<tempResposta.length;j++){
            caixaResposta.innerHTML+=`
                <div class="resposta" onclick="respostaEscolhida(this,${i},${j})">
                    <img src="${tempResposta[j].image}"alt="" />
                    <p class="minha-resposta">${tempResposta[j].text}</p>
                </div>
            `;
        }
    }
    elemento.innerHTML+=`
        <div class="opcoes">
            <button class="reiniciar" onclick="reiniciaQuizz()">Reiniciar Quiz</button>
            <button class="voltar" onclick="voltaParaHome()"> Voltar para home</button>
        </div>
    `
}


function renderizarQuizzes(quizzes) {
    console.log(quizzes);
    todosQuizzes=quizzes;
    idSeusQuizzes=JSON.parse(localStorage.getItem('idQuizzes'));
    const elementSeusQuizzes = document.querySelector('.seu-quizzes .container-cards');
    const elementOutrosQuizzes = document.querySelector('.outros-quizzes .container-cards');
    elementSeusQuizzes.innerHTML = '';
    elementOutrosQuizzes.innerHTML = '';
    elementSeusQuizzes.parentNode.classList.add('escondido');
    elementOutrosQuizzes.parentNode.classList.add('escondido');
    for (let i = 0; i < quizzes.length; i++) {
        let jaAdicionado = false;
        if(idSeusQuizzes!==null){
            for (let j = 0; j < idSeusQuizzes.length; j++) {
                if (quizzes[i].id === idSeusQuizzes[j]) {
                    elementSeusQuizzes.innerHTML += `
                    <div onclick="entrarNoQuizz(${i})" class="cards">
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
        }
        if (jaAdicionado === false) {
            elementOutrosQuizzes.innerHTML += `
            <div onclick="entrarNoQuizz(${i})" class="cards">
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

function tempTest(el){
    if(el.innerHTML.includes('Comece pelo começo')){
        el=el.nextElementSibling.children;
        el[0].value=`Outro quiz a mesma cara ${idSeusQuizzes.length}`;
        el[1].value='https://www.hypeness.com.br/1/2017/03/Phillip-Kremer-Trump-720c.jpg';
        el[2].value=Math.floor(Math.random()*5+3);
        el[3].value=Math.floor(Math.random()*5+2);
    }else if(el.innerHTML.includes('Crie suas perguntas')){
        el=el.parentNode.querySelectorAll('.perguntas-respostas');
        for(let i=0;i<el.length;i++){
            el[i].children[0].children[1].click();
            el[i].children[1].value=`Titulo da pergunta ${i}`;
            el[i].children[2].value=`#${Math.floor(Math.random()*101+100).toString(16).toUpperCase()}${Math.floor(Math.random()*101+100).toString(16).toUpperCase()}${Math.floor(Math.random()*101+100).toString(16).toUpperCase()}`;
            el[i].children[4].value=`Resposta correta`;
            el[i].children[5].value=`https://www.hypeness.com.br/1/2017/03/Screen-Shot-03-27-17-at-08.50-PM-001.jpg`
            for(let j=0;j<Math.floor(Math.random()*3+1);j++){
                el[i].children[7+j*2].value=`Resposta incorreta ${j+1}`;
                el[i].children[8+j*2].value=`https://www.hypeness.com.br/1/2017/03/Phillip-Kremer-Trump-720d-e1490659591873.jpg`;
            }
        }
    }else if(el.innerHTML.includes('Agora, decida os níveis!')){
        el=el.parentNode.querySelectorAll('.nives-acertos');
        for(let i=0;i<el.length;i++){
            el[i].children[0].children[1].click();
            el[i].children[1].value=`Titulo do nivel ${i}`;
            el[i].children[2].value=`${Math.floor(i*80/el.length)}`;
            el[i].children[3].value=`https://www.hypeness.com.br/1/2017/03/Phillip-Kremer-Trump-720e-e1490659598164.jpg`;
            el[i].children[4].value=`descrição desse nivel ${i} em especifico`
        }

    }
}


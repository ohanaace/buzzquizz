const url='https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';
let idQuizzes=[];
const novoQuizz={
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

function enviarQuizz(){
    const promess=axios.post(url,novoQuizz);
    promess.then(resp=>{
        console.log('envio bem sucedido');
        const tempIdQuizzes=localStorage.getItem('idQuizzes');
        if(tempIdQuizzes!==null) idQuizzes=tempIdQuizzes;
        idQuizzes.push(resp.data);
    });
    promess.catch(resp=>console.log(resp.response.status));
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

function renderizarQuizzes(quizzes){
    const elementSeusQuizzes=document.querySelector('.seu-quizzes .container-cards');
    const elementOutrosQuizzes=document.querySelector('.outros-quizzes .container-cards');
    elementSeusQuizzes.innerHTML='';
    elementOutrosQuizzes.innerHTML='';
    elementSeusQuizzes.parentNode.classList.add('escondido');
    elementOutrosQuizzes.parentNode.classList.add('escondido');
    console.log(quizzes);
    for(let i=0;i<quizzes.length;i++){
        let jaAdicionado=false;
        for(let j=0;j<idQuizzes.length;j++){
            if(quizzes[i].id===idQuizzes[j]){
                elementSeusQuizzes+=`
                <div class="cards">
                    <img src="${quizzes[i].image}" alt="${quizzes[i].title}">
                    <span>${quizzes[i].title}</span>
                </div>
                `;
                jaAdicionado=true;
                elementSeusQuizzes.parentNode.classList.remove('escondido');
                document.querySelector('.criar-quiz').classList.add('escondido');
                break;
            }
        }
        if(jaAdicionado===false){
            elementOutrosQuizzes.innerHTML+=`
            <div class="cards">
            <img src="${quizzes[i].image}" alt="${quizzes[i].title}">
            <span>${quizzes[i].title}</span>
            </div>
            `;
            elementOutrosQuizzes.parentNode.classList.remove('escondido');
        }
    }
}

function pegarQuizzes(){
    const promess=axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promess.then(resp=>renderizarQuizzes(resp.data));
    promess.catch(resp=>{
        console.log('Erro ao pegar quizzes');
        console.log(resp.response.status)
    });
}

pegarQuizzes()
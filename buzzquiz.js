function criarQuizzInfo() { // executada ao clicar em criar quizz

    const main = document.querySelector("main");
    const info = document.querySelector(".info");

    main.classList.add("escondido"); // adiciona display none na tela inicial
    info.classList.remove("escondido"); // remove display none na criação de quizz etapa informações
}


//ELEMENTOS DO JOGO
const areaJogo = document.querySelector('.area-jogo');
const personagemEsquerdo = document.querySelector('.personagem-esquerdo');
const cano = document.querySelector('.cano');
const bomba = document.querySelector('.bomba');
const moeda = document.querySelector('.moeda');
const nuvem = document.querySelector('.nuvem');

//ELEMENTOS START E RESTART//
const start = document.querySelector('.start');
const restart = document.querySelector('.restart');
const gameOver = document.querySelector('.gameOver');
const restart2 = document.querySelector('.restart2');

//ELEMENTOS TROCA DE PERSONAGEM
const areaTrocaPersonagem = document.querySelector('.area-trocaPersonagem');
const mario = document.getElementById('mario');
const yoshi = document.getElementById('yoshi');
let selecionadoPersonagem = 'mario';

//ELEMENTOS SCORE//
const areaPontuacao = document.querySelector('.area-pontuacaoVida');
const valorScore = document.getElementById('valor-score');
const pontuacaoMoeda = document.getElementById('valor-score10');
score = 0;

//ELEMENTOS VIDA//
const vidasElemento = document.querySelector('.vida');
const vida1 = document.querySelector('.vida1');
const vida2 = document.querySelector('.vida2');
const vida3 = document.querySelector('.vida3');
let vida = 3;

//ELEMENTOS MUSICA E EFEITOS SONOROS DO JOGO//
const musicaTema = document.getElementById('musica-tema');
const somPular = document.getElementById('som-pular');
const somMoeda = document.getElementById('som-moeda');
const somDeath = document.getElementById('som-death');
const somGameOver = document.getElementById('som-gameover');

//BOTÃO E ÍCONE MÚSICA//
const botaoMusica = document.getElementById('botaoMusica');
const icone = botaoMusica.querySelector('i');

//CHAVE PARA VALIDAR AÇÕES//
let validaPulo = false;
let validaEnter = false;
let validaGameoverRestart = false;
let pontuou = false;
let pontuouMoeda = false;
let pontuouBomba = false;
let validaMoeda = false;
let validaReset = false;
let validaCano = false;

//VARIÁVEIS INICIAR BOMBA//
let bombaAparece = false;
let bombaInterval;

//VARIÁVEIS INICIAR MOEDA//
let moedaAparece = false;
let moedaInterval;

//VARIÁVEIS INICIAR CANO//
let canoAparece = false;
let canoInterval;

//CHAVE PARA VALIDAR COLISÕES//
let validaColisao = false;






//TROCA DE PERSONAGEM
mario.addEventListener('click', () => {
    selecionadoPersonagem = 'mario';
    validaEnter = true;

    areaTrocaPersonagem.style.display = 'none';
    start.style.display = 'block';
    areaPontuacao.style.display = 'flex';
    vidasElemento.style.display = '';

    personagemEsquerdo.style.display = 'block';
    personagemEsquerdo.src = './imagens/supermario.gif';
    personagemEsquerdo.style.width = '50px';
    personagemEsquerdo.style.height = '50px';
    personagemEsquerdo.style.bottom = '0px';
    personagemEsquerdo.style.left = '0px'; 
    personagemEsquerdo.style.marginLeft = '0px';

    atualizarVida();
    vida = 3;
});
yoshi.addEventListener('click', () => {
    selecionadoPersonagem = 'yoshi';
    validaEnter = true;

    areaTrocaPersonagem.style.display = 'none';
    start.style.display = 'block';
    areaPontuacao.style.display = 'flex';
    vidasElemento.style.display = '';

    personagemEsquerdo.src = './imagens/yoshi.gif';
    personagemEsquerdo.style.width = '45px';
    personagemEsquerdo.style.height = '30px';
    personagemEsquerdo.style.bottom = '0px';
    personagemEsquerdo.style.left = '0px';
    personagemEsquerdo.style.marginLeft = '0px';

    atualizarVida();
    vida = 3;
});

//START//
const play = () =>{
    start.style.display = "none";
    validaPulo = true;

    musicaTema.volume = 0.05;
    somPular.volume = 0.05;

    run();
}

//INICIA A ANIMAÇÃO DA MOEDA//
const iniciaMoeda = () =>{
    if(score >= 5 && !moedaAparece){
        moedaAparece = true;

        moeda.classList.add('moeda-animation');
        setTimeout(() => {
            moeda.classList.remove('moeda-animation');
        }, 2000);

        moedaInterval = setInterval(() => {
            moeda.classList.add('moeda-animation');
            setTimeout(() => {
                moeda.classList.remove('moeda-animation');
            }, 2000);
        }, 10000);
    }
}

//INICIA A ANIMAÇÃO DA BOMBA//
const iniciaBomba = () =>{
    if(score >= 10 && !bombaAparece){
        bombaAparece = true;

        bomba.classList.add('bomba-animation');
        setTimeout(() => {
            bomba.classList.remove('bomba-animation');
        }, 1000);

        bombaInterval = setInterval(() => {
            bomba.classList.add('bomba-animation');
            setTimeout(() => {
                bomba.classList.remove('bomba-animation');
            }, 1000);
        }, 4000);
    }
}

//ATUALIZAR VIDA//
const atualizarVida = () =>{
    if(vida === 3){
        vidasElemento.classList.add('vida-animation');
        vidasElemento.style.display = 'flex';
        setTimeout(() =>{
            vidasElemento.classList.remove('vida-animation');
        }, 1000);
    }else if(vida === 2){
        vidasElemento.classList.add('vida-animation');
        vida1.style.display = 'none';

        setTimeout(() =>{
            vidasElemento.classList.remove('vida-animation');
        }, 1000);
    }else if(vida === 1){
        vidasElemento.classList.add('vida-animation');
        vida2.style.display = 'none';

        setTimeout(() =>{
            vidasElemento.classList.remove('vida-animation');
        }, 1000);
    }else if(vida === 0){
        vidasElemento.classList.add('vida-animation');
        vida3.style.display = 'none';
        somDeath.remove();
        somGameOver.play();

        setTimeout(() =>{
            vidasElemento.classList.remove('vida-animation');
        }, 1000);
    }
}

//GAME OVER 1//
const gameOver1 = () =>{
    const personagemPosicao = window.getComputedStyle(personagemEsquerdo).bottom.replace('px','');
    const canoPosicao = cano.offsetLeft;
    const nuvemPosicao = nuvem.offsetLeft;
    const bombaPosicao = bomba.offsetLeft;
    const moedaPosicao = moeda.offsetLeft;

    cano.style.left = `${canoPosicao}px`;
    nuvem.style.left = `${nuvemPosicao}px`;
    bomba.style.left = `${bombaPosicao}px`;
    moeda.style.left = `${moedaPosicao}px`;
    personagemEsquerdo.style.bottom = `${personagemPosicao}px`;

    cano.classList.remove('cano-animation');
    nuvem.classList.remove('nuvem-animation');
    moeda.classList.remove('moeda-animation');
    bomba.classList.remove('bomba-animation');

    clearInterval(moedaInterval);
    moedaAparece = false;

    clearInterval(bombaInterval)
    bombaAparece = false;

    if(selecionadoPersonagem === 'mario'){
        personagemEsquerdo.src = './imagens/mariogameover.png';
        personagemEsquerdo.style.width = '26px';
        personagemEsquerdo.style.height = '39.05px';
        personagemEsquerdo.style.bottom = '0px';
        personagemEsquerdo.style.marginLeft = '19px';

    }else if(selecionadoPersonagem === 'yoshi'){
        personagemEsquerdo.src = './imagens/yoshigameover.png';
        personagemEsquerdo.style.width = '26px';
        personagemEsquerdo.style.height = '39.05px';
        personagemEsquerdo.style.bottom = '0px';
        personagemEsquerdo.style.marginLeft = '19px';
    }

    restart.style.display = 'block';
    gameOver.style.display = 'block';

     validaPulo = false;
     validaReset = true;
}

//GAME OVER 2//
const gameOver2 = () =>{
    restart.style.display = 'none';
    gameOver.style.display = 'none';
    restart2.style.display = 'block';
    validaGameoverRestart = true;

    cano.style.left = '';
    moeda.style.left = '';
    bomba.style.left = '';
    nuvem.style.left = '';

    if(selecionadoPersonagem === 'mario'){
        personagemEsquerdo.style.display = 'block';
        personagemEsquerdo.src = './imagens/supermario.gif';
        personagemEsquerdo.style.width = '50px';
        personagemEsquerdo.style.height = '50px';
        personagemEsquerdo.style.bottom = '';
        personagemEsquerdo.style.left = '';
        personagemEsquerdo.style.marginLeft = '0px';

    }else if(selecionadoPersonagem ===  'yoshi'){
        personagemEsquerdo.src = './imagens/yoshi.gif';
        personagemEsquerdo.style.width = '45px';
        personagemEsquerdo.style.height = '30px';
        personagemEsquerdo.style.bottom = '';
        personagemEsquerdo.style.left = '';
        personagemEsquerdo.style.marginLeft = '0px';
    }

    personagemEsquerdo.classList.add('vida-animation');
    setTimeout(() => {
    personagemEsquerdo.classList.remove('vida-animation');
    }, 1000);
}

//CHAMA RESET DO GAME OVER 1//
const gameOverRestart = () =>{
    restart2.style.display = 'none';
    validaPulo = true;

    run();
}

//ONDE RODA O GAME//
function run() {
    nuvem.classList.add('nuvem-animation');
    cano.classList.add('cano-animation');

    const loop = setInterval (() =>{
        const canoPosicao = cano.offsetLeft;
        const bombaPosicao = bomba.offsetLeft;
        const moedaPosicao = moeda.offsetLeft;
        const nuvemPosicao = nuvem.offsetLeft;
        const personagemPosicao = window.getComputedStyle(personagemEsquerdo).bottom.replace('px','');


        if(score >= 5 && !moedaAparece){
            setTimeout(() => {
                iniciaMoeda();
            }, 1000);
        }
    
        if(score >= 10 && !bombaAparece){
            setTimeout(() => {
                iniciaBomba(); 
            }, 1500);   
        }

        //COLISÃO GAME OVER E PONTUAÇÃO OBSTACULO//
        if(canoPosicao <= 45 && canoPosicao >= 0 && personagemPosicao < 26 || bombaPosicao < 45 && bombaPosicao > 0 && personagemPosicao > 45 && personagemPosicao < 60){
            const personagemPosicao = window.getComputedStyle(personagemEsquerdo).bottom.replace('px','');
            const canoPosicao = cano.offsetLeft;
            const nuvemPosicao = nuvem.offsetLeft;
            const bombaPosicao = bomba.offsetLeft;
            const moedaPosicao = moeda.offsetLeft;

            cano.style.left = `${canoPosicao}px`;
            nuvem.style.left = `${nuvemPosicao}px`;
            bomba.style.left = `${bombaPosicao}px`;
            moeda.style.left = `${moedaPosicao}px`;
            personagemEsquerdo.style.bottom = `${personagemPosicao}px`;

            cano.classList.remove('cano-animation');
            nuvem.classList.remove('nuvem-animation');
            moeda.classList.remove('moeda-animation');
            bomba.classList.remove('bomba-animation');

            gameOver1();
            somDeath.play();

            vida--;
            atualizarVida();

            if (vida > 0) {
                restart.style.display = 'none';

                setTimeout(() => {
                    gameOver2();
                }, 4000);
            }

            validaEnter = false;

            clearInterval(loop);

        } else if (canoPosicao < 0 && !pontuou) {
            score++;
            valorScore.textContent = score;
            pontuou = true;
        } else if (canoPosicao > 45) {
            pontuou = false;
        };

        if(moedaPosicao < 40 && moedaPosicao > 20 && personagemPosicao > 70 && !pontuouMoeda){
            score+=10;
            valorScore.textContent = score;
            pontuouMoeda = true;
            somMoeda.play();
            pontuacaoMoeda.style.display = 'block';

            moeda.style.left = `${moedaPosicao}px`;
            moeda.classList.add('moeda-animation-1');

            setTimeout(() => {
                moeda.classList.remove('moeda-animation-1');
                moeda.style.left = '';
            }, 500);

        setTimeout(() =>{
            pontuacaoMoeda.style.display = 'none';
        }, 1000);
        }else if(personagemPosicao < 70){
            pontuouMoeda = false;
        };
    
    }, 10);
}


//RESET//
const reset = () =>{
    restart.style.display = 'none';
    gameOver.style.display = 'none';
    vida1.style.display = 'flex';
    vida2.style.display = 'flex';
    vida3.style.display = 'flex';
    areaTrocaPersonagem.style.display = 'flex';

    musicaTema.volume = 1;

    cano.style.left = '';
    moeda.style.left = '';
    bomba.style.left = '';
    nuvem.style.left = '';

    cano.classList.remove('.cano-animation');
    nuvem.classList.remove('.nuvem-animation');
    moeda.classList.remove('.moeda-animation');
    bomba.classList.remove('.bomba-animation');

    personagemEsquerdo.src = '';
    personagemEsquerdo.style.display = 'block';
    personagemEsquerdo.style.width = '';
    personagemEsquerdo.style.height = '';
    personagemEsquerdo.style.bottom = '';
    personagemEsquerdo.style.left = '';

    areaPontuacao.style.display = 'none';
    score = 0;
    valorScore.textContent = score;
    vida = 3;

}

//FAZ O PERSONAGEM PULAR
const pular = () => {
    if(validaPulo) {
        personagemEsquerdo.classList.add('pular');
        somPular.play();

    setTimeout (() => {
        personagemEsquerdo.classList.remove('pular');
    }, 425);
    }
}








//AÇÃO DAS TECLAS DO COMPUTADOR//
document.addEventListener('keydown', function(event) {
    if (event.key === ' ' || event.key === 'ArrowUp') {
        pular(); 
    }else if(event.key === 'Enter'){
       if(start.style.display !== 'none' && validaEnter) {
        play();
       }else if(restart.style.display !== 'none' && validaReset){
        reset();
       }else if(restart2.style.display !== 'none' && validaGameoverRestart){
        gameOverRestart();
       }
    }
});

//AÇÃO DOS CLIQUES MOBILE//
document.addEventListener('click', pular);
start.addEventListener('click', () =>{
    if(validaEnter){
        play();
    }
});
restart.addEventListener('click', () =>{
    if(validaReset){
        reset();
    }
});
restart2.addEventListener('click', () =>{
    if(validaGameoverRestart){
        gameOverRestart();
    }
})

//PLAY E PAUSE DA MÚSICA//
botaoMusica.addEventListener('click', () =>{
    if(musicaTema.paused){
        musicaTema.play();
        icone.classList.remove('fa-volume-mute');
        icone.classList.add('fa-volume-up');
    }else{
        musicaTema.pause();
        icone.classList.remove('fa-volume-up');
        icone.classList.add('fa-volume-mute');
    }
});
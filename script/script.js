
let jogoRodando = false;
let botao = document.getElementById("iniciar");
let loopJogo;

function iniciarJogo() {
    jogoRodando = true;
    botao.style.display = "none";
    console.log('skhvbdjsvjjdb')
    primeiroNivel();
    loopJogo = setInterval(primeiroNivel, 2000);
    }





















// Correção: getElementsByClassName retorna uma coleção, então pegamos o primeiro elemento
let barco = document.getElementsByClassName("barco")[0];
const passo = 10;

window.addEventListener('keydown', (event) => {
    // Pega a posição atual do barco
    let topAtual = parseInt(window.getComputedStyle(barco).top) || 0;
    
    // Pega as dimensões necessárias
    const areaJogo = document.getElementById("araea-jogo");
    const alturaAreaJogo = areaJogo.offsetHeight;
    const alturaBarco = barco.offsetHeight;
    
    if(event.key === "ArrowDown") {
        // Move para baixo
        let novoTop = topAtual + passo;
        
        // Verifica se não vai sair da área de jogo
        if(novoTop + alturaBarco <= alturaAreaJogo) {
            barco.style.top = `${novoTop}px`;
        }
    }
    
    if(event.key === "ArrowUp") {
        // Move para cima
        let novoTop = topAtual - passo;
        
        // Verifica se não vai passar do topo (0)
        if(novoTop >= 0) {
            barco.style.top = `${novoTop}px`;
        }
    }
});


function verificarColisoes() {
    if (!jogoRodando) return;
  
    const barcoRect = barco.getBoundingClientRect();
    const lixos = document.querySelectorAll(".lixo");
  
    lixos.forEach(lixo => {
      const lixoRect = lixo.getBoundingClientRect();
  
      // Verifica se os retângulos se sobrepõem (colisão)
      const colidiu = !(
        barcoRect.top > lixoRect.bottom ||
        barcoRect.bottom < lixoRect.top ||
        barcoRect.right < lixoRect.left ||
        barcoRect.left > lixoRect.right
      );
  
      if (colidiu) {
        // Remove o lixo e soma pontos
        lixo.remove();
        pontos += 10;
        pontosEl.textContent = pontos;
      }
    });
  }

  
function primeiroNivel() {
    const areaObstaculos = document.querySelector(".obstaculo");

    // Cria UM lixo por vez
    const top = Math.floor(Math.random() * 400);
    let lixo = document.createElement("div");
    lixo.classList.add("lixo");
    lixo.style.top = `${top}px`;
  
    areaObstaculos.appendChild(lixo);
    }
  



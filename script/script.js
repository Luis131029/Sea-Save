let jogoRodando = false;
let botao = document.getElementById("iniciar");
let loopJogo;
let pontos = 0;
let pontosEl = document.getElementById("pontos");

function iniciarJogo() {
    jogoRodando = true;
    botao.style.display = "none";
    console.log('Jogo iniciado!');
    
    // Inicia o loop de criação de lixos a cada 2 segundos
    loopJogo = setInterval(primeiroNivel, 2000);
    
    // Inicia o loop de verificação de colisões (mais frequente)
    setInterval(verificarColisoes, 50);
}

// Movimento do barco
let barco = document.getElementsByClassName("barco")[0];
const passo = 10;

window.addEventListener('keydown', (event) => {
    if (!jogoRodando) return; // Só permite movimento se o jogo estiver rodando
    
    let topAtual = parseInt(window.getComputedStyle(barco).top) || 0;
    const areaJogo = document.getElementById("araea-jogo");
    const alturaAreaJogo = areaJogo.offsetHeight;
    const alturaBarco = barco.offsetHeight;
    
    if(event.key === "ArrowDown") {
        let novoTop = topAtual + passo;
        // Reduzido o limite para dar mais liberdade de movimento
        if(novoTop + alturaBarco - 100 <= alturaAreaJogo) {
            barco.style.top = `${novoTop}px`;
        }
    }
    
    if(event.key === "ArrowUp") {
        let novoTop = topAtual - passo;
        // Permite subir um pouco mais
        if(novoTop >= -50) {
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
        
        // O lixo vem da DIREITA para ESQUERDA
        // Só coleta quando o lixo REALMENTE encostar no barco (que está na esquerda)
        
        // O lixo precisa ter avançado até chegar no barco
        // barcoRect.right é o lado direito do barco (mais à direita)
        // lixoRect.left é o lado esquerdo do lixo (frente dele indo pra esquerda)
        const lixoChegouNoBarco = lixoRect.left <= barcoRect.right;
        
        // O lixo não pode ter passado completamente do barco
        const lixoNaoPassou = lixoRect.right >= barcoRect.left ;
        
        // Verifica se estão na mesma altura (eixo Y)
        const mesmaAlturaY = barcoRect.top < lixoRect.bottom && 
                            barcoRect.bottom > lixoRect.top;
        
        // Só remove se o lixo chegou no barco, não passou dele, e está na mesma altura
        if (lixoChegouNoBarco && lixoNaoPassou && mesmaAlturaY) {
            // Remove o lixo e soma pontos
            lixo.remove();
            pontos += 10;
            pontosEl.textContent = pontos;
            console.log(`✅ COLETOU! Pontos: ${pontos}`);
            console.log(`Barco X: ${barcoRect.left.toFixed(0)}-${barcoRect.right.toFixed(0)}, Y: ${barcoRect.top.toFixed(0)}-${barcoRect.bottom.toFixed(0)}`);
            console.log(`Lixo X: ${lixoRect.left.toFixed(0)}-${lixoRect.right.toFixed(0)}, Y: ${lixoRect.top.toFixed(0)}-${lixoRect.bottom.toFixed(0)}`);
        }
        
        // Remove lixos que saíram completamente da tela pela esquerda
        if (lixoRect.right < -200) {
            lixo.remove();
            console.log('❌ Lixo perdido (saiu da tela)');
        }
    });
}


// Função que cria UM lixo por vez
function primeiroNivel() {
    if (!jogoRodando) return;
    
    const areaObstaculos = document.querySelector(".obstaculo");
    const areaJogo = document.getElementById("araea-jogo");
    
    // Área jogável aumentada - permite gerar em posições mais acessíveis
    const margemSuperior = -50; // Permite nascer um pouco acima
    const margemInferior = 100; // Desconta menos da altura
    const alturaDisponivel = areaJogo.offsetHeight - margemInferior;
    
    // Cria UM lixo em posição Y aleatória dentro da área acessível
    const top = margemSuperior + Math.floor(Math.random() * alturaDisponivel);
    let lixo = document.createElement("div");
    lixo.classList.add("lixo");
    lixo.style.top = `${top}px`;
  
    areaObstaculos.appendChild(lixo);
    console.log('Lixo criado na posição Y:', top);
}

if (pontos == 1000) {
    jogoRodando = false
    alert('Vitótia!!!')

} else {
    
}
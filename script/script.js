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
function calcularBalançoCarbono() {
    // Obtenção dos dados digitados pelo agricultor
    const diesel = parseFloat(document.getElementById('diesel').value) || 0;
    const area = parseFloat(document.getElementById('area').value) || 0;
    const arvoresPorHa = parseFloat(document.getElementById('arvores').value) || 0;

    if (area <= 0) {
        alert("Por favor, informe uma área válida de colheita!");
        return;
    }

    /* Fatores de cálculo baseados nas dinâmicas de sistemas ILPF:
       1 Litro de Diesel = ~2,68 kg de CO2 lançados na atmosfera
       Estimativa do sequestro diário de CO2 por árvore no sistema florestal integrado (média diária de ~0,06 kg)
       Estimativa do sequestro do solo vivo e palhada mantidos no ILPF (~3,0 kg de CO2 por hectare/dia) */
    const FATOR_DIESEL = 2.68;
    const FATOR_ARVORE_DIA = 0.06;
    const FATOR_SOLO_HA_DIA = 3.0;

    // Executando os cálculos do balanço do dia
    const totalEmissao = diesel * FATOR_DIESEL;
    
    const sequestroArvores = arvoresPorHa * area * FATOR_ARVORE_DIA;
    const sequestroSolo = area * FATOR_SOLO_HA_DIA;
    const totalSequestro = sequestroArvores + sequestroSolo;

    const balancoLiquido = totalSequestro - totalEmissao;

    // Manipulação da interface para exibir as respostas
    const painel = document.getElementById('painelResultado');
    const resTitulo = document.getElementById('resTitulo');
    const resEmissao = document.getElementById('resEmissao');
    const resSequestro = document.getElementById('resSequestro');
    const resFinal = document.getElementById('resFinal');

    // Torna o painel visível
    painel.style.display = "block";

    resEmissao.innerHTML = "• CO₂ Emitido pelo maquinário: " + totalEmissao.toFixed(2) + " kg";
    resSequestro.innerHTML = "• CO₂ Retido pelas árvores e solo: " + totalSequestro.toFixed(2) + " kg";

    if (balancoLiquido >= 0) {
        painel.className = "painel-resultado resultado-positivo";
        resTitulo.innerHTML = "☀️ Parabéns! Sua colheita foi Carbono Positivo! ☀️";
        resFinal.innerHTML = "Balanço Líquido: Sequestrou +" + balancoLiquido.toFixed(2) + " kg de CO₂";
    } else {
        painel.className = "painel-resultado resultado-negativo";
        resTitulo.innerHTML = "⚠️ Atenção! Balanço Negativo hoje. ⚠️";
        resFinal.innerHTML = "Balanço Líquido: Sobrou " + Math.abs(balancoLiquido).toFixed(2) + " kg de CO₂ na atmosfera.";
    }
}
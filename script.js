let inputReal = document.getElementById("input-real");
let inputDolar = document.getElementById("input-dolar");

//Formata o número digitado para valor em real com vírgula.
inputReal.addEventListener('input', () => {
    let valor = inputReal.value.replace(/\D/g, '');
    const valorNumero = parseFloat(valor) / 100;

    inputReal.value = valorNumero.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2

    });
    async function atualizarCotacao() {
        try {
            const resposta = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
            const dados = await resposta.json();

            const cotacaoDolar = parseFloat(dados.USDBRL.bid);

            // Mostra o valor no input-dolar formatado como Dolar
            const inputDolar = document.getElementById("input-dolar");
            inputDolar.value = cotacaoDolar.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'USD'
            });
        } catch (erro) {
            console.error('Erro ao buscar cotação:', erro);
            document.getElementById("input-dolar").value = 'Erro';
        }
    }

    atualizarCotacao(); // chama a função assim que a página carrega


    function calcularDolar() {
        let valor = inputReal.value.replace(/\D/g, '');
        let real = parseFloat(valor) / 100;

        let dolarStr = inputDolar.value.replace(/[^\d,]/g, '').replace(',', '.');
        let dolar = parseFloat(dolarStr);
    
        let resultado = real / dolar // variavel guarda o valor do resultado

        document.getElementById("resultado").textContent = "O valor convertido é $ " + resultado.toFixed(2)+ " dolár!";


    }

    document.getElementById("btn-converter").addEventListener("click", calcularDolar);
});


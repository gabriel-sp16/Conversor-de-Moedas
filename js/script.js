var btnConverter = document.querySelector('#btn-converter');
var valorUsuario = document.querySelector('#valor');
var moedaUsuario = document.querySelector('#moedas');

btnConverter.addEventListener('click', function () {
    var moedaSelecionada = moedaUsuario.value;

    if (moedaSelecionada === 'default' || valorUsuario.value == 0) {
        alert('Por favor, insira um valor válido e selecione uma moeda!');
        return;
    }

    // Executa a busca na API passando a moeda dinamicamente usando Template Strings
    fetch(`https://economia.awesomeapi.com.br/json/last/${moedaSelecionada}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Remove o traço da string para mapear a chave do objeto retornado pela API
            var chaveMoeda = moedaSelecionada.replace('-', '');
            displayResultado(data, chaveMoeda);
        })
        .catch(function (error) {
            console.error('Erro ao buscar cotação:', error);
        });
});

function displayResultado(data, chave) {
    var valorAtual = data[chave].bid; // Cotação da moeda pura recebida da API
    var valorDigitado = valorUsuario.value;

    // Realiza a conversão
    var cotaçãoFinal = valorAtual * valorDigitado;

    // Formata o valor calculado diretamente para a moeda BRL (Real brasileiro)
    var cotaçãoFormatada = cotaçãoFinal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    var displayRes = document.querySelector('.display-res');
    var container = document.querySelector('.container');

    // Injeta a estrutura visual do card de resultado
    displayRes.innerHTML = `
        <div class="resultado">
            <p>Resultado da conversão</p>
            <p>${cotaçãoFormatada}</p>
        </div>
    `;

    // Aplica o ajuste de borda no container pai
    container.classList.add('style-container');
}
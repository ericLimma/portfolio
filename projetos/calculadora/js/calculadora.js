function calcular(tipo, valor) {
    const lcdPrincipal = document.getElementById('lcd-principal'),
        lcdResultado = document.getElementById('lcd-resultado');


    if (tipo === 'valor') {
        adicionarValor(lcdPrincipal, valor);
        ultimoDigito = 'valor'

    }
    if (tipo === 'operador') {

        if (ultimoDigito === 'operador') {
            lcdResultado.value = lcdResultado.value.slice(0, -1);
        }
        jogarResultado(lcdPrincipal, lcdResultado, valor);
        ultimoDigito = 'operador';
    }

    if (tipo === 'acao') {
        switch (valor) {
            case 'c':
                limparValorPrincipal(lcdPrincipal);
                limparValorResultado(lcdResultado);
                break;
            case '+/-':
                inverterSinal(lcdPrincipal);
                break
            case 'bks':
                backSpace(lcdPrincipal, lcdResultado);
                break
            case '=':
                if (ultimoDigito === 'operador') {
                    alert('Erro')
                } else {
                    resolverConta(lcdPrincipal, lcdResultado);
                }
        }
    }

}

function adicionarValor(lcdPrincipal, valor) { // Concatenar o valor ao input

    if (valor == ',' && lcdPrincipal.value.includes(',')) {
        valor = '';
    }
    if (valor == ',' && lcdPrincipal.value === '') {
        valor = '0,';
    }
    if (valor == '0' && lcdPrincipal.value == '') {
        valor = '';
    }

    lcdPrincipal.value += valor;

}

function resolverConta(lcdPrincipal, lcdResultado) {

    const resultado = lcdResultado.value + lcdPrincipal.value;
    try {
        const resultadoCalculado = eval(resultado);
        lcdPrincipal.value = resultadoCalculado;
    } catch (error) {
        console.log('Formato Inválido');
    }
    limparValorResultado(lcdResultado); 
}

function jogarResultado(lcdPrincipal, lcdResultado, valor) {

    if (lcdPrincipal.value.at(-1) == ',') {
        lcdPrincipal.value = lcdPrincipal.value.slice(0, -1);
    }
    lcdPrincipal.value = lcdPrincipal.value.replace(',', '.');
    lcdResultado.value += lcdPrincipal.value + valor;
    limparValorPrincipal(lcdPrincipal);

}

function limparValorPrincipal(lcdPrincipal) {
    lcdPrincipal.value = '';
}

function limparValorResultado(lcdResultado) {
    lcdResultado.value = '';
}

function inverterSinal(lcdPrincipal) {

    if (lcdPrincipal.value == 0) {
        lcdPrincipal.value = '';
    } else {
        lcdPrincipal.value *= -1;
    }
}

function backSpace(lcdPrincipal, lcdResultado) {
    if (lcdPrincipal.value == '') {
        lcdResultado.value = lcdResultado.value.slice(0, -1);
    }
    lcdPrincipal.value = lcdPrincipal.value.slice(0, -1);
}

/*
arrumar 0,
fazer função porcentagem
fazer com que números negativos passem entre parenteses 
*/
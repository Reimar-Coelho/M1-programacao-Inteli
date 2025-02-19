var valor = [100,200,50,300];
var desconto = [10,15,5,20];

function calcularDesconto(valor, desconto) {
    return valor - (valor * desconto / 100);
}

for (let i = 0; i < valor.length; i++) {
    console.log(`Produto ${i + 1}\nPreço Original: R$ ${valor[i].toFixed(2)}\nDesconto Aplicado: ${desconto[i]}%\nPreço Final: R$ ${calcularDesconto(valor[i], desconto[i]).toFixed(2)}\n---------------------------`);
}


const nota1 = 10
const nota2 = 5
const nota3 = 8
var passou
var parabenizacao

media = (nota1+nota2+nota3)/3

if (media >= 7){
    passou = true
}
else if (media < 7) {
    passou = false
}

if (passou) {
    parabenizacao = "passou"
}
else if (!passou) {
    parabenizacao = "não passou"
}

console.log("Você " + parabenizacao + " de ano, suas notas foram:\n" + "Nota 1: " + nota1 + "\n" + "Nota 2: " + nota2 + "\n" + "Nota 3: " + nota3 + "\n" + "Sua média de nota foi " + media.toFixed(2))

for (let i=0; i<10; i++) {
    setTimeout(() => {
        function parabens() {
            console.log("parabéns :)")
        }

        if (passou) {
            parabens()
        }
    }, i * 700); 
}



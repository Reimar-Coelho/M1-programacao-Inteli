# Instruções
- Faça uma cópia deste arquivo .md para um repositório próprio
- Resolva as 8 questões objetivas assinalando a alternativa correta e **justificando sua resposta.**
- Resolva as 2 questões dissertativas escrevendo no próprio arquivo .md
- Lembre-se de utilizar as estruturas de código como ``esta aqui com ` `` ou
```javascript
//esta aqui com ```
let a = "olá"
let b = 10
print(a)
```
- Resolva as questões com uso do Visual Studio Code ou ambiente similar.
- Teste seus códigos antes de trazer a resposta para cá.
- Cuidado com o uso de ChatGPT (e similares), pois entregar algo só para ganhar nota não fará você aprender. Não seja dependente da máquina!
- Ao final, publique seu arquivo lista_01.md com as respostas em seu repositório, e envie o link pela Adalove. 

# Questões objetivas
**1) Considerando a execução do código abaixo, indique a alternativa correta e justifique sua resposta.**
```javascript
console.log(x);
var x = 5;
console.log(y);
let y = 10;
```
a) A saída será undefined seguido de erro 

b) A saída será 5 seguido de 10

c) A saída será undefined seguido de undefined

d) A saída será erro em ambas as linhas que utilizam console.log

***

**Resposta:** letra A, pelo motivo de o X ser um var, que tem escopo global e pode ser acessada mesmo antes de ter um valor definido, já o Y é um let, que não é global e só pode ser acessado depois do código chegar a linha onde ela foi definida.

______
**2) O seguinte código JavaScript tem um erro que impede sua execução correta. Analise e indique a opção que melhor corrige o problema. Justifique sua resposta.**

```javascript
function soma(a, b) {
    if (a || b === 0) {
        return "Erro: número inválido";
    }
    return a + b;
}
console.log(soma(2, 0));
```

a) Substituir if (a || b === 0) por if (a === 0 || b === 0)

b) Substituir if (a || b === 0) por if (a === 0 && b === 0)

c) Substituir if (a || b === 0) por if (a && b === 0)

d) Remover completamente a verificação if (a || b === 0)

***

**Resposta:** letra A, pois no caso de 
```javascript
(a || b === 0)
```
o código faz apenas a verificação do b, ignorando a, isso acontece pelo motivo de cada verificação antes e depois do operador lógico acontecer de forma separada, então o computador entende essa linha como "se a é verdadeiro ou b é estritamente igual a 0, *executar bloco de código*", portanto a opção correta seria:
```javascript
(a === 0 || b === 0)
```
______
**3) Ao executar esse código, qual será a saída no console? Indique a alternativa correta e justifique sua resposta.**
```javascript
function calcularPreco(tipo) {
    let preco;

    switch(tipo) {
        case "eletrônico":
            preco = 1000;
        case "vestuário":
            preco = 200;
            break;
        case "alimento":
            preco = 50;
            break;
        default:
            preco = 0;
    }

    return preco;
}

console.log(calcularPreco("eletrônico"));
```

a) O código imprime 1000.

b) O código imprime 200.

c) O código imprime 50.

d) O código gera um erro.

***

**Resposta:** letra B, pois no case "eletrônico" não tem o **break**, o que causa de a função imprimir o próximo case com o **break**, resultando na variável preco ter um valor de 200.

______
**4) Ao executar esse código, qual será a saída no console? Indique a alternativa correta e justifique sua resposta.**
```javascript
let numeros = [1, 2, 3, 4, 5];

let resultado = numeros.map(x => x * 2).filter(x => x > 5).reduce((a, b) => a + b, 0);

console.log(resultado);
```
a) 0

b) 6

c) 18

d) 24

***

**Resposta:** letra D, pelo motivo de o
```javascript
map(x => x * 2)
```
criar um novo array baseado no primeiro, só que multiplicando todos os elementos por 2, no 
```javascript
filter(x => x > 5)
```
ele filtra apenas os elementos desse novo array que são maiores que 5 e no
```javascript
reduce((a, b) => a + b, 0)
```
ele soma todos os elementos desse array filtrado, resultando em 24, que é a resultado de 4+8+10, que é o array filtrado.
______
**5) Qual será o conteúdo do array lista após a execução do código? Indique a alternativa correta e justifique sua resposta.**

```javascript
let lista = ["banana", "maçã", "uva", "laranja"];
lista.splice(1, 2, "abacaxi", "manga");
console.log(lista);
```

a) ["banana", "maçã", "uva", "abacaxi", "manga", "laranja"]

b) ["banana", "abacaxi", "manga"]

c) ["banana", "abacaxi", "manga", "laranja"]

d) ["banana", "maçã", "uva", "abacaxi", "manga"]

***

**Resposta:** letra C, pois no **splice**, o primeiro número que aparece é a posição do array onde os elementos vão ser adicionados, e o segundo número é quantos deles vão ser substituidos pelos elementos do splice, onde por exemplo:
```javascript
let array=["a","b"]
lista.splice(x, y, "elemento1", "elemento2");
```
**x** seria a posição do array que seria substituido e **y** seria a quantidade de elementos substituidos, sendo o **x** = 0 e **y** = 1 por exemplo, o resultado seria:
```javascript
[ 'elemento1', 'elemento2', 'b' ]
```

______
**6) Abaixo há duas afirmações sobre herança em JavaScript. Indique a alternativa correta e justifique sua resposta**

I. A herança é utilizada para compartilhar métodos e propriedades entre classes em JavaScript, permitindo que uma classe herde os métodos de outra sem a necessidade de repetir código.  
II. Em JavaScript, a herança é implementada através da palavra-chave `extends`.


a) As duas afirmações são verdadeiras, e a segunda justifica a primeira.

b) As duas afirmações são verdadeiras, mas a segunda não justifica a primeira.

c) A primeira afirmação é verdadeira, e a segunda é falsa.

d) A primeira afirmação é falsa, e a segunda é verdadeira.

***

**Resposta:** letra A, a II justifica a I pelo motivo de a quando ele fala que uma classe herda os métodos de outra, ela faz isso "extendendo" o que seria a primeira classe a partir de complementos.

______
**7) Dado o seguinte código. Indique a alternativa correta e justifique sua resposta.**

```javascript
class Pessoa {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
  }

  apresentar() {
    console.log(`Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`);
  }
}

class Funcionario extends Pessoa {
  constructor(nome, idade, salario) {
    super(nome, idade);
    this.salario = salario;
  }

  apresentar() {
    super.apresentar();
    console.log(`Meu salário é R$ ${this.salario}.`);
  }
}
```


I) A classe Funcionario herda de Pessoa e pode acessar os atributos nome e idade diretamente.  
II) O método `apresentar()` da classe Funcionario sobrepõe o método `apresentar()` da classe Pessoa, mas chama o método da classe pai usando `super`.  
III) O código não funciona corretamente, pois Funcionario não pode herdar de Pessoa como uma classe, já que o JavaScript não suporta herança de classes.

Quais das seguintes afirmações são verdadeiras sobre o código acima?

a) I e II são verdadeiras.

b) I, II e III são verdadeiras.

c) Apenas II é verdadeira.

d) Apenas I é verdadeira.

***

**Resposta:** letra A, pois o código está correto e o método apresentar() da classe Funcionario de fato sobrescreve o método apresentar() da classe Pessoa. Isso é um conceito do polimorfismo na POO. 

______

**8) Analise as afirmações a seguir. Indique a alternativa correta e justifique sua resposta.**

**Asserção:** O conceito de polimorfismo em Programação Orientada a Objetos permite que objetos de diferentes tipos respondam à mesma mensagem de maneiras diferentes.  
**Razão:** Em JavaScript, o polimorfismo pode ser implementado utilizando o método de sobrecarga de métodos em uma classe.

a) A asserção é falsa e a razão é verdadeira.

b) A asserção é verdadeira e a razão é falsa.

c) A asserção é verdadeira e a razão é verdadeira, mas a razão não explica a asserção.

d) A asserção é verdadeira e a razão é verdadeira, e a razão explica a asserção.

***

**Resposta:** letra C, pois ambas estão corretas, a assercão é verdadeira e a razão também é, mas a razão não justifica a asserção, ela não explica o nivel teórico do que é polimorfismo. A sobrecarga deve ser usada quando a mesma ação será realizada com dados de entrada diferentes, sendo assim, resultando em formas ligeiramente diferentes.

______

# Questões dissertativas
9) O seguinte código deve retornar a soma do dobro dos números de um array, mas contém erros. Identifique os problema e corrija o código para que funcione corretamente. Adicione comentários ao código explicado sua solução para cada problema.

```javascript
function somaArray(numeros) {

    for (i = 0; i < numeros.size; i++) {
        soma = 2*numeros[i];
    }
    return soma;
}
console.log(somaArray([1, 2, 3, 4]));
```

***

**Resposta**: 

```javascript
function somaArray(numeros) {

    let soma = 0; // Declaração da variável para poder referenciar ela dentro dela mesma 
    for (i = 0; i < numeros.length; i++) { // *array*.size não existe, o correto é *array*.length
        soma += numeros[i]*2; // soma = soma + (numeros[i]*2)
    }
    return soma;
}
console.log(somaArray([1, 2, 3, 4]));
```

Primeiro erro, é números.size, sendo o correto, numeros.length. Faltou declarar a variável *soma* antes do *for*, para inicializar a variável antes do laço de repetição, e conseguir chamar o número. Para realizar a operação da soma do dobro dos números de um array, escrevemos,
```javascript
soma += numeros[i]*2;
```
Ele seleciona o número de acordo com a sua posição do array e depois multiplica por dois. Então os números [1,2,3,4] viram [2,4,6,8] e depois soma eles, resultado em 20
______
10) Crie um exemplo prático no qual você tenha duas classes:

- Uma classe `Produto` com atributos `nome` e `preco`, e um método `calcularDesconto()` que aplica um desconto fixo de 10% no preço do produto.
- Uma classe `Livro` que herda de `Produto` e modifica o método `calcularDesconto()`, aplicando um desconto de 20% no preço dos livros.

Explique como funciona a herança nesse contexto e como você implementaria a modificação do método na classe `Livro`.

***

**Resposta**: 

```javascript
class Produto {
    constructor(nome, preco) {
        this.nome = nome
        this.preco = preco
        this.desc = 10
    }

    calcularDesconto() {
        return this.preco - (this.preco * this.desc/100)
    }
}

class Livro extends Produto {
    constructor(nome, preco) {
        super(nome, preco)
        this.desc = 20
    }

    calcularDesconto() {
        return this.preco - (this.preco * this.desc/100)
    }
    
}
```
A herança funciona de forma que a classe Livro herda todos os atributos e métodos da classe Produto, podendo assim, acessar e modificar os métodos e atributos da classe pai. Para implementar a mudança, eu mudo o método de desconto para aplicar o valor pedido

class Carta {
  constructor(naipe, valor) {
    this.naipe = naipe;
    this.valor = valor;
  }

  toString() {
    return `${this.valor} de ${this.naipe}`;
  }
}

class Baralho {
  constructor() {
    this.cartas = [];
    const naipes = ["Copas", "Espadas", "Ouros", "Paus"];
    const valores = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "J",
      "Q",
      "K",
    ];

    for (let i = 0; i < 13; i++) {
        let naipe = naipes[Math.floor(Math.random() * naipes.length)];
        let valor = valores[Math.floor(Math.random() * valores.length)];
        this.cartas.push(new Carta(naipe, valor));
    }
  }

  distribuir() {
    return this.cartas.pop();
  }

  adicionarCarta(carta) {
    this.cartas.push(carta);
  }

  toString() {
    return this.cartas.map((carta) => carta.toString()).join(", ");
  }
}

const baralho = new Baralho();
console.log("Baralho inicial:");
console.log(baralho.toString());

const cartaDistribuida = baralho.distribuir();
console.log("\nCarta distribuída:");
console.log(cartaDistribuida.toString());

console.log("\nBaralho após distribuir uma carta:");
console.log(baralho.toString());

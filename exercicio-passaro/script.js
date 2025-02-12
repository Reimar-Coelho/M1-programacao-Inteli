// Configurações do jogo
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var passaro;

// Funções do jogo
// Carregar os recursos
function preload() {
    this.load.image('bg', 'assets/bg_space.png');
    this.load.spritesheet('bird', 'assets/bird-red.png', { frameWidth: 75, frameHeight: 75 });
}

// Criar os elementos do jogo
function create() {
    this.add.image(400, 300, 'bg').setScale(1.2);
    passaro = this.add.sprite(100, 300, 'bird').setScale(1.3);

    this.anims.create({
        key: 'fly',
        frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    })

    passaro.anims.play('fly', true);
}

// Atualizar o jogo
function update() { 
    // Movimentação do passaro em uma trajetória parabólica
    if (typeof passaro.direcao === 'undefined') {
        passaro.direcao = 1; // 1 para direita, -1 para esquerda
    }

    // Laço de repetição para atualizar a posição do pássaro
    for (let i = 0; i < 1; i++) {
        // Atualiza a posição do pássaro
        passaro.x += 1 * passaro.direcao // Move o passaro dependendo da direção
        passaro.y = 300 + 100 * Math.sin(passaro.x * Math.PI / 180) // Função seno para a trajetória parabólica

        // Verifica se o pássaro atingiu o limite e inverte a direção
        if (passaro.x >= 700) {
            passaro.setFlip(true, false)
            passaro.direcao = -1
        } else if (passaro.x <= 100) {
            passaro.setFlip(false, false)
            passaro.direcao = 1
        }
    }
}

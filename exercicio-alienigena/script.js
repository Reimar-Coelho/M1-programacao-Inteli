// Define a largura e altura do jogo
const larguraJogo = 700
const alturaJogo = 850

// configurações do jogo
const config = {
    type: Phaser.AUTO,
    width: larguraJogo,
    height: alturaJogo,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },

    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

// cria o jogo
const game = new Phaser.Game(config)

// variáveis globais
var alienigena
var teclado
var fogo
var plataforma
var moeda
var pontuacao = 0
var placar

function preload() {
    this.load.image('background', 'assets/bg.png')

    // Carrega a imagem do alienígena
    this.load.image('alienigena', 'assets/alienigena.png')

    // Carrega a imagem do fogo como turbo
    this.load.image('turbo_nave', 'assets/turbo.png')

    // Carrega a imagem da plataforma
    this.load.image('plataforma', 'assets/tijolos.png')

    // Carrega a imagem da moeda
    this.load.image('moeda', 'assets/moeda.png')
}

function create() {
    // Adiciona a imagem de fundo na posição central da tela
    this.add.image(larguraJogo/2, alturaJogo/2, 'background')

    // Adiciona o fogo turbo
    fogo = this.add.sprite(0,0, 'turbo_nave')
    fogo.setVisible(false)

    // Adiciona o alienígena na posição central inferior da tela
    alienigena = this.physics.add.sprite(larguraJogo/2, 0, 'alienigena')
    alienigena.setCollideWorldBounds(true)

    // Adiciona a função de movimento do alienígena
    teclado = this.input.keyboard.createCursorKeys()

    // Adiciona a plataforma
    plataforma = this.physics.add.staticImage(larguraJogo/2, alturaJogo/2, 'plataforma')

    // Adiciona a colisão entre o alienígena e a plataforma
    this.physics.add.collider(alienigena, plataforma)

    // Adiciona a moeda
    moeda = this.physics.add.sprite(larguraJogo/2, 0, 'moeda')
    moeda.setCollideWorldBounds(true)
    moeda.setBounce(0.7)
    this.physics.add.collider(moeda, plataforma)

    // adicionando placar 
    placar = this.add.text(50, 50, 'Moedas:' + pontuacao, {fontSize:'45px', fill:'#495613'});

    // quando o Alien encostar na moeda...
    this.physics.add.overlap(alienigena, moeda, function(){
        moeda.setVisible(false)
        var posicaoMoeda_Y = Phaser.Math.RND.Between(0, 650)
        moeda.setPosition(posicaoMoeda_Y, 100)
        pontuacao += 1
        placar.setText('Moedas: ' + pontuacao)
        moeda.setVisible(true)
    })
}

function update() {
    // Movimentação do alienígena
    //esquerda
    if (teclado.left.isDown) {
        alienigena.setVelocityX(-150)
    }
    //direita
    else if (teclado.right.isDown) {
        alienigena.setVelocityX(150)
    }
    //zero movimento horizontal
    else {
        alienigena.setVelocityX(0)
    }
    //cima
    if (teclado.up.isDown) {
        alienigena.setVelocityY(-150)
        ativarTurbo()
    }
    //baixo
    else{
        desativarTurbo()
    }

    fogo.setPosition(alienigena.x, alienigena.y + alienigena.height/2)

}

function ativarTurbo(){
    fogo.setVisible(true)
}

function desativarTurbo(){
    fogo.setVisible(false)
}
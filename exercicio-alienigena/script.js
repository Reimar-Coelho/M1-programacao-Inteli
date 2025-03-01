// Define a largura e altura do jogo
const larguraJogo = 700;
const alturaJogo = 850;

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
};

// cria o jogo
const game = new Phaser.Game(config);

// variáveis globais
var alienigena;
var teclado;
var fogo;
var plataforma;
var moeda;
var pontuacao = 0;
var placar;
var inimigos = []; // Array para armazenar os inimigos
var fogoDepoisDePerder = false;
var tempoParaSpawnar = 5000; // Tempo em milissegundos para spawnar inimigos
var ultimoSpawn = 0; // Último tempo de spawn

function preload() {
    this.load.image('background', 'assets/bg.png');

    // Carrega a imagem do alienígena
    this.load.image('alienigena', 'assets/alienigena.png');

    // Carrega a imagem do fogo como turbo
    this.load.image('turbo_nave', 'assets/turbo.png');

    // Carrega a imagem da plataforma
    this.load.image('plataforma', 'assets/tijolos.png');

    // Carrega a imagem da moeda
    this.load.image('moeda', 'assets/moeda.png');

    // Carrega a imagem do inimigo
    this.load.image('inimigo', 'assets/inimigo.png');
}

function create() {
    // Adiciona a imagem de fundo na posição central da tela
    this.add.image(larguraJogo / 2, alturaJogo / 2, 'background');

    // Adiciona o fogo turbo
    fogo = this.add.sprite(0, 0, 'turbo_nave');
    fogo.setVisible(false);

    // Adiciona o alienígena na posição direita superior da tela
    alienigena = this.physics.add.sprite(larguraJogo, 0, 'alienigena');
    alienigena.setCollideWorldBounds(true);

    // Adiciona a função de movimento do alienígena
    teclado = this.input.keyboard.createCursorKeys();

    // Adiciona a plataforma
    plataforma = this.physics.add.staticImage(larguraJogo / 2, alturaJogo / 2, 'plataforma');

    // Adiciona a colisão entre o alienígena e a plataforma
    this.physics.add.collider(alienigena, plataforma);

    // Adiciona a moeda
    moeda = this.physics.add.sprite(larguraJogo / 2, 0, 'moeda');
    moeda.setCollideWorldBounds(true);
    moeda.setBounce(0.7);
    this.physics.add.collider(moeda, plataforma);

    // adicionando placar 
    placar = this.add.text(50, 50, 'Moedas:' + pontuacao, { fontSize: '45px', fill: '#495613' });

    // quando o Alien encostar na moeda...
    this.physics.add.overlap(alienigena, moeda, function () {
        moeda.setVisible(false); // esconde a moeda
        var posicaoMoeda_Y = Phaser.Math.RND.between(50, 650); // sorteia uma nova posição para a moeda
        moeda.setPosition(posicaoMoeda_Y, 100); // posiciona a moeda na nova posição 
        pontuacao += 1; // aumenta a pontuação
        placar.setText('Moedas: ' + pontuacao); // atualiza o placar
        moeda.setVisible(true); // exibe a moeda
    });

    // Cria o primeiro inimigo
    criarInimigo(this);

    // quando o Alien encostar em qualquer inimigo...
    this.physics.add.overlap(alienigena, inimigos, function () {
        alienigena.setVisible(false); // esconde o alienígena
        inimigos.forEach(inimigo => inimigo.setVisible(false)); // esconde todos os inimigos
        moeda.setVisible(false); // esconde a moeda
        fogoDepoisDePerder = true;
        placar.setText('Fim de Jogo!'); // atualiza o placar
    });
}

function update(time) {
    // Movimentação do alienígena
    // esquerda
    if (teclado.left.isDown) {
        alienigena.setVelocityX(-200);
    }
    // direita
    else if (teclado.right.isDown) {
        alienigena.setVelocityX(200);
    }
    // zero movimento horizontal
    else {
        alienigena.setVelocityX(0);
    }
    // cima
    if (teclado.up.isDown) {
        alienigena.setVelocityY(-200);
        ativarTurbo();
    }
    // baixo
    else {
        desativarTurbo();
    }

    fogo.setPosition(alienigena.x, alienigena.y + alienigena.height / 2);

    // Atualiza a posição dos inimigos
    inimigos.forEach(inimigo => {
        this.physics.moveTo(inimigo, alienigena.x, alienigena.y, 100);
    });

    // Spawna inimigos a cada 5 segundos
    if (time > ultimoSpawn + tempoParaSpawnar) {
        criarInimigo(this);
        ultimoSpawn = time;
    }
}

function criarInimigo(scene) {
    //let inimigo = scene.physics.add.sprite(Phaser.Math.RND.between(0, larguraJogo), Phaser.Math.RND.between(0, alturaJogo), 'inimigo');
    let inimigo = scene.physics.add.sprite (0, alturaJogo, 'inimigo');
    inimigo.setScale(0.3); // Diminui o tamanho do inimigo
    inimigo.setCollideWorldBounds(true);
    inimigo.setBounce(1);
    scene.physics.add.collider(inimigo, alienigena);
    scene.physics.add.collider(inimigo, plataforma);
    inimigos.push(inimigo);
}

function ativarTurbo() {
    if (!fogoDepoisDePerder) {
        fogo.setVisible(true);
    }
}

function desativarTurbo() {
    fogo.setVisible(false);
}
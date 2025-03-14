var jogador;
var chao;
var plataforma;
var grupoPlataformas;
var pontuacao = 0;
var textoPontuacao;
var textoTutorial;
var pn;


class Jogo extends Phaser.Scene {

    constructor() {
        super("Jogo");
    }

    preload() {
        this.load.svg("jogador", "assets/Soldier2.svg", { scale: .8 });
        this.load.svg("plataforma", "assets/plataforma2.svg", { scale: 1 });
        this.load.font('Poppins', 'assets/fonts/Poppins-light.ttf', 'truetype');

    }

    create() {
        // Resetar pontuação ao iniciar
        pontuacao = 0;
        
        // Criar chão
        chao = this.physics.add.image(game.config.width/2, 830, 'plataforma');
        chao.setImmovable();
        chao.scale = 6;

        // Criar plataformas e jogador
        this.criarPlataformas();
        this.criarJogador();
        
        // Interface de usuário
        textoPontuacao = this.add.text(16, 16, 'Pontuação: 0', { fontFamily: 'Poppins', fontSize: '32px', fill: '#F85D58' }).setScrollFactor(0);
        textoPontuacao.depth = 2;
        
        // Tutorial de movimento
        textoTutorial = this.add.text(
            this.game.config.width/2, 
            this.game.config.height - 60, 
            'Use as setas ← → para se mover', 
            { fontFamily: 'Poppins', fontSize: '24px', fill: '#555' }
        );
        textoTutorial.setOrigin(0.5);
        textoTutorial.setScrollFactor(0);
        textoTutorial.depth = 2;
        
        // Colisões
        this.physics.add.collider(jogador, chao, this.fimDeJogo, null, this);
        this.physics.add.collider(jogador, grupoPlataformas, this.quicar, null, this);

        // Rastreamento de câmera e plataforma
        this.cameraYMin = 999;
        this.plataformaYMin = 999;
        
        // Controles
        this.tecla_esquerda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.tecla_direita = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        // Temporizador para fazer o tutorial sumir após alguns segundos
        this.time.delayedCall(5000, function() {
            this.tweens.add({
                targets: textoTutorial,
                alpha: 0,
                duration: 1000,
                ease: 'Power2'
            });
        }, [], this);
    }
    
    update() {
        // Rastrear movimento do jogador
        jogador.yMudanca = Math.max(jogador.yMudanca, Math.abs(jogador.y - jogador.yOrig));
        this.physics.world.setBounds(0, -jogador.yMudanca, this.physics.world.bounds.width, this.game.config.height + jogador.yMudanca);
        
        // Câmera seguindo o jogador
        this.cameras.main.setLerp(.5);
        this.cameras.main.centerOnY(jogador.y);
        
        // Movimento horizontal
        if (this.tecla_direita.isDown) {
            jogador.body.velocity.x = 400;
            
            // Se estava olhando para a esquerda, vira para a direita
            if (!jogador.direcaoDireita) {
                jogador.scaleX = 1; // Mantém a escala original para olhar à direita
                jogador.direcaoDireita = true;
            }
        }
        else if (this.tecla_esquerda.isDown) {
            jogador.body.velocity.x = -400;
            
            // Se estava olhando para a direita, vira para a esquerda
            if (jogador.direcaoDireita) {
                jogador.scaleX = -1; // Inverte a escala horizontal para olhar à esquerda
                jogador.direcaoDireita = false;
            }
        }
        else jogador.body.velocity.x = 0;
        
        // Transição entre bordas da tela
        if (jogador.x < 0) {
            jogador.x = this.physics.world.bounds.width;
        } else if (jogador.x > this.physics.world.bounds.width) {
            jogador.x = 0;
        }

        // Verificar fim de jogo
        if(jogador.y > this.cameraYMin + this.game.config.height) {
            this.fimDeJogo();
        }

        // Gerenciamento de plataformas
        grupoPlataformas.children.iterate(function(item) {
            var eixoY = this.plataformaYMin - 200;
            this.plataformaYMin = Math.min(this.plataformaYMin, item.y);
            this.cameraYMin = Math.min(this.cameraYMin, jogador.y - this.game.config.height + 430);
            
            if(item.y > this.cameraYMin + this.game.config.height){
                item.destroy();
                var eixoX = Phaser.Math.Between(100, this.physics.world.bounds.width - 100);
                pn = this.criarPlataformaIndividual(eixoX, eixoY, 'plataforma');
            }
        }, this);
    }

    criarJogador() {
        jogador = this.physics.add.image(game.config.width/2, 3*game.config.height/4, "jogador");
        jogador.setVelocity(0, -500);
        jogador.setGravityY(360);
        jogador.setBounce(0.4);
        jogador.body.checkCollision.up = false;
        jogador.depth = 1;

        jogador.yOrig = jogador.y;
        jogador.yMudanca = 0;
        jogador.direcaoDireita = true; // Variável para acompanhar a direção
    }
    
    criarPlataformas() {
        grupoPlataformas = this.physics.add.staticGroup({runChildUpdate: true});
        grupoPlataformas.enableBody = true;
        
        for(var i = 0; i < 5; i++) {
            pn = this.criarPlataformaIndividual(
                Phaser.Math.Between(25, this.physics.world.bounds.width - 25), 
                this.physics.world.bounds.height - 200 - 200 * i, 
                'plataforma'
            );
        }
    } 
    
    criarPlataformaIndividual(x, y, tipo) {
        plataforma = grupoPlataformas.create(x, y, tipo);
        plataforma.setImmovable();
        return plataforma;
    }

    quicar(_jogador, _grupoPlataformas) {
        if (_jogador.body.touching.down && _grupoPlataformas.body.touching.up) {
            pontuacao += 10;
            textoPontuacao.setText('Pontuação: ' + pontuacao);              
            jogador.body.velocity.y = -400;
        }
    }

    fimDeJogo() {
        // Passar a pontuação para a cena de fim de jogo
        this.scene.start('FimDeJogo', { pontuacao: pontuacao });
    }
}

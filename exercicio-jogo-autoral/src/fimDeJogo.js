class FimDeJogo extends Phaser.Scene {
    constructor() {
        super("FimDeJogo");
    }

    init(dados) {
        this.pontuacaoFinal = dados.pontuacao || 0; // Pontuação final importada da cena de jogo
    }

    preload() {
        this.load.font('PressStart2P', 'assets/fonts/PressStart2P-Regular.ttf', 'truetype');
    }

    create() {
        // Texto de fim de jogo
        const textoFimDeJogo = this.add.text(
            this.game.config.width/2, 
            this.game.config.height/2 - 100, 
            'GAME OVER', 
            { 
                fontFamily: 'PressStart2P', 
                fontSize: '50px', 
                fill: '#000'
            }
        );
        textoFimDeJogo.setOrigin(0.5);
        
        // Exibir pontuação final
        const textoPontuacaoFinal = this.add.text(
            this.game.config.width/2, 
            this.game.config.height/2, 
            'Pontuação:' + this.pontuacaoFinal, 
            { 
                fontFamily: 'PressStart2P', 
                fontSize: '45px', 
                fill: '#F85D58'
            }
        );
        textoPontuacaoFinal.setOrigin(0.5);
        
        // Botão de tentar novamente
        const textoTentarNovamente = this.add.text(
            this.game.config.width/2, 
            this.game.config.height/2 + 100, 
            'TENTAR NOVAMENTE', 
            { 
                fontFamily: 'PressStart2P', 
                fontSize: '32px', 
                fill: '#00bfa9'
            }
        );
        textoTentarNovamente.setOrigin(0.5);
        textoTentarNovamente.setInteractive({ useHandCursor: true });
        
        // Reiniciar o jogo ao clicar
        textoTentarNovamente.on('pointerdown', () => {
            this.scene.start('Jogo');
        });
    }
}
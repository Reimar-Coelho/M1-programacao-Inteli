class FimDeJogo extends Phaser.Scene {
    constructor() {
        super("FimDeJogo");
    }

    init(dados) {
        this.pontuacaoFinal = dados.pontuacao || 0;
    }

    create() {
        // Texto de fim de jogo
        const textoFimDeJogo = this.add.text(
            this.game.config.width/2, 
            this.game.config.height/2 - 100, 
            'FIM DE JOGO', 
            { 
                fontFamily: 'Montserrat', 
                fontSize: '90px', 
                fill: '#333'
            }
        );
        textoFimDeJogo.setOrigin(0.5);
        
        // Exibir pontuação final
        const textoPontuacaoFinal = this.add.text(
            this.game.config.width/2, 
            this.game.config.height/2, 
            'Pontuação: ' + this.pontuacaoFinal, 
            { 
                fontFamily: 'Montserrat', 
                fontSize: '45px', 
                fill: '#a0f'
            }
        );
        textoPontuacaoFinal.setOrigin(0.5);
        
        // Botão de tentar novamente
        const textoTentarNovamente = this.add.text(
            this.game.config.width/2, 
            this.game.config.height/2 + 100, 
            'TENTAR NOVAMENTE', 
            { 
                fontFamily: 'Montserrat', 
                fontSize: '32px', 
                fill: '#00bfa9'
            }
        );
        textoTentarNovamente.setOrigin(0.5);
        textoTentarNovamente.setInteractive({ useHandCursor: true });
        
        // Efeito de hover
        textoTentarNovamente.on('pointerover', () => {
            textoTentarNovamente.setStyle({ fill: '#00a090' });
        });
        
        textoTentarNovamente.on('pointerout', () => {
            textoTentarNovamente.setStyle({ fill: '#00bfa9' });
        });
        
        // Reiniciar o jogo ao clicar
        textoTentarNovamente.on('pointerdown', () => {
            this.scene.start('Jogo');
        });
    }
}
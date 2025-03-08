var config = {
    type: Phaser.AUTO,
    scale : {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 600,
        height: 800
    },
    physics: {
        default: 'arcade',
    },
    scene: [Jogo, FimDeJogo],
    backgroundColor: 0xeeeeee
};
var game = new Phaser.Game(config);

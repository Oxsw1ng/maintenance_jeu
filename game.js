
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

// Variables nécessaires au jeu
var vie = 10.0;
var currVie = vie;
var damage = 1.0;
var money = 10.0;
var gain = 1.0;

// Variables visuelles
var textVie;
var textCoin;

function preload ()
{
    this.load.spritesheet('skeleton', 'images/skeleton.png' , { frameWidth: 64, frameHeight: 128 });
    this.load.spritesheet('coin', 'images/coin.png', { frameWidth: 8, frameHeight: 8 });
    this.load.image('heart', 'images/heart.png');
    this.load.image('potion', 'images/potion.png');
    this.load.image('sword', 'images/sword.png');
    this.load.image('axe', 'images/axe.png');
    this.load.image('spear', 'images/spear.png');
    this.load.image('double_sword', 'images/double_sword.png');
}

function create ()
{
    // SQUELETTE
    let skeleton = this.add.sprite(400, 250, 'skeleton');
    skeleton.setScale(1.5);

    // Choix d'une frame particulière
    skeleton.setFrame(0);
    /////////////////////////////////

    // PIECE
    let coin = this.add.sprite(350,100,"coin");
    coin.setScale(4);
    textCoin = this.add.text(400, 90, money , { fontSize: '32px', fill: '#ECF707' })

    // Ajout de l'animation au gestionnaire d'animations
    this.anims.create({
       key: 'coinAnim',
       frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 3 }),
       frameRate: 6,
       repeat: -1 // pour une animation en boucle
       });

    // Lancement de l'animation
    coin.anims.play('coinAnim');
    ///////////////////////////////////////////////////////////

    // COEUR
    let heart = this.add.image(350,360, "heart");
    heart.setScale(2);
    textVie = this.add.text(400, 340, vie , { fontSize: '32px', fill: '#F71907' })
    // ajouter un événement de clic sur le jeu
    this.input.on('pointerdown', function () {
        vie = vie - damage; // décrémenter le score
        textVie.setText(vie); // mettre à jour le texte du score
    }, this);

    // PARTIE GAUCHE
    let potion = this.add.image(275,50, "potion");
    potion.setScale(2);
}

function update () {
    if (vie <= 0) {
        vie = currVie * 1.3;
        vie = Math.trunc(vie);
        currVie = vie;
        textVie.setText(vie);
        money = money + gain;
        textCoin.setText(money); 
    }
}
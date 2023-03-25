
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
var clickDamage = 1.0;
var money = 0.0;
var gain = 1.0;
var level = 1;
var killCount = 0;
var DPS = 0;

// Variables visuelles
var textVie;
var textCoin;
var textKill;

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
    this.load.image('buttonInactive', 'images/buttonI.png');
    this.load.image('buttonActive', 'images/buttonA.png');
}

function create ()
{
    // SQUELETTE
    let skeleton = this.add.sprite(400, 250, 'skeleton');
    skeleton.setScale(1.5);

    // Choix d'une frame particulière
    skeleton.setFrame(0);
    /////////////////////////////////

    // DPS
    let textDPS = this.add.text(330, 40, "DPS : "+ DPS, { fontSize: '24px', fill: '#DA70D6' });

    // PIECE
    let coin = this.add.sprite(350,100,"coin");
    coin.setScale(4);
    textCoin = this.add.text(400, 90, money , { fontSize: '32px', fill: '#ECF707' });

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
        vie = vie - clickDamage; // décrémenter le score
        textVie.setText(vie); // mettre à jour le texte du score
    }, this);

    // KILL COUNT
    textKill = this.add.text(360, 390, killCount+1+"/10" , { fontSize: '32px', fill: '#ffffff' });

    // PARTIE GAUCHE
    let potion = this.add.image(60,230, "potion");
    potion.setScale(2);
    let buttonPotion = this.add.image(170,230, "buttonInactive");
    buttonPotion.setScale(0.3);
    let textTapDamage = this.add.text(70,275,"Tap Damage : "+clickDamage);

    // PARTIE DROITE 
    let sword = this.add.image(750,70,"sword");
    let buttonSword = this.add.image(640,70, "buttonInactive");
    buttonSword.setScale(0.3);
    let axe = this.add.image(750,170,"axe");
    let buttonAxe = this.add.image(640,170, "buttonInactive");
    buttonAxe.setScale(0.3);
    let spear = this.add.image(750,270,"spear");
    let buttonSpear = this.add.image(640,270, "buttonInactive");
    buttonSpear.setScale(0.3);
    let double_sword = this.add.image(750,370,"double_sword");
    let buttonDoubleSword = this.add.image(640,370, "buttonInactive");
    buttonDoubleSword.setScale(0.3);

}

function update () {
    // Si l'ennemi meurt
    if (vie <= 0) {
        killCount++;
        // Si le niveau est passé
        if (killCount >= 10) {
            // Augmenter la vie des monstres et les gains par kill
            vie = currVie * 1.3;
            vie = Math.trunc(vie);
            gain = gain * 3;
            gain = Math.trunc(gain);
            currVie = vie;
            killCount=0;
        } else {
            vie = currVie;
        }
        textKill.setText(killCount+1+"/10");
        textVie.setText(vie);
        money = money + gain;
        textCoin.setText(money); 
    }
}
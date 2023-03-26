
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
var currMoney = money;
var gain = 1.0;
var level = 1;
var killCount = 0;
var DPS = 0;

// Variables des prix des améliorations
var prixClick = 5;
var prixSword = 50;
var prixAxe = 500;
var prixSpear = 2000;
var prixDoubleSword = 5000;

// Variables des valeurs d'améliorations (montant quand amélioré)
var clickAmount = 1;
var swordAmount = 1;
var axeAmount = 5;
var spearAmount = 50;
var doubleSwordAmount = 500;

// Variables visuelles (afin de les modifier dans les différentes fonctions)
var textVie;
var textCoin;
var textKill;
var textLevel;
var buttonPotion;
var buttonSword;
var buttonAxe;
var buttonSpear;
var buttonDoubleSword;

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

// Crée la scène
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
    textVie = this.add.text(400, 340, vie , { fontSize: '32px', fill: '#F71907' });

    // KILL COUNT
    textKill = this.add.text(360, 390, killCount+1+"/10" , { fontSize: '32px', fill: '#ffffff' });

    // PARTIE GAUCHE
    // NIVEAU
    textLevel = this.add.text(20,20, "Level "+level);
    // DEGATS DE CLICK ET POTION
    potion = this.add.image(60,230, "potion");
    potion.setScale(2);
    buttonPotion = this.add.image(170,230, "buttonInactive").setInteractive();
    buttonPotion.setScale(0.3);
    let textButtonPotion = this.add.text(100, 208, "Tap Damage : +"+clickAmount+"\n\n Price : "+prixClick , { fontSize: '15px', fill: '#000000' });
    let textTapDamage = this.add.text(70,275,"Tap Damage : "+clickDamage);
    buttonPotion.on('pointerdown', function () {
        if (money >= prixClick) {
            money = money - prixClick;
            clickDamage = clickDamage + clickAmount;
            textTapDamage.setText("Tap Damage : "+clickDamage);
            prixClick = prixClick*1.3;
            prixClick = Math.trunc(prixClick);
            textButtonPotion.setText("Tap Damage : +"+clickAmount+"\n\n Price : "+prixClick , { fontSize: '15px', fill: '#000000' });
            textCoin.setText(money);
        }
    });

    // PARTIE DROITE 
    // Epee
    this.add.image(750,70,"sword");
    buttonSword = this.add.image(640,70, "buttonInactive").setInteractive();
    buttonSword.setScale(0.3);
    let textButtonSword = this.add.text(580, 48, "  DPS : +"+swordAmount+"\n\n Price : "+prixSword , { fontSize: '15px', fill: '#000000' });
    buttonSword.on('pointerdown', function () {
        if (money >= prixSword) {
            money = money - prixSword;
            DPS = DPS + swordAmount;
            prixSword = prixSword*1.5;
            prixSword = Math.trunc(prixSword);
            textDPS.setText("DPS : "+swordAmount , { fontSize: '15px', fill: '#000000' });
            textButtonSword.setText("  DPS : +"+ DPS+"\n\n Price : "+prixSword, { fontSize: '24px', fill: '#DA70D6' });
            textCoin.setText(money);
        }
    });
    // Hache
    this.add.image(750,170,"axe");
    buttonAxe = this.add.image(640,170, "buttonInactive").setInteractive();
    buttonAxe.setScale(0.3);
    let textButtonAxe = this.add.text(580, 148, "  DPS : +"+ axeAmount+"\n\n Price : "+prixAxe , { fontSize: '15px', fill: '#000000' });
    buttonAxe.on('pointerdown', function () {
        if (money >= prixAxe) {
            money = money - prixAxe;
            DPS = DPS + axeAmount;
            prixAxe = prixAxe*2;
            prixAxe = Math.trunc(prixAxe);
            textButtonAxe.setText("  DPS : +"+ axeAmount+"\n\n Price : "+prixAxe , { fontSize: '15px', fill: '#000000' });
            textDPS.setText("DPS : "+ DPS, { fontSize: '24px', fill: '#DA70D6' });
            textCoin.setText(money);
        }
    });
    // Lance
    this.add.image(750,270,"spear");
    buttonSpear = this.add.image(640,270, "buttonInactive").setInteractive();
    buttonSpear.setScale(0.3);
    let textButtonSpear = this.add.text(580, 248, "  DPS : +"+ spearAmount+"\n\n Price : "+prixSpear , { fontSize: '15px', fill: '#000000' });
    buttonSpear.on('pointerdown', function () {
        if (money >= prixSpear) {
            money = money - prixSpear;
            DPS = DPS + spearAmount;
            prixSpear = prixSpear*2.5;
            prixSpear = Math.trunc(prixSpear);
            textButtonSpear.setText("  DPS : +"+ spearAmount+"\n\n Price : "+prixSpear , { fontSize: '15px', fill: '#000000' });
            textDPS.setText("DPS : "+ DPS, { fontSize: '24px', fill: '#DA70D6' });
            textCoin.setText(money);
        }
    });
    // Epee Double
    this.add.image(750,370,"double_sword");
    buttonDoubleSword = this.add.image(640,370, "buttonInactive").setInteractive();
    buttonDoubleSword.setScale(0.3);
    let textButtonDoubleSword = this.add.text(580, 348, "  DPS : +"+ doubleSwordAmount+"\n\n Price : "+prixDoubleSword , { fontSize: '15px', fill: '#000000' });
    buttonDoubleSword.on('pointerdown', function () {
        if (money >= prixDoubleSword) {
            money = money - prixDoubleSword;
            DPS = DPS + doubleSwordAmount;
            prixDoubleSword = prixDoubleSword*3;
            prixDoubleSword = Math.trunc(prixDoubleSword);
            textButtonDoubleSword.setText("  DPS : +"+ doubleSwordAmount+"\n\n Price : "+prixDoubleSword , { fontSize: '15px', fill: '#000000' });
            textDPS.setText("DPS : "+ DPS, { fontSize: '24px', fill: '#DA70D6' });
            textCoin.setText(money);
        }
    });

    // EVENEMENT DE CLICK
    this.input.on('pointerdown', function () {
        vie = vie - clickDamage; // décrémenter le score
        textVie.setText(vie); // mettre à jour le texte du score
    }, this);

    // EVENEMENT DECLENCHE TOUTES LES SECONDES
    setInterval(() => {
        vie = vie - DPS;
        textVie.setText(vie);
    }, 1000);
    

}

// Se lance à chaque frame dans le jeu. Utilisé pour vérifier des conditions
function update () {
    // Si l'ennemi meurt
    if (vie <= 0) {
        killCount++;
        // Si le niveau est passé
        if (killCount >= 10) {
            // Augmenter la vie des monstres et les gains par kill
            vie = currVie * 1.3;
            vie = Math.trunc(vie);
            gain = gain * 2;
            gain = Math.trunc(gain);
            currVie = vie;
            killCount=0;
            level++;
            textLevel.setText("Level "+level);
        } else {
            vie = currVie;
        }
        textKill.setText(killCount+1+"/10");
        textVie.setText(vie);
        money = money + gain;
        textCoin.setText(money); 
    }
    // Si la valeur totale de l'argent peut permettre d'acheter une amélioration, affiche le bouton en rouge, sinon en gris
    // Se déclenche à chaque fois que l'argent augmente ou baisse
    if (money != currMoney) {
        // CLICK
        if (money >= prixClick) {
            buttonPotion.setTexture("buttonActive");
        } else {
            buttonPotion.setTexture("buttonInactive");
        }
        // Axe
        if (money >= prixSword) {
            buttonSword.setTexture("buttonActive");
        } else {
            buttonSword.setTexture("buttonInactive");
        }
        // AXE
        if (money >= prixAxe) {
            buttonAxe.setTexture("buttonActive");
        } else {
            buttonAxe.setTexture("buttonInactive");
        }
        // SPEAR
        if (money >= prixSpear) {
            buttonSpear.setTexture("buttonActive");
        } else {
            buttonSpear.setTexture("buttonInactive");
        }
        // DOUBLE SWORD
        if (money >= prixDoubleSword) {
            buttonDoubleSword.setTexture("buttonActive");
        } else {
            buttonDoubleSword.setTexture("buttonInactive");
        }
        currMoney = money;
    }
}
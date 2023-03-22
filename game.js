
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
        var vie = 10;
    
        function preload ()
        {
            this.load.spritesheet('skeleton', 'images/skeleton.png' , { frameWidth: 64, frameHeight: 128 });
            this.load.spritesheet('coin', 'images/coin.png', { frameWidth: 8, frameHeight: 8 });
            this.load.image('heart', 'images/heart.png');
            
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
            let coin = this.add.sprite(300,100,"coin");
            coin.setScale(4);

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
            let heart = this.add.image(300,360, "heart");
            heart.setScale(2);
            let textVie = this.add.text(350, 360, vie , { fontSize: '32px', fill: '#F71907' })
            // ajouter un événement de clic sur le jeu
            this.input.on('pointerdown', function () {
                vie--; // décrémenter le score
                textVie.setText(vie); // mettre à jour le texte du score
            }, this);

        }

        function update () {
        }
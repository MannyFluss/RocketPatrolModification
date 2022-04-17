class Multiplayer extends Phaser.Scene 
{

    constructor(){
        super("multiplayerScene");//used to identify the scene (called insisde Phaser.scene)
    }
    preload()
    {
        //preload sprites for scene
        this.load.image('rocket', './assets/fishingbob.png'); // (identifier, sprite path)
        this.load.spritesheet('explosion','./assets/ripFish.png', {frameWidth:64, frameHeight: 32, startFrame : 0});
        this.load.image('spaceship', './assets/fish.png');
        this.load.image('starfield', './assets/water.png');
        //music credit goes to Liam Fahey my dearest and most obnoxious roomate
        this.load.audio('music', './assets/EpicMusic.mp3');
        //audio
        this.load.audio('sfx_select', './asets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/bubblz.wav');
        this.load.audio('sfx_rocket', './assets/reel.wav');



    }
    create()
    {
        this.p2score = 0;
        this.sound.play('music');
        this.starfield = this.add.tileSprite(0,0,640,480, 'starfield').setOrigin(0,0); //tilesprite has innate scrolling
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x964B00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000080).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000080).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000080).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000080).setOrigin(0, 0);

        // add rocket (p1) 
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //setup multiplayer keys
        this.ship01.multiplayer = true;
        this.ship02.multiplayer = true; 
        this.ship03.multiplayer = true; 
        
        fish1Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.ship01.keyInput = fish1Key;
        fish2Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        this.ship02.keyInput = fish2Key;
        fish3Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.ship03.keyInput = fish3Key;

        //adding prefabs
        this.p1Rocket = new Rocket(this, game.config.width/2, 
            game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);




        //set the global key values, (why dont we do this in main?)
        this.anims.create({
            key : 'explode',
            frames: this.anims.generateFrameNumbers('explosion',{ start:0, end: 9, first:0}),
            frameRate : 30
        });

        
        this.p1Score = 0;        
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(borderUISize + borderPadding + 455, borderUISize + borderPadding*2 , this.p2score, scoreConfig);

        // 60-second play clock one shot timer
        this.gameOver = false;//flag to check if game is over

        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(60000, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true
        }, null, this);

    }


    update()
    {


        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            
            this.game.sound.stopAll();//quick and dirty solution but it works
            this.scene.start("menuScene");
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.game.sound.stopAll();
            this.scene.restart();
        }
        this.starfield.tilePositionX -= 1;
        if (!this.gameOver)
        {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        if (this.ship01.x <= 0 - this.ship01.width) //this.x = game.config.width;
        {
            this.ship01.x = 600000;
            this.p2score += 10;
            this.scoreRight.text = this.p2score;
        }
        if (this.ship02.x <= 0 - this.ship02.width) //this.x = game.config.width;
        {
            this.ship02.x = 600000;
            this.p2score += 10;
            this.scoreRight.text = this.p2score;
        }
        if (this.ship03.x <= 0 - this.ship03.width) //this.x = game.config.width;
        {
            this.ship03.x = 600000;
            this.p2score += 10;
            this.scoreRight.text = this.p2score;
        }
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        //check if a fish has made it to the other side to score



    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.x = 60000;                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });     
            // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        this.sound.play('sfx_explosion'); 
      }



}
class Menu extends Phaser.Scene 
{

    constructor(){
        super("menuScene");//used to identify the scene (called insisde Phaser.scene)
    }
    preload()
    {
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/bubblz.wav');
        this.load.audio('sfx_rocket', './assets/reel.wav');

    }
    create()
    {
        
        this.add.text(20,20, "Rocket Patrol Play");
        //this.scene.start("playScene");
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize
        - borderPadding, 'FISH PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 
            , 'Use A and D to move & (W) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderPadding + borderUISize,
        'for Normal <-  -> for Multiplayer', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderPadding + 50 + borderUISize,
        'player 2 uses I O & P to send fish', menuConfig).setOrigin(0.5);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('multiplayerScene');    
        }
      }
}


// init() prepares any data for the scene
// preload() prepares any assets we???ll need for the scene
// create() adds objects to the scene
// update() is a loop that runs continuously and allows us to update game objects
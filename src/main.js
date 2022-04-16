let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene : [ Menu , Play, Multiplayer]
  }

// set UI sizes
let game = new Phaser.Game(config);

//global variables, see accessed in play.js
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//player 1 keys
let keyF, keyR, keyLEFT, keyRIGHT;
let fish1Key, fish2Key, fish3Key;


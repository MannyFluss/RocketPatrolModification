let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene : [ Menu , Play]
  }

// set UI sizes
let game = new Phaser.Game(config);

//global variables, see accessed in play.js
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT;


//Fish Patrol was created/ programmed by Manny Fluss
//Original base game from Nathan Altice tutorial online
//Music credit goes to Liam Fahey (my roomate no liscence shennans.)
//completed on 4-16-2022 took around-ish 7 hours
//100 points
//5 points -> add music
//5 points -> movable 'rocket'
//60 points -> theme overhaul, was rocket patrol themed, now it is fishing themed!
//30 points -> simultaneous multiplayer, player 1 plays as normal
//             player 2 plays as the rockets and tries to get them accross (very unbalanced!)


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


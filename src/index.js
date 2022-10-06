/* eslint-disable no-use-before-define */
import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        // y: 200,
      },
    },
  },
  scene: {
    /* eslint-disable-next-line */
    preload,
    /* eslint-disable-next-line */
    create,
    /* eslint-disable-next-line */
    update,
  },
};

/* eslint-disable-next-line */
new Phaser.Game(config);

///////////////////
let bird = null;
let upperPipe = null;
let lowerPipe = null;
const initBirdPosition = { x: config.width * 0.1, y: config.height / 2 };
const pipeVerticalDistanceRange = [150, 250];
const pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
const pipeVerticalPosition = Phaser.Math.Between(
  20,
  config.height - 20 - pipeVerticalDistance
);

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0);

  bird = this.physics.add
    .sprite(initBirdPosition.x, initBirdPosition.y, 'bird')
    .setOrigin(0);
  bird.body.gravity.y = 200;

  // debugger;
  upperPipe = this.physics.add
    .sprite(350, pipeVerticalPosition, 'pipe')
    .setOrigin(0, 1);
  lowerPipe = this.physics.add
    .sprite(upperPipe.x, upperPipe.y + pipeVerticalDistance, 'pipe')
    .setOrigin(0, 0);

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown-SPACE', flap);
}

function update() {
  if (bird.y >= config.height - bird.height - 10 || bird.y <= 0) {
    restartBirdPosition();
  }
}

function flap() {
  bird.body.velocity.y = -200;
}

function restartBirdPosition() {
  bird.y = initBirdPosition.y;
  bird.body.velocity.y = 0;
}

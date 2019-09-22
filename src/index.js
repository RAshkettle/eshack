// eslint-disable-next-line spaced-comment
/// <reference path="../typings/phaser.d.ts" />

import Phaser from 'phaser';
import config from './config';
import BootScene from './scenes/BootScene';


class Game extends Phaser.Game {
    constructor() {
        super(config);
        this.scene.add('BootScene', BootScene);
        this.scene.start('BootScene');
    }
}

function startGame() {
    window.game = new Game();
}

window.onload = startGame();

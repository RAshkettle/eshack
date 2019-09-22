import Phaser from 'phaser';
import imglogo from '../assets/logo.png';
import GameScene from './GameScene';


export default class PreLoaderScene extends Phaser.Scene {
    constructor() {
        super('PreLoaderScene');
    }

    preload() {
        this.load.image('logo', imglogo);
    }

    create() {
        this.scene.add('Game', GameScene);
        this.scene.start('Game');
    }
}

import Phaser from 'phaser';
import imglogo from '../assets/logo.png';


export default class PreLoaderScene extends Phaser.Scene {
    constructor() {
        super('PreLoaderScene');
    }

    preload() {
        this.load.image('logo', imglogo);
    }

    create() {
        this.scene.start('GameScene');
    }
}

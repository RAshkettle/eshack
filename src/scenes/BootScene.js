import Phaser from 'phaser';
import imglogo from '../assets/eshack-logo.png';


export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('hack-logo', imglogo);
    }

    create() {
        this.scene.start('PreLoaderScene');
    }
}

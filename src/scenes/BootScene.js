import Phaser from 'phaser';
import PreLoaderScene from './PreLoaderScene';


export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    create() {
        this.scene.add('PreLoaderScene', PreLoaderScene);
        this.scene.start('PreLoaderScene');
    }
}

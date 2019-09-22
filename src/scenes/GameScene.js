import Phaser from 'phaser';


export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.add.image(400, 150, 'logo');
    }
}

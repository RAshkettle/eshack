import Phaser from 'phaser';
import config from '../config';
import Map from '../map';


export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }


    create() {
        // this.add.image(400, 150, 'logo');
        const map = new Map();
        map.generateMap(config.MAP_HEIGHT, config.MAP_WIDTH);
        map.render(this);
    }
}

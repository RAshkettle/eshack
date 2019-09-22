import Phaser from 'phaser';
import phaserlogo from '../assets/logo.png';
import floorTile from '../assets/floor.png';


export default class PreLoaderScene extends Phaser.Scene {
    constructor() {
        super('PreLoaderScene');
        this.readyCount = 0;
    }

    preload() {
        // Loading Screen with Progress Bar
        const { width } = this.cameras.main;
        const { height } = this.cameras.main;

        this.add.image(width / 2, height / 2 - 100, 'hack-logo');

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30);
        });

        // Clean up when finished and move on
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            this.ready();
        });

        this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

        // Load the Assets (you know, the whole reason we are here anyway)
        this.load.image('logo', phaserlogo);
        this.load.image('floortile', floorTile);
    }

    ready() {
        this.readyCount++;
        if (this.readyCount >= 2) {
            this.scene.start('GameScene');
        }
    }
}

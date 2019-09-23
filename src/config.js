import Phaser from 'phaser';

export default {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    pixelArt: true,
    clearBeforeRender: false,
    scale: {
        mode: Phaser.Scale.SHOW_ALL,
        width: 1024,
        height: 768,
    },
    MAP_WIDTH: 62,
    MAP_HEIGHT: 45,
    ROOM_MAX_SIZE: 10,
    ROOM_MIN_SIZE: 6,
    MAX_ROOMS: 30,
    TILE_SIZE: 16,
};

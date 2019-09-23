import Phaser from 'phaser';
import Rect from './rect';
import Tile from './tile';
import config from './config';

export default class Map {
    constructor() {
        this.floor = null;
        this.height = null;
        this.width = null;
        this.tilesize = config.TILE_SIZE;
    }

    static setFloorTile(loc) {
        // Sets a tile as a floor tile
        loc.walkable = true;
        loc.block_sight = false;
        loc.is_revealed = true;
    }

    createRoom(room) {
        // go through the tiles in the rectangle and make them passable
        for (let x = room.x1 + 1; x < room.x2; x++) {
            for (let y = room.y1 + 1; y < room.x2; y++) {
                this.setFloorTile(this.floor[x][y]);
            }
        }
    }

    createHorizontalTunnel(x1, x2, y) {
        // horizontal tunnel. min() and max() are used in case x1>x2
        for (let x = Math.min(x1, x2); x < (Math.max(x1, x2) + 1); x++) {
            this.setFloorTile(this.floor[x][y]);
        }
    }

    createVerticalTunnel(y1, y2, x) {
        // vertical tunnel
        for (let y = Math.min(y1, y2); y < (Math.max(y1, y2) + 1); y++) {
            this.setFloorTile(this.floor[x][y]);
        }
    }

    generateMap(height, width) {
        // Initialize the map
        this.height = height;
        this.width = width;

        this.floor = new Array(height).fill(0).map(() => new Array(width).fill(0));

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.floor[x][y] = Tile.getNewTile();
            }
        }

        // Create some rooms
        const rooms = [];
        let numRooms = 0;

        for (let r = 0; r < config.MAX_ROOMS; r++) {
            // random width and height
            const w = Phaser.Math.Between(config.ROOM_MIN_SIZE, config.ROOM_MAX_SIZE);
            const h = Phaser.Math.Between(config.ROOM_MIN_SIZE, config.ROOM_MAX_SIZE);

            // random position without going out of the boundaries of the map
            const x = Phaser.Math.Between(0, this.width - w - 1);
            const y = Phaser.Math.Between(0, this.height - h - 1);

            const newRoom = new Rect(x, y, w, h);
            // run through the other rooms and see if they intersect with this one
            let failed = false;

            rooms.forEach((otherRoom) => {
                if (!failed && newRoom.intersect(otherRoom)) {
                    failed = true;
                }
            });

            if (!failed) {
                // this means there are no intersections, so this room is valid
                // "paint" it to the map's tiles
                this.createRoom(newRoom);
                // center coordinates of new room, will be useful later
                const newRoomCenter = newRoom.center();

                if (!numRooms === 0) {
                    // all rooms after the first:
                    // connect it to the previous room with a tunnel

                    // center coordinates of previous room
                    const previousRoomCenter = rooms[numRooms - 1].center();

                    // draw a coin (random number that is either 0 or 1)
                    if (Phaser.Math.Between(0, 1) === 1) {
                        // first move horizontally, then vertically
                        this.createHorizontalTunnel(previousRoomCenter.x,
                            newRoomCenter.x, previousRoomCenter.y);
                        this.createVerticalTunnel(previousRoomCenter.y,
                            newRoomCenter.y, newRoomCenter.x);
                    } else {
                        // first move vertically, then horizontally
                        this.createVerticalTunnel(previousRoomCenter.y,
                            newRoomCenter.y, previousRoomCenter.x);
                        this.createHorizontalTunnel(previousRoomCenter.x,
                            newRoomCenter.x, newRoomCenter.y);
                    }
                }
                // finally, append the new room to the list
                rooms.push(newRoom);
                numRooms += 1;
            }
        }
    }
}

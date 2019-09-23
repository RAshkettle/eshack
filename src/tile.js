export default class Tile {
    constructor(walkable, tileSprite, isRevealed = false, blockSight = null) {
        this.walkable = walkable;
        this.isRevealed = isRevealed;
        this.tileSprite = tileSprite;
        let sightBlocked = blockSight;

        // By Default, if a tile is not walkable, it also blocks sight
        if (sightBlocked === null) {
            sightBlocked = !walkable;
        }
        this.blockSight = sightBlocked;
    }

    static getNewTile() {
        // Factory Method for creating a new Tile with default settings
        const T = new Tile(false, null, false, false);
        return T;
    }
}

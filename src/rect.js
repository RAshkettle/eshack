export default class Rect {
    constructor(x, y, w, h) {
        this.x1 = x;
        this.y1 = y;
        this.x2 = x + w;
        this.y2 = y + h;
    }

    center() {
        const centerX = (this.x1 + this.x2) / 2;
        const centerY = (this.y1 + this.y2) / 2;
        return { x: centerX, y: centerY };
    }

    intersect(other) {
        // returns true if this rectangle intersects with another one
        return (this.x1 <= other.x2 && this.x2 >= other.x1
                && this.y1 <= other.y2 && this.y2 >= other.y1);
    }
}

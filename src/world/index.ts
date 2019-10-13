import {translateClientX, translateClientY} from './utils';

export default class World {
    public zoomFactor: number = 100;
    public sizeFactor: number = 1000;
    public viewportBounds: { x: number, y: number };

    constructor(window: Window) {
        this.viewportBounds = {
            x: window.innerWidth,
            y: window.innerHeight,
        };
    }

    public translateClientX(pos: number): number {
        return translateClientX(pos, this.viewportBounds.x, this.zoomFactor);
    }

    public translateClientY(pos: number): number {
        return translateClientY(pos, this.viewportBounds.y, this.zoomFactor);
    }

    public transformSize(size: number): number {
        return size / this.sizeFactor;
    }
}

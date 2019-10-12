import {translateClientX, translateClientY} from './utils';

export default class World {
    public zoomFactor: number = 100;
    public windowBounds: { x: number, y: number };

    constructor(window: Window) {
        this.windowBounds = {
            x: window.innerWidth,
            y: window.innerHeight,
        };
    }

    public translateClientX(pos: number): number {
        return translateClientX(pos, this.windowBounds.x, this.zoomFactor);
    }

    public translateClientY(pos: number): number {
        return translateClientY(pos, this.windowBounds.y, this.zoomFactor);
    }
}

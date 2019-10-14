import {Camera, PerspectiveCamera, Vec2, Vector3} from 'three';
import {translateViewportToWorld} from './utils';

export default class World {
    public zoomFactor: number = 100;
    public sizeFactor: number = 1000;
    public viewportBounds: Vec2;

    public camera: Camera;

    private translationVec = new Vector3();
    private translationPos = new Vector3();

    constructor(viewportBounds: Vec2) {
        this.viewportBounds = viewportBounds;

        this.initStage();
    }

    public translateViewportToWorld(clientPos: Vec2): Vec2 {
        return translateViewportToWorld(
            clientPos,
            this.viewportBounds,
            this.camera,
            this.translationVec,
            this.translationPos,
        );
    }

    public transformSize(size: number): number {
        return size / this.sizeFactor;
    }

    private initStage() {
        this.camera = new PerspectiveCamera(
            45,
            this.viewportBounds.x / this.viewportBounds.y,
            1,
            1000,
        );
        this.camera.position.z = 15;
    }
}

import {Camera, Vec2, Vector3} from 'three';

export function translateViewportToWorld(
    pos: Vec2,
    viewportBounds: Vec2,
    camera: Camera,
    vec?: Vector3,
    worldPos?: Vector3,
): Vec2 {
    if (!vec) {
        vec = new Vector3();
    }
    if (!worldPos) {
        worldPos = new Vector3();
    }

    vec.set(
        (pos.x / viewportBounds.x) * 2 - 1,
        -(pos.y / viewportBounds.y) * 2 + 1,
        0.5);

    vec.unproject(camera);
    vec.sub(camera.position).normalize();

    worldPos.copy(camera.position).add(vec.multiplyScalar(
        -camera.position.z / vec.z,
    ));

    return worldPos;
}

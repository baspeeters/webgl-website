import {
    Box3,
    BoxGeometry,
    BoxHelper,
    Color,
    Font,
    FontLoader,
    Geometry,
    Group,
    Line,
    LineBasicMaterial,
    Mesh,
    MeshBasicMaterial,
    Renderer,
    Scene,
    TextGeometry,
    Vec2,
    Vector3,
    WebGLRenderer,
} from 'three';

import World from './world';

const emptyGeometry: Geometry = new BoxGeometry();

let scene: Scene;
let renderer: Renderer;
let textMesh: Mesh;
let cursorObject: Line;
let titleGroup: Group;
let fontLoader: FontLoader;
let basicMaterial: MeshBasicMaterial;
let lineMaterial: LineBasicMaterial;

const world = new World({
    x: window.innerWidth,
    y: window.innerHeight,
});

init();
animate();

function init() {
    const defaultMaterialParams = {color: 0x00ff22, transparent: true, opacity: 0.9};
    basicMaterial = new MeshBasicMaterial(defaultMaterialParams);
    lineMaterial = new LineBasicMaterial(defaultMaterialParams);

    const cursorGeometry = new Geometry();
    cursorGeometry.vertices.push(
        new Vector3(0, 0.3, 2),
        new Vector3(0.3, 0, 2),
        new Vector3(0, -0.1, 2),
        new Vector3(0, 0.3, 2),
    );

    cursorObject = new Line(cursorGeometry, lineMaterial);
    textMesh = new Mesh(emptyGeometry, basicMaterial);

    fontLoader = new FontLoader();
    loadText(fontLoader);

    scene = new Scene();

    titleGroup = new Group();
    titleGroup.add(textMesh);

    scene.add(cursorObject);
    scene.add(titleGroup);

    renderer = new WebGLRenderer({antialias: true});
    renderer.setSize(world.viewportBounds.x, world.viewportBounds.y);
    document.body.appendChild(renderer.domElement);

    let clientPos: Vec2;
    window.addEventListener('mousemove', (e: MouseEvent) => {
        clientPos = world.translateViewportToWorld({x: e.clientX, y: e.clientY});

        cursorObject.position.setX(clientPos.x);
        cursorObject.position.setY(clientPos.y);
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, world.camera);
}

function loadText(loader: FontLoader) {
    loader.load('fonts/droid_sans_mono_regular.typeface.json', (font: Font) => {
        textMesh.geometry = new TextGeometry('BAS PEETERS', {
            font,
            size: world.transformSize(world.viewportBounds.x),
            height: 0.1,
            curveSegments: 4,
            bevelEnabled: false,
        });

        const size = new Vector3();
        const box = new Box3().setFromObject(titleGroup).getSize(size);
        const pos = world.translateViewportToWorld({
            x: world.viewportBounds.x - 25,
            y: 25,
        });
        titleGroup.position.setX(pos.x - size.x);
        titleGroup.position.setY(pos.y - size.y);

        titleGroup.updateMatrixWorld(true);
        scene.add(new BoxHelper(titleGroup, new Color(0x00ff22)));
    });
}

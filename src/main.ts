import {
    Box3,
    BoxGeometry,
    Camera,
    CircleGeometry,
    Font,
    FontLoader,
    Geometry,
    Group,
    Mesh,
    MeshBasicMaterial,
    OrthographicCamera,
    Renderer,
    Scene,
    TextGeometry, Vector3,
    WebGLRenderer,
} from 'three';

import World from './world';

const width: number = window.innerWidth;
const height: number = window.innerHeight;
const emptyGeometry: Geometry = new BoxGeometry();

let camera: Camera;
let scene: Scene;
let renderer: Renderer;
let textMesh: Mesh;
let cursorMesh: Mesh;
let titleGroup: Group;
let fontLoader: FontLoader;
let basicMaterial: MeshBasicMaterial;

const world = new World(window);

init();
animate();

function init() {
    camera = new OrthographicCamera(
        width / -world.zoomFactor,
        width / world.zoomFactor,
        height / world.zoomFactor,
        height / -world.zoomFactor,
        -100,
        1000,
    );

    basicMaterial = new MeshBasicMaterial({color: 0x00ff22, transparent: true, opacity: 0.9});

    cursorMesh = new Mesh(new CircleGeometry(0.1, 8), basicMaterial);
    textMesh = new Mesh(emptyGeometry, basicMaterial);

    fontLoader = new FontLoader();
    loadText(fontLoader);

    scene = new Scene();

    titleGroup = new Group();
    titleGroup.add(textMesh);

    scene.add(cursorMesh);
    scene.add(titleGroup);

    renderer = new WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('mousemove', (e: MouseEvent) => {
        cursorMesh.position.setX(world.translateClientX(e.clientX));
        cursorMesh.position.setY(world.translateClientY(e.clientY));
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function loadText(loader: FontLoader) {
    // Render multiple text objects (and position) based on a list of objects
    loader.load('fonts/droid_sans_mono_regular.typeface.json', (font: Font) => {
        textMesh.geometry = new TextGeometry('BAS PEETERS', {
            font,
            size: world.transformSize(world.windowBounds.x),
            height: 0.1,
            curveSegments: 4,
            bevelEnabled: false,
        });

        const size = new Vector3();
        const box = new Box3().setFromObject(titleGroup).getSize(size);

        titleGroup.position
            .setX(world.translateClientX(world.windowBounds.x - 25) - size.x)
            .setY(world.translateClientY(20) - size.y);
    });
}

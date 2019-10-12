import {
    BoxGeometry,
    Camera,
    Font,
    FontLoader,
    Geometry,
    Group,
    Mesh,
    MeshBasicMaterial,
    OrthographicCamera,
    Renderer,
    Scene,
    TextGeometry,
    WebGLRenderer,
} from 'three';

const width: number = window.innerWidth;
const height: number = window.innerHeight;
const zoomFactor: number = 100;
const emptyGeometry: Geometry = new BoxGeometry();

let camera: Camera;
let scene: Scene;
let renderer: Renderer;
let textMesh: Mesh;
let titleGroup: Group;
let fontLoader: FontLoader;
let basicMaterial: MeshBasicMaterial;

init();
animate();

function init() {
    camera = new OrthographicCamera(
        width / -zoomFactor,
        width / zoomFactor,
        height / zoomFactor,
        height / -zoomFactor,
        -100,
        1000,
    );

    basicMaterial = new MeshBasicMaterial({color: 0x00ff22, transparent: true, opacity: 0.9});
    textMesh = new Mesh(emptyGeometry, basicMaterial);

    fontLoader = new FontLoader();
    loadText(fontLoader);

    scene = new Scene();

    titleGroup = new Group();
    titleGroup.add(textMesh);

    scene.add(titleGroup);

    renderer = new WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
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
            size: 1,
            height: 0.1,
            curveSegments: 4,
            bevelEnabled: false,
        }).center();
    });
}

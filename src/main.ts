import {
    Box3,
    BoxGeometry,
    Camera,
    FontLoader,
    Geometry,
    Group,
    Material,
    Mesh,
    MeshBasicMaterial,
    MeshNormalMaterial,
    OrthographicCamera,
    Renderer,
    Scene, TextGeometry,
    WebGLRenderer,
} from 'three';

const width: number = window.innerWidth;
const height: number = window.innerHeight;
const zoomFactor: number = 100;

let camera: Camera;
let scene: Scene;
let renderer: Renderer;
let textMesh: Mesh;
let titleGroup: Group;
let fontLoader: FontLoader;

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

    fontLoader = new FontLoader();
    loadText(fontLoader);

    scene = new Scene();

    titleGroup = new Group();
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
    loader.load('fonts/droid_sans_mono_regular.typeface.json', font => {
        const geometry = new TextGeometry('BAS PEETERS', {
            font,
            size: 1,
            height: 0.1,
            curveSegments: 4,
            bevelEnabled: false,
        });

        const basicMaterial = new MeshBasicMaterial({color: 0x00ff22, transparent: true, opacity: 0.9});
        textMesh = new Mesh(geometry, basicMaterial);
        textMesh.geometry.center();

        titleGroup.add(textMesh);
    });
}

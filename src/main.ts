import {
    BoxGeometry,
    Camera,
    Geometry,
    Material,
    Mesh,
    MeshNormalMaterial,
    OrthographicCamera,
    Renderer,
    Scene,
    WebGLRenderer,
} from 'three';

const width: number = window.innerWidth;
const height: number = window.innerHeight;
const zoomFactor: number = 100;

let camera: Camera;
let scene: Scene;
let renderer: Renderer;
let geometry: Geometry;
let material: Material;
let mesh: Mesh;

function init() {
    camera = new OrthographicCamera(
        width / -zoomFactor,
        width / zoomFactor,
        height / zoomFactor,
        height / -zoomFactor,
        -100,
        1000,
    );

    scene = new Scene();

    geometry = new BoxGeometry(1, 1, 1);
    material = new MeshNormalMaterial();

    mesh = new Mesh(geometry, material);
    scene.add(mesh);

    renderer = new WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function animate() {

    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scene, camera);

}

init();
animate();

import * as THREE from "three";
// import * as CSG from "/Users/kyrhong/Documents/Learn-Three.js-Fourth-edition/source/samples/chapters/chapter-1/THREE.CSG.js"; 
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DragControls } from "three/examples/jsm/controls/DragControls";
// import * as CSG from "csg.js-master"


const textureLoader = new THREE.TextureLoader(); 
const groundTexture = textureLoader.load('/assets/textures/wood/floor-parquet-pattern-172292.jpg') // make sure this file exists!
// const ceilingTexture = texture.Loader.load('')
const bricksTexture = textureLoader.load('/assets/textures/red-bricks/red_bricks_04_ao_1k.jpg')

const textureMaterial = new THREE.MeshPhongMaterial({ color: 0xb0874c })
textureMaterial.map = groundTexture
//textureMaterial.side = THREE.DoubleSide;

const bricksMaterial = new THREE.MeshPhongMaterial({ color: 0xAA4A44 })
bricksMaterial.map = bricksTexture
bricksMaterial.side = THREE.DoubleSide;

const tableMaterial = new THREE.MeshPhongMaterial({color: 0x382b18})
tableMaterial.side = THREE.DoubleSide; 

// basic scene setup
const scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0xcccccc, 200, 800);
scene.background = new THREE.Color(0x87CEEB);

// setup camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
);
camera.position.x = -3;
camera.position.z = 8;
camera.position.y = 2;

// setup the renderer and attach to canvas
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

// add lights
scene.add(new THREE.AmbientLight(0xFFFFFF));


// const dirLight = new THREE.DirectionalLight(0xffffff);
// dirLight.position.set(5, 12, 8);
// dirLight.castShadow = true;
// dirLight.intensity = 1;
// dirLight.shadow.camera.near = 0.1;
// dirLight.shadow.camera.far = 200;
// dirLight.shadow.camera.right = 10;
// dirLight.shadow.camera.left = -10;
// dirLight.shadow.camera.top = 10;
// dirLight.shadow.camera.bottom = -10;
// dirLight.shadow.mapSize.width = 512;
// dirLight.shadow.mapSize.height = 512;
// dirLight.shadow.radius = 4;
// dirLight.shadow.bias = -0.0005;

// scene.add(dirLight);   


// const dirtLight = new THREE.DirectionalLight(0xccccff);
// dirtLight.position.set(-5, -12, -8);
// dirtLight.castShadow = true;
// dirtLight.intensity = 1;
// dirtLight.shadow.camera.near = 0.1;
// dirtLight.shadow.camera.far = 200;
// dirtLight.shadow.camera.right = 10;
// dirtLight.shadow.camera.left = -10;
// dirtLight.shadow.camera.top = 10;
// dirtLight.shadow.camera.bottom = -10;
// dirtLight.shadow.mapSize.width = 512;
// dirtLight.shadow.mapSize.height = 512;
// dirtLight.shadow.radius = 4;
// dirtLight.shadow.bias = -0.0005;

// scene.add(dirtLight);   

// create a very large ground plane
const groundGeometry = new THREE.PlaneBufferGeometry(10000, 10000)
const groundMaterial = new THREE.MeshLambertMaterial({
  color: 0x489030
})
const groundMesh = new THREE.Mesh(groundGeometry,groundMaterial)
groundMesh.position.set(0, -2, 0)
groundMesh.rotation.set(Math.PI / -2, 0, 0)
groundMesh.receiveShadow = true
scene.add(groundMesh);

// create walls and floor and ceiling

const longWall = new THREE.BoxGeometry(200, 120, 2); 
const planeWall = new THREE.BoxGeometry(200,150, 2); 
const shortWall = new THREE.BoxGeometry(150, 120, 2)

const wallOne = new THREE.Mesh(longWall, bricksMaterial); 
wallOne.receiveShadow = true;
wallOne.position.set(0, 60, 0)
wallOne.rotation.set(0, 0, 0);

const wallTwo = new THREE.Mesh(planeWall, textureMaterial); 
wallTwo.receiveShadow = true; 
wallTwo.position.set(0, 0, 75)
wallTwo.rotation.set(Math.PI / 2, 0, 0);

const wallThree = new THREE.Mesh(shortWall, bricksMaterial); 
wallThree.receiveShadow = true; 
wallThree.position.set(100, 60, 75)
wallThree.rotation.set(0, Math.PI / 2, 0);

const wallFour = new THREE.Mesh(longWall, bricksMaterial); 
wallFour.receiveShadow = true; 
wallFour.position.set(0, 60, 150)
wallFour.rotation.set(0, 0, 0);

const wallFive = new THREE.Mesh(planeWall, textureMaterial); 
wallFive.receiveShadow = true; 
wallFive.position.set(0, 120, 75)
wallFive.rotation.set(Math.PI / 2, 0, 0);

scene.add(wallOne, wallTwo, wallThree, wallFour, wallFive)


// Initialize MTLLoader, OBJLoader, GLTFLoader
const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();

// const loader = new GLTFLoader().setPath('/assets/gltf/Simple Table 1-Mesh 801309/table.gltf');
// loader.load ('scene.gltf', (gltf) => {
//   const mesh = gltf.scene;
//   mesh.position.set(5,0,5)
//   scene.add(mesh);
// });


mtlLoader.load('/assets/models/Simple Table 1-Mesh 801081/table.mtl', function(materials) {
  materials.preload();

  objLoader.load('/assets/models/Simple Table 1-Mesh 801081/table.obj', function(object){
    object.scale.set(0.5, 0.5, 0.5); // Scale to half size in all dimensions
    scene.add(object);
    object.position.set(5, 0, 5); // Adjust position if needed
  });
});

mtlLoader.load('/assets/models/pinecone/pinecone.mtl', function(materials) {
  materials.preload();

  objLoader.load('/assets/models/pinecone/pinecone.obj', function(objectTwo){
    objectTwo.scale.set(10, 10, 10); // Scale to half size in all dimensions
    scene.add(objectTwo);
    objectTwo.position.set(10, 5, 10); // Adjust position if needed
  });
});





// add orbitcontrols
const controller = new OrbitControls(camera, renderer.domElement);
const clock = new THREE.Clock()

// render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controller.update(clock.getDelta())
    
    // let d = controller.getDistance()
    // tetrahedron.rotation.y += 1 / (d + 7); // adding a 7 to adjust speed
    // tetrahedron.material.color.r = 1 / d;
    // tetrahedron.material.color.g = d / d_original;

    // controller.update();
}
animate();


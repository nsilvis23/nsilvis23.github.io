import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gsap } from "gsap";
import Stats from 'three/examples/jsm/libs/stats.module'


import Resources from './src/Resources.js';

import AllPOI from './src/POI.js';
import './src/Controls.js';
import './src/Museum.js';
import Map3D from './src/Map3D.js';
import Size from './src/Size.js';



const map3d = new Map3D(document.querySelector('#bg'));
//unneeded?
/* const raycaster = new THREE.Raycaster();
//cursor, maybe needed?
const pointer = new THREE.Vector2();
//put to 3DMap
const scene = new THREE.Scene();
 */
//floor

/* var currentFloor = 1;
const MIN_FLOOR = 0;
const MAX_FLOOR = 2;

//put to Camera
//
const aspect = window.innerWidth / window.innerHeight;
const d = 20;
const camera = new THREE.OrthographicCamera(- d * aspect, d * aspect, d, -d, 0, 100)

//put to renderer
//
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

//put to Map3d
const stats = Stats()
document.body.appendChild(stats.dom);

//grid helper
const gridHelper = new THREE.GridHelper ( 40, 40)
scene.add(gridHelper);
 */

/* //Map3D Static Instance Test
console.log("Making Map3D 1")
const map = new Map3D(document.querySelector('#bg'));
console.log("Making Map3D 2")
const map2 = new Map3D(document.querySelector('#bg'));
 */

gsap.registerPlugin()


//Defining Floors, MOVE to Museum
/* const floor0 = new THREE.Object3D();
const floor1 = new THREE.Object3D();
const floor2 = new THREE.Object3D();
const FLOORS = new Array(floor0, floor1, floor2);




//defining raycaster */
/* pointer.x = -1;
pointer.y = -1;
raycaster.layers.set(1);

//preload

const resources = new Resources();
const gltfData = await resources.loadModel('./glbs/FIELD.glb');

 */

/* 

var count0 = 0;
var count1 = 0;
var count2 = 0;
var countTotal = 0;
 */

console.log(gltfData[1].children)

//
var floor2meshes = [];
var floor1meshes = [];
var floor0meshes = [];
//
gltfData[1].traverse((child) =>  {

  
  parseName(child);

  child.layers.enable(1);
  
  child.material ? child.material.transparent = true : null

  switch (child.floor) {
    case "2":
      floor2meshes.push(child)
      //console.log("added ".concat(child.name).concat(" to floor 2"))
      
      break;
    case "1":
      floor1meshes.push(child)
      //console.log("added ".concat(child.name).concat(" to floor 1"))
      
      break;
    case "0":
      floor0meshes.push(child)
      //console.log("added ".concat(child.name).concat(" to floor 0"))
      
      break;
    default:
      console.log("im confused about ".concat(child.name));
      
  }

  
  

});

//
floor2meshes.forEach((obj) => floor2.add(obj))
floor1meshes.forEach((obj) => floor1.add(obj))
floor0meshes.forEach((obj) => floor0.add(obj))



scene.add(floor1);
scene.add(floor0);




//scene.add(gltfData[1]);


//
renderer.setPixelRatio( window.devicePixelRatio );
//
renderer.setSize( window.innerWidth, window.innerHeight );


//
camera.position.set(d, d, d);
camera.rotation.set(Math.atan(-1/Math.sqrt(2)),Math.PI/4,0)
camera.zoom = 3
camera.updateProjectionMatrix();







// Maybe Move
scene.background = new THREE.Color(0xf3f3f3);






window.addEventListener( 'pointermove', onMouseMove );






const pointLight = new THREE.PointLight(0xffffff, 1, 0, 0);
pointLight.position.set(d,d,-d);
scene.add(pointLight);




//const amb = new THREE.AmbientLight(0xffffff, 1);
//scene.add(amb)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
const angle = controls.getPolarAngle();
controls.maxPolarAngle = angle;
controls.minPolarAngle = angle;








const birdhall = {
  
  element: document.querySelector(".hallOfBirds"),
  position: getCenter(floor1meshes[7])
  
}

const closeIcn = document.querySelector('.close')

const infoPanel = document.querySelector('.info-panel')
const infoPanelImage = document.querySelector('.info-panel-image')
const infoPanelLogo = document.querySelector('.info-panel-logo')
const infoPanelTitle = document.querySelector('.info-panel-title')
const infoPanelLead = document.querySelector('.info-panel-lead')
const infoPanelDescription = document.querySelector('.info-panel-description')
const infoPanelMo = document.querySelector('.info-panel-monday')
const infoPanelTu = document.querySelector('.info-panel-tuesday')
const infoPanelWe = document.querySelector('.info-panel-wednesday')
const infoPanelTh = document.querySelector('.info-panel-thursday')
const infoPanelFr = document.querySelector('.info-panel-friday')
const infoPanelSa = document.querySelector('.info-panel-saturday')
const infoPanelSu = document.querySelector('.info-panel-sunday')
const infoPanelPhone = document.querySelector('.info-panel-phone')
const infoPanelEmail = document.querySelector('.info-panel-email')
const infoPanelWebsite = document.querySelector('.info-panel-website')

birdhall.element.addEventListener('click', () => {
  infoPanel.style.right = '0';
});




const birdhall2 = {
  
  element: document.querySelector(".hallOfDogs"),
  position: getCenter(floor1meshes[9])
  
}



const birdhall3 = {
  
  element: document.querySelector(".hallOfCats"),
  position: getCenter(floor1meshes[11])
  
}

const taa = {

  element: document.querySelector(".theAncientAmericas"),
  position: getCenter(floor1meshes[1])
}

/* var halls1 = [birdhall, birdhall2, birdhall3] */

var halls1 = [birdhall, taa]
var halls2 = [birdhall2]
halls2.forEach((hall) => hall.element.style.opacity = 0)
var halls0 = [birdhall3]
halls0.forEach((hall) => hall.element.style.opacity = 0)

const FLOORS_HALLS = [halls0, halls1, halls2]


const POIs = new AllPOI();








function animate() {
  requestAnimationFrame(animate);

  // update the picking ray with the camera and pointer position
	raycaster.setFromCamera( pointer, camera );
  floor2.children[0].positionY += .1;

  //put css elemnt at right location


  FLOORS_HALLS[currentFloor].forEach( (hall) => {
    const screenPosition = hall.position.clone();
    screenPosition.project(camera);
    
    const translateX = screenPosition.x * window.innerWidth * .5;
    const translateY = -1* screenPosition.y * window.innerHeight * .5;
    
    hall.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
  } );
  

  
  
	// calculate objects intersecting the picking ray
/* 	const intersects = raycaster.intersectObjects( scene.children );
	for ( let i = 0; i < intersects.length; i ++ ) {


    
    console.log(intersects[i].object)

    if(intersects[i].object.type !== "null") null;//{intersects[i].object.material.color.set( 0xff0000)}
    
    

	}
   */

  controls.update();

  renderer.render(scene, camera);
}

animate();



function moveUpFloor() {
  //Change POIs Displayed to current Floor POIS
  FLOORS_HALLS[currentFloor].forEach((hall) => {
    hall.element.style.opacity = 0;
  } )

  
  //Change Floor Displayed
  currentFloor ++;
  scene.add(FLOORS[currentFloor]);

  //Change POIs Displayed to current Floor POIS
  FLOORS_HALLS[currentFloor].forEach((hall) => {
    hall.element.style.opacity = 1;
  } )

}

function moveDownFloor() {
  //Change POIs Displayed to current Floor POIS
  FLOORS_HALLS[currentFloor].forEach((hall) => {
    hall.element.style.opacity = 0;
  } )

  //Change Floor Displayed
  scene.remove(FLOORS[currentFloor])
  currentFloor --;

    //Change POIs Displayed to current Floor POIS
    FLOORS_HALLS[currentFloor].forEach((hall) => {
      hall.element.style.opacity = 1;
    } )
  
}


// Used to jump to a floor if option selected from other link
function setFloor(floor) {
  currentFloor = floor;
}


//Used to update the current floor display
function updateFloor() {
  console.log("UPDATE FLOOR")

  //Handle Display
  const displayTime = document.getElementById('display-floor')
  if(currentFloor === 0) {
    displayTime.innerText = "B"
  } else {
    displayTime.innerText = currentFloor.toString();
  }

  
}

updateFloor();

const upbutton = document.querySelector("button[name='up']");
upbutton.addEventListener("click", (event) => {
  if(currentFloor < MAX_FLOOR) {
    moveUpFloor();
    updateFloor();
    
  }
  
})

const downbutton = document.querySelector("button[name='down']");
downbutton.addEventListener("click", (event) => {
  if(currentFloor > MIN_FLOOR) {
    moveDownFloor();
    updateFloor();
  }
})

function onMouseMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  


}

function hoverGlowFadeIn( object ) {
  
}

function hoverGlowFadeOut ( object ) {

}

function loadModel(url) {
  return new Promise((resolve, reject) => {
    loader.load(url, function(gltf) {
      

      resolve(gltf.scenes);
      console.log("LOADED");
      
      
      
    }), undefined, function (error) {
      console.error ("error");
    };
  })
}

//
function parseName(object){

  //console.log("parsing ".concat(object.name))

  try {
    if(object) {
      const ids = object.name.split('_');
      
      object.x = ids[0];
      object.floor = ids[1];
      //console.log("floor: ".concat(object.floor))
      object.type = ids[2];
      object.key = ids[3];
      


    } 
  } catch (error) {
    console.error(error);
  }
}

function fadeIn() {
  gsap.to(obj, {duration: 3, opacity: 0})

}

function getCenter(room) {
  var center = new THREE.Vector3();
  var geometry = room.geometry;

  geometry.computeBoundingBox();

  center.x = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
  center.y = (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2;
  center.z = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2;

  room.localToWorld(center)
  return center

}











import World from "./World.js"
import Resources from "./Resources.js";

import Renderer from "./Renderer.js";
import * as THREE from 'three';
import Size from "./Size.js";
import Camera from "./Camera.js";
import Controls from "./Controls.js";
import UI from "./UI.js";



const assets = [
    {
        name: "field",
        type: "glbModel",
        url: "./public/glbs/FIELD.glb"
    }
]

const MAX_FLOOR = 2;
const MIN_FLOOR = 0;

export default class Map3D {
    static instance;
    constructor(canvas) {
        //static instance check
        if (Map3D.instance) {
            return Map3D.instance
        }

        console.log("BUILDING MAP3D")
        Map3D.instance = this


        //set variables

        this.canvas = canvas
        this.scene = new THREE.Scene();
        this.resources = new Resources(assets);
        
        this.size = new Size();
        this.camera = new Camera();
        this.world = new World();



        this.currentFloor = 1;


        
        this.ui = new UI();

        this.renderer = new Renderer();
        this.controls = new Controls();





        this.size.on('resize', () => {

            console.log('MAP3D WE ARE RESIZING')

            this.renderer.resize();
            this.camera.resize();

        })

        //build buttons
        //
        //up button
  


        const amb = new THREE.AmbientLight(0xffffff, 5)



        console.log("DONE BUILDING MAP3D")
        this.update();
    }

    update() {
        requestAnimationFrame(new Map3D().update);
        new Map3D().world.update();
        new Map3D().controls.update();
        new Map3D().renderer.update();


    }

    animate() {




        // update the picking ray with the camera and pointer position
        // raycaster.setFromCamera( pointer, camera );
        //floor2.children[0].positionY += .1;

        //put css elemnt at right location


        /*      FLOORS_HALLS[currentFloor].forEach( (hall) => {
               const screenPosition = hall.position.clone();
               screenPosition.project(camera);
               
               const translateX = screenPosition.x * window.innerWidth * .5;
               const translateY = -1* screenPosition.y * window.innerHeight * .5;
               
               hall.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
             } );
             
            */


        // calculate objects intersecting the picking ray
        /* 	const intersects = raycaster.intersectObjects( scene.children );
            for ( let i = 0; i < intersects.length; i ++ ) {
        
        
            
            console.log(intersects[i].object)
        
            if(intersects[i].object.type !== "null") null;//{intersects[i].object.material.color.set( 0xff0000)}
            
            
        
            }
           */




    }







}
import AllPOI from "./POI.js"
import Museum from "./Museum.js"

import Map3D from "./Map3D.js";

import * as THREE from 'three'
import { EventEmitter } from 'events'

let camera
let ready 

export default class World extends EventEmitter {
    constructor() { 
        super();
        console.log("BUILDING WORLD")

        this.map3d = new Map3D();
        camera = this.map3d.camera.camera


        
        
        this.resources = this.map3d.resources
        this.scene = this.map3d.scene;

        this.resources.on('loaded', () => {
            //Build museum model, data for organizing floors
            this.museum = new Museum();
            //Build POI data, populate floors with POI
            this.POI = new AllPOI(this.museum);
            this.scene.add(this.museum.floors[0].floor)
            ready = 1;

            
        
        })


        this.scene.background = new THREE.Color(0xf3f3f3)

        const pl = new THREE.PointLight(0xffffff, 3, 0, 0)
        
        pl.position.set(20, 20, -20)
        this.scene.add(pl)

        

        
        






    }

    

    update() {
        if(ready != 1) {} else {
        //RIGHT NOW WE ARE ONLY CHECKING FOR THE MIDDLE FLOOR POIS
        this.POI.pois1.forEach((point) => point.update(camera))
        }
    }

    moveUpFloor(curr) {
        this.scene.add(this.museum.floors[curr].floor)
        this.POI.poisAll[curr].forEach((x) => x.element.style.opacity = 1)
        this.POI.poisAll[curr-1].forEach((x) => x.element.style.opacity = 0)
    }

    moveDownFloor(curr) {
        this.scene.remove(this.museum.floors[curr].floor)
        this.POI.poisAll[curr].forEach((x) => x.element.style.opacity = 0)
        this.POI.poisAll[curr-1].forEach((x) => x.element.style.opacity = 1)
    }
}
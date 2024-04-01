
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gsap } from "gsap";
import Map3D from './Map3D';
import EventEmitter from "events"

let UI


export default class AllPOI {
    constructor(museum) {

        this.map3d = new Map3D()
        this.museum = museum

        
        


        // execute
        console.log("Building POIs...")
       
        
        this.buildPOIs();
        console.log("Done!");

    }

    

    buildPOIs() {

        /** New POI contain inf */
        this.pois0 = [

        ]
        console.log("I AM HERE")
        this.pois1 = [
            new POI(
                //new THREE.Vector3(2,2,2),
                //getCenter(this.museum.floors[1].floor.children[3]),
                //getCenter(this.museum.getObject(1, 3)),
                getCenter(getObject(1, "ex", 3)),
                document.querySelector(".hallOfDogs"),
                {
                    title: 'HALL OF BIRDS',
                    h1: 'Description of the Hall of Birds'
                }),

            new POI(
                new THREE.Vector3(3, 3, 3),
                document.querySelector(".hallOfBirds"),
                {
                    title:  'HALL OF BIRDS',
                    imgurl: '/img/sobek.jpg',
                    h1:     'Description of the Hall of Birds'
                    
                }),

            new POI(
                new THREE.Vector3(4, 4, 4),
                document.querySelector(".hallOfCats"),
                {
                    title: 'HALL OF BIRDS',
                    h1: 'Description of the Hall of Birds'
                }),
            new POI(
                getCenter(getObject(1, "ex", 70)),
                document.querySelector(".maximo"),
                {
                    title: "MAXIMO THE TITANOSAUR",
                    h1: "Meet a prehistoric monolith."
                }
            ),
            new POI(
                getCenter(getObject(1, "ex", 2)),
                document.querySelector(".theAncientAmericas"),
                {
                    title: "The Ancient Americas",
                    h1: "Learn about those"
                }
            )

        ]

        this.pois2 = [

        ]

        this.poisAll = [ this.pois0, this.pois1, this.pois2]

        
    }

    addToFloors() {
        this.museum.floors[0].pois = this.pois0
        this.museum.floors[1].pois = this.pois1
        this.museum.floors[2].pois = this.pois2
    }






    update() {
        this.points.forEach((point) => point.update())
    }

    moveUpFloor(curr) {
        
    }

    moveDownFloor(curr) {
        
    }





    //main


}

class POI {
    constructor(position = new THREE.Vector3(), element, info) {

        this.sidebar = new Map3D().ui.sidebar
        this.position = position;
        this.element = element;
        this.info = info;
        this.createEvent()
        console.log(this.parent)


    }

    update(camera) {
        const screenPosition = this.position.clone();
        screenPosition.project(camera);

        const translateX = screenPosition.x * window.innerWidth * .5;
        const translateY = -1 * screenPosition.y * window.innerHeight * .5;

        this.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
    }

    createEvent(){
        
        this.element.addEventListener('click', () => {
            
            console.log("hey g.uys")
            this.sidebar.panel.style.right = '0'
            this.sidebar.title.innerHTML =      this.info.title
            this.sidebar.image.src =            this.info.imgurl
            this.sidebar.h1.innerHTML =    this.info.h1
            console.log(this.sidebar.title.innerHTML)
            
            
        })
    }







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

function getObject(floor, type, key) {
    let museum = new Map3D().world.museum
    let output
    let old
    museum.floors[floor].floor.children.forEach((x) => {
        if(x.key === key  && x.type === type) {
            output = x
            
            if(old !== output) {
                console.log(output)
            }
            old = output
            
        }
    })
    console.log(output)
    return output

}






/**
class Exhibit extends POI() {
    constructor( position = new THREE.Vector3(), element ) {
        
    }


}

class Other extends POI() {
    constructor( position = new THREE.Vector3(), element ) {
        //super(position, element)
    }


}
*/

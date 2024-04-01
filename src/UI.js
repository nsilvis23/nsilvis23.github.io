import * as THREE from 'three'
import Map3D from './Map3D'


const MAX_FLOOR = 2;
const MIN_FLOOR = 0;

export default class UI {
    constructor() {
        this.map3d = new Map3D();
        this.world = this.map3d.world;
        this.museum = this.world.museum;
        this.sidebar = {}
        this.pois = this.world.POI

        this.currentFloor = 1;

        const upbutton = document.querySelector("button[name='up']");
        upbutton.addEventListener("click", (event) => {
            // if(currentFloor < MAX_FLOOR) {
            //this.moveUpFloor();
            //updateFloor();

            //   }
            
            //console.log("I am an upbutton")
            if(this.currentFloor < MAX_FLOOR) {
                this.moveUpFloor();
                this.updateFloor();
            }

        })

        const downbutton = document.querySelector("button[name='down']");
        downbutton.addEventListener("click", (event) => {
            //if (currentFloor > MIN_FLOOR) {
            //    moveDownFloor();
            //    updateFloor();
            //}
            //console.log("I am a down button")
            if(this.currentFloor > MIN_FLOOR) {
                this.moveDownFloor();
                this.updateFloor();
            }

        })

        this.makeSidebar()



    }

    makeSidebar() {
        this.sidebar.panel  =         document.querySelector('.sidebar')
        this.sidebar.title  =        document.querySelector('.sidebar-title')
        this.sidebar.h1     =       document.querySelector('.sidebar-h1')
        this.sidebar.image  =       document.querySelector('.sidebar-image')
        this.sidebar.close  =       document.querySelector('.close')
        this.sidebar.close.addEventListener('click', () => {
            this.sidebar.panel.style.right = "-33%"
        })
    }

    updateFloor() {
        console.log("UI call: Update Floor")

        this.displayFloor = document.getElementById('display-floor')
        if(this.currentFloor === 0) {
            this.displayFloor.innerText = 'B'

        } else {
            this.displayFloor.innerText = this.currentFloor.toString();
        }

        console.log("Current floor : " + this.displayFloor.innerText)
        

    }

    moveUpFloor() {
        this.currentFloor ++
        this.world.moveUpFloor(this.currentFloor)
        
        
    }

    moveDownFloor() {
        this.world.moveDownFloor(this.currentFloor)
        
        this.currentFloor --
    }
}


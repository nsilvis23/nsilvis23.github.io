import { RenderTarget } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Resources from './Resources';
import Map3D from './Map3D';
import * as THREE from 'three';





export default class Museum {
  constructor() {
    const MAX_FLOOR = 2;
    const MIN_FLOOR = 0;



    console.log("BUILDING MUSEUM")


    //vars
    this.map3D = new Map3D();
    this.scene = this.map3D.scene
    this.resources = this.map3D.resources;
    //FIX ME
    //
    //
    this.floors = [
      {
        //FLOOR 0 / BASEMENT
        //floor object
        name: 'F0',
        floor: new THREE.Object3D(),
        meshes: []


      },
      {
        //FLOOR 1
        //floor object
        name: 'F1',
        floor: new THREE.Object3D(),
        meshes: []


      },
      {
        //FLOOR 2
        //floor object
        name: 'F2',
        floor: new THREE.Object3D(),
        meshes: []


      }

    ]


    console.log(this.resources.string)
    this.url = "./glbs/FIELD.glb"
    

    this.load();







    //setup
    /*  create museum from gltf
     Render
     create floors
     make array for floors
     */
    console.log('Museum: Done')


  }

  load() {
    this.data = this.resources.items.field.scenes[1]
    
    console.log(this.data)
    this.buildFloors()
    console.log("I am now adding the floor to the scene")
    console.log(this.floors[1].floor)
    this.scene.add(this.floors[1].floor)

  }



  //NEED TO FIX
  //
  //
  buildFloors() {
    
    console.log("Building Floors Now")

    this.data.traverse((child) => {


      this.parseName(child);

      child.layers.enable(1);

      child.material ? child.material.transparent = true : null

      switch (child.floor) {
        case 2:
          this.floors[2].meshes.push(child)
          //console.log("added ".concat(child.name).concat(" to floor 2"))

          break;
        case 1:
          this.floors[1].meshes.push(child)
          //console.log("added ".concat(child.name).concat(" to floor 1"))

          break;
        case 0:
          this.floors[0].meshes.push(child)
          //console.log("added ".concat(child.name).concat(" to floor 0"))

          break;
        default:
          console.log("im confused about ".concat(child.name));

      }






    });


    this.floors.forEach((floor) => {

      for (var i = 0; i < floor.meshes.length; i++) {
        floor.floor.add(floor.meshes[i])
      }
    })
  }



  parseName(object) {

    //console.log("parsing ".concat(object.name))

    try {
      if (object) {
        const ids = object.name.split('_');


        //Define an object with X_FLOOR_TYPE_KEY
        //Type:   Contains a type of object: Exhibit, Hall, Decor, Stair, Dining, Restroom, 
        //Floor:  Contains the floor the object will be added to: 0, 1, or 2
        //Key:    Contains the room's id number provided by the Field Museum map. 
        //X:      Contains an extension id for the room, if it is a "subroom" of a larger room, or a differentiating number for rooms with archetypes
        object.floor = parseInt(ids[0]);
        object.type = ids[1];
        object.key = parseInt(ids[2]);
        object.x = parseInt(ids[3]);



      }
    } catch (error) {
      console.error(error);
    }
  }


  // Only works for rooms
  //If
  getObject(floor, key) {
    let rooms
    this.museum.floors[floor].floor.children.forEach((x) => {
      if(x.key===key) rooms = x
    })
    return rooms
  }



}
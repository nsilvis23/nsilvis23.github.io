import * as THREE from 'three'
import Map3D from './Map3D';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Controls {
    constructor() {
        console.log("Building Controls...")

        this.map3d = new Map3D();
        this.camera = this.map3d.camera
        this.renderer = this.map3d.renderer
        this.controls = new OrbitControls(this.camera.camera, this.renderer.renderer.domElement)
        this.controls.enableDamping = true;
        this.angle = this.controls.getPolarAngle()
        this.controls.maxPolarAngle = this.angle
        this.controls.minPolarAngle = this.angle

        console.log("Done building Controls!")
    }
    
    update() {
        //
        this.controls.update()
    }
}
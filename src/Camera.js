import * as THREE from 'three';
import Map3D from './Map3D';

const d = 20;

export default class Camera {
    constructor () {

        //camera frustrum
        

        this.map3d = new Map3D();
        this.size = this.map3d.size;
        this.camera = new THREE.OrthographicCamera((d * this.size.ar)/-2, (d * this.size.ar)/2, d/2, -d/2, 0,1000)
        this.scene = this.map3d.scene;
        

        this.camera.position.set(d,d,d)
        this.camera.rotation.set(Math.atan(-1/Math.sqrt(2)),Math.PI/4,0)
        this.camera.zoom = 3
        this.camera.updateProjectionMatrix();
        this.scene.add(this.camera)
    }

    resize() {
        this.camera.left = (this.size.ar * -d) / 2;
        this.camera.right = (this.size.ar * d) / 2;
        console.log("RESIZING CAMERA")
        

        this.camera.updateProjectionMatrix();
    }
}
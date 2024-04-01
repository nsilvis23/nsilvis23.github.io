import * as THREE from 'three'

import Map3D from './Map3D.js'
import Size from './Size.js'

export default class Renderer {
    constructor(){

        console.log("Building Renderer...")
        this.map3d = new Map3D()
        this.scene = this.map3d.scene;
        this.camera = this.map3d.camera;
        this.size = this.map3d.size;




        //setup
        this.setRenderer();
        console.log("Done building Renderer!")
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('#bg')
        });
        
        this.renderer.setPixelRatio(this.size.pixelRatio);
        this.renderer.setSize(this.size.width, this.size.height);
        console.log("IM HERE")
        
        

        //additional renderer settings
        
    }

    resize() {
        this.renderer.setSize(this.size.width, this.size.height)
        this.renderer.setPixelRatio(this.size.pixelRatio)
    }

    update() {
        this.renderer.setViewport(0, 0, this.size.width, this.size.height)
        this.renderer.render(this.scene, this.camera.camera)
    }
        


}
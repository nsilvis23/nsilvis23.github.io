import * as THREE from 'three'
import GSAP from 'gsap'
import { EventEmitter } from 'events'

import Map3D from './Map3D'

export default class Preloader extends EventEmitter {
    constructor() {
        super()
        this.map3d = new Map3D()
        this.scene = this.map3d.scene
        this.resources = this.map3d.resources
        

        this.world.on('worldready', () => {
            this.setAssets()
            this.init()
        })
    }

    async init() {
       //await this.intro()
    }

    intro() {
        //return new Promise(())
    }

    setAssets() {

    }

    
}
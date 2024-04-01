import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Map3D from './Map3D';
import * as THREE from "three"
import { EventEmitter } from 'events'



export default class Resources extends EventEmitter {
    constructor(assets) {
        super()
        console.log("BUILDING RESOURCES TOOL")
        
        this.map3d = new Map3D();
        this.assets = assets;
        this.string = "HEY"

        this.items = {}
        this.queue = this.assets.length
        this.loaded = 0
        



        //setup
        this.setLoadingManager();
        this.setLoaders();
        this.startLoading();
        console.log(this.items)
        console.log("DONE BUILDING RESOURCES TOOL")
        
    }

    setLoadingManager() {
        this.loadingManager = new THREE.LoadingManager(
            () => {},
            (itemsLoaded, itemsTotal) => {
                this.progressRatio = (itemsLoaded/itemsTotal) * 100
                this.loadingProgress.innerHTML = Math.round(this.progressRatio)
            }
        )
    }


    setLoaders() {
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader()
    }

    startLoading() {
        for(const asset of this.assets) {
            console.log("Loading " + asset.url + "...")
            this.loaders.gltfLoader.load(asset.url, (file) => {
                console.log(asset+ " loaded!")
                this.singleAssetLoaded(asset, file)
                
            })
        }
    }
    
    singleAssetLoaded(asset, file) {
        this.items[asset.name] = file
        this.loaded ++

        if(this.loaded === this.queue) {
            console.log("LOADED")
            this.emit('loaded')
        }
    }

   /*  loadModel(url) {
        return new Promise((resolve, reject) => {
            this.loaders.gltfLoader.load(url, function(gltf) {
                resolve(gltf.scenes);
                console.log("Loaded!!");
                
            }), undefined, function (error) {
                console.error (error);
            }
        }
        )
    } */



}

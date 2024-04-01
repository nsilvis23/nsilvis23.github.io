import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gsap } from "gsap";
import Stats from 'three/examples/jsm/libs/stats.module'


import Resources from './src/Resources.js';

import AllPOI from './src/POI.js';
import './src/Controls.js';
import './src/Museum.js';
import Map3D from './src/Map3D.js';
import Size from './src/Size.js';



const map3d = new Map3D(document.querySelector('#bg'));
//unneeded?






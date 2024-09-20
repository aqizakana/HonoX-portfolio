import * as THREE from 'three';
import { SimplexNoise } from "three/addons/math/SimplexNoise.js";
const simplexNoise = new SimplexNoise();
const time = Date.now() * 0.1;
const value = simplexNoise.noise(time, 2.5); // x1とy1は任意の数値
import vertexShader from "./shader/vertex.glsl?raw"
import fragmentShader from "./shader/fragment.glsl?raw"

import { objectProps } from './types';

export class Box {
    private geometry: THREE.BoxGeometry;
    private material: THREE.ShaderMaterial;
    private mesh: THREE.Mesh;

    constructor() {
        this.geometry = new THREE.BoxGeometry(500,500,500);
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                u_time: { value: 0.0 },
                u_mouse: { value: new THREE.Vector2(0, 0) },
                u_color: { value: 1.0 }
            }
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(0,0,0);

    }

    public getMesh(): THREE.Mesh {
        return this.mesh;
    }
    public update(deltaTime: number) {
        this.mesh.rotation.x += deltaTime / 10.0;
    }
}
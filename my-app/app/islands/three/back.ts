import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Background {
    public sizes: { width: number; height: number; };
    public scene: THREE.Scene;
    public renderer: THREE.WebGLRenderer;
    public camera: THREE.PerspectiveCamera;
    public controls: OrbitControls;

    constructor(canvasElement: HTMLCanvasElement) {
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            100,
            this.sizes.width / this.sizes.height,
            10,
            2000
        );
        this.camera.position.set(0, 0, -500); // カメラの初期位置を調整
        this.camera.lookAt(0, 0, 0); // カメラの初期注視点を調整

        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasElement,
            antialias: true,
            alpha: false,
        });
        const canvas = this.renderer.domElement;
        this.updateRendererSize();

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 100;
        this.controls.maxDistance = 1500;
        this.controls.maxPolarAngle = Math.PI;

        this.addLights();



        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    private updateRendererSize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x80ffff, 0); // 空色（スカイブルー）
    }

    private onWindowResize() {
        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;
        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();
        this.updateRendererSize();
    }

    private addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1.0);
        pointLight.position.set(0, 0, 0);
        this.scene.add(pointLight);
    }

    public animate(objects: any[] = []) {
        const clock = new THREE.Clock();

        const tick = () => {
            const elapsedTime = clock.getElapsedTime();

            if (objects.length >= 0) {
                objects.forEach(object => {
                    if (typeof object.update === 'function') {
                        object.update(elapsedTime);
                    }
                });
            }

            this.controls.update(); // Ensure OrbitControls updates on every frame
            this.renderer.render(this.scene, this.camera); // Always render the scene

            requestAnimationFrame(tick);
        }
        tick();
    }

    public dispose() {
        window.removeEventListener('resize', this.onWindowResize.bind(this));
        this.renderer.dispose();
        this.controls.dispose();
    }
}
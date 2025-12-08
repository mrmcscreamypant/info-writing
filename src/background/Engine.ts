import * as THREE from 'three';
import Cube from './Cube';

import * as POST from 'postprocessing';

export default class Engine {
    private readonly elem: HTMLCanvasElement;

    private readonly renderer: THREE.WebGLRenderer;
    private readonly composer: POST.EffectComposer;
    private readonly scene: THREE.Scene;
    private readonly clock: THREE.Clock;

    private readonly camera: THREE.PerspectiveCamera;
    private readonly cube: Cube;

    public constructor(elemID: string) {
        this.elem = document.getElementById(elemID) as HTMLCanvasElement;

        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera();
        this.scene.add(this.camera);

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.elem,
            alpha: true,
            premultipliedAlpha: false,
            antialias: false,
            powerPreference: "high-performance"
        });

        this.composer = new POST.EffectComposer(this.renderer);
        this.composer.addPass(new POST.RenderPass(
            this.scene,
            this.camera
        ));

        this.composer.addPass(new POST.EffectPass(this.camera,
            new POST.GlitchEffect(),
            new POST.ASCIIEffect({ cellSize: 5 })
        ));

        this.cube = new Cube();
        this.scene.add(this.cube);
        this.cube.position.z = -5;

        window.onresize = (): void => this.handleResize();

        this.handleResize();

        this.renderer.setAnimationLoop((): void => this.mainloop());
    }

    private mainloop(): void {
        const delta = this.clock.getDelta();
        this.cube.tick(delta);
        this.composer.render(delta);
    }

    private handleResize(): void {
        this.composer.setSize(window.innerWidth, window.innerHeight, false);
        this.renderer.setSize(window.innerWidth, window.innerHeight, false);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }
}
import * as THREE from 'three';
import * as CSS3D from 'three/addons/renderers/CSS3DRenderer.js';
import * as POST from 'postprocessing';
import { MotionValue } from 'motion/react';
import { Location } from 'react-router';
import Context from './Context';
import { ContextMappings } from './ContextMappings';
import { AppRoute } from '../AppRoutes';
import { rootElem } from '..';

export type EngineHooks = {
    scrollProgress: MotionValue<number>,
    scrollVelocity: MotionValue<number>,
    scrollSpring: MotionValue<number>,
    currentPage: Location
}

export default class Engine {
    private readonly elem: HTMLCanvasElement;
    private readonly getHooks: () => EngineHooks;

    private readonly renderer: THREE.WebGLRenderer;
    private readonly css3d: CSS3D.CSS3DRenderer;
    private readonly composer: POST.EffectComposer;
    private readonly scene: THREE.Scene;
    public readonly clock: THREE.Clock;

    public readonly camera: THREE.PerspectiveCamera;

    public context: Context;
    public lastContext: Context;

    public constructor(elemID: string, getHooks: () => EngineHooks) {
        this.elem = document.getElementById(elemID) as HTMLCanvasElement;

        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera();
        this.camera.position.z = 5;
        this.camera.rotation.order = "YXZ";
        this.scene.add(this.camera);

        this.getHooks = getHooks;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.elem,
            alpha: true,
            premultipliedAlpha: false,
            antialias: false,
            powerPreference: "high-performance"
        });

        this.css3d = new CSS3D.CSS3DRenderer({ element: document.getElementById("css3d") });
        const pageObject = new CSS3D.CSS3DSprite(document.getElementById("content"));
        pageObject.position.set(0, 0, 0);
        this.scene.add(pageObject);

        this.composer = new POST.EffectComposer(this.renderer);
        this.composer.addPass(new POST.RenderPass(
            this.scene,
            this.camera
        ));

        this.composer.addPass(new POST.EffectPass(this.camera,
            new POST.GlitchEffect(),
            new POST.ASCIIEffect({ cellSize: 5 })
        ));

        window.onresize = (): void => this.handleResize();

        this.handleResize();

        this.renderer.setAnimationLoop((): void => this.mainloop());
    }

    public get hooks(): EngineHooks {
        return this.getHooks();
    }

    private mainloop(): void {
        const delta = Math.min(this.clock.getDelta(), 0.25);
        if (this.context) {
            this.context.tick(Math.min(0.5 * delta, 1));
        }
        const targetPos = this.context ? this.context.cameraPos : new THREE.Vector3;

        this.camera.position.add(
            targetPos
                .sub(this.camera.position)
                .multiplyScalar(Math.min(0.8 * delta, 1))
        );

        const oldRot = this.camera.quaternion.clone();
        this.camera.lookAt(this.context ?
            this.context.position :
            new THREE.Vector3(0, 1, 0));
        const rot = this.camera.quaternion.clone();
        this.camera.quaternion.copy(
            oldRot.rotateTowards(rot, rot.angleTo(oldRot) / 50)
        );

        this.composer.render(delta);
        this.css3d.render(this.scene, this.camera);
    }

    private handleResize(): void {
        this.composer.setSize(window.innerWidth, window.innerHeight, false);
        this.renderer.setSize(window.innerWidth, window.innerHeight, false);
        this.css3d.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    public switchContext(location: Location): void {
        if (this.lastContext) {
            this.lastContext.removeFromParent();
        }
        this.lastContext = this.context;
        const contextConstructor = ContextMappings[location.pathname as AppRoute];
        if (contextConstructor) {
            this.context = new contextConstructor(this);
            this.scene.add(this.context);
            return;
        }
        this.context = null;
    }
}
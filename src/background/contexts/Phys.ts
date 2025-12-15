import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Context from '../Context';
import Engine from '../Engine';
import LightArray from '../LightArray';

class FallingObject extends THREE.Group {
    private readonly body: CANNON.Body;

    private get randomOnAxis(): number {
        return (Math.random() - 0.5) * 2;
    }

    public constructor(physWorld: CANNON.World) {
        super();
        this.body = new CANNON.Body({
            mass: 3,
            shape: new CANNON.Box(new CANNON.Vec3(0.1, 0.1, 0.1)),
        });

        physWorld.addBody(this.body);
        this.body.position.set(this.randomOnAxis, 5, this.randomOnAxis);

        this.add(new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 0.2, 0.2),
            new THREE.MeshPhongMaterial()
        ));
    }

    public tick(): void {
        this.position.copy(this.body.position);
        this.quaternion.copy(this.body.quaternion);
    }

    public destroy(): void {
        this.body.world.removeBody(this.body);
    }
}

export default class PhysContext extends Context {
    private readonly physWorld: CANNON.World;
    private readonly cubes: FallingObject[];
    private readonly plane: CANNON.Body;
    private readonly lightArray: LightArray;

    public constructor(engine: Engine) {
        super(engine);
        
        this.lightArray = new LightArray(this.engine);
        this.add(this.lightArray);

        this.physWorld = new CANNON.World({
            gravity: new CANNON.Vec3(0, -9.82, 0)
        });

        this.plane = new CANNON.Body({
            shape: new CANNON.Plane(),
            type: CANNON.BODY_TYPES.KINEMATIC
        });
        this.plane.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
        this.physWorld.addBody(this.plane);

        this.cubes = [];
    }

    public override tick(delta: number): void {
        this.physWorld.fixedStep();

        if (this.cubes.length >= 180) {
            const obj = this.cubes.pop();
            obj.removeFromParent();
            obj.destroy();
        }
        const n = new FallingObject(this.physWorld);
        this.cubes.reverse();
        this.cubes.push(n);
        this.cubes.reverse();
        this.add(n);

        this.plane.position.y = this.engine.hooks.scrollSpring.get() / 1e3 - 1;

        for (const cube of this.cubes) cube.tick();

        this.lightArray.tick(delta);
    }
}